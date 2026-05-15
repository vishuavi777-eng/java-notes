# ThreadPoolExecutor and Queues

## Definition

ThreadPoolExecutor is the core Java thread pool implementation that controls worker count, task queues, and rejection behavior.

## Why It Matters

It helps you explain how Java handles many tasks without creating unlimited threads.

## Core Example

A pool can start core threads first, then queue tasks, then create extra threads up to max size, then reject tasks when overloaded.

## Common Traps

- Queue type changes pool behavior.
- Unbounded queues can hide overload and grow memory.
- SynchronousQueue has no capacity.
- `maximumPoolSize` may not matter with an unbounded queue.
- RejectedExecutionHandler controls overload behavior.

## Interview Answer

ThreadPoolExecutor uses core pool size, maximum pool size, keep-alive time, a work queue, and a rejection policy. When tasks arrive, the pool creates core threads, queues extra work, creates more threads if the queue cannot accept tasks, and rejects work when both queue and pool are full.

## Quick Revision

- Core threads are created first.
- Queue stores waiting tasks.
- Max threads handle pressure after queue limits.
- SynchronousQueue hands off directly.
- Bounded queues help control memory.
- Rejection policy handles overload.

## Deep Dive

Now we move to **ThreadPoolExecutor Internals** — this is where **senior interview questions** come from.

First question:

##### Why does a ThreadPool need a **task queue**?

What problem does the queue solve?

##### Answer:
```text
Thread pools reuse a limited number of threads to execute many tasks efficiently while controlling resource usage.
```

Perfect — this is the right time to understand **ThreadPoolExecutor deeply**, because many backend interviews ask **internals and tuning questions**.

We will go step-by-step.

---

### 1️⃣ Why Thread Pools Exist

If you create threads manually:

```java
new Thread(task).start();
```

Problems:

```
Too many threads
Memory consumption
Context switching overhead
Thread creation cost
```

Solution:

```
Create a limited number of threads
Reuse them for multiple tasks
```

That is **Thread Pool**.

---

### 2️⃣ ThreadPool Basic Idea

Instead of:

```
1 thread per task
```

We do:

```
Few threads
Many tasks
Tasks wait in queue
```

Architecture:

```
        Tasks
          |
          v
      Task Queue
          |
          v
   ThreadPool Workers
   [T1] [T2] [T3]
```

Threads pick tasks from the queue.

---

### 3️⃣ Why the Task Queue Is Needed

Imagine **100 tasks arrive instantly** but pool size is **5 threads**.

Without queue:

```
95 tasks would be lost
```

Queue allows:

```
Tasks wait until a thread is free
```

So queue solves:

```
Load buffering
Thread reuse
Task management
```

---

### 4️⃣ ThreadPoolExecutor Internal Components

ThreadPoolExecutor has **4 main parts**.

##### 1️⃣ Core Pool Size

Minimum number of threads always kept alive.

Example:

```
corePoolSize = 4
```

Pool always keeps **4 threads ready**.

---

##### 2️⃣ Maximum Pool Size

Maximum threads allowed.

Example:

```
maxPoolSize = 10
```

Pool may grow to **10 threads during heavy load**.

---

##### 3️⃣ Task Queue

Where tasks wait.

Common types:

```
LinkedBlockingQueue
ArrayBlockingQueue
SynchronousQueue
```

---

##### 4️⃣ KeepAlive Time

Extra threads (above core size) are destroyed after inactivity.

Example:

```
keepAlive = 60 seconds
```

---

### 5️⃣ ThreadPool Execution Algorithm (Very Important)

When a task arrives:

##### Step 1

If active threads < corePoolSize

```
Create new thread
```

---

##### Step 2

Else if queue not full

```
Add task to queue
```

---

##### Step 3

Else if threads < maxPoolSize

```
Create extra thread
```

---

##### Step 4

Else

```
Reject task
```

---

### Visual Flow

```
Task arrives
     |
     v
Threads < corePool ? → create thread
     |
     v
Queue full ? → add to queue
     |
     v
Threads < maxPool ? → create thread
     |
     v
Reject task
```

---

### 6️⃣ Task Rejection Policies

If pool is full and queue is full:

Java applies **RejectionPolicy**.

Common ones:

##### AbortPolicy (default)

```
throws RejectedExecutionException
```

---

##### CallerRunsPolicy

Caller thread executes the task.

---

##### DiscardPolicy

Task silently discarded.

---

##### DiscardOldestPolicy

Oldest queued task removed.

---

### 7️⃣ Example ThreadPoolExecutor

```java
ExecutorService pool = new ThreadPoolExecutor(
        2,              // corePoolSize
        4,              // maximumPoolSize
        60,             // keepAliveTime
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>(10)
);
```

Meaning:

```
2 core threads
up to 4 threads under load
10 tasks in queue
extra threads die after 60 sec
```

---

### 8️⃣ Executors Utility Methods

Java provides shortcuts:

##### Fixed Thread Pool

```java
Executors.newFixedThreadPool(5)
```

Fixed number of threads.

---

##### Cached Thread Pool

```java
Executors.newCachedThreadPool()
```

Creates threads dynamically.

---

##### Single Thread Executor

```java
Executors.newSingleThreadExecutor()
```

Only one worker thread.

---

### Important Interview Warning

In **production systems**, many engineers avoid `Executors.newFixedThreadPool()` because:

```
Queue is unbounded
Memory can explode
```

Instead they prefer **ThreadPoolExecutor directly**.

---

### Interview One-Liner

> Thread pools reuse a limited number of threads to execute many tasks efficiently while controlling resource usage.

---

### Now a Very Important Interview Question

Consider this pool:

```
corePoolSize = 2
maxPoolSize = 4
queue capacity = 2
```

If **7 tasks arrive at the same time**, how many:

1️⃣ Threads will be created
2️⃣ Tasks will wait in queue
3️⃣ Tasks will be rejected

Given:

* **core = 2**
* **max = 4**
* **queue capacity = 2**
* **7 tasks arrive**

Let’s do the exact step-by-step using the real ThreadPoolExecutor algorithm.

---

### Step-by-step allocation

##### Task 1

Active threads = 0 < core(2)
✅ Create thread #1 → runs Task1

##### Task 2

Active threads = 1 < core(2)
✅ Create thread #2 → runs Task2

Now active threads = 2 (core reached)

---

##### Task 3

Core full → try queue
✅ Queue Task3 (queue size 1/2)

##### Task 4

✅ Queue Task4 (queue size 2/2 full)

---

##### Task 5

Core full and queue full → try to expand threads up to max(4)
✅ Create thread #3 → runs Task5

##### Task 6

✅ Create thread #4 → runs Task6

Now active threads = 4 (max reached)

---

##### Task 7

Core full + queue full + max threads reached
❌ Reject Task7

---

### ✅ Final Correct Answers

1️⃣ **Threads created = 4 total**
(2 core threads + 2 extra threads)

2️⃣ **Tasks waiting in queue = 2**
(Task3 and Task4)

3️⃣ **Tasks rejected = 1**
(Task7)

---

### 🔥 Interview one-liner

> ThreadPoolExecutor first fills core threads, then queue, then grows up to max threads, then rejects.

---

#### Next Tricky Question (very common)

If we change the queue to `SynchronousQueue` (capacity = 0), with same core=2, max=4, and 7 tasks arrive:

How many tasks will be rejected?

---

### What is `SynchronousQueue`?

It has **zero capacity**.

That means:

* It **cannot store** tasks.
* A task can be handed off only if a worker thread is ready to take it **immediately**.

So it’s like a direct hand-to-hand transfer.

---

### ThreadPoolExecutor behavior with SynchronousQueue

Given:

* core = 2
* max = 4
* queue = SynchronousQueue (capacity 0)
* 7 tasks arrive

Algorithm:

1. Fill core threads
2. Try to queue (but queue can’t hold anything)
3. Create extra threads up to max
4. Then reject

---

### Step-by-step

##### Task 1 → create thread #1 (core)

##### Task 2 → create thread #2 (core)

Now core is full (2 threads busy)

##### Task 3 → try queue → **cannot** (capacity 0)

So create thread #3 (extra)

##### Task 4 → create thread #4 (extra)

Now we reached max threads = 4

##### Task 5 → cannot queue + cannot create more → reject

##### Task 6 → reject

##### Task 7 → reject

---

### ✅ Final Answer

* Threads created: **4**
* Queue waiting: **0**
* Tasks rejected: **3** (tasks 5, 6, 7)

---

### Why this matters (interview)

* `newCachedThreadPool()` uses `SynchronousQueue`
* It creates threads aggressively under load
* If max is very high, it may create too many threads

---

### Quick check (1 line)

Which queue is safer to prevent creating too many threads?

A) SynchronousQueue
B) Bounded LinkedBlockingQueue(100)

Answer A or B.

No worries — I’ll explain quickly and then you’ll be able to answer confidently.

---

### LinkedBlockingQueue vs SynchronousQueue (Simple)

#### ✅ `LinkedBlockingQueue(100)` (bounded)

* It can **store up to 100 tasks**
* If all threads are busy, tasks **wait in queue**
* Prevents creating too many threads quickly
* Helps control CPU + memory

#### ⚡ `SynchronousQueue` (0 capacity)

* It **stores nothing**
* If a thread isn’t immediately free:

  * ThreadPool tries to create a new thread (up to max)
* Can grow threads rapidly under load

---

### Which is safer to prevent creating too many threads?

✅ **B) Bounded LinkedBlockingQueue(100)**

Because tasks wait in queue instead of forcing new thread creation.

---

### Interview one-liner

> A bounded queue limits memory and controls thread growth; SynchronousQueue pushes the pool to create threads aggressively.

---

