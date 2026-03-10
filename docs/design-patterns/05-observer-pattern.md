# Observer Pattern

This pattern is used in:

```
Event systems
Notification systems
Message queues
UI listeners
Reactive programming
```

Java examples:

```
Event listeners
Reactive streams
Spring events
```

It also matches well with your systems like:

```
User action → notify multiple services
Diet update → notify user
Payment success → notify email + SMS
```

---

# Small Thinking Question Before Observer Pattern

Imagine this system:

```
User completes payment
```

Multiple things must happen:

```
Send email receipt
Send SMS confirmation
Update analytics
Update order history
```

If `PaymentService` directly calls all these services:

```
EmailService.send()
SmsService.send()
AnalyticsService.update()
OrderService.update()
```

### What design problem appears here?

Explain in 2–3 lines.

### Answer:
> PaymentService may need to do extra work that is not its responsibility. Also, it requires dependencies on many other services.

# Why this is a design problem

If `PaymentService` directly calls:

* `EmailService`
* `SmsService`
* `AnalyticsService`
* `OrderService`

then these problems appear:

### 1. Single Responsibility Principle breaks

`PaymentService` should mainly handle **payment processing**.
But now it is also handling:

* notifications
* analytics
* order updates

So one class is doing too many jobs.

---

### 2. Tight coupling increases

`PaymentService` now depends on many concrete services.

If one new action comes, like:

* send WhatsApp message
* create audit log
* trigger cashback

then `PaymentService` must be modified again.

---

### 3. Hard to extend and maintain

Whenever payment success flow changes, core payment code changes too.

That makes the system:

* harder to maintain
* harder to test
* more fragile

---

# This leads to Observer Pattern

Observer Pattern is useful when:

```text
One event happens
→ multiple dependent actions should automatically react
```

Example:

```text
Payment successful
→ Email observer
→ SMS observer
→ Analytics observer
→ Order observer
```

So payment service only says:

```text
Payment completed
```

and observers react independently.

---

# Observer Pattern Definition

Observer Pattern defines a **one-to-many dependency** between objects, so when one object changes state, all its dependent objects are notified automatically.

---

# Real-life analogy

Think of a **YouTube channel**:

* channel uploads video
* all subscribers get notified

Here:

* Channel = Subject
* Subscribers = Observers

That is Observer Pattern.

---

# Structure

Observer Pattern has 2 main parts:

### 1. Subject

The main object being observed.

### 2. Observers

Objects that want updates when subject changes.

---

# Java Example

## Observer interface

```java
interface PaymentObserver {
    void update(String event);
}
```

## Concrete observers

```java
class EmailService implements PaymentObserver {
    public void update(String event) {
        System.out.println("Email sent for: " + event);
    }
}
```

```java
class SmsService implements PaymentObserver {
    public void update(String event) {
        System.out.println("SMS sent for: " + event);
    }
}
```

```java
class AnalyticsService implements PaymentObserver {
    public void update(String event) {
        System.out.println("Analytics updated for: " + event);
    }
}
```

---

## Subject

```java
import java.util.ArrayList;
import java.util.List;

class PaymentService {

    private List<PaymentObserver> observers = new ArrayList<>();

    public void addObserver(PaymentObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(PaymentObserver observer) {
        observers.remove(observer);
    }

    public void completePayment() {
        System.out.println("Payment completed");
        notifyObservers("Payment Success");
    }

    private void notifyObservers(String event) {
        for (PaymentObserver observer : observers) {
            observer.update(event);
        }
    }
}
```

---

## Usage

```java
public class Test {
    public static void main(String[] args) {
        PaymentService paymentService = new PaymentService();

        paymentService.addObserver(new EmailService());
        paymentService.addObserver(new SmsService());
        paymentService.addObserver(new AnalyticsService());

        paymentService.completePayment();
    }
}
```

### Output

```text
Payment completed
Email sent for: Payment Success
SMS sent for: Payment Success
Analytics updated for: Payment Success
```

---

# Why this is better

Now `PaymentService` does not directly know the implementation details of:

* email
* sms
* analytics

It only knows:

```text
I have observers, notify them
```

So coupling becomes lower.

---

# Real example from your project context

This pattern fits many of your project types:

### Nutrition / diet app

When diet plan updates:

* notify user
* update dashboard
* log analytics
* trigger reminder recalculation

### Automation tool

When task assigned:

* notify employee
* log action
* update queue metrics

### Campaign / voter project

When volunteer assigned:

* update dashboard
* send WhatsApp
* log activity
* refresh counts

These are strong Observer Pattern examples.

---

# Java / framework examples

Observer-like ideas appear in:

* event listeners in UI
* Spring Application Events
* reactive streams
* message listeners

---

# Advantages

* loose coupling
* easy to add new observers
* follows Open/Closed Principle
* good for event-driven systems

---

# Disadvantages

* too many observers can make flow harder to trace
* notification order may matter
* debugging event chains can be difficult

---

# Interview-ready answer

```text
Observer Pattern is a behavioral design pattern where one object, called the subject, maintains a list of dependent objects called observers. When the subject changes state, it notifies all observers automatically. It is useful in event-driven systems such as notifications, listeners, and update propagation.
```

---

# Short notes for your separate notes

```text
Observer Pattern

Purpose:
Notify multiple dependent objects automatically when one object changes state.

Structure:
Subject
Observer interface
Concrete observers

Use cases:
Notifications
Event systems
Listeners
Analytics updates

Advantages:
Loose coupling
Easy to extend
Good for one-to-many event handling

Project examples:
Payment success notifications
Diet update notifications
Task assignment updates
Volunteer assignment updates
```

---

# Small thinking question

In Observer Pattern, who should know whom?

1. Observer should know Subject only
2. Subject should know Observer only
3. Both should know concrete classes of each other

Which is the better design, and why?

### Answer:

```
2. Subject should know Observer only
```

Let’s explain why. This is an **important Observer Pattern concept**.

---

# Correct Relationship in Observer Pattern

```
Subject  →  Observer interface
Observer →  Subject (optional)
```

Meaning:

```
Subject knows observers
Observers do NOT need to know other observers
```

---

# Why Subject Must Know Observers

The subject must maintain a list:

```java
List<Observer> observers;
```

So it can call:

```java
observer.update();
```

Therefore:

```
Subject must know Observer interface
```

---

# Observers Usually Do NOT Need to Know the Subject

Observers simply receive updates:

```java
update(event)
```

They don't need to know how the subject works internally.

Example:

```
PaymentService → notifies observers
EmailService → just reacts
SmsService → just reacts
```

EmailService doesn't need to know:

```
payment logic
other observers
internal state
```

This keeps the system **loosely coupled**.

---

# Correct Dependency

Good Observer design:

```
Subject
   ↓
Observer Interface
   ↓
Concrete Observers
```

Subject stores:

```java
List<Observer>
```

But it doesn't know concrete classes like:

```
EmailService
SmsService
AnalyticsService
```

It only knows the **Observer interface**.

---

# Why Option 1 Is Not Ideal

This creates tighter coupling because observers must depend on the subject's structure.

That is not necessary in most designs.

Observers should only react to notifications.

---

# Best Design Rule

```
Subject depends on Observer interface
Observers implement Observer interface
```

This follows:

```
Dependency Inversion Principle
```

---

# Visual Model

```
            +------------------+
            |     Subject      |
            |------------------|
            | List<Observer>   |
            | notifyObservers()|
            +--------+---------+
                     |
                     v
             +---------------+
             |   Observer    |
             |---------------|
             | update()      |
             +-------+-------+
                     |
        ------------------------------
        |            |              |
        v            v              v
   EmailObserver  SmsObserver  AnalyticsObserver
```

---

# Interview Trick Question

Interviewers sometimes ask:

> Who should know whom in Observer Pattern?

Correct answer:

```
Subject knows Observer interface
Observers implement Observer
Subject should NOT depend on concrete observer classes
```

---

# Your Design Pattern Progress

So far you have **very strong understanding** of:

```
1. Singleton
2. Factory
3. Builder
4. Strategy
5. Observer
```

These **5 patterns alone cover a huge portion of real-world backend architecture**.