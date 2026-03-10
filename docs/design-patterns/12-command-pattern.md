# Command Pattern

Used for:

```
task queues
job schedulers
undo/redo systems
request encapsulation
workflow engines
```

Real examples:

```
task execution systems
job queues
button actions
automation tools
```

And it actually **fits extremely well with your automation project** where tasks are scheduled and executed.

---

# Quick thinking question before Command Pattern

Imagine an automation system where you can schedule actions like:

```
Send email
Send SMS
Generate report
Trigger webhook
```

### Should the scheduler directly call these services, or should we encapsulate each action as an **object**? Explain why.

### Answer:
```text
Encapsulate each action as an object. If the scheduler directly calls these services, the scheduler becomes overloaded with many responsibilities. Complex execution logic becomes mixed with scheduling logic. So it will decrease the maintainability
```

# Why Encapsulate Actions as Objects

If scheduler directly calls services like:

```java
scheduler.sendEmail();
scheduler.sendSMS();
scheduler.generateReport();
scheduler.triggerWebhook();
```

then problems appear:

### 1. Scheduler becomes too complex

Scheduler must know:

* email service
* sms service
* report service
* webhook service

That violates **Single Responsibility Principle**.

---

### 2. Tight coupling

Scheduler depends on many services:

```
EmailService
SmsService
ReportService
WebhookService
```

Harder to extend.

---

### 3. Hard to add new actions

If new action appears:

```
ExportData
SendPushNotification
UpdateDashboard
```

Scheduler code must change again.

---

# Solution → Command Pattern

Command Pattern converts **a request into an object**.

Instead of:

```
scheduler → directly executes action
```

We do:

```
scheduler → executes command object
command → performs action
```

---

# Command Pattern Definition

```text
Command Pattern encapsulates a request as an object, allowing you to parameterize clients with different requests and support operations like queuing, logging, and undo.
```

Simple meaning:

```
Turn actions into objects
```

---

# Real-life analogy

Think of a **restaurant order**.

Customer says:

```
Make pizza
```

But the waiter doesn't cook.

Instead:

```
Order slip (command)
↓
Chef executes it
```

Here:

```
Customer = client
Order slip = command
Chef = receiver
```

---

# Structure

Command pattern usually has:

```
Command interface
Concrete commands
Receiver
Invoker
Client
```

---

# Example: Automation System

### Command interface

```java
interface Command {
    void execute();
}
```

---

# Receiver Classes

```java
class EmailService {
    void sendEmail() {
        System.out.println("Sending Email");
    }
}
```

```java
class SmsService {
    void sendSMS() {
        System.out.println("Sending SMS");
    }
}
```

---

# Concrete Command

```java
class SendEmailCommand implements Command {

    private EmailService emailService;

    SendEmailCommand(EmailService emailService) {
        this.emailService = emailService;
    }

    public void execute() {
        emailService.sendEmail();
    }
}
```

---

```java
class SendSmsCommand implements Command {

    private SmsService smsService;

    SendSmsCommand(SmsService smsService) {
        this.smsService = smsService;
    }

    public void execute() {
        smsService.sendSMS();
    }
}
```

---

# Invoker (Scheduler)

```java
class TaskScheduler {

    public void run(Command command) {
        command.execute();
    }
}
```

---

# Client

```java
public class Test {

    public static void main(String[] args) {

        EmailService emailService = new EmailService();
        SmsService smsService = new SmsService();

        Command emailCommand = new SendEmailCommand(emailService);
        Command smsCommand = new SendSmsCommand(smsService);

        TaskScheduler scheduler = new TaskScheduler();

        scheduler.run(emailCommand);
        scheduler.run(smsCommand);
    }
}
```

---

# Output

```
Sending Email
Sending SMS
```

---

# Key idea

Scheduler only knows:

```
Command
```

Not:

```
EmailService
SmsService
ReportService
```

This reduces coupling.

---

# Why this pattern is powerful

Command pattern allows:

```
Task queues
Delayed execution
Retry mechanisms
Undo operations
Logging commands
```

Very useful for automation systems.

---

# Real examples related to your projects

Your automation tool scheduling tasks:

```
weight check call
birthday call
follow-up call
motivation call
feedback call
```

Each can be a **Command object**.

Scheduler simply executes:

```
command.execute()
```

Perfect Command Pattern scenario.

---

# Java / framework examples

### Runnable in Java

```java
new Thread(new Runnable() {
    public void run() {
        // task
    }
});
```

Runnable acts like a **command object**.

---

### Task queues / executors

Java ExecutorService runs commands/tasks.

---

# Advantages

```
Loose coupling
Supports task queues
Easy to add new commands
Allows logging / undo
```

---

# Disadvantages

```
More classes
Extra abstraction
```

---

# Interview-ready answer

If interviewer asks:

**What is Command Pattern?**

You can say:

```
Command Pattern encapsulates a request as an object so that it can be executed, queued, logged, or undone. It decouples the object that invokes the operation from the object that performs it.
```

---

# Short notes for your notes

```
Command Pattern

Purpose:
Encapsulate requests as objects.

Structure:
Command interface
Concrete command
Receiver
Invoker
Client

Advantages:
Decouples sender and receiver
Supports task queues
Supports undo/redo
Flexible command execution

Examples:
Task schedulers
Automation systems
Thread Runnable tasks
```

---

# Your Design Pattern Progress

You now understand **12 major patterns**:

```
Singleton
Factory
Builder
Strategy
Observer
Decorator
Adapter
Facade
Proxy
Template Method
Chain of Responsibility
Command
```

These **12 patterns cover most real-world backend architecture**.