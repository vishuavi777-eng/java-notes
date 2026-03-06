# 📚 Abstract Class VS Interface

# 📘 1️⃣ Abstract Class

## Definition (Interview Style)

> An abstract class is a class that cannot be instantiated and may contain abstract and concrete methods.

---

## Example

```java
abstract class Animal {
    abstract void sound();   // abstract method

    void eat() {             // concrete method
        System.out.println("Eating");
    }
}
```

Subclass must implement abstract methods:

```java
class Dog extends Animal {
    void sound() {
        System.out.println("Bark");
    }
}
```

---

# 📘 2️⃣ Interface

## Definition (Interview Style)

> An interface defines a contract that a class must implement.

---

## Example

```java
interface Animal {
    void sound();   // abstract by default
}
```

Implementation:

```java
class Dog implements Animal {
    public void sound() {
        System.out.println("Bark");
    }
}
```

---

# 🔥 Major Differences (Very Important Table)

| Feature          | Abstract Class              | Interface                                        |
| ---------------- | --------------------------- | ------------------------------------------------ |
| Instantiation    | ❌ Cannot create object      | ❌ Cannot create object                           |
| Methods          | Abstract + Concrete         | Abstract (default & static allowed since Java 8) |
| Variables        | Can have instance variables | Only public static final                         |
| Constructors     | ✅ Yes                       | ❌ No                                             |
| Access modifiers | Any                         | Methods are public by default                    |
| Inheritance      | Single inheritance          | Multiple interfaces allowed                      |

---

# 📘 3️⃣ Important Modern Java Facts (Java 8+)

Interface can now have:

* default methods
* static methods
* private methods (Java 9+)

Example:

```java
interface Test {
    default void show() {
        System.out.println("Default method");
    }

    static void display() {
        System.out.println("Static method");
    }
}
```

---

# 🔥 Interview Trap 1

Does this compile?

```java
interface Test {
    int x = 10;
}

class Demo implements Test {
    void change() {
        x = 20;
    }
}
```

Why?

---

# 🔥 Interview Trap 2

Does this compile?

```java
abstract class A {
    abstract void show();
}

class B extends A {
}
```

If not, why?

---

# ✅ Trap 1

```java
interface Test {
    int x = 10;
}
```

All interface variables are:

```text
public static final
```

So this is actually:

```java
public static final int x = 10;
```

In class:

```java
x = 20;   // ❌
```

You cannot modify a `final` variable.

Correct reasoning.

---

# ✅ Trap 2

```java
abstract class A {
    abstract void show();
}

class B extends A {
}
```

`B` must either:

* Implement `show()`
  OR
* Be declared abstract

Correct fix:

```java
class B extends A {
    void show() { }
}
```

OR

```java
abstract class B extends A { }
```

---

# 🧠 Interview One-Liners

* Interface variables are always `public static final`.
* A subclass must implement all abstract methods unless it is also abstract.

---

# 🔥 Now Slightly Harder Trap

Predict output:

```java
interface A {
    default void show() {
        System.out.println("A");
    }
}

interface B {
    default void show() {
        System.out.println("B");
    }
}

class Test implements A, B {
    public static void main(String[] args) {
        new Test().show();
    }
}
```

Compile or not?
If not, why?


> It does not compile because there is a conflict between default methods `show()` from interfaces A and B.

---

# Why It Fails

```java
class Test implements A, B
```

Both interfaces provide:

```java
default void show()
```

Java does not know which one to use:

* A.show() ?
* B.show() ?

So compiler error like:

```text
class Test inherits unrelated defaults for show() from types A and B
```

---

# How To Fix It

You must override `show()` in `Test`:

```java
class Test implements A, B {
    @Override
    public void show() {
        A.super.show();   // or B.super.show();
    }
}
```

Now it compiles.

---

# 🧠 Interview Rule

> If a class implements two interfaces that contain the same default method, the class must override that method to resolve ambiguity.

---

# 🔥 Next Important Concept

What happens here?

```java
interface A {
    default void show() {
        System.out.println("A");
    }
}

class B {
    void show() {
        System.out.println("B");
    }
}

class Test extends B implements A {
    public static void main(String[] args) {
        new Test().show();
    }
}
```

# ✅ Does it compile? What prints?

✅ **Yes, it compiles.**
✅ It prints:

```text
B
```

---

# Why? (Most important rule)

When there is a conflict between:

* a **class method** (from superclass), and
* an **interface default method**

👉 **Class wins**.

This is called:

> **Class wins over interface default method** (or “classes take precedence”).

So in:

```java
class Test extends B implements A
```

`B.show()` is chosen over `A`’s default `show()`.

---

# Interview one-liner (memorize)

> If a superclass provides a method implementation, it overrides/conflicts-resolves any interface default method with the same signature. **Class method always wins.**

---

## Quick follow-up (1 line)

If `B.show()` was `private`, would `Test` still print B or A?


it **will compile**, and it will print:

```text
A
```

---

# Why?

If `B.show()` is `private`, like:

```java
class B {
    private void show() {
        System.out.println("B");
    }
}
```

Important rule:

👉 **Private methods are not inherited.**

So from `Test`'s perspective:

* There is NO accessible `show()` from class `B`
* But interface `A` provides a default `show()`

So Java uses:

```java
A.show()
```

And output becomes:

```text
A
```

---

# 🔥 Critical Rule (Interview Gold)

Priority order when resolving methods:

1️⃣ Class methods (public/protected/package-private)
2️⃣ Interface default methods
3️⃣ If conflict between interfaces → must override

But:

* **Private superclass methods are not inherited**, so they do NOT block interface defaults.

---

# 🧠 One-liner to remember

> Class wins over interface — unless the class method is private (not inherited).

---

🔥 You are now understanding deep OOP resolution rules.

---

## Final quick check

If `B.show()` was `static`, what would happen?

Compile or not?
If compile, what prints?

---

# Case: If `B.show()` is `static`

```java
interface A {
    default void show() {
        System.out.println("A");
    }
}

class B {
    static void show() {
        System.out.println("B");
    }
}

class Test extends B implements A {
    public static void main(String[] args) {
        new Test().show();
    }
}
```

---

# ❌ Does it compile?

**No. It does NOT compile.**

---

# Why?

Important rules:

* Interface `A` provides:

  ```java
  default void show()
  ```

  → instance method

* Class `B` provides:

  ```java
  static void show()
  ```

  → static method

Now Java sees conflict:

You cannot:

* Override an instance method with static
* Or inherit both static + default method with same signature

Compiler error like:

```
show() in B cannot implement show() in A
overriding method is static
```

---

# 🔥 Core Rule

> A static method cannot override or hide an instance method.

And here:

* Interface default method = instance method
* Superclass method = static method

That is illegal conflict.

---

# 🧠 Final Method Resolution Priority (Memorize)

When calling a method:

1️⃣ Class instance method
2️⃣ Interface default method
3️⃣ Must override if multiple defaults
4️⃣ Static methods are not part of polymorphism

---

You’ve now covered:

* Default method conflicts
* Class vs interface resolution
* Private method inheritance
* Static method conflict

This is already strong OOP level.
