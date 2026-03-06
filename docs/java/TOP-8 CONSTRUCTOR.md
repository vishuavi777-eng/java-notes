# 📚 Constructors

## Definition (Interview Style)

> A constructor is a special method used to initialize objects. It has the same name as the class and has no return type.

---

## Basic Example

```java
class Person {
    int age;

    Person(int age) {
        this.age = age;
    }
}
```

When you write:

```java
Person p = new Person(20);
```

JVM does:

1. Allocate memory in heap
2. Set default values
3. Call constructor
4. Assign provided values

---

# 📘 2️⃣ Execution Order in Inheritance (VERY IMPORTANT)

Consider:

```java
class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {
    Child() {
        System.out.println("Child constructor");
    }
}
```

When you write:

```java
new Child();
```

### Output:

```
Parent constructor
Child constructor
```

Why?

Because:

👉 `super()` is automatically inserted as first line in child constructor.

---

# 📘 3️⃣ `this()` vs `super()`

## Rule (Memorize)

* `this()` calls another constructor in same class
* `super()` calls parent constructor
* Must be first line
* Cannot use both together

---

## Example of `this()`

```java
class Test {
    Test() {
        this(10);
        System.out.println("Default");
    }

    Test(int x) {
        System.out.println("Parameterized");
    }
}
```

When:

```java
new Test();
```

Output:

```
Parameterized
Default
```

---

# 📘 4️⃣ Initialization Blocks

There are two types:

### 1️⃣ Instance Initialization Block

```java
{
   System.out.println("Instance block");
}
```

Runs:
👉 Every time object is created
👉 Before constructor body

---

### 2️⃣ Static Initialization Block

```java
static {
   System.out.println("Static block");
}
```

Runs:
👉 Only once
👉 When class is loaded

---

# 🔥 Execution Order (VERY IMPORTANT)

When object is created:

1. Static variables
2. Static blocks
3. Instance variables
4. Instance blocks
5. Constructor

In inheritance:

Parent static
Child static
Parent instance
Parent constructor
Child instance
Child constructor

---

# 🔥 Interview-Level Trap

Predict output:

```java
class Parent {
    static {
        System.out.println("Parent static");
    }

    {
        System.out.println("Parent instance");
    }

    Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {
    static {
        System.out.println("Child static");
    }

    {
        System.out.println("Child instance");
    }

    Child() {
        System.out.println("Child constructor");
    }
}

public class Test {
    public static void main(String[] args) {
        new Child();
    }
}
```

✅ Output:

```
Parent static
Child static
Parent instance
Parent constructor
Child instance
Child constructor
```

---

# ✅ Why This Order Happens (Interview-Level Explanation)

When `new Child()` runs:

---

## 🔹 Step 1: Class Loading Phase (Only once)

1️⃣ Parent static block
2️⃣ Child static block

Static blocks run:

* Once
* When class is loaded
* Parent loads before child

---

## 🔹 Step 2: Object Creation Phase

Now instance-level execution begins.

### Order in inheritance:

3️⃣ Parent instance block
4️⃣ Parent constructor
5️⃣ Child instance block
6️⃣ Child constructor

---

# 🧠 Golden Rule (Memorize This)

When creating child object:

```
Parent static
Child static
Parent instance
Parent constructor
Child instance
Child constructor
```

---

# 🚨 Now Harder Trap (Very Common)

Predict output:

```java
class A {
    A() {
        System.out.println("A constructor");
        show();
    }

    void show() {
        System.out.println("A show");
    }
}

class B extends A {
    int x = 10;

    B() {
        System.out.println("B constructor");
    }

    @Override
    void show() {
        System.out.println("B show " + x);
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}
```

⚠ This is a famous interview trap.


---

# ✅ Correct Output (in order)

```text
A constructor
B show 0
B constructor
```

---

# Why (deep reasoning)

## Key rule:

✅ **Overridden methods are virtual**, even inside constructors.
So when `A()` calls `show()`, it actually calls **B.show()** because the real object is `new B()`.

---

## Step-by-step execution

### 1️⃣ `new B()` starts

Before `B` constructor body runs, Java must run:

👉 `super()` → calls `A()` first

---

### 2️⃣ Inside `A()` constructor

```java
System.out.println("A constructor");   // prints
show();                                // calls overridden method!
```

So it prints:

```text
A constructor
```

Now `show()` call:

Because actual object is `B`, it calls:

```java
@Override
void show() {
    System.out.println("B show " + x);
}
```

### 🚨 Trap: What is `x` at this moment?

`x = 10` is an **instance field initializer** in class `B`.
But **B’s instance fields are initialized only after `super()` finishes**.

So during `A()` execution:

* `x` is still at its default value → **0**

So it prints:

```text
B show 0
```

---

### 3️⃣ `A()` finishes

Now Java initializes `B` instance fields:

* `x = 10`

Then `B()` constructor body runs:

```text
B constructor
```

---

# ✅ Final Output

```text
A constructor
B show 0
B constructor
```

---

# 🧠 Interview Answer (One line)

> Calling overridable methods from constructors is dangerous because subclass fields may not be initialized yet, so the overridden method can see default values.

---

## 🔥 Quick check (one question)

If I make `int x = 10;` into `static int x = 10;` then what would `show()` print during `A()` constructor?

✅ Correct — it would print **10**.

### Why (quick, interview-ready)

`static` variables are initialized at **class loading time**, before any object is created.
So when `A()` constructor calls `show()`, `B.show()` reads `static x` which is already initialized to 10.

---

## Notes line (very important)

* **Instance fields** may still be default (`0/null`) during `super()` execution.
* **Static fields** are ready earlier (class-load phase).

---

# 🔥 Next constructor trap: `this()` vs `super()` rule

Does this compile? If not, why?

```java
class A {
    A() { }
}

class B extends A {
    B() {
        this(10);
        super();
    }

    B(int x) { }
}
```

Answer: compile / not compile + reason (1–2 lines).

✅ Ouput — it does **not compile**.

> It does not compile because a constructor must call either `this()` or `super()` as the **first statement**, and you cannot have both.

---

# Why Exactly It Fails

```java
class B extends A {
    B() {
        this(10);
        super();   // ❌ compile error
    }
}
```

### Java Rule:

* If you write `this()`, it must be the **first line**
* If you write `super()`, it must also be the **first line**
* You cannot call both
* You cannot place `super()` after `this()`

So compiler error:

```
Constructor call must be the first statement in constructor
```

---

# Important Clarification

When you write:

```java
B() {
    this(10);
}
```

Then inside `B(int x)`, Java automatically inserts:

```java
super();
```

So the actual call chain becomes:

```
B() → B(int x) → super() → A()
```

Java ensures parent constructor runs first, but through the chained constructor.

---

# 🧠 Interview Rule (Memorize)

* Constructor can call **either** `this()` or `super()`
* It must be the **first statement**
* If not written, compiler inserts `super()` automatically

---

## 🔥 Final Constructor Trap (Very Common)

Predict output:

```java
class A {
    A() {
        System.out.println("A");
    }
}

class B extends A {
    B() {
        System.out.println("B");
    }

    B(int x) {
        this();
        System.out.println("C");
    }
}

public class Test {
    public static void main(String[] args) {
        new B(10);
    }
}
```

Write exact output in order.

✅ Ouput:

```
A
B
C
```

Now let’s break it down clearly (interview style).

---

# Code

```java
new B(10);
```

---

## Step 1️⃣ → `B(int x)` constructor runs

```java
B(int x) {
    this();          // calls B()
    System.out.println("C");
}
```

So first it calls:

---

## Step 2️⃣ → `B()` constructor

```java
B() {
    System.out.println("B");
}
```

But before `B()` runs, Java automatically inserts:

```java
super();
```

So it calls:

---

## Step 3️⃣ → `A()` constructor

```java
A() {
    System.out.println("A");
}
```

Prints:

```
A
```

---

## Step 4️⃣ → Back to `B()`

Prints:

```
B
```

---

## Step 5️⃣ → Back to `B(int x)`

Prints:

```
C
```

---

# 🧠 Final Execution Chain

```
B(int) → this() → B() → super() → A()
```

And printing order:

```
A
B
C
```

---

# 🔥 You Now Fully Understand

* Constructor chaining
* `this()` vs `super()`
* Execution order
* Static vs instance blocks
* Method call inside constructor trap

That is strong OOP foundation.



