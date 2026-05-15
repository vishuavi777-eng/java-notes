# Async Execution, CompletableFuture, and ForkJoin

## Definition

Asynchronous execution lets work run without blocking the caller. CompletableFuture models async results, and ForkJoinPool supports divide-and-conquer parallel work.

## Why It Matters

These tools are used in backend systems for non-blocking flows, parallel computation, and combining independent tasks.

## Core Example

A service can call two APIs using `CompletableFuture`, then combine both results when they complete.

## Common Traps

- Async code does not mean faster for every task.
- Blocking inside async tasks can waste worker threads.
- CompletableFuture exceptions must be handled.
- ForkJoin works best for recursive split-and-merge tasks.
- Parallelism has overhead.

## Interview Answer

CompletableFuture represents a result that will be available later and supports chaining, combining, and error handling. ForkJoinPool is designed for tasks that can be split into smaller tasks and joined later. Both help with concurrency, but they should be used when the workload fits the model.

## Quick Revision

- Async work does not block the caller.
- CompletableFuture supports chaining.
- Handle async exceptions.
- ForkJoin uses divide and conquer.
- Work stealing improves parallel execution.
- Use parallelism only when it helps.

## Deep Dive

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

##### Answer:
> **“5 threads will acquire permits and run immediately, while the remaining 5 threads will block until permits are released.”**

---

### Step-by-step What Happens

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

### Visual Flow

```
Permits = 5

Running threads:
T1 T2 T3 T4 T5

Waiting threads:
T6 T7 T8 T9 T10
```

---

### Interview One-Liner

> A semaphore with N permits allows at most N threads to access a resource simultaneously.

---


### Synchronous And Asynchronous Execution

---

```text
Synchronous execution blocks until a task completes, while asynchronous execution allows tasks to run independently without blocking the main thread.
```

---

### 1️⃣ Synchronous Execution

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

### 2️⃣ Asynchronous Execution

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

### Visual Difference

##### Synchronous

```
Task1 → Task2 → Task3
```

##### Asynchronous

```
Task1
   ↘
Task2
   ↘
Task3
```

Tasks can overlap.

---

### Real Backend Example

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

### Interview One-Liner

> Synchronous execution blocks until a task completes, while asynchronous execution allows tasks to run independently without blocking the main thread.

---

### Why `CompletableFuture` Exists

Java created **CompletableFuture** to manage **asynchronous tasks easily**.

It allows:

```
Run tasks in background
Chain tasks
Combine results
Handle errors
```

---

### Example

```java
CompletableFuture.supplyAsync(() -> {
    return fetchData();
});
```

This runs **in another thread automatically**.

---

### Quick Thinking Question

Which one is **asynchronous**?

##### A

```java
int data = fetchData();
process(data);
```

##### B

```java
CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data));
```

##### Answer:
✅ — **B is asynchronous.**

> **“Option B is asynchronous because the task runs in a separate thread using `CompletableFuture`.”**

---

### Why B is Asynchronous

##### Option A

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

##### Option B

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

### Step-by-Step Execution

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

### Why `CompletableFuture` is Powerful

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

### Simple Example

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

### Interview One-Liner

> `CompletableFuture` provides a powerful way to perform asynchronous computations and chain dependent tasks without blocking threads.

---

The last concurrency concept used in **high-performance parallel algorithms**:

#### `ForkJoinPool`

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

##### Answer:
```text
ForkJoinPool is a framework for parallel divide-and-conquer algorithms that uses work-stealing to efficiently utilize CPU cores.
```

**“the algorithm can be divided into multiple parts and executed in parallel.”**

---

### Why Divide and Conquer Works Well with Parallelism

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

### This is Exactly What `ForkJoinPool` Does

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

### Example Algorithm

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

### Java ForkJoin Example

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

### Important Feature: Work Stealing

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

### Where ForkJoinPool is Used

You actually use it **without knowing**.

Example:

```java
Arrays.parallelSort()
Stream.parallel()
CompletableFuture
```

All internally use **ForkJoinPool**.

---

### Interview One-Liner

> ForkJoinPool is a framework for parallel divide-and-conquer algorithms that uses work-stealing to efficiently utilize CPU cores.

---

### Final Concurrency Interview Question

Which of these is **NOT thread-safe**?

```
A) Vector
B) Hashtable
C) ArrayList
D) ConcurrentHashMap
```

What do you think?


##### Answer:
✅ — **ArrayList is NOT thread-safe.**

> **“ArrayList is not thread-safe because its operations are not synchronized.”**

---

### Thread Safety of Given Collections

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

### Why `ArrayList` is Not Thread-safe

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

### How to Make ArrayList Thread-safe

##### Option 1 — Synchronized List

```java
List<Integer> list =
    Collections.synchronizedList(new ArrayList<>());
```

---

##### Option 2 — CopyOnWriteArrayList

```java
List<Integer> list = new CopyOnWriteArrayList<>();
```

Used when:

```
Many reads
Few writes
```

---

### Interview One-Liner

> ArrayList is not thread-safe because its methods are not synchronized, so concurrent modifications can cause race conditions.
