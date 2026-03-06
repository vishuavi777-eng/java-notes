# 📚 Type Conversion & Casting In Java

## 1️⃣ Basic Definition (Interview Style)

Type conversion is the process of converting one data type into another.
In Java, it happens in two ways:

* **Implicit (Widening)**
* **Explicit (Narrowing / Casting)**

---

# 2️⃣ Implicit Type Conversion (Widening)

Also called: **Automatic Casting**

When:

* Smaller type → Larger type
* No data loss

Example:

```java
int x = 10;
long y = x;   // automatic
```

### Why allowed?

Because:

* `long` (8 bytes) can hold `int` (4 bytes)
* No information lost

---

## Primitive Widening Order (Very Important)

```
byte → short → int → long → float → double
           char ↗
```

⚠ `boolean` cannot be converted to any other type.

---

## Example

```java
byte b = 10;
int i = b;      // OK
double d = i;   // OK
```

---

# 3️⃣ Explicit Type Conversion (Narrowing)

When:

* Larger type → Smaller type
* Possible data loss
* Must use casting operator

Example:

```java
double d = 10.5;
int x = (int) d;
```

Output:

```
10
```

Decimal part removed (not rounded).

---

# ⚠️ Data Loss Example

```java
int x = 130;
byte b = (byte) x;
System.out.println(b);
```

Output:

```
-126
```

Why?

Because:

* byte range: -128 to 127
* 130 exceeds range
* Overflow happens
* Binary truncation

This is very common interview trap.

---

# 4️⃣ Important Interview Traps

---

## 🔥 Trap 1: Arithmetic Promotion

```java
byte a = 10;
byte b = 20;
byte c = a + b;  // ERROR
```

Why error?

Because:

* `a + b` automatically promoted to `int`
* So result is `int`
* Cannot assign int to byte without casting

Correct:

```java
byte c = (byte)(a + b);
```

---

## 🔥 Trap 2: Char + Int

```java
char c = 'A';
int x = c;   // OK
```

Output:

```
65
```

Because char stores Unicode value.

---

## 🔥 Trap 3: Final Keyword Trick

```java
final int x = 10;
byte b = x;   // OK
```

Why?

Because `x` is compile-time constant within range of byte.

But:

```java
int x = 10;
byte b = x;   // ERROR
```

Even though value same.

Interviewers love this.

---

# 5️⃣ Reference Type Casting

There are two:

## Upcasting (Automatic)

```java
Animal a = new Dog();
```

Child → Parent
Safe
No cast needed

---

## Downcasting (Explicit)

```java
Animal a = new Dog();
Dog d = (Dog) a;
```

Parent → Child
Needs cast
May cause `ClassCastException`

---

# ⚠️ Dangerous Trap

```java
Animal a = new Animal();
Dog d = (Dog) a;  // Compiles but runtime exception
```

---

# 6️⃣ How to Answer in Interview

If interviewer asks:

👉 “Explain type casting in Java.”

Answer:

> In Java, type conversion happens either automatically (widening) when converting smaller types to larger types, or explicitly (narrowing) when converting larger types to smaller types which may cause data loss. Java also supports reference type casting through upcasting and downcasting.

---

# 📘 Notes Summary

* Widening → safe → automatic
* Narrowing → data loss → manual cast
* Arithmetic → smaller types become int
* boolean → no conversion
* Object casting → runtime type matters

---


# Question 1

```java
int x = 5;
double y = x / 2;
System.out.println(y);
```

## Step-by-step:

* `x` is int (5)
* `2` is int
* So `x / 2` → **integer division**
* 5 / 2 = 2 (decimal part discarded)

Then:

* `double y = 2;`
* int 2 is widened to double → 2.0

### ✅ Output:

```
2.0
```

✔ It is integer division (fraction part removed)

---

# Question 2

```java
double y = 5 / 2;
System.out.println(y);
```

* 5 is int
* 2 is int
* division happens BEFORE assignment

So result?

👉 It is still integer division.

So:

5 / 2 = 2
Then 2 → converted to double → 2.0

### ✅ Output:

```
2.0
```

Many beginners say 2.5.
That is wrong.

---

# If you want 2.5

You must make one operand double:

```java
double y = 5 / 2.0;
```

or

```java
double y = (double)5 / 2;
```

---

# Question 3

Why does Java promote byte/short to int in arithmetic?

This is important.

### Reason:

CPU works efficiently with at least 32-bit integers.

So Java promotes:

* byte
* short
* char

to int before arithmetic operations.

This is called **Integer Promotion Rule**.

Example:

```java
byte a = 10;
byte b = 20;
int c = a + b;   // promoted to int
```

Even though both are byte,
addition happens in int.

---

```java
System.out.println(5 / 2.0);
```

* 2.0 is double
* int 5 is promoted to double
* double division → **2.5**

---

```java
System.out.println(5.0 / 2);
```

* 5.0 is double
* int 2 promoted to double
* double division → **2.5**

---

```java
System.out.println(5.0 / 2.0);
```

* both double
* double division → **2.5**

---

# 🔥 Golden Rule (Write in your notes)

If **any one operand is double**, the entire expression becomes double.

If both operands are int → integer division.

---


# Code

```java
System.out.println(5 / 2 * 1.0);
System.out.println(5 * 1.0 / 2);
```

---

# 1️⃣ `5 / 2 * 1.0`

Operator precedence:

* `/` and `*` have same precedence
* evaluated left to right

So:

Step 1:

```
5 / 2
```

Both int → integer division → 2

Step 2:

```
2 * 1.0
```

Now one operand is double → result becomes double → 2.0

✅ Output:

```
2.0
```

---

# 2️⃣ `5 * 1.0 / 2`

Step 1:

```
5 * 1.0
```

int promoted to double → 5.0

Step 2:

```
5.0 / 2
```

double division → 2.5

✅ Output:

```
2.5
```

---

# 🔥 What Interviewer Tests Here

They test:

* Order of evaluation
* Type promotion
* Integer division behavior
* Expression evaluation left to right

---

# 📘 Write This Rule in Notes

Arithmetic operators evaluate left to right.
Type promotion happens at the time of operation, not at assignment.

---


# ✅ Why It Does NOT Compile

```java
byte b = 100;
b = b + 1;
```

### Step-by-step:

* `b` is byte
* `1` is int (default literal type)
* In arithmetic, byte is promoted to int
* So `b + 1` becomes int
* Cannot assign int to byte without casting

So compiler error:

```
possible lossy conversion from int to byte
```

---

# ✅ Correct Version

```java
b = (byte) (b + 1);
```

Now it compiles.

---


# 🔥 Why Does This Compile?

```java
byte b = 100;
b += 1;  // ✅ compiles!
```

Even though `b = b + 1;` does NOT compile,
this `b += 1;` version **DOES** compile.

---

## ✅ Reason:

Java applies **implicit cast** in compound assignment (`+=`, `-=`, `*=`, etc.)

The compiler **automatically inserts a cast**, like:

```java
b = (byte)(b + 1);
```

So:

> "compiler resolves `b += 1` as `b = (byte)(b + 1);`" ✅

---

# ⚠ Why Does This Rule Exist?

To make code cleaner:

* Compound operators (`+=`, `-=`) were designed to allow implicit narrowing cast
* But direct assignment (`b = b + 1;`) does not allow implicit cast
* This is how Java maintains **strict typing** and **convenient shorthand** at the same time

---

# 📘 Write in Your Notes

```java
byte b = 100;
b = b + 1;       // ❌ Compilation error (int → byte)
b += 1;          // ✅ Compiles (implicit cast)
```

Same applies to:

```java
short s = 10;
s = s * 2;      // ❌
s *= 2;         // ✅
```

---