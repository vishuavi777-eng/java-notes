# State Pattern

Used when an object's behavior changes based on its state.

Examples:

```
Order state
Payment state
Task workflow state
Campaign state
User account state
```

Very common in backend systems.

---

# Quick thinking question before State Pattern

Imagine an **Order system**:

```
CREATED
PAID
SHIPPED
DELIVERED
CANCELLED
```

Should we manage behavior using:

```
if (state == CREATED)
if (state == PAID)
if (state == SHIPPED)
```

or is there a better design approach? Explain why.

# Why `if-else` is bad for order states

Suppose you write:

```java
if (state == CREATED) {
    // allow payment
}
else if (state == PAID) {
    // allow shipping
}
else if (state == SHIPPED) {
    // allow delivery
}
else if (state == CANCELLED) {
    // no action
}
```

As states grow, problems appear:

* too many `if-else` conditions
* behavior logic becomes scattered
* hard to maintain
* hard to add new state
* state transition rules become messy

For example:

```text
CREATED  -> can pay, can cancel
PAID     -> can ship, can refund
SHIPPED  -> can deliver
DELIVERED -> no more shipping
CANCELLED -> no more actions
```

Now every action needs state checks.

---

# Solution → State Pattern

State Pattern is used when:

```text
an object's behavior changes depending on its current state
```

Instead of checking state with `if-else`, we move behavior into **separate state classes**.

---

# State Pattern Definition

```text
State Pattern allows an object to alter its behavior when its internal state changes. The object appears to change its class.
```

Simple meaning:

```text
Different state = different behavior
```

---

# Real-life analogy

Think of a **traffic signal**.

State can be:

* Red
* Yellow
* Green

Behavior changes based on current state.

For example:

* Red → stop
* Green → go
* Yellow → slow down

You do not want one huge `if-else` everywhere.
Better to model each state separately.

---

# Order Example

States:

```text
CreatedState
PaidState
ShippedState
DeliveredState
CancelledState
```

Each state decides:

* what action is allowed
* what next state should be

---

# Structure of State Pattern

Usually there are 3 parts:

```text
State interface
Concrete state classes
Context object
```

---

# Example Implementation

## State interface

```java
interface OrderState {
    void next(OrderContext context);
    void cancel(OrderContext context);
    String getStatus();
}
```

---

## Created state

```java
class CreatedState implements OrderState {

    public void next(OrderContext context) {
        System.out.println("Payment completed. Moving to PAID state.");
        context.setState(new PaidState());
    }

    public void cancel(OrderContext context) {
        System.out.println("Order cancelled from CREATED state.");
        context.setState(new CancelledState());
    }

    public String getStatus() {
        return "CREATED";
    }
}
```

---

## Paid state

```java
class PaidState implements OrderState {

    public void next(OrderContext context) {
        System.out.println("Order shipped. Moving to SHIPPED state.");
        context.setState(new ShippedState());
    }

    public void cancel(OrderContext context) {
        System.out.println("Order cancelled after payment.");
        context.setState(new CancelledState());
    }

    public String getStatus() {
        return "PAID";
    }
}
```

---

## Shipped state

```java
class ShippedState implements OrderState {

    public void next(OrderContext context) {
        System.out.println("Order delivered. Moving to DELIVERED state.");
        context.setState(new DeliveredState());
    }

    public void cancel(OrderContext context) {
        System.out.println("Cannot cancel. Order already shipped.");
    }

    public String getStatus() {
        return "SHIPPED";
    }
}
```

---

## Delivered state

```java
class DeliveredState implements OrderState {

    public void next(OrderContext context) {
        System.out.println("Order already delivered.");
    }

    public void cancel(OrderContext context) {
        System.out.println("Cannot cancel delivered order.");
    }

    public String getStatus() {
        return "DELIVERED";
    }
}
```

---

## Cancelled state

```java
class CancelledState implements OrderState {

    public void next(OrderContext context) {
        System.out.println("Cancelled order cannot move forward.");
    }

    public void cancel(OrderContext context) {
        System.out.println("Order already cancelled.");
    }

    public String getStatus() {
        return "CANCELLED";
    }
}
```

---

## Context

```java
class OrderContext {

    private OrderState state;

    public OrderContext() {
        this.state = new CreatedState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void next() {
        state.next(this);
    }

    public void cancel() {
        state.cancel(this);
    }

    public void printStatus() {
        System.out.println("Current state: " + state.getStatus());
    }
}
```

---

## Usage

```java
public class Test {
    public static void main(String[] args) {
        OrderContext order = new OrderContext();

        order.printStatus();
        order.next();

        order.printStatus();
        order.next();

        order.printStatus();
        order.cancel();

        order.printStatus();
        order.next();

        order.printStatus();
    }
}
```

---

# What happens here

Flow:

```text
CREATED
→ PAID
→ SHIPPED
→ cannot cancel
→ DELIVERED
```

Behavior changes automatically based on current state.

---

# Why this is better than `if-else`

### 1. Cleaner code

State-specific behavior lives in state classes.

### 2. Easy to add new state

Add new class like:

```text
ReturnedState
RefundedState
```

### 3. Better maintainability

No giant condition blocks.

### 4. Clear transition rules

Each state controls valid next transitions.

---

# State vs Strategy

This is the important part.

You asked whether Strategy can solve it.

They look similar because both use **composition + interface**.

But the intention is different.

## Strategy Pattern

Used when:

```text
we want to choose one algorithm among many
```

Example:

* payment method
* sorting algorithm
* diet calculation algorithm

Client usually chooses strategy.

---

## State Pattern

Used when:

```text
object behavior changes automatically based on internal state
```

Example:

* order state
* payment state
* task workflow state

The object itself moves from one state to another.

---

# Easy rule to remember

```text
Strategy → choose behavior
State → behavior changes because state changes
```

---

# Real examples from your projects

This pattern fits your work very well.

### Example 1 — Task lifecycle

A task may be:

```text
CREATED
ASSIGNED
IN_PROGRESS
COMPLETED
CANCELLED
```

Each state allows different actions.

---

### Example 2 — Import job flow

A job may be:

```text
PENDING
PROCESSING
SUCCESS
FAILED
RETRYING
```

Very good State Pattern use case.

---

### Example 3 — Candidate / campaign workflow

A record may be:

```text
NEW
CONTACTED
FOLLOWED_UP
CONVERTED
DROPPED
```

Again, behavior depends on state.

---

# Interview-ready answer

If interviewer asks:

**What is State Pattern?**

You can say:

```text
State Pattern is a behavioral design pattern used when an object's behavior changes depending on its internal state. Instead of using many conditional statements, each state is represented as a separate class, and the context delegates behavior to the current state object.
```

---

# Short notes for your separate notes

```text
State Pattern

Purpose:
Change object behavior based on current state.

Structure:
State interface
Concrete state classes
Context class

Problem solved:
Too many if-else checks based on state.

Examples:
Order lifecycle
Task status flow
Payment status
Job processing state

Difference from Strategy:
Strategy = choose algorithm
State = behavior changes automatically due to current state
```

---

# Small thinking question

Imagine your automation task can be:

```text
PENDING
ASSIGNED
IN_PROGRESS
COMPLETED
FAILED
```

Would **State Pattern** be a good choice here?

Answer **yes or no** and explain why.


### Explanation (Interview-Ready Version)

This is how you could answer in an interview:

> State Pattern is suitable here because the behavior of the task depends on its current state. Each state allows different transitions. For example, a task in **PENDING** state may be assigned or cancelled, while a task in **IN_PROGRESS** state may be completed or marked as failed. Instead of using multiple if-else conditions, we can represent each state as a separate class that controls the allowed actions and state transitions.

That is a **very strong design answer**.

---


Already described a **valid state machine**.

```
PENDING
   ↓
ASSIGNED
   ↓
IN_PROGRESS
   ↓
COMPLETED
```

Other transitions:

```
PENDING → CANCELLED
ASSIGNED → REASSIGNED
IN_PROGRESS → FAILED
CANCELLED → RESCHEDULED
```

This is exactly how **workflow engines work internally**.

---

# Example Implementation

### State Interface

```java
interface TaskState {
    void next(TaskContext context);
    void cancel(TaskContext context);
    String getStatus();
}
```

---

### Pending State

```java
class PendingState implements TaskState {

    public void next(TaskContext context) {
        System.out.println("Task assigned");
        context.setState(new AssignedState());
    }

    public void cancel(TaskContext context) {
        System.out.println("Task cancelled");
        context.setState(new CancelledState());
    }

    public String getStatus() {
        return "PENDING";
    }
}
```

---

### Assigned State

```java
class AssignedState implements TaskState {

    public void next(TaskContext context) {
        System.out.println("Task started");
        context.setState(new InProgressState());
    }

    public void cancel(TaskContext context) {
        System.out.println("Task cancelled after assignment");
        context.setState(new CancelledState());
    }

    public String getStatus() {
        return "ASSIGNED";
    }
}
```

---

### In Progress State

```java
class InProgressState implements TaskState {

    public void next(TaskContext context) {
        System.out.println("Task completed");
        context.setState(new CompletedState());
    }

    public void cancel(TaskContext context) {
        System.out.println("Task failed");
        context.setState(new FailedState());
    }

    public String getStatus() {
        return "IN_PROGRESS";
    }
}
```

---

### Context Class

```java
class TaskContext {

    private TaskState state;

    public TaskContext() {
        this.state = new PendingState();
    }

    public void setState(TaskState state) {
        this.state = state;
    }

    public void next() {
        state.next(this);
    }

    public void cancel() {
        state.cancel(this);
    }

    public void printStatus() {
        System.out.println("Current state: " + state.getStatus());
    }
}
```

---

### Usage

```java
public class Test {

    public static void main(String[] args) {

        TaskContext task = new TaskContext();

        task.printStatus();

        task.next();
        task.printStatus();

        task.next();
        task.printStatus();

        task.next();
        task.printStatus();
    }
}
```

---

# Output

```
Current state: PENDING
Task assigned
Current state: ASSIGNED
Task started
Current state: IN_PROGRESS
Task completed
Current state: COMPLETED
```

---

# Why This Pattern Is Powerful

Without State Pattern:

```
if(state == PENDING)
if(state == ASSIGNED)
if(state == IN_PROGRESS)
```

Huge conditional blocks.

With State Pattern:

```
behavior belongs to state class
```

Much cleaner architecture.

---

# Real Systems Using State Pattern

Very important for interviews.

### Order systems

```
CREATED
PAID
SHIPPED
DELIVERED
REFUNDED
```

---

### Job processing systems

```
PENDING
RUNNING
SUCCESS
FAILED
RETRY
```

---

### Campaign workflow (similar to your project)

```
NEW
CONTACTED
FOLLOWED_UP
CONVERTED
DROPPED
```

---

# Your Design Pattern Progress

You now understand **13 important patterns**:

```
1 Singleton
2 Factory
3 Builder
4 Strategy
5 Observer
6 Decorator
7 Adapter
8 Facade
9 Proxy
10 Template Method
11 Chain of Responsibility
12 Command
13 State
```

These are **most of the patterns used in real backend architecture**.