# Overriding, Dispatch, super, and Constructors

## Definition

Method overriding lets a child class provide a new implementation for an inherited method. Dynamic dispatch chooses the overridden method using the runtime object type.

## Why It Matters

This topic explains real polymorphism in Java and many interview traps around parent references, child objects, `super`, `this`, and constructor chaining.

## Core Example

`Animal a = new Dog(); a.sound();` calls `Dog.sound()` if `sound()` is overridden.

## Common Traps

- Overridden instance methods are resolved at runtime.
- Static methods are hidden, not overridden.
- `super` calls parent behavior.
- `this` refers to the current object.
- Constructor chaining always reaches a superclass constructor.

## Interview Answer

In overriding, a subclass provides its own implementation of a parent instance method. When the method is called through a parent reference, Java uses dynamic method dispatch and executes the method from the actual runtime object. Static methods do not use this mechanism; they are resolved by reference type.

## Quick Revision

- Overriding needs inheritance.
- Runtime object decides overridden method.
- Parent reference can point to child object.
- Static methods are method hiding.
- `super` accesses parent members.
- Constructors chain to parent constructors.

## Deep Dive

#### Definition (Interview Ready)

```text
Method overriding happens when a subclass provides
its own implementation of a method defined in the parent class.
```

---

#### Example

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barking");
    }
}
```

Usage:

```java
Animal a = new Dog();
a.sound();
```

Output:

```
Dog barking
```

This is **runtime polymorphism**.

---

### 2️⃣ Dynamic Method Dispatch

This is the **core of runtime polymorphism**.

Example:

```java
Animal a = new Dog();
a.sound();
```

Here:

```
Reference type → Animal
Object type → Dog
```

JVM decides method **based on object type**, not reference type.

So:

```
Dog.sound()
```

runs.

---

### Interview Rule

```text
Method call depends on object type,
variable access depends on reference type.
```

Example:

```java
class Animal {
    int x = 10;
}

class Dog extends Animal {
    int x = 20;
}
```

```java
Animal a = new Dog();
System.out.println(a.x);
```

Output:

```
10
```

Because variables are resolved at **compile time**.

---

### Interview Note

```
Methods → runtime decision
Variables → compile-time decision
```

---

### 3️⃣ Rules of Method Overriding

For overriding to happen:

##### Rule 1 — Same method name

```
Parent: sound()
Child: sound()
```

---

##### Rule 2 — Same parameters

```java
void sound()
```

must match.

---

##### Rule 3 — Return type must be same or compatible

Example:

```java
class Animal {
    Animal get() { return this; }
}

class Dog extends Animal {
    Dog get() { return this; }
}
```

This is called **Covariant Return Type**.

---

##### Rule 4 — Access modifier cannot be more restrictive

Example:

Parent:

```java
protected void sound()
```

Child:

```java
public void sound()
```

Allowed.

But:

Parent:

```java
public void sound()
```

Child:

```java
private void sound()
```

❌ Not allowed.

---

##### Rule 5 — Cannot override final method

```java
final void sound()
```

cannot be overridden.

---

##### Rule 6 — Cannot override static method

Static methods are **hidden**, not overridden.

We will see this next.

---

### 4️⃣ Method Hiding (Static Methods)

Example:

```java
class Animal {
    static void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    static void sound() {
        System.out.println("Dog sound");
    }
}
```

Usage:

```java
Animal a = new Dog();
a.sound();
```

Output:

```
Animal sound
```

Because **static methods are resolved using reference type**.

This is called **method hiding**.

---

### Interview Rule

```
Instance method → overridden
Static method → hidden
```

---

### 5️⃣ super vs this

#### this

Refers to **current object**.

Example:

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}
```

Here:

```
this.name
```

refers to object variable.

---

#### super

Refers to **parent class**.

Example:

```java
class Animal {
    void eat() {
        System.out.println("Animal eating");
    }
}

class Dog extends Animal {

    void eat() {
        super.eat();
        System.out.println("Dog eating");
    }
}
```

Output:

```
Animal eating
Dog eating
```

---

### 6️⃣ Constructor Chaining

Constructors execute **from parent to child**.

Example:

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

Usage:

```java
Child c = new Child();
```

Output:

```
Parent constructor
Child constructor
```

Because JVM automatically calls:

```
super()
```

first.

---

### Interview Trap

If parent constructor has parameters:

```java
class Parent {
    Parent(int x) {}
}
```

Child must call:

```java
super(x);
```

otherwise compilation error.

---

### Famous Interview Question

Predict output:

```java
class Parent {
    Parent() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    Child() {
        System.out.println("Child");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
    }
}
```

Output:

```
Parent
Child
```

Constructor runs based on **object creation**, not reference type.

---

### Important Interview Trap

Methods follow:

```
runtime polymorphism
```

But constructors **do not**.

Constructors are **not overridden**.

---

### Final Interview Notes (Important)

Remember this summary:

```
Method overriding → runtime polymorphism
Method overloading → compile-time polymorphism

Methods → runtime binding
Variables → compile-time binding

Static methods → method hiding
Instance methods → overriding
```

---

