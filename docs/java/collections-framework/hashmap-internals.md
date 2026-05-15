# HashMap Internals

## Definition

HashMap stores key-value pairs using hashing, buckets, and collision handling.

## Why It Matters

HashMap is one of the most asked Java interview topics because it connects hashing, equality, resizing, null handling, and performance.

## Core Example

When `map.put(key, value)` runs, HashMap calculates the key hash, chooses a bucket, and stores or updates the entry.

## Common Traps

- HashMap allows one null key and multiple null values.
- HashMap is not thread-safe.
- Resize changes bucket distribution.
- Hash collisions are handled inside buckets.
- Poor hashCode can hurt performance.

## Interview Answer

HashMap stores entries in an internal table of buckets. It uses the key hash to choose a bucket. If multiple keys land in the same bucket, HashMap compares keys using `equals()`. In Java 8+, a long collision chain can become a tree for better lookup performance. HashMap resizes when the load factor threshold is crossed.

## Quick Revision

- Stores key-value pairs.
- Uses hashCode and equals.
- Allows one null key.
- Not thread-safe.
- Resizes based on load factor.
- Java 8 can treeify heavy collision buckets.

## Deep Dive

We are now entering the most important data structure in Java interviews.

---

### 🔹 HashMap Internal Structure (Java 8+)

Internally:

```java
Node<K,V>[] table;
```

Each bucket contains:

```java
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```

So structure is:

```
Array of buckets
Each bucket → LinkedList OR Tree
```

---

### 🔥 Step-by-Step: What Happens When You Do

```java
map.put(key, value);
```

##### Step 1️⃣ Compute hash

```java
int hash = hash(key);
```

##### Step 2️⃣ Find index

```java
index = (n - 1) & hash;
```

(n = table length)

---

##### Step 3️⃣ Check bucket

Case A: bucket empty
→ Insert new node.

Case B: bucket not empty
→ Traverse:

* If key equal → replace value
* Else → collision → add node

---

##### Step 4️⃣ Resize Check

If:

```
size > capacity * loadFactor
```

Default:

* capacity = 16
* loadFactor = 0.75

Resize occurs.

---

### 🔥 Important Question

If initial capacity = 16
loadFactor = 0.75

At what size does resize occur?

Correct answer: **Resize happens when size becomes 13** (i.e., after inserting the 13th element).

Let’s calculate properly 👇

---

### Given

* Initial capacity = **16**
* Load factor = **0.75**

Resize threshold formula:

```
threshold = capacity × loadFactor
```

So:

```
16 × 0.75 = 12
```

Threshold = **12**

---

### When Does Resize Actually Trigger?

Resize happens when:

```
size > threshold
```

So:

* After inserting 12 elements → size = 12 → OK
* When inserting 13th element → size becomes 13 → 13 > 12 → resize

---

### ✅ Final Answer

Threshold = 12
Resize happens when size becomes **13**

---

### 🔥 Important Interview Detail

Many people say:

> Resize happens at 12.

That is incorrect.

Correct statement:

> Resize happens when inserting the 13th element.

---

### 🚀 Now Slightly Harder

After resize, what will be new capacity?

Initial capacity was 16.

Answer?

✅ Answer — correct instinct. It becomes **double**.

---

### 🔥 After Resize

Initial:

* Capacity = 16
* Threshold = 12

When inserting 13th element → resize triggered.

New capacity:

```
newCapacity = oldCapacity * 2
```

So:

```
16 → 32
```

---

### 🔥 What about new threshold?

Threshold = capacity × loadFactor

```
32 × 0.75 = 24
```

So after resize:

* Capacity = 32
* Threshold = 24

Resize will happen again when size becomes 25.

---

### 🧠 Important Difference from ArrayList

| Structure | Resize Factor |
| --------- | ------------- |
| ArrayList | 1.5x          |
| HashMap   | 2x            |

HashMap doubles capacity to reduce collisions.

---

### 🚀 Now Very Important Concept (Senior-Level)

When HashMap resizes, does it:

A) Just copy buckets to new array
B) Recalculate hash and redistribute entries

✅ Answer — **it redistributes entries** (rehashes to new buckets).
But small refinement: it usually doesn’t “recalculate hashCode()” of the key again; it **recomputes bucket index** using the stored hash and the new table size.

---

### What really happens on HashMap resize (deep)

When capacity doubles (e.g., 16 → 32):

* HashMap creates a new `Node[] table` of size 32
* For each existing entry, it decides the new bucket using:

```text
newIndex = hash & (newCapacity - 1)
```

Since `newCapacity` changed, **bucket index changes**, so entries move.

---

#### Java 8 optimization (interview bonus)

During resize, Java 8 doesn’t fully recompute everything expensively.
It uses a smart trick:

When capacity doubles, each entry either:

* stays in the same index, or
* moves to `index + oldCapacity`

Based on one bit:

```text
(hash & oldCapacity) == 0  → stay
(hash & oldCapacity) != 0  → move to index + oldCapacity
```

This makes resizing faster.

---

### 🧠 Interview one-liner

> On resize, HashMap redistributes nodes into a larger table because bucket index depends on capacity. In Java 8, entries either stay or move by oldCapacity based on one hash bit.

---

### 🔥 Next Critical Question (Collision handling)

In Java 8+, when many keys collide into the same bucket, HashMap may convert the bucket from a LinkedList into a Tree.

1. What is this conversion called?
2. After how many nodes (default) does it happen?

### 1️⃣ Conversion Name

✔ **Treeification**

When a bucket (collision chain) becomes too long,
LinkedList → converted to **Red-Black Tree**

---

### 2️⃣ When does it happen?

✔ When bucket size becomes **≥ 8**

More precisely:

* If bucket size > **TREEIFY_THRESHOLD (8)**
* AND table size ≥ **64**

Only then treeification happens.

---

### 🔥 Important Condition (Many Miss This)

Treeification happens only if:

```
bucket size ≥ 8
AND
table capacity ≥ 64
```

If capacity < 64:

* HashMap will resize instead of treeify.

This avoids unnecessary tree creation.

---

### 🧠 Interview One-Liner

> In Java 8+, if a bucket contains more than 8 nodes and table size is at least 64, it is converted into a Red-Black Tree to improve lookup from O(n) to O(log n).

---

### 🚀 Now Very Important Question

What is the time complexity of:

1️⃣ HashMap get() normally
2️⃣ HashMap get() in worst case (before Java 8)
3️⃣ HashMap get() in worst case (after treeification)

✅ Answers:

---

### HashMap `get()` Complexity (Interview-Ready)

1️⃣ **Normal average case**: **O(1)**

* Good hash distribution, small bucket size.

2️⃣ **Worst case before Java 8**: **O(n)**

* All keys collide → one long linked list bucket → linear search.

3️⃣ **Worst case after treeification (Java 8+)**: **O(log n)**

* Long bucket becomes Red-Black Tree → log-time lookup.

---

### 🔥 Ultra Important Interview Trap: `null` in HashMap

Answer these:

1. Does HashMap allow `null` key?
2. Does HashMap allow multiple `null` keys?
3. How many `null` keys allowed?
4. Does HashMap allow `null` values?


Now let’s go deep because this is a **very common interview trap**.

---

### 1️⃣ Does HashMap allow null key?

✔ **Yes**

HashMap allows **one null key**.

---

### 2️⃣ Does HashMap allow multiple null keys?

❌ **No**

Because:

* Keys must be unique
* Only one null key allowed

If you insert:

```java
map.put(null, 10);
map.put(null, 20);
```

Second one replaces the first.

---

### 3️⃣ How many null keys allowed?

✔ **Only 1**

---

### 4️⃣ Does HashMap allow null values?

✔ **Yes**

Multiple null values allowed.

Example:

```java
map.put("A", null);
map.put("B", null);
```

Perfectly valid.

---

### 🔥 Now the Important Internal Question

Where does HashMap store null key internally?

Think carefully.

Since null has no hashCode, what bucket is used?

✅ Answer — it is stored in the **first bucket (index 0)**.

Now let’s explain properly and deeply.

---

### 🔥 How HashMap Handles `null` Key Internally

When you do:

```java
map.put(null, "value");
```

HashMap logic:

```java
if (key == null)
    return putForNullKey(value);
```

It does NOT call `hashCode()`.

Instead:

* It directly inserts into **bucket index 0**

Why?

Because:

```text
hash(null) = 0
index = (n - 1) & 0 = 0
```

So null key always goes to bucket 0.

---

### 🧠 Important Interview Insight

> HashMap allows one null key and stores it in bucket 0.

---

### 🔥 Now Hard Question (Very Important)

Why does HashMap allow null key but Hashtable does NOT?

### 🔥 Why HashMap allows null but Hashtable does NOT

##### 1️⃣ Design Difference

**HashMap**

* Introduced in Java 1.2
* Not synchronized
* More flexible
* Allows 1 null key and multiple null values

**Hashtable**

* Legacy class (Java 1.0)
* Fully synchronized
* Does NOT allow null key or null value

---

### 🔥 The Real Reason (Important)

Hashtable methods are synchronized and older design assumed:

```java
value = table[index];
if (value == null)
    // means key not present
```

If null values were allowed:

* Cannot distinguish between:

  * Key not present
  * Key present but value = null

So to avoid ambiguity:

> Hashtable does not allow null key or null value.

---

### 🔥 Why HashMap allows null then?

HashMap is more modern and internally handles null carefully:

* Special handling for null key (bucket 0)
* Null values allowed
* Uses `containsKey()` to differentiate

Example:

```java
map.put("A", null);

map.get("A") → null
map.containsKey("A") → true
```

So HashMap can differentiate.

---

### 🧠 Interview One-Liner

> Hashtable does not allow null keys or values to avoid ambiguity and because of its legacy synchronized design, while HashMap allows one null key and multiple null values.

---

### 🚀 Now Very Important Question

Which is thread-safe?

1️⃣ HashMap
2️⃣ Hashtable
3️⃣ ConcurrentHashMap

Correct answer:

##### 1️⃣ HashMap → ❌ Not thread-safe

##### 2️⃣ Hashtable → ✅ Thread-safe (synchronized)

##### 3️⃣ ConcurrentHashMap → ✅ Thread-safe (better design)

Now let’s explain properly.

---

### 🔥 1️⃣ HashMap

* Not synchronized
* If multiple threads modify it → data corruption possible
* Can even cause infinite loop during resize (older Java versions)

So:

```text
HashMap → NOT thread-safe
```

---

### 🔥 2️⃣ Hashtable

* All methods are synchronized
* Only one thread can access at a time
* Safe but slow

Example:

```java
public synchronized V put(K key, V value)
```

So:

```text
Hashtable → Thread-safe but inefficient
```

---

### 🔥 3️⃣ ConcurrentHashMap (Most Important)

* Designed for concurrency
* Not fully synchronized
* Uses fine-grained locking
* Allows multiple threads to read/write safely
* Much faster than Hashtable

So:

```text
ConcurrentHashMap → Thread-safe and efficient
```

---

### 🧠 Interview One-Liner

> HashMap is not thread-safe. Hashtable is thread-safe but fully synchronized and slow. ConcurrentHashMap is thread-safe with better performance using segmented locking (Java 7) or CAS + synchronized bins (Java 8+).

---

### 🚀 Now Very Important Question

Does ConcurrentHashMap allow null key or null value?

Think carefully. This is tricky.

✅ Answer — **ConcurrentHashMap does NOT allow null key or null value.**

Now let’s understand *why* (very important for interviews).

---

### 🔥 Why ConcurrentHashMap does NOT allow null?

In concurrent environment:

If this was allowed:

```java
map.put("A", null);
```

Now if another thread does:

```java
map.get("A");
```

It returns `null`.

Now ambiguity:

* Is key not present?
* Or key present but value is null?

In single-threaded HashMap, you can call:

```java
map.containsKey("A");
```

But in concurrent environment:

Between `get()` and `containsKey()`:

* Another thread may remove or modify entry.
* So result becomes inconsistent.

To avoid this ambiguity:

> ConcurrentHashMap does not allow null keys or values.

---

### 🧠 Interview One-Liner

> ConcurrentHashMap does not allow null keys or values because in concurrent environments null creates ambiguity between “key absent” and “value null”.

---

