# Decorator Pattern

It is used for:

```
dynamic feature extension
wrapping behavior
stream processing
middleware layers
logging layers
security filters
```

Java uses Decorator pattern heavily in:

```
InputStream
OutputStream
BufferedInputStream
BufferedReader
```

---

# Small thinking question before Decorator

Imagine a **NotificationService**.

Basic service:

```
send message
```

But sometimes you want:

```
send message + logging
send message + encryption
send message + retry logic
send message + rate limiting
```

Should we create classes like:

```
LoggingNotificationService
EncryptedNotificationService
RetryNotificationService
EncryptedLoggingRetryNotificationService
```

### What problem appears here?

### Answer:

> No, because this approach would create **too many classes and become difficult to maintain**.

Let's understand it step by step:

---

# Problem With That Approach

If we create classes like:

```
LoggingNotificationService
EncryptedNotificationService
RetryNotificationService
EncryptedLoggingNotificationService
EncryptedRetryNotificationService
RetryLoggingNotificationService
EncryptedRetryLoggingNotificationService
```

Then we get a **class explosion problem**.

Example combinations:

```
Logging
Encryption
Retry
RateLimit
Metrics
Tracing
```

Possible combinations grow like:

```
2^N combinations
```

So classes become impossible to manage.

---

# This Problem Is Called

```
Class Explosion Problem
```

or

```
Feature Combination Explosion
```

---

# Solution → Decorator Pattern

Decorator Pattern allows us to:

```
Add behavior dynamically
without modifying existing classes
```

Instead of creating many subclasses.

---

# Decorator Pattern Definition

```
Decorator Pattern attaches additional responsibilities
to an object dynamically without modifying its structure.
```

Simple meaning:

```
Wrap object with extra behavior
```

---

# Real Life Analogy

Think of **coffee shop orders** ☕

Base item:

```
Coffee
```

Add-ons:

```
Milk
Sugar
Chocolate
Cream
```

Instead of creating classes like:

```
MilkCoffee
SugarCoffee
MilkSugarCoffee
MilkSugarChocolateCoffee
```

We wrap the coffee with decorators.

Example:

```
Coffee → Milk → Sugar → Chocolate
```

---

# Structure of Decorator Pattern

There are **4 parts**:

```
Component Interface
Concrete Component
Decorator Base Class
Concrete Decorators
```

---

# Example: Notification Service

### Component Interface

```java
interface NotificationService {
    void send(String message);
}
```

---

# Concrete Component

```java
class BasicNotification implements NotificationService {

    public void send(String message) {
        System.out.println("Sending message: " + message);
    }
}
```

---

# Decorator Base Class

```java
abstract class NotificationDecorator implements NotificationService {

    protected NotificationService service;

    NotificationDecorator(NotificationService service) {
        this.service = service;
    }
}
```

---

# Logging Decorator

```java
class LoggingDecorator extends NotificationDecorator {

    LoggingDecorator(NotificationService service) {
        super(service);
    }

    public void send(String message) {
        System.out.println("Logging notification");
        service.send(message);
    }
}
```

---

# Encryption Decorator

```java
class EncryptionDecorator extends NotificationDecorator {

    EncryptionDecorator(NotificationService service) {
        super(service);
    }

    public void send(String message) {
        String encrypted = "[encrypted]" + message;
        service.send(encrypted);
    }
}
```

---

# Retry Decorator

```java
class RetryDecorator extends NotificationDecorator {

    RetryDecorator(NotificationService service) {
        super(service);
    }

    public void send(String message) {
        System.out.println("Retry logic applied");
        service.send(message);
    }
}
```

---

# Usage

```java
public class Test {

    public static void main(String[] args) {

        NotificationService service =
            new RetryDecorator(
                new EncryptionDecorator(
                    new LoggingDecorator(
                        new BasicNotification()
                    )
                )
            );

        service.send("Diet reminder");
    }
}
```

---

# Execution Flow

```
RetryDecorator
   ↓
EncryptionDecorator
   ↓
LoggingDecorator
   ↓
BasicNotification
```

Output:

```
Retry logic applied
Logging notification
Sending message: [encrypted]Diet reminder
```

---

# Why This Is Powerful

You can dynamically combine behaviors:

```
Logging + Encryption
Encryption + Retry
Retry + Logging + Metrics
```

Without creating new classes.

---

# Real Java Example

Java IO streams use Decorator Pattern.

Example:

```java
InputStream file =
        new FileInputStream("data.txt");

InputStream buffered =
        new BufferedInputStream(file);

InputStream data =
        new DataInputStream(buffered);
```

Here:

```
FileInputStream
BufferedInputStream
DataInputStream
```

are **decorators wrapping each other**.

---

# Real Example From Your Projects

Imagine your automation tool sending notifications.

Base:

```
NotificationService
```

Decorators:

```
LoggingDecorator
RetryDecorator
RateLimitDecorator
AuditDecorator
```

So a notification can be:

```
Notification
→ Logging
→ Retry
→ Audit
```

Clean architecture.

---

# Advantages

```
Avoid class explosion
Add behavior dynamically
Follows Open/Closed Principle
More flexible than inheritance
```

---

# Disadvantages

```
More small classes
Debugging chain may be harder
```

---

# Interview Answer

If interviewer asks:

**What is Decorator Pattern?**

You can say:

```
Decorator Pattern is a structural design pattern that allows behavior to be added to an object dynamically by wrapping it with decorator classes that implement the same interface.
```

---

# Short Notes for Your Pattern Notes

```
Decorator Pattern

Purpose:
Add responsibilities dynamically.

Problem solved:
Class explosion due to multiple feature combinations.

Structure:
Component interface
Concrete component
Decorator base class
Concrete decorators

Examples:
Java IO Streams
Logging wrappers
Security filters
Retry wrappers
```

---

# Your Progress (Very Good)

You now understand:

```
Singleton
Factory
Builder
Strategy
Observer
Decorator
```

These **6 patterns already cover ~70% of real-world backend architecture**.