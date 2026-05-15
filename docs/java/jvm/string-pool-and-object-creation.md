# Next (Very Important for Interviews)

## Definition

The string pool is a JVM memory area that stores string literals for reuse. Object creation is the internal JVM process that allocates memory, initializes fields, calls constructors, and assigns references.

## Why It Matters

String pool and object creation questions are common because they test whether you understand heap memory, references, literals, constructors, and `==` vs `equals()`.

## Core Example

`String s1 = "Java";` reuses a pooled literal. `String s3 = new String("Java");` creates a new object, so `s1 == s3` is usually `false`.

## Common Traps

- `==` compares references, not string content.
- String literals can be reused from the pool.
- `new String("Java")` creates a separate object.
- A constructor initializes an object; it does not allocate memory by itself.
- Runtime string concatenation behaves differently from compile-time constants.

## Interview Answer

String literals are stored in the string pool so the JVM can reuse them. When we use `new String(...)`, Java creates a new object instead of reusing only the pooled literal. During object creation, the JVM loads the class if needed, allocates memory, gives default values, runs initialization logic, calls the constructor, and stores the reference.

## Quick Revision

- String literals are pooled.
- `new String()` creates a new object.
- `==` checks reference equality.
- `equals()` checks content for strings.
- Object creation includes allocation and initialization.
- Constructors do not create memory; they initialize the object.

## Deep Dive

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


### Output

```
true
false
```

---

### Step-by-Step JVM Explanation

#### Step 1 — `"Java"` literal

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

#### Step 2 — second literal

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

#### Step 3 — `new String("Java")`

```java
String s3 = new String("Java");
```

Two things happen here.

##### 1️⃣ JVM checks String Pool

If `"Java"` exists → reuse it.

So pool remains:

```
String Pool
-----------
"Java"
```

---

##### 2️⃣ JVM creates a new object in Heap

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

### Why `s1 == s3` is false

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

### Important Interview Trap

##### Question

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

### Another Interview Trap

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

### Very Important JVM Feature — `intern()`

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

### Interview Level String Pool Question

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

### But This Changes Everything

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

### This Topic Leads to Another Deep JVM Concept

Next we should study:

### **OBJECT CREATION INSIDE JVM**

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

##### What will be the output?

```java
String s1 = "Java";
String s2 = new String("Java").intern();

System.out.println(s1 == s2);
```

Explain **why**.


> Because both **point to the same "Java" object in the String Pool**.
> `intern()` checks whether `"Java"` exists in the String Pool. If it exists, it returns that reference; otherwise it creates it in the pool and returns it.

##### Output:

```
true
```

---

### Step-by-Step JVM Execution

#### Step 1 — `"Java"` literal

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

### Step 2 — `new String("Java")`

```java
new String("Java")
```

Two things happen:

##### 1️⃣ JVM checks the pool

`"Java"` already exists.

So it reuses the pool literal.

##### 2️⃣ JVM creates a new String object in heap

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

### Step 3 — `.intern()`

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

### Final Memory

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

### Final Comparison

```
s1 == s2
```

Both point to the **same pool object**.

```
true
```

---

### Important Interview Trap

This question often comes next.

##### What is the difference?

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

### Very Famous Interview Puzzle

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

### Senior Interview Level Question

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

### Now we move to a **very important JVM topic**

This is **asked in Amazon / Flipkart / backend interviews**.

### Object Creation Inside JVM

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

##### What will be the output?

```java
String s1 = "Java";
String s2 = "Ja" + new String("va");

System.out.println(s1 == s2);
```

Explain **why**. This tests **compile-time vs runtime string creation**, which is a very common JVM interview topic.


> This **is not a compile-time constant**.

##### Output:

```
false
```

---

### Step-by-Step JVM Execution

#### Step 1 — `"Java"`

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

### Step 2 — `"Ja"`

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

### Step 3 — `new String("va")`

Two things happen.

##### Pool check

```
"va"
```

If not present → add to pool.

##### Heap object creation

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

### Step 4 — String Concatenation

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

### Final Memory

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

### Final Comparison

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

### Important Interview Rule

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

### But if any part is runtime

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

### Quick Interview Summary

| Expression         | Result                 |
| ------------------ | ---------------------- |
| "Ja" + "va"        | Compile-time constant  |
| "a" + variable     | Runtime concatenation  |
| new String("Java") | Heap object            |
| intern()           | Returns pool reference |


---

### Next Topic: Object Creation Inside JVM

When JVM executes:

```java
Person p = new Person("Vishu");
```

most people say only:

* object created in heap
* reference stored in stack

That is correct, but **interviewers want deeper internal steps**.

---

### Internal Steps of Object Creation in JVM

#### Code

```java
Person p = new Person("Vishu");
```

JVM internally does roughly this sequence:

##### 1. Class is loaded

If `Person.class` is not loaded yet, JVM loads it through the **ClassLoader subsystem**.

It loads:

* class metadata
* fields
* methods
* constructor info
* constant pool references

---

##### 2. Class linking happens

Linking has 3 parts:

###### a) Verification

JVM checks bytecode is valid or not.

Examples:

* illegal bytecode?
* stack usage valid?
* type safety correct?

###### b) Preparation

Memory is allocated for **static variables** and they get default values.

Example:

```java
static int x = 10;
```

During preparation:

* memory allocated for `x`
* first default value becomes `0`

Actual `10` comes later in initialization.

###### c) Resolution

Symbolic references are converted to direct references.

Example:
class/method/field names are resolved internally.

---

##### 3. Class initialization happens

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

##### 4. JVM checks memory in heap

JVM now checks whether enough heap space is available for the new object.

If not, it may try GC.

If still not enough:

```java
OutOfMemoryError
```

---

##### 5. Memory is allocated for object

Memory is allocated in **heap**, usually in **Eden space**.

This memory includes:

* object header
* instance fields
* padding if required

---

### Object Memory Layout

A Java object generally contains:

#### 1) Object Header

Contains JVM internal information such as:

* class metadata pointer
* hash code info
* GC age
* lock status

#### 2) Instance Data

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

#### 3) Padding

Extra bytes may be added for memory alignment.

---

##### 6. Default initialization of instance fields

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

##### 7. Constructor executes

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

##### 8. Reference is assigned to variable

Now the object reference is stored in local variable `p` inside the current stack frame.

So final result:

* object → heap
* `p` reference → stack frame of current method

---

### Full Flow in One Line

```text
Class Load → Link → Initialize → Allocate Heap Memory → Default Values → Constructor Runs → Reference Assigned
```

---

### Important Interview Trap

#### Does constructor create the object?

**No.**

This is a very common trap.

Correct answer:

* JVM allocates memory and creates the object first
* then constructor initializes it

So constructor does **not create**
the object; it **initializes** the already created object.

---

### Example

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

### Interview Question

#### Why can constructor use `this`?

Because the object is already allocated before constructor body executes.

That is why `this` is available inside constructor.

---

### Another Important Trap

#### Where does constructor code live?

Constructor code is part of the **class metadata / bytecode**, not inside heap object.

* constructor definition → class area / metaspace side
* object data → heap

---

### Visual Memory View

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

### Interview Questions from This Topic

#### 1. What happens first: constructor call or memory allocation?

**Memory allocation happens first.**

#### 2. Are fields initialized before constructor?

**Yes.** Default values first, then constructor values.

#### 3. Does `new` only call constructor?

**No.** It also triggers object memory allocation and initialization steps.

#### 4. Where is object header stored?

**Inside the object in heap memory.**

---

### Dry Run Example

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

##### Step by step:

###### Step 1

`Person.class` loaded if not already loaded.

###### Step 2

Heap memory allocated for `Person` object.

###### Step 3

Default values assigned:

```java
age = 0
name = null
```

###### Step 4

Constructor runs:

```java
name = "Vishu"
age = 25
```

###### Step 5

Reference stored in `p`.

Final object:

```java
age = 25
name = "Vishu"
```

---

### Common Interview Traps

#### Trap 1

**Object is created in stack.**
❌ Wrong

Object is created in **heap**.

#### Trap 2

**Constructor creates object.**
❌ Wrong

Constructor only initializes object.

#### Trap 3

**Fields directly get assigned constructor values first.**
❌ Wrong

Default initialization happens first.

#### Trap 4

**Reference variable stores full object.**
❌ Wrong

Reference variable stores only address/reference.

---

### Mini Interview Quiz

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

##### Tell me:

1. Where is `x` stored?
2. Where is `y` stored?
3. What value is printed, and why?
4. Does constructor create the object or initialize it?


### 1️⃣ Where is `x` stored?

##### Answer:

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

### 2️⃣ Where is `y` stored?

##### Answer:

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

### 3️⃣ What value prints?

##### Answer:

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

### 4️⃣ Does constructor create object?

##### Answer:

> Constructor initialize the object, does not create it

✔ Correct.

Important interview statement:

```
Object creation = JVM responsibility
Constructor = object initialization
```

---

### Excellent Progress 👍

You are now covering **real JVM interview topics**, not just syntax.

Now we move to the **next big JVM subsystem**.

---
