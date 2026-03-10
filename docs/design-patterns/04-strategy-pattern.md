# Strategy Pattern

This one is extremely useful in systems where **behavior can change dynamically**.

Examples from your project style:

```
Different diet calculation algorithms
Different payment methods
Different notification channels
Different sorting strategies
Different discount strategies
```

Strategy Pattern is used heavily in:

```
Spring
Collections.sort()
Payment gateways
Rules engines
```

---

# Quick Thinking Question Before We Start Strategy Pattern

Imagine your nutrition system calculates diet plan using **different algorithms**:

```
Weight loss algorithm
Muscle gain algorithm
Diabetes diet algorithm
Ketogenic diet algorithm
```

### Would using **if-else conditions** for selecting algorithm be a good design?

Explain **why or why not**.

### Answer:
> If a new strategy is added, **maintainability decreases because the existing code must be modified**.

---

# Why `if-else` Is a Bad Design Here

Example:

```java
if(type.equals("WEIGHT_LOSS")) {
    calculateWeightLossDiet();
}
else if(type.equals("MUSCLE_GAIN")) {
    calculateMuscleGainDiet();
}
else if(type.equals("KETO")) {
    calculateKetoDiet();
}
```

Problems:

### 1️⃣ Violates Open/Closed Principle

When new algorithm comes:

```text
Diabetes diet
PCOS diet
Athlete diet
```

You must **modify the same code again**.

---

### 2️⃣ Large Conditional Blocks

Over time this becomes:

```java
if...
else if...
else if...
else if...
else if...
```

This becomes messy and error-prone.

---

### 3️⃣ Hard to Extend

Different algorithms may require different:

```text
calculation logic
nutrition ratios
meal rules
restrictions
```

Putting everything in one class becomes complex.

---

# Solution → Strategy Pattern

Strategy Pattern allows:

```text
Different algorithms to be encapsulated
and selected dynamically at runtime.
```

Instead of `if-else`, we **plug different strategies**.

---

# Strategy Pattern Definition

```text
Strategy Pattern defines a family of algorithms,
encapsulates each one, and makes them interchangeable.
```

Meaning:

```text
Different behaviors → separate classes
```

---

# Real-Life Analogy

Think of **Google Maps**.

You can choose:

```text
Car route
Walking route
Bike route
Public transport route
```

The route calculation algorithm changes, but the **map system stays the same**.

That is Strategy Pattern.

---

# Structure of Strategy Pattern

3 parts:

```text
Strategy Interface
Concrete Strategies
Context Class
```

---

# Example: Diet Calculation Strategy

### Strategy Interface

```java
interface DietStrategy {
    void calculateDiet();
}
```

---

### Strategy 1

```java
class WeightLossStrategy implements DietStrategy {

    public void calculateDiet() {
        System.out.println("Calculating weight loss diet");
    }
}
```

---

### Strategy 2

```java
class MuscleGainStrategy implements DietStrategy {

    public void calculateDiet() {
        System.out.println("Calculating muscle gain diet");
    }
}
```

---

### Strategy 3

```java
class KetoStrategy implements DietStrategy {

    public void calculateDiet() {
        System.out.println("Calculating keto diet");
    }
}
```

---

# Context Class

```java
class DietPlanner {

    private DietStrategy strategy;

    public void setStrategy(DietStrategy strategy) {
        this.strategy = strategy;
    }

    public void generateDiet() {
        strategy.calculateDiet();
    }
}
```

---

# Usage

```java
public class Test {

    public static void main(String[] args) {

        DietPlanner planner = new DietPlanner();

        planner.setStrategy(new WeightLossStrategy());
        planner.generateDiet();

        planner.setStrategy(new KetoStrategy());
        planner.generateDiet();
    }
}
```

Output:

```text
Calculating weight loss diet
Calculating keto diet
```

---

# Key Idea

Instead of:

```text
if(type == A)
if(type == B)
if(type == C)
```

We do:

```text
plug different strategy objects
```

---

# Real Example From Your Projects

Imagine your **notification system**.

Different strategies:

```text
SMS notification
Email notification
WhatsApp notification
Push notification
```

Strategy pattern fits perfectly.

Example:

```java
NotificationStrategy strategy;
```

Then dynamically choose:

```java
strategy = new EmailStrategy();
strategy = new SmsStrategy();
strategy = new WhatsappStrategy();
```

---

# Java Example

### Sorting Strategy

Java Collections uses strategy pattern.

Example:

```java
Collections.sort(list, comparator);
```

Comparator is the **strategy**.

Different comparators = different sorting behavior.

---

# Advantages

```text
Removes large conditional statements
Easy to add new algorithms
Follows Open/Closed Principle
Algorithms become reusable
```

---

# Disadvantages

```text
More classes
Client must understand strategies
```

---

# Interview Answer

If interviewer asks:

**What is Strategy Pattern?**

You can say:

```text
Strategy Pattern is a behavioral design pattern that allows selecting an algorithm at runtime by encapsulating different algorithms into separate classes that implement a common interface.
```

---

# Short Notes for Your Pattern Notes

```text
Strategy Pattern

Purpose:
Encapsulate multiple algorithms and switch them dynamically.

Structure:
Strategy interface
Concrete strategies
Context class

Advantages:
Removes if-else logic
Follows Open/Closed principle
Easy to extend algorithms

Examples:
Comparator in Collections.sort()
Payment strategies
Notification strategies
Diet calculation strategies
```

---

# Small Thinking Question (Important)

Imagine a **payment system**:

```text
UPI
Credit Card
Net Banking
Wallet
```

### Would **Strategy Pattern** or **Factory Pattern** be better here?

And **why?**

### Answer About Strategy Pattern:

```text
Removes large if-else conditions
Easy to add new payment method
Algorithm chosen at runtime
```

That is exactly what Strategy Pattern does.

---

# Doubt: Is Strategy Pattern Tightly Coupled?

Short answer:

```text
No, Strategy Pattern actually reduces coupling.
```

But there is an important nuance.

---

# Without Strategy Pattern (Bad Coupling)

Example:

```java
class PaymentService {

    void pay(String type) {

        if(type.equals("UPI")) {
            new UpiPayment().pay();
        }
        else if(type.equals("CARD")) {
            new CardPayment().pay();
        }
    }
}
```

Problems:

`PaymentService` depends directly on:

```text
UpiPayment
CardPayment
NetBankingPayment
```

So coupling is **high**.

---

# With Strategy Pattern (Loose Coupling)

```java
class PaymentService {

    PaymentStrategy strategy;

    PaymentService(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    void pay() {
        strategy.pay();
    }
}
```

Now `PaymentService` depends only on:

```text
PaymentStrategy interface
```

Not concrete classes.

This is called:

```text
Programming to an interface, not implementation
```

Which is a key OOP principle.

---

# Where Your Doubt Comes From

You are correct that **the client must choose the strategy**.

Example:

```java
PaymentStrategy strategy = new UpiPayment();
PaymentService service = new PaymentService(strategy);
```

So some logic still decides which strategy to use.

That logic usually lives in:

```text
Factory
Dependency Injection
Configuration
```

---

# Best Design in Real Systems

Most real systems combine:

```text
Factory Pattern
+
Strategy Pattern
```

Example:

```
Factory → chooses strategy
Strategy → executes algorithm
```

---

# Example

```java
PaymentStrategy strategy =
        PaymentStrategyFactory.getStrategy(type);

PaymentService service = new PaymentService(strategy);

service.pay();
```

Here:

```
Factory → creation
Strategy → behavior
```

This is very common architecture.

---

# Real Example From Your Project Context

Imagine your **notification system**.

Channels:

```
SMS
Email
WhatsApp
Push
```

Factory decides:

```
SmsStrategy
EmailStrategy
WhatsappStrategy
```

Strategy handles:

```
send()
```

Clean separation.

---

# Visual Architecture

```
Client
   ↓
Factory
   ↓
Strategy Interface
   ↓
Concrete Strategy
```

---

# Important Interview Insight

Interviewers sometimes ask:

**Factory vs Strategy difference**

Answer:

```
Factory → decides which object to create
Strategy → decides which algorithm to execute
```

Example:

```
Factory → create PaymentStrategy
Strategy → execute payment
```

---

# Your Current Pattern Progress

You now understand:

```
Singleton
Factory
Builder
Strategy
```

These are **4 extremely important patterns**.