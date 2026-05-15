# equals, hashCode, and Identity

## Definition

`==` checks reference identity for objects. `equals()` checks logical equality when properly overridden. `hashCode()` supports hash-based collections.

## Why It Matters

This topic is critical for HashMap, HashSet, object comparison, and many Java interview questions.

## Core Example

Two different `Employee` objects with the same id can be logically equal if `equals()` compares the id.

## Common Traps

- `==` and `equals()` are different for objects.
- If two objects are equal, they must have the same hashCode.
- Overriding equals without hashCode breaks hash collections.
- Mutable fields in equals/hashCode can break HashSet and HashMap.
- String overrides equals to compare content.

## Interview Answer

`==` compares whether two object references point to the same object. `equals()` can be overridden to compare business equality. `hashCode()` must be consistent with `equals()` because hash-based collections use hashCode to find buckets and equals to confirm equality.

## Quick Revision

- `==` checks reference identity.
- `equals()` checks logical equality when overridden.
- Equal objects must have equal hash codes.
- HashSet and HashMap depend on this contract.
- String compares content with equals.
- Avoid mutable equality keys.

## Deep Dive

Now the next most important interview area is:

### `equals()`, `==`, `hashCode()`, `toString()`

This is asked very frequently because it checks whether you really understand:

* object comparison
* collections behavior
* HashMap / HashSet basics
* Object class methods

Let’s start with the most common one.

---

### `==` vs `equals()`

#### `==`

For objects:

```text
Compares references (address-like identity)
```

Example:

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1 == s2);
```

Output:

```java
false
```

Because both are different objects.

---

#### `equals()`

```text
Compares content or logical equality
```

Example:

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1.equals(s2));
```

Output:

```java
true
```

Because content is same.

---

### Important Trap

For custom classes:

```java
class Person {
    String name;
}
```

```java
Person p1 = new Person();
p1.name = "Vishu";

Person p2 = new Person();
p2.name = "Vishu";

System.out.println(p1.equals(p2));
```

What will be the output **if we do not override `equals()`**?

##### Output

```
false
```

---

### Why?

Because we **did not override `equals()`**.

So Java uses the default implementation from:

```
java.lang.Object
```

Default `equals()` implementation is basically:

```java
return (this == obj);
```

So it compares **references**, not object content.

---

### Memory Concept

```
Stack
-----
p1 → Person Object A
p2 → Person Object B

Heap
-----
Person Object A
   name = "Vishu"

Person Object B
   name = "Vishu"
```

Even though the values are same, the **objects are different**.

So:

```
p1.equals(p2) → false
```

---

### Correct Way: Override `equals()`

Example:

```java
class Person {

    String name;

    public boolean equals(Object obj) {

        if (this == obj)
            return true;

        if (obj == null || getClass() != obj.getClass())
            return false;

        Person p = (Person) obj;

        return name.equals(p.name);
    }
}
```

Now:

```java
Person p1 = new Person();
p1.name = "Vishu";

Person p2 = new Person();
p2.name = "Vishu";

System.out.println(p1.equals(p2));
```

Output:

```
true
```

Because now comparison is based on **content**.

---

### Interview Tip

When interviewer asks:

**Why override equals()?**

Answer:

```
To compare logical equality of objects instead of reference equality.
```

---

### Very Important Rule

Whenever you override:

```
equals()
```

you **must also override**:

```
hashCode()
```

Otherwise collections like:

```
HashMap
HashSet
```

will behave incorrectly.

We will cover this next.

---

### Next Famous Interview Question

Predict output:

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

HashSet<Person> set = new HashSet<>();

set.add(new Person("Vishu"));
set.add(new Person("Vishu"));

System.out.println(set.size());
```

What will print?

```
1
or
2
```

Explain **why**.

##### Output

```
2
```

> Because **HashSet uses `hashCode()` and `equals()` to determine object uniqueness and bucket placement**.
> Here both objects are **not considered equal**, so both will be stored in the set.

### Why?

We did **not override**:

```
equals()
hashCode()
```

So the default implementations from `Object` are used.

Default behavior:

```
equals() → reference comparison
hashCode() → memory-based hash
```

---

### What Happens Internally in HashSet

When you add an object:

```
HashSet → internally uses HashMap
```

Each object is stored as:

```
key → object
value → dummy value
```

---

### Step 1 — First Object

```
new Person("Vishu")
```

HashSet computes:

```
hashCode()
```

A bucket is selected.

Object stored.

---

### Step 2 — Second Object

```
new Person("Vishu")
```

Another object is created.

Even though name is same:

```
Different object
Different reference
Different hashCode()
```

So HashSet thinks:

```
This is a new unique element
```

Thus it stores it.

---

### Result

```
set.size() → 2
```

---

### Important Interview Rule

For HashSet to detect duplicates:

```
hashCode() must be same
AND
equals() must return true
```

Both conditions must hold.

---

### Correct Implementation

```java
class Person {

    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) return true;
        if (!(obj instanceof Person)) return false;

        Person p = (Person) obj;
        return name.equals(p.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
```

Now:

```java
set.add(new Person("Vishu"));
set.add(new Person("Vishu"));
```

Result:

```
set.size() → 1
```

---

### Important Interview Contract

Java rule:

```
If two objects are equal according to equals(),
they must have the same hashCode().
```

But the reverse is **not required**.

Meaning:

```
Same hashCode ≠ objects must be equal
```

---

### Famous Interview Trap

Look at this code:

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    public boolean equals(Object obj) {
        Person p = (Person) obj;
        return name.equals(p.name);
    }
}
```

Here we override:

```
equals()
```

but **not**:

```
hashCode()
```

Now this code:

```java
HashSet<Person> set = new HashSet<>();

set.add(new Person("Vishu"));
set.add(new Person("Vishu"));

System.out.println(set.size());
```

##### What will print?

```
1
or
2
```

This is one of the **most famous Java interview questions**.

### Output

```
2
```

> It will print **2**.

### Why?

We **overrode `equals()`**, but we **did not override `hashCode()`**.

HashSet works in **two steps**:

```
Step 1 → hashCode() decides bucket
Step 2 → equals() checks duplicate inside bucket
```

---

### What Happens Internally

##### First Object

```
new Person("Vishu")
```

JVM calls:

```
hashCode()
```

Since we did not override it, `Object.hashCode()` is used.

A bucket is chosen.

Object is stored.

---

##### Second Object

```
new Person("Vishu")
```

JVM calls:

```
hashCode()
```

Again default hashCode().

But this object is a **different object**, so it usually produces a **different hashCode**.

Therefore:

```
Different bucket
```

Because buckets are different:

```
equals() is never called
```

So HashSet stores it.

---

### Result

```
set.size() → 2
```

---

### Important Interview Rule

Always remember this:

```
If equals() is overridden,
hashCode() must also be overridden.
```

Otherwise collections like:

```
HashSet
HashMap
HashTable
```

will behave incorrectly.

---

### Interview Contract (Very Important)

Java rule:

```
If two objects are equal according to equals(),
they must have the same hashCode().
```

But the reverse is not required.

Meaning:

```
Same hashCode does not guarantee equality.
```

---

### Correct Implementation

```java
class Person {

    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) return true;

        if (!(obj instanceof Person)) return false;

        Person p = (Person) obj;

        return name.equals(p.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
```

Now:

```
set.size() → 1
```

because both objects are considered equal.

---

### Interview Summary Notes (Important)

You can answer like this:

```
HashSet first uses hashCode() to determine the bucket.
If two objects fall into the same bucket, equals() is used to check logical equality.
Therefore when overriding equals(), we must also override hashCode() to maintain the contract.
```

---

### Very Famous Interview Question (Final Trap)

Predict output:

```java
String a = "Java";
String b = "Java";
String c = new String("Java");

System.out.println(a == b);
System.out.println(a == c);
System.out.println(a.equals(c));
```

##### What will print? Explain **why**.

##### Answer:

> `a == b` → **true**
> `a == c` → **false**
> `a.equals(c)` → **true**

Now let’s explain it **the way interviewers expect**.

---

### Step 1 — `"Java"` literal

```java
String a = "Java";
```

JVM checks the **String Pool**.

If `"Java"` is not present → create it.

Memory:

```
String Pool
-----------
"Java"
```

Then:

```
a → "Java"
```

---

### Step 2 — second literal

```java
String b = "Java";
```

JVM checks the pool again.

Since `"Java"` already exists:

```
b → same pool object
```

Memory:

```
a → "Java"
b → "Java"
```

---

### First Output

```java
a == b
```

`==` compares **references**.

Both references point to the **same pool object**.

```
true
```

---

### Step 3 — `new String("Java")`

```java
String c = new String("Java");
```

Two things happen:

1️⃣ `"Java"` literal exists in the pool
2️⃣ JVM creates **a new String object in heap**

Memory:

```
Stack
-----
a → pool "Java"
b → pool "Java"
c → heap "Java"

Heap
-----
String("Java")

String Pool
-----------
"Java"
```

---

### Second Output

```java
a == c
```

Reference comparison.

```
pool object ≠ heap object
```

So:

```
false
```

---

### Third Output

```java
a.equals(c)
```

`equals()` compares **content**, not reference.

Both contain:

```
"Java"
```

So:

```
true
```

---

### Important Interview Summary

| Expression | What it compares |
| ---------- | ---------------- |
| `==`       | reference        |
| `equals()` | content          |

---

