# Liskov Substitution Principle

## Definition

A subclass should be usable anywhere its parent type is expected without breaking expected behavior.

## Why It Matters

It keeps inheritance safe and prevents surprising runtime behavior.

## Core Example

If code expects a Bird that can fly, a Penguin subclass that cannot fly breaks the design.

## Common Traps

- Inheritance must model correct behavior, not just shared fields.
- Do not override methods with weaker behavior.
- Subclasses should respect parent contracts.
- Throwing unsupported exceptions can violate LSP.
- Composition can be better than wrong inheritance.

## Interview Answer

Liskov Substitution Principle says child classes must honor the behavior expected from the parent class. If replacing a parent object with a child object breaks the program, the inheritance design is wrong.

## Quick Revision

- Child must fit parent contract.
- Substitution should be safe.
- Avoid fake is-a relationships.
- Do not weaken behavior.
- Respect method contracts.
- Prefer composition when inheritance is wrong.

## Deep Dive

### L — Liskov Substitution Principle (LSP)

Many developers **struggle with this concept**, but once understood it becomes very simple.

---

### Quick thinking question before LSP

Look at this inheritance example:

```java
class Bird {
    void fly() {
        System.out.println("Bird flying");
    }
}

class Penguin extends Bird {
}
```

But penguins **cannot fly**.

Do you think this inheritance design is **correct or problematic**? Explain why.

##### Answer:
> Calling the `fly()` method on a `Penguin` object is **illogical because penguins cannot fly**.

---

### Liskov Substitution Principle (LSP)

##### Definition

```text
Objects of a superclass should be replaceable with objects of a subclass
without breaking the correctness of the program.
```

Simple meaning:

```text
Subclass should behave like the parent class.
```

Or even simpler:

```text
If B is a subtype of A,
then B should be usable wherever A is expected.
```

---

### The Problem Example

```java
class Bird {
    void fly() {
        System.out.println("Bird flying");
    }
}

class Penguin extends Bird {
}
```

Now imagine this code:

```java
Bird bird = new Penguin();
bird.fly();
```

But penguins **cannot fly**.

This creates a **logical violation**.

So the inheritance hierarchy is **wrong**.

---

### Why this violates LSP

Parent class promises:

```text
All birds can fly
```

But subclass breaks that rule.

So **Penguin is not a valid substitute for Bird**.

Therefore:

```text
LSP is violated
```

---

### Correct Design

Instead of forcing all birds to fly, separate behaviors.

##### Step 1 — Base class

```java
class Bird {
}
```

---

##### Step 2 — Flying birds

```java
class FlyingBird extends Bird {

    void fly() {
        System.out.println("Flying bird");
    }
}
```

---

##### Step 3 — Penguin

```java
class Penguin extends Bird {

    void swim() {
        System.out.println("Penguin swimming");
    }
}
```

Now the hierarchy makes sense.

---

### Another Classic LSP Example

##### Rectangle / Square Problem

Bad design:

```java
class Rectangle {

    int width;
    int height;

    void setWidth(int width) {
        this.width = width;
    }

    void setHeight(int height) {
        this.height = height;
    }
}

class Square extends Rectangle {

    void setWidth(int width) {
        this.width = width;
        this.height = width;
    }

    void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}
```

Now test:

```java
Rectangle rect = new Square();

rect.setWidth(5);
rect.setHeight(10);

System.out.println(rect.width * rect.height);
```

Expected:

```
50
```

Actual:

```
100
```

Because Square changed behavior.

This **breaks LSP**.

---

### Key Idea of LSP

Subclass must **not break parent expectations**.

That includes:

```text
method behavior
return types
exceptions
logic
```

---

### Simple rule to remember

```text
Inheritance must represent "IS-A" relationship.
```

Example:

Good:

```text
Dog IS-A Animal
Car IS-A Vehicle
```

Bad:

```text
Penguin IS-A FlyingBird ❌
Square IS-A Rectangle ❌
```

---

### Real examples from real systems

##### Payment example

Bad:

```text
PaymentProcessor
   ↓
FreePaymentProcessor
```

If parent expects payment to charge money, but subclass charges nothing, behavior changes.

---

##### Your automation system

Suppose:

```text
Task
   ↓
EmailTask
   ↓
SmsTask
```

If some tasks cannot perform certain actions expected by `Task`, then inheritance is wrong.

Better to design interfaces properly.

---

### Benefits of LSP

```text
Reliable inheritance
Predictable polymorphism
Safer code reuse
Better architecture
```

---

### Interview-ready answer

If interviewer asks:

**What is Liskov Substitution Principle?**

You can say:

> Liskov Substitution Principle states that objects of a subclass should be able to replace objects of the superclass without breaking the correctness of the program. In other words, subclasses should extend behavior without changing the expected behavior of the parent class.

---

### Where LSP is important

It becomes critical in:

```text
inheritance design
framework development
API design
polymorphism
```