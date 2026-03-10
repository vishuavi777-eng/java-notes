# Factory Method Pattern

This one appears everywhere:

* Spring
* Android
* JDBC
* Logging frameworks
* object creation logic
* service creation
* strategy selection

And it will connect very well with your project scenarios like:

```text
Notification service selection
Payment method selection
Role based service creation
API client creation
```

---

# Before I explain Factory Pattern deeply, answer one small question:

Imagine this code:

```java
if(type.equals("UPI")) {
    return new UpiPayment();
}
else if(type.equals("CARD")) {
    return new CardPayment();
}
else if(type.equals("NETBANKING")) {
    return new NetBankingPayment();
}
```

Why is this **bad design** in large systems?

> It is **not flexible**, because when a new payment method is added we must modify the code and add another `else-if` block.

> It does **not properly encapsulate object creation logic**.

---

# Problems With This Design

Code again:

```java
if(type.equals("UPI")) {
    return new UpiPayment();
}
else if(type.equals("CARD")) {
    return new CardPayment();
}
else if(type.equals("NETBANKING")) {
    return new NetBankingPayment();
}
```

### 1️⃣ Violates **Open/Closed Principle**

When a new payment type comes:

```text
Wallet
Crypto
PayLater
```

We must **modify existing code**.

Good design principle says:

```text
Classes should be open for extension but closed for modification.
```

---

### 2️⃣ Object Creation Logic Scattered

Object creation is mixed inside business logic.

```text
Controller
Service
Business layer
```

This becomes messy in large systems.

---

### 3️⃣ Hard to Maintain

In large systems you may have:

```text
20–30 payment types
```

Your code becomes:

```java
if...
else if...
else if...
else if...
else if...
```

Maintenance becomes painful.

---

### 4️⃣ Tight Coupling

Your class now depends on:

```text
UpiPayment
CardPayment
NetBankingPayment
```

So the class is tightly coupled with concrete implementations.

Better design prefers:

```text
Depend on interface
Not implementation
```

---

### 5️⃣ Hard to Test

Testing becomes difficult because object creation is embedded in the logic.

You cannot easily mock or replace implementations.

---

# Solution → Factory Pattern

Factory pattern solves this by:

```text
Separating object creation logic
from business logic.
```

---

# Factory Pattern Definition

```text
Factory Pattern provides an interface for creating objects
but allows subclasses or a factory class to decide
which object to instantiate.
```

---

# Simple Factory Example

First define interface:

```java
interface Payment {
    void pay();
}
```

---

### Concrete classes

```java
class UpiPayment implements Payment {

    public void pay() {
        System.out.println("UPI Payment");
    }
}
```

```java
class CardPayment implements Payment {

    public void pay() {
        System.out.println("Card Payment");
    }
}
```

```java
class NetBankingPayment implements Payment {

    public void pay() {
        System.out.println("NetBanking Payment");
    }
}
```

---

# Factory Class

```java
class PaymentFactory {

    public static Payment getPayment(String type) {

        if(type.equals("UPI"))
            return new UpiPayment();

        if(type.equals("CARD"))
            return new CardPayment();

        if(type.equals("NETBANKING"))
            return new NetBankingPayment();

        return null;
    }
}
```

---

# Usage

```java
Payment payment = PaymentFactory.getPayment("UPI");

payment.pay();
```

Output:

```
UPI Payment
```

Now business code does not know which class is created.

---

# Advantages

### 1️⃣ Centralized object creation

All creation logic is inside:

```text
PaymentFactory
```

---

### 2️⃣ Loose coupling

Client depends on:

```text
Payment interface
```

not concrete classes.

---

### 3️⃣ Cleaner code

Instead of large condition blocks everywhere, object creation is centralized.

---

# Real Example From Your Project

Imagine your automation system sending notifications.

```text
Email
SMS
WhatsApp
Push Notification
```

Without factory:

```java
if(type.equals("EMAIL")) {
   return new EmailNotification();
}
else if(type.equals("SMS")) {
   return new SmsNotification();
}
else if(type.equals("WHATSAPP")) {
   return new WhatsappNotification();
}
```

With factory:

```java
Notification notification =
    NotificationFactory.getNotification(type);

notification.send();
```

Cleaner and scalable.

---

# Real Java Examples of Factory Pattern

### 1️⃣ `Calendar.getInstance()`

```java
Calendar calendar = Calendar.getInstance();
```

Factory decides:

```text
GregorianCalendar
or
other calendar type
```

---

### 2️⃣ `DriverManager.getConnection()`

```java
Connection conn =
    DriverManager.getConnection(url);
```

Factory decides which driver creates the connection.

---

### 3️⃣ `LoggerFactory.getLogger()`

```java
Logger log = LoggerFactory.getLogger(MyClass.class);
```

Logging framework decides implementation.

---

# Interview Ready Answer

If interviewer asks:

**What is Factory Pattern?**

You can say:

```text
Factory Pattern is a creational design pattern that encapsulates object creation logic. Instead of directly instantiating objects using the new keyword, a factory method is used to create objects. This promotes loose coupling and improves maintainability by separating object creation from business logic.
```

---

# Quick Notes for Your Notes File

```
Factory Pattern

Purpose:
Encapsulate object creation logic.

Problem:
Direct object creation causes tight coupling and large conditional blocks.

Solution:
Use a factory class that decides which object to create.

Structure:
Interface → Product
Concrete classes → Implementations
Factory class → Creates objects

Advantages:
Loose coupling
Centralized creation logic
Better maintainability

Examples in Java:
Calendar.getInstance()
DriverManager.getConnection()
LoggerFactory.getLogger()
```

---

# Small Interview Question For You

Imagine this system:

```text
Admin
Candidate
Volunteer
```

Each role needs different dashboard service.

Which design pattern would be best to create:

```text
AdminDashboardService
CandidateDashboardService
VolunteerDashboardService
```

and **why?**

Answer in 2–3 lines.


### Answer: (Interview Ready Version)

```text
I would use the Factory Pattern to create different dashboard services based on the user's role. I would create a DashboardServiceFactory class that returns the appropriate DashboardService implementation such as AdminDashboardService, CandidateDashboardService, or VolunteerDashboardService.

This pattern encapsulates object creation and keeps the business logic decoupled from concrete service implementations. As a result, client classes depend only on the DashboardService interface rather than specific implementations, which improves maintainability and scalability.
```

This is a **very strong backend interview answer**.

---

# Example Implementation

### Interface

```java
interface DashboardService {
    void loadDashboard();
}
```

---

### Concrete Classes

```java
class AdminDashboardService implements DashboardService {
    public void loadDashboard() {
        System.out.println("Admin Dashboard");
    }
}
```

```java
class CandidateDashboardService implements DashboardService {
    public void loadDashboard() {
        System.out.println("Candidate Dashboard");
    }
}
```

```java
class VolunteerDashboardService implements DashboardService {
    public void loadDashboard() {
        System.out.println("Volunteer Dashboard");
    }
}
```

---

# Factory

```java
class DashboardServiceFactory {

    public static DashboardService getService(String role) {

        if(role.equals("ADMIN"))
            return new AdminDashboardService();

        if(role.equals("CANDIDATE"))
            return new CandidateDashboardService();

        if(role.equals("VOLUNTEER"))
            return new VolunteerDashboardService();

        throw new IllegalArgumentException("Invalid role");
    }
}
```

---

# Usage

```java
DashboardService service =
        DashboardServiceFactory.getService("ADMIN");

service.loadDashboard();
```

Output:

```
Admin Dashboard
```

---

# Why This Fits Your Project Style

This pattern is useful in systems like yours where different **roles or modules require different services**.

Examples that match your projects:

```
Role based dashboard services
Notification type selection
Payment gateway selection
Report generator type
Diet plan generator type
```

Instead of spreading `if/else` logic everywhere, the **factory centralizes object creation**.

---

# Real Java Examples of Factory Pattern

These are **great to mention in interviews**.

### 1️⃣ Calendar Factory

```java
Calendar calendar = Calendar.getInstance();
```

The factory decides which calendar implementation to create.

---

### 2️⃣ JDBC Connection

```java
Connection conn =
    DriverManager.getConnection(url);
```

DriverManager internally decides which database driver to use.

---

### 3️⃣ Logger Factory

```java
Logger log =
    LoggerFactory.getLogger(MyClass.class);
```

Logging framework decides implementation.

---

# Important Factory Pattern Limitation

A good interviewer may ask this.

Problem:

```text
Factory class may still contain if/else logic.
```

When types grow very large, we may switch to:

```
Factory Method Pattern
Abstract Factory Pattern
Strategy Pattern
Dependency Injection
```

We will see those next.

---

# Short Notes for Your Pattern Notes

```
Factory Pattern

Purpose:
Encapsulate object creation logic.

Problem solved:
Avoid large if/else blocks and tight coupling.

Structure:
Product interface
Concrete implementations
Factory class

Advantages:
Loose coupling
Centralized object creation
Better maintainability

Java examples:
Calendar.getInstance()
DriverManager.getConnection()
LoggerFactory.getLogger()
```