# 📚 Final Keyword In Java

`final` can be used with:

1️⃣ Variables
2️⃣ Methods
3️⃣ Classes

Each has different meaning.

---

# 1️⃣ final Variable

## Definition (Interview Style)

> A final variable cannot be reassigned once initialized.

---

## Example (Primitive)

```java
final int x = 10;
x = 20;   // ❌ compile error
```

Because final means constant.

---

## 🔥 Important: final Reference Variable

```java
final Person p = new Person();
p = new Person();  // ❌ error
```

But:

```java
p.age = 30;   // ✅ allowed
```

⚠ Important rule:

> final reference means reference cannot change, but object state can change.

This is a big interview trap.

---

# 2️⃣ final Method

```java
class A {
    final void show() { }
}

class B extends A {
    void show() { }   // ❌ compile error
}
```

final method:

* Cannot be overridden
* But can be overloaded

---

# 3️⃣ final Class

```java
final class A { }

class B extends A { }   // ❌ error
```

final class:

* Cannot be inherited

Example:

```java
String
```

String is final.

---

# 🔥 Important: Blank Final Variable

```java
class Test {
    final int x;

    Test(int value) {
        x = value;
    }
}
```

Allowed because:

* final variable initialized once
* Inside constructor

But:

```java
final int x;  // ❌ must initialize
```

---

# 🔥 Static Blank Final

```java
class Test {
    static final int x;

    static {
        x = 10;
    }
}
```

Allowed.

---

# 🔥 Interview Trap 1

Predict output:

```java
class Test {
    final int x = 10;

    void change() {
        // x = 20;
    }

    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.x);
    }
}
```

Output?

---

# 🔥 Interview Trap 2

Does this compile?

```java
class Test {
    final int x;

    Test() {
        x = 10;
    }

    Test(int y) {
        // no initialization of x
    }
}
```

If not, why?

---


# ✅ Trap 1

```java
final int x = 10;
```

Since `x` is initialized at declaration and never changed:

Output:

```
10
```

Simple.

---

# ✅ Trap 2

```java
final int x;

Test() {
    x = 10;
}

Test(int y) {
    // x not initialized
}
```

Rule:

> A blank final instance variable must be initialized in **every constructor**.

Since `Test(int y)` does not assign value to `x`, compilation fails.

Compiler error:

```
variable x might not have been initialized
```

---

# 🧠 Important Rule

For blank final instance variable:

* Must be assigned exactly once
* Must be initialized in all constructors

---

# 🔥 Now Slightly Harder Trap

Predict output:

```java
class Test {
    final int x;

    Test() {
        x = 10;
        x = 20;
    }

    public static void main(String[] args) {
        new Test();
    }
}
```

Compile or not? Why?

>>“Once a final variable is initialized, it cannot be reassigned.”

---

# Why it does NOT compile

```java
final int x;

Test() {
    x = 10;
    x = 20;  // ❌ second assignment
}
```

A `final` variable can be assigned **exactly once**.

So compiler error like:

```text
cannot assign a value to final variable x
```

---

# 🔥 Next `final` Trap (very common)

Predict output:

```java
import java.util.*;

class Test {
    public static void main(String[] args) {
        final List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        System.out.println(list);

        // list = new ArrayList<>();  // ?
    }
}
```

1. What prints?
2. Does `list = new ArrayList<>();` compile? Why?


> 1. It prints [1, 2]
> 2. No, it does not compile.

---

# ✅ 1️⃣ What prints?

```java
final List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
System.out.println(list);
```

Output:

```text
[1, 2]
```

Because:

* `list` is a final reference
* The reference cannot change
* But the object it points to **can change**

So modifying list contents is allowed.

---

# ❌ 2️⃣ Does this compile?

```java
list = new ArrayList<>();
```

No.

Because:

* `list` is declared as `final`
* A final reference cannot be reassigned
* So this gives compile-time error

Error like:

```text
cannot assign a value to final variable list
```

---

# 🧠 Important Interview Line

> `final` reference means you cannot change the reference, but you can change the object's state.

This is extremely common interview question.

---

# 🔥 Now Slightly Deeper `final` Trap

Predict output:

```java
class Test {
    final int x;

    {
        x = 10;
    }

    Test() {
        System.out.println(x);
    }

    public static void main(String[] args) {
        new Test();
    }
}
```

What prints?

✅ Output — it prints **10**.

### Why (interview-ready explanation)

Order during object creation:

1. Memory allocated
2. Instance fields get default values
3. **Instance initialization blocks run**
4. Constructor body runs

Here:

```java
final int x;

{
    x = 10;   // instance block initializes x
}
```

So `x` is assigned in the **instance initialization block**, which runs **before** the constructor body.
By the time constructor executes, `x` is already 10.

Then constructor prints:

```text
10
```

---

# 🧠 Important Rule

A blank final instance variable can be initialized in:

* Field declaration
* Instance initialization block
* Constructor (but must be initialized exactly once)

---

# 🔥 Final `final` Boss Trap

Predict output:

```java
class Test {
    static final int x;

    static {
        x = 5;
    }

    static {
        x = 10;
    }

    public static void main(String[] args) {
        System.out.println(x);
    }
}
```

Compile or not? If not, why?

✅ Output: “It does not compile because you cannot assign to a `static final` variable more than once.”

---

# Why it fails

```java
static final int x;

static { x = 5; }
static { x = 10; }  // ❌ second assignment
```

`static final` (blank final) must be assigned **exactly once** during class initialization.

After `x = 5`, it’s already initialized, so `x = 10` is illegal.

Compiler error like:

```text
cannot assign a value to final variable x
```

---

# ✅ Final Notes Snapshot for your notebook

* `final` variable: cannot be reassigned
* `final` reference: reference fixed, object mutable
* blank final instance var: must be assigned once in *every constructor* OR init block
* `final` method: cannot override
* `final` class: cannot extend
* `static final` blank var: initialize once in static block


