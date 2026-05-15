# ReentrantLock and ReadWriteLock

## Definition

ReentrantLock is an explicit lock with more control than `synchronized`. ReadWriteLock separates read locks and write locks.

## Why It Matters

These locks help when you need timeout locking, interruptible locking, fairness, or many readers with fewer writers.

## Core Example

A cache can allow multiple reader threads at the same time, but only one writer thread when data is updated.

## Common Traps

- You must call `unlock()` manually.
- Use `finally` to release a ReentrantLock.
- Fair locks can reduce throughput.
- ReadWriteLock helps only when reads are much more frequent than writes.
- A writer must wait until readers release the read lock.

## Interview Answer

ReentrantLock provides explicit lock control with features like `tryLock()`, timeout, interruptible locking, and fairness. ReadWriteLock improves read-heavy workloads by allowing multiple readers at the same time while still giving exclusive access to writers.

## Quick Revision

- ReentrantLock needs manual unlock.
- Always unlock in `finally`.
- `tryLock()` avoids waiting forever.
- Read lock allows multiple readers.
- Write lock is exclusive.
- Useful for read-heavy shared data.

## Deep Dive


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

### `ReentrantLock`

It gives **more control than synchronized**.

Before I explain it, try answering:

##### Why might `ReentrantLock` be better than `synchronized`?

##### Answer:
```text
ReentrantLock provides more flexible and powerful locking mechanisms than synchronized, including tryLock, timeout locks, interruptible locks, and fairness policies.
```

This is an **important advanced concurrency topic**. I’ll explain it clearly from **basic → internal idea → interview level**.

---

### 1️⃣ What is `ReentrantLock`?

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

### 2️⃣ Why It Is Called “Reentrant”

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

### 3️⃣ `synchronized` vs `ReentrantLock`

| Feature             | synchronized | ReentrantLock           |
| ------------------- | ------------ | ----------------------- |
| Lock control        | automatic    | manual                  |
| Try acquiring lock  | ❌ No         | ✔ `tryLock()`           |
| Timeout lock        | ❌ No         | ✔ `tryLock(timeout)`    |
| Interruptible lock  | ❌ No         | ✔ `lockInterruptibly()` |
| Fair locking        | ❌ No         | ✔ optional              |
| Multiple conditions | ❌ No         | ✔ `Condition`           |

---

### 4️⃣ Important Advantage — `tryLock()`

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

### 5️⃣ Timeout Lock (Very Useful)

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

### 6️⃣ Fair Locking

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

### 7️⃣ Interruptible Lock

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

### 8️⃣ Condition Variables (Advanced Feature)

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

### 9️⃣ Example

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

### 10️⃣ Internal Concept (Interview Insight)

Internally `ReentrantLock` uses:

```
CAS
AbstractQueuedSynchronizer (AQS)
FIFO wait queue
```

This is part of Java's **high-performance concurrency framework**.

---

### Interview One-Liner

> ReentrantLock provides more flexible and powerful locking mechanisms than synchronized, including tryLock, timeout locks, interruptible locks, and fairness policies.

---

### Very Common Interview Question

What happens if we forget:

```java
lock.unlock();
```

inside `ReentrantLock` code?

What problem will occur?

##### Answer:
```text
If unlock() is not called, the lock remains held and other threads waiting for it may block indefinitely.
```

**“Other threads will remain blocked because the current thread never releases the lock.”**

Now let’s explain it clearly.

---

### What Happens If `unlock()` Is Not Called

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

### This Can Cause

```
Thread starvation
Application freeze
Deadlock-like situation
```

Your program may appear **hung**.

---

### Why `finally` Is Mandatory

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

### Interview One-Liner

> If `unlock()` is not called, the lock remains held and other threads waiting for it may block indefinitely.

---

### Important Difference From `synchronized`

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

### Where We Are in Multithreading

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

### Next Important Topic

Now we move to **ReadWriteLock**.

This is used when:

```
Many threads read data
Few threads write data
```

Before I explain:

##### Question

Why would allowing **multiple readers but only one writer** improve performance?

##### Answer:
```text
ReadWriteLock improves performance in read-heavy systems by allowing concurrent reads while ensuring exclusive access for writes.
```

**“Multiple readers do not block each other, but writers must block other threads to maintain data consistency.”**

---

### Why Multiple Readers Improve Performance

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

### Problem With Normal Lock (`synchronized` / `ReentrantLock`)

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

### ReadWriteLock Idea

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

### Visual Example

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

### When Writer Appears

If a writer comes:

```
Writer must wait until all readers finish
```

Because writing modifies shared data.

---

### Java Implementation

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

### Reading

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

### Writing

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

### Interview One-Liner

> ReadWriteLock improves performance in read-heavy systems by allowing concurrent reads while ensuring exclusive access for writes.

---

### Real System Example

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

### Quick Interview Question

What happens if:

```
5 readers are reading
1 writer arrives
```

Will:

A) Writer run immediately
B) Writer wait for readers to finish

Which one?

##### Answer:
Correct ✅ — **Writer must wait until all readers release the read lock.**

---

### Why Writer Must Wait

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

### Important Interview Follow-up (Very Common)

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

### How Java Solves This

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

### Interview One-Liner

> In ReadWriteLock, multiple readers can access simultaneously, but writers require exclusive access and must wait until all readers release the lock.

---

