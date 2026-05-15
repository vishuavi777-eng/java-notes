# Open Closed Principle

## Definition

Code should be open for extension but closed for modification.

## Why It Matters

It helps add new behavior without repeatedly editing stable existing code.

## Core Example

Add a new PaymentStrategy implementation instead of editing a large payment if-else block.

## Common Traps

- Do not add abstraction before variation exists.
- Closed for modification does not mean never change code.
- Too many abstractions can hurt readability.
- OCP often works with polymorphism.
- Tests should protect stable behavior.

## Interview Answer

Open Closed Principle means we should design stable code so new behavior can be added through extension, such as new classes or implementations, instead of modifying existing logic every time.

## Quick Revision

- Open for extension.
- Closed for modification.
- Use interfaces/polymorphism when useful.
- Avoid large if-else growth.
- Do not over-engineer early.
- Common with Strategy pattern.

## Deep Dive

### O — Open Closed Principle (OCP)

Next we move to the **most powerful SOLID principle**, which actually explains many design patterns.

Many patterns we studied come from this:

```
Strategy
Decorator
Observer
Factory
```

---

### Before we start OCP

Small thinking question.

Look at this payment service:

```java
class PaymentService {

    void pay(String type) {

        if(type.equals("CARD")) {
            // card payment
        }
        else if(type.equals("UPI")) {
            // upi payment
        }
        else if(type.equals("NETBANKING")) {
            // netbanking
        }
    }
}
```

If tomorrow we add **PayPal payment**, what must we do to this class?

##### Answer:

> We need to **modify the `pay()` method whenever a new payment method is added.**

And that is the **core violation of OCP**.

---

### Open Closed Principle (OCP)

##### Definition

```text
Software entities (classes, modules, functions) should be
OPEN for extension
but CLOSED for modification.
```

Meaning:

```text
You should be able to add new behavior
without modifying existing code.
```

---

### Problem Example (Violates OCP)

```java
class PaymentService {

    void pay(String type) {

        if(type.equals("CARD")) {
            System.out.println("Card payment");
        }
        else if(type.equals("UPI")) {
            System.out.println("UPI payment");
        }
        else if(type.equals("NETBANKING")) {
            System.out.println("Netbanking payment");
        }
    }
}
```

##### Problem

If we add new payment types:

```text
PayPal
Wallet
Crypto
```

We must modify:

```text
PaymentService
```

every time.

So this class is **not closed for modification**.

---

### Problems with this design

##### 1️⃣ Risk of bugs

Every modification risks breaking existing logic.

---

##### 2️⃣ Hard maintenance

Large `if-else` blocks grow over time.

---

##### 3️⃣ Violates clean architecture

Business logic becomes tightly coupled.

---

### Solution → Use Polymorphism

Instead of condition logic, we use **interfaces and implementations**.

---

### Step 1 — Payment interface

```java
interface Payment {
    void pay();
}
```

---

### Step 2 — Implementations

##### Card Payment

```java
class CardPayment implements Payment {

    public void pay() {
        System.out.println("Card payment");
    }
}
```

---

##### UPI Payment

```java
class UpiPayment implements Payment {

    public void pay() {
        System.out.println("UPI payment");
    }
}
```

---

##### NetBanking Payment

```java
class NetBankingPayment implements Payment {

    public void pay() {
        System.out.println("Netbanking payment");
    }
}
```

---

### Step 3 — PaymentService

```java
class PaymentService {

    void processPayment(Payment payment) {
        payment.pay();
    }
}
```

---

### Usage

```java
public class Test {

    public static void main(String[] args) {

        PaymentService service = new PaymentService();

        service.processPayment(new CardPayment());
        service.processPayment(new UpiPayment());
    }
}
```

---

### Now adding new payment method

Add new class:

```java
class PaypalPayment implements Payment {

    public void pay() {
        System.out.println("PayPal payment");
    }
}
```

No need to modify:

```text
PaymentService
```

That means:

```text
OPEN for extension
CLOSED for modification
```

Perfect OCP.

---

### Connection with Strategy Pattern

You may notice:

This is exactly the **Strategy Pattern**.

Strategy Pattern is actually an **implementation of OCP**.

---

### Real example from your projects

Think about your **automation system**.

If scheduler had code like:

```java
if(taskType == EMAIL)
if(taskType == SMS)
if(taskType == REPORT)
```

It would violate OCP.

Better design:

```text
EmailTask
SmsTask
ReportTask
```

Each implements:

```text
Task interface
```

Scheduler executes:

```text
task.execute()
```

That follows OCP.

---

### Real framework example

##### Spring Boot

Spring uses OCP heavily.

Example:

```text
Authentication providers
Payment integrations
Message converters
```

You extend interfaces instead of modifying framework code.

---

### Advantages of OCP

```text
Easy extension
Less risk of bugs
Better maintainability
Flexible architecture
```

---

### Interview-ready answer

If interviewer asks:

**What is Open Closed Principle?**

You can say:

> Open Closed Principle states that software entities should be open for extension but closed for modification. This means we should be able to add new functionality without modifying existing code, typically using abstraction and polymorphism.

---

### Quick thinking question

Look at this logger:

```java
class Logger {

    void log(String type) {

        if(type.equals("FILE"))
            System.out.println("Logging to file");

        else if(type.equals("DATABASE"))
            System.out.println("Logging to database");
    }
}
```

If tomorrow we add:

```text
Cloud logging
Kafka logging
```

Does this design **follow OCP or violate OCP**? Explain why.

##### Answer:

> Yes, this design **violates the Open Closed Principle because every time a new logging type is added, we must modify the `Logger` class.**

---

### Why this violates OCP

Code:

```java
class Logger {

    void log(String type) {

        if(type.equals("FILE"))
            System.out.println("Logging to file");

        else if(type.equals("DATABASE"))
            System.out.println("Logging to database");
    }
}
```

If we add new logging types:

```text
Cloud logging
Kafka logging
Elastic logging
```

We must modify:

```text
Logger class
```

Every new feature requires **editing existing code**.

That means the class is:

```text
NOT closed for modification
```

So it violates **Open Closed Principle**.

---

### Correct Design Using OCP

Use **polymorphism**.

##### Step 1 — Logger interface

```java
interface Logger {
    void log(String message);
}
```

---

##### Step 2 — Implementations

File Logger

```java
class FileLogger implements Logger {

    public void log(String message) {
        System.out.println("Logging to file: " + message);
    }
}
```

Database Logger

```java
class DatabaseLogger implements Logger {

    public void log(String message) {
        System.out.println("Logging to database: " + message);
    }
}
```

---

##### Step 3 — Usage

```java
class LogService {

    void process(Logger logger) {
        logger.log("Application started");
    }
}
```

---

### Now adding new logging type

Example:

```java
class CloudLogger implements Logger {

    public void log(String message) {
        System.out.println("Logging to cloud: " + message);
    }
}
```

No modification required in:

```text
LogService
```

That means:

```text
Open for extension
Closed for modification
```

---

### Real example from your projects

Think about your **task automation system**.

Bad design:

```java
if(taskType == EMAIL)
if(taskType == SMS)
if(taskType == CALL)
if(taskType == REPORT)
```

Every new task requires editing the scheduler.

Better design:

```text
Task interface
EmailTask
SmsTask
CallTask
ReportTask
```

Scheduler executes:

```java
task.execute();
```

Now new tasks can be added without modifying scheduler.

That is **OCP in real systems**.

---

### Important interview trick

Many design patterns exist **because of OCP**.

Examples:

| Pattern   | Why                                   |
| --------- | ------------------------------------- |
| Strategy  | Add algorithms without modifying code |
| Decorator | Add behavior dynamically              |
| Observer  | Add new listeners                     |
| Factory   | Add new object types                  |