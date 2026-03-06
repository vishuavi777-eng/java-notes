# 📚 Variables & Data Types In Java

## 1️⃣ Basic Definition (Interview Style – 2 Lines)

A **variable** is a named memory location used to store data.
A **data type** defines what kind of data a variable can store and how much memory it occupies.

---

## 2️⃣ What Happens Internally (Deep Understanding)

When you write:

```java
int age = 25;
```

### What JVM Does:

1. `int` → tells JVM to allocate **4 bytes**
2. `age` → variable name
3. `25` → literal value
4. Memory allocated in:

   * **Stack** (if local variable)
   * **Heap (inside object)** if instance variable

---

## 3️⃣ Types of Data Types in Java

Java has **2 main categories**

### 1️⃣ Primitive Data Types (Store actual value)

| Type    | Size          | Default  | Example              |
| ------- | ------------- | -------- | -------------------- |
| byte    | 1 byte        | 0        | byte b = 10;         |
| short   | 2 bytes       | 0        | short s = 100;       |
| int     | 4 bytes       | 0        | int x = 5;           |
| long    | 8 bytes       | 0L       | long l = 100L;       |
| float   | 4 bytes       | 0.0f     | float f = 5.5f;      |
| double  | 8 bytes       | 0.0      | double d = 10.5;     |
| char    | 2 bytes       | '\u0000' | char c = 'A';        |
| boolean | JVM dependent | false    | boolean flag = true; |

👉 Primitive variables store **actual value directly in memory**.

---

### 2️⃣ Non-Primitive (Reference Types)

Examples:

* String
* Arrays
* Objects
* Interfaces

Example:

```java
String name = "Vishu";
```

Here:

* `name` → stored in stack
* `"Vishu"` object → stored in heap (String Pool area)

👉 Reference variables store **memory address**, not actual object.

---

## 4️⃣ Variable Types (Based on Scope)

### 1️⃣ Local Variable

Declared inside method.

```java
void test() {
    int x = 10;
}
```

* Stored in stack
* No default value
* Must initialize before use

---

### 2️⃣ Instance Variable

Declared inside class but outside method.

```java
class Person {
    int age;
}
```

* Stored in heap (inside object)
* Gets default value

---

### 3️⃣ Static Variable

Belongs to class.

```java
static int count;
```

* Stored in method area (before Java 8) / metaspace
* One copy for entire class

---

## 5️⃣ Important Interview Questions

### 🔹 Q1: Where are variables stored?

Answer:

* Local → Stack
* Instance → Heap
* Static → Method Area / Metaspace

---

### 🔹 Q2: Why local variables don’t have default values?

Because JVM does not initialize stack memory automatically for performance reasons.

---

### 🔹 Q3: Difference between primitive and reference type?

Primitive:

* Stores value
* Fixed size
* Faster
* No methods

Reference:

* Stores address
* Dynamic size
* Stored in heap
* Has methods

---

### 🔹 Q4: What is default value of int instance variable?

`0`

---

### 🔹 Q5: What happens if you don’t initialize local variable?

Compilation error:

```
variable might not have been initialized
```

---

## 6️⃣ Common Traps ⚠️

### ❌ Trap 1

```java
int x;
System.out.println(x);
```

❌ Compile-time error

---

### ❌ Trap 2

```java
long l = 10000000000;
```

❌ Error
Correct:

```java
long l = 10000000000L;
```

---

### ❌ Trap 3

```java
float f = 5.5;
```

❌ Error
Correct:

```java
float f = 5.5f;
```

---

### ❌ Trap 4

char size confusion

char is **2 bytes**, not 1 byte (Unicode support).

---

## 7️⃣ How To Answer in Interview (Confident Way)

If interviewer asks:

👉 “Explain variables in Java.”

You answer:

> In Java, a variable is a named memory location used to store data. Each variable must be declared with a data type, which defines the size and type of data it can store. Variables in Java are categorized as local, instance, and static based on their scope and memory location.

Then continue with stack vs heap explanation if they ask deeper.

---

## 8️⃣ Real-Life Analogy

Primitive → like storing money in your pocket
Reference → like storing a house address in your pocket

You hold address, but actual house is somewhere else.

---



---

# ✅ 1️⃣ Why is boolean size JVM dependent?

### ✅ Correct Explanation:

Java specification does NOT define exact size of boolean.

Why?

Because boolean only stores:

* `true`
* `false`

It logically needs just **1 bit**.

But:

* JVM does not allocate memory bit-by-bit.
* Most CPUs work with **1 byte minimum**.
* In arrays, JVM may use **1 byte per boolean**.
* Internally, implementation may vary.

👉 That’s why Java says: “boolean size is JVM dependent.”

### Interview Answer:

> The Java specification does not define exact size of boolean because it only represents true or false. Internally JVM may use 1 byte or optimize differently depending on implementation.

---

# ✅ 2️⃣ Why String is not primitive?

### Why String is NOT primitive?

Primitive types:

* Store value directly
* Fixed memory size
* No methods
* Not objects

String:

* Is an object
* Stored in heap
* Has methods
* Immutable
* Supports pooling

So real reason:

> Because String has object behavior (methods, immutability, pooling, dynamic memory allocation), it cannot be primitive.

Also:

If String were primitive:

* It would not support methods like `.length()`, `.substring()`
* No immutability concept
* No String pool optimization

---

# ✅ 3️⃣ Static Variables in Java 17

### Before Java 8:

* Class metadata → Method Area (PermGen)
* Static variables → Method Area

### After Java 8 (including Java 17):

* Class metadata → Metaspace
* Static variables → **Heap**

⚠ Important:
Metaspace stores **class metadata**, NOT static variable values.

Static variables are stored:
👉 In heap
👉 Inside the Class object

---

### Deep Explanation:

When class loads:

* JVM creates a Class object in heap.
* Static variables become part of that Class object.
* Only one copy exists.

So correct interview answer:

> In modern Java (Java 8+), static variables are stored in heap memory as part of the Class object. Metaspace stores only class metadata.

---

# 🧠 Interview Trap Here

Many candidates say:
“Static variables are stored in Metaspace.”

❌ Wrong.

Metaspace = Class metadata
Heap = Objects + Static variables

---


---

## ✅ 1️⃣ Where is `static final int x = 10;` stored?

**Correct answer (deep + interview):**

* `x` is a **static field**, so it belongs to the **Class** (not object instances).
* In Java 8+ (including Java 17), **static fields live on the Heap** as part of the class’s runtime data (associated with the `Class<?>` object / class representation).
* The value `10` is a primitive constant; it doesn’t create any object.

**Extra interview point (trap):**

* For `static final` primitives, the compiler may **inline** the value into bytecode of other classes if it’s a compile-time constant.
  So sometimes you don’t even “read it” at runtime from the field (depends on usage / compilation).

**One-line interview answer:**

> Static fields are stored on the heap with the class’s runtime representation; `static final int` may also be compile-time inlined.

---

## ✅ 2️⃣ Where is `static final String s = "Vishu";` stored?

**Correct, with precision:**

* `s` (the **static reference variable**) → stored in **heap** with class data.
* `"Vishu"` (the **String object**) → stored in the **String Pool**, which is in the **heap**.
* `s` points to that pooled `"Vishu"`.

**Interview-ready:**

> The reference `s` is a static field (heap). The String literal `"Vishu"` is in the String pool (also heap). `s` points to the pooled object.

---

## ✅ 3️⃣ Why local variables don’t get default values but instance variables do?

**Polished answer:**

* **Local variables** are on the **stack** and JVM does not auto-initialize them because:

  * it avoids extra work (performance)
  * it prevents using garbage/unknown values accidentally (compiler forces initialization)
* **Instance variables** are part of an **object on the heap**.

  * When JVM allocates memory for an object, it **zero-initializes** it first (`0, false, null`)
  * then constructor runs and assigns real values.

**Interview answer:**

> Local variables must be initialized because stack memory isn’t automatically set. Instance fields get defaults because object memory is zeroed during allocation before the constructor executes.

---

# ✅ Quick Notes Summary (for your notebook)

### Static fields (Java 8+)

* **Stored:** Heap (with class runtime data)
* **Metaspace:** only class metadata (methods/constant pool/type info), not field values

### String literal

* Stored in **String Pool** (inside heap)

### Defaults

* Local: **no default**, must initialize
* Instance/static: **default values** exist

---


---

## Given:

```java
static final int A = 10;
static final Integer B = 10;
```

---

## ✅ 1️⃣ Is `A` compile-time constant?

✔ YES.

Because:

* `static`
* `final`
* primitive type
* assigned with constant expression (`10`)

So compiler treats `A` as **compile-time constant**.

It gets stored in the **constant pool** of the class file.

---

## ✅ 2️⃣ Is `B` compile-time constant?

✔ NO.

Even though:

* It is `static`
* It is `final`
* Value looks constant

But:

`Integer` is an **object**, not primitive.

So:

```java
Integer B = 10;
```

Actually becomes:

```java
Integer B = Integer.valueOf(10);
```

That means:

* Object creation / method call
* Not a pure constant expression

So it is **not compile-time constant**.

---

## ✅ 3️⃣ Which one gets inlined into other classes?

👉 Only `A` gets inlined.

Example:

Class1:

```java
static final int A = 10;
```

Class2:

```java
System.out.println(Class1.A);
```

Compiler replaces it with:

```java
System.out.println(10);
```

So Class2 does not even access Class1 at runtime.

---

But for:

```java
static final Integer B = 10;
```

Class2 must access Class1 at runtime to get B.

No inlining.

---

# 🔥 VERY IMPORTANT INTERVIEW TRAP

Suppose:

Class1:

```java
static final int A = 10;
```

Class2:

```java
System.out.println(Class1.A);
```

Now you change A to 20 in Class1 and recompile only Class1.

What happens?

👉 Class2 will still print 10
Because 10 was already inlined in its bytecode.

This is a famous interview trap.

---

# 📘 Quick Notes For Your Notebook

### Compile-time constant must be:

* static
* final
* primitive or String
* assigned with constant expression

### Objects are never compile-time constants.

---

---

# Given:

```java
static final String S = "Hello";
```

---

## ✅ 1️⃣ Is this compile-time constant?

✔ YES.

Because:

* static ✔
* final ✔
* String ✔
* assigned with literal ✔

Java treats String literals as compile-time constants.

---

## ✅ 2️⃣ Will it be inlined?

✔ YES.

If another class uses:

```java
System.out.println(Class1.S);
```

The compiler replaces it with:

```java
System.out.println("Hello");
```

No runtime lookup required.

---

## ✅ 3️⃣ Why is String allowed but Integer not?

Your idea was close, but let’s refine it properly.

### The Real Reason:

Java Language Specification defines:

A compile-time constant must be:

* primitive OR
* String literal
* assigned using constant expression

Important:

String is special because:

* String literals are stored in **constant pool**
* String is immutable
* String literal expressions are resolved at compile time

But:

```java
static final Integer B = 10;
```

This is NOT constant because:

* It requires a method call: `Integer.valueOf(10)`
* It creates/returns an object
* Object creation cannot happen at compile time
* It’s resolved at runtime

---

## 🔥 Important Interview Insight

This works:

```java
static final String S1 = "Hello";
static final String S2 = "Hel" + "lo";
```

Because `"Hel" + "lo"` is resolved at compile time.

But this:

```java
static final String S3 = new String("Hello");
```

❌ Not compile-time constant
Because `new` forces runtime object creation.

---

# 📘 Notebook Summary

Compile-time constant:

* static
* final
* primitive or String
* constant expression only
* no method calls
* no new keyword

---

# Given:

```java
static final String A = "Hello";
static final String B = A + "World";
```

---

## ✅ Is B compile-time constant?

✔ YES.

Because:

* `A` is compile-time constant
* `"World"` is literal
* `+` operation between compile-time constants
* No method call
* No `new`
* No runtime variable

So compiler resolves this as:

```java
static final String B = "HelloWorld";
```

Before bytecode generation.

---

## 🔥 Why this works?

Because Java compiler performs **constant folding**.

It evaluates constant expressions at compile time.

---

# Case 1

```java
static final String A = getValue();
static final String B = A + "World";
```

### Why NOT compile-time?

Because `getValue()` is a **method call** → value known only at **runtime**.

So `A` is not a compile-time constant, and therefore `B` cannot be either.

✅ What happens internally:

* Compiler generates bytecode that will do concatenation at runtime (typically via `StringBuilder` or `invokedynamic` depending on Java version).

---

# Case 2

```java
static final String A = "Hello";
static final String B = A + new String("World");
```

### Why NOT compile-time?

Because `new String("World")` creates an object at **runtime**.

Even though `"World"` literal is constant, the expression includes `new`, so the whole expression is not a constant expression.

✅ Runtime behavior:

* `"World"` literal exists in String pool
* `new String("World")` creates a **new heap object** (different reference)
* concatenation happens at runtime

---

# 📘 Notebook: Rule (One line)

✅ **Only expressions made purely of compile-time constants** (primitives/String literals/constant folding) are compile-time constants.
❌ Any **method call**, **new**, **non-final variable**, or **runtime value** breaks it.

---


## Code

```java
String a = "Hello";
String b = "Hel" + "lo";
String c = a + "World";
String d = "Hello" + "World";
String e = a + "lo";

System.out.println(a == b);   // ?
System.out.println(c == "HelloWorld"); // ?
System.out.println(d == "HelloWorld"); // ?
System.out.println(e == "Hello"); // ?
```

---

# ✅ Correct outputs

1. `a == b` → **true** ✅ (you were right)

* `"Hel" + "lo"` is **compile-time constant folding**
* so `b` becomes `"Hello"` in the pool
* both refer to same pooled literal

2. `c == "HelloWorld"` → **false** ❌ (you said true)

* `c = a + "World"` → `a` is a **variable**, so concatenation happens **at runtime**
* result is a **new String object on heap** (not automatically pooled)
* `"HelloWorld"` on the right is a **pooled literal**
* different references → `false`

3. `d == "HelloWorld"` → **true** ✅ (you were right)

* `"Hello" + "World"` is compile-time constant folding
* `d` points to pooled `"HelloWorld"`

4. `e == "Hello"` → **false** ✅ (you were right)

* `e = a + "lo"` is runtime concatenation (because `a` is variable)
* creates new heap String `"Hellolo"` actually? Wait carefully:

  * `a` is `"Hello"`
  * `"Hello" + "lo"` becomes `"Hellolo"` (not `"Hello"`)
    So it’s false for two reasons:
* content differs (`"Hellolo"` vs `"Hello"`)
* and reference differs anyway

✅ Final answers (4 lines):

* **true**
* **false**
* **true**
* **false**

---

# 🔥 Interview Tip (1-liner you should remember)

✅ `==` compares **references**, not content.
Compile-time concatenation → pooled; runtime concatenation → new object (unless you call `.intern()`).

---

# 🔎 Given:

```java
String a = "Hello";
String x = a + "World";
System.out.println(x.intern() == "HelloWorld");
```

---

## Step-by-step what happens

### 1️⃣ `"Hello"`

Stored in **String Pool**

### 2️⃣ `a + "World"`

Since `a` is a variable → runtime concatenation
JVM creates a **new String object in heap** (not in pool)

So now:

* `x` → heap object `"HelloWorld"`
* `"HelloWorld"` literal → in String Pool

They are different references.

---

### 3️⃣ `x.intern()`

What does `.intern()` do?

👉 It checks:

* If an equal string exists in the **String Pool**

  * return reference of pooled string
* Otherwise:

  * add it to pool and return that reference

In our case:

* `"HelloWorld"` already exists in pool
* So `intern()` returns pooled reference

Now comparison becomes:

```java
pooled "HelloWorld" == pooled "HelloWorld"
```

✔ true

---

# 🧠 Interview-Level Definition of intern()

> The `intern()` method ensures that a string is stored in the String Pool and returns the pooled reference. If the string already exists in the pool, it returns the existing reference instead of creating a new one.

---


# Code

```java
String s1 = new String("ABC");
String s2 = s1.intern();

System.out.println(s1 == s2);
```

✅ Correct — it prints **false** (in the normal/common case).

## Step-by-step

### 1️⃣ `"ABC"` literal

* When the class is loaded (or when this line executes), the literal `"ABC"` is in the **String Pool**.

### 2️⃣ `new String("ABC")`

* Creates a **new String object on the heap** (separate from the pooled one).
* `s1` points to this heap object.

So now:

* pool has `"ABC"` (pooled ref)
* heap has another `"ABC"` (s1 ref)

### 3️⃣ `s1.intern()`

* JVM checks String Pool for `"ABC"`
* It already exists, so it returns the **pooled** `"ABC"` reference.
* `s2` points to pooled string.

### 4️⃣ `s1 == s2`

* heap object reference vs pool reference → **different** → `false`

---

# ⚠️ Interview Note (extra sharp)

In some specific scenarios (especially older Java versions / particular ordering), results around `intern()` can look surprising. But for this exact code in typical modern JVM behavior, the correct expected answer is **false**, and interviewers want this explanation.

---

# ✅ Your Notes Summary (String Pool + intern traps)

* `==` checks reference (address), not content.
* String literal → goes to String Pool.
* `new String("X")` → always makes a new heap object.
* `intern()` → returns pooled reference (existing or newly added).

---
