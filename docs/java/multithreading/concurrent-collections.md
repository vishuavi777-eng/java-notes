# Concurrent Collections

## Definition

Concurrent collections are thread-safe collection classes designed for safe access by multiple threads.

## Why It Matters

Normal collections like `HashMap` and `ArrayList` are not safe for concurrent modification. Backend systems often need concurrent maps and queues.

## Core Example

`ConcurrentHashMap` allows safe concurrent reads and updates without locking the whole map like `Hashtable`.

## Common Traps

- `HashMap` is not thread-safe.
- `Hashtable` uses broad synchronization.
- `ConcurrentHashMap` does not allow null keys or values.
- ConcurrentHashMap reads are highly optimized.
- Thread-safe does not mean every compound workflow is automatically atomic.

## Interview Answer

Concurrent collections provide thread-safe behavior for common data structures. `ConcurrentHashMap` is faster than `Hashtable` because it avoids one global lock and allows better concurrency. It also disallows null keys and values to avoid ambiguity in concurrent reads.

## Quick Revision

- Use concurrent collections for shared mutable collections.
- `HashMap` is unsafe for concurrent writes.
- `ConcurrentHashMap` is preferred over `Hashtable`.
- No null key or value in `ConcurrentHashMap`.
- Concurrent collections reduce locking problems.
- Compound operations still need careful design.

## Deep Dive

You now know:

```
Threads
Race conditions
synchronized
Locks
Deadlock
volatile
CAS
Atomic classes
Thread pools
ExecutorService
shutdown vs shutdownNow
Interrupts
```

You are now **entering senior-level territory**.

---

### Next Major Topic (Very Important)

Now we should cover:

### **Concurrent Collections**

Because normal collections are **not thread-safe**.

Examples:

```
ConcurrentHashMap
CopyOnWriteArrayList
BlockingQueue
```

These are heavily used in **backend systems and interviews**.

---

Before we start:

##### Quick question

Is this thread-safe?

```java
Map<String, Integer> map = new HashMap<>();
```

Multiple threads doing:

```java
map.put()
map.get()
```

Yes or No? And why?


##### Answer:
```text
HashMap is not thread-safe because concurrent modifications can cause race conditions, visibility issues, and even internal structure corruption during resize.
```
Let's understand step by step
---

### Correct Answer

❌ **No, HashMap is not thread-safe.**

If multiple threads perform:

```java
map.put()
map.get()
```

without synchronization, several problems may occur.

---

### 1️⃣ Race Condition

Two threads modifying the same bucket can overwrite each other's updates.

Example:

```
Thread 1 → put(A,1)
Thread 2 → put(A,2)
```

Final value may be unpredictable.

---

### 2️⃣ Internal Structure Corruption (Very Important)

`HashMap` internally uses:

```
Array → bucket → linked list / tree
```

During **resize (rehashing)**, if two threads modify it simultaneously, the internal linked list may become corrupted.

This could lead to:

```
Infinite loop during traversal
```

This was a **real issue in Java 7 HashMap**.

Example symptom:

```
CPU 100%
Thread stuck in HashMap.get()
```

---

### 3️⃣ Visibility Problems

Without synchronization, one thread’s updates may **not be visible** to others due to CPU caching.

---

### 4️⃣ Rehashing is Dangerous in Multithreading

During resize:

```
Old bucket → new bucket redistribution
```

Two threads doing this simultaneously can create **cyclic linked lists**.

---

### Interview One-Liner

> HashMap is not thread-safe because concurrent modifications can cause race conditions, visibility issues, and even internal structure corruption during resize.

---

### Correct Solutions

Instead of `HashMap`, use:

##### 1️⃣ `ConcurrentHashMap` (Best)

```java
Map<String,Integer> map = new ConcurrentHashMap<>();
```

Highly scalable.

---

##### 2️⃣ `Collections.synchronizedMap`

```java
Map<String,Integer> map =
    Collections.synchronizedMap(new HashMap<>());
```

Uses a **single lock**.

---

### Difference

| Map               | Thread Safety | Performance          |
| ----------------- | ------------- | -------------------- |
| HashMap           | ❌ No          | Fast but unsafe      |
| synchronizedMap   | ✔ Yes         | Slower (global lock) |
| ConcurrentHashMap | ✔ Yes         | High concurrency     |

---

### Next Big Interview Topic

##### How `ConcurrentHashMap` Works Internally

This is **very commonly asked in senior interviews**.

It involves:

```
Segment locking (Java 7)
CAS + bucket locking (Java 8)
Tree bins
Lock striping
```

---

Before I explain internals, try answering:

##### Question

Why is `ConcurrentHashMap` faster than `Hashtable`?


##### Answer:

**“locks only the affected bucket and uses CAS operations.”**
**“multiple threads can operate on different buckets concurrently.”**

Now let’s refine this answer to **interview-quality depth**.

---

### Why `ConcurrentHashMap` Is Faster Than `Hashtable`

#### 1️⃣ Hashtable Uses Global Lock

`Hashtable` methods are synchronized:

```java
public synchronized V put(K key, V value)
```

Meaning:

```
One thread at a time
Entire map locked
```

Example:

```
Thread1 → put()
Thread2 → get()
Thread3 → put()
```

All must wait for the **same lock**.

Result:

```
Low concurrency
Poor scalability
```

---

### 2️⃣ ConcurrentHashMap Uses Fine-Grained Locking

Instead of locking the entire map, it locks **only the bucket (or node)**.

So:

```
Thread1 → bucket 3
Thread2 → bucket 10
Thread3 → bucket 15
```

All can run **simultaneously**.

---

### 3️⃣ CAS (Compare-And-Swap)

For some operations, `ConcurrentHashMap` avoids locking entirely and uses **CAS**.

Example operations:

```
putIfAbsent
computeIfAbsent
replace
```

CAS is a **CPU atomic instruction**, so it is **lock-free**.

---

### 4️⃣ Reads Are Lock-Free

One of the most powerful features:

```java
map.get(key)
```

is **non-blocking**.

Reads do not require locks in most cases.

So many threads can read simultaneously.

---

### 5️⃣ Internal Structure (Java 8+)

`ConcurrentHashMap` uses:

```
Node[]
 ↓
bucket
 ↓
LinkedList
 ↓
Tree (if collision > 8)
```

Same concept as HashMap but with **thread-safe mechanisms**.

---

### Comparison Table

| Feature         | Hashtable       | ConcurrentHashMap |
| --------------- | --------------- | ----------------- |
| Locking         | Whole map       | Bucket-level      |
| Read operations | Locked          | Mostly lock-free  |
| Concurrency     | Low             | High              |
| Performance     | Slow under load | Scales well       |

---

### Interview One-Liner

> `ConcurrentHashMap` improves concurrency by using fine-grained locking and CAS operations instead of locking the entire map like `Hashtable`.

---

### Very Important Interview Trap

Can `ConcurrentHashMap` store:

```
null key
null value
```

Yes or No — and why?

(This question appears surprisingly often in interviews.)

##### Answer:
```text
ConcurrentHashMap does not allow null keys or values to avoid ambiguity between a missing key and a null value in concurrent environments.
```

Let's understand it to the **real interview explanation**.

---

### Can `ConcurrentHashMap` Store `null` Key or Value?

❌ **No — it does NOT allow `null` key or `null` value.**

Example:

```java
Map<String, Integer> map = new ConcurrentHashMap<>();

map.put(null, 1);     // ❌ NullPointerException
map.put("A", null);   // ❌ NullPointerException
```

---

### Why `null` Is Not Allowed

The main reason is **ambiguity in concurrent reads**.

Consider this call:

```java
map.get("A")
```

Possible return values:

```
null
```

But what does that mean?

Two possibilities:

```
1️⃣ Key does not exist
2️⃣ Key exists but value is null
```

In **single-threaded maps like HashMap**, this ambiguity is manageable.

But in **ConcurrentHashMap**, multiple threads may be modifying the map simultaneously.

Example scenario:

```
Thread1 → removing key "A"
Thread2 → calling get("A")
```

If `null` values were allowed, the map **cannot safely determine**:

```
Was the key absent?
Was the value null?
Was another thread removing it?
```

So Java designers **forbid nulls completely**.

---

### HashMap vs ConcurrentHashMap

| Feature     | HashMap       | ConcurrentHashMap |
| ----------- | ------------- | ----------------- |
| Null key    | ✔ Allowed (1) | ❌ Not allowed     |
| Null value  | ✔ Allowed     | ❌ Not allowed     |
| Thread-safe | ❌ No          | ✔ Yes             |

---

### Interview One-Liner

> `ConcurrentHashMap` does not allow null keys or values to avoid ambiguity between a missing key and a null value in concurrent environments.

---

### Very Important ConcurrentHashMap Topic

Another interview question:

##### What happens when many keys collide into the same bucket?

Example:

```
hash collisions
```

What does Java 8 do when the linked list inside a bucket becomes too long?

Hint: This is called **Treeification**.

##### Answer:
```text
In Java 8+, when bucket collisions exceed 8 and table size is at least 64, the linked list is converted into a Red-Black tree to improve lookup from O(n) to O(log n).
```

Excellent ✅ — your answer is **correct**.

Small English correction:

* “if bucket size is going above 8” → **“if the bucket size exceeds 8”**

Now let’s explain the **complete concept**, because interviewers often ask **follow-up traps** here.

---

### Treeification in HashMap / ConcurrentHashMap

When many keys collide into the same bucket:

Initially structure is:

```
Array
  ↓
Bucket
  ↓
Linked List
```

Example:

```
bucket[5]
   ↓
[K1] → [K2] → [K3] → [K4] → [K5] → [K6] → [K7] → [K8]
```

If collisions keep increasing, searching becomes:

```
O(n)
```

Which is slow.

---

### Java 8 Improvement

If bucket size becomes **greater than 8**, Java converts the list to a **Red-Black Tree**.

This process is called:

```
Treeification
```

Structure becomes:

```
Array
 ↓
Bucket
 ↓
Red-Black Tree
```

Search complexity becomes:

```
O(log n)
```

Instead of:

```
O(n)
```

---

### Treeification Threshold

```
TREEIFY_THRESHOLD = 8
```

Meaning:

```
LinkedList → Tree
when nodes > 8
```

---

### But There Is Another Important Condition ⚠

Treeification happens **only if the table size ≥ 64**.

Constant:

```
MIN_TREEIFY_CAPACITY = 64
```

If the table is smaller than 64:

```
Java prefers resizing instead of treeifying
```

---

### Why Java Does This

Because collisions often happen due to **small table size**, not bad hashing.

So Java first tries:

```
resize table
```

instead of converting to tree.

---

### Reverse Operation (Very Important)

If elements decrease:

```
UNTREEIFY_THRESHOLD = 6
```

Then:

```
Tree → Linked List
```

---

### Summary Table

| Condition       | Action               |
| --------------- | -------------------- |
| bucket size > 8 | convert to tree      |
| table size < 64 | resize instead       |
| bucket size < 6 | convert back to list |

---

### Interview One-Liner

> In Java 8+, when bucket collisions exceed 8 and table size is at least 64, the linked list is converted into a Red-Black tree to improve lookup from O(n) to O(log n).

---

### Quick Interview Trap

Which map maintains **insertion order**?

A) HashMap
B) LinkedHashMap
C) TreeMap

And which map maintains **sorted order**?

##### Answer:
```text
LinkedHashMap
```
