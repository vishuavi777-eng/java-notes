# HashSet Internals

## Definition

HashSet is a `Set` implementation that stores unique elements using a backing HashMap.

## Why It Matters

HashSet is a common interview topic because duplicate prevention depends on `hashCode()` and `equals()`.

## Core Example

When you add an object to HashSet, Java uses its hash code to find a bucket, then uses `equals()` to check duplicates in that bucket.

## Common Traps

- HashSet does not guarantee insertion order.
- Duplicate detection needs both `hashCode()` and `equals()`.
- If `equals()` is overridden, `hashCode()` should also be overridden.
- Hash collisions are possible.
- Mutable fields used in hashCode can break set behavior.

## Interview Answer

HashSet stores unique elements by using a HashMap internally. The element becomes the key, and a dummy object is stored as the value. Java first uses `hashCode()` to find the bucket, then uses `equals()` to check whether an equal element already exists.

## Quick Revision

- Stores unique elements.
- Backed by HashMap.
- No guaranteed order.
- Uses hashCode for bucket selection.
- Uses equals for duplicate check.
- hashCode and equals contract is critical.

## Deep Dive

Very important concept:

> HashSet internally uses HashMap.

---

### 🔥 Question (Very Important)

How does HashSet prevent duplicates?

Explain in 3–4 steps.

Think about:

* hashCode()
* equals()
* bucket
* internal structure

Answer in your own words.


Hash set use hash map internally to store the value. for each value calculate hash code, use equals to find the bucket if bucket is empty then add the value as key.

Small correction:

### ✅ Correct Deep Explanation — How HashSet Prevents Duplicates

Internally:

```java
public class HashSet<E> {
    private transient HashMap<E,Object> map;
    private static final Object PRESENT = new Object();
}
```

So when you do:

```java
set.add("A");
```

Internally it does:

```java
map.put("A", PRESENT);
```

---

### 🔎 Step-by-Step How Duplicate Is Prevented

##### Step 1️⃣ Calculate hashCode()

When you insert element:

```java
set.add(element);
```

HashSet calls:

```java
element.hashCode()
```

---

##### Step 2️⃣ Find Bucket

Using hashCode, it calculates bucket index:

```text
index = hash & (n - 1)
```

(where n is table length)

---

##### Step 3️⃣ Check Existing Elements in Bucket

Now two possibilities:

###### Case A: Bucket empty

→ Insert new node.

###### Case B: Bucket not empty

→ It compares keys using:

```java
equals()
```

If `equals()` returns true:
→ Duplicate found
→ Do NOT insert
→ Return false

If `equals()` returns false:
→ Collision
→ Insert in bucket chain

---

### 🔥 Very Important Concept

HashSet depends on:

* `hashCode()`
* `equals()`

If you override one but not the other → HashSet breaks.

---

### 🧠 Interview Perfect Answer

> HashSet internally uses a HashMap. When adding an element, it computes hashCode to determine the bucket. If another element exists in the same bucket, it uses equals() to check equality. If equals returns true, it prevents duplicate insertion.

---

### 🚀 Now Deep Question (Critical Interview Level)

What happens if:

* Two objects have same hashCode
* But equals() returns false

Will HashSet store both?

✅ Answer — it **will store both**.

---

### Scenario

Two objects:

* Same `hashCode()`
* But `equals()` returns `false`

Example:

```java
class Person {
    int id;

    public int hashCode() {
        return 1;   // same hash for all
    }

    public boolean equals(Object o) {
        return false;   // always different
    }
}
```

---

### What Happens in HashSet?

##### Step 1️⃣ Same hashCode

Both objects go to **same bucket**.

##### Step 2️⃣ equals() check

Since equals returns false:

* They are considered different
* So both are stored

---

### Internal Structure

Before Java 8:

* Bucket stored as **LinkedList**

After Java 8:

* If bucket size > 8
* And table size ≥ 64
  → Bucket converted to **Red-Black Tree**

This is called:

> Treeification

---

### 🔥 Important Interview Insight

HashMap handles collisions by:

* LinkedList (small bucket)
* Red-Black Tree (large bucket, Java 8+)

---

### 🧠 Final Answer Style (Interview Ready)

> If two objects have the same hashCode but are not equal according to equals(), they will be stored in the same bucket but as separate entries. HashMap handles this collision using a linked list or tree structure internally.

---

### 🚀 Now Very Important Question

What happens if:

* Two objects have different hashCode
* But equals() returns true

Will HashSet store both?

✅ Answer: **it will not store both** — but only if the objects end up in the *same bucket*, which normally requires the same hash.

Now let’s explain the full rule clearly (this is a very important interview point).

---

### The Contract (must memorize)

##### If `equals()` is true, then `hashCode()` **must** be same.

So this situation:

* different hashCode
* equals true

👉 **violates the contract**.

---

### What actually happens in HashSet?

HashSet/HashMap works like this:

1. It first uses `hashCode()` to choose the bucket
2. It only calls `equals()` on elements **inside that bucket**

So if two objects have:

* different hashCode → they go to **different buckets**
* HashSet won’t even compare them with `equals()`

✅ Result: **Both will be stored** (duplicates happen!)
Even though `equals()` says they are equal.

So the correct practical behavior is:

> HashSet may store both, because different hashCodes lead to different buckets, and equals is not checked across buckets.

---

### ✅ Final Correct Answer (Interview-ready)

> If two objects have different hashCode but equals() returns true, it breaks the equals-hashCode contract. HashSet may store both objects in different buckets, causing duplicates.

---

### 🔥 Super Important Interview One-Liner

> HashSet uniqueness is guaranteed only when `equals()` and `hashCode()` follow the contract.

---

#### Quick check (yes/no)

If you override `equals()` in a custom class, must you override `hashCode()` also? Why?

### ✅ Correct Interview Answer

> Yes. Whenever we override `equals()`, we must also override `hashCode()`.
> Because HashSet and HashMap use `hashCode()` to determine the bucket and `equals()` to check equality within that bucket.
> If we override only `equals()` and not `hashCode()`, equal objects may go into different buckets, breaking uniqueness and causing inconsistent behavior.

---

### 🔥 Why This Is Critical (Deep Understanding)

HashMap insertion steps:

1️⃣ Calculate `hashCode()`
2️⃣ Find bucket index
3️⃣ Compare with existing elements using `equals()`

If two objects are logically equal but have different hash codes:

* They go into different buckets
* equals() never gets called
* Both objects get stored
* HashSet allows duplicates

---

### 🔥 Official Contract (Must Memorize)

If:

```java
a.equals(b) == true
```

Then:

```java
a.hashCode() == b.hashCode()
```

Must be true.

But reverse is not required:

* Same hashCode does NOT mean equals() must be true.

---

