# Facade Pattern

It is used when:

```
Complex system
Many subsystems
Client needs simple interface
```

Example from your projects:

```
Send notification
→ SMS service
→ Email service
→ WhatsApp service
→ Logging
→ Retry
→ Analytics
```

Client just calls:

```
NotificationFacade.send()
```

and facade handles everything.

---

Before we start Facade Pattern, answer one quick thinking question:

### If a client must call 10 different services in sequence, what software design problem appears?

> This creates **tight coupling because concrete classes depend directly on other concrete classes**.

Correct ✔️

But there are actually **multiple problems** in this situation.

---

# Problems When Client Calls Many Subsystems

Imagine client code like this:

```java
SmsService sms = new SmsService();
EmailService email = new EmailService();
AnalyticsService analytics = new AnalyticsService();
RetryService retry = new RetryService();
Logger logger = new Logger();

sms.send();
email.send();
analytics.update();
retry.retry();
logger.log();
```

### 1️⃣ Tight Coupling

Client depends on many concrete classes:

```
SmsService
EmailService
AnalyticsService
RetryService
Logger
```

If any service changes → client must change.

---

### 2️⃣ High Complexity

Client must know:

```
Which services to call
In what order
What parameters to pass
```

This increases **client complexity**.

---

### 3️⃣ Hard to Maintain

If new steps appear:

```
Audit logging
Rate limiting
Security validation
```

Every client must update code.

---

### 4️⃣ Violates Principle of Least Knowledge

Also called:

```
Law of Demeter
```

Clients should not know **too many subsystem details**.

---

# Solution → Facade Pattern

Facade Pattern provides:

```
Simple interface
to a complex subsystem
```

So instead of client calling many services, it calls:

```
NotificationFacade.send()
```

---

# Facade Pattern Definition

```
Facade Pattern provides a simplified interface
to a complex system of classes, libraries, or frameworks.
```

Meaning:

```
Hide complexity behind a simple API
```

---

# Real-Life Analogy

Think of **hotel reception desk**.

Instead of contacting:

```
room service
laundry
restaurant
transport
maintenance
```

You just call:

```
Reception
```

Reception coordinates everything.

Reception = **Facade**

---

# Example: Notification System

### Subsystems

```java
class SmsService {
    void send(String msg) {
        System.out.println("SMS sent: " + msg);
    }
}
```

```java
class EmailService {
    void send(String msg) {
        System.out.println("Email sent: " + msg);
    }
}
```

```java
class AnalyticsService {
    void log(String msg) {
        System.out.println("Analytics logged");
    }
}
```

---

# Facade

```java
class NotificationFacade {

    private SmsService sms = new SmsService();
    private EmailService email = new EmailService();
    private AnalyticsService analytics = new AnalyticsService();

    public void sendNotification(String msg) {

        sms.send(msg);
        email.send(msg);
        analytics.log(msg);
    }
}
```

---

# Client Code

Instead of calling many services:

```java
NotificationFacade facade = new NotificationFacade();

facade.sendNotification("Diet reminder");
```

Simple and clean.

---

# Why This Is Powerful

Client only knows:

```
NotificationFacade
```

Not:

```
SmsService
EmailService
AnalyticsService
```

This reduces coupling.

---

# Real Example From Your Projects

Imagine your automation system:

Task assignment flow:

```
Update task database
Send notification
Update dashboard metrics
Log audit event
Trigger reminder
```

Without facade:

```
TaskService
NotificationService
MetricsService
AuditService
ReminderService
```

With facade:

```
TaskWorkflowFacade.assignTask()
```

Facade orchestrates everything.

---

# Java / Framework Examples

### JDBC

You use:

```java
DriverManager.getConnection()
```

Internally many classes work, but client sees simple interface.

---

### Spring Framework

Spring Boot hides complexity of:

```
Bean creation
Dependency injection
Lifecycle management
AOP
```

Spring acts like a **large facade over many subsystems**.

---

# Advantages

```
Reduces coupling
Simplifies complex systems
Improves readability
Centralizes workflow logic
```

---

# Disadvantages

```
Facade can become a God class
May hide too much complexity
```

So use carefully.

---

# Interview Answer

If interviewer asks:

**What is Facade Pattern?**

You can say:

```
Facade Pattern is a structural design pattern that provides a simplified interface to a complex subsystem. It hides the complexity of multiple interacting classes and exposes a single unified interface to the client.
```

---

# Short Notes for Your Pattern Notes

```
Facade Pattern

Purpose:
Provide simple interface to complex subsystem.

Problem solved:
Client interacting with too many subsystem classes.

Structure:
Facade class
Subsystem classes
Client

Advantages:
Reduces coupling
Simplifies usage
Centralizes workflow logic

Examples:
Spring Boot
JDBC
Notification workflow
```

---

# Your Pattern Progress

You now understand **8 very important patterns**:

```
1 Singleton
2 Factory
3 Builder
4 Strategy
5 Observer
6 Decorator
7 Adapter
8 Facade
```

This already covers **most patterns used in real backend systems**.