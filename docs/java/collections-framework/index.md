# Collections Framework Overview and Interfaces

## Definition

The Java Collections Framework is a set of interfaces and classes used to store, access, search, sort, and process groups of objects.

## Why It Matters

Collections are used in almost every Java backend application. Interviewers expect clear understanding of interfaces, implementations, performance, and trade-offs.

## Core Example

Use `List` when order matters and duplicates are allowed. Use `Set` when duplicates should not be allowed. Use `Map` when data is stored as key-value pairs.

## Common Traps

- `Map` is part of the Collections Framework but does not extend `Collection`.
- `Collection` and `Collections` are different.
- Choosing an implementation matters for performance.
- Generics give compile-time type safety.
- Iteration behavior can change between implementations.

## Interview Answer

The Collections Framework provides common data structures through interfaces like `List`, `Set`, `Queue`, and `Map`. These interfaces have implementations such as `ArrayList`, `LinkedList`, `HashSet`, `TreeSet`, `HashMap`, and `TreeMap`. We choose the implementation based on ordering, duplicates, lookup speed, insertion cost, and thread-safety needs.

## Quick Revision

- Collection is an interface hierarchy.
- Collections is a utility class.
- List allows duplicates and keeps order.
- Set avoids duplicates.
- Map stores key-value pairs.
- Implementation choice affects performance.

## Deep Dive

We will cover in this order:

#### Phase 1 – Foundation

1. What is Collections Framework?
2. Core Interfaces hierarchy
3. Iterable vs Collection vs Map
4. Why Map is not a Collection

#### Phase 2 – List Internals

5. ArrayList (internal working, resizing, complexity)
6. LinkedList (doubly linked list internals)
7. Vector (legacy + synchronization)
8. Stack (legacy vs modern)

#### Phase 3 – Set Internals

9. HashSet (uses HashMap internally)
10. LinkedHashSet (ordering logic)
11. TreeSet (Red-Black Tree internals)
12. Comparable vs Comparator

#### Phase 4 – Map Internals (Most Important)

13. HashMap internal working (bucket, hashing, collisions)
14. equals() & hashCode() contract
15. Load factor & resizing
16. Java 8 treeification (LinkedList → Tree)
17. LinkedHashMap
18. TreeMap (Red-Black Tree)
19. Hashtable vs HashMap
20. ConcurrentHashMap (basic intro)

#### Phase 5 – Advanced

21. Fail-fast vs Fail-safe
22. ConcurrentModificationException
23. Collections utility class
24. Immutable collections
25. Time complexity table

---

We go step-by-step.
Today we start Phase 1.

---

### 🔹 1️⃣ What is Collections Framework?

It is a unified architecture for storing and manipulating groups of objects.

Before Java 1.2:

* Arrays
* Vector
* Hashtable

After Java 1.2:

* Unified framework introduced

---

### 🔹 2️⃣ Core Interface Hierarchy (VERY IMPORTANT)

```
                 Iterable
                    |
                Collection
               /    |     \
            List   Set    Queue
                             |
                           Deque

Map (separate hierarchy)
```

Important:
👉 Map does NOT extend Collection.

---

### 🔹 3️⃣ Iterable vs Collection

#### Iterable

Contains only:

```java
Iterator<T> iterator();
```

Allows:

```java
for (T item : collection)
```

---

#### Collection

Adds:

* add()
* remove()
* size()
* contains()
* clear()

Collection is parent of:

* List
* Set
* Queue

---

### 🔥 Why Map is NOT part of Collection?

Collection stores:

* Single elements

Map stores:

* Key-value pairs

Map does NOT extend Collection.

Interview question:

> Why Map is not a subtype of Collection?

Answer:

> Because Collection represents a group of individual elements, whereas Map represents key-value mappings.

---

### 🔥 Now Deep Question

Which of these allow duplicates?

1. List
2. Set
3. Map keys
4. Map values

Answer carefully.


Answer carefully:

Which allow duplicates?

1️⃣ List → ✅ Yes
2️⃣ Set → ❌ No
3️⃣ Map keys → ❌ No
4️⃣ Map values → ✅ Yes

---

### Why?

##### 1️⃣ List

* Maintains insertion order
* Allows duplicate elements

Example:

```java
List<Integer> list = new ArrayList<>();
list.add(10);
list.add(10);   // allowed
```

---

##### 2️⃣ Set

* No duplicate elements allowed
* Uses equals() to determine duplicates

---

##### 3️⃣ Map Keys

* Keys must be unique
* Internally uses hashCode() + equals()

If duplicate key inserted:

* Old value gets replaced

---

##### 4️⃣ Map Values

* Values can be duplicate
* No restriction

Example:

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "A");
map.put(2, "A");   // allowed
```

---

### 🔥 Interview Trap

What happens here?

```java
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("A", 2);

System.out.println(map.size());
System.out.println(map.get("A"));
```

👍 Output:

```
size: 1
get: 2
```

---

### Why?

```java
map.put("A", 1);
map.put("A", 2);
```

HashMap rule:

* Keys must be unique.
* If same key inserted again → value is **replaced**.
* No new entry created.

So internally:

* First put → adds entry ("A",1)
* Second put → finds existing key using hashCode + equals
* Replaces value 1 with 2

Final map:

```
"A" → 2
```

---

##### Therefore:

```java
map.size() → 1
map.get("A") → 2
```

---

### 🔥 Very Important Concept (Deep)

When inserting into HashMap:

Steps:

1. Calculate `hashCode()` of key
2. Find bucket index
3. If bucket empty → insert
4. If bucket not empty:

   * Compare keys using `equals()`
   * If equal → replace value
   * Else → collision handling

We will go deep into this next.

---

