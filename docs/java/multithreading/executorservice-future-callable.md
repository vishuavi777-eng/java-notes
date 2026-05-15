# ExecutorService, Future, and Callable

## Definition

ExecutorService is a higher-level API for running tasks with managed threads. `Future` represents a result that may be available later, and `Callable` can return a value.

## Why It Matters

Production Java code usually uses executors instead of manually creating many threads. This is a common backend interview topic.

## Core Example

Submit a `Callable<Integer>` to an `ExecutorService`, then call `future.get()` to wait for the result.

## Common Traps

- Creating unlimited raw threads is dangerous.
- `execute()` does not return a result.
- `submit()` returns a `Future`.
- `Future.get()` can block.
- `Runnable` cannot directly return a value.

## Interview Answer

ExecutorService manages a pool of worker threads and runs submitted tasks. `execute()` runs a task without returning a result, while `submit()` returns a `Future`. `Callable` is like `Runnable`, but it can return a value and throw checked exceptions.

## Quick Revision

- Use executors instead of too many raw threads.
- `execute()` returns nothing.
- `submit()` returns `Future`.
- `Callable` returns a value.
- `Future.get()` blocks until result is ready.
- Always shut down executors.

## Deep Dive

#### Thread Pools & Executors

We should now move to **Thread Pools & Executors**.

Because in real backend systems:

```
Threads are rarely created manually.
```

They are managed by:

```
ExecutorService
ThreadPoolExecutor
ForkJoinPool
```

Before we start that, one quick check:

##### Question

Why is creating too many threads dangerous?

Give **two reasons**.

##### Answer:
```text
Creating too many threads increases memory usage, context switching overhead, and scheduler pressure, which can severely degrade performance.
```

---

### Why Creating Too Many Threads is Dangerous

##### 1️⃣ Memory Consumption (Very Important)

Each thread has its **own stack memory**.

Typical stack size:

```text
512 KB – 1 MB per thread
```

If you create:

```
10,000 threads
```

Memory usage:

```
~10 GB stack memory
```

Your JVM can crash with:

```
OutOfMemoryError: unable to create new native thread
```

---

##### 2️⃣ Context Switching Overhead

CPU can run only **a few threads at a time**.

If you create too many threads:

```
CPU keeps switching between threads
```

This is called:

```text
Context Switching
```

Switching threads costs CPU time.

So performance actually **becomes worse**, not better.

---

##### 3️⃣ Thread Scheduling Overhead

The OS scheduler must manage all threads:

```
ready queue
priority
scheduling
```

More threads → more overhead.

---

##### 4️⃣ Resource Contention

Threads compete for:

```
CPU
memory
locks
I/O
```

Too many threads increases **lock contention** and reduces throughput.

---

### Real Solution: Thread Pools

Instead of creating many threads:

```
Create limited threads
Reuse them
```

Example:

```java
ExecutorService pool = Executors.newFixedThreadPool(10);
```

Now only **10 threads** execute tasks.

---

### Interview One-Liner

> Creating too many threads increases memory usage, context switching overhead, and scheduler pressure, which can severely degrade performance.

---

### Now We Enter a Very Important Topic

### Thread Pool & Executor Framework

Before I explain the internals, answer this:

##### Question

What is the difference between:

```
execute()
```

and

```
submit()
```

in `ExecutorService`?

##### Answer:
```text
execute() runs a task without returning a result, while submit() returns a Future that allows retrieving results and exceptions.
```

Let’s build it step by step.

---

### 1️⃣ What is ExecutorService?

Instead of creating threads like this:

```java
new Thread(task).start();
```

Java recommends using a **thread pool**:

```java
ExecutorService pool = Executors.newFixedThreadPool(5);
```

Now:

* Only **5 threads** exist
* Tasks are queued
* Threads **reuse themselves**

Example:

```java
pool.execute(() -> {
    System.out.println(Thread.currentThread().getName());
});
```

---

### 2️⃣ `execute()` vs `submit()`

Both are used to **send tasks to a thread pool**, but they behave differently.

---

### `execute()`

Method signature:

```java
void execute(Runnable command)
```

Example:

```java
pool.execute(() -> {
    System.out.println("Task running");
});
```

Characteristics:

* Takes **Runnable only**
* **No return value**
* Cannot capture result
* Cannot track completion easily

---

### `submit()`

Method signature:

```java
Future<?> submit(Runnable task)
Future<T> submit(Callable<T> task)
```

Example:

```java
Future<Integer> result = pool.submit(() -> {
    return 10 + 20;
});
```

Get result:

```java
System.out.println(result.get());
```

Output:

```
30
```

---

### Key Difference Table

| Feature            | execute()                | submit()         |
| ------------------ | ------------------------ | ---------------- |
| Return value       | ❌ None                   | ✅ Future         |
| Accepts Callable   | ❌ No                     | ✅ Yes            |
| Get result         | ❌ No                     | ✅ Yes            |
| Exception handling | Goes to thread's handler | Stored in Future |

---

### Important Interview Insight

If a task throws exception:

##### execute()

Exception goes to **thread's uncaught exception handler**.

##### submit()

Exception is **stored inside Future**.

You see it only when calling:

```java
future.get();
```

---

### Interview One-Liner

> `execute()` runs a task without returning a result, while `submit()` returns a `Future` that allows retrieving results and exceptions.

---

### 3️⃣ What is `Future`?

`Future` represents **result of asynchronous computation**.

Methods:

```java
future.get()       // wait for result
future.isDone()    // task finished?
future.cancel()    // cancel task
```

---

### 4️⃣ Runnable vs Callable

Runnable:

```java
void run()
```

Callable:

```java
T call()
```

Callable can:

✔ return result
✔ throw checked exceptions

---

### Quick Check Question

What will happen here?

```java
ExecutorService pool = Executors.newFixedThreadPool(2);

Future<Integer> f = pool.submit(() -> {
    int x = 10 / 0;
    return x;
});

System.out.println("Done");
```

Question:

Will the program crash immediately or continue printing `"Done"`?

Then what happens when we call:

```java
f.get();
```

Answer:

* “after f.get() it will get divide by zero exception” → **“when `f.get()` is called, it will throw the exception.”**

Now let’s explain what exactly happens internally (important for interviews).

---

### Code

```java
ExecutorService pool = Executors.newFixedThreadPool(2);

Future<Integer> f = pool.submit(() -> {
    int x = 10 / 0;
    return x;
});

System.out.println("Done");
```

---

### Step-by-Step Execution

##### 1️⃣ Task submitted to thread pool

`submit()` does **not execute immediately in the main thread**.

Instead:

```
Main thread → submit task → task goes to queue
Thread pool worker → executes task
```

---

##### 2️⃣ Main thread continues

Main thread prints:

```
Done
```

because the task runs **asynchronously**.

So program **does not crash here**.

---

##### 3️⃣ Worker thread executes task

Inside thread pool worker:

```java
int x = 10 / 0;
```

Exception occurs:

```
ArithmeticException: / by zero
```

But because task was submitted using `submit()`:

```
Exception is captured inside Future
```

It is **not thrown immediately**.

---

##### 4️⃣ When `f.get()` is called

Example:

```java
f.get();
```

Now Java unwraps the stored exception and throws:

```
ExecutionException
```

Inside it:

```
ArithmeticException: / by zero
```

---

### Important Interview Detail

`submit()` wraps exceptions in:

```
java.util.concurrent.ExecutionException
```

So actual exception is inside:

```java
e.getCause()
```

Example:

```java
try {
    f.get();
} catch (ExecutionException e) {
    System.out.println(e.getCause());
}
```

---

### Key Difference With `execute()`

If we used:

```java
pool.execute(() -> {
    int x = 10 / 0;
});
```

Then:

```
ArithmeticException
```

would go to **UncaughtExceptionHandler** immediately.

---

### Interview One-Liner

> When using `submit()`, exceptions are captured inside the `Future` and thrown as `ExecutionException` when `Future.get()` is called.

---

