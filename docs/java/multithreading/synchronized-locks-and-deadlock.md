# synchronized, Locks, and Deadlock

## Definition

`synchronized` is Java’s built-in locking mechanism. Deadlock happens when threads wait forever for locks held by each other.

## Why It Matters

Locks protect shared state, but wrong lock ordering can block a system. Interviewers often test both correct locking and deadlock prevention.

## Core Example

If Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1, both threads are stuck.

## Common Traps

- Every object can act as a monitor lock.
- Static synchronized methods lock the class object.
- Instance synchronized methods lock the current object.
- Deadlock is not solved by `wait()`/`notify()` alone.
- Nested locks need consistent lock ordering.

## Interview Answer

`synchronized` allows only one thread at a time to enter a protected block for the same lock. It is used to protect shared mutable state. Deadlock happens when two or more threads hold locks and wait for each other forever. The usual fix is to avoid nested locks, use a fixed lock order, or use timeout-based locking.

## Quick Revision

- Instance method lock: current object.
- Static method lock: class object.
- Locks protect critical sections.
- Deadlock requires circular waiting.
- Use fixed lock order to prevent deadlock.
- Keep synchronized blocks small.

## Deep Dive

We now move to **`synchronized` internals + monitor locks**.

---

### 1️⃣ What is a Lock?

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

### 2️⃣ What is `synchronized`?

`synchronized` is a Java keyword used to **protect critical sections**.

It ensures:

```
Only one thread can execute that block/method at a time.
```

It works using **monitor locks**.

---

### 3️⃣ Two Ways to Use `synchronized`

#### A) Synchronized Block

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

#### B) Synchronized Method

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

### 4️⃣ Static Synchronized Method

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

### 5️⃣ Summary Table

| Type                  | Lock Used     |
| --------------------- | ------------- |
| `synchronized(obj)`   | obj           |
| `synchronized method` | this (object) |
| `static synchronized` | Class object  |

---

### 6️⃣ Why Locks Are Needed (Race Condition Fix)

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

### Now You Can Answer My Question

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

### Code

```java
class Test {

    synchronized void m1() {}

    synchronized void m2() {}

    static synchronized void m3() {}

}
```

---

### 1️⃣ Lock for `m1()` and `m2()`

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

### 2️⃣ Lock for `m3()`

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

### Final Lock Summary

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

### 🔥 Important Interview Insight

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

### 🧠 Interview One-Liner

> Instance synchronized methods use the object monitor (`this`), while static synchronized methods use the class monitor (`ClassName.class`).

---

### Next Critical Trap

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

#### Why (very important)

Both `m1()` and `m2()` are **instance synchronized** methods, so they use the **same lock**:

> the object lock = `t` (i.e., `this`)

##### What happens:

* `t1` enters `t.m1()` and **acquires lock on `t`**
* `t1` sleeps 2 seconds **but still holds the lock** (sleep does not release lock)
* `t2` tries to enter `t.m2()` but **cannot**, because lock is still held
* After 2 seconds, `t1` exits `m1()` and releases lock
* Then `t2` enters `m2()` and prints `"m2"`

So `"m2"` prints **after** `"m1 end"` (after ~2 seconds).

---

### Key interview line

> Two synchronized instance methods on the same object block each other because they use the same monitor (`this`).

---

#### Quick follow-up trap

If `t2` called `new Test().m2()` instead of `t.m2()`, would it print immediately? (Yes/No)

✅ Answer: — **Yes, it would print immediately.**

##### Why

Because:

* `t1` is locking on object **t**
* `t2` would lock on a **different object** `new Test()`

Different objects → different monitors → no blocking.

**Interview one-liner:**

> `synchronized` locks are per-object. Two threads only block each other if they synchronize on the **same monitor object**.

---

### Next Level: Deadlock (Most asked trap)

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

##### Question:

1. What problem can happen here?
2. How to fix it (one practical rule)?


##### Answer:
```text
Deadlock occurs when threads acquire locks in different order causing circular wait. The common fix is enforcing a consistent lock acquisition order.
```

Let’s go step by step.

---

### 1️⃣ What Problem Happens Here?

✔ **Deadlock**

Deadlock means:

> Two or more threads wait forever for each other’s locks.

---

### How Deadlock Happens Here

We have two locks:

```text
Lock A
Lock B
```

##### Thread t1

```
Lock A
then tries Lock B
```

##### Thread t2

```
Lock B
then tries Lock A
```

---

### Timeline

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

### 2️⃣ Why wait()/notify() is NOT the Fix

`wait()` / `notify()` are used for:

```text
Thread communication
```

Example:

* Producer-consumer
* Task coordination

They **do not solve deadlocks caused by lock ordering**.

---

### 3️⃣ Correct Fix (Most Important Rule)

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

### 🔥 Four Conditions for Deadlock (Interview Gold)

Deadlock happens when these 4 exist:

1️⃣ Mutual exclusion
2️⃣ Hold and wait
3️⃣ No preemption
4️⃣ Circular wait

Break any one → deadlock avoided.

---

### 🧠 Interview One-Liner

> Deadlock occurs when threads acquire locks in different order causing circular wait. The common fix is enforcing a consistent lock acquisition order.

---

