# 📘 Method Overloading vs Method Overriding

---

# 1️⃣ Method Overloading

## Definition (Interview Style)

> Method overloading means defining multiple methods in the same class with the same name but different parameter lists.

---

## Example

```java
class MathUtil {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

Same method name → different parameters.

---

## Rules for Overloading

Must differ by:

* Number of parameters
* Type of parameters
* Order of parameters

❌ Return type alone cannot differentiate.

Wrong:

```java
int add(int a, int b) { }
double add(int a, int b) { }  // ❌ compile error
```

---

## When Does Overloading Get Resolved?

👉 At **compile time**

This is called:

> Compile-time polymorphism

---

# 🔥 Overloading Interview Trap

Predict output:

```java
class Test {
    void show(int a) {
        System.out.println("int");
    }

    void show(long a) {
        System.out.println("long");
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.show(10);
    }
}
```

What prints?

Answer: **int**

Because:

* 10 is int literal
* Exact match preferred

---

# 2️⃣ Method Overriding

## Definition (Interview Style)

> Method overriding occurs when a subclass provides a specific implementation of a method already defined in its parent class.

---

## Example

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}
```

---

## When Is Overriding Resolved?

👉 At **runtime**

This is called:

> Runtime polymorphism
> Dynamic method dispatch

---

## Example

```java
Animal a = new Dog();
a.sound();
```

Output:

```text
Dog barks
```

Because:

* Method call decided at runtime
* Based on object type (Dog)

---

# 🔥 Overriding Rules

* Method signature must be same
* Cannot reduce access modifier
* Return type must be same or covariant
* Cannot override static method
* Cannot override final method
* Private methods are not overridden

---

# 🔥 Very Common Interview Trap

Predict output:

```java
class Parent {
    static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
    }
}
```

✅ Output:

```
Parent
```

Now let’s deeply understand why — this is a very common interview trap.

---

# Why It Prints "Parent"

```java
Parent p = new Child();
p.show();
```

Key point:

👉 `show()` is **static**

Static methods:

* Belong to the **class**
* Not to the object
* Are resolved at **compile time**
* Are not overridden — they are **hidden**

This is called:

> Method Hiding

---

## What happens internally?

Compiler looks at:

```java
Parent p
```

Since reference type is `Parent`,
compiler binds method call to:

```java
Parent.show();
```

It does NOT check the object type (`new Child()`).

So output:

```
Parent
```

---

# 🧠 Interview Answer Line

> Static methods are not overridden. They are hidden. Method call is resolved at compile time based on reference type.

That one sentence can impress interviewer.

---

# 🔥 Now Slightly Harder Trap

Predict output:

```java
class Parent {
    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    void show() {
        System.out.println("Child");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
    }
}
```

✅ Correct.

```
Child
```

---

## Why?

Because this time `show()` is **not static**.

```java
Parent p = new Child();
p.show();
```

For non-static methods:

* Java uses **dynamic method dispatch**
* Method is chosen at **runtime**
* Based on the **actual object type**
* Not the reference type

Here:

* Reference type → `Parent`
* Object type → `Child`

So JVM calls:

```
Child.show()
```

---

# 🔥 Interview Comparison (Very Important Table)

| Feature         | Overloading                | Overriding               |
| --------------- | -------------------------- | ------------------------ |
| Class           | Same class                 | Parent → Child           |
| Signature       | Must differ                | Must be same             |
| Return type     | Can differ (but not alone) | Same or covariant        |
| Access modifier | Any                        | Cannot reduce visibility |
| Resolution time | Compile-time               | Runtime                  |
| Static methods  | Can overload               | Cannot override (hidden) |

---

# 🔥 Final Boss Trap (Most Asked)

Predict output:

```java
class Parent {
    void show() {
        System.out.println("Parent show");
    }
    
    void display() {
        System.out.println("Parent display");
    }
}

class Child extends Parent {
    @Override
    void show() {
        System.out.println("Child show");
    }
    
    void display(int x) {
        System.out.println("Child display");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
        p.display();
    }
}
```

✅ Correct.

```text
Child show
Parent display
```

Now let’s break it down like an interviewer expects.

---

# Code Summary

```java
Parent p = new Child();
p.show();
p.display();
```

---

## 1️⃣ `p.show()`

* `show()` is overridden in `Child`
* Non-static method
* Runtime polymorphism applies
* Object type is `Child`

So JVM calls:

```text
Child show
```

---

## 2️⃣ `p.display()`

Now look carefully:

In `Parent`:

```java
void display()
```

In `Child`:

```java
void display(int x)
```

That is NOT overriding.

That is overloading.

The method signature is different.

So for:

```java
p.display();
```

Compiler checks reference type (`Parent`).

Only method available is:

```java
Parent.display()
```

So it prints:

```text
Parent display
```

---

# 🧠 Interview Insight

This tests:

* Overriding vs overloading difference
* Method resolution based on reference type vs object type
* Signature matching rule

---

# 🚀 Ultra Important Final Trap (Real Interview Favorite)

Predict output:

```java
class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }

    void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    Child() {
        System.out.println("Child constructor");
    }

    @Override
    void show() {
        System.out.println("Child show");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
    }
}
```

✅ Output (in order):

```text
Parent constructor
Child constructor
Child show
```

### Why (quick but interview-strong)

* `new Child()` triggers **constructor chaining**:

  * `Parent()` runs first via implicit `super()`
  * then `Child()` runs
* After object creation, `p.show()` is a **virtual (overridden) method**, so it calls `Child.show()` at runtime.

---

## Notebook lines (copy-paste)

* Constructors are **not overridden**; they run in **parent → child** order.
* Overridden methods are resolved at **runtime** based on object type.

---

### Next trap (last one, very common): Overloading with `null`

Predict output:

```java
class Test {
    void print(String s) { System.out.println("String"); }
    void print(Object o) { System.out.println("Object"); }

    public static void main(String[] args) {
        Test t = new Test();
        t.print(null);
    }
}
```

✅ Output — it prints:

```text
String
```

### Why (interview-ready)

`null` can match both `String` and `Object`, but Java chooses the **most specific** overload.
`String` is more specific than `Object`, so `print(String)` is selected at **compile time**.

---

## 🔥 Extra trap (very common follow-up)

What happens here?

```java
class Test {
    void print(String s) { System.out.println("String"); }
    void print(Integer i) { System.out.println("Integer"); }

    public static void main(String[] args) {
        new Test().print(null);
    }
}
```

Does it compile? If yes, what prints? If not, why?

> It does not compile because the compiler finds the method call ambiguous.

---

# Why It Fails

```java
void print(String s)
void print(Integer i)

new Test().print(null);
```

`null` can match:

* `String`
* `Integer`

But now:

* Neither `String` is subclass of `Integer`
* Nor `Integer` is subclass of `String`

So compiler cannot decide which is more specific.

Result:

```
reference to print is ambiguous
```

Compilation error.

---

# 🧠 Interview Insight (Very Important Rule)

When overloading:

1. Compiler chooses method at **compile time**
2. It looks for the **most specific match**
3. If two methods are equally specific → ambiguity error

---

# 🔥 Final Overloading Trap (Hard Level)

Predict:

```java
class Test {
    
    void print(Object o) { System.out.println("Object"); }
    void print(String s) { System.out.println("String"); }
    void print(StringBuilder sb) { System.out.println("StringBuilder"); }

    public static void main(String[] args) {
        new Test().print(null);
    }
}
```

Does it compile?
If yes, what prints?
If not, why?

> It does not compile because the compiler finds the method call ambiguous.

---

# Why it does NOT compile

We have overloads:

```java
print(Object)
print(String)
print(StringBuilder)
```

Calling:

```java
print(null)
```

`null` can match **all reference types**, so candidates are:

* `String`
* `StringBuilder`
* `Object`

Java picks the **most specific** method.

* `Object` is least specific → eliminated
* Now between `String` and `StringBuilder`:

  * They are **siblings** (both extend `Object`, neither extends the other)

So **neither is more specific** → compiler cannot choose → **ambiguous**.

✅ Compile-time error similar to:

> reference to print is ambiguous

---

# Notes (1-liner for interviews)

> `print(null)` chooses the most specific overload; if multiple unrelated reference types are equally specific (like String and StringBuilder), the call is ambiguous and won’t compile.





