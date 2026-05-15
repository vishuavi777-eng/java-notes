# Fail-Fast, TreeMap, Comparable, and Comparator

## Definition

Fail-fast iterators detect structural modification during iteration. TreeMap stores sorted keys. Comparable and Comparator define sorting rules.

## Why It Matters

These topics test practical collection usage: safe iteration, sorted maps, and custom object sorting.

## Core Example

A TreeMap can keep employee IDs sorted, while a Comparator can sort employees by salary instead of natural order.

## Common Traps

- Fail-fast behavior is not a thread-safety feature.
- Removing directly from a collection during iteration can cause ConcurrentModificationException.
- TreeMap lookup is O(log n), not O(1).
- Comparable defines natural ordering.
- Comparator defines external/custom ordering.

## Interview Answer

Fail-fast iterators throw `ConcurrentModificationException` when a collection is structurally modified outside the iterator during iteration. TreeMap stores entries sorted by key using a red-black tree, so operations are O(log n). Comparable gives a class its natural order, while Comparator lets us define separate custom ordering rules.

## Quick Revision

- Fail-fast detects unsafe structural modification.
- Use iterator remove or safe alternatives.
- TreeMap keeps keys sorted.
- TreeMap operations are O(log n).
- Comparable is natural ordering.
- Comparator is custom ordering.

## Deep Dive

| Map Type          | Thread-Safe | Null Key | Null Value |
| ----------------- | ----------- | -------- | ---------- |
| HashMap           | ❌ No        | ✅ 1      | ✅ Yes      |
| Hashtable         | ✅ Yes       | ❌ No     | ❌ No       |
| ConcurrentHashMap | ✅ Yes       | ❌ No     | ❌ No       |

---

### 🚀 Now Important Concept: Fail-Fast

What happens if you modify an ArrayList while iterating using for-each loop?

Example:

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(3);

for (Integer i : list) {
    list.remove(i);
}
```

What happens?


✅ Answer: — it throws:

```
ConcurrentModificationException
```

Now let’s go deep and make it interview-ready.

---

### Why ConcurrentModificationException Happens?

When you iterate using:

```java
for (Integer i : list)
```

Internally it uses an **Iterator**:

```java
Iterator<Integer> it = list.iterator();
```

ArrayList maintains:

```java
modCount
```

Every structural modification:

* add()
* remove()
* clear()

Increments `modCount`.

---

##### What Iterator Stores

Iterator stores:

```
expectedModCount
```

During iteration:

```java
if (modCount != expectedModCount)
    throw ConcurrentModificationException;
```

So when you modify list directly:

```java
list.remove(i);
```

`modCount` changes
But iterator’s `expectedModCount` does not
→ mismatch
→ exception thrown

---

### 🔥 Important Interview Concept

This is called:

> Fail-Fast behavior

Fail-fast means:

* Detects structural modification
* Fails immediately
* Does not allow unpredictable behavior

---

### 🧠 Interview One-Liner

> ArrayList iterators are fail-fast. If the collection is structurally modified after the iterator is created (except through iterator.remove()), it throws ConcurrentModificationException.

---

### 🚀 Now Very Important Question

How can you safely remove elements while iterating?

### ✅ Correct & Recommended Approach (Interview Answer)

Use **Iterator.remove()**

```java
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    Integer val = it.next();
    if (val % 2 == 0) {
        it.remove();  // SAFE
    }
}
```

Why safe?

Because:

* `it.remove()` updates both

  * modCount
  * expectedModCount
* So no mismatch

---

### 🔥 Java 8+ Best Way

Use:

```java
list.removeIf(val -> val % 2 == 0);
```

Internally safe.

---

### 🧠 Interview One-Liner

> To safely remove elements while iterating, use `Iterator.remove()` or `removeIf()`. Modifying the collection directly during iteration causes ConcurrentModificationException.

---

### 🚀 Now Important Question

Are HashMap iterators fail-fast?

Example:

```java
for (String key : map.keySet()) {
    map.remove(key);
}
```

Will this throw exception?

✅ **Yes, it will throw `ConcurrentModificationException`** (in normal HashMap).

---

### Why?

`HashMap` iterators are also **fail-fast**, just like ArrayList.

When you iterate:

```java
for (String key : map.keySet())
```

Internally it uses an iterator over the keySet view, and HashMap also maintains a modification count (`modCount`).

If you do:

```java
map.remove(key);
```

That’s a **structural modification** while iterating → `modCount` changes → iterator detects mismatch → throws `ConcurrentModificationException`.

---

### ✅ Correct ways to remove while iterating a HashMap

##### 1️⃣ Use iterator.remove()

```java
Iterator<String> it = map.keySet().iterator();
while (it.hasNext()) {
    String key = it.next();
    if (/* condition */) {
        it.remove(); // safe
    }
}
```

##### 2️⃣ Use `removeIf` on entrySet (Java 8+)

```java
map.entrySet().removeIf(e -> /* condition */);
```

---

### 🧠 Interview One-Liner

> HashMap iterators are fail-fast. Modifying the map structurally during iteration (except via iterator.remove()) causes ConcurrentModificationException.

---

### 🔥 Next: TreeSet / TreeMap Core Concept

Before we move there, answer this:

What is the difference between **HashMap** and **TreeMap** in terms of ordering and internal data structure? (2–3 lines)

```text
HashMap not maintain sorting order but TreeMap does. Tree map maintains sorted order (based on natural ordering or Comparator). May be HashMap internally use arrays to store bucket and TreeMap use tree data structure.
```

Now let’s make it interview-perfect.

---

### ✅ Correct Difference: HashMap vs TreeMap

#### 1️⃣ Ordering

##### HashMap

* Does NOT maintain insertion order
* Does NOT maintain sorted order
* Order is unpredictable

##### TreeMap

* Maintains **sorted order**
* Sorting based on:

  * Natural ordering (Comparable)
  * OR custom Comparator

---

#### 2️⃣ Internal Data Structure

##### HashMap

* Uses:

  * Array of buckets
  * LinkedList (before Java 8)
  * Red-Black Tree (if bucket size ≥ 8)

So it's primarily **hash-based**.

---

##### TreeMap

* Uses **Red-Black Tree**
* Self-balancing binary search tree
* All operations O(log n)

---

### 🔥 Time Complexity Comparison

| Operation | HashMap      | TreeMap  |
| --------- | ------------ | -------- |
| get()     | O(1) average | O(log n) |
| put()     | O(1) average | O(log n) |
| remove()  | O(1) average | O(log n) |
| Ordering  | No           | Sorted   |

---

### 🧠 Interview One-Liner

> HashMap is hash-based and provides O(1) average time complexity without ordering guarantees. TreeMap is a Red-Black Tree that maintains sorted order with O(log n) operations.

---

### 🚀 Now Important Concept

TreeMap requires keys to be:

1️⃣ Comparable
OR
2️⃣ Provided with Comparator

Why?

What happens if keys are not comparable?

Correct answer:

👉 It will throw **ClassCastException at runtime**.

---

### Why?

TreeMap uses a **Red-Black Tree**.

To insert a key, it must compare keys:

Either using:

```java
Comparable.compareTo()
```

OR

```java
Comparator.compare()
```

If keys are not comparable, TreeMap cannot determine:

* left child
* right child

So it fails during insertion.

---

### Example

```java
class Person {
    int id;
}

TreeMap<Person, String> map = new TreeMap<>();
map.put(new Person(), "A");
```

This will throw:

```
java.lang.ClassCastException
```

Because Person does not implement Comparable and no Comparator provided.

---

### 🧠 Interview One-Liner

> TreeMap requires keys to be comparable. If keys are not comparable and no Comparator is provided, it throws ClassCastException at runtime.

---

### 🔥 Now Deep Question

What is difference between:

1️⃣ Comparable
2️⃣ Comparator

Explain in 3–4 lines.
This is very common interview question.

```text
Comparable: It is a interface provide a compare method to decide natural sort order.
Comparator you can use explicity to sort the collection.
```

Now let’s make it **interview-perfect + deeper**.

---

### ✅ Comparable vs Comparator (Deep + Interview Ready)

#### 1️⃣ Comparable

* Package: `java.lang`
* Method:

```java
int compareTo(T o);
```

* Defines **natural ordering**
* Class itself implements it
* Only **one natural order** possible

Example:

```java
class Person implements Comparable<Person> {
    int age;

    public int compareTo(Person p) {
        return this.age - p.age;
    }
}
```

Now:

```java
Collections.sort(list);
```

Uses compareTo()

---

#### 2️⃣ Comparator

* Package: `java.util`
* Method:

```java
int compare(T o1, T o2);
```

* Used for **custom ordering**
* Separate class or lambda
* Multiple sorting strategies possible

Example:

```java
Comparator<Person> byName = (p1, p2) -> p1.name.compareTo(p2.name);
Collections.sort(list, byName);
```

---

### 🔥 Key Differences Table

| Feature          | Comparable  | Comparator     |
| ---------------- | ----------- | -------------- |
| Package          | java.lang   | java.util      |
| Method           | compareTo() | compare()      |
| Defined in       | Same class  | Separate class |
| Natural order    | Yes         | No             |
| Multiple sorting | ❌ Only one  | ✅ Multiple     |

---

### 🧠 Interview One-Liner

> Comparable defines the natural ordering of objects within the class, while Comparator defines custom ordering externally and allows multiple sorting strategies.

---

### 🚀 Now Important Edge Case

If compareTo() returns 0, what does that mean in:

1️⃣ TreeSet
2️⃣ TreeMap

Think carefully — this is important.

Correct answer:

If `compareTo()` returns **0**, it means:

> The two objects are considered equal in terms of ordering.

And in **TreeSet / TreeMap**, that means:

👉 The second element will NOT be inserted.

---

### 🔥 Why?

TreeSet and TreeMap use:

* `compareTo()` (or Comparator)
* NOT `equals()` to determine uniqueness

So if:

```java
obj1.compareTo(obj2) == 0
```

TreeSet treats them as duplicates — even if `equals()` returns false.

---

### Example

```java
class Person implements Comparable<Person> {
    int age;
    String name;

    public int compareTo(Person p) {
        return this.age - p.age;  // only age considered
    }
}
```

Now:

```java
TreeSet<Person> set = new TreeSet<>();

set.add(new Person(25, "A"));
set.add(new Person(25, "B"));
```

Since compareTo returns 0 (same age):

Second object is NOT added.

Even though names differ.

---

### 🧠 Critical Interview Rule

> In TreeSet and TreeMap, uniqueness is determined by compareTo() (or Comparator), not equals().

---

### 🚀 Now Deep Question

If equals() says two objects are equal,
but compareTo() does NOT return 0,

what happens in TreeSet?

✅ Answer:

If:

* `equals()` returns **true**
* but `compareTo()` does **NOT return 0**

👉 **Both objects will be inserted into TreeSet.**

---

### 🔥 Why?

Because:

TreeSet uses:

```text
compareTo() OR Comparator
```

to determine:

* Order
* Uniqueness

It does NOT use `equals()` to prevent duplicates.

So if:

```java
obj1.equals(obj2) == true
```

But:

```java
obj1.compareTo(obj2) != 0
```

TreeSet thinks they are different.

---

### 🚨 Important Rule (Very Important for Interviews)

For sorted collections:

> compareTo() returning 0 defines equality, not equals().

---

### 🔥 Why This Is Dangerous?

Because this violates the general contract:

Java recommends:

```text
if a.equals(b) == true
then a.compareTo(b) should return 0
```

If not:

* You may get inconsistent behavior
* Collections behave unexpectedly

---

### 🧠 Interview One-Liner

> In TreeSet and TreeMap, equality is determined by compareTo() or Comparator. If compareTo() is inconsistent with equals(), it may allow logical duplicates.

---

### 🚀 We Have Covered:

* ArrayList internals
* LinkedList internals
* HashSet internals
* HashMap internals
* Resize logic
* Treeification
* Fail-fast
* Null behavior
* TreeMap internals
* Comparable vs Comparator
* Uniqueness rules

You are now at strong intermediate-to-senior level on Collections.

---
