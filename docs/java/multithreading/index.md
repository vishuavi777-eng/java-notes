# Multithreading Fundamentals and Thread Lifecycle

## Definition

Multithreading means running multiple threads inside one process so different tasks can make progress independently.

## Why It Matters

This is the base for Java concurrency interviews. It explains threads, processes, lifecycle, scheduling, and why concurrent code can be difficult.

## Core Example

A web server can use different threads to handle multiple requests at the same time.

## Common Traps

- Calling `run()` does not start a new thread.
- Calling `start()` asks the JVM to create a new thread.
- Thread scheduling is controlled by the JVM and operating system.
- Output order from multiple threads is not guaranteed.

## Interview Answer

A thread is a lightweight unit of execution inside a process. In Java, we can create threads using `Thread`, `Runnable`, or higher-level concurrency APIs. Calling `start()` creates a new call stack and lets the JVM run the thread separately. Calling `run()` is just a normal method call.

## Quick Revision

- Process owns memory and resources.
- Thread executes code inside a process.
- `start()` creates a new thread.
- `run()` is a normal method call.
- Thread output order is not guaranteed.
- Thread lifecycle matters in interviews.

## Deep Dive

Multithreading deep dive, end-to-end. We’ll go **basic → advanced**, with **internals + traps + interview answers**. No fluff.

---

### Level 1: What is a Thread? What is a Process?

* **Process**: independent program instance (separate memory space).
* **Thread**: execution path inside a process (threads share heap, have separate stacks).

**Key interview line**

> Threads share heap (objects) but each thread has its own stack (local variables, frames).

---

### Level 2: Creating Threads

#### Option A: Extend Thread

```java
class T extends Thread {
  public void run() { System.out.println("run"); }
}
new T().start();
```

#### Option B: Implement Runnable (preferred)

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

### ✅ Absolute Must-Know: `start()` vs `run()` (Top trap)

* `start()` → creates a **new OS/JVM thread**, then calls `run()` on that new thread.
* `run()` → normal method call, runs on **current thread**, no new thread.

**Interview one-liner**

> Calling `run()` doesn’t start a new thread; `start()` does.

---

### Thread Lifecycle (Interview)

States (simplified):

* **NEW**
* **RUNNABLE** (ready/running)
* **BLOCKED** (waiting for monitor lock)
* **WAITING** (wait/join without timeout)
* **TIMED_WAITING** (sleep/join with timeout)
* **TERMINATED**

---

### CPU Scheduling Basics (What you must accept)

* Thread execution order is **not guaranteed**
* Prints can interleave unpredictably
* Priority is a hint, not a guarantee (OS-dependent)

---

### 🔥 Trap Set 1 (Answer these outputs)

##### Q1: start vs run

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

##### Q2: start order

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

##### Q3: sleep

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

#### Q1: `run()` vs `start()`

Code:

```java
t.run();
System.out.print("M");
```

##### ✅ Output

```
RM
```

##### Why

`t.run()` is just a normal method call on the **main thread**, so it prints `R`, then main prints `M`.

---

#### Q2: `start()` scheduling

Code:

```java
new A().start();
System.out.print("M");
```

##### ✅ Possible outputs

```
TM
MT
```

##### Why

`start()` creates a new thread, but scheduling is unpredictable:

* Thread may run first → `T` then `M`
* Main may print first → `M` then `T`

---

#### Q3: `Thread.sleep(0)`

Code:

```java
System.out.print("A");
Thread.sleep(0);
System.out.print("B");
```

##### ✅ Output

```
AB
```

##### Why

`sleep(0)` does **not** end the thread or switch threads reliably. It just sleeps for 0 ms (effectively no-op). So prints `A` then `B`.

---

### ✅ Quick Fix: Your mistakes

* Q1: you missed that `run()` prints `R`
* Q3: you confused print character (`B`) with `M`

---

