# Race Conditions, sleep, and wait

## Definition

A race condition happens when multiple threads access shared data and the final result depends on timing.

## Why It Matters

Race conditions are one of the most common concurrency bugs. `sleep()` and `wait()` are also common interview traps because they behave very differently.

## Core Example

If two threads execute `count++` at the same time, both can read the same old value and one update can be lost.

## Common Traps

- `count++` is not atomic.
- `sleep()` does not release a lock.
- `wait()` releases the object monitor.
- `wait()` must be called from synchronized context.
- Timing-based fixes are not real thread-safety fixes.

## Interview Answer

A race condition occurs when threads modify shared state without proper coordination. For example, `count++` reads, increments, and writes in separate steps, so updates can be lost. `sleep()` only pauses the current thread, while `wait()` releases the monitor and waits for notification.

## Quick Revision

- Race condition depends on thread timing.
- `count++` has multiple steps.
- Use synchronization or atomic classes for shared updates.
- `sleep()` keeps the lock.
- `wait()` releases the lock.
- `wait()` belongs to `Object`.

## Deep Dive

#### What is a race condition?

When multiple threads access shared data and **the result depends on timing**.

---

##### 🔥 Trap 4: Predict output (very common)

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

### Correct Answer

##### 1️⃣ Will it always print `200000`?

❌ **No**

---

##### 2️⃣ Why?

Because of a **race condition**.

The operation:

```java
count++;
```

is **not atomic**.

It actually performs **three steps internally**.

---

### Internal Working of `count++`

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

### 🔥 Lost Update Problem

---

### Interview One-Liner

> `count++` is not atomic. It consists of read–modify–write operations, so multiple threads may read the same value and overwrite each other's updates, causing a race condition.

---

### Fixing the Problem

##### Option 1: synchronized

```java
synchronized void inc() {
    count++;
}
```

---

##### Option 2: AtomicInteger (better)

```java
AtomicInteger count = new AtomicInteger(0);

count.incrementAndGet();
```

This uses **CAS (Compare-And-Swap)**.

---

### Next Important Topic (Very Important)

Before moving ahead, answer this.

##### Trap Question

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

### `Thread.sleep()` vs `Object.wait()` (Deep + Interview Ready)

#### 1) Who owns the method?

##### `sleep()`

* It is a **static** method of `Thread`.
* You call it as:

  ```java
  Thread.sleep(1000);
  ```

##### `wait()`

* It is a method of **Object**.
* You call it on a lock object:

  ```java
  lock.wait();
  ```

---

#### 2) Does it release the lock (monitor)?

##### `sleep()`

❌ **Does NOT release any lock**.

If a thread is inside a synchronized block and calls sleep, it keeps the lock.

##### `wait()`

✅ **Releases the lock** (monitor) immediately and goes to waiting state.

This is the biggest difference.

---

#### 3) Where can you call it?

##### `sleep()`

* Can be called anywhere.
* No special requirement.

##### `wait()`

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

#### 4) How does a thread wake up?

##### `sleep()`

* Wakes up automatically after time ends (or interrupt).
* No other thread needs to do anything.

##### `wait()`

* Wakes up if:

  1. another thread calls `notify()` / `notifyAll()` on same lock object
     OR
  2. timeout ends (`wait(ms)`)
     OR
  3. interrupted

---

#### 5) Use cases (important)

##### `sleep()`

* Pause thread for some time.
* Rate limiting, retry delay, polling delay.

##### `wait()`

* Thread coordination / communication.
* Classic producer-consumer pattern.

---

### ✅ Short Interview Answer (Memorize)

> `sleep()` pauses the current thread without releasing any locks and can be called anywhere.
> `wait()` is used for inter-thread communication; it must be called inside a synchronized block and it releases the lock until notified or timed out.

---

### 🔥 Quick Trap (to confirm understanding)

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

### Correct Behavior

`t2` will print **after about 2 seconds**, not immediately.

Output (after ~2s):

```
t2 entered
```

---

### Why?

Look carefully.

##### Thread t1

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

##### Thread t2

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

##### Timeline

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

### 🔥 Important Rule

| Method    | Releases Lock? |
| --------- | -------------- |
| `sleep()` | ❌ No           |
| `wait()`  | ✅ Yes          |

This is one of the **most common Java interview traps**.

---

### 🧠 Interview One-Liner

> `Thread.sleep()` pauses the thread but keeps the monitor lock, while `wait()` releases the lock and allows other threads to acquire it.

---

