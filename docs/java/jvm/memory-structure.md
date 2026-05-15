# JVM MEMORY STRUCTURE

## Definition

JVM memory structure is the way the JVM divides runtime memory into areas like heap, stack, metaspace, PC register, and native method stack.

## Why It Matters

Memory structure helps you explain object creation, method calls, local variables, static data, `StackOverflowError`, and `OutOfMemoryError`.

## Core Example

For `Person p = new Person("Vishu");`, the `Person` object is created in heap, the reference variable `p` is stored in the current stack frame, and the string literal can be stored in the string pool.

## Common Traps

- The reference variable and object are different things.
- Local variables are stored in stack frames.
- Objects are usually stored in heap.
- Static metadata is not stored in the same place as local variables.
- Stack cleanup is automatic when a method ends.

## Interview Answer

The JVM divides memory into multiple runtime areas. The stack stores method frames and local variables for each thread. The heap stores objects. Metaspace stores class metadata. The PC register tracks the current instruction for a thread, and the native method stack supports native calls.

## Quick Revision

- Stack: method calls and local variables.
- Heap: objects.
- Metaspace: class metadata.
- PC register: current instruction.
- Native method stack: native method execution.
- Each thread has its own stack.

## Deep Dive

This includes:

```
Heap
Stack
Metaspace
PC Register
Native Method Stack
```

Understanding this properly will help you answer:

```
StackOverflowError
OutOfMemoryError
Object creation
String pool
Garbage collection
```

---

### Before moving forward, I want to ask you one question (interview style)

When this line executes:

```java
Person p = new Person("Vishu");
```

##### Answer these questions:

1️⃣ Where is **object created**?
2️⃣ Where is **reference variable p stored**?
3️⃣ Where is **"Vishu" string stored**?


##### Answers

**1️⃣ Object created in heap memory**
✔ Correct.

```
Person object → Heap
```

---

**2️⃣ Reference variable stored in function stack memory**

```
Reference variable is stored in the stack frame
of the current method (main method here).
```

So more precise:

```
p → stored in main() stack frame
```

---

**3️⃣ "Vishu" string stored in string pool which is part of heap memory**
✔ Correct for **Java 7+**

Important interview detail:

| Java Version | String Pool Location |
| ------------ | -------------------- |
| Java 6       | PermGen              |
| Java 7+      | Heap                 |

So today:

```
String Pool → inside Heap
```

---

##### Final Memory Layout

When this runs:

```java
Person p = new Person("Vishu");
```

Memory looks like this:

```
Stack (main thread)
-------------------

p  -----------+
              |
              v

Heap
-------------------

Person Object
   name ------> "Vishu"

String Pool
-------------------
"Vishu"
```

---

### Now let's start the **Most Important Topic**

### JVM MEMORY STRUCTURE

This is **asked in almost every Java interview**.

#### JVM Memory Components

JVM has **5 main memory areas**.

```
JVM Memory

1 Program Counter Register (PC)
2 JVM Stack
3 Heap
4 Method Area / Metaspace
5 Native Method Stack
```

Diagram:

```
                JVM MEMORY

           +--------------------+
           |   Method Area      |
           |   (Metaspace)      |
           +--------------------+

           +--------------------+
           |        Heap        |
           |  (Objects live)    |
           +--------------------+

Thread 1           Thread 2
---------          ---------

PC Register        PC Register
Stack              Stack
Native Stack       Native Stack
```

Important rule:

```
Heap → shared by all threads
Stack → each thread has its own stack
```

---

### 1️⃣ JVM Stack

Each **thread gets its own stack**.

Example:

```
Main Thread
Worker Thread
GC Thread
```

Each thread has its own:

```
Stack
```

Inside stack:

```
Stack Frame
```

Example:

```
Stack

| sayHello() frame |
| main() frame     |
```

Stack frame contains:

```
Local variables
Operand stack
Method info
Return address
```

---

##### Stack Interview Questions

**Q1**

What causes

```
StackOverflowError
```

Answer:

```
Too many stack frames
usually caused by recursion
```

Example:

```java
void fun() {
    fun();
}
```

Infinite recursion → stack full.

---

### 2️⃣ Heap Memory

Heap stores:

```
Objects
Arrays
Instance variables
```

Example:

```
new Person()
new String()
new int[100]
```

All go into **Heap**.

Heap is **shared by all threads**.

---

##### Heap Interview Question

**Q**

What causes

```
OutOfMemoryError
```

Answer:

```
Heap memory exhausted
```

Example:

```java
while(true){
   list.add(new Person());
}
```

---

### 3️⃣ Method Area (Metaspace)

Stores:

```
Class metadata
Method metadata
Static variables
Runtime constant pool
```

Example:

```
class structure
method bytecode
static fields
```

Since **Java 8**:

```
PermGen removed
Metaspace introduced
```

Metaspace is stored in:

```
Native memory (outside heap)
```

---

##### Interview Trap

Where are **static variables stored**?

Correct answer:

```
Method Area (Metaspace)
```

But many people incorrectly say **heap**.

---

### 4️⃣ Program Counter (PC Register)

Each thread has its own **PC Register**.

It stores:

```
Address of current instruction
```

Example:

```
Line 5 executing
```

PC register tracks that instruction.

---

### 5️⃣ Native Method Stack

Used for **native methods**.

Example:

```
C / C++ methods
JNI calls
```

Example:

```
System.arraycopy()
```

Some internal functions call native code.

---

### Quick Summary

| Memory Area  | Stores              |
| ------------ | ------------------- |
| Stack        | Method calls        |
| Heap         | Objects             |
| Metaspace    | Class metadata      |
| PC Register  | Current instruction |
| Native Stack | Native calls        |

---

### Interview Trap Question

##### Question

Where are these stored?

```
1 Object
2 Static variable
3 Local variable
4 Method
5 Class metadata
```

Correct answer:

| Item            | Memory    |
| --------------- | --------- |
| Object          | Heap      |
| Static variable | Metaspace |
| Local variable  | Stack     |
| Method          | Metaspace |
| Class metadata  | Metaspace |

---

### Important Interview Scenario

Look at this code.

```java
class Test {

    static int x = 10;

    public static void main(String[] args) {

        int y = 5;

        Test t = new Test();
    }
}
```

##### Where are these stored?

```
x ?
y ?
t ?
Test object ?
```

Try to answer this.

### 1️⃣ `x` — Static Variable

##### Answer:
> x stored in Metaspace.

✔ **Correct for interview understanding**

More precise explanation:

```
Class metadata → Metaspace
Static fields → stored with the class
```

So effectively:

```
Test.class loaded → Method Area / Metaspace
x belongs to Test.class
```

Memory view:

```
Metaspace
---------
Test.class
   static int x = 10
```

---

### 2️⃣ `y` — Local Variable

##### Answer:

> y stored in main function local stack

✔ Correct.

More precise:

```
Stored inside main() stack frame
```

Memory:

```
Stack
-----

main() frame
   y = 5
   t = reference
```

---

### 3️⃣ `t` — Reference Variable

##### Answer:

> t stored as reference variable inside function local stack

✔ Correct.

Stack stores **reference**, not object.

```
Stack
------

main()
   t → reference
```

---

### 4️⃣ `new Test()` — Object

##### Answer:

> Test object stored in heap memory

✔ Correct.

```
Heap
-----

Test object
```

---

### Final Memory Layout

```
                JVM MEMORY
-------------------------------------------------

Metaspace
---------
Test.class
   static int x = 10


Heap
---------
Test Object


Stack (main thread)
---------
main()
   y = 5
   t --------> Test Object
```

---

### 🔴 Interview Trap (Very Common)

Question:

Where are **instance variables stored?**

Example:

```java
class Test {
    int a = 10;
}
```

Correct answer:

```
Inside the object in Heap
```

Memory:

```
Heap
-----

Test Object
   a = 10
```

---

### Another Interview Trap

Where is this stored?

```java
String s = "Hello";
```

Answer:

```
reference s → Stack
"Hello" → String Pool (Heap)
```

---

### Now we go deeper (Important for Senior Interviews)

Next topic is **HEAP ARCHITECTURE**.

Most people only know:

```
Heap → Objects
```

But internally JVM Heap is divided into **generations**.

```
Heap

1 Young Generation
   - Eden
   - Survivor 1
   - Survivor 2

2 Old Generation

3 (Before Java 8)
   Permanent Generation
```

Diagram:

```
Heap
------------------------------------------------

Young Generation
----------------
Eden
Survivor 0
Survivor 1

Old Generation
----------------
Long living objects
```

---

### Why JVM Divides Heap Like This

Because **most objects die very quickly**.

Example:

```
loop variables
temporary objects
StringBuilder
request objects
```

These die in **seconds or milliseconds**.

So JVM uses **Generational Garbage Collection**.

---

### Object Life Cycle

When object is created:

```
new Person()
```

Object goes to:

```
Eden Space
```

---

### GC Flow

```
Eden full
↓
Minor GC
↓
Objects moved to Survivor
↓
Objects survive many GC
↓
Promoted to Old Generation
```

---

### Simplified Flow

```
Eden → Survivor → Old Generation
```

---

### Important Interview Question

##### What is Minor GC?

Answer:

```
Garbage collection in Young Generation
```

---

##### What is Major GC?

```
Garbage collection in Old Generation
```

---

##### What is Full GC?

```
Entire heap cleanup
```

This is **very expensive**.

---

### Very Important Interview Trap

Question:

Where are **new objects created**?

Correct answer:

```
Eden space
```

Many candidates incorrectly say **Heap**.

But interviewer expects:

```
Young Generation → Eden
```

---
