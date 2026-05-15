# JVM Execution Engine + JIT Compiler

## Definition

The execution engine runs Java bytecode. The JIT compiler improves performance by compiling frequently used bytecode into native machine code at runtime.

## Why It Matters

This topic explains how Java code actually runs, why Java can become faster after warm-up, and why proper benchmarking needs care.

## Core Example

At first, bytecode may be interpreted. If a method runs many times, the JVM can mark it as hot code and JIT compile it into optimized native code.

## Common Traps

- Java is not only interpreted.
- JIT compilation happens at runtime, not during `javac`.
- Hot code is optimized more aggressively.
- A small benchmark can be wrong if it ignores JVM warm-up.
- JIT optimizations can change how code performs internally without changing behavior.

## Interview Answer

The execution engine executes bytecode using the interpreter and JIT compiler. The interpreter starts quickly and runs bytecode line by line. The JIT compiler detects hot code and compiles it into optimized native code, which improves performance for repeated execution.

## Quick Revision

- Interpreter executes bytecode.
- JIT compiles hot code.
- HotSpot means frequently executed code is optimized.
- JIT runs during program execution.
- Warm-up matters for benchmarks.
- Common optimizations include inlining and escape analysis.

## Deep Dive

That is another **must-know interview topic**.

##### Answer:
> When an object **has no references or is not reachable**, it becomes **eligible for GC**.
> GC is the process of **removing unreachable objects from the heap**.
> Java can still have memory leaks when objects are **not used but still reachable**.

### 1️⃣ Difference Between "Eligible for GC" and "Garbage Collected"

Answer is correct.

##### Eligible for GC

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

##### Garbage Collected

```text
JVM actually removes the object from memory
```

Important rule:

```
Eligible for GC ≠ Immediately removed
```

Because GC runs **when JVM decides**.

---

### 2️⃣ Why Java Can Still Have Memory Leaks

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

### 3️⃣ Why Circular References Can Be Collected

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

### JVM Execution Engine (Next Topic)

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

### Components of Execution Engine

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

### 1️⃣ Interpreter

Interpreter reads bytecode **line by line**.

Example bytecode:

```
iload_1
iload_2
iadd
```

Interpreter executes instructions one at a time.

---

##### Problem with Interpreter

It is **slow**.

Because each instruction must be interpreted every time.

Example:

```
loop runs 1,000,000 times
```

Interpreter reads bytecode again and again.

---

### 2️⃣ JIT Compiler (Just-In-Time)

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

### Example

```java
for(int i=0;i<1000000;i++){
    sum += i;
}
```

This loop becomes **hot code**.

JIT compiles it to machine code.

Then execution becomes much faster.

---

### What is Hotspot?

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

### Types of JIT Compiler

Two types exist in modern JVM:

##### C1 Compiler

```
Fast compilation
Less optimization
```

Used for quick startup.

---

##### C2 Compiler

```
Slower compilation
Heavy optimization
```

Used for high performance.

---

### JVM Optimization Techniques

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

### Method Inlining Example

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

### Interview Trap

##### Does Java compile to machine code?

Correct answer:

```
Java compiles to bytecode
JIT may later compile it to machine code
```

---

### Another Interview Trap

##### Why Java programs become faster after some time?

Answer:

```
Because JIT compiles frequently used code
```

First runs slower, later runs faster.

---

### Interpreter vs JIT

| Feature     | Interpreter  | JIT         |
| ----------- | ------------ | ----------- |
| Execution   | Line-by-line | Native code |
| Speed       | Slower       | Faster      |
| Compilation | None         | Runtime     |

---

### Famous Interview Question

Why Java startup is slower than C++?

Answer:

```
Class loading
Bytecode verification
JIT compilation
```

But long-running programs become fast because of JIT.

---

### Final JVM Architecture Summary

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

### Final Interview Question for You

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

##### Answer:
> Because the **JIT compiler compiles this loop into native machine code**.

### Code

```java
for(int i = 0; i < 100000000; i++){
    int x = i * 2;
}
```

When the program runs the **first time**, JVM does not immediately compile it to machine code.

---

### Step 1 — Interpreter Executes First

Initially JVM runs bytecode using the **Interpreter**.

Flow:

```
Bytecode
   ↓
Interpreter executes instruction by instruction
```

So execution is slower.

---

### Step 2 — Hotspot Detection

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

### Step 3 — JIT Compilation

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

### Final Flow

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

### Important JVM Optimizations Done by JIT

JIT may also perform optimizations like:

##### Method Inlining

Instead of:

```java
result = multiply(a, b);
```

JIT may inline:

```java
result = a * b;
```

---

##### Dead Code Elimination

If some code does nothing useful, JVM removes it.

Example:

```java
int x = 5;
x = 10;
```

JVM may remove the first assignment.

---

##### Loop Optimization

JIT optimizes loops heavily.

Example:

```
loop unrolling
```

---

### Very Important Interview Trap

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

### Correct Way to Benchmark Java

Use tools like:

```
JMH (Java Microbenchmark Harness)
```

Because simple timing tests can be optimized away by JVM.

---

### Final JVM Execution Engine Summary

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

### Excellent Progress

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

