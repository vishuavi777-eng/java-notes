# 📚 Multithreading – Part-3

Let’s go deeper in this order:

```
1️⃣ wait() / notify() / notifyAll()
2️⃣ Producer–Consumer
3️⃣ BlockingQueue
4️⃣ ReentrantLock
5️⃣ ReadWriteLock
6️⃣ CountDownLatch
7️⃣ CyclicBarrier
8️⃣ Semaphore
```

After that you will understand **almost all Java concurrency questions**.

---

# Let’s Start the Next Important Concept

## `sleep()` vs `wait()`

This question appears in **almost every Java interview**.

First try answering:

### Question

What is the difference between:

```
Thread.sleep()
```

and

```
Object.wait()
```

### Answer:
```text
sleep() pauses a thread without releasing the lock, while wait() releases the lock and waits until another thread calls notify or notifyAll.
```

Let’s refine it to **interview-perfect clarity**.

---

# `sleep()` vs `wait()` (Deep Explanation)

## 1️⃣ `Thread.sleep()`

Method:

```java
Thread.sleep(1000);
```

Characteristics:

```
Static method of Thread class
Can be called anywhere
Pauses the thread for a fixed time
Does NOT release locks
```

Example:

```java
synchronized(obj) {
    Thread.sleep(5000);
}
```

Here:

```
Thread sleeps
But still holds the lock
Other threads cannot enter the synchronized block
```

---

# 2️⃣ `Object.wait()`

Method:

```java
obj.wait();
```

Characteristics:

```
Instance method of Object class
Must be called inside synchronized block
Releases the lock
Thread goes to WAITING state
```

Example:

```java
synchronized(obj) {
    obj.wait();
}
```

What happens:

```
Thread releases the lock
Thread waits
Another thread calls notify()
Thread wakes up and tries to reacquire the lock
```

---

# Important Flow

Thread states:

```
RUNNING
  ↓
WAITING (wait())
  ↓
NOTIFIED
  ↓
BLOCKED (trying to acquire lock)
  ↓
RUNNING
```

---

# Comparison Table

| Feature               | sleep() | wait()             |
| --------------------- | ------- | ------------------ |
| Class                 | Thread  | Object             |
| Static                | Yes     | No                 |
| Requires synchronized | No      | Yes                |
| Releases lock         | ❌ No    | ✔ Yes              |
| Wake-up condition     | Timeout | notify / notifyAll |

---

# Interview One-Liner

> `sleep()` pauses a thread without releasing the lock, while `wait()` releases the lock and waits until another thread calls notify or notifyAll.

---

# Very Important Interview Trap

What happens here?

```java
Object lock = new Object();

lock.wait();
```

Will it:

A) Compile
B) Throw exception
C) Work normally

What do you think?

### Answer:

❌ **It WILL compile.**
⚠ **But it will throw an exception at runtime.**

---

# What Happens Here

Code:

```java
Object lock = new Object();
lock.wait();
```

This **compiles successfully**.

But when the program runs, it throws:

```
java.lang.IllegalMonitorStateException
```

---

# Why This Happens

Rule in Java:

```
wait()
notify()
notifyAll()
```

must be called **only when the thread owns the object's monitor lock**.

Meaning:

```
You must be inside synchronized(lock)
```

Correct usage:

```java
Object lock = new Object();

synchronized(lock) {
    lock.wait();
}
```

Now it works.

---

# Why Java Enforces This

Because `wait()` must do two things safely:

```
1️⃣ Release the object's lock
2️⃣ Put the thread into WAITING state
```

If the thread **doesn't own the lock**, Java cannot release it.

So JVM throws:

```
IllegalMonitorStateException
```

---

# Interview One-Liner

> `wait()`, `notify()`, and `notifyAll()` must be called while holding the object's monitor lock, otherwise the JVM throws `IllegalMonitorStateException`.

---

# Next Important Multithreading Concept

Now we move to the **classic Producer–Consumer problem**.

This is one of the **most famous concurrency problems** and appears in interviews frequently.

Before I explain it, tell me:

### What do you think "Producer–Consumer" means in programming?

### Answer
```text
The Producer–Consumer problem coordinates threads producing and consuming data using a shared buffer while preventing race conditions and overflow/underflow.
```

Let's build it **from intuition → code → interview level**.

---

# 1️⃣ Real World Idea (Producer–Consumer)

Imagine a **restaurant kitchen**.

```
Chef (Producer) → cooks food
Waiter (Consumer) → takes food to customers
```

Between them there is a **table** where food is placed.

```
Chef → puts food on table
Waiter → takes food from table
```

Rules:

```
If table is full → chef must wait
If table is empty → waiter must wait
```

This is exactly the **Producer–Consumer problem**.

---

# 2️⃣ Programming Version

```
Producer thread → generates data
Consumer thread → processes data
```

Between them there is a **shared buffer / queue**.

Example:

```
Producer → add task to queue
Consumer → remove task from queue
```

---

# 3️⃣ Why It Is a Multithreading Problem

Because multiple threads share the **same buffer**.

Problems may happen:

```
Producer adds while consumer removes
Queue becomes empty
Queue becomes full
Race conditions
```

So we need **thread coordination**.

---

# 4️⃣ Classic Solution Using `wait()` / `notify()`

Shared buffer example:

```
capacity = 5
```

### Producer logic

```
if buffer full → wait()
else add item
notify consumer
```

### Consumer logic

```
if buffer empty → wait()
else remove item
notify producer
```

---

# 5️⃣ Example Code (Simplified)

### Shared buffer

```java
class Buffer {

    Queue<Integer> queue = new LinkedList<>();
    int capacity = 5;

    public synchronized void produce(int value) throws InterruptedException {

        while(queue.size() == capacity) {
            wait();
        }

        queue.add(value);
        System.out.println("Produced " + value);

        notifyAll();
    }

    public synchronized void consume() throws InterruptedException {

        while(queue.isEmpty()) {
            wait();
        }

        int value = queue.poll();
        System.out.println("Consumed " + value);

        notifyAll();
    }
}
```

---

# Producer thread

```java
while(true) {
    buffer.produce(i++);
}
```

---

# Consumer thread

```java
while(true) {
    buffer.consume();
}
```

---

# 6️⃣ Why We Use `while`, Not `if`

Interview trap ⚠

We write:

```java
while(queue.isEmpty()) {
    wait();
}
```

NOT:

```java
if(queue.isEmpty()) {
    wait();
}
```

Because of:

```
Spurious wakeups
```

Threads may wake up **without notify()**.

So we re-check the condition.

---

# 7️⃣ Modern Java Solution (Better)

Instead of writing `wait()` / `notify()` manually, Java provides:

```
BlockingQueue
```

Example:

```java
BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);
```

Producer:

```java
queue.put(value);
```

Consumer:

```java
queue.take();
```

Queue automatically handles:

```
locking
waiting
wakeup
```

---

# 8️⃣ Interview One-Liner

> The Producer–Consumer problem coordinates threads producing and consuming data using a shared buffer while preventing race conditions and overflow/underflow.

---

# Quick Thinking Question

Suppose:

```
Buffer capacity = 5
Producer speed = very fast
Consumer speed = very slow
```

What problem will happen if we **do not use wait()**?

### Answer:
**Buffer Overflow** will happen.
> **“The producer may keep adding items faster than the consumer removes them, causing the buffer to overflow.”**

Now let’s explain it clearly.

---

# What Happens Without `wait()`

Assume:

```
Buffer capacity = 5
Producer = very fast
Consumer = slow
```

Producer keeps executing:

```java
queue.add(item);
```

Without checking capacity.

So the buffer becomes:

```
[1,2,3,4,5]  (full)
```

Producer continues:

```
[1,2,3,4,5,6,7,8,9...]
```

Result:

```
Buffer overflow
Memory growth
Possible crash
```

---

# Why `wait()` Solves This

Producer logic:

```java
while(queue.size() == capacity) {
    wait();
}
```

Meaning:

```
Buffer full → producer sleeps
Consumer removes item → notify producer
Producer wakes up
```

Now buffer stays controlled.

---

# Opposite Problem

If **consumer is faster** than producer.

Example:

```
Consumer tries to remove item
Buffer is empty
```

This causes:

```
Buffer Underflow
```

Consumer must also wait:

```java
while(queue.isEmpty()) {
    wait();
}
```

---

# Final Flow

```
Producer
   ↓
Shared Buffer
   ↓
Consumer
```

Rules:

```
Buffer full → producer waits
Buffer empty → consumer waits
```

---

# Interview One-Liner

> Producer–Consumer uses wait() and notify() to coordinate threads sharing a bounded buffer, preventing overflow and underflow.

---

# Where We Are Now in Multithreading

You now understand:

```
Threads
Race conditions
synchronized
Deadlock
volatile
CAS
Atomic classes
ExecutorService
Thread pools
wait/notify
Producer–Consumer
```

You're already covering **most Java concurrency interviews**.

---

# Next Very Important Topic

Now we move to **BlockingQueue** — which is the **modern Java solution for Producer–Consumer**.

Before I explain it, answer this:

### Why is `BlockingQueue` better than using `wait()` and `notify()` manually?

### Answer:
```text
BlockingQueue simplifies concurrent producer–consumer implementations by automatically handling thread blocking and synchronization.
```
---

# Why `BlockingQueue` Is Better Than `wait()/notify()`

Your core idea is right:

> **BlockingQueue automatically handles waiting and waking threads.**

Let’s explain the full reasons.

---

# 1️⃣ Automatic Waiting (Blocking)

When queue is **full**:

```java
queue.put(item);
```

Producer **automatically blocks** until space becomes available.

When queue is **empty**:

```java
queue.take();
```

Consumer **automatically blocks** until an item appears.

So we do not need:

```java
wait()
notify()
synchronized
```

---

# 2️⃣ Built-in Thread Safety

`BlockingQueue` internally uses:

```
locks
conditions
safe memory visibility
```

So we avoid writing complicated synchronization code.

---

# 3️⃣ Prevents Classic Bugs

Manual `wait/notify` code can cause:

```
missed notification
deadlock
spurious wakeups
incorrect synchronization
```

`BlockingQueue` handles these correctly.

---

# 4️⃣ Cleaner Code

Manual producer-consumer:

```java
synchronized(buffer) {
   while(buffer full) wait();
   add item
   notifyAll()
}
```

Using `BlockingQueue`:

```java
queue.put(item);
```

Much simpler.

---

# 5️⃣ Used Everywhere in Java Internals

Many frameworks use `BlockingQueue`:

```
ThreadPoolExecutor
ExecutorService
Task scheduling systems
Message processing systems
```

Example:

```
ThreadPoolExecutor
        ↓
   BlockingQueue
        ↓
    Worker Threads
```

---

# Common BlockingQueue Implementations

| Queue                   | Description              |
| ----------------------- | ------------------------ |
| `ArrayBlockingQueue`    | fixed capacity queue     |
| `LinkedBlockingQueue`   | optionally bounded queue |
| `PriorityBlockingQueue` | priority ordering        |
| `DelayQueue`            | delayed tasks            |
| `SynchronousQueue`      | direct handoff           |

---

# Interview One-Liner

> BlockingQueue simplifies concurrent producer–consumer implementations by automatically handling thread blocking and synchronization.

---

# Quick Interview Question

Which method **does NOT block** if the queue is full?

```
put()
offer()
take()
```

Which one?

### Answer:

The correct answer is: ✅ **`offer()`**

Let’s understand clearly.

---

# BlockingQueue Important Methods

## 1️⃣ `put()`

```java
queue.put(item);
```

Behavior:

```
If queue is full → thread BLOCKS
Waits until space is available
```

So **put() blocks**.

---

## 2️⃣ `take()`

```java
queue.take();
```

Behavior:

```
If queue is empty → thread BLOCKS
Waits until element appears
```

So **take() also blocks**.

---

## 3️⃣ `offer()`

```java
queue.offer(item);
```

Behavior:

```
If queue is full → returns false
Does NOT block
```

Example:

```java
boolean success = queue.offer(10);
```

If queue is full:

```
success = false
```

---

# There is Also Timed Offer

```java
queue.offer(item, 5, TimeUnit.SECONDS);
```

Meaning:

```
Wait up to 5 seconds
If still full → return false
```

---

# Summary Table

| Method    | Behavior        |
| --------- | --------------- |
| `put()`   | blocks if full  |
| `take()`  | blocks if empty |
| `offer()` | does NOT block  |
| `poll()`  | does NOT block  |

---

# Interview One-Liner

> `put()` and `take()` are blocking operations, while `offer()` and `poll()` return immediately if the queue cannot accept or provide an element.

---

# Where We Are in Multithreading

You now understand:

```
Threads
Race conditions
synchronized
volatile
Atomic classes
Thread pools
ExecutorService
wait/notify
Producer–Consumer
BlockingQueue
```

Next **very powerful topic** (used in high-level concurrency):

# `ReentrantLock`

It gives **more control than synchronized**.

Before I explain it, try answering:

### Why might `ReentrantLock` be better than `synchronized`?

### Answer:
```text
ReentrantLock provides more flexible and powerful locking mechanisms than synchronized, including tryLock, timeout locks, interruptible locks, and fairness policies.
```

This is an **important advanced concurrency topic**. I’ll explain it clearly from **basic → internal idea → interview level**.

---

# 1️⃣ What is `ReentrantLock`?

`ReentrantLock` is a class from:

```
java.util.concurrent.locks
```

It provides **explicit locking** similar to `synchronized`, but with **more control and features**.

Example:

```java
Lock lock = new ReentrantLock();

lock.lock();
try {
    // critical section
} finally {
    lock.unlock();
}
```

This protects shared resources like `synchronized`.

---

# 2️⃣ Why It Is Called “Reentrant”

Reentrant means:

```
A thread that already holds the lock
can acquire it again
```

Example:

```java
lock.lock();   // first time
lock.lock();   // same thread can lock again
```

Java keeps a **hold count**.

To release:

```
unlock()
unlock()
```

This behavior is the same as `synchronized`.

---

# 3️⃣ `synchronized` vs `ReentrantLock`

| Feature             | synchronized | ReentrantLock           |
| ------------------- | ------------ | ----------------------- |
| Lock control        | automatic    | manual                  |
| Try acquiring lock  | ❌ No         | ✔ `tryLock()`           |
| Timeout lock        | ❌ No         | ✔ `tryLock(timeout)`    |
| Interruptible lock  | ❌ No         | ✔ `lockInterruptibly()` |
| Fair locking        | ❌ No         | ✔ optional              |
| Multiple conditions | ❌ No         | ✔ `Condition`           |

---

# 4️⃣ Important Advantage — `tryLock()`

With `synchronized`, if the lock is busy:

```
Thread waits forever
```

With `ReentrantLock`:

```java
if(lock.tryLock()) {
   try {
      // critical section
   } finally {
      lock.unlock();
   }
} else {
   System.out.println("Lock not available");
}
```

Thread **does not block**.

---

# 5️⃣ Timeout Lock (Very Useful)

```java
lock.tryLock(5, TimeUnit.SECONDS);
```

Meaning:

```
Wait 5 seconds
If lock not available → give up
```

This helps avoid **deadlocks**.

---

# 6️⃣ Fair Locking

Default locks are **unfair**.

Meaning:

```
New thread may jump ahead in queue
```

Fair lock ensures:

```
First-come-first-served
```

Example:

```java
Lock lock = new ReentrantLock(true);
```

---

# 7️⃣ Interruptible Lock

You can interrupt waiting threads.

Example:

```java
lock.lockInterruptibly();
```

If thread receives interrupt:

```
InterruptedException thrown
```

`synchronized` cannot do this.

---

# 8️⃣ Condition Variables (Advanced Feature)

With `synchronized`, we use:

```
wait()
notify()
notifyAll()
```

With `ReentrantLock` we use:

```
Condition
```

Example:

```java
Condition condition = lock.newCondition();

condition.await();
condition.signal();
```

This allows **multiple wait queues**, which is more powerful.

---

# 9️⃣ Example

```java
Lock lock = new ReentrantLock();

public void increment() {
    lock.lock();
    try {
        counter++;
    } finally {
        lock.unlock();
    }
}
```

The `finally` block ensures the lock **always releases**.

---

# 10️⃣ Internal Concept (Interview Insight)

Internally `ReentrantLock` uses:

```
CAS
AbstractQueuedSynchronizer (AQS)
FIFO wait queue
```

This is part of Java's **high-performance concurrency framework**.

---

# Interview One-Liner

> ReentrantLock provides more flexible and powerful locking mechanisms than synchronized, including tryLock, timeout locks, interruptible locks, and fairness policies.

---

# Very Common Interview Question

What happens if we forget:

```java
lock.unlock();
```

inside `ReentrantLock` code?

What problem will occur?

### Answer:
```text
If unlock() is not called, the lock remains held and other threads waiting for it may block indefinitely.
```

**“Other threads will remain blocked because the current thread never releases the lock.”**

Now let’s explain it clearly.

---

# What Happens If `unlock()` Is Not Called

Example:

```java
Lock lock = new ReentrantLock();

lock.lock();
counter++;
// unlock() forgotten
```

Result:

```
Lock remains held forever
```

So:

```
Thread1 → holds lock
Thread2 → waiting for lock
Thread3 → waiting for lock
Thread4 → waiting for lock
```

All other threads will **block indefinitely**.

---

# This Can Cause

```
Thread starvation
Application freeze
Deadlock-like situation
```

Your program may appear **hung**.

---

# Why `finally` Is Mandatory

Correct pattern:

```java
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();
}
```

Why?

Because even if an exception occurs:

```
lock.unlock() still executes
```

---

# Interview One-Liner

> If `unlock()` is not called, the lock remains held and other threads waiting for it may block indefinitely.

---

# Important Difference From `synchronized`

With `synchronized`:

```java
synchronized(obj) {
    // code
}
```

Lock release is **automatic** when the block exits.

With `ReentrantLock`:

```
Lock release is manual
```

So forgetting `unlock()` is dangerous.

---

# Where We Are in Multithreading

You now know:

```
Threads
Race conditions
synchronized
volatile
Atomic classes
Thread pools
ExecutorService
wait / notify
Producer–Consumer
BlockingQueue
ReentrantLock
```

We are now very close to **complete Java concurrency fundamentals**.

---

# Next Important Topic

Now we move to **ReadWriteLock**.

This is used when:

```
Many threads read data
Few threads write data
```

Before I explain:

### Question

Why would allowing **multiple readers but only one writer** improve performance?

### Answer:
```text
ReadWriteLock improves performance in read-heavy systems by allowing concurrent reads while ensuring exclusive access for writes.
```

**“Multiple readers do not block each other, but writers must block other threads to maintain data consistency.”**

---

# Why Multiple Readers Improve Performance

In many systems:

```
Reads >> Writes
```

Example:

```
Database lookup
Cache reading
Configuration reading
User profile fetching
```

So most operations are **read operations**.

---

# Problem With Normal Lock (`synchronized` / `ReentrantLock`)

If we use a normal lock:

```java
lock.lock();
readData();
lock.unlock();
```

Then:

```
Thread1 reading
Thread2 reading
Thread3 reading
Thread4 reading
```

All of them **wait for each other**, even though reading does **not modify data**.

So concurrency is wasted.

---

# ReadWriteLock Idea

Allow:

```
Multiple readers simultaneously
But only one writer at a time
```

Rules:

```
Reader + Reader  → allowed
Reader + Writer  → blocked
Writer + Writer  → blocked
```

---

# Visual Example

Without ReadWriteLock:

```
R1 → wait
R2 → wait
R3 → wait
```

Only one thread executes.

---

With ReadWriteLock:

```
R1 reading
R2 reading
R3 reading
```

All run **simultaneously**.

Performance improves significantly.

---

# When Writer Appears

If a writer comes:

```
Writer must wait until all readers finish
```

Because writing modifies shared data.

---

# Java Implementation

Java provides:

```
ReentrantReadWriteLock
```

Example:

```java
ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

Lock readLock = lock.readLock();
Lock writeLock = lock.writeLock();
```

---

# Reading

```java
readLock.lock();
try {
    readData();
} finally {
    readLock.unlock();
}
```

Multiple threads can run this.

---

# Writing

```java
writeLock.lock();
try {
    writeData();
} finally {
    writeLock.unlock();
}
```

Only **one writer allowed**.

---

# Interview One-Liner

> ReadWriteLock improves performance in read-heavy systems by allowing concurrent reads while ensuring exclusive access for writes.

---

# Real System Example

Imagine a **cache system**:

```
1000 threads reading cached data
5 threads updating cache
```

Using `ReadWriteLock`:

```
1000 reads can run concurrently
```

Huge performance improvement.

---

# Quick Interview Question

What happens if:

```
5 readers are reading
1 writer arrives
```

Will:

A) Writer run immediately
B) Writer wait for readers to finish

Which one?

### Answer:
Correct ✅ — **Writer must wait until all readers release the read lock.**

---

# Why Writer Must Wait

When threads hold the **read lock**:

```
R1 reading
R2 reading
R3 reading
R4 reading
R5 reading
```

A writer arrives:

```
W1 wants to write
```

But writing **modifies shared data**, so the writer needs **exclusive access**.

Rule of `ReadWriteLock`:

```
Readers + Readers → allowed
Readers + Writer  → NOT allowed
Writer + Writer   → NOT allowed
```

So the writer must wait until:

```
R1 unlock
R2 unlock
R3 unlock
R4 unlock
R5 unlock
```

Then the writer acquires the **write lock**.

---

# Important Interview Follow-up (Very Common)

What happens if:

```
Readers keep arriving continuously
Writer is waiting
```

Example:

```
R1 reading
R2 reading
R3 reading
Writer waiting
R4 arrives
R5 arrives
R6 arrives
...
```

Possible problem:

```
Writer may never get the lock
```

This is called:

```
Writer Starvation
```

---

# How Java Solves This

`ReentrantReadWriteLock` can use **fair mode**.

Example:

```java
ReentrantReadWriteLock lock =
        new ReentrantReadWriteLock(true);
```

Fair lock ensures:

```
Threads acquire locks in arrival order
```

So writers are not starved.

---

# Interview One-Liner

> In ReadWriteLock, multiple readers can access simultaneously, but writers require exclusive access and must wait until all readers release the lock.

---

# Where You Are Now (Very Important)

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

# Remaining Advanced Concurrency Topics

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

# Next Topic (Very Easy but Very Powerful)

## `CountDownLatch`

Before I explain:

Imagine **5 worker threads must finish their job before the main thread continues**.

Which thread should wait?

```
Main thread
or
Worker threads
```

What do you think?

### Answer:
✅ — **the main thread waits**.

Now let’s understand **CountDownLatch**, one of the easiest and most useful concurrency tools.

---

# 1️⃣ What is `CountDownLatch`?

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

# 2️⃣ Real Life Example

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

# 3️⃣ Basic Code Example

Create latch:

```java
CountDownLatch latch = new CountDownLatch(3);
```

Meaning:

```
Main thread waits until 3 events happen
```

---

# Worker threads

```java
latch.countDown();
```

Each call reduces the counter:

```
3 → 2 → 1 → 0
```

---

# Main thread waits

```java
latch.await();
```

Meaning:

```
Wait until counter becomes 0
```

---

# Full Example

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

# 4️⃣ Important Methods

| Method        | Purpose                       |
| ------------- | ----------------------------- |
| `await()`     | wait until count reaches zero |
| `countDown()` | decrease counter              |
| `getCount()`  | current count                 |

---

# 5️⃣ Important Property

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

# Interview One-Liner

> CountDownLatch allows one or more threads to wait until a set of operations performed by other threads completes.

---

# Quick Interview Question

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

### Answer:
```text
B) Wait forever

CountDownLatch.await() blocks until the count reaches zero; if the count never reaches zero, the waiting thread will block indefinitely unless a timeout is used.
```
Let's understand step by step
---
### Code

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

# What happens to `await()`?

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

# Why this is important

If some worker thread **fails or forgets to call `countDown()`**, the main thread can get **stuck permanently**.

This is a common bug in concurrent programs.

---

# How to avoid waiting forever

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

# Interview one-liner

> `CountDownLatch.await()` blocks until the count reaches zero; if the count never reaches zero, the waiting thread will block indefinitely unless a timeout is used.

---



Great. Now we go to the next important concurrency tool.

# CyclicBarrier

This concept is very similar to `CountDownLatch`, but with one big difference.

---

# 1️⃣ What is CyclicBarrier?

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

# Real-world Example

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

# 2️⃣ How CyclicBarrier Works

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

# 3️⃣ Example Code

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

# 4️⃣ Why it is called **Cyclic**

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

# 5️⃣ Barrier Action (Advanced Feature)

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

# 6️⃣ CyclicBarrier vs CountDownLatch

| Feature       | CountDownLatch   | CyclicBarrier    |
| ------------- | ---------------- | ---------------- |
| Reusable      | ❌ No             | ✔ Yes            |
| Who waits     | One thread waits | All threads wait |
| Counter reset | ❌ No             | ✔ Yes            |

---

# Interview One-Liner

> `CyclicBarrier` allows a group of threads to wait for each other at a common barrier point before continuing execution.

---

# Important Interview Question

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

### Answer:

**B) Threads wait forever**

---

# Why?

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

# Important Exception Case

If one waiting thread is **interrupted**, then the barrier becomes **broken** and other threads get:

```
BrokenBarrierException
```

---

# Interview One-liner

> A CyclicBarrier opens only when the specified number of threads reach the barrier; otherwise, waiting threads remain blocked.

---

# Quick Comparison (Very Important)

| Tool               | Purpose                                       |
| ------------------ | --------------------------------------------- |
| **CountDownLatch** | One thread waits for others to finish         |
| **CyclicBarrier**  | All threads wait for each other               |
| **Semaphore**      | Controls number of threads accessing resource |

---

# Next Topic (Last Core Concurrency Tool)

We should now learn **Semaphore**, which controls **resource access**.

---

# 1️⃣ What is a Semaphore?

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

# 2️⃣ Real-Life Example

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

# 3️⃣ Java Semaphore Example

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

# 4️⃣ Example Code

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

# 5️⃣ Important Methods

| Method               | Purpose                 |
| -------------------- | ----------------------- |
| `acquire()`          | take permit (may block) |
| `release()`          | return permit           |
| `tryAcquire()`       | try without waiting     |
| `availablePermits()` | check remaining permits |

---

# 6️⃣ Binary Semaphore

If we create:

```java
Semaphore semaphore = new Semaphore(1);
```

Then only **one thread allowed**.

This behaves like a **mutex lock**.

---

# 7️⃣ Semaphore vs Lock

| Feature                 | Semaphore | Lock |
| ----------------------- | --------- | ---- |
| Allows multiple threads | ✔ Yes     | ❌ No |
| Used for resource pool  | ✔ Yes     | ❌ No |
| Mutual exclusion        | Optional  | Yes  |

---

# Interview One-liner

> Semaphore controls access to a limited number of resources by allowing only a fixed number of threads to acquire permits simultaneously.

---

# Where You Are Now

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

# Next (Final Advanced Topics)

Two powerful tools remain:

```
ForkJoinPool
CompletableFuture
```

These are used in **high-performance async programming**.

---

Before moving forward, one quick check:

If we create:

```java
Semaphore semaphore = new Semaphore(5);
```

and **10 threads call `acquire()`**, how many threads will run immediately?

### Answer:
> **“5 threads will acquire permits and run immediately, while the remaining 5 threads will block until permits are released.”**

---

# Step-by-step What Happens

Semaphore created:

```java
Semaphore semaphore = new Semaphore(5);
```

Meaning:

```
5 permits available
```

Now 10 threads call:

```java
semaphore.acquire();
```

Execution:

```
Thread1 → gets permit
Thread2 → gets permit
Thread3 → gets permit
Thread4 → gets permit
Thread5 → gets permit
```

Permits left:

```
0
```

Now:

```
Thread6 → waits
Thread7 → waits
Thread8 → waits
Thread9 → waits
Thread10 → waits
```

When a thread finishes:

```java
semaphore.release();
```

Example:

```
Thread1 releases permit
Thread6 acquires permit
```

---

# Visual Flow

```
Permits = 5

Running threads:
T1 T2 T3 T4 T5

Waiting threads:
T6 T7 T8 T9 T10
```

---

# Interview One-Liner

> A semaphore with N permits allows at most N threads to access a resource simultaneously.

---


# Synchronous And Asynchronous Execution

---

```text
Synchronous execution blocks until a task completes, while asynchronous execution allows tasks to run independently without blocking the main thread.
```

---

# 1️⃣ Synchronous Execution

In **synchronous execution**, tasks run **one after another**.

The next task **waits until the previous task finishes**.

Example:

```java
task1();
task2();
task3();
```

Execution:

```
task1 → finishes
task2 → starts
task2 → finishes
task3 → starts
```

Everything happens **in order**.

Example:

```
Download file
Process file
Save file
```

Each step waits for the previous step.

---

# 2️⃣ Asynchronous Execution

In **asynchronous execution**, tasks can run **independently** without blocking the main thread.

Example:

```java
downloadFileAsync();
processDataAsync();
sendEmailAsync();
```

Execution:

```
Task1 starts
Task2 starts
Task3 starts
```

All may run **at the same time**.

The main thread **does not wait**.

---

# Visual Difference

### Synchronous

```
Task1 → Task2 → Task3
```

### Asynchronous

```
Task1
   ↘
Task2
   ↘
Task3
```

Tasks can overlap.

---

# Real Backend Example

Imagine a web server request:

```
User request arrives
```

Synchronous flow:

```
Fetch user
Fetch orders
Fetch recommendations
Return response
```

Each step waits.

---

Async version:

```
Fetch user
Fetch orders
Fetch recommendations
```

All run **in parallel**, making response faster.

---

# Interview One-Liner

> Synchronous execution blocks until a task completes, while asynchronous execution allows tasks to run independently without blocking the main thread.

---

# Why `CompletableFuture` Exists

Java created **CompletableFuture** to manage **asynchronous tasks easily**.

It allows:

```
Run tasks in background
Chain tasks
Combine results
Handle errors
```

---

# Example

```java
CompletableFuture.supplyAsync(() -> {
    return fetchData();
});
```

This runs **in another thread automatically**.

---

# Quick Thinking Question

Which one is **asynchronous**?

### A

```java
int data = fetchData();
process(data);
```

### B

```java
CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data));
```

### Answer:
✅ — **B is asynchronous.**

> **“Option B is asynchronous because the task runs in a separate thread using `CompletableFuture`.”**

---

# Why B is Asynchronous

### Option A

```java
int data = fetchData();
process(data);
```

Execution:

```
fetchData() → wait until complete
process(data) → start after fetchData finishes
```

Everything runs in **same thread sequentially**.

So it is **synchronous**.

---

### Option B

```java
CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data));
```

Execution:

```
Main thread continues
fetchData() runs in background thread
When result ready → process() runs
```

So:

```
No blocking
Background execution
```

This is **asynchronous programming**.

---

# Step-by-Step Execution

```
Main thread starts CompletableFuture
        ↓
Worker thread executes fetchData()
        ↓
Result returned
        ↓
thenApply() processes result
```

---

# Why `CompletableFuture` is Powerful

It allows:

```
Async execution
Task chaining
Parallel tasks
Error handling
Combining multiple tasks
```

Example real backend use:

```
Fetch user profile
Fetch orders
Fetch recommendations
```

All done **in parallel**.

---

# Simple Example

```java
CompletableFuture<String> future =
        CompletableFuture.supplyAsync(() -> "Hello");

System.out.println(future.get());
```

Output:

```
Hello
```

Task executed in **background thread**.

---

# Interview One-Liner

> `CompletableFuture` provides a powerful way to perform asynchronous computations and chain dependent tasks without blocking threads.

---

The last concurrency concept used in **high-performance parallel algorithms**:

## `ForkJoinPool`

It is used for:

```
Parallel recursion
Divide and conquer algorithms
Parallel streams
```

Before I explain it, quick question:

Which algorithm type benefits most from parallel processing?

```
A) Sequential algorithms
B) Divide and conquer algorithms
```

What do you think?

### Answer:
```text
ForkJoinPool is a framework for parallel divide-and-conquer algorithms that uses work-stealing to efficiently utilize CPU cores.
```

**“the algorithm can be divided into multiple parts and executed in parallel.”**

---

# Why Divide and Conquer Works Well with Parallelism

Divide and Conquer algorithms follow this pattern:

```
Problem
  ↓
Divide into smaller problems
  ↓
Solve each part independently
  ↓
Combine results
```

Example:

```
Sort array
   ↓
Split array
   ↓
Sort left + sort right
   ↓
Merge results
```

Because **sub-problems are independent**, they can run **in parallel threads**.

---

# This is Exactly What `ForkJoinPool` Does

Java created **ForkJoinPool** to efficiently run **divide-and-conquer tasks in parallel**.

Flow:

```
Task
 ↓
Fork → split into smaller tasks
 ↓
Worker threads execute tasks
 ↓
Join → combine results
```

---

# Example Algorithm

Imagine summing a large array:

```
Sum array[0..1000]
```

Instead of one thread:

```
sum(0..1000)
```

ForkJoin splits it:

```
sum(0..500)   sum(501..1000)
```

Then further splits:

```
sum(0..250) sum(251..500) sum(501..750) sum(751..1000)
```

Each piece runs **in parallel threads**.

Finally results combine.

---

# Java ForkJoin Example

```java
ForkJoinPool pool = new ForkJoinPool();

pool.invoke(new SumTask(array, 0, array.length));
```

Task structure:

```java
class SumTask extends RecursiveTask<Integer> {

    protected Integer compute() {

        if(task small enough)
            compute directly
        else {
            split task
            fork subtasks
            join results
        }
    }
}
```

---

# Important Feature: Work Stealing

ForkJoinPool uses a powerful technique called:

```
Work Stealing
```

Meaning:

```
If one thread finishes early
it steals work from other threads
```

This keeps CPU **fully utilized**.

---

# Where ForkJoinPool is Used

You actually use it **without knowing**.

Example:

```java
Arrays.parallelSort()
Stream.parallel()
CompletableFuture
```

All internally use **ForkJoinPool**.

---

# Interview One-Liner

> ForkJoinPool is a framework for parallel divide-and-conquer algorithms that uses work-stealing to efficiently utilize CPU cores.

---

# Final Concurrency Interview Question

Which of these is **NOT thread-safe**?

```
A) Vector
B) Hashtable
C) ArrayList
D) ConcurrentHashMap
```

What do you think?


### Answer:
✅ — **ArrayList is NOT thread-safe.**

> **“ArrayList is not thread-safe because its operations are not synchronized.”**

---

# Thread Safety of Given Collections

| Collection            | Thread Safe? | Reason                        |
| --------------------- | ------------ | ----------------------------- |
| **Vector**            | ✔ Yes        | All methods are synchronized  |
| **Hashtable**         | ✔ Yes        | Methods are synchronized      |
| **ArrayList**         | ❌ No         | No synchronization            |
| **ConcurrentHashMap** | ✔ Yes        | Uses fine-grained concurrency |

So the correct answer is:

```
C) ArrayList
```

---

# Why `ArrayList` is Not Thread-safe

Example:

```java
List<Integer> list = new ArrayList<>();

Thread t1 = new Thread(() -> list.add(1));
Thread t2 = new Thread(() -> list.add(2));
```

Both threads modify the list **at the same time**.

Possible issues:

```
Race condition
Data corruption
Incorrect size
Index errors
```

---

# How to Make ArrayList Thread-safe

### Option 1 — Synchronized List

```java
List<Integer> list =
    Collections.synchronizedList(new ArrayList<>());
```

---

### Option 2 — CopyOnWriteArrayList

```java
List<Integer> list = new CopyOnWriteArrayList<>();
```

Used when:

```
Many reads
Few writes
```

---

# Interview One-Liner

> ArrayList is not thread-safe because its methods are not synchronized, so concurrent modifications can cause race conditions.