# JVM Internals — Complete Interview Guide

## Definition

The JVM is the runtime that loads Java bytecode, verifies it, manages memory, and executes the program on the machine.

## Why It Matters

JVM internals explain why Java is platform independent, how objects are created, how memory is managed, and why performance issues happen.

## Core Example

When you run `java Main`, the JVM loads classes, creates the main thread, creates stack frames, allocates objects in heap, and executes bytecode.

## Common Traps

- Java source code is not executed directly.
- `javac` creates bytecode, not native machine code.
- The JVM loads classes when they are needed.
- Object references and objects are not stored in the same place.

## Interview Answer

The JVM runs Java bytecode. First, `javac` compiles `.java` files into `.class` files. Then the JVM loads required classes, verifies bytecode, prepares memory, starts the main thread, creates stack frames, allocates objects in heap, and executes the program using the execution engine.

## Quick Revision

- `.java` becomes `.class` bytecode.
- Bytecode is platform independent.
- JVM loads classes lazily.
- Each thread has its own stack.
- Objects live in heap.
- Method calls create stack frames.

## Deep Dive

#### Roadmap we will follow

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

### What Happens When You Run a Java Program

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

### Step 1 — Compilation

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

### Step 2 — JVM Starts

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

### Step 3 — ClassLoader loads classes

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

### Step 4 — JVM Creates Main Thread

JVM starts **main thread**.

Then it creates **stack memory for that thread**.

```
Main Thread
   |
   |--- Stack
```

---

### Step 5 — main() Stack Frame Created

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

### Step 6 — Object Creation

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

### Step 7 — Method Call

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

### Step 8 — Output

```
Hello Vishu
```

---

### Step 9 — Method Ends

`sayHello()` frame removed.

```
Stack

| main() frame |
```

---

### Step 10 — Program Ends

Main frame removed.

Stack becomes empty.

---

### PART 2 — JDK vs JRE vs JVM

This question comes in **almost every Java interview**.

---

### JDK

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

### JRE

Java Runtime Environment

Used to **run Java programs**.

Contains:

```
JRE
 ├── JVM
 └── Java libraries
```

---

### JVM

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

### Diagram (Important for Interview)

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

### Common Interview Question

##### Why Java is platform independent?

Because:

```
Java → Bytecode
Bytecode → JVM → Machine Code
```

Each OS has its own JVM.

So same `.class` file runs everywhere.

---

### Another Interview Question

##### Is JVM platform independent?

Answer:

```
No
```

JVM is **platform dependent**.

Each OS has its own JVM.

But **Java bytecode is platform independent**.

---

### Quick Interview Traps

##### Trap 1

**Does Java compile to machine code?**

No.

It compiles to **bytecode**.

---

##### Trap 2

**Does JRE contain JVM?**

Yes.

```
JDK → JRE → JVM
```

---

##### Trap 3

**Can we run Java program without JDK?**

Yes.

If **JRE is installed**.

---

### Very Important Concept

Next we will study the **most asked JVM interview topic**:
