# Chain of Responsibility Pattern

Used for:

```
request pipelines
validation chains
middleware
filters
approval workflows
```

Real examples:

```
Spring Security filters
HTTP request filters
validation pipelines
logging pipelines
```

And it connects very well with your systems like:

```
request validation
role checks
audit logging
rate limiting
```

---

# Quick thinking question before we start

Imagine a **request validation pipeline**:

```
check authentication
check authorization
check input validation
check rate limit
```

### Should one class handle **all validations**, or should we split them into **multiple handlers**? Explain why.

```text
Use multiple handler here so everyone can handle its own responsibilities. If one handler completes its task, the next handler in the chain processes the request. 
```

# Why multiple handlers are better

Your reasoning is correct.

If one class handles:

* authentication
* authorization
* input validation
* rate limiting

then that class becomes:

* too large
* hard to maintain
* hard to test
* hard to extend

So we split the work into **multiple handlers**, where each handler has **one responsibility**.

That is exactly the idea behind:

# Chain of Responsibility Pattern

---

# Definition

```text
Chain of Responsibility Pattern passes a request through a chain of handlers, where each handler processes the request or forwards it to the next handler.
```

Simple meaning:

```text
Request moves step by step through multiple handlers.
```

---

# Real-life analogy

Think of a **company leave approval flow**:

```text
Team Lead
→ Manager
→ HR
→ Director
```

Each person checks the request and either:

* handles it
* approves it
* passes it to the next person

That is Chain of Responsibility.

---

# Structure

There are usually 3 parts:

```text
1. Handler interface / abstract class
2. Concrete handlers
3. Client
```

---

# Example: Request Validation Pipeline

Suppose request must pass:

```text
Authentication
Authorization
Input validation
Rate limit
```

---

## Handler Base Class

```java
abstract class Handler {

    protected Handler next;

    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public abstract void handle(Request request);
}
```

---

## Request Class

```java
class Request {
    boolean authenticated;
    boolean authorized;
    boolean validInput;
    boolean rateLimitOk;

    Request(boolean authenticated, boolean authorized, boolean validInput, boolean rateLimitOk) {
        this.authenticated = authenticated;
        this.authorized = authorized;
        this.validInput = validInput;
        this.rateLimitOk = rateLimitOk;
    }
}
```

---

## Authentication Handler

```java
class AuthenticationHandler extends Handler {

    public void handle(Request request) {
        if (!request.authenticated) {
            System.out.println("Authentication failed");
            return;
        }

        System.out.println("Authentication passed");

        if (next != null) {
            next.handle(request);
        }
    }
}
```

---

## Authorization Handler

```java
class AuthorizationHandler extends Handler {

    public void handle(Request request) {
        if (!request.authorized) {
            System.out.println("Authorization failed");
            return;
        }

        System.out.println("Authorization passed");

        if (next != null) {
            next.handle(request);
        }
    }
}
```

---

## Input Validation Handler

```java
class InputValidationHandler extends Handler {

    public void handle(Request request) {
        if (!request.validInput) {
            System.out.println("Input validation failed");
            return;
        }

        System.out.println("Input validation passed");

        if (next != null) {
            next.handle(request);
        }
    }
}
```

---

## Rate Limit Handler

```java
class RateLimitHandler extends Handler {

    public void handle(Request request) {
        if (!request.rateLimitOk) {
            System.out.println("Rate limit failed");
            return;
        }

        System.out.println("Rate limit passed");
        System.out.println("Request processed successfully");
    }
}
```

---

# Client Code

```java
public class Test {
    public static void main(String[] args) {

        Handler auth = new AuthenticationHandler();
        Handler permission = new AuthorizationHandler();
        Handler input = new InputValidationHandler();
        Handler rate = new RateLimitHandler();

        auth.setNext(permission).setNext(input).setNext(rate);

        Request request = new Request(true, true, true, true);

        auth.handle(request);
    }
}
```

---

# Output

```text
Authentication passed
Authorization passed
Input validation passed
Rate limit passed
Request processed successfully
```

---

# If any handler fails

Example:

```java
Request request = new Request(true, false, true, true);
```

Output:

```text
Authentication passed
Authorization failed
```

Chain stops there.

---

# Key idea

Each handler:

* does its own work
* decides whether to continue
* forwards request to next handler

---

# Why this is useful

### 1. Single Responsibility

Each handler manages only one concern.

### 2. Flexible order

You can change chain order if needed.

### 3. Easy to add new checks

Just add a new handler.

### 4. Cleaner code

Avoids one giant validation class.

---

# Real examples from your projects

This pattern fits your work very well.

### Example 1 — API request pipeline

```text
token check
role check
campaign scope check
input validation
audit log
```

This is very close to your Admin / Candidate / Volunteer style flows.

---

### Example 2 — Task assignment flow

```text
validate task
check assignee
check permissions
save task
send notification
```

Can also be modeled as a chain in some cases.

---

### Example 3 — Voter / dashboard actions

```text
check login
check role
check campaign access
check action permission
execute action
```

Very realistic for your systems.

---

# Java / framework examples

Very important for interviews:

### Servlet Filters

HTTP request passes through filter chain.

### Spring Security Filter Chain

Authentication and authorization go through multiple filters.

These are classic **Chain of Responsibility** examples.

---

# Advantages

```text
Loose coupling
Easy to extend
Single responsibility
Flexible processing pipeline
```

---

# Disadvantages

```text
Harder to debug long chains
Request may go unhandled if chain is misconfigured
Order of handlers matters
```

---

# Strategy vs Chain of Responsibility

Common confusion.

### Strategy

Choose one algorithm.

### Chain of Responsibility

Pass request through multiple handlers in sequence.

Easy rule:

```text
Strategy → one chosen behavior
Chain of Responsibility → multiple handlers process request step by step
```

---

# Interview-ready answer

If interviewer asks:

**What is Chain of Responsibility Pattern?**

You can say:

```text
Chain of Responsibility is a behavioral design pattern in which a request is passed through a sequence of handlers. Each handler processes the request or forwards it to the next handler in the chain. It is useful for validation pipelines, middleware, filters, and approval workflows.
```

---

# Short notes for your separate notes

```text
Chain of Responsibility Pattern

Purpose:
Pass request through multiple handlers step by step.

Structure:
Handler base class/interface
Concrete handlers
Client builds the chain

Advantages:
Single responsibility
Easy extension
Flexible processing flow

Examples:
Spring Security filters
Servlet filters
Validation pipeline
Approval workflow
```

---

# Small thinking question

Imagine a **loan approval system**:

```text
check document completeness
check credit score
check income eligibility
final manager approval
```

### Would **Chain of Responsibility** be a good choice here? Answer **yes or no** and explain why.


### Explanation (Interview-Ready Version)

```text
Yes, Chain of Responsibility is a good choice here because loan approval consists of multiple sequential validations such as document verification, credit score checking, income eligibility, and final approval. Each step can be implemented as a separate handler. The request passes through the chain, and each handler performs its own responsibility before passing the request to the next handler.
```

This is **exactly how interviewers expect you to explain it**.

---

# Example Loan Approval Flow

Steps:

```
Document Check
↓
Credit Score Check
↓
Income Eligibility
↓
Manager Approval
```

Each step is a **handler in the chain**.

---

## Handler Base Class

```java
abstract class LoanHandler {

    protected LoanHandler next;

    public LoanHandler setNext(LoanHandler next) {
        this.next = next;
        return next;
    }

    public abstract void process(LoanRequest request);
}
```

---

## Loan Request

```java
class LoanRequest {

    boolean documentsValid;
    int creditScore;
    int income;

    LoanRequest(boolean docs, int creditScore, int income) {
        this.documentsValid = docs;
        this.creditScore = creditScore;
        this.income = income;
    }
}
```

---

## Document Handler

```java
class DocumentCheckHandler extends LoanHandler {

    public void process(LoanRequest request) {

        if (!request.documentsValid) {
            System.out.println("Loan rejected: documents missing");
            return;
        }

        System.out.println("Documents verified");

        if (next != null)
            next.process(request);
    }
}
```

---

## Credit Score Handler

```java
class CreditScoreHandler extends LoanHandler {

    public void process(LoanRequest request) {

        if (request.creditScore < 650) {
            System.out.println("Loan rejected: low credit score");
            return;
        }

        System.out.println("Credit score approved");

        if (next != null)
            next.process(request);
    }
}
```

---

## Income Handler

```java
class IncomeHandler extends LoanHandler {

    public void process(LoanRequest request) {

        if (request.income < 30000) {
            System.out.println("Loan rejected: insufficient income");
            return;
        }

        System.out.println("Income verified");

        if (next != null)
            next.process(request);
    }
}
```

---

## Manager Approval

```java
class ManagerApprovalHandler extends LoanHandler {

    public void process(LoanRequest request) {

        System.out.println("Loan approved by manager");
    }
}
```

---

# Client

```java
public class Test {

    public static void main(String[] args) {

        LoanHandler doc = new DocumentCheckHandler();
        LoanHandler credit = new CreditScoreHandler();
        LoanHandler income = new IncomeHandler();
        LoanHandler manager = new ManagerApprovalHandler();

        doc.setNext(credit).setNext(income).setNext(manager);

        LoanRequest request = new LoanRequest(true, 700, 50000);

        doc.process(request);
    }
}
```

---

# Output

```
Documents verified
Credit score approved
Income verified
Loan approved by manager
```

---

# Real Framework Examples (Very Important)

Mention these in interviews.

### Spring Security

Request passes through multiple filters:

```
Authentication filter
Authorization filter
CSRF filter
Session filter
```

Classic Chain of Responsibility.

---

### Servlet Filter Chain

HTTP request goes through:

```
logging filter
security filter
compression filter
```

---

# When to Use Chain of Responsibility

Use it when:

```
Multiple handlers must process a request
Handlers should be loosely coupled
Processing order matters
```

---

# Advantages

```
Single responsibility
Flexible pipeline
Easy to extend
Decouples sender and receiver
```

---

# Disadvantages

```
Chain order matters
Harder debugging if chain is long
Request may go unhandled
```

---

# Your Design Pattern Progress (Very Strong)

You now understand **11 major patterns**:

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
```

These **11 patterns already cover most real-world backend design scenarios**.