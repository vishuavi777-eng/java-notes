# LinkedList Internals

## Definition

LinkedList is a doubly linked list implementation of `List` and `Deque`.

## Why It Matters

LinkedList questions test whether you understand node-based storage, traversal cost, and when linked structures are useful.

## Core Example

Each node stores data plus links to the previous and next nodes.

## Common Traps

- LinkedList is not faster for every insertion.
- `get(index)` is O(n).
- It uses more memory because each node stores links.
- ArrayList is usually better for random access.
- Iteration over LinkedList can still be efficient, but indexing is not.

## Interview Answer

LinkedList stores elements as nodes connected with previous and next references. It is efficient for adding or removing at the beginning or end when the node position is known. But random access is slow because Java must traverse nodes from the start or end.

## Quick Revision

- Doubly linked list.
- Implements List and Deque.
- Slow random access.
- Good for frequent add/remove at ends.
- Uses extra memory for links.
- ArrayList is usually better for index-based access.

## Deep Dive

#### What is LinkedList?

* Doubly linked list implementation
* Implements: `List` + `Deque`
* Good for frequent add/remove at ends
* Poor for random access

#### Internal Structure (concept)

Each node stores:

* item
* prev reference
* next reference

Operations:

* `addFirst`, `addLast` → O(1)
* `removeFirst`, `removeLast` → O(1)
* `get(index)` → O(n)

---

### 🔥 First LinkedList Trap

Which is faster and why?

1. `ArrayList.get(i)`
2. `LinkedList.get(i)`

Answer in 2 lines.

✅ Correct — **ArrayList.get(i)** is faster.

Now let’s make this answer interview-strong.

---

### Why ArrayList.get(i) is Faster

##### 🔹 ArrayList

* Internally backed by `Object[]`
* Direct index access:

```java
return elementData[index];
```

* Time complexity: **O(1)** (constant time)
* Because memory is contiguous and index-based

---

##### 🔹 LinkedList

Internally:

```text
Node {
    prev
    item
    next
}
```

To get element at index `i`:

* It must traverse nodes
* Either from head or tail (whichever closer)

Time complexity: **O(n)**

Because it must walk through the list.

---

### 🔥 Interview One-Liner

> ArrayList provides O(1) random access because it uses an array, while LinkedList requires traversal, so get(i) is O(n).

---

### 🚀 Now Important LinkedList Trap

Which is faster and why?

1. `ArrayList.add(0, element)`
2. `LinkedList.addFirst(element)`

Answer carefully with reasoning.

```text
LinkedList.addFirst(element) is faster because adding first element in linked list mean just changing root node of list.
ArrayList.add(0, element) required O(n) time complexity to add element because its shift all element to right
```

✅ Perfect. That’s exactly the right reasoning.

Small correction:

* “root node” → “head pointer / first node reference”
* “shift all element” → “shift all elements”

---

### Why (Interview-Perfect)

#### 1️⃣ `LinkedList.addFirst(element)` → **O(1)**

A doubly-linked list just updates pointers:

* newNode.next = oldFirst
* oldFirst.prev = newNode
* head = newNode

No shifting.

---

#### 2️⃣ `ArrayList.add(0, element)` → **O(n)**

ArrayList is backed by an array. Inserting at index 0 requires:

* shift existing elements right by 1
* possible resize too

So it’s linear.

---

### ✅ Next: LinkedList internal working details (Deep)

LinkedList implements both:

* `List` (index-based operations)
* `Deque` (queue/stack operations)

So it supports:

* addFirst/removeFirst (stack/queue)
* addLast/removeLast

---

### 🔥 Now Common Interview Trap

What is time complexity of:

1. `LinkedList.addLast(x)`
2. `LinkedList.removeLast()`
3. `LinkedList.add(index, x)`

Assume Java’s `LinkedList` keeps references to both `first` and `last`.

Answer with Big-O for each.

👍 Correct answers:

1️⃣ `LinkedList.addLast(x)` → **O(1)**
2️⃣ `LinkedList.removeLast()` → **O(1)**
3️⃣ `LinkedList.add(index, x)` → **O(n)**

---

### Why?

#### 1️⃣ addLast(x) → O(1)

LinkedList maintains:

```text
first
last
```

To add at end:

* Create new node
* last.next = newNode
* newNode.prev = last
* last = newNode

No traversal needed.

---

#### 2️⃣ removeLast() → O(1)

Because:

* It already has reference to last
* Just update last = last.prev
* Adjust pointers

No traversal.

---

#### 3️⃣ add(index, x) → O(n) ❌

This is the important correction.

To add at index:

* Must first **find the node at that index**
* LinkedList does NOT have random access
* It traverses from:

  * head (if index < size/2)
  * tail (if index > size/2)

Traversal takes O(n)

After finding position:

* Insert node in O(1)

But total complexity = O(n)

---

### 🔥 Interview Trick

People often think:

> LinkedList insertion is always O(1)

That is only true if:

* You already have reference to the node
* Or adding/removing at head/tail

Index-based operations are O(n).

---

### 🚀 Now Very Important Question

Which is better for:

1️⃣ Frequent random access
2️⃣ Frequent insertions at beginning
3️⃣ Iterating through all elements
4️⃣ Memory efficiency

Answer each with:

* ArrayList or LinkedList
* 1 line reason.

---

### ✅ 1️⃣ Frequent random access

✔ **ArrayList**

Reason:

* Backed by array
* `get(index)` is O(1)
* Direct memory access

Your answer correct.

---

### ✅ 2️⃣ Frequent insertions at beginning

✔ **LinkedList**

Reason:

* Just update head pointer
* O(1)
* No shifting required

Correct again.

---

### ⚠ 3️⃣ Iterating through all elements

You said: “I think both”

Correct answer:
✔ **ArrayList is generally faster**

Reason:

* ArrayList stores elements in contiguous memory
* Better CPU cache locality
* Less pointer chasing

LinkedList:

* Each node separate object
* Pointer traversal
* Poor cache locality
* More GC pressure

So although both are O(n),
👉 ArrayList performs better in real-world iteration.

This is important.

---

### ⚠ 4️⃣ Memory efficiency

You said both are not good — good intuition.

Correct detailed answer:

✔ **ArrayList is more memory efficient**

Why?

ArrayList:

* Just stores Object[] references

LinkedList:
Each node stores:

```
item
prev pointer
next pointer
```

So for every element:

* Extra 2 references
* Plus node object overhead

LinkedList uses much more memory per element.

---

### 🔥 Final Comparison Table (Interview Ready)

| Scenario              | Best Choice        | Why                    |
| --------------------- | ------------------ | ---------------------- |
| Random access         | ArrayList          | O(1) index access      |
| Insert/remove at head | LinkedList         | O(1) pointer update    |
| Iteration             | ArrayList          | Better cache locality  |
| Memory usage          | ArrayList          | No extra node overhead |
| Heavy mid insertions  | LinkedList         | No shifting            |
| Frequent resizing     | Pre-size ArrayList | Avoid growth cost      |

---

