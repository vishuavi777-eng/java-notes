# Garbage Collection (GC)

## Definition

Garbage Collection is the JVM process that removes unreachable objects from heap memory.

## Why It Matters

GC helps you explain memory cleanup, heap usage, memory leaks, object reachability, and why Java does not require manual memory free calls.

## Core Example

If `Person p = new Person();` is followed by `p = null;`, the object may become eligible for GC if no other reference can reach it.

## Common Traps

- Eligible for GC does not mean immediately collected.
- `System.gc()` does not guarantee immediate collection.
- Circular references can be collected if they are unreachable.
- Java can still have memory leaks when unused objects remain reachable.
- `finalize()` is not a reliable cleanup mechanism.

## Interview Answer

Garbage Collection automatically clears unreachable objects from heap memory. The JVM starts from GC roots and checks which objects are reachable. Objects that cannot be reached become eligible for collection. The exact time of collection is decided by the JVM.

## Quick Revision

- GC works on heap objects.
- Reachable objects are kept.
- Unreachable objects are eligible for GC.
- GC timing is not guaranteed.
- GC roots decide reachability.
- Memory leaks can still happen in Java.

## Deep Dive

This is one of the most asked topics in backend interviews.

---

### 1. What is Garbage Collection?

Garbage Collection means:

```text
JVM automatically removes unreachable objects
from heap memory.
```

In C/C++ developer manually frees memory.

In Java:

```text
JVM handles memory cleanup automatically
```

That is why Java is easier and safer than manual-memory languages.

---

### 2. What is Garbage?

An object becomes garbage when it is **no longer reachable**.

Example:

```java
Person p = new Person();
p = null;
```

Now the first object has no reference.

So it becomes **eligible for garbage collection**.

Important interview word:

```text
Eligible for GC
```

Not:

```text
Immediately removed
```

Because GC timing is not guaranteed.

---

### 3. Important Interview Trap

#### Does `p = null` destroy object immediately?

**No.**

It only makes the object **eligible for GC**.

Actual cleanup depends on JVM.

---

### 4. How JVM Knows an Object is Garbage

JVM starts from **GC Roots**.

If object is reachable from GC roots, it stays alive.

If not reachable, it can be collected.

---

### 5. What are GC Roots?

Common GC roots:

* local variables in stack
* active thread references
* static references
* JNI/native references

Example:

```java
public static void main(String[] args) {
    Person p = new Person();
}
```

Here `p` is in stack frame, so object is reachable.

---

### 6. Reachability Example

```java
Person p1 = new Person();
Person p2 = p1;
p1 = null;
```

Is object garbage?

**No**

Because `p2` still points to it.

---

Another example:

```java
Person p1 = new Person();
Person p2 = p1;
p1 = null;
p2 = null;
```

Now object becomes **eligible for GC**.

---

### 7. Heap Generations

This is very important.

Heap is divided mainly into:

```text
Young Generation
Old Generation
```

Young Generation further contains:

```text
Eden
Survivor 0
Survivor 1
```

Diagram:

```text
Heap
------------------------------------------------
Young Generation
   Eden | S0 | S1

Old Generation
------------------------------------------------
```

---

### 8. Why Heap is Divided

Because most objects die young.

Examples:

* temporary loop objects
* request-scoped objects
* short-lived StringBuilder
* local collections

So JVM optimizes GC using this rule.

This is called:

```text
Generational Garbage Collection
```

---

### 9. Object Life Cycle in Heap

When object is created:

```java
new Person()
```

it usually goes to:

```text
Eden space
```

If it survives a GC cycle:

```text
Eden → Survivor
```

If it survives many cycles:

```text
Survivor → Old Generation
```

Flow:

```text
Eden → Survivor → Old
```

---

### 10. Types of GC

#### Minor GC

Cleans **Young Generation**.

Usually fast.

#### Major GC

Cleans **Old Generation**.

Usually slower.

#### Full GC

Cleans whole heap.

Very expensive.

---

### 11. Interview Trap

#### Are Major GC and Full GC always exactly same?

In many interview discussions people use them loosely, but technically they are **not always strictly identical** depending on JVM implementation.

Safe interview answer:

```text
Minor GC → Young generation
Major GC → Old generation
Full GC → Entire heap
```

---

### 12. Example of Minor GC Flow

Suppose Eden becomes full.

JVM runs **Minor GC**.

* dead objects removed
* live objects moved to Survivor
* objects surviving multiple rounds may move to Old Gen

---

### 13. Example

```java
for (int i = 0; i < 100000; i++) {
    String s = new String("abc");
}
```

Most of these objects are temporary.

They die quickly.

So they are cleaned from **Young Generation**.

---

### 14. When Does Object Move to Old Generation?

If object survives multiple GC cycles, JVM promotes it.

Example long-living objects:

* cache objects
* singleton-held objects
* session-like long-lived structures
* static referenced objects

These often end up in **Old Generation**.

---

### 15. Common Interview Trap

#### Are all objects directly created in Old Generation?

**No.**

Usually they are created in:

```text
Young Generation → Eden
```

That is the expected interview answer.

---

### 16. Can GC Collect an Object Having Circular References?

Yes.

Example:

```java
class A { B b; }
class B { A a; }

A a = new A();
B b = new B();
a.b = b;
b.a = a;

a = null;
b = null;
```

Now both objects reference each other.

But if no GC root points to them, JVM can still collect them.

Important point:

```text
Java GC is based on reachability,
not simple reference counting
```

This is a very common interview question.

---

### 17. `System.gc()` Interview Trap

Question:

#### Does `System.gc()` guarantee GC?

**No.**

It is only a **request/suggestion** to JVM.

JVM may ignore it.

---

### 18. `finalize()` Interview Trap

Old interview question:

```java
protected void finalize() throws Throwable { }
```

Important:

* not guaranteed to run on time
* not guaranteed to run at all before program exits
* deprecated and should be avoided

So in modern interviews:

```text
Do not rely on finalize() for cleanup
```

Use:

* try-with-resources
* AutoCloseable
* explicit cleanup

---

### 19. Can an Object Be Resurrected in `finalize()`?

Theoretically yes, old-school trick:

```java
class Test {
    static Test saved;

    protected void finalize() {
        saved = this;
    }
}
```

But this is bad practice and deprecated behavior territory.

Mention it only if interviewer asks deep JVM traps.

---

### 20. Interview Question

#### Is an object with reference `null` always garbage?

Not necessarily.

Example:

```java
Person p1 = new Person();
Person p2 = p1;
p1 = null;
```

Here `p1` is null, but object is still alive because `p2` points to it.

---

### 21. Memory Leak in Java?

People think Java has no memory leak because of GC.

Wrong.

Java can still have memory leaks if objects remain reachable unintentionally.

Example:

* static collections growing forever
* cache without eviction
* listeners not removed
* ThreadLocal misuse

GC removes only unreachable objects.

If your code still references them, GC cannot help.

---

### 22. Interview Questions with Answers

#### Q1. How does JVM decide an object is garbage?

By checking reachability from **GC roots**.

#### Q2. Difference between Minor GC and Full GC?

Minor GC cleans Young Gen; Full GC cleans whole heap.

#### Q3. Does setting reference to null force GC?

No, it only makes object eligible.

#### Q4. Can circularly referenced objects be garbage collected?

Yes, if unreachable from GC roots.

#### Q5. Does Java prevent memory leaks completely?

No.

---

### 23. Very Important GC Trap

Look at this:

```java
public class Test {
    static List<byte[]> list = new ArrayList<>();

    public static void main(String[] args) {
        while (true) {
            list.add(new byte[1024 * 1024]);
        }
    }
}
```

What happens?

Answer:

* objects are stored in heap
* `list` is static, so reachable from GC root
* objects cannot be collected
* eventually **OutOfMemoryError**

This is a classic Java memory leak style interview example.

---

### 24. One More Important Difference

#### Stack memory cleanup vs Heap cleanup

Stack variables are removed automatically when method ends.

Heap objects are removed by GC only when unreachable.

---

### 25. Quick Summary

```text
GC removes unreachable heap objects
New objects usually start in Eden
Minor GC → Young Gen
Major GC → Old Gen
Full GC → entire heap
System.gc() is not guaranteed
Java can still have memory leaks
Circular references can still be collected
```

---

### Mini Interview Quiz

Answer these:

##### 1

What is the difference between:

* eligible for GC
* garbage collected

##### 2

Why can Java still have memory leaks even with GC?

##### 3

Why can circular references still be collected in Java?

After that I will teach the next deep topic:
