# 📘 Static vs Instance in Java

---

# 1️⃣ What is an Instance Member?

Instance members:

* Belong to an object
* Stored in heap (inside object)
* Each object gets its own copy

Example:

```java id="i1gk2s"
class Person {
    int age;   // instance variable
}
```

If you create:

```java id="z3w8tm"
Person p1 = new Person();
Person p2 = new Person();
```

Memory:

```id="q9a4lf"
Heap:
p1 → { age }
p2 → { age }
```

Each object has its own `age`.

---

# 2️⃣ What is a Static Member?

Static members:

* Belong to the class
* Only ONE copy exists
* Shared among all objects
* Loaded when class loads

Example:

```java id="u7dn23"
class Person {
    static int count;
}
```

No matter how many objects:

```java id="t4dk1x"
new Person();
new Person();
```

There is only ONE `count`.

---

# 3️⃣ Memory Location (Important for Interviews)

Modern JVM (Java 8+):

* Instance variables → Heap (inside object)
* Static variables → Heap (inside Class metadata structure)
* Static methods → Method area (metadata)
* Stack → Local variables & method calls

---

# 4️⃣ Static Method vs Instance Method

## Static Method

```java id="s8v34k"
static void show() { }
```

* Belongs to class
* Cannot access instance variables directly
* Cannot use `this`
* Cannot call non-static method directly

---

## Instance Method

```java id="f1y27d"
void show() { }
```

* Belongs to object
* Can access both static & instance members

---

# ✅ Trap 1 — Deep Explanation

```java
class Test {
    static int x = 0;
    int y = 0;

    Test() {
        x++;
        y++;
    }
}
```

### Object Creation Flow

#### After `Test t1 = new Test();`

* `x = 1`
* `t1.y = 1`

#### After `Test t2 = new Test();`

* `x = 2`
* `t2.y = 1`

Because:

* `x` is static → shared
* `y` is instance → each object has separate copy

---

### So output:

```text
2 1
2 1
```

---

# ✅ Trap 2 — Why It Does Not Compile

```java
static void show() {
    System.out.println(this);
}
```

Why error?

Because:

* Static method belongs to class
* No object context
* `this` refers to current object
* Static method may be called without object

So compiler error:

```
non-static variable this cannot be referenced from a static context
```

---

# 🧠 Interview One-Liner

> Static members belong to the class and do not have access to instance context, therefore they cannot use `this`.

---

# 🔥 Now Slightly Harder Trap

Predict output:

```java
class Test {
    static int x = 10;

    static {
        x = x + 5;
    }

    {
        x = x + 2;
    }

    Test() {
        x = x + 3;
    }

    public static void main(String[] args) {
        new Test();
        System.out.println(x);
    }
}
```

✅ Correct — final value is **20**.

Here’s the clean dry run (interview style):

---

## Code flow

Initial:

* `static int x = 10`

### 1️⃣ Static block (runs once when class loads)

```java
static { x = x + 5; }
```

So:

* x = 15

### 2️⃣ `new Test()` starts object creation

Instance block runs **before** constructor:

```java
{ x = x + 2; }
```

So:

* x = 17

### 3️⃣ Constructor runs

```java
Test() { x = x + 3; }
```

So:

* x = 20

### Print:

`20`

---

# 🧠 Notes line

Order:
**static fields → static blocks → instance blocks → constructor**

---

# 🔥 Next trap: Static method “overriding” (actually hiding)

Predict output:

```java
class A {
    static void m() { System.out.println("A"); }
}
class B extends A {
    static void m() { System.out.println("B"); }
}
public class Test {
    public static void main(String[] args) {
        A a = new B();
        a.m();
    }
}
```

✅ Correct — output is **A**.

Reason (interview one-liner):

> Static methods are **hidden**, not overridden. The call is resolved at **compile time** based on the reference type (`A`), so it calls `A.m()`.

---

# 📘 Static vs Instance: Final Notes Snapshot

* **Instance members**: per-object, heap, accessed via object, support runtime polymorphism (overriding).
* **Static members**: per-class (one copy), available without object, no `this`, no overriding (only hiding), resolved at compile time.

---

## Next mini-trap (last for Static vs Instance)

Does this compile? If yes, what prints?

```java
class Test {
    static int x = 10;
    int x = 20;

    public static void main(String[] args) {
        System.out.println(x);
    }
}
```

Answer: compile / not compile + reason.

✅ Correct Output: — it does **not compile**.

> It does not compile because a class cannot have two fields with the same name, even if one is static and the other is instance.

---

# Why Exactly?

```java
static int x = 10;
int x = 20;
```

Even though:

* One is static
* One is instance

They are still **fields of the same class**, and Java does **not allow duplicate field names** in the same class scope.

You’ll get compile-time error like:

```
variable x is already defined in class Test
```

---

# 🧠 Important Clarification

You *can* have same variable name in:

* Different classes
* Parent & child class (field hiding)

Example:

```java
class A {
    int x = 10;
}

class B extends A {
    int x = 20;
}
```

This compiles.

But in same class → not allowed.

---

# 🔥 Final Static vs Instance Master Question

Predict output:

```java
class A {
    int x = 10;
}

class B extends A {
    int x = 20;

    void print() {
        System.out.println(x);
        System.out.println(super.x);
    }
}

public class Test {
    public static void main(String[] args) {
        B b = new B();
        b.print();
    }
}
```

✅ Output:

```text
20
10
```

---

# Why?

```java
class A {
    int x = 10;
}

class B extends A {
    int x = 20;
}
```

This is **field hiding**, not overriding.

Important difference:

* Methods → can be overridden (runtime polymorphism)
* Fields → are resolved at **compile time** based on reference type

---

## Inside `print()` method

```java
System.out.println(x);        // refers to B.x
System.out.println(super.x);  // refers to A.x
```

So:

* `x` → 20
* `super.x` → 10

---

# 🧠 Interview Insight

> Fields are not polymorphic. They are accessed based on reference type at compile time.

Example trap:

```java
A obj = new B();
System.out.println(obj.x);
```

What prints?

👉 10 (because reference type is A)

Even though object is B.




