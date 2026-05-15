# Object Methods: toString, getClass, and clone

## Definition

Every Java class inherits common methods from `Object`, including `toString()`, `getClass()`, and `clone()`.

## Why It Matters

These methods appear in debugging, logging, equality checks, reflection, and copy-related interview questions.

## Core Example

Overriding `toString()` makes logs and printed objects readable instead of showing class name plus hash-like text.

## Common Traps

- Default `toString()` is usually not useful for business output.
- `getClass()` returns the runtime class.
- `clone()` is tricky and often avoided.
- Shallow copy and deep copy are different.
- Cloneable does not define a public clone method.

## Interview Answer

Java objects inherit methods from `Object`. `toString()` gives a string representation and is commonly overridden for readable output. `getClass()` returns runtime class information. `clone()` can copy objects but is tricky because default cloning is shallow, so many codebases prefer copy constructors or factory methods.

## Quick Revision

- All classes extend Object directly or indirectly.
- Override toString for readable logs.
- getClass returns runtime class.
- clone creates shallow copy by default.
- Deep copy must copy nested objects.
- Prefer clear copy methods over clone in many designs.

## Deep Dive

Now we move to **Object Class Methods**.

These are extremely common interview topics:

```
equals()
hashCode()
toString()
clone()
getClass()
```

Most interview questions come from:

```
equals()
hashCode()
toString()
```

You already understand **equals + hashCode**, so let's finish OOP with:

### `toString()` Method

---

### What is `toString()` ?

Every class in Java inherits from:

```
java.lang.Object
```

Inside `Object` class there is:

```java
public String toString()
```

Default implementation looks like:

```
ClassName@HexHashCode
```

---

### Example

```java
class Person {
    String name = "Vishu";
}

public class Test {

    public static void main(String[] args) {

        Person p = new Person();
        System.out.println(p);
    }
}
```

---

### Output

Example output:

```
Person@4a54c0de
```

Why?

Because internally Java calls:

```java
p.toString()
```

---

### Default `toString()` Implementation

Inside Object class:

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

So output becomes:

```
ClassName@HashCode
```

---

### Overriding `toString()`

Usually we override it to print meaningful data.

Example:

```java
class Person {

    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() {
        return name + " " + age;
    }
}
```

Usage:

```java
Person p = new Person("Vishu", 30);
System.out.println(p);
```

Output:

```
Vishu 30
```

---

### Interview Question

Why override `toString()`?

Answer:

```
To provide a meaningful string representation of an object.
```

Very useful for:

```
logging
debugging
printing objects
```

---

### Example in Collections

```java
List<Person> list = new ArrayList<>();

list.add(new Person("Vishu",30));

System.out.println(list);
```

If `toString()` is overridden:

```
[Vishu 30]
```

Otherwise:

```
[Person@15db9742]
```

---

### Another Important Object Method

### `getClass()`

Example:

```java
Person p = new Person();

System.out.println(p.getClass());
```

Output:

```
class Person
```

---

### One More Important OOP Topic

Before finishing OOP, we should cover:

### `clone()` Method

This is sometimes asked in interviews.

Example:

```java
class Person implements Cloneable {

    int age = 30;

    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

Usage:

```java
Person p1 = new Person();
Person p2 = (Person) p1.clone();
```

Now:

```
p1 ≠ p2
```

But they contain **same data**.

---

### Interview Trap

Difference between:

```
Shallow Copy
Deep Copy
```

Example:

```
clone() → shallow copy by default
```

---

### Shallow Copy Example

```java
class Person {
    Address address;
}
```

If we clone:

```
Person cloned
```

Both objects share same:

```
Address reference
```

---

### Deep Copy

Deep copy creates **completely independent objects**.

Example:

```
clone Person
clone Address
```

Now:

```
No shared references
```

---

### OOP Interview Summary

You can answer like this if interviewer asks **Explain OOP in Java**:

```
Java follows four main OOP principles:

Encapsulation – binding data and methods together and controlling access using access modifiers.

Inheritance – allowing one class to acquire properties and behavior of another class for code reuse.

Polymorphism – allowing the same method name to have multiple behaviors using method overloading and overriding.

Abstraction – hiding internal implementation and exposing only necessary functionality using abstract classes and interfaces.
```

---

### Your OOP Knowledge Now Covers

You understand:

```
Encapsulation
Inheritance
Polymorphism
Abstraction
Method Overriding rules
Dynamic method dispatch
super vs this
Constructor chaining
equals vs hashCode
HashSet behavior
toString
clone basics
```

This is **very solid OOP knowledge for interviews**.

---

### Now the Next Best Topic

For backend interviews the **most logical next topic** is:

```
Java Concurrency (Deep)
```

Because interviews ask things like:

```
synchronized
volatile
deadlock
thread pool
race condition
Java Memory Model
```

---

If you want, I can start with **Java Concurrency Deep Dive** including:

```
Thread vs Runnable
Thread lifecycle
synchronized
volatile
happens-before rule
deadlock
thread pool
ExecutorService
ConcurrentHashMap
```

These are **very frequently asked in Java interviews**.
