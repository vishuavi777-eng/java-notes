# JVM Internals — Complete Interview Guide

## Roadmap we will follow

1. **What happens when you run a Java program**
2. **JDK vs JRE vs JVM**
3. **ClassLoader System**
4. **JVM Memory Structure**
5. **Heap Memory Deep Dive**
6. **Stack Memory & Stack Frames**
7. **String Pool Internals**
8. **Object Creation in JVM**
9. **Garbage Collection**
10. **Execution Engine**
11. **JIT Compiler**
12. **Common Interview Traps**

---

# What Happens When You Run a Java Program

Suppose we have this program.

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person("Vishu");
        p.sayHello();
    }
}

class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    void sayHello() {
        System.out.println("Hello " + name);
    }
}
```

---

# Step 1 — Compilation

You run

```
javac Main.java
```

Java compiler converts **.java → .class**

```
Main.class
Person.class
```

These **.class files contain bytecode**.

Important:

Java does NOT compile to machine code.

It compiles to **bytecode**.

Example bytecode instruction:

```
aload_0
invokespecial
getfield
invokevirtual
```

This bytecode is **platform independent**.

---

# Step 2 — JVM Starts

When you run

```
java Main
```

JVM starts.

Now JVM performs these steps.

```
1 Load class
2 Verify bytecode
3 Prepare memory
4 Initialize static variables
5 Execute main method
```

---

# Step 3 — ClassLoader loads classes

JVM loads:

```
Main.class
Person.class
System.class
String.class
```

Important:

Java loads classes **on demand (lazy loading)**.

---

# Step 4 — JVM Creates Main Thread

JVM starts **main thread**.

Then it creates **stack memory for that thread**.

```
Main Thread
   |
   |--- Stack
```

---

# Step 5 — main() Stack Frame Created

Inside stack a **stack frame** is created.

```
Stack

| main() frame |
```

Stack frame contains:

```
Local variables
Operand stack
Method data
```

---

# Step 6 — Object Creation

This line executes:

```java
Person p = new Person("Vishu");
```

JVM does:

1 Allocate memory in **Heap**
2 Create object
3 Call constructor
4 Store reference in stack

Memory becomes:

```
Stack                        Heap
-----                        -----
p  ----------->        Person Object
                       name = "Vishu"
```

---

# Step 7 — Method Call

This line executes:

```java
p.sayHello();
```

New stack frame created.

```
Stack

| sayHello() frame |
| main() frame     |
```

---

# Step 8 — Output

```
Hello Vishu
```

---

# Step 9 — Method Ends

`sayHello()` frame removed.

```
Stack

| main() frame |
```

---

# Step 10 — Program Ends

Main frame removed.

Stack becomes empty.

---

# PART 2 — JDK vs JRE vs JVM

This question comes in **almost every Java interview**.

---

# JDK

Java Development Kit

Used for **development**.

Contains:

```
JDK
 ├── JRE
 ├── javac compiler
 ├── debugger
 ├── tools
```

Example tools:

```
javac
javadoc
jar
jdb
```

---

# JRE

Java Runtime Environment

Used to **run Java programs**.

Contains:

```
JRE
 ├── JVM
 └── Java libraries
```

---

# JVM

Java Virtual Machine.

It **runs Java bytecode**.

Responsibilities:

```
Load classes
Verify bytecode
Manage memory
Execute bytecode
Garbage collection
```

---

# Diagram (Important for Interview)

```
Developer
   |
   v
 Java Code (.java)
   |
   v
 Compiler (javac)
   |
   v
 Bytecode (.class)
   |
   v
 JRE
   |
   v
 JVM
   |
   v
 OS / Hardware
```

---

# Common Interview Question

### Why Java is platform independent?

Because:

```
Java → Bytecode
Bytecode → JVM → Machine Code
```

Each OS has its own JVM.

So same `.class` file runs everywhere.

---

# Another Interview Question

### Is JVM platform independent?

Answer:

```
No
```

JVM is **platform dependent**.

Each OS has its own JVM.

But **Java bytecode is platform independent**.

---

# Quick Interview Traps

### Trap 1

**Does Java compile to machine code?**

No.

It compiles to **bytecode**.

---

### Trap 2

**Does JRE contain JVM?**

Yes.

```
JDK → JRE → JVM
```

---

### Trap 3

**Can we run Java program without JDK?**

Yes.

If **JRE is installed**.

---

# Very Important Concept

Next we will study the **most asked JVM interview topic**:

# JVM MEMORY STRUCTURE

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

# Before moving forward, I want to ask you one question (interview style)

When this line executes:

```java
Person p = new Person("Vishu");
```

### Answer these questions:

1️⃣ Where is **object created**?
2️⃣ Where is **reference variable p stored**?
3️⃣ Where is **"Vishu" string stored**?


### Answers

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

### Final Memory Layout

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

# Now let's start the **Most Important Topic**

# JVM MEMORY STRUCTURE

This is **asked in almost every Java interview**.

## JVM Memory Components

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

# 1️⃣ JVM Stack

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

### Stack Interview Questions

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

# 2️⃣ Heap Memory

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

### Heap Interview Question

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

# 3️⃣ Method Area (Metaspace)

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

### Interview Trap

Where are **static variables stored**?

Correct answer:

```
Method Area (Metaspace)
```

But many people incorrectly say **heap**.

---

# 4️⃣ Program Counter (PC Register)

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

# 5️⃣ Native Method Stack

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

# Quick Summary

| Memory Area  | Stores              |
| ------------ | ------------------- |
| Stack        | Method calls        |
| Heap         | Objects             |
| Metaspace    | Class metadata      |
| PC Register  | Current instruction |
| Native Stack | Native calls        |

---

# Interview Trap Question

### Question

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

# Important Interview Scenario

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

### Where are these stored?

```
x ?
y ?
t ?
Test object ?
```

Try to answer this.

# 1️⃣ `x` — Static Variable

### Answer:
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

# 2️⃣ `y` — Local Variable

### Answer:

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

# 3️⃣ `t` — Reference Variable

### Answer:

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

# 4️⃣ `new Test()` — Object

### Answer:

> Test object stored in heap memory

✔ Correct.

```
Heap
-----

Test object
```

---

# Final Memory Layout

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

# 🔴 Interview Trap (Very Common)

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

# Another Interview Trap

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

# Now we go deeper (Important for Senior Interviews)

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

# Why JVM Divides Heap Like This

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

# Object Life Cycle

When object is created:

```
new Person()
```

Object goes to:

```
Eden Space
```

---

# GC Flow

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

# Simplified Flow

```
Eden → Survivor → Old Generation
```

---

# Important Interview Question

### What is Minor GC?

Answer:

```
Garbage collection in Young Generation
```

---

### What is Major GC?

```
Garbage collection in Old Generation
```

---

### What is Full GC?

```
Entire heap cleanup
```

This is **very expensive**.

---

# Very Important Interview Trap

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

# Next (Very Important for Interviews)

Next we will cover **OBJECT CREATION INSIDE JVM**.

When JVM executes:

```java
Person p = new Person();
```

JVM performs **10 internal steps** like:

```
Class loading
Memory allocation
Default initialization
Constructor call
Reference assignment
```

Most developers **don't know these steps**.

---

Before we go deeper, answer this **interview puzzle**:

```java
String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");

System.out.println(s1 == s2);
System.out.println(s1 == s3);
```

What will be the output?

Explain **why**. This will lead us to the **String Pool deep concept**, which is one of the **most asked JVM interview topics**.


# Output

```
true
false
```

---

# Step-by-Step JVM Explanation

## Step 1 — `"Java"` literal

When JVM sees:

```java
String s1 = "Java";
```

JVM checks the **String Pool**.

If `"Java"` is not present:

```
Create "Java" in String Pool
```

Memory:

```
String Pool
-----------
"Java"
```

Then

```
s1 → "Java"
```

---

## Step 2 — second literal

```java
String s2 = "Java";
```

JVM again checks **String Pool**.

Since `"Java"` already exists:

```
No new object created
```

```
s2 → "Java"
```

Memory:

```
Stack
-----
s1 → "Java"
s2 → "Java"

String Pool
-----------
"Java"
```

So

```
s1 == s2 → true
```

Because `==` compares **reference address**.

---

## Step 3 — `new String("Java")`

```java
String s3 = new String("Java");
```

Two things happen here.

### 1️⃣ JVM checks String Pool

If `"Java"` exists → reuse it.

So pool remains:

```
String Pool
-----------
"Java"
```

---

### 2️⃣ JVM creates a new object in Heap

```
Heap
----
String object
   value → "Java"
```

So memory becomes:

```
Stack
-----
s1 → "Java"
s2 → "Java"
s3 → Heap String object


Heap
----
String Object
   value → "Java"

String Pool
-----------
"Java"
```

---

# Why `s1 == s3` is false

Because

```
s1 → pool object
s3 → heap object
```

Two different addresses.

So

```
s1 == s3 → false
```

---

# Important Interview Trap

### Question

How many objects are created?

```java
String s = new String("Java");
```

Most people say **1** ❌

Correct answer:

```
2 objects
```

1️⃣ `"Java"` in **String Pool**
2️⃣ `new String()` object in **Heap**

But if `"Java"` already exists in pool:

```
Only 1 new object created
```

---

# Another Interview Trap

What about this?

```java
String s1 = "Java";
String s2 = new String("Java");

System.out.println(s1.equals(s2));
```

Output:

```
true
```

Because:

```
equals() compares content
== compares reference
```

---

# Very Important JVM Feature — `intern()`

Example:

```java
String s1 = new String("Java");
String s2 = s1.intern();

System.out.println(s1 == s2);
```

Explanation:

```
intern() → returns reference from String Pool
```

Memory:

```
s1 → Heap String
s2 → Pool "Java"
```

So

```
s1 == s2 → false
```

But:

```java
String s3 = "Java";

System.out.println(s2 == s3);
```

```
true
```

Because both refer to **pool object**.

---

# Interview Level String Pool Question

Predict output:

```java
String s1 = "Ja" + "va";
String s2 = "Java";

System.out.println(s1 == s2);
```

Output:

```
true
```

Reason:

```
Compile-time constant folding
```

Compiler converts:

```
"Ja" + "va" → "Java"
```

---

# But This Changes Everything

```java
String s1 = "Ja";
String s2 = s1 + "va";
String s3 = "Java";

System.out.println(s2 == s3);
```

Output:

```
false
```

Because:

```
s1 + "va" happens at runtime
```

JVM creates new object.

---

# This Topic Leads to Another Deep JVM Concept

Next we should study:

# **OBJECT CREATION INSIDE JVM**

When JVM executes:

```java
Person p = new Person();
```

Internally JVM performs around **8–10 steps**, including:

```
1 Class loading
2 Memory allocation
3 Object header creation
4 Default value initialization
5 Constructor execution
6 Reference assignment
```

Understanding this helps in interviews about:

```
JVM
Memory
GC
Performance
```

---

Before we go there, answer this **interview puzzle**:

### What will be the output?

```java
String s1 = "Java";
String s2 = new String("Java").intern();

System.out.println(s1 == s2);
```

Explain **why**.


> Because both **point to the same "Java" object in the String Pool**.
> `intern()` checks whether `"Java"` exists in the String Pool. If it exists, it returns that reference; otherwise it creates it in the pool and returns it.

### Output:

```
true
```

---

# Step-by-Step JVM Execution

## Step 1 — `"Java"` literal

```java
String s1 = "Java";
```

JVM checks the **String Pool**.

If `"Java"` is not present → it creates it.

Memory:

```
String Pool
-----------
"Java"
```

Then:

```
s1 → "Java" (pool object)
```

---

# Step 2 — `new String("Java")`

```java
new String("Java")
```

Two things happen:

### 1️⃣ JVM checks the pool

`"Java"` already exists.

So it reuses the pool literal.

### 2️⃣ JVM creates a new String object in heap

```
Heap
-----
String object
   value -> "Java"
```

But at this moment:

```
Heap object ≠ Pool object
```

---

# Step 3 — `.intern()`

```java
.intern()
```

`intern()` returns the **reference from the String Pool**.

Since `"Java"` already exists in the pool:

```
intern() → returns pool reference
```

So:

```
s2 → "Java" (pool object)
```

---

# Final Memory

```
Stack
-----
s1 → "Java"
s2 → "Java"

Heap
----
String object (unused reference)

String Pool
-----------
"Java"
```

---

# Final Comparison

```
s1 == s2
```

Both point to the **same pool object**.

```
true
```

---

# Important Interview Trap

This question often comes next.

### What is the difference?

```
new String("Java")
vs
"Java"
```

| Expression           | Object Created |
| -------------------- | -------------- |
| `"Java"`             | String Pool    |
| `new String("Java")` | Heap object    |

---

# Very Famous Interview Puzzle

Predict output:

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1 == s2);
```

Answer:

```
false
```

Because:

```
Two different heap objects
```

---

# Senior Interview Level Question

What about this?

```java
String s1 = new String("Java").intern();
String s2 = new String("Java").intern();

System.out.println(s1 == s2);
```

Answer:

```
true
```

Because both refer to **same pool object**.

---

# Now we move to a **very important JVM topic**

This is **asked in Amazon / Flipkart / backend interviews**.

# Object Creation Inside JVM

When JVM executes:

```java
Person p = new Person();
```

Internally JVM performs **8 internal steps** like:

```
1 Class loading
2 Class linking
3 Class initialization
4 Memory allocation
5 Object header creation
6 Default field initialization
7 Constructor execution
8 Reference assignment
```

Understanding this explains:

```
ClassLoader
Heap
Stack
Metaspace
```

---

Before I explain those **internal 8 JVM steps**, answer this **interview trap**:

### What will be the output?

```java
String s1 = "Java";
String s2 = "Ja" + new String("va");

System.out.println(s1 == s2);
```

Explain **why**. This tests **compile-time vs runtime string creation**, which is a very common JVM interview topic.


> This **is not a compile-time constant**.

### Output:

```
false
```

---

# Step-by-Step JVM Execution

## Step 1 — `"Java"`

```java
String s1 = "Java";
```

JVM checks the **String Pool**.

If `"Java"` does not exist → create it.

Memory:

```
String Pool
-----------
"Java"
```

Then:

```
s1 → "Java"
```

---

# Step 2 — `"Ja"`

Inside

```java
"Ja" + new String("va")
```

The literal `"Ja"` is stored in the **String Pool**.

```
String Pool
-----------
"Java"
"Ja"
```

---

# Step 3 — `new String("va")`

Two things happen.

### Pool check

```
"va"
```

If not present → add to pool.

### Heap object creation

```
Heap
----
String object ("va")
```

So now:

```
Stack
-----
s1 → "Java"
```

```
Heap
----
String("va")
```

```
String Pool
-----------
"Java"
"Ja"
"va"
```

---

# Step 4 — String Concatenation

This part is important:

```
"Ja" + new String("va")
```

Because **one operand is a runtime object**, the compiler cannot optimize it.

So JVM converts this internally to:

```java
new StringBuilder()
     .append("Ja")
     .append(new String("va"))
     .toString();
```

So JVM creates:

```
StringBuilder object
```

Then:

```
new String("Java")
```

in **Heap**.

Memory becomes:

```
Heap
----
String("va")
StringBuilder
String("Java")
```

Now:

```
s2 → Heap "Java"
```

---

# Final Memory

```
Stack
-----
s1 → Pool "Java"
s2 → Heap "Java"
```

```
String Pool
-----------
"Java"
"Ja"
"va"
```

```
Heap
----
String("va")
StringBuilder
String("Java")
```

---

# Final Comparison

```
s1 == s2
```

This compares **references**.

```
Pool "Java" ≠ Heap "Java"
```

So

```
false
```

---

# Important Interview Rule

If **all parts are literals**:

```java
"Ja" + "va"
```

Compiler optimizes at **compile time**.

Becomes:

```
"Java"
```

So:

```
String s1 = "Ja" + "va";
String s2 = "Java";

s1 == s2 → true
```

---

# But if any part is runtime

Example:

```java
String a = "Ja";
String s = a + "va";
```

Now concatenation happens **at runtime**.

So:

```
new String object created in Heap
```

Thus:

```
s1 == s2 → false
```

---

# Quick Interview Summary

| Expression         | Result                 |
| ------------------ | ---------------------- |
| "Ja" + "va"        | Compile-time constant  |
| "a" + variable     | Runtime concatenation  |
| new String("Java") | Heap object            |
| intern()           | Returns pool reference |


---

# Next Topic: Object Creation Inside JVM

When JVM executes:

```java
Person p = new Person("Vishu");
```

most people say only:

* object created in heap
* reference stored in stack

That is correct, but **interviewers want deeper internal steps**.

---

# Internal Steps of Object Creation in JVM

## Code

```java
Person p = new Person("Vishu");
```

JVM internally does roughly this sequence:

### 1. Class is loaded

If `Person.class` is not loaded yet, JVM loads it through the **ClassLoader subsystem**.

It loads:

* class metadata
* fields
* methods
* constructor info
* constant pool references

---

### 2. Class linking happens

Linking has 3 parts:

#### a) Verification

JVM checks bytecode is valid or not.

Examples:

* illegal bytecode?
* stack usage valid?
* type safety correct?

#### b) Preparation

Memory is allocated for **static variables** and they get default values.

Example:

```java
static int x = 10;
```

During preparation:

* memory allocated for `x`
* first default value becomes `0`

Actual `10` comes later in initialization.

#### c) Resolution

Symbolic references are converted to direct references.

Example:
class/method/field names are resolved internally.

---

### 3. Class initialization happens

Static initializers and static variables get actual values.

Example:

```java
static int x = 10;
static {
    System.out.println("Static block");
}
```

Now static block runs and `x` becomes `10`.

---

### 4. JVM checks memory in heap

JVM now checks whether enough heap space is available for the new object.

If not, it may try GC.

If still not enough:

```java
OutOfMemoryError
```

---

### 5. Memory is allocated for object

Memory is allocated in **heap**, usually in **Eden space**.

This memory includes:

* object header
* instance fields
* padding if required

---

# Object Memory Layout

A Java object generally contains:

## 1) Object Header

Contains JVM internal information such as:

* class metadata pointer
* hash code info
* GC age
* lock status

## 2) Instance Data

Actual fields of object.

Example:

```java
class Person {
    int age;
    String name;
}
```

Instance data stores:

* `age`
* reference to `name`

## 3) Padding

Extra bytes may be added for memory alignment.

---

### 6. Default initialization of instance fields

Before constructor runs, fields get default values.

Example:

```java
class Person {
    int age;
    String name;
}
```

Defaults become:

```java
age = 0
name = null
```

This is very important.

So before constructor code runs, object is already created with default values.

---

### 7. Constructor executes

Now constructor runs.

```java
Person(String name) {
    this.name = name;
}
```

Now field values are updated.

So:

```java
name = "Vishu"
```

---

### 8. Reference is assigned to variable

Now the object reference is stored in local variable `p` inside the current stack frame.

So final result:

* object → heap
* `p` reference → stack frame of current method

---

# Full Flow in One Line

```text
Class Load → Link → Initialize → Allocate Heap Memory → Default Values → Constructor Runs → Reference Assigned
```

---

# Important Interview Trap

## Does constructor create the object?

**No.**

This is a very common trap.

Correct answer:

* JVM allocates memory and creates the object first
* then constructor initializes it

So constructor does **not create**
the object; it **initializes** the already created object.

---

# Example

```java
class Test {
    int x;

    Test() {
        System.out.println(x);
        x = 10;
    }
}
```

When object is created:

* first `x = 0`
* constructor runs
* prints `0`
* then sets `x = 10`

---

# Interview Question

## Why can constructor use `this`?

Because the object is already allocated before constructor body executes.

That is why `this` is available inside constructor.

---

# Another Important Trap

## Where does constructor code live?

Constructor code is part of the **class metadata / bytecode**, not inside heap object.

* constructor definition → class area / metaspace side
* object data → heap

---

# Visual Memory View

For this code:

```java
Person p = new Person("Vishu");
```

Memory looks like:

```text
Stack (main frame)
------------------
p  -----------+

Heap
------------------
Person object
  name -------> "Vishu"

String Pool / Heap
------------------
"Vishu"

Metaspace
------------------
Person.class
constructor info
method metadata
field metadata
```

---

# Interview Questions from This Topic

## 1. What happens first: constructor call or memory allocation?

**Memory allocation happens first.**

## 2. Are fields initialized before constructor?

**Yes.** Default values first, then constructor values.

## 3. Does `new` only call constructor?

**No.** It also triggers object memory allocation and initialization steps.

## 4. Where is object header stored?

**Inside the object in heap memory.**

---

# Dry Run Example

```java
class Person {
    int age;
    String name;

    Person(String name) {
        this.name = name;
        this.age = 25;
    }
}
```

```java
Person p = new Person("Vishu");
```

### Step by step:

#### Step 1

`Person.class` loaded if not already loaded.

#### Step 2

Heap memory allocated for `Person` object.

#### Step 3

Default values assigned:

```java
age = 0
name = null
```

#### Step 4

Constructor runs:

```java
name = "Vishu"
age = 25
```

#### Step 5

Reference stored in `p`.

Final object:

```java
age = 25
name = "Vishu"
```

---

# Common Interview Traps

## Trap 1

**Object is created in stack.**
❌ Wrong

Object is created in **heap**.

## Trap 2

**Constructor creates object.**
❌ Wrong

Constructor only initializes object.

## Trap 3

**Fields directly get assigned constructor values first.**
❌ Wrong

Default initialization happens first.

## Trap 4

**Reference variable stores full object.**
❌ Wrong

Reference variable stores only address/reference.

---

# Mini Interview Quiz

Answer these:

```java
class Demo {
    int x;
    static int y;

    Demo() {
        System.out.println(x);
    }
}
```

```java
Demo d = new Demo();
```

### Tell me:

1. Where is `x` stored?
2. Where is `y` stored?
3. What value is printed, and why?
4. Does constructor create the object or initialize it?


# 1️⃣ Where is `x` stored?

### Answer:

> x is stored inside object which is stored in heap memory

✔ Correct.

Memory:

```
Heap
-----
Demo Object
   x = 0
```

Instance variables always live **inside the object**.

---

# 2️⃣ Where is `y` stored?

### Answer:

> y is stored in class metadata

✔ Correct.

More precise interview answer:

```
Static variables belong to the class
Stored in Method Area / Metaspace
```

Memory:

```
Metaspace
---------
Demo.class
   static int y
```

---

# 3️⃣ What value prints?

### Answer:

> 0 because default initialised before constructor call

✔ Correct.

Object creation flow:

```
1 Allocate memory
2 Default initialization
3 Constructor execution
```

So before constructor runs:

```
x = 0
```

Constructor prints:

```
0
```

---

# 4️⃣ Does constructor create object?

### Answer:

> Constructor initialize the object, does not create it

✔ Correct.

Important interview statement:

```
Object creation = JVM responsibility
Constructor = object initialization
```

---

# Excellent Progress 👍

You are now covering **real JVM interview topics**, not just syntax.

Now we move to the **next big JVM subsystem**.

---

# JVM ClassLoader Subsystem

This is **very commonly asked in backend interviews**.

Many candidates know memory but **fail ClassLoader questions**.

---

# What is ClassLoader?

ClassLoader is responsible for:

```
Loading .class files into JVM memory
```

Example:

```
Main.class
Person.class
String.class
System.class
```

When JVM needs a class, the **ClassLoader loads it into memory**.

---

# ClassLoader Types

There are **3 main ClassLoaders**.

```
1 Bootstrap ClassLoader
2 Extension ClassLoader
3 Application ClassLoader
```

Diagram:

```
           Bootstrap ClassLoader
                 ↑
           Extension ClassLoader
                 ↑
          Application ClassLoader
```

This is called **Parent Delegation Model**.

---

# 1️⃣ Bootstrap ClassLoader

This is the **root classloader**.

Loads **core Java classes**.

Examples:

```
java.lang.String
java.lang.Object
java.lang.System
java.util.*
```

Location:

```
<JAVA_HOME>/lib
```

Important:

Bootstrap is written in **native code (C/C++)**, not Java.

---

# 2️⃣ Extension ClassLoader

Loads **Java extension libraries**.

Location:

```
<JAVA_HOME>/lib/ext
```

Examples:

```
security extensions
crypto libraries
```

---

# 3️⃣ Application ClassLoader

Loads **your application classes**.

Example:

```
Main.class
Person.class
Demo.class
```

These are loaded from:

```
CLASSPATH
```

---

# Example

When JVM runs:

```
java Main
```

Application ClassLoader loads:

```
Main.class
Person.class
```

---

# Parent Delegation Model

This is **very important interview concept**.

Suppose JVM needs to load:

```
java.lang.String
```

Steps:

```
Application ClassLoader
   ↓
asks parent

Extension ClassLoader
   ↓
asks parent

Bootstrap ClassLoader
```

Bootstrap loads the class.

---

# Why Parent Delegation Exists

Security.

Imagine if Application ClassLoader loaded `java.lang.String`.

Someone could write a fake String class like:

```java
package java.lang;

public class String {
}
```

Parent delegation prevents this.

Core classes must come from **Bootstrap ClassLoader**.

---

# Interview Question

### Who loads `java.lang.String`?

Answer:

```
Bootstrap ClassLoader
```

---

# Interview Trap

### Can we override `java.lang.String`?

Answer:

```
No
```

Because parent delegation loads it first.

---

# Class Loading Phases

When JVM loads a class, there are **3 major phases**.

```
1 Loading
2 Linking
3 Initialization
```

---

# 1️⃣ Loading

ClassLoader reads `.class` file and loads it into memory.

---

# 2️⃣ Linking

Linking has 3 steps.

```
Verification
Preparation
Resolution
```

You already saw this earlier.

---

# 3️⃣ Initialization

Static variables get actual values.

Static blocks run.

Example:

```java
class Test {
    static int x = 10;

    static {
        System.out.println("Loaded");
    }
}
```

When class loads:

```
Loaded
```

prints.

---

# Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Test t = null;
    }
}
```

### Will **"Static Block"** print?

Think carefully.

This question checks **when class initialization happens**, which is a **very famous JVM interview trap**.

**correct answer is actually NO** ❌.

### Output:

```
(no output)
```

The **static block will NOT execute**.

---

# Why?

Because **class initialization does not happen here**.

Important rule:

```text
Loading ≠ Initialization
```

JVM may load the class, but the **static block runs only when the class is initialized**.

---

# When Does Class Initialization Happen?

Class initialization happens only when JVM detects **active use** of the class.

Examples of active use:

1️⃣ Creating an object

```java
Test t = new Test();
```

2️⃣ Accessing a static variable

```java
System.out.println(Test.x);
```

3️⃣ Calling a static method

```java
Test.method();
```

4️⃣ Reflection

5️⃣ Main class loading

---

# Why `Test t = null` Does Not Trigger Initialization

This line:

```java
Test t = null;
```

does **not create an object**.

It only creates a **reference variable**.

Memory:

```
Stack
-----
t → null
```

No object, no static access → **no class initialization**.

So:

```
Static block not executed
```

---

# Correct Example Where Static Block Runs

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Test t = new Test();
    }
}
```

Output:

```
Static Block
```

Because object creation triggers initialization.

---

# Another Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static int x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
    }
}
```

Output:

```
Static Block
10
```

Because accessing static field **initializes the class**.

---

# Very Famous JVM Interview Question

Predict output:

```java
class Parent {
    static {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static {
        System.out.println("Child");
    }
}

public class Main {
    public static void main(String[] args) {
        Child c = new Child();
    }
}
```

Output:

```
Parent
Child
```

Reason:

```text
Superclass initializes before subclass
```

---

# One More Trap (Very Important)

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Class.forName("Test");
    }
}
```

Output:

```
Static Block
```

Because:

```
Class.forName() triggers class initialization
```

---

# Summary Rule

Static block executes when **class initialization occurs**, not just when class is loaded.

---

# Quick Interview Quiz

### What will be the output?

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static int x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
        System.out.println(Test.x);
    }
}
```

Will `"Static Block"` print **once or twice**? Explain why.

> It prints **once** because the class is **initialized only one time**. If the class is already initialized, the static block does not run again.

### Output

```
Static Block
10
10
```

Static block runs **only once**.

---

# Important Clarification

You said:

> class loading happen one time

But the correct JVM concept is:

```text
Static block runs during CLASS INITIALIZATION
```

Not during **class loading**.

---

# JVM Class Lifecycle

When JVM deals with a class, it goes through **three main phases**:

```
1 Loading
2 Linking
3 Initialization
```

Static blocks run during:

```
Initialization
```

---

# Execution Flow

When JVM reaches:

```java
System.out.println(Test.x);
```

JVM sees that class `Test` is **not initialized yet**.

So it performs initialization:

### Step 1

Static block executes:

```
Static Block
```

### Step 2

Static variable initialized:

```
x = 10
```

### Step 3

Now `Test.x` is accessed.

```
10
```

---

# Second Access

Now JVM executes:

```java
System.out.println(Test.x);
```

But the class is **already initialized**.

So:

```
Static block does NOT run again
```

Only prints:

```
10
```

---

# Key Interview Rule

```text
Class initialization happens only once per classloader
```

That’s why static block executes **only once**.

---

# Another Important Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static int x = 10;
}

public class Main {
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
    }
}
```

What will print?

Correct answer:

```
Static Block
```

Only once.

Because:

```
Class initialization happens only once
```

Even if multiple objects are created.

---

# Another Famous Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Test[] arr = new Test[10];
    }
}
```

Will the static block run?

Think carefully.

This question checks whether **array creation triggers class initialization**, which is a **very tricky JVM interview concept**.


### Answer:

The **static block will NOT execute**.

Output:

```
(no output)
```

---

# Why Static Block Does NOT Run

This line:

```java
Test[] arr = new Test[10];
```

creates **an array of references**, not objects.

Memory looks like:

```
Stack
-----
arr  → reference

Heap
-----
Array[10]
   null
   null
   null
   null
   null
   null
   null
   null
   null
   null
```

Important:

```
No Test objects are created
```

Therefore:

```
Test class is not initialized
```

So the **static block does not execute**.

---

# Important JVM Rule

```text
Array creation does not trigger class initialization
```

Only **active use** of a class triggers initialization.

---

# Example Where Static Block WILL Run

```java
Test[] arr = new Test[10];
arr[0] = new Test();
```

Now output:

```
Static Block
```

Because:

```
new Test()
```

creates an object → class initialization happens.

---

# Another Famous Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static final int x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
    }
}
```

### What will print?

Will **"Static Block"** print or not?


### Output

```java
10
```

There is **no** `Static Block`.

---

# Why?

Because:

```java
static final int x = 10;
```

is a **compile-time constant**.

So the compiler replaces:

```java
System.out.println(Test.x);
```

with something like:

```java
System.out.println(10);
```

That means JVM does **not need to initialize `Test` class** to get `x`.

So:

* class initialization does not happen
* static block does not run

---

# Important JVM Rule

Accessing a `static` field usually triggers class initialization, **but not when the field is a compile-time constant**.

Examples of compile-time constants:

```java
static final int x = 10;
static final String s = "Java";
static final boolean flag = true;
```

---

# But See This

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static final Integer x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
    }
}
```

Now the output is:

```java
Static Block
10
```

---

# Why this time?

Because:

```java
static final Integer x = 10;
```

is **not** a compile-time constant in the same way as primitive `int`.

`Integer` is an object reference, so JVM must initialize the class.

---

# Interview Trap Summary

## Static block will NOT run

```java
static final int x = 10;
System.out.println(Test.x);
```

Because `x` is a compile-time constant.

## Static block WILL run

```java
static int x = 10;
System.out.println(Test.x);
```

or

```java
static final Integer x = 10;
System.out.println(Test.x);
```

Because class initialization is required.

---

# Easy Rule for Interview

If it is:

* `static final`
* primitive or String
* value known at compile time

then it may be **inlined by compiler** and class initialization may not happen.

---

# Now you are entering real JVM interview depth.

Before moving to GC, let’s finish this class-loading trap section with one more famous question.

## Predict output

```java
class Parent {
    static int x = 10;

    static {
        System.out.println("Parent Static");
    }
}

class Child extends Parent {
    static {
        System.out.println("Child Static");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Child.x);
    }
}
```

### Will it print:

1. only `10`
2. `Parent Static` then `10`
3. `Parent Static`, `Child Static`, then `10`

Answer this:


### Output

```
Parent Static
10
```

---

# Why?

This line executes:

```java
System.out.println(Child.x);
```

But `x` is **not declared in Child**.

It is declared in:

```
Parent
```

So JVM rule:

```
Accessing a static field triggers initialization
of the class that actually declares that field
```

Since `x` belongs to **Parent**, JVM initializes **Parent only**.

---

# Execution Flow

Step 1

JVM accesses:

```
Child.x
```

Step 2

JVM finds `x` in **Parent class**.

Step 3

JVM initializes **Parent class**.

```
Parent Static
```

Step 4

JVM reads `x = 10`.

```
10
```

---

# Why Child Static Block Does NOT Run

Because:

```
Child class is not initialized
```

We only accessed **Parent’s static field**.

---

# Important Interview Rule

```
Referencing a static field initializes
only the class that declares the field
```

Not the subclass.

---

# Visual Flow

```
Child.x
   ↓
x belongs to Parent
   ↓
Initialize Parent
   ↓
Print Parent Static
   ↓
Return x
   ↓
Print 10
```

---

# Interview Trap Example

Now predict this:

```java
class Parent {
    static {
        System.out.println("Parent Static");
    }
}

class Child extends Parent {
    static int x = 10;

    static {
        System.out.println("Child Static");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Child.x);
    }
}
```

### What will print?

1️⃣ `Child Static 10`
2️⃣ `Parent Static Child Static 10`
3️⃣ `Parent Static 10`


### Output

```java
Parent Static
Child Static
10
```

---

# Why?

Now `x` is declared inside **Child**:

```java
static int x = 10;
```

So when JVM accesses:

```java
Child.x
```

it must initialize **Child class**.

But before a subclass is initialized:

```text
Superclass must be initialized first
```

So JVM flow is:

```text
Initialize Parent
→ print Parent Static

Initialize Child
→ assign x = 10
→ print Child Static

Access x
→ print 10
```

---

# Very Important Interview Rule

## If static member belongs to parent:

Only parent initializes.

## If static member belongs to child:

Parent initializes first, then child initializes.

---

Excellent.
Now let’s move to the next **big JVM interview topic**:

# Garbage Collection (GC)

This is one of the most asked topics in backend interviews.

---

# 1. What is Garbage Collection?

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

# 2. What is Garbage?

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

# 3. Important Interview Trap

## Does `p = null` destroy object immediately?

**No.**

It only makes the object **eligible for GC**.

Actual cleanup depends on JVM.

---

# 4. How JVM Knows an Object is Garbage

JVM starts from **GC Roots**.

If object is reachable from GC roots, it stays alive.

If not reachable, it can be collected.

---

# 5. What are GC Roots?

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

# 6. Reachability Example

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

# 7. Heap Generations

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

# 8. Why Heap is Divided

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

# 9. Object Life Cycle in Heap

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

# 10. Types of GC

## Minor GC

Cleans **Young Generation**.

Usually fast.

## Major GC

Cleans **Old Generation**.

Usually slower.

## Full GC

Cleans whole heap.

Very expensive.

---

# 11. Interview Trap

## Are Major GC and Full GC always exactly same?

In many interview discussions people use them loosely, but technically they are **not always strictly identical** depending on JVM implementation.

Safe interview answer:

```text
Minor GC → Young generation
Major GC → Old generation
Full GC → Entire heap
```

---

# 12. Example of Minor GC Flow

Suppose Eden becomes full.

JVM runs **Minor GC**.

* dead objects removed
* live objects moved to Survivor
* objects surviving multiple rounds may move to Old Gen

---

# 13. Example

```java
for (int i = 0; i < 100000; i++) {
    String s = new String("abc");
}
```

Most of these objects are temporary.

They die quickly.

So they are cleaned from **Young Generation**.

---

# 14. When Does Object Move to Old Generation?

If object survives multiple GC cycles, JVM promotes it.

Example long-living objects:

* cache objects
* singleton-held objects
* session-like long-lived structures
* static referenced objects

These often end up in **Old Generation**.

---

# 15. Common Interview Trap

## Are all objects directly created in Old Generation?

**No.**

Usually they are created in:

```text
Young Generation → Eden
```

That is the expected interview answer.

---

# 16. Can GC Collect an Object Having Circular References?

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

# 17. `System.gc()` Interview Trap

Question:

## Does `System.gc()` guarantee GC?

**No.**

It is only a **request/suggestion** to JVM.

JVM may ignore it.

---

# 18. `finalize()` Interview Trap

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

# 19. Can an Object Be Resurrected in `finalize()`?

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

# 20. Interview Question

## Is an object with reference `null` always garbage?

Not necessarily.

Example:

```java
Person p1 = new Person();
Person p2 = p1;
p1 = null;
```

Here `p1` is null, but object is still alive because `p2` points to it.

---

# 21. Memory Leak in Java?

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

# 22. Interview Questions with Answers

## Q1. How does JVM decide an object is garbage?

By checking reachability from **GC roots**.

## Q2. Difference between Minor GC and Full GC?

Minor GC cleans Young Gen; Full GC cleans whole heap.

## Q3. Does setting reference to null force GC?

No, it only makes object eligible.

## Q4. Can circularly referenced objects be garbage collected?

Yes, if unreachable from GC roots.

## Q5. Does Java prevent memory leaks completely?

No.

---

# 23. Very Important GC Trap

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

# 24. One More Important Difference

## Stack memory cleanup vs Heap cleanup

Stack variables are removed automatically when method ends.

Heap objects are removed by GC only when unreachable.

---

# 25. Quick Summary

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

# Mini Interview Quiz

Answer these:

### 1

What is the difference between:

* eligible for GC
* garbage collected

### 2

Why can Java still have memory leaks even with GC?

### 3

Why can circular references still be collected in Java?

After that I will teach the next deep topic:

# JVM Execution Engine + JIT Compiler

That is another **must-know interview topic**.

### Answer:
> When an object **has no references or is not reachable**, it becomes **eligible for GC**.
> GC is the process of **removing unreachable objects from the heap**.
> Java can still have memory leaks when objects are **not used but still reachable**.

# 1️⃣ Difference Between "Eligible for GC" and "Garbage Collected"

Answer is correct.

### Eligible for GC

```text
Object has no reachable references
```

Example:

```java
Person p = new Person();
p = null;
```

Now the object is **eligible for GC**.

But it still exists in heap.

---

### Garbage Collected

```text
JVM actually removes the object from memory
```

Important rule:

```
Eligible for GC ≠ Immediately removed
```

Because GC runs **when JVM decides**.

---

# 2️⃣ Why Java Can Still Have Memory Leaks

Key idea:

```
GC removes only unreachable objects
```

If an object is still reachable, GC **cannot remove it**.

Example:

```java
static List<Object> cache = new ArrayList<>();
```

If objects are continuously added:

```java
cache.add(new Object());
```

They remain reachable via the static reference.

Result:

```
Heap grows
Eventually → OutOfMemoryError
```

This is a **logical memory leak**.

---

# 3️⃣ Why Circular References Can Be Collected

Java GC uses:

```text
Reachability analysis
```

Not:

```text
Reference counting
```

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

Even though objects reference each other:

```
No GC root points to them
```

So JVM marks them **unreachable** and removes them.

---

# JVM Execution Engine (Next Topic)

The Execution Engine is responsible for:

```text
Running the bytecode
```

Inside JVM architecture:

```
.class file
   ↓
ClassLoader
   ↓
Bytecode
   ↓
Execution Engine
   ↓
Machine instructions
```

---

# Components of Execution Engine

Execution engine mainly has:

```
1 Interpreter
2 JIT Compiler
3 Garbage Collector
```

Diagram:

```
Bytecode
   ↓
Execution Engine
   ├── Interpreter
   ├── JIT Compiler
   └── Garbage Collector
```

---

# 1️⃣ Interpreter

Interpreter reads bytecode **line by line**.

Example bytecode:

```
iload_1
iload_2
iadd
```

Interpreter executes instructions one at a time.

---

### Problem with Interpreter

It is **slow**.

Because each instruction must be interpreted every time.

Example:

```
loop runs 1,000,000 times
```

Interpreter reads bytecode again and again.

---

# 2️⃣ JIT Compiler (Just-In-Time)

To solve interpreter slowness, JVM introduced **JIT Compiler**.

JIT compiles **frequently executed code** into **native machine code**.

Flow:

```
Bytecode
   ↓
Interpreter runs initially
   ↓
Hotspot detection
   ↓
JIT compiles to machine code
   ↓
Next runs execute native code
```

---

# Example

```java
for(int i=0;i<1000000;i++){
    sum += i;
}
```

This loop becomes **hot code**.

JIT compiles it to machine code.

Then execution becomes much faster.

---

# What is Hotspot?

Hotspot means:

```
Frequently executed code
```

JVM detects these methods and optimizes them.

That is why the JVM implementation is called:

```
HotSpot JVM
```

---

# Types of JIT Compiler

Two types exist in modern JVM:

### C1 Compiler

```
Fast compilation
Less optimization
```

Used for quick startup.

---

### C2 Compiler

```
Slower compilation
Heavy optimization
```

Used for high performance.

---

# JVM Optimization Techniques

JIT performs many optimizations like:

```
Method inlining
Loop unrolling
Dead code elimination
Escape analysis
Constant folding
```

Example:

```java
int x = 10 * 5;
```

JVM optimizes it to:

```
int x = 50;
```

---

# Method Inlining Example

Instead of:

```java
sum = add(a,b);
```

JVM may inline the method:

```java
sum = a + b;
```

This avoids method call overhead.

---

# Interview Trap

### Does Java compile to machine code?

Correct answer:

```
Java compiles to bytecode
JIT may later compile it to machine code
```

---

# Another Interview Trap

### Why Java programs become faster after some time?

Answer:

```
Because JIT compiles frequently used code
```

First runs slower, later runs faster.

---

# Interpreter vs JIT

| Feature     | Interpreter  | JIT         |
| ----------- | ------------ | ----------- |
| Execution   | Line-by-line | Native code |
| Speed       | Slower       | Faster      |
| Compilation | None         | Runtime     |

---

# Famous Interview Question

Why Java startup is slower than C++?

Answer:

```
Class loading
Bytecode verification
JIT compilation
```

But long-running programs become fast because of JIT.

---

# Final JVM Architecture Summary

```
Java Source (.java)
      ↓
Compiler (javac)
      ↓
Bytecode (.class)
      ↓
ClassLoader
      ↓
Runtime Data Areas
      ↓
Execution Engine
      ↓
Interpreter + JIT
      ↓
Machine Code
```

---

# Final Interview Question for You

Very famous JVM question.

Why does this program run **faster after some time**?

```java
public class Test {
    public static void main(String[] args) {

        long start = System.currentTimeMillis();

        for(int i=0;i<100000000;i++){
            int x = i * 2;
        }

        long end = System.currentTimeMillis();
        System.out.println(end - start);
    }
}
```

If we run it multiple times in same JVM process, later runs become faster.

**Why?**

### Answer:
> Because the **JIT compiler compiles this loop into native machine code**.

# Code

```java
for(int i = 0; i < 100000000; i++){
    int x = i * 2;
}
```

When the program runs the **first time**, JVM does not immediately compile it to machine code.

---

# Step 1 — Interpreter Executes First

Initially JVM runs bytecode using the **Interpreter**.

Flow:

```
Bytecode
   ↓
Interpreter executes instruction by instruction
```

So execution is slower.

---

# Step 2 — Hotspot Detection

JVM monitors frequently executed methods or loops.

When code runs many times, JVM marks it as **hot code**.

Example:

```
loop executed millions of times
```

Now JVM decides:

```
This code should be optimized
```

---

# Step 3 — JIT Compilation

JIT compiles the hot code to **native machine code**.

Flow becomes:

```
Bytecode
   ↓
JIT Compiler
   ↓
Native Machine Code
```

Now the CPU executes machine code directly.

So execution becomes **much faster**.

---

# Final Flow

First execution:

```
Bytecode → Interpreter → Slow
```

Later execution:

```
Bytecode → JIT → Native Code → Fast
```

That is why programs become faster after some time.

---

# Important JVM Optimizations Done by JIT

JIT may also perform optimizations like:

### Method Inlining

Instead of:

```java
result = multiply(a, b);
```

JIT may inline:

```java
result = a * b;
```

---

### Dead Code Elimination

If some code does nothing useful, JVM removes it.

Example:

```java
int x = 5;
x = 10;
```

JVM may remove the first assignment.

---

### Loop Optimization

JIT optimizes loops heavily.

Example:

```
loop unrolling
```

---

# Very Important Interview Trap

Look at this code again:

```java
for(int i=0;i<100000000;i++){
    int x = i * 2;
}
```

A very smart JVM may optimize this even further.

Because variable `x` is never used.

So JVM may eliminate this entire loop.

This is called:

```
Dead Code Elimination
```

That is why **microbenchmarks in Java are tricky**.

---

# Correct Way to Benchmark Java

Use tools like:

```
JMH (Java Microbenchmark Harness)
```

Because simple timing tests can be optimized away by JVM.

---

# Final JVM Execution Engine Summary

```
Bytecode
   ↓
Interpreter executes
   ↓
Hotspot detection
   ↓
JIT compiler optimizes
   ↓
Native machine code
```

---

# Excellent Progress

You now understand **most important JVM topics**:

* JVM architecture
* Heap vs Stack
* ClassLoader
* Class initialization traps
* String pool
* Object creation
* Garbage collection
* Execution engine
* JIT compiler

This is already **strong JVM interview knowledge**.

---


# Escape Analysis (Next Topic)

Example:

```java
public void method() {
    Person p = new Person();
}
```

If object `p` does not escape the method:

```
JVM may allocate it on stack instead of heap
```

This improves performance.

---

### Final Interview Question for You

Look at this code:

```java
public void test() {
    StringBuilder sb = new StringBuilder();
    sb.append("Java");
}
```

Do you think `StringBuilder` **must always be allocated in heap**,
or can JVM allocate it **in stack using escape analysis**?

Explain your reasoning.

### Answer:

JVM allocate it **in stack using escape analysis**

# Escape Analysis (JVM Optimization)

Escape Analysis is a **JIT optimization technique**.

It checks:

```text
Does an object escape the method or thread?
```

If **object does NOT escape**, JVM may apply powerful optimizations.

---

# What Does "Escape" Mean?

An object **escapes** if it becomes accessible outside the method.

Example:

```java
public Person create() {
    Person p = new Person();
    return p;
}
```

Here:

```
p escapes the method
```

Because it is returned.

So JVM **must allocate it in heap**.

---

# Example Where Object Does NOT Escape

```java
public void test() {
    Person p = new Person();
}
```

Here:

```
p is used only inside method
```

When method ends:

```
object is useless
```

So JVM may optimize.

---

# Escape Analysis Optimization

If object does not escape, JVM may do:

### 1️⃣ Stack Allocation

Instead of heap:

```
Heap allocation
```

JVM may allocate object in:

```
Stack
```

Stack allocation is **much faster**.

---

### 2️⃣ Scalar Replacement

JVM may remove the object entirely.

Example:

```java
class Point {
    int x;
    int y;
}
```

```java
Point p = new Point();
p.x = 10;
p.y = 20;
```

JVM may replace this with:

```
int x = 10
int y = 20
```

No object created at all.

---

# Your Question Code

```java
public void test() {
    StringBuilder sb = new StringBuilder();
    sb.append("Java");
}
```

Let's analyze.

`sb`:

```
not returned
not stored in field
not passed outside
```

So:

```
sb does NOT escape
```

Therefore JVM **may allocate it on stack or remove object entirely**.

---

# Important Interview Rule

Most developers think:

```
All objects are created in heap
```

But with Escape Analysis:

```
Some objects may be optimized to stack
```

---

# JVM Optimization Chain

When code runs, JVM may apply:

```
Escape Analysis
↓
Stack Allocation
↓
Scalar Replacement
↓
Lock Elimination
```

These are **advanced JIT optimizations**.

---

# Lock Elimination Example

If object does not escape thread:

```java
StringBuffer sb = new StringBuffer();
```

Even though `StringBuffer` is synchronized, JVM may remove locking.

Because no other thread can access it.

---

# Interview Tip

If interviewer asks:

> Are objects always allocated in heap?

Correct answer:

```
Usually yes,
but JVM may allocate objects on stack using Escape Analysis.
```

This answer shows **deep JVM knowledge**.

---

# Final JVM Architecture Summary

You now understand the complete JVM pipeline.

```
Java Source (.java)
      ↓
Compiler (javac)
      ↓
Bytecode (.class)
      ↓
ClassLoader
      ↓
Runtime Data Areas
   - Heap
   - Stack
   - Metaspace
   - PC Register
   - Native Stack
      ↓
Execution Engine
   - Interpreter
   - JIT Compiler
      ↓
Garbage Collector
      ↓
Native Machine Code
```

---

# Honest Feedback (for interviews)

Your JVM understanding is now **good enough for most backend interviews**.

You know:

✔ JVM memory
✔ Class loading
✔ Initialization traps
✔ String pool
✔ Object creation
✔ GC basics
✔ Execution engine
✔ JIT
✔ Escape analysis