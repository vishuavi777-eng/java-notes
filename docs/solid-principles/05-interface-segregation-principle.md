# Interface Segregation Principle

## Definition

Clients should not be forced to depend on methods they do not use.

## Why It Matters

It keeps interfaces focused and prevents classes from implementing irrelevant methods.

## Core Example

Use separate Printable and Scannable interfaces instead of one Machine interface that every class must fully implement.

## Common Traps

- One huge interface creates unnecessary dependencies.
- Too many tiny interfaces can also be noisy.
- Interfaces should match client needs.
- Do not force no-op methods.
- ISP improves flexibility and testing.

## Interview Answer

Interface Segregation Principle says large general interfaces should be split into smaller focused interfaces. A class should implement only the methods that make sense for its role.

## Quick Revision

- Small focused interfaces.
- No forced unused methods.
- Avoid fat interfaces.
- Design around client needs.
- Improves testability.
- Use balanced granularity.

## Deep Dive

### I — Interface Segregation Principle (ISP)

This principle fixes a very common problem:

```text
Huge interfaces
```

---

### Quick thinking question

Look at this interface:

```java
interface Worker {

    void work();
    void eat();
}
```

Now we create:

```java
class Robot implements Worker
```

But robots **do not eat**.

Do you think this design is **good or problematic**? Explain why.

##### Answer:
```text
No, I think design is not good. How can a robot call the eat() method? Robots do not eat.
```

---

### Interface Segregation Principle (ISP)

##### Definition

```text
Clients should not be forced to depend on methods they do not use.
```

Simple meaning:

```text
Do not create large interfaces with unrelated methods.
```

Instead:

```text
Create smaller, specific interfaces.
```

---

### The Problem Example

```java
interface Worker {

    void work();
    void eat();
}
```

Now we implement:

```java
class Robot implements Worker {

    public void work() {
        System.out.println("Robot working");
    }

    public void eat() {
        // Robots do not eat
    }
}
```

Problem:

Robot is forced to implement:

```text
eat()
```

which **does not make sense**.

This violates **Interface Segregation Principle**.

---

### Why this is bad design

Because:

```text
Robot depends on methods it doesn't need
```

That is exactly what ISP warns against.

---

### Correct Design (Following ISP)

Split the interface.

##### Work interface

```java
interface Workable {
    void work();
}
```

---

##### Eat interface

```java
interface Eatable {
    void eat();
}
```

---

##### Human worker

```java
class Human implements Workable, Eatable {

    public void work() {
        System.out.println("Human working");
    }

    public void eat() {
        System.out.println("Human eating");
    }
}
```

---

##### Robot worker

```java
class Robot implements Workable {

    public void work() {
        System.out.println("Robot working");
    }
}
```

Now everything makes sense.

Robots **do not implement eat()**.

---

### Key idea of ISP

Instead of:

```text
1 large interface
```

Prefer:

```text
multiple small interfaces
```

This is sometimes called:

```text
Role-based interfaces
```

---

### Real examples from real systems

##### Example 1 — Printer

Bad design:

```java
interface Printer {
    void print();
    void scan();
    void fax();
}
```

But some printers:

```text
Only print
```

So they must implement:

```text
scan()
fax()
```

which makes no sense.

---

### Correct design

Split interfaces:

```text
Printable
Scannable
Faxable
```

---

### Real example from your projects

Imagine your **task automation system**.

Bad interface:

```java
interface Task {

    void execute();
    void schedule();
    void sendNotification();
    void generateReport();
}
```

But many tasks may not need:

```text
generateReport()
```

So we should separate:

```text
ExecutableTask
SchedulableTask
NotifiableTask
ReportableTask
```

This follows **ISP**.

---

### Benefits of ISP

```text
Cleaner interfaces
Less coupling
Better maintainability
Better flexibility
```

---

### Interview-ready answer

If interviewer asks:

**What is Interface Segregation Principle?**

You can say:

> Interface Segregation Principle states that clients should not be forced to depend on methods they do not use. Instead of creating large interfaces, we should create smaller and more specific interfaces.