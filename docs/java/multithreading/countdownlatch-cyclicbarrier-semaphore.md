# CountDownLatch, CyclicBarrier, and Semaphore

## Definition

These are Java concurrency utilities for waiting, coordination, and limiting access to a shared resource.

## Why It Matters

They are common in interview questions because they solve different coordination problems and are easy to confuse.

## Core Example

Use CountDownLatch when the main thread must wait for several worker tasks to finish.

## Common Traps

- CountDownLatch cannot be reset.
- CyclicBarrier can be reused.
- Semaphore controls permits, not ownership like a lock.
- A binary semaphore is not exactly the same as a Java lock.
- Forgetting to release a semaphore permit can block other threads.

## Interview Answer

CountDownLatch lets one or more threads wait until a count reaches zero. CyclicBarrier lets a group of threads wait for each other at a common point and can be reused. Semaphore controls how many threads can access a resource using permits.

## Quick Revision

- CountDownLatch waits for count to reach zero.
- CountDownLatch is one-time use.
- CyclicBarrier waits for a group.
- CyclicBarrier is reusable.
- Semaphore limits concurrent access.
- Always release semaphore permits.

## Deep Dive

You have now covered **almost the full Java concurrency foundation**:

```
Threads
Thread lifecycle
Race conditions
synchronized
Deadlock
volatile
CAS
Atomic classes
ExecutorService
Thread pools
wait / notify
Producer–Consumer
BlockingQueue
ReentrantLock
ReadWriteLock
```

This is already **strong interview-level knowledge**.

---

### Remaining Advanced Concurrency Topics

Only a few **very important tools** remain:

```
CountDownLatch
CyclicBarrier
Semaphore
ForkJoinPool
CompletableFuture
```

These are used in **high-performance concurrent systems**.

---

### Next Topic (Very Easy but Very Powerful)

#### `CountDownLatch`

Before I explain:

Imagine **5 worker threads must finish their job before the main thread continues**.

Which thread should wait?

```
Main thread
or
Worker threads
```

What do you think?

##### Answer:
✅ — **the main thread waits**.

Now let’s understand **CountDownLatch**, one of the easiest and most useful concurrency tools.

---

### 1️⃣ What is `CountDownLatch`?

`CountDownLatch` is used when:

```
One or more threads must wait
until other threads finish their work
```

Example scenario:

```
Main thread
   ↓
Wait for 5 worker threads
   ↓
Continue execution
```

---

### 2️⃣ Real Life Example

Imagine a **race starting gate**.

```
Runner1 ready
Runner2 ready
Runner3 ready
Runner4 ready
Runner5 ready
```

The race starts **only when all runners are ready**.

Latch counter:

```
5 → 4 → 3 → 2 → 1 → 0
```

When it reaches **0**, waiting thread continues.

---

### 3️⃣ Basic Code Example

Create latch:

```java
CountDownLatch latch = new CountDownLatch(3);
```

Meaning:

```
Main thread waits until 3 events happen
```

---

### Worker threads

```java
latch.countDown();
```

Each call reduces the counter:

```
3 → 2 → 1 → 0
```

---

### Main thread waits

```java
latch.await();
```

Meaning:

```
Wait until counter becomes 0
```

---

### Full Example

```java
import java.util.concurrent.CountDownLatch;

public class Example {

    public static void main(String[] args) throws Exception {

        CountDownLatch latch = new CountDownLatch(3);

        for(int i=1;i<=3;i++){
            new Thread(() -> {
                System.out.println("Worker finished");
                latch.countDown();
            }).start();
        }

        latch.await();

        System.out.println("All workers done. Main continues.");
    }
}
```

Output:

```
Worker finished
Worker finished
Worker finished
All workers done. Main continues.
```

---

### 4️⃣ Important Methods

| Method        | Purpose                       |
| ------------- | ----------------------------- |
| `await()`     | wait until count reaches zero |
| `countDown()` | decrease counter              |
| `getCount()`  | current count                 |

---

### 5️⃣ Important Property

`CountDownLatch` is **one-time use only**.

Once count reaches:

```
0
```

You **cannot reset it**.

If you need reusable synchronization → use:

```
CyclicBarrier
```

---

### Interview One-Liner

> CountDownLatch allows one or more threads to wait until a set of operations performed by other threads completes.

---

### Quick Interview Question

Suppose:

```
CountDownLatch latch = new CountDownLatch(3);
```

But only **2 threads call `countDown()`**.

What happens to:

```
latch.await()
```

Will it:

A) Continue
B) Wait forever
C) Throw exception

What do you think?

##### Answer:
```text
B) Wait forever

CountDownLatch.await() blocks until the count reaches zero; if the count never reaches zero, the waiting thread will block indefinitely unless a timeout is used.
```
Let's understand step by step
---
##### Code

```java
CountDownLatch latch = new CountDownLatch(3);
```

This means the latch counter starts at:

```
3
```

Now imagine only **2 threads** call:

```java
latch.countDown();
```

Counter changes like this:

```
3 → 2 → 1
```

It **never reaches 0**.

---

### What happens to `await()`?

```java
latch.await();
```

This method waits until the counter becomes **0**.

Since the counter is still **1**, the waiting thread will:

```
Wait forever
```

So the correct answer is:

**B) Wait forever**

---

### Why this is important

If some worker thread **fails or forgets to call `countDown()`**, the main thread can get **stuck permanently**.

This is a common bug in concurrent programs.

---

### How to avoid waiting forever

Java provides a safer version:

```java
latch.await(5, TimeUnit.SECONDS);
```

Meaning:

```
Wait up to 5 seconds
If count still not zero → continue
```

This prevents the program from getting stuck.

---

### Interview one-liner

> `CountDownLatch.await()` blocks until the count reaches zero; if the count never reaches zero, the waiting thread will block indefinitely unless a timeout is used.

---



Great. Now we go to the next important concurrency tool.

### CyclicBarrier

This concept is very similar to `CountDownLatch`, but with one big difference.

---

### 1️⃣ What is CyclicBarrier?

`CyclicBarrier` is used when:

```
Multiple threads must wait for each other
before continuing execution.
```

Example:

```
Thread1
Thread2
Thread3
Thread4
```

All threads must reach a **common barrier point** before moving forward.

---

### Real-world Example

Imagine **4 friends meeting at a restaurant**.

```
Friend1 arrives
Friend2 arrives
Friend3 arrives
Friend4 arrives
```

Only when **all 4 arrive**, they start eating.

That meeting point is the **barrier**.

---

### 2️⃣ How CyclicBarrier Works

Create barrier:

```java
CyclicBarrier barrier = new CyclicBarrier(4);
```

Meaning:

```
4 threads must reach the barrier
before any can continue.
```

Each thread calls:

```java
barrier.await();
```

Flow:

```
Thread1 → wait
Thread2 → wait
Thread3 → wait
Thread4 → arrives
Barrier opens
All threads continue
```

---

### 3️⃣ Example Code

```java
import java.util.concurrent.CyclicBarrier;

public class Example {

    public static void main(String[] args) {

        CyclicBarrier barrier = new CyclicBarrier(3);

        Runnable worker = () -> {
            try {
                System.out.println(Thread.currentThread().getName() + " ready");
                barrier.await();
                System.out.println(Thread.currentThread().getName() + " started");
            } catch(Exception e){}
        };

        new Thread(worker).start();
        new Thread(worker).start();
        new Thread(worker).start();
    }
}
```

Output example:

```
Thread1 ready
Thread2 ready
Thread3 ready
Thread3 started
Thread2 started
Thread1 started
```

All threads start **only after all arrive**.

---

### 4️⃣ Why it is called **Cyclic**

Because it **resets automatically**.

Example:

```
Round 1 → barrier opens
Round 2 → barrier can be used again
```

This is different from:

```
CountDownLatch (one-time use)
```

---

### 5️⃣ Barrier Action (Advanced Feature)

You can run a task **when barrier opens**.

Example:

```java
CyclicBarrier barrier =
    new CyclicBarrier(3, () -> {
        System.out.println("All threads reached barrier");
    });
```

This code runs **before threads continue**.

---

### 6️⃣ CyclicBarrier vs CountDownLatch

| Feature       | CountDownLatch   | CyclicBarrier    |
| ------------- | ---------------- | ---------------- |
| Reusable      | ❌ No             | ✔ Yes            |
| Who waits     | One thread waits | All threads wait |
| Counter reset | ❌ No             | ✔ Yes            |

---

### Interview One-Liner

> `CyclicBarrier` allows a group of threads to wait for each other at a common barrier point before continuing execution.

---

### Important Interview Question

Suppose we create:

```
CyclicBarrier barrier = new CyclicBarrier(5);
```

But only **4 threads call `await()`**.

What happens?

A) Barrier opens
B) Threads wait forever
C) Exception occurs

What do you think?

##### Answer:

**B) Threads wait forever**

---

### Why?

`CyclicBarrier(5)` means:

```
5 threads must reach the barrier
```

Barrier counter:

```
5
```

Threads arrive:

```
Thread1 → waiting
Thread2 → waiting
Thread3 → waiting
Thread4 → waiting
```

But the **5th thread never arrives**, so:

```
Barrier never opens
```

All 4 threads remain:

```
WAITING
```

---

### Important Exception Case

If one waiting thread is **interrupted**, then the barrier becomes **broken** and other threads get:

```
BrokenBarrierException
```

---

### Interview One-liner

> A CyclicBarrier opens only when the specified number of threads reach the barrier; otherwise, waiting threads remain blocked.

---

### Quick Comparison (Very Important)

| Tool               | Purpose                                       |
| ------------------ | --------------------------------------------- |
| **CountDownLatch** | One thread waits for others to finish         |
| **CyclicBarrier**  | All threads wait for each other               |
| **Semaphore**      | Controls number of threads accessing resource |

---

### Next Topic (Last Core Concurrency Tool)

We should now learn **Semaphore**, which controls **resource access**.

---

### 1️⃣ What is a Semaphore?

A **Semaphore controls how many threads can access a resource at the same time.**

Think of it like **limited permits**.

Example:

```text
Database connections = 3
Threads requesting DB = 10
```

Only **3 threads** can access the database simultaneously.
Other threads must **wait**.

That control mechanism is **Semaphore**.

---

### 2️⃣ Real-Life Example

Imagine a **parking lot with 3 parking spaces**.

```text
🚗 Car1 → enter
🚗 Car2 → enter
🚗 Car3 → enter
🚗 Car4 → wait
🚗 Car5 → wait
```

When a car leaves:

```text
Car1 leaves → space available
Car4 enters
```

Semaphore works exactly like this.

---

### 3️⃣ Java Semaphore Example

Create semaphore:

```java
Semaphore semaphore = new Semaphore(3);
```

Meaning:

```text
3 threads allowed simultaneously
```

Thread enters resource:

```java
semaphore.acquire();
```

Thread releases resource:

```java
semaphore.release();
```

---

### 4️⃣ Example Code

```java
import java.util.concurrent.Semaphore;

public class Example {

    static Semaphore semaphore = new Semaphore(3);

    public static void main(String[] args) {

        for(int i=1;i<=6;i++){
            new Thread(() -> {
                try {
                    semaphore.acquire();

                    System.out.println(Thread.currentThread().getName()+" entered");

                    Thread.sleep(2000);

                    System.out.println(Thread.currentThread().getName()+" leaving");

                    semaphore.release();

                } catch(Exception e){}
            }).start();
        }
    }
}
```

Output example:

```text
Thread1 entered
Thread2 entered
Thread3 entered
Thread1 leaving
Thread4 entered
```

Only **3 threads inside at once**.

---

### 5️⃣ Important Methods

| Method               | Purpose                 |
| -------------------- | ----------------------- |
| `acquire()`          | take permit (may block) |
| `release()`          | return permit           |
| `tryAcquire()`       | try without waiting     |
| `availablePermits()` | check remaining permits |

---

### 6️⃣ Binary Semaphore

If we create:

```java
Semaphore semaphore = new Semaphore(1);
```

Then only **one thread allowed**.

This behaves like a **mutex lock**.

---

### 7️⃣ Semaphore vs Lock

| Feature                 | Semaphore | Lock |
| ----------------------- | --------- | ---- |
| Allows multiple threads | ✔ Yes     | ❌ No |
| Used for resource pool  | ✔ Yes     | ❌ No |
| Mutual exclusion        | Optional  | Yes  |

---

### Interview One-liner

> Semaphore controls access to a limited number of resources by allowing only a fixed number of threads to acquire permits simultaneously.

---

### Where You Are Now

You have now covered **almost the entire Java concurrency toolkit**:

```
Threads
synchronized
volatile
Atomic classes
ThreadPoolExecutor
wait/notify
BlockingQueue
ReentrantLock
ReadWriteLock
CountDownLatch
CyclicBarrier
Semaphore
```

This is **very strong concurrency knowledge**.

---

