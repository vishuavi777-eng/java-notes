# ArrayList Internals

## Definition

ArrayList is a resizable array implementation of the `List` interface.

## Why It Matters

ArrayList is very common in Java code, and interviews often ask about capacity, resizing, random access, and time complexity.

## Core Example

When an ArrayList becomes full, it creates a larger internal array and copies existing elements into it.

## Common Traps

- Size and capacity are different.
- Default capacity is not the same as current size.
- Adding is amortized O(1), not always O(1).
- Insertion in the middle can be O(n).
- Removing from the middle shifts elements.

## Interview Answer

ArrayList stores elements in an internal array. It gives fast random access because indexing is direct. When the internal array becomes full, ArrayList grows by creating a larger array and copying old elements. This makes normal append operations amortized O(1), while insertions or removals in the middle are O(n).

## Quick Revision

- Backed by an array.
- Fast random access.
- Maintains insertion order.
- Allows duplicates.
- Resizes when capacity is full.
- Middle insert/remove can shift elements.

## Deep Dive

This is very important.

---

### 🔹 What is ArrayList?

ArrayList is:

* Resizable array implementation
* Maintains insertion order
* Allows duplicates
* Allows null
* Not synchronized

---

### 🔥 Internal Structure

Internally:

```java
transient Object[] elementData;
int size;
```

It uses:

* A dynamic array

---

### 🔥 Default Capacity

In Java 8+:

```java
new ArrayList<>();
```

Initially:

* elementData is empty array (size 0)
* First add → capacity becomes 10

Old Java versions:

* Initial capacity 10 immediately

---

### 🔥 Resizing Formula

When capacity exceeded:

```
newCapacity = oldCapacity + (oldCapacity >> 1)
```

That means:

* 10 → 15
* 15 → 22
* 22 → 33
  (1.5x growth)

---

### 🔥 Time Complexity

| Operation     | Time           |
| ------------- | -------------- |
| get(index)    | O(1)           |
| add() at end  | O(1) amortized |
| add(index)    | O(n)           |
| remove(index) | O(n)           |
| contains()    | O(n)           |

---

### 🔥 Now Deep Interview Question

Why is add() amortized O(1) and not O(1) always?

```text
> When the array becomes full, a new array is created with larger capacity and elements are copied. That is the reason.
```

Now let’s refine this into a **perfect interview answer**.

---

### ✅ Why is `add()` amortized O(1)?

ArrayList uses a dynamic array.

Most of the time:

```java
list.add(element);
```

* Just places element at `elementData[size]`
* Increments size
* Takes **O(1)**

But when the internal array is full:

1️⃣ A new larger array is created
2️⃣ All existing elements are copied
3️⃣ Then the new element is added

Copying takes **O(n)** time.

---

### 🧠 Why still called amortized O(1)?

Because resizing does not happen on every insert.

Example growth:

```
10 → 15 → 22 → 33 → ...
```

Resizing happens rarely.

If you insert 1000 elements:

* Only ~log(n) resizes
* Most inserts are O(1)

So average per insertion cost becomes constant.

That is called:

> Amortized O(1)

---

### 🔥 Deep Insight (Senior-Level)

Total cost of inserting n elements:

```
O(1 + 2 + 4 + 8 + ... + n) ≈ O(n)
```

Divide by n operations → average = O(1)

---

### 🔥 Now Important Trap

Predict behavior:

```java
ArrayList<Integer> list = new ArrayList<>(2);
list.add(1);
list.add(2);
list.add(3);

System.out.println(list.size());
```

What prints?

Also:
What was the capacity after adding 3rd element?


---

### 1️⃣ Size

```java
System.out.println(list.size());
```

You added 3 elements.

So:

```
3
```

Correct.

---

### 2️⃣ Capacity After Adding 3rd Element

Initial:

```java
new ArrayList<>(2);
```

So:

* capacity = 2

After:

* add(1) → size = 1
* add(2) → size = 2 (full now)

When you add 3rd element:

Capacity growth formula in Java 8+:

```
newCapacity = oldCapacity + (oldCapacity >> 1)
```

For capacity = 2:

```
oldCapacity = 2
oldCapacity >> 1 = 1
newCapacity = 2 + 1 = 3
```

So new capacity becomes:

```
3
```

But here is the important part:

⚠ In some older explanations people assume doubling (like 2 → 4).
But Java uses 1.5x growth, not 2x.

---

### 🔥 Important Interview Insight

ArrayList growth:

```
newCapacity = oldCapacity + (oldCapacity >> 1)
```

Which is:

```
≈ 1.5 times growth
```

---

### 🚀 Now Slightly Harder Question

Suppose:

```java
ArrayList<Integer> list = new ArrayList<>();
```

You add first element.

What is capacity after first add?

Is it:

1. 0
2. 1
3. 10
4. 16

Think carefully — this is version-dependent but important for interviews.

✅ Answer — the answer is **10** (for Java 8+).

---

### Why?

```java
ArrayList<Integer> list = new ArrayList<>();
```

In Java 8+:

* Initially, `elementData` is an empty array (`DEFAULTCAPACITY_EMPTY_ELEMENTDATA`)
* Capacity is **0**
* No memory allocated for 10 elements yet

When you add the first element:

```java
list.add(1);
```

Then Java expands capacity to:

```
DEFAULT_CAPACITY = 10
```

So after first add:

* size = 1
* capacity = 10

---

### Important Deep Detail (Interview Bonus)

In older Java versions (before Java 8):

* `new ArrayList<>()` immediately created array of size 10.

In Java 8+:

* It lazily allocates capacity 10 only when first element is added.

This was done to save memory.

---

### 🔥 Now Harder Question

What happens here?

```java
ArrayList<Integer> list = new ArrayList<>(0);
list.add(1);
```

After adding first element:

* What is capacity?


Correct answer:

👉 Capacity becomes **1**, not 10.

---

### Why?

When you do:

```java
ArrayList<Integer> list = new ArrayList<>(0);
```

This is different from:

```java
new ArrayList<>();
```

In this case:

* You explicitly set initial capacity to **0**
* So `elementData` is created as an array of size 0

Now when you add first element:

```java
list.add(1);
```

Growth logic runs:

Growth formula:

```java
newCapacity = oldCapacity + (oldCapacity >> 1)
```

But oldCapacity = 0

So Java ensures minimum growth to **1**

So capacity becomes:

```
1
```

---

### 🔥 Important Difference

| Constructor        | After first add | Capacity |
| ------------------ | --------------- | -------- |
| new ArrayList<>()  | 10              | 10       |
| new ArrayList<>(0) | 1               | 1        |

This is a favorite interview trap.

---

### 🧠 Why Java behaves like this?

Because:

* Default constructor uses special empty array marker
* Capacity 10 is applied lazily only for default constructor
* But when user explicitly sets capacity (even 0), Java respects that

---

### 🚀 Now Next Deep Question

Predict:

```java
ArrayList<Integer> list = new ArrayList<>(1);
list.add(1);
list.add(2);
```

What is capacity after adding second element?

Correct answer: **2**

But wait — let’s analyze properly and very precisely.

---

### Step-by-step

```java
ArrayList<Integer> list = new ArrayList<>(1);
```

Initial:

* capacity = 1
* size = 0

---

#### After `list.add(1);`

* size = 1
* capacity = 1 (full now)

---

#### Now `list.add(2);`

Capacity is full → resize needed.

Growth formula (Java 8+):

```
newCapacity = oldCapacity + (oldCapacity >> 1)
```

For oldCapacity = 1:

```
1 >> 1 = 0
newCapacity = 1 + 0 = 1
```

But capacity cannot remain 1 because we need space for 2 elements.

So Java ensures minimum required capacity.

It calculates:

```
minCapacity = size + 1 = 2
```

Since computed newCapacity (1) < minCapacity (2),

It sets:

```
newCapacity = minCapacity
```

So final capacity becomes:

```
2
```

---

### Final Answer

Capacity = **2**

---

### 🔥 Important Insight

For small capacities like 0 or 1:

Java ensures minimum required capacity.

So growth sometimes behaves like:

```
0 → 1
1 → 2
```

After that, normal 1.5x growth applies.

---

### 🚀 Now Harder

Predict capacity after this:

```java
ArrayList<Integer> list = new ArrayList<>(2);
list.add(1);
list.add(2);
list.add(3);
list.add(4);
```

What is capacity after adding 4th element?

Here’s the exact dry run:

```java
ArrayList<Integer> list = new ArrayList<>(2); // capacity = 2
list.add(1); // size=1 cap=2
list.add(2); // size=2 cap=2 (full)
list.add(3); // resize: old=2 → new=2+(2>>1)=2+1=3  => cap=3, size=3
list.add(4); // full again, resize: old=3 → new=3+(3>>1)=3+1=4 => cap=4, size=4
```

✅ **Capacity after adding 4th element = 4**

---

Next (quick): if capacity is 4 and you add 5th element, what will capacity become?

✅ Correct — capacity becomes **6**.

Because when oldCapacity = 4:

* growth: `4 + (4 >> 1)` = `4 + 2` = **6**

So adding 5th element triggers resize from **4 → 6**.

---

### ✅ ArrayList Internals Summary (deep, interview-ready)

* Backed by `Object[] elementData`
* `size` tracks actual elements
* Default constructor: capacity becomes **10** on first add (Java 8+ lazy)
* Growth: **1.5x** → `old + old/2`
* `add()` is **amortized O(1)**, worst O(n) during resize
* Insert/remove in middle is O(n) due to shifting

---

