# 📚 Multithreading – Part-1

Multithreading deep dive, end-to-end. We’ll go **basic → advanced**, with **internals + traps + interview answers**. No fluff.

---

# Level 1: What is a Thread? What is a Process?

* **Process**: independent program instance (separate memory space).
* **Thread**: execution path inside a process (threads share heap, have separate stacks).

**Key interview line**

> Threads share heap (objects) but each thread has its own stack (local variables, frames).

---

# Level 2: Creating Threads

## Option A: Extend Thread

```java
class T extends Thread {
  public void run() { System.out.println("run"); }
}
new T().start();
```

## Option B: Implement Runnable (preferred)

```java
class Task implements Runnable {
  public void run() { System.out.println("run"); }
}
new Thread(new Task()).start();
```

**Why Runnable preferred?**

* Your class can extend something else (Java single inheritance)
* Separation of task (Runnable) from execution (Thread)

---

# ✅ Absolute Must-Know: `start()` vs `run()` (Top trap)

* `start()` → creates a **new OS/JVM thread**, then calls `run()` on that new thread.
* `run()` → normal method call, runs on **current thread**, no new thread.

**Interview one-liner**

> Calling `run()` doesn’t start a new thread; `start()` does.

---

# Thread Lifecycle (Interview)

States (simplified):

* **NEW**
* **RUNNABLE** (ready/running)
* **BLOCKED** (waiting for monitor lock)
* **WAITING** (wait/join without timeout)
* **TIMED_WAITING** (sleep/join with timeout)
* **TERMINATED**

---

# CPU Scheduling Basics (What you must accept)

* Thread execution order is **not guaranteed**
* Prints can interleave unpredictably
* Priority is a hint, not a guarantee (OS-dependent)

---

# 🔥 Trap Set 1 (Answer these outputs)

### Q1: start vs run

```java
class A extends Thread {
  public void run() { System.out.print("R"); }
  public static void main(String[] args) {
    A t = new A();
    t.run();
    System.out.print("M");
  }
}
```

What prints?

### Q2: start order

```java
class A extends Thread {
  public void run() { System.out.print("T"); }
  public static void main(String[] args) {
    new A().start();
    System.out.print("M");
  }
}
```

Possible outputs?

### Q3: sleep

```java
public class Test {
  public static void main(String[] args) throws Exception {
    System.out.print("A");
    Thread.sleep(0);
    System.out.print("B");
  }
}
```

What prints?

Reply with:

* Q1 output
* Q2 possible outputs
* Q3 output


The correct answers + why (deep, interview style).

---

## Q1: `run()` vs `start()`

Code:

```java
t.run();
System.out.print("M");
```

### ✅ Output

```
RM
```

### Why

`t.run()` is just a normal method call on the **main thread**, so it prints `R`, then main prints `M`.

---

## Q2: `start()` scheduling

Code:

```java
new A().start();
System.out.print("M");
```

### ✅ Possible outputs

```
TM
MT
```

### Why

`start()` creates a new thread, but scheduling is unpredictable:

* Thread may run first → `T` then `M`
* Main may print first → `M` then `T`

---

## Q3: `Thread.sleep(0)`

Code:

```java
System.out.print("A");
Thread.sleep(0);
System.out.print("B");
```

### ✅ Output

```
AB
```

### Why

`sleep(0)` does **not** end the thread or switch threads reliably. It just sleeps for 0 ms (effectively no-op). So prints `A` then `B`.

---

# ✅ Quick Fix: Your mistakes

* Q1: you missed that `run()` prints `R`
* Q3: you confused print character (`B`) with `M`

---

# Level 3: Race Condition (Core of Multithreading)

## What is a race condition?

When multiple threads access shared data and **the result depends on timing**.

---

### 🔥 Trap 4: Predict output (very common)

```java
class Counter {
  int count = 0;
  void inc() { count++; }
}

public class Test {
  public static void main(String[] args) throws Exception {
    Counter c = new Counter();

    Thread t1 = new Thread(() -> { for(int i=0;i<100000;i++) c.inc(); });
    Thread t2 = new Thread(() -> { for(int i=0;i<100000;i++) c.inc(); });

    t1.start(); t2.start();
    t1.join();  t2.join();

    System.out.println(c.count);
  }
}
```

Question:

1. Will it always print `200000`?
2. If not, why? (one key reason)

Answer:

```text
count++ is not atomic. It consists of read–modify–write operations, so multiple threads may read the same value and overwrite each other's updates, causing a race condition.
```

Now let’s explain properly.

---

# Correct Answer

### 1️⃣ Will it always print `200000`?

❌ **No**

---

### 2️⃣ Why?

Because of a **race condition**.

The operation:

```java
count++;
```

is **not atomic**.

It actually performs **three steps internally**.

---

# Internal Working of `count++`

```text
1️⃣ Read value from memory
2️⃣ Add 1
3️⃣ Write value back
```

Example scenario:

Initial value:

```
count = 5
```

Thread execution:

| Step  | Thread 1 | Thread 2 |
| ----- | -------- | -------- |
| Read  | 5        | 5        |
| Add   | 6        | 6        |
| Write | 6        | 6        |

Final value:

```
6
```

But **two increments happened**, so expected value should be **7**.

One increment is **lost**.

This is called:

# 🔥 Lost Update Problem

---

# Interview One-Liner

> `count++` is not atomic. It consists of read–modify–write operations, so multiple threads may read the same value and overwrite each other's updates, causing a race condition.

---

# Fixing the Problem

### Option 1: synchronized

```java
synchronized void inc() {
    count++;
}
```

---

### Option 2: AtomicInteger (better)

```java
AtomicInteger count = new AtomicInteger(0);

count.incrementAndGet();
```

This uses **CAS (Compare-And-Swap)**.

---

# Next Important Topic (Very Important)

Before moving ahead, answer this.

### Trap Question

What is the difference between:

```
Thread.sleep()
```

and

```
Object.wait()
```

Give **2 differences**. This is a **very common interview question**.

---

# `Thread.sleep()` vs `Object.wait()` (Deep + Interview Ready)

## 1) Who owns the method?

### `sleep()`

* It is a **static** method of `Thread`.
* You call it as:

  ```java
  Thread.sleep(1000);
  ```

### `wait()`

* It is a method of **Object**.
* You call it on a lock object:

  ```java
  lock.wait();
  ```

---

## 2) Does it release the lock (monitor)?

### `sleep()`

❌ **Does NOT release any lock**.

If a thread is inside a synchronized block and calls sleep, it keeps the lock.

### `wait()`

✅ **Releases the lock** (monitor) immediately and goes to waiting state.

This is the biggest difference.

---

## 3) Where can you call it?

### `sleep()`

* Can be called anywhere.
* No special requirement.

### `wait()`

* Must be called **inside synchronized context** (owning the monitor of that object).
* Otherwise you get:

```text
IllegalMonitorStateException
```

Example (wrong):

```java
lock.wait(); // ❌ if not inside synchronized(lock)
```

Correct:

```java
synchronized(lock) {
    lock.wait(); // ✅
}
```

---

## 4) How does a thread wake up?

### `sleep()`

* Wakes up automatically after time ends (or interrupt).
* No other thread needs to do anything.

### `wait()`

* Wakes up if:

  1. another thread calls `notify()` / `notifyAll()` on same lock object
     OR
  2. timeout ends (`wait(ms)`)
     OR
  3. interrupted

---

## 5) Use cases (important)

### `sleep()`

* Pause thread for some time.
* Rate limiting, retry delay, polling delay.

### `wait()`

* Thread coordination / communication.
* Classic producer-consumer pattern.

---

# ✅ Short Interview Answer (Memorize)

> `sleep()` pauses the current thread without releasing any locks and can be called anywhere.
> `wait()` is used for inter-thread communication; it must be called inside a synchronized block and it releases the lock until notified or timed out.

---

# 🔥 Quick Trap (to confirm understanding)

Predict what happens (no need exact output, just behavior):

```java
Object lock = new Object();

Thread t1 = new Thread(() -> {
  synchronized(lock) {
    try {
      Thread.sleep(2000);
    } catch (Exception e) {}
  }
});

Thread t2 = new Thread(() -> {
  synchronized(lock) {
    System.out.println("t2 entered");
  }
});

t1.start();
Thread.sleep(100);
t2.start();
```

Question:
Will `t2` print immediately or after ~2 seconds? Why?


Answer:
```text
Thread.sleep() pauses the thread but keeps the monitor lock, while wait() releases the lock and allows other threads to acquire it.
```

Now let’s understand deeply.

---

# Correct Behavior

`t2` will print **after about 2 seconds**, not immediately.

Output (after ~2s):

```
t2 entered
```

---

# Why?

Look carefully.

### Thread t1

```java
synchronized(lock) {
    Thread.sleep(2000);
}
```

Steps:

1️⃣ `t1` acquires the **lock**
2️⃣ `t1` enters synchronized block
3️⃣ `t1` calls `sleep(2000)`
4️⃣ **sleep does NOT release the lock**

So `t1` holds the lock for 2 seconds.

---

### Thread t2

```java
synchronized(lock) {
    System.out.println("t2 entered");
}
```

But `t2` needs the **same lock**.

Since `t1` is holding the lock:

```
t2 → BLOCKED state
```

`t2` must wait until `t1` exits the synchronized block.

---

### Timeline

```
t1 start
t1 acquires lock
t1 sleeps 2 sec (still holding lock)

t2 tries to enter synchronized(lock)
t2 BLOCKED

2 seconds later:
t1 exits block
lock released

t2 enters
print "t2 entered"
```

---

# 🔥 Important Rule

| Method    | Releases Lock? |
| --------- | -------------- |
| `sleep()` | ❌ No           |
| `wait()`  | ✅ Yes          |

This is one of the **most common Java interview traps**.

---

# 🧠 Interview One-Liner

> `Thread.sleep()` pauses the thread but keeps the monitor lock, while `wait()` releases the lock and allows other threads to acquire it.

---

# Next Critical Concept (Core Multithreading)

We now move to **`synchronized` internals + monitor locks**.

---

# 1️⃣ What is a Lock?

In multithreading, a **lock** is a mechanism that ensures:

> Only **one thread at a time** can access a critical section of code.

Think of it like a **room with one key**.

Example analogy:

```
Room = critical code
Key = lock
Thread = person
```

Only the person holding the key can enter the room.

Other people must wait outside.

---

# 2️⃣ What is `synchronized`?

`synchronized` is a Java keyword used to **protect critical sections**.

It ensures:

```
Only one thread can execute that block/method at a time.
```

It works using **monitor locks**.

---

# 3️⃣ Two Ways to Use `synchronized`

## A) Synchronized Block

You explicitly specify the lock object.

```java
Object lock = new Object();

synchronized(lock) {
    // critical section
}
```

Here:

* `lock` object acts as the **monitor**
* Only one thread holding that lock can enter

---

## B) Synchronized Method

Example:

```java
class Test {

    synchronized void m1() {
        // critical section
    }

}
```

Here Java automatically uses:

```
this (current object) as lock
```

Equivalent code:

```java
void m1() {
    synchronized(this) {
        // critical section
    }
}
```

---

# 4️⃣ Static Synchronized Method

Example:

```java
class Test {

    static synchronized void m3() {
        // critical section
    }

}
```

Here the lock is:

```
Class object
```

Equivalent to:

```java
synchronized(Test.class) {
    // code
}
```

---

# 5️⃣ Summary Table

| Type                  | Lock Used     |
| --------------------- | ------------- |
| `synchronized(obj)`   | obj           |
| `synchronized method` | this (object) |
| `static synchronized` | Class object  |

---

# 6️⃣ Why Locks Are Needed (Race Condition Fix)

Earlier problem:

```
count++
```

Two threads modify same variable → wrong result.

Solution:

```java
synchronized void inc() {
    count++;
}
```

Now only one thread can execute `inc()` at a time.

---

# Now You Can Answer My Question

Given:

```java
class Test {

    synchronized void m1() {}

    synchronized void m2() {}

    static synchronized void m3() {}

}
```

How many **different locks** exist here?

Hint:

* object lock
* class lock

✅ Answer: — **two different locks exist** here.

Good. Now let’s explain clearly so it becomes **crystal clear for interviews**.

---

# Code

```java
class Test {

    synchronized void m1() {}

    synchronized void m2() {}

    static synchronized void m3() {}

}
```

---

# 1️⃣ Lock for `m1()` and `m2()`

These are **instance synchronized methods**.

Java internally converts them to:

```java
void m1() {
    synchronized(this) {
    }
}

void m2() {
    synchronized(this) {
    }
}
```

So both methods use the **same lock**:

```text
this (current object)
```

Meaning:

If one thread executes `m1()`, another thread **cannot execute `m2()` on the same object**.

Because both require the same lock.

---

# 2️⃣ Lock for `m3()`

This is a **static synchronized method**.

Java internally converts it to:

```java
synchronized(Test.class) {
}
```

So the lock is:

```text
Test.class
```

This is a **class-level lock**, not object lock.

---

# Final Lock Summary

| Method | Lock Used                 |
| ------ | ------------------------- |
| `m1()` | object lock (`this`)      |
| `m2()` | object lock (`this`)      |
| `m3()` | class lock (`Test.class`) |

So:

```text
Total locks = 2
```

---

# 🔥 Important Interview Insight

Object locks and class locks are **independent**.

So this is possible:

Thread 1:

```java
obj.m1();
```

Thread 2:

```java
Test.m3();
```

Both can run **at the same time**.

---

# 🧠 Interview One-Liner

> Instance synchronized methods use the object monitor (`this`), while static synchronized methods use the class monitor (`ClassName.class`).

---

# Next Critical Trap

Predict behavior:

```java
class Test {

    synchronized void m1() {
        System.out.println("m1 start");
        try { Thread.sleep(2000); } catch(Exception e) {}
        System.out.println("m1 end");
    }

    synchronized void m2() {
        System.out.println("m2");
    }

}

Test t = new Test();

Thread t1 = new Thread(() -> t.m1());
Thread t2 = new Thread(() -> t.m2());

t1.start();
t2.start();
```

Question:

Will `"m2"` print immediately or after 2 seconds? Why?

ANswer: ❌ Not immediately. It will print **after ~2 seconds**.

## Why (very important)

Both `m1()` and `m2()` are **instance synchronized** methods, so they use the **same lock**:

> the object lock = `t` (i.e., `this`)

### What happens:

* `t1` enters `t.m1()` and **acquires lock on `t`**
* `t1` sleeps 2 seconds **but still holds the lock** (sleep does not release lock)
* `t2` tries to enter `t.m2()` but **cannot**, because lock is still held
* After 2 seconds, `t1` exits `m1()` and releases lock
* Then `t2` enters `m2()` and prints `"m2"`

So `"m2"` prints **after** `"m1 end"` (after ~2 seconds).

---

# Key interview line

> Two synchronized instance methods on the same object block each other because they use the same monitor (`this`).

---

## Quick follow-up trap

If `t2` called `new Test().m2()` instead of `t.m2()`, would it print immediately? (Yes/No)

✅ Answer: — **Yes, it would print immediately.**

### Why

Because:

* `t1` is locking on object **t**
* `t2` would lock on a **different object** `new Test()`

Different objects → different monitors → no blocking.

**Interview one-liner:**

> `synchronized` locks are per-object. Two threads only block each other if they synchronize on the **same monitor object**.

---

# Next Level: Deadlock (Most asked trap)

Consider:

```java
Object A = new Object();
Object B = new Object();

Thread t1 = new Thread(() -> {
  synchronized(A) {
    synchronized(B) {
      System.out.println("t1 done");
    }
  }
});

Thread t2 = new Thread(() -> {
  synchronized(B) {
    synchronized(A) {
      System.out.println("t2 done");
    }
  }
});
```

### Question:

1. What problem can happen here?
2. How to fix it (one practical rule)?


### Answer:
```text
Deadlock occurs when threads acquire locks in different order causing circular wait. The common fix is enforcing a consistent lock acquisition order.
```

Let’s go step by step.

---

# 1️⃣ What Problem Happens Here?

✔ **Deadlock**

Deadlock means:

> Two or more threads wait forever for each other’s locks.

---

# How Deadlock Happens Here

We have two locks:

```text
Lock A
Lock B
```

### Thread t1

```
Lock A
then tries Lock B
```

### Thread t2

```
Lock B
then tries Lock A
```

---

# Timeline

```
t1 acquires A
t2 acquires B

t1 tries B → blocked
t2 tries A → blocked
```

Now:

```
t1 waiting for B
t2 waiting for A
```

Both wait forever.

This is **deadlock**.

---

# 2️⃣ Why wait()/notify() is NOT the Fix

`wait()` / `notify()` are used for:

```text
Thread communication
```

Example:

* Producer-consumer
* Task coordination

They **do not solve deadlocks caused by lock ordering**.

---

# 3️⃣ Correct Fix (Most Important Rule)

Always acquire locks in the **same order**.

Example fix:

```java
Thread t1 = new Thread(() -> {
  synchronized(A) {
    synchronized(B) {
      System.out.println("t1 done");
    }
  }
});

Thread t2 = new Thread(() -> {
  synchronized(A) {   // same order
    synchronized(B) {
      System.out.println("t2 done");
    }
  }
});
```

Now:

```
Both threads acquire A first
Then B
```

No circular wait → **no deadlock**.

---

# 🔥 Four Conditions for Deadlock (Interview Gold)

Deadlock happens when these 4 exist:

1️⃣ Mutual exclusion
2️⃣ Hold and wait
3️⃣ No preemption
4️⃣ Circular wait

Break any one → deadlock avoided.

---

# 🧠 Interview One-Liner

> Deadlock occurs when threads acquire locks in different order causing circular wait. The common fix is enforcing a consistent lock acquisition order.

---

# Next Critical Concept (Very Important)

We now go to:

# `volatile` (Most misunderstood Java keyword)

Before I explain it, tell me:

### Question

What problem does `volatile` solve?

### Answer:

```text
volatile ensures visibility of variable updates across threads but does not guarantee atomicity.
```

Let’s explain from the ground up.

---

# 1️⃣ The Real Problem `volatile` Solves

In multithreading there are **two major problems**:

1️⃣ **Visibility problem**
2️⃣ **Atomicity problem**

`volatile` solves **only the visibility problem**.

---

# 2️⃣ Why Visibility Problem Happens

Each thread has **its own working memory (CPU cache)**.

Architecture simplified:

```
Main Memory (Heap)
      |
  ------------
  |          |
Thread 1   Thread 2
Cache      Cache
```

Threads **do not always read directly from main memory**.

They may read from their **local cache**.

---

# Example Problem

```java
class Test {

    static boolean running = true;

    public static void main(String[] args) {

        Thread t = new Thread(() -> {
            while(running) {
            }
            System.out.println("Stopped");
        });

        t.start();

        try { Thread.sleep(2000); } catch(Exception e){}

        running = false;
    }
}
```

### Expected behavior

After 2 seconds:

```
Stopped
```

---

### What may happen

Thread **may run forever**.

Why?

Thread `t` may cache:

```
running = true
```

It keeps reading **cached value**, not updated value from main memory.

So it never sees:

```
running = false
```

---

# 3️⃣ Solution: `volatile`

```java
static volatile boolean running = true;
```

Now Java guarantees:

```
Read directly from main memory
Write directly to main memory
```

No caching issue.

---

# 4️⃣ What `volatile` Guarantees

`volatile` provides:

### ✔ Visibility

Changes made by one thread are **immediately visible to other threads**.

### ✔ Happens-before relationship

Write → immediately visible to readers.

---

# 5️⃣ What `volatile` DOES NOT Solve

`volatile` **does NOT make operations atomic**.

Example:

```java
volatile int count = 0;

count++;
```

Still unsafe.

Because `count++` =

```
read
add
write
```

Multiple threads can break it.

So for increments we need:

```
synchronized
AtomicInteger
Lock
```

---

# 6️⃣ Interview Table

| Feature         | volatile |
| --------------- | -------- |
| Visibility      | ✔        |
| Atomicity       | ❌        |
| Prevent caching | ✔        |
| Locking         | ❌        |

---

# 🧠 Interview One-Liner

> `volatile` ensures visibility of variable updates across threads but does not guarantee atomicity.

---

# Now a Very Important Trap

Predict output:

```java
class Test {

    volatile int count = 0;

    void inc() {
        count++;
    }

}
```

If **10 threads** run `inc()` 1000 times each:

Expected:

```
10000
```

Will we always get `10000`?

Yes or No — and why?

### Answer:

```text
volatile ensures visibility but does not guarantee atomicity, so operations like count++ remain unsafe in multithreading.
```

Now let’s explanation to **interview-quality clarity**.

---

# Correct Answer

❌ **No, we will NOT always get 10000.**

---

# Why?

Because:

```java
count++
```

is **not atomic**.

Even though `count` is `volatile`, the operation still executes as three steps:

```
1. Read count
2. Add 1
3. Write count
```

Example race condition:

Initial:

```
count = 5
```

Thread 1 reads:

```
5
```

Thread 2 reads:

```
5
```

Both increment:

```
6
```

Both write:

```
6
```

One increment is **lost**.

---

# What `volatile` Actually Guarantees

✔ Visibility
✔ Prevents CPU caching issues

But it does **NOT** guarantee:

❌ Atomic operations
❌ Mutual exclusion

---

# Correct Solutions

### Option 1 — synchronized

```java
synchronized void inc() {
    count++;
}
```

---

### Option 2 — AtomicInteger (best)

```java
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```

Uses **CAS (Compare-And-Swap)**.

---

# Interview One-Liner

> `volatile` ensures visibility but does not guarantee atomicity, so operations like `count++` remain unsafe in multithreading.

---

# Now a Very Important Multithreading Trap

Predict the output:

```java
class Test {

    volatile boolean flag = false;

    void writer() {
        flag = true;
    }

    void reader() {
        if(flag) {
            System.out.println("Visible");
        }
    }

}
```

Two threads run:

```
Thread 1 → writer()
Thread 2 → reader()
```

Question:

Is it **guaranteed** that thread 2 sees `flag = true`?

Yes / No — and why?

### Answer:

```text
volatile ensures visibility of updates across threads, but it does not guarantee ordering of thread execution.
```
---

# Correct Answer

✔ **Yes — if thread 2 reads `flag` after thread 1 writes it, it will see `true`.**

But we must add an important condition.

---

# Why?

Because `flag` is declared as:

```java
volatile boolean flag = false;
```

`volatile` guarantees **visibility** between threads.

Meaning:

```text
Write by one thread → immediately visible to other threads
```

So when thread 1 does:

```java
flag = true;
```

the updated value is **written to main memory**.

When thread 2 reads:

```java
if(flag)
```

it **must read from main memory**, not a cached copy.

---

# Important Detail (Interview Trap)

`volatile` does **NOT guarantee execution order between threads**.

So two scenarios exist:

### Scenario 1

Thread 1 executes first.

```text
writer() → flag = true
reader() → sees true
```

Output:

```
Visible
```

---

### Scenario 2

Thread 2 executes first.

```text
reader() → flag still false
writer() → later sets true
```

Output:

```
(no output)
```

---

# Therefore the correct statement

> `volatile` guarantees **visibility**, but not **thread execution order**.

---

# Interview One-Liner

> `volatile` ensures visibility of updates across threads, but it does not guarantee ordering of thread execution.

---

# Next Critical Topic (Very Important)

Now we move to **Atomic Variables & CAS (Compare-And-Swap)** — this is used inside:

* `AtomicInteger`
* `ConcurrentHashMap`
* many lock-free algorithms.

First question for you:

### Question

Why is **AtomicInteger faster than synchronized** in many cases?

### Answer:

```text
AtomicInteger uses lock-free CAS operations at the CPU level, avoiding blocking and context switching, which makes it faster than synchronized in many scenarios.
```

Now let’s explain the **real reason deeply**, because this is an important interview topic.

---

# Why `AtomicInteger` is Often Faster than `synchronized`

Your intuition is correct: **it avoids heavy locking**.

The main reason is:

```text
AtomicInteger uses CAS (Compare-And-Swap) instead of locks.
```

---

# 1️⃣ How `synchronized` Works

When a thread enters:

```java
synchronized void inc() {
    count++;
}
```

The JVM must:

1️⃣ Acquire monitor lock
2️⃣ Block other threads
3️⃣ Execute code
4️⃣ Release lock

If many threads compete:

```text
Thread waiting
Context switching
Lock management
```

These operations are **expensive**.

---

# 2️⃣ How `AtomicInteger` Works

AtomicInteger uses a **lock-free algorithm**.

Example:

```java
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```

Internally it uses **CAS (Compare-And-Swap)**.

---

# 3️⃣ CAS (Compare-And-Swap)

CAS is a **CPU-level atomic instruction**.

It works like this:

```text
compare current value with expected value
if equal → update
if not equal → retry
```

Example:

Initial:

```text
count = 5
```

Thread wants to update:

```text
expected = 5
newValue = 6
```

CPU instruction:

```text
if(count == 5)
   count = 6
else
   retry
```

This happens **without locking**.

---

# 4️⃣ Why CAS is Faster

CAS:

✔ No thread blocking
✔ No OS context switching
✔ CPU-level atomic operation

So performance is usually **better under moderate contention**.

---

# Interview Comparison

| Feature     | synchronized            | AtomicInteger  |
| ----------- | ----------------------- | -------------- |
| Locking     | Yes                     | No             |
| Blocking    | Yes                     | No             |
| Uses CAS    | No                      | Yes            |
| Performance | Slower under contention | Usually faster |

---

# Interview One-Liner

> `AtomicInteger` uses lock-free CAS operations at the CPU level, avoiding blocking and context switching, which makes it faster than synchronized in many scenarios.

---

# Important Limitation

CAS can suffer from a problem called:

```text
ABA problem
```

We’ll discuss that later.

---

# Next Important Trap

Predict the behavior:

```java
AtomicInteger count = new AtomicInteger(0);

Thread t1 = new Thread(() -> {
    for(int i=0;i<1000;i++)
        count.incrementAndGet();
});

Thread t2 = new Thread(() -> {
    for(int i=0;i<1000;i++)
        count.incrementAndGet();
});

t1.start();
t2.start();
t1.join();
t2.join();

System.out.println(count);
```

### Question:

Will this **always print 2000**? Why?

### Answer:

```text
Yes — it will always print 2000.
AtomicInteger uses CAS (Compare-And-Swap) in a retry loop to ensure atomic updates without using locks.
```

---

# Correct Answer

✔ **Yes — it will always print 2000.**

---

# Why?

Because:

```java
count.incrementAndGet();
```

is an **atomic operation**.

Internally it uses **CAS (Compare-And-Swap)**.

---

# Internal Working (Simplified)

Suppose:

```text
count = 5
```

Thread tries to update:

```text
expected = 5
newValue = 6
```

CPU executes CAS:

```text
if(count == expected)
    count = newValue
else
    retry
```

If another thread changed the value meanwhile:

```text
CAS fails → retry loop
```

So no updates are lost.

---

# Internal Loop (conceptually)

AtomicInteger works like this:

```java
while(true) {
   int current = value;
   int next = current + 1;

   if(CAS(current, next))
       return next;
}
```

CAS success → operation done
CAS failure → retry

---

# Important Interview Point

AtomicInteger guarantees:

✔ Atomicity
✔ Visibility
✔ Lock-free behavior

---

# Interview One-Liner

> AtomicInteger uses CAS (Compare-And-Swap) in a retry loop to ensure atomic updates without using locks.

---

# Now a Very Important Multithreading Trap

Predict output possibility:

```java
class Test {

    int x = 0;
    int y = 0;

    void writer() {
        x = 1;
        y = 1;
    }

    void reader() {
        if(y == 1) {
            System.out.println(x);
        }
    }

}
```

Two threads:

```
Thread 1 → writer()
Thread 2 → reader()
```

### Question:

Is it possible for this program to print:

```
0
```

Yes or No — and why?

This question leads to **Java Memory Model & instruction reordering**, one of the most important multithreading topics.

### Answer:

**Yes — it is possible to print `0`** (in some executions), because without `volatile`/synchronization there is **no happens-before relationship** between the threads.

Let me explain clearly.

---

# Why `0` is possible

You’re thinking in single-thread order:

> writer sets `x=1` then `y=1`, so if reader sees `y==1` it must see `x==1`.

That guarantee exists **only in single-thread reasoning**.

In multithreading, without proper memory barriers, two things can happen:

## 1) Visibility issue

Thread 1 updates `x` and `y`, but thread 2 may see:

* the update to `y`
* but still see old cached value of `x`

So reader can observe:

```text
y == 1
x == 0
```

## 2) Reordering

The compiler/CPU can reorder writes for performance (as long as single-thread behavior stays correct). So it’s possible that:

* `y=1` becomes visible before `x=1`

Again reader can see `y==1` first.

---

# Key concept: Happens-Before

Because there is **no synchronization**:

* writer’s actions are not guaranteed to be visible in same order to reader.

So `0` is possible.

---

# How to Fix It (two correct ways)

## Option A: Make `y` volatile

```java
volatile int y = 0;
```

If writer does:

```java
x = 1;
y = 1;
```

And reader checks:

```java
if (y == 1) System.out.println(x);
```

Now volatile write/read creates a **happens-before**:

* If reader sees `y==1`, it will also see `x==1`.

## Option B: Use synchronized

Put writer and reader under same lock.

---

# Interview one-liner

> Without a happens-before relation, reads can see stale values and writes can appear reordered, so `y==1` does not guarantee `x==1`.

---

## Quick check question (yes/no)

If we make only `x` volatile (not `y`), is printing `0` still possible?

Let’s go **step-by-step with a mental model**.

We’ll answer **both questions**:

1. **Why `volatile int y` fixes the issue**
2. **When this problem happens (same object vs different object)**

---

# 1️⃣ First Understand the Problem Clearly

Code:

```java
class Test {

    int x = 0;
    int y = 0;

    void writer() {
        x = 1;
        y = 1;
    }

    void reader() {
        if (y == 1) {
            System.out.println(x);
        }
    }
}
```

Two threads:

```
Thread 1 → writer()
Thread 2 → reader()
```

You assumed:

```
x = 1
y = 1
```

So if `y == 1`, then `x` must be `1`.

But **multithreading breaks that assumption**.

---

# 2️⃣ Why `0` Can Print

Modern CPUs and JVM optimize execution.

Two things may happen:

### A) CPU Cache (Visibility Problem)

Each thread may read from **its own CPU cache**, not main memory.

Example:

Main memory:

```
x = 1
y = 1
```

Thread 2 cache may still have:

```
x = 0
y = 1
```

So it prints:

```
0
```

---

### B) Instruction Reordering

The JVM or CPU may reorder instructions.

Writer code:

```
x = 1
y = 1
```

May internally execute like:

```
y = 1
x = 1
```

Then reader may see:

```
y == 1
x == 0
```

Again prints:

```
0
```

---

# 3️⃣ How `volatile` Fixes It

If we declare:

```java
volatile int y = 0;
```

Then `y` becomes a **memory barrier**.

Writer:

```java
x = 1;
y = 1;   // volatile write
```

Reader:

```java
if (y == 1) {  // volatile read
    System.out.println(x);
}
```

Now JVM guarantees:

```
All writes before volatile write
must be visible to threads reading that volatile variable
```

Meaning:

```
x = 1 happens-before y = 1
```

So if reader sees:

```
y == 1
```

then it **must see**:

```
x == 1
```

Now `0` cannot happen.

---

# Interview One-Liner

> A volatile write establishes a happens-before relationship with subsequent volatile reads, ensuring visibility of prior writes.

---

# 4️⃣ Your Second Question (Very Important)

You asked:

> Does this happen when two threads operate on the same object or different objects?

### Answer

The problem occurs when:

```
Two threads access shared variables
```

It does **NOT depend on object count**, but on **shared memory**.

Example:

### Case A — Same Object

```
Test obj = new Test();
Thread 1 → obj.writer()
Thread 2 → obj.reader()
```

Shared variables:

```
obj.x
obj.y
```

Problem possible.

---

### Case B — Static Variables

```
static int x
static int y
```

All objects share them → problem possible.

---

### Case C — Separate Objects

```
Test obj1 = new Test();
Test obj2 = new Test();
```

Thread 1 uses `obj1`
Thread 2 uses `obj2`

Now variables are **not shared** → no issue.

---

# Rule to Remember

Multithreading problems occur when:

```
Shared mutable state + multiple threads
```

---

# 5️⃣ Visual Memory Model

```
Main Memory
   x=1 y=1
     |
---------------------
|                   |
Thread 1 Cache   Thread 2 Cache
 x=1 y=1         x=0 y=1
```

Reader prints:

```
0
```

---

# Quick Check (Important)

If we declare:

```java
volatile int x;
volatile int y;
```

### Will the problem still happen?

Yes or No — and why?

### Answer:
```text
No
```

Answer **“No” is correct**, but let’s understand **why**, because this touches the **Java Memory Model (JMM)** and the concept of **happens-before**.

---

# If both variables are `volatile`

```java
volatile int x = 0;
volatile int y = 0;

void writer() {
    x = 1;
    y = 1;
}

void reader() {
    if (y == 1) {
        System.out.println(x);
    }
}
```

Two threads:

```
Thread 1 → writer()
Thread 2 → reader()
```

---

# What `volatile` guarantees

A **volatile write** has two important guarantees:

1️⃣ **Visibility**
The value written by one thread becomes **immediately visible** to other threads.

2️⃣ **Ordering (memory barrier)**
Operations **before a volatile write cannot be reordered after it**.

---

# Execution Order With Volatile

Writer thread executes:

```
x = 1
y = 1   (volatile write)
```

Because `y` is volatile:

```
x = 1  happens-before  y = 1
```

---

# Reader Thread

Reader does:

```
read y (volatile read)
```

A volatile read guarantees that the thread sees **all writes that happened before the volatile write**.

So if the reader sees:

```
y == 1
```

Then the reader **must see**:

```
x == 1
```

---

# Therefore

Printing:

```
0
```

is **not possible** when `y` is volatile (or both are volatile).

---

# Important Interview Rule

A **volatile write establishes a happens-before relationship** with subsequent reads of that variable.

So:

```
write volatile → read volatile
```

ensures memory visibility.

---

# Important Detail

Actually **only `y` needs to be volatile** in this example.
`x` does not have to be volatile.

Because the volatile access to `y` acts as the **memory synchronization point**.

---

# Interview One-Liner

> A volatile write creates a happens-before relationship with subsequent volatile reads, ensuring that all previous writes become visible to other threads.

---

## Quick Challenge (Very Important Interview Trap)

Predict if this program can print **0**.

```java
class Test {

    volatile boolean ready = false;
    int number = 0;

    void writer() {
        number = 42;
        ready = true;
    }

    void reader() {
        if (ready) {
            System.out.println(number);
        }
    }
}
```

Two threads run `writer()` and `reader()`.

**Question:**
Can it print **0** or will it always print **42**? Why?

Not this time — ✅ with `ready` as **volatile**, it should **not** print `0` *if the reader sees `ready == true`.*

Here’s the exact rule:

## What `volatile ready` guarantees

In `writer()`:

```java
number = 42;     // normal write
ready = true;    // volatile write
```

A **volatile write** (`ready = true`) creates a *happens-before* edge:

> All writes before the volatile write become visible to any thread that later reads that volatile variable as `true`.

So in `reader()`:

```java
if (ready) {          // volatile read
    System.out.println(number);
}
```

If the reader sees `ready == true`, then it **must** see `number == 42`.

### What outputs are possible?

* If reader runs **before** writer sets `ready=true`: it prints **nothing**.
* If reader runs **after** it sees `ready=true`: it prints **42**.

✅ Printing `0` is **not allowed** in a correctly implemented JVM under the Java Memory Model, given `ready` is volatile.

---

# Interview one-liner

> Volatile is often used as a “publish” flag: writing the flag volatile safely publishes prior writes.

---

## Quick check (trap)

If we remove `volatile` from `ready`, is printing `0` possible? (Yes/No)

### Answer: 
**Yes, printing `0` becomes possible** if `ready` is **not volatile**.

Let’s understand **why**, because this is a **very important Java Memory Model concept**.

---

# Code Without `volatile`

```java
class Test {

    boolean ready = false;
    int number = 0;

    void writer() {
        number = 42;
        ready = true;
    }

    void reader() {
        if (ready) {
            System.out.println(number);
        }
    }
}
```

Two threads:

```
Thread 1 → writer()
Thread 2 → reader()
```

---

# Why `0` Can Print

Without `volatile`, there is **no happens-before relationship** between the threads.

Two issues may occur:

---

# 1️⃣ Visibility Problem

Thread 1 updates memory:

```
number = 42
ready = true
```

But Thread 2 might see:

```
ready = true
number = 0
```

Because it reads **stale cached values**.

So output:

```
0
```

---

# 2️⃣ Instruction Reordering

The CPU or JVM may reorder instructions.

Writer code:

```
number = 42
ready = true
```

May execute internally as:

```
ready = true
number = 42
```

Now the reader sees:

```
ready == true
number == 0
```

Again prints:

```
0
```

---

# Why `volatile ready` Fixes It

When `ready` is volatile:

```
number = 42
ready = true   (volatile write)
```

Reader:

```
if(ready)   (volatile read)
```

Java guarantees:

```
All writes before volatile write
are visible after volatile read
```

So if reader sees:

```
ready == true
```

it **must see**:

```
number == 42
```

---

# Visual Timeline

Without volatile:

```
Writer Thread          Reader Thread

number = 42
ready = true  ------->  ready == true
                        number == 0
```

Possible output:

```
0
```

---

# Interview One-Liner

> Without synchronization or volatile, there is no happens-before relationship, so a thread may observe writes out of order or see stale values.