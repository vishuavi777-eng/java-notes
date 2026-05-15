# Dependency Inversion Principle

## Definition

High-level modules should depend on abstractions, not directly on low-level implementation classes.

## Why It Matters

It reduces coupling and makes code easier to test, replace, and extend.

## Core Example

OrderService depends on PaymentGateway interface, not directly on RazorpayPaymentGateway.

## Common Traps

- Dependency inversion is not the same as dependency injection.
- Do not create interfaces for every class without need.
- Abstractions should be stable and meaningful.
- Concrete implementations still exist.
- Spring DI is a tool that helps apply DIP.

## Interview Answer

Dependency Inversion Principle says important business code should depend on abstractions rather than concrete details. This allows implementations to change without forcing high-level logic to change.

## Quick Revision

- Depend on abstractions.
- High-level logic should not depend on details.
- Improves testing.
- Works well with DI.
- Interfaces should be meaningful.
- Reduces coupling.

## Deep Dive

### D — Dependency Inversion Principle (DIP)

This principle is the **foundation of modern frameworks** like:

* Spring
* Android DI
* Microservices architecture

---

### Quick thinking question

Look at this code:

```java
class OrderService {

    private MySQLDatabase database = new MySQLDatabase();

    void saveOrder() {
        database.save();
    }
}
```

If tomorrow we change database to:

```text
PostgreSQL
MongoDB
Redis
```

What problem will appear here? Explain.


##### Answer:
> We would need to create a new database class and **change the dependent code wherever it is directly used**.

---

### Why this design is problematic

Code:

```java
class OrderService {

    private MySQLDatabase database = new MySQLDatabase();

    void saveOrder() {
        database.save();
    }
}
```

#### Problem 1 — Tight coupling

`OrderService` directly depends on:

```text
MySQLDatabase
```

That means `OrderService` is tightly coupled to a **concrete class**.

---

#### Problem 2 — Hard to replace implementation

If tomorrow database changes to:

```text
PostgreSQL
MongoDB
Redis
```

we must modify:

```text
OrderService
```

So the business class is directly affected by low-level implementation changes.

---

#### Problem 3 — Hard to test

Suppose in unit testing you want:

```text
FakeDatabase
MockDatabase
```

Current design makes that difficult because `OrderService` creates `MySQLDatabase` itself.

---

### Dependency Inversion Principle (DIP)

##### Definition

```text
High-level modules should not depend on low-level modules.
Both should depend on abstractions.

Abstractions should not depend on details.
Details should depend on abstractions.
```

This sounds complex at first, so let’s make it simple.

---

### Simple meaning of DIP

Bad design:

```text
OrderService → MySQLDatabase
```

Good design:

```text
OrderService → Database interface
MySQLDatabase → implements Database
PostgreSQLDatabase → implements Database
```

So instead of depending on a concrete class, depend on an **abstraction**.

---

### Correct design using DIP

#### Step 1 — Create abstraction

```java
interface Database {
    void save();
}
```

---

#### Step 2 — Concrete implementations

```java
class MySQLDatabase implements Database {

    public void save() {
        System.out.println("Saving to MySQL");
    }
}
```

```java
class PostgreSQLDatabase implements Database {

    public void save() {
        System.out.println("Saving to PostgreSQL");
    }
}
```

---

#### Step 3 — High-level module depends on interface

```java
class OrderService {

    private Database database;

    OrderService(Database database) {
        this.database = database;
    }

    void saveOrder() {
        database.save();
    }
}
```

---

#### Usage

```java
public class Test {
    public static void main(String[] args) {

        Database db = new MySQLDatabase();
        OrderService service = new OrderService(db);

        service.saveOrder();
    }
}
```

---

### Now switching database is easy

```java
Database db = new PostgreSQLDatabase();
OrderService service = new OrderService(db);
```

No change needed in:

```text
OrderService
```

That is DIP.

---

### Key idea to remember

```text
Business logic should depend on interfaces, not concrete classes.
```

This is one of the most important interview lines.

---

### Real-life analogy

Think of a **charger cable**.

Your phone depends on:

```text
USB standard
```

not directly on one specific wall socket design.

The abstraction is:

```text
USB interface
```

Different chargers implement it.

Same idea in software.

---

### Real example from your projects

This fits your work very well.

#### Example 1 — Notification system

Bad:

```java
class TaskService {
    private SmsService smsService = new SmsService();
}
```

Good:

```java
interface NotificationService {
    void send();
}
```

Implementations:

```text
SmsNotificationService
EmailNotificationService
WhatsappNotificationService
```

Now `TaskService` depends on:

```text
NotificationService
```

not concrete classes.

---

#### Example 2 — Dashboard services

You already gave a good Factory example:

```text
AdminDashboardService
CandidateDashboardService
VolunteerDashboardService
```

DIP says business logic should depend on:

```text
DashboardService interface
```

not each implementation directly.

---

### DIP and Dependency Injection

Very important interview point:

DIP is the **principle**.
Dependency Injection is a **way to implement it**.

Example:

```java
OrderService(Database database)
```

This is **constructor injection**.

So:

```text
DIP = design principle
DI = implementation technique
```

---

### DIP vs OCP

You correctly noticed OCP also breaks here.

That’s true.

#### OCP

If implementation changes, existing code must be modified.

#### DIP

The root problem is that high-level code depends on low-level concrete details.

So both relate, but the main principle here is **DIP**.

---

### Benefits of DIP

```text
Loose coupling
Easy testing
Easy replacement of implementations
Flexible architecture
Cleaner code
```

---

### Interview-ready answer

If interviewer asks:

**What is Dependency Inversion Principle?**

You can say:

> Dependency Inversion Principle states that high-level modules should not depend on low-level modules. Both should depend on abstractions. In practice, this means business classes should depend on interfaces, not concrete implementations.

That is a strong answer.