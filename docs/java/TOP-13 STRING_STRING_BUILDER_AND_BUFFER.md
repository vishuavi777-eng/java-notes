
# 📚 String / BUILDER / BUFFER

# String in Java (Deep)

## 1) What is String?

`String` is a **reference type (class)** that represents immutable text.

### Most important property

✅ **Immutability**: once created, the characters inside a String never change.

When you “modify” a String, Java creates a **new String object**.

---

## 2) Why String is immutable (interview depth)

Main reasons:

1. **Security**: Strings are used in class loading, file paths, DB URLs, tokens, etc. If mutable, a reference shared somewhere could be altered.
2. **String Pool optimization**: immutability makes pooling safe.
3. **Hashing**: Strings are keys in HashMap/HashSet. If content changed after hashing, map breaks.
4. **Thread safety**: immutable objects are inherently thread-safe.

Interview one-liner:

> String is immutable for security, pooling, caching of hashcode, and safe use as map keys.

---

## 3) String Pool (very important)

### Where it is

✅ String Pool is in the **heap** (Java 7+). (In older Java it was in PermGen.)

### What goes into pool

* **String literals**: `"Vishu"`
* **Compile-time constant concatenations**: `"Hel" + "lo"`
* Strings added by calling `.intern()`

### What does NOT automatically go to pool

* `new String("X")` (creates a new heap object)
* runtime concatenation like `a + "World"` (usually creates a new heap string)

---

## 4) `==` vs `.equals()` (must be perfect)

* `==` compares **references** (same object?)
* `.equals()` compares **content** (same characters?)

Examples:

```java
String a = "Hello";
String b = "Hello";
System.out.println(a == b);      // true (same pooled literal)
System.out.println(a.equals(b)); // true

String c = new String("Hello");
System.out.println(a == c);      // false (different object)
System.out.println(a.equals(c)); // true
```

---

## 5) What happens in concatenation (`+`)

This is a huge interview area.

### Case A: compile-time concat

```java
String s = "Hel" + "lo";
```

✅ compiler folds it into `"Hello"` → pooled.

### Case B: runtime concat

```java
String a = "Hel";
String s = a + "lo";
```

✅ happens at runtime → typically uses **StringBuilder** under the hood → result is a new String (not pooled unless interned).

In modern Java, concatenation may use `invokedynamic`, but conceptually:

> runtime concatenation creates new objects.

---

## 6) `intern()` (pool control)

`intern()` returns pooled reference:

* if exists, returns existing pooled one
* else adds to pool and returns it

```java
String x = new String("ABC");  // heap
String y = x.intern();         // pool ref
System.out.println(x == y);    // false
```

---

# StringBuilder (Deep)

## 1) What is StringBuilder?

A **mutable** sequence of characters. Used to build strings efficiently.

Key properties:

* mutable
* **not thread-safe**
* faster than StringBuffer in single-thread

Example:

```java
StringBuilder sb = new StringBuilder("Hi");
sb.append(" Vishu");
System.out.println(sb.toString());
```

## 2) Why it’s faster than String in loops

String is immutable → every `+` can create new objects.

Bad:

```java
String s = "";
for (...) s = s + i; // creates many objects
```

Good:

```java
StringBuilder sb = new StringBuilder();
for (...) sb.append(i);
String s = sb.toString();
```

## 3) Capacity growth (interview)

StringBuilder has:

* **length** = number of characters currently stored
* **capacity** = internal allocated buffer size

Default capacity is typically **16** (empty builder), and growth often follows:

> newCapacity = oldCapacity * 2 + 2

You can set initial capacity to avoid resizing:

```java
new StringBuilder(1000)
```

---

# StringBuffer (Deep)

## 1) What is StringBuffer?

Same concept as StringBuilder but:
✅ **thread-safe** (methods are synchronized)
❌ slower than StringBuilder in single-thread

When to say in interview:

* Single-thread code → prefer **StringBuilder**
* Multi-thread shared mutable text → **StringBuffer** (or better: avoid sharing mutable state)

---

# The Core Comparison Table (Interview)

| Feature     | String                       | StringBuilder          | StringBuffer               |
| ----------- | ---------------------------- | ---------------------- | -------------------------- |
| Mutability  | Immutable                    | Mutable                | Mutable                    |
| Thread-safe | Yes (immutable)              | No                     | Yes (synchronized)         |
| Performance | Slow in heavy concat         | Fastest                | Slower than SB             |
| Typical use | constants, keys, text values | loops, building output | shared mutable text (rare) |

---

# Top Interview Traps (String / SB / SBuf)

## Trap 1: `String` + loop

`O(n²)` style behavior due to repeated allocations.

## Trap 2: `==` works sometimes

Because of pooling, `==` may return true for literals, but it’s not content comparison.

## Trap 3: `new String("X")`

Creates a new object even though `"X"` already exists in pool.

## Trap 4: `final StringBuilder`

`final` stops reassignment, but you can still append (object is mutable).

---

# How to Answer in Interview (ready answer)

If interviewer asks: **“String vs StringBuilder vs StringBuffer?”**

You answer:

> String is immutable and safe for constants and keys. For frequent modifications or concatenation, use StringBuilder because it’s mutable and fast but not thread-safe. StringBuffer is also mutable but synchronized, so it’s thread-safe but slower.

---

# Quick depth test (to confirm nothing missed)

Answer these (just outputs):

1.

```java
String a = "Hello";
String b = "Hel" + "lo";
System.out.println(a == b);
```

2.

```java
String a = "Hel";
String b = a + "lo";
System.out.println(b == "Hello");
```

3.

```java
String x = new String("Hi");
System.out.println(x == "Hi");
System.out.println(x.intern() == "Hi");
```

✅ Output(ordered):

```
1. true
2. false
3.
false
true
```

# 🔎 Why Each Answer Is Correct (JVM-Level Thinking)

---

## 1️⃣

```java
String a = "Hello";
String b = "Hel" + "lo";
System.out.println(a == b);
```

### What happens?

`"Hel" + "lo"` is **compile-time constant expression**.

Compiler converts it to:

```java
String b = "Hello";
```

So both `a` and `b` point to same pooled object.

✔ Output: `true`

---

## 2️⃣

```java
String a = "Hel";
String b = a + "lo";
System.out.println(b == "Hello");
```

Now this is **runtime concatenation**.

Because `a` is a variable.

Internally something like:

```java
new StringBuilder().append(a).append("lo").toString();
```

So:

* `"Hello"` literal → pool
* `b` → new heap object

References different → `false`

✔ Output: `false`

---

## 3️⃣

```java
String x = new String("Hi");
System.out.println(x == "Hi");
System.out.println(x.intern() == "Hi");
```

Step-by-step:

* `"Hi"` literal → pool
* `new String("Hi")` → new heap object

So:

```
x == "Hi" → false
```

Then:

```
x.intern() → returns pooled reference
```

So:

```
x.intern() == "Hi" → true
```

✔ Output:

```
false
true
```

---

# 🧠 Now We Go EVEN Deeper

## 🔥 Question: Where exactly does String store characters?

Before Java 9:

* internally stored in `char[]`

After Java 9:

* uses `byte[]`
* plus a `coder` flag (LATIN1 or UTF16)

This reduces memory usage for ASCII strings.

Interview bonus answer:

> Since Java 9, String uses a byte array with a coder flag to optimize memory.

---

# 🔥 String Immutability Deep Trap

Predict output:

```java
String s = "Java";
s.concat("8");
System.out.println(s);
```

---

✅ Ouput:

```text
Java
```

---

# Why? (Deep Understanding)

```java
String s = "Java";
s.concat("8");
System.out.println(s);
```

Important:

* `String` is immutable.
* `concat()` does **not modify** the existing object.
* It returns a **new String**.

So internally:

```java
String temp = s.concat("8");  // creates "Java8"
```

But you ignored the returned value.

So `s` still points to:

```text
"Java"
```

---

# 🧠 Interview One-Liner

> String methods like `concat()`, `replace()`, `substring()` return a new object. They do not modify the original string.

---

# 🔥 If You Change This

```java
String s = "Java";
s = s.concat("8");
System.out.println(s);
```

Now output:

```text
Java8
```

Because now `s` points to new object.

---

# 🚀 Now Going Deeper: StringBuilder Internal Behavior

## 1️⃣ Capacity vs Length (Very Important)

```java
StringBuilder sb = new StringBuilder();
```

Default:

* capacity = 16
* length = 0

If you do:

```java
sb.append("Hello");
```

* length = 5
* capacity still 16

If you exceed capacity, it resizes.

---

## 🔥 Resizing Formula (Interview Favorite)

When capacity exceeded:

```
newCapacity = (oldCapacity * 2) + 2
```

Example:

* 16 → 34
* 34 → 70

You can avoid resizing by:

```java
new StringBuilder(1000);
```

---

# 🔥 Performance Comparison (Very Important)

In loops:

❌ Bad:

```java
String s = "";
for(int i = 0; i < 10000; i++)
    s += i;
```

Creates thousands of objects.

✔ Good:

```java
StringBuilder sb = new StringBuilder();
for(int i = 0; i < 10000; i++)
    sb.append(i);
```

---

# 🔥 Now Advanced Trap

Predict output:

```java
StringBuilder sb1 = new StringBuilder("Hello");
StringBuilder sb2 = sb1;

sb1.append(" World");

System.out.println(sb2);
```

✅ Ouput:

```text
Hello World
```

---

# Why? (Deep Understanding)

```java
StringBuilder sb1 = new StringBuilder("Hello");
StringBuilder sb2 = sb1;
```

Important:

* `sb1` and `sb2` point to the **same object**
* No new object created in second line

Memory:

```
Heap:
[StringBuilder object: "Hello"]

Stack:
sb1 → (ref)
sb2 → (same ref)
```

Then:

```java
sb1.append(" World");
```

Since `StringBuilder` is **mutable**, the same object is modified.

So printing `sb2` shows:

```text
Hello World
```

---

# 🧠 Interview Rule

> StringBuilder is mutable. If two references point to the same object, changes through one reference are visible through the other.

---

# 🔥 Now Slightly Tricky Comparison

Predict output:

```java
StringBuilder sb1 = new StringBuilder("Hi");
StringBuilder sb2 = new StringBuilder("Hi");

System.out.println(sb1 == sb2);
System.out.println(sb1.equals(sb2));
```


✅ Ouput:

```
false
false
```

---

# Why?

```java
StringBuilder sb1 = new StringBuilder("Hi");
StringBuilder sb2 = new StringBuilder("Hi");
```

These are **two different objects** in heap.

---

## 1️⃣ `sb1 == sb2`

`==` compares references.

Different objects → different references →
✔ `false`

---

## 2️⃣ `sb1.equals(sb2)`

Here is the important part:

`StringBuilder` does **NOT override equals()**.

So it inherits `Object.equals()` which is basically:

```java
return this == obj;
```

So it again compares references.

Therefore:

✔ `false`

---

# 🔥 Very Important Interview Insight

`String` overrides `equals()` → compares content
`StringBuilder` does NOT override `equals()` → compares reference

---

# 🔥 Now If You Do This

```java
System.out.println(sb1.toString().equals(sb2.toString()));
```

Now output would be:

```
true
```

Because now you are comparing two String objects with content comparison.

---

# 🧠 Interview One-Liner

> StringBuilder does not override equals(), so equals() behaves like == (reference comparison).

---

# 🚀 Now We Go Even Deeper

## Question:

What is the output?

```java
String s1 = "abc";
String s2 = s1.replace('a', 'z');

System.out.println(s1);
System.out.println(s2);
```

✅ Output:

```text
abc
zbc
```

### Why (deep but crisp)

* `String` is immutable
* `replace()` returns a **new String**
* `s1` still points to `"abc"`
* `s2` points to `"zbc"`

---

# Now we go deeper: StringBuilder vs StringBuffer (Thread safety + performance)

## 1) StringBuilder vs StringBuffer

Both are mutable, but:

* **StringBuilder**: not synchronized → faster → use in single-thread
* **StringBuffer**: synchronized → thread-safe → slower

Interview one-liner:

> Use StringBuilder in single-threaded code; use StringBuffer only when multiple threads mutate the same instance.

---

# Very important: `StringBuilder` method chaining

```java
StringBuilder sb = new StringBuilder();
sb.append("A").append("B").append(10);
System.out.println(sb); // AB10
```

Because append returns `this`.

---

# 🔥 Next Interview Trap: `StringBuilder` reverse

Predict output:

```java
StringBuilder sb = new StringBuilder("abc");
String s = sb.reverse().toString();
System.out.println(sb);
System.out.println(s);
```

✅ output:

```text
cba
cba
```

---

# Why? (Deep Understanding)

```java
StringBuilder sb = new StringBuilder("abc");
String s = sb.reverse().toString();
```

Important:

* `reverse()` modifies the **same StringBuilder object**
* It does NOT create a new one
* It returns `this`

So after:

```java
sb.reverse();
```

The internal buffer becomes:

```text
"cba"
```

Then:

```java
s = sb.toString();
```

Now `s` is a new **String object** containing `"cba"`.

---

## Final State

* `sb` → mutable object → `"cba"`
* `s` → immutable String → `"cba"`

So both print:

```text
cba
cba
```

---

# 🔥 Very Important Difference

If this was String:

```java
String s = "abc";
s.reverse();  // ❌ no such method
```

Because String is immutable and does not provide reverse.

---

# 🧠 Interview Rule

> StringBuilder methods like `append()`, `insert()`, `reverse()` modify the same object and return `this`.

---

# 🚀 Now Next Deep Trap

Predict output:

```java
String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");

System.out.println(s1 == s2);
System.out.println(s1 == s3);
System.out.println(s1.equals(s3));
```

✅ Output:

```
true
false
true
```

Now let’s lock this deeply in your brain (interview depth).

---

# 🔎 Why Each Line Prints That

```java
String s1 = "Java";
String s2 = "Java";
```

Both are **string literals**.

* JVM checks String Pool
* `"Java"` already exists
* `s1` and `s2` point to same pooled object

So:

```java
s1 == s2  → true
```

---

```java
String s3 = new String("Java");
```

This creates:

1. `"Java"` in pool (if not already there)
2. A **new object in heap**

So:

```java
s1 == s3  → false
```

Different objects.

---

```java
s1.equals(s3) → true
```

Because `.equals()` compares content, not reference.

---

# 🧠 Interview One-Liner

> `==` checks reference. `.equals()` checks content. String literals are pooled, but `new String()` always creates a new object.

---

# 🚀 Now We Go Even Deeper (Compile-Time Constant Trap)

Predict output:

```java
final String s1 = "Hello";
String s2 = "Hello";
String s3 = s1 + "World";
String s4 = "HelloWorld";

System.out.println(s3 == s4);
```

✅ output:

```
true
```

Now let’s understand **why** (this is important interview depth).

---

# Why `true`?

```java
final String s1 = "Hello";
String s3 = s1 + "World";
```

Because `s1` is:

* `final`
* initialized with a **compile-time constant**

The compiler treats `s1` as a constant.

So this:

```java
s1 + "World"
```

Is converted at compile time into:

```java
"HelloWorld"
```

So effectively:

```java
String s3 = "HelloWorld";
```

Now:

```java
String s4 = "HelloWorld";
```

Both `s3` and `s4` refer to the same pooled literal.

So:

```java
s3 == s4 → true
```

---

# 🔥 Now Change Slightly

Predict output:

```java
String s1 = "Hello";   // not final
String s3 = s1 + "World";
String s4 = "HelloWorld";

System.out.println(s3 == s4);
```

✅ Output is **false**.

---

# Why?

```java
String s1 = "Hello";   // not final
String s3 = s1 + "World";
```

Because `s1` is **not final**, the compiler cannot treat `s1` as a compile-time constant.

So `s1 + "World"` becomes **runtime concatenation**, producing a **new String object** (on heap).

Meanwhile:

```java
String s4 = "HelloWorld";
```

is a pooled literal.

So references are different:

* `s3` → heap string `"HelloWorld"` (created at runtime)
* `s4` → pooled `"HelloWorld"`

Therefore:

```text
false
```

---

# ✅ Deep Notes Summary for String / StringBuilder / StringBuffer

### String

* Immutable
* Pooling of literals
* `==` vs `.equals()`
* `intern()` returns pooled reference
* Runtime concat creates new objects

### StringBuilder

* Mutable
* Not thread-safe
* Best for loops / heavy concatenation
* `equals()` is reference-based (not content)

### StringBuffer

* Mutable + synchronized (thread-safe)
* Slower than StringBuilder
* Rarely needed unless shared across threads

---

## Final high-value interview question

Why is `String` immutable but `StringBuilder` mutable?
Answer in 3–4 lines (interview style).

```text
because in java string is frequently used in map, json, constants. so making it immutable give best performance to handle it inside string pool. String builder is mutable because it separate class than string. it specially designed to handle heavy concat nations during runtime. it avoid rapidly instant creations when heavily concat nation happen.
```

---

# ✅ Perfect Interview Answer

> String is immutable to ensure security, enable safe string pooling, allow caching of hash codes, and make it thread-safe. Since Strings are widely used as keys in HashMap, file paths, class names, and constants, immutability prevents unexpected modification.
>
> StringBuilder, on the other hand, is mutable and designed for efficient string manipulation during runtime, especially for heavy concatenation, to avoid frequent object creation and improve performance.

---

# 🔥 Now Let’s Go EVEN Deeper (Senior-Level Depth)

## 1️⃣ String as HashMap Key (VERY IMPORTANT)

Because String is immutable:

```java
Map<String, String> map = new HashMap<>();
map.put("key", "value");
```

When String is used as key:

* hashCode is computed once
* It can be cached
* Since content never changes → hashCode stays stable

If String were mutable:

* Changing content after putting into map
* hashCode changes
* Map breaks

This is a huge reason for immutability.

---

## 2️⃣ HashCode Caching (Deep JVM Insight)

Inside String class:

```java
private int hash;
```

When hashCode() is first called:

* It computes and stores in `hash`
* Next time it returns cached value

This is possible only because String is immutable.

---

## 3️⃣ Security Reason (Important)

Imagine:

```java
String path = "/secure/path";
```

If String was mutable:

* Another thread could modify path
* Security hole

Immutability prevents that.

---

## 4️⃣ Performance Misconception (Important)

Many think:

> String is immutable for performance.

Actually:

* String immutability enables pooling
* Pooling improves memory usage
* But heavy concatenation with String is slow

So for performance:

* Use StringBuilder for runtime modification
* Use String for constant values

---

# 🔥 Now Final Advanced Trap

Predict output:

```java
String s1 = "abc";
String s2 = new String("abc");
String s3 = s2.intern();

System.out.println(s1 == s3);
```

✅ Output:

```
true
```

---

# Why? (Deep JVM-Level Explanation)

```java
String s1 = "abc";
```

* `"abc"` literal goes into the **String Pool**.
* `s1` points to pooled object.

```java
String s2 = new String("abc");
```

* `"abc"` literal already exists in pool.
* `new String("abc")` creates a **new heap object**.
* `s2` points to heap object.

```java
String s3 = s2.intern();
```

What `intern()` does:

* If the string already exists in pool → return pooled reference.
* If not → add to pool and return it.

Since `"abc"` already exists in pool:

```java
s3 → pooled "abc"
```

So:

```java
s1 == s3 → true
```

---

# 🔥 Ultra Deep Insight (Senior Level)

### Important behavior difference (Java 6 vs Java 7+)

Before Java 7:

* Pool was in PermGen.
* `intern()` sometimes copied strings into pool.

After Java 7:

* Pool is in heap.
* `intern()` may reuse existing object instead of copying.

You don’t need extreme JVM internals for interviews, but knowing this gives extra confidence.

---

# 🧠 Now One Slightly Tricky Variant

Predict output:

```java
String s1 = new String("abc");
String s2 = s1.intern();
String s3 = "abc";

System.out.println(s2 == s3);
```

✅ Output — it prints **true**.

### Why (short but deep)

* `s1` is a new heap String.
* `s2 = s1.intern()` returns the **pooled** `"abc"` reference.
* `s3 = "abc"` is also the **pooled** `"abc"` reference.
  So `s2` and `s3` point to the same pooled object → `true`.

---

# ✅ We’ve Finished String / StringBuilder / StringBuffer in Depth

To make sure **no point is missed**, here is the complete checklist we covered (and you can use this as notes):

## String

* Immutable and reasons (security, pooling, hash caching, thread safety)
* String pool behavior (literals, compile-time constants, intern)
* `==` vs `.equals()`
* runtime concat vs compile-time concat
* `new String("x")` behavior
* Java 9+ compact strings concept (byte[] + coder)

## StringBuilder

* Mutable, append/insert/reverse modify same object
* Capacity vs length + resizing idea
* Why faster in loops
* `equals()` not overridden (reference comparison)

## StringBuffer

* Thread-safe via synchronization
* Slower than StringBuilder
* When to use (rare)