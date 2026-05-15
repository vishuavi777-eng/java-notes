# volatile, Atomic Classes, and Happens-Before

## Definition

`volatile` gives visibility guarantees. Atomic classes give atomic operations using low-level compare-and-swap behavior.

## Why It Matters

This topic explains memory visibility, instruction reordering, and why some thread-safe code still fails without proper happens-before relationships.

## Core Example

A `volatile boolean ready` flag lets one thread publish a change that another thread can see reliably.

## Common Traps

- `volatile` does not make `count++` atomic.
- `volatile` is useful for visibility, not compound updates.
- Atomic classes help with atomic counters.
- Instruction reordering can affect unsynchronized code.
- Happens-before is about visibility and ordering guarantees.

## Interview Answer

`volatile` ensures that reads and writes go to main memory with visibility guarantees, so one thread can see another thread’s update. It does not make compound operations atomic. For atomic increments, use `AtomicInteger` or synchronization. Happens-before rules define when one thread’s changes are guaranteed to be visible to another thread.

## Quick Revision

- `volatile` gives visibility.
- `volatile` prevents some reordering around the variable.
- `count++` is still not atomic.
- Atomic classes use CAS.
- Happens-before gives ordering and visibility.
- Use the right tool for the shared state pattern.

## Deep Dive

We now go to:

### `volatile` (Most misunderstood Java keyword)

Before I explain it, tell me:

##### Question

What problem does `volatile` solve?

##### Answer:

```text
volatile ensures visibility of variable updates across threads but does not guarantee atomicity.
```

Let’s explain from the ground up.

---

### 1️⃣ The Real Problem `volatile` Solves

In multithreading there are **two major problems**:

1️⃣ **Visibility problem**
2️⃣ **Atomicity problem**

`volatile` solves **only the visibility problem**.

---

### 2️⃣ Why Visibility Problem Happens

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

### Example Problem

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

##### Expected behavior

After 2 seconds:

```
Stopped
```

---

##### What may happen

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

### 3️⃣ Solution: `volatile`

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

### 4️⃣ What `volatile` Guarantees

`volatile` provides:

##### ✔ Visibility

Changes made by one thread are **immediately visible to other threads**.

##### ✔ Happens-before relationship

Write → immediately visible to readers.

---

### 5️⃣ What `volatile` DOES NOT Solve

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

### 6️⃣ Interview Table

| Feature         | volatile |
| --------------- | -------- |
| Visibility      | ✔        |
| Atomicity       | ❌        |
| Prevent caching | ✔        |
| Locking         | ❌        |

---

### 🧠 Interview One-Liner

> `volatile` ensures visibility of variable updates across threads but does not guarantee atomicity.

---

### Now a Very Important Trap

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

##### Answer:

```text
volatile ensures visibility but does not guarantee atomicity, so operations like count++ remain unsafe in multithreading.
```

Now let’s explanation to **interview-quality clarity**.

---

### Correct Answer

❌ **No, we will NOT always get 10000.**

---

### Why?

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

### What `volatile` Actually Guarantees

✔ Visibility
✔ Prevents CPU caching issues

But it does **NOT** guarantee:

❌ Atomic operations
❌ Mutual exclusion

---

### Correct Solutions

##### Option 1 — synchronized

```java
synchronized void inc() {
    count++;
}
```

---

##### Option 2 — AtomicInteger (best)

```java
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```

Uses **CAS (Compare-And-Swap)**.

---

### Interview One-Liner

> `volatile` ensures visibility but does not guarantee atomicity, so operations like `count++` remain unsafe in multithreading.

---

### Now a Very Important Multithreading Trap

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

##### Answer:

```text
volatile ensures visibility of updates across threads, but it does not guarantee ordering of thread execution.
```
---

### Correct Answer

✔ **Yes — if thread 2 reads `flag` after thread 1 writes it, it will see `true`.**

But we must add an important condition.

---

### Why?

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

### Important Detail (Interview Trap)

`volatile` does **NOT guarantee execution order between threads**.

So two scenarios exist:

##### Scenario 1

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

##### Scenario 2

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

### Therefore the correct statement

> `volatile` guarantees **visibility**, but not **thread execution order**.

---

### Interview One-Liner

> `volatile` ensures visibility of updates across threads, but it does not guarantee ordering of thread execution.

---

### Next Critical Topic (Very Important)

Now we move to **Atomic Variables & CAS (Compare-And-Swap)** — this is used inside:

* `AtomicInteger`
* `ConcurrentHashMap`
* many lock-free algorithms.

First question for you:

##### Question

Why is **AtomicInteger faster than synchronized** in many cases?

##### Answer:

```text
AtomicInteger uses lock-free CAS operations at the CPU level, avoiding blocking and context switching, which makes it faster than synchronized in many scenarios.
```

Now let’s explain the **real reason deeply**, because this is an important interview topic.

---

### Why `AtomicInteger` is Often Faster than `synchronized`

Your intuition is correct: **it avoids heavy locking**.

The main reason is:

```text
AtomicInteger uses CAS (Compare-And-Swap) instead of locks.
```

---

### 1️⃣ How `synchronized` Works

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

### 2️⃣ How `AtomicInteger` Works

AtomicInteger uses a **lock-free algorithm**.

Example:

```java
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```

Internally it uses **CAS (Compare-And-Swap)**.

---

### 3️⃣ CAS (Compare-And-Swap)

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

### 4️⃣ Why CAS is Faster

CAS:

✔ No thread blocking
✔ No OS context switching
✔ CPU-level atomic operation

So performance is usually **better under moderate contention**.

---

### Interview Comparison

| Feature     | synchronized            | AtomicInteger  |
| ----------- | ----------------------- | -------------- |
| Locking     | Yes                     | No             |
| Blocking    | Yes                     | No             |
| Uses CAS    | No                      | Yes            |
| Performance | Slower under contention | Usually faster |

---

### Interview One-Liner

> `AtomicInteger` uses lock-free CAS operations at the CPU level, avoiding blocking and context switching, which makes it faster than synchronized in many scenarios.

---

### Important Limitation

CAS can suffer from a problem called:

```text
ABA problem
```

We’ll discuss that later.

---

### Next Important Trap

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

##### Question:

Will this **always print 2000**? Why?

##### Answer:

```text
Yes — it will always print 2000.
AtomicInteger uses CAS (Compare-And-Swap) in a retry loop to ensure atomic updates without using locks.
```

---

### Correct Answer

✔ **Yes — it will always print 2000.**

---

### Why?

Because:

```java
count.incrementAndGet();
```

is an **atomic operation**.

Internally it uses **CAS (Compare-And-Swap)**.

---

### Internal Working (Simplified)

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

### Internal Loop (conceptually)

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

### Important Interview Point

AtomicInteger guarantees:

✔ Atomicity
✔ Visibility
✔ Lock-free behavior

---

### Interview One-Liner

> AtomicInteger uses CAS (Compare-And-Swap) in a retry loop to ensure atomic updates without using locks.

---

### Now a Very Important Multithreading Trap

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

##### Question:

Is it possible for this program to print:

```
0
```

Yes or No — and why?

This question leads to **Java Memory Model & instruction reordering**, one of the most important multithreading topics.

##### Answer:

**Yes — it is possible to print `0`** (in some executions), because without `volatile`/synchronization there is **no happens-before relationship** between the threads.

Let me explain clearly.

---

### Why `0` is possible

You’re thinking in single-thread order:

> writer sets `x=1` then `y=1`, so if reader sees `y==1` it must see `x==1`.

That guarantee exists **only in single-thread reasoning**.

In multithreading, without proper memory barriers, two things can happen:

#### 1) Visibility issue

Thread 1 updates `x` and `y`, but thread 2 may see:

* the update to `y`
* but still see old cached value of `x`

So reader can observe:

```text
y == 1
x == 0
```

#### 2) Reordering

The compiler/CPU can reorder writes for performance (as long as single-thread behavior stays correct). So it’s possible that:

* `y=1` becomes visible before `x=1`

Again reader can see `y==1` first.

---

### Key concept: Happens-Before

Because there is **no synchronization**:

* writer’s actions are not guaranteed to be visible in same order to reader.

So `0` is possible.

---

### How to Fix It (two correct ways)

#### Option A: Make `y` volatile

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

#### Option B: Use synchronized

Put writer and reader under same lock.

---

### Interview one-liner

> Without a happens-before relation, reads can see stale values and writes can appear reordered, so `y==1` does not guarantee `x==1`.

---

#### Quick check question (yes/no)

If we make only `x` volatile (not `y`), is printing `0` still possible?

Let’s go **step-by-step with a mental model**.

We’ll answer **both questions**:

1. **Why `volatile int y` fixes the issue**
2. **When this problem happens (same object vs different object)**

---

### 1️⃣ First Understand the Problem Clearly

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

### 2️⃣ Why `0` Can Print

Modern CPUs and JVM optimize execution.

Two things may happen:

##### A) CPU Cache (Visibility Problem)

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

##### B) Instruction Reordering

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

### 3️⃣ How `volatile` Fixes It

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

### Interview One-Liner

> A volatile write establishes a happens-before relationship with subsequent volatile reads, ensuring visibility of prior writes.

---

### 4️⃣ Your Second Question (Very Important)

You asked:

> Does this happen when two threads operate on the same object or different objects?

##### Answer

The problem occurs when:

```
Two threads access shared variables
```

It does **NOT depend on object count**, but on **shared memory**.

Example:

##### Case A — Same Object

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

##### Case B — Static Variables

```
static int x
static int y
```

All objects share them → problem possible.

---

##### Case C — Separate Objects

```
Test obj1 = new Test();
Test obj2 = new Test();
```

Thread 1 uses `obj1`
Thread 2 uses `obj2`

Now variables are **not shared** → no issue.

---

### Rule to Remember

Multithreading problems occur when:

```
Shared mutable state + multiple threads
```

---

### 5️⃣ Visual Memory Model

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

### Quick Check (Important)

If we declare:

```java
volatile int x;
volatile int y;
```

##### Will the problem still happen?

Yes or No — and why?

##### Answer:
```text
No
```

Answer **“No” is correct**, but let’s understand **why**, because this touches the **Java Memory Model (JMM)** and the concept of **happens-before**.

---

### If both variables are `volatile`

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

### What `volatile` guarantees

A **volatile write** has two important guarantees:

1️⃣ **Visibility**
The value written by one thread becomes **immediately visible** to other threads.

2️⃣ **Ordering (memory barrier)**
Operations **before a volatile write cannot be reordered after it**.

---

### Execution Order With Volatile

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

### Reader Thread

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

### Therefore

Printing:

```
0
```

is **not possible** when `y` is volatile (or both are volatile).

---

### Important Interview Rule

A **volatile write establishes a happens-before relationship** with subsequent reads of that variable.

So:

```
write volatile → read volatile
```

ensures memory visibility.

---

### Important Detail

Actually **only `y` needs to be volatile** in this example.
`x` does not have to be volatile.

Because the volatile access to `y` acts as the **memory synchronization point**.

---

### Interview One-Liner

> A volatile write creates a happens-before relationship with subsequent volatile reads, ensuring that all previous writes become visible to other threads.

---

#### Quick Challenge (Very Important Interview Trap)

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

#### What `volatile ready` guarantees

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

##### What outputs are possible?

* If reader runs **before** writer sets `ready=true`: it prints **nothing**.
* If reader runs **after** it sees `ready=true`: it prints **42**.

✅ Printing `0` is **not allowed** in a correctly implemented JVM under the Java Memory Model, given `ready` is volatile.

---

### Interview one-liner

> Volatile is often used as a “publish” flag: writing the flag volatile safely publishes prior writes.

---

#### Quick check (trap)

If we remove `volatile` from `ready`, is printing `0` possible? (Yes/No)

##### Answer: 
**Yes, printing `0` becomes possible** if `ready` is **not volatile**.

Let’s understand **why**, because this is a **very important Java Memory Model concept**.

---

### Code Without `volatile`

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

### Why `0` Can Print

Without `volatile`, there is **no happens-before relationship** between the threads.

Two issues may occur:

---

### 1️⃣ Visibility Problem

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

### 2️⃣ Instruction Reordering

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

### Why `volatile ready` Fixes It

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

### Visual Timeline

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

### Interview One-Liner

> Without synchronization or volatile, there is no happens-before relationship, so a thread may observe writes out of order or see stale values.
