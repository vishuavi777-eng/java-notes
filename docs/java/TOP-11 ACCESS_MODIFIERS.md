# 📚 Access Modifiers In Java

Java has 4 access levels:

1️⃣ `private`
2️⃣ *default* (no modifier)
3️⃣ `protected`
4️⃣ `public`

---

# 1️⃣ private

> Accessible only inside the same class.

```java
class Test {
    private int x = 10;
}
```

❌ Not accessible outside class.

---

# 2️⃣ default (package-private)

If you don’t write any modifier:

```java
class Test {
    int x = 10;   // default
}
```

Accessible:

* Inside same class
* Same package

❌ Not accessible from different package

---

# 3️⃣ protected

Accessible:

* Same class
* Same package
* Subclass (even in different package)

---

# 4️⃣ public

Accessible everywhere.

---

# 📘 Visibility Table (Very Important)

| Modifier  | Same Class | Same Package | Subclass (diff pkg) | Other Package |
| --------- | ---------- | ------------ | ------------------- | ------------- |
| private   | ✅          | ❌            | ❌                   | ❌             |
| default   | ✅          | ✅            | ❌                   | ❌             |
| protected | ✅          | ✅            | ✅                   | ❌             |
| public    | ✅          | ✅            | ✅                   | ✅             |

Memorize this table.

---

# 🔥 Important: protected in Different Package (Common Trap)

If subclass is in different package:

```java
package p1;
public class A {
    protected int x = 10;
}
```

```java
package p2;
import p1.A;

class B extends A {
    void show() {
        System.out.println(x);  // ✅ allowed
    }
}
```

But:

```java
A obj = new A();
System.out.println(obj.x);  // ❌ not allowed
```

Important rule:

> In different package, protected members are accessible only through inheritance, not through object reference.

Very common interview trap.

---

# 🔥 Now Test Your Understanding

Assume:

Package `p1`:

```java
package p1;

public class A {
    protected int x = 10;
}
```

Package `p2`:

```java
package p2;
import p1.A;

class B extends A {
    void test() {
        A obj = new A();
        System.out.println(obj.x);   // Line 1
        System.out.println(this.x);  // Line 2
    }
}
```

Question:

Does Line 1 compile?
Does Line 2 compile?

---

# ✅ Line 1

```java
A obj = new A();
System.out.println(obj.x);   // Line 1
```

❌ **Does not compile**.

Reason:

* `x` is `protected`
* `B` is in a **different package** (`p2`)
* In different package, `protected` access is allowed **only via inheritance**, not via an object of the parent class.

So `obj.x` is not accessible.

---

# ✅ Line 2

```java
System.out.println(this.x);  // Line 2
```

✅ **Compiles**.

Reason:

* `B` extends `A`, so `B` inherits `x`
* Accessing via `this.x` uses inherited member (inheritance path), which is allowed even across packages.

---

# ✅ About `super.x`

In this exact case, `super.x` also **compiles**.

Because:

* `super.x` means “access the inherited `x` from parent”
* That’s still inheritance-based access (allowed)

So inside `B` (subclass), both are valid:

```java
System.out.println(this.x);
System.out.println(super.x);
```

---

# 🧠 Interview one-liner to remember

> In a different package, `protected` members are accessible only through the subclass instance (`this`/`super`), not through a parent-class reference (`new A()`).

---

## 🔥 Next Access Modifier Trap (very common)

Assume:

* `p1.A` has `protected int x`
* `p2.B extends A`

Now inside `B`, what about this?

```java
B b = new B();
System.out.println(b.x);
```

Does this compile? Why?

It **DOES compile**.

---

# Let’s Analyze

We are inside class `B` (subpackage p2), which extends `A` (package p1).

```java
B b = new B();
System.out.println(b.x);
```

### Why this compiles:

* `x` is protected
* `B` extends `A`
* `b` is a `B` object
* We are inside subclass context

Access is happening through:
✔ subclass
✔ subclass object

So this is allowed.

---

# Important Rule (Precise Version)

In different package:

Protected member is accessible only:

✔ Inside subclass
✔ Through subclass type reference

Not allowed:

```java
A obj = new A();
System.out.println(obj.x);  // ❌
```

Because:

* That is parent-type reference
* Not inheritance access path

---

# 🧠 Final Clear Rule

| Case                       | Different Package | Allowed? |
| -------------------------- | ----------------- | -------- |
| obj.x (where obj is A)     | ❌                 | No       |
| this.x                     | ✅                 | Yes      |
| super.x                    | ✅                 | Yes      |
| b.x (b is subclass object) | ✅                 | Yes      |

---

# 🔥 Now Ultimate Protected Trap

Inside `B`, what about this?

```java
A obj = new B();
System.out.println(obj.x);
```

Compile or not?
Why?

This one is **NOT compile** ❌

---

# Why `A obj = new B(); obj.x` does NOT compile

```java
A obj = new B();
System.out.println(obj.x);
```

Even though the **object** is `B`, the **reference type** is `A`.

In a different package, Java’s protected access check is based on **where you are (subclass)** *and* **the type of the reference used to access the member**.

✅ Allowed access across packages must be through a reference that is:

* `this` / `super`, or
* a reference whose compile-time type is the subclass (like `B b`)

Here, access is through an `A` reference (`obj`), so it fails.

So compiler error (conceptually):

> `x has protected access in A`

---

# ✅ What compiles instead

```java
B b = new B();
System.out.println(b.x);   // ✅
```

or

```java
System.out.println(this.x);  // ✅
```

---

# 🧠 Interview One-Liner

> In a different package, protected members are accessible in a subclass only via subclass instance (`this`, `super`, or a reference typed as the subclass), not via a parent-typed reference even if it points to a subclass object.

---

## Quick check (final for access modifiers)

If `x` was **default** (no modifier) in `A` instead of protected, would `this.x` inside `B` compile across packages?


✅ Correct — it would **not compile**.

Reason (interview-style, one line):

> Default (package-private) access is only within the same package, so a subclass in a different package cannot access it—even through inheritance (`this.x`).

---

# 📘 Notes Snapshot: Access Modifiers (copy-paste)

* `private`: only same class
* *default* (package-private): same package only
* `protected`: same package + subclass (even different package), but **cross-package access must be via subclass instance** (`this/super` or subclass-typed reference)
* `public`: everywhere

