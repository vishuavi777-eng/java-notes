# Single Responsibility Principle

## Definition

A class should have one clear responsibility and one main reason to change.

## Why It Matters

It keeps classes easier to understand, test, and modify.

## Core Example

An InvoiceCalculator should calculate totals, while InvoicePrinter should handle printing.

## Common Traps

- SRP does not mean one method per class.
- Responsibility means reason to change.
- Do not split classes without a real reason.
- God classes usually violate SRP.
- Related behavior can still live together.

## Interview Answer

Single Responsibility Principle says a class should focus on one responsibility. If a class changes for unrelated reasons, like business rules and file formatting, it should probably be split.

## Quick Revision

- One responsibility.
- One main reason to change.
- Improves testing.
- Avoids God classes.
- Split unrelated concerns.
- Keep related behavior together.

## Deep Dive

### S — Single Responsibility Principle (SRP)

#### Before we start SRP

Quick thinking question.

Imagine a class:

```java
class ReportManager {

    void generateReport() {}
    void saveReport() {}
    void sendEmailReport() {}
}
```

Do you think this class has **one responsibility or multiple responsibilities**?

Explain why.

##### Answer:
> This class has **multiple responsibilities because it handles report generation, saving the report, and sending it by email.**

---

### Why this class violates Single Responsibility Principle

```java
class ReportManager {

    void generateReport() {}
    void saveReport() {}
    void sendEmailReport() {}
}
```

This class is doing **three different jobs**:

| Method            | Responsibility        |
| ----------------- | --------------------- |
| generateReport()  | business logic        |
| saveReport()      | persistence / storage |
| sendEmailReport() | communication         |

So this class has **3 responsibilities**.

---

### Problem with this design

Imagine changes happen.

##### Scenario 1 — Report generation changes

New format needed.

You must modify:

```text
ReportManager
```

---

##### Scenario 2 — Storage changes

Example:

```text
Save to database
Save to S3
Save to file
```

Again modify:

```text
ReportManager
```

---

##### Scenario 3 — Email service changes

Example:

```text
SMTP → SendGrid
```

Again modify:

```text
ReportManager
```

---

### Problem summary

One class changes for **multiple reasons**.

This violates:

### Single Responsibility Principle (SRP)

---

### Definition of SRP

The official definition is:

```text
A class should have only one reason to change.
```

Important point:

> It does NOT mean "one method".

It means **one responsibility / one reason to change**.

---

### Correct design using SRP

Split responsibilities.

##### Report generation

```java
class ReportGenerator {

    void generateReport() {
        System.out.println("Generating report");
    }
}
```

---

##### Report storage

```java
class ReportRepository {

    void saveReport() {
        System.out.println("Saving report");
    }
}
```

---

##### Email service

```java
class EmailService {

    void sendReport() {
        System.out.println("Sending report email");
    }
}
```

---

##### Manager / orchestrator

```java
class ReportManager {

    private ReportGenerator generator = new ReportGenerator();
    private ReportRepository repository = new ReportRepository();
    private EmailService emailService = new EmailService();

    void processReport() {
        generator.generateReport();
        repository.saveReport();
        emailService.sendReport();
    }
}
```

Now responsibilities are clear.

---

### Benefits of SRP

##### 1️⃣ Easier maintenance

If email changes → modify only:

```text
EmailService
```

---

##### 2️⃣ Easier testing

You can test separately:

```text
ReportGeneratorTest
EmailServiceTest
ReportRepositoryTest
```

---

##### 3️⃣ Reusability

You can reuse:

```text
EmailService
```

in other modules.

---

##### 4️⃣ Smaller classes

Cleaner architecture.

---

### Real example from your projects

Your **automation system** is a perfect SRP example.

Instead of one big class:

```text
TaskManager
```

you separated things like:

```text
Scheduler
Notification service
Call service
Report service
```

Each module has its **own responsibility**.

That follows SRP.

---

### Interview trap

Many people think:

```text
SRP = one method per class
```

That is **wrong**.

Correct meaning:

```text
One reason to change
```

---

### Interview-ready answer

If interviewer asks:

**What is Single Responsibility Principle?**

You can say:

> Single Responsibility Principle states that a class should have only one responsibility or one reason to change. This improves maintainability, readability, and testability of the code.

---

### Quick thinking question

Look at this class:

```java
class UserService {

    void registerUser() {}
    void loginUser() {}
    void sendWelcomeEmail() {}
}
```

Do you think this class **follows SRP or violates SRP**?

Explain why.

##### Answer:

```text
No, because this class define multiple responsibilities like register user, login user and send welcome email. If any of these responsibilities change, we would need to modify the UserService class, which violates the Single Responsibility Principle.
```
---

### Why this class violates SRP

```java
class UserService {

    void registerUser() {}
    void loginUser() {}
    void sendWelcomeEmail() {}
}
```

This class has **two different types of responsibilities**.

| Method             | Responsibility               |
| ------------------ | ---------------------------- |
| registerUser()     | user management              |
| loginUser()        | authentication               |
| sendWelcomeEmail() | communication / notification |

So the class changes if:

```
user registration logic changes
authentication logic changes
email system changes
```

That means **multiple reasons to change**.

---

### Correct design using SRP

Split responsibilities into different classes.

##### User registration

```java
class UserRegistrationService {

    void registerUser() {
        System.out.println("Registering user");
    }
}
```

---

##### Authentication

```java
class AuthService {

    void loginUser() {
        System.out.println("User login");
    }
}
```

---

##### Email service

```java
class EmailService {

    void sendWelcomeEmail() {
        System.out.println("Sending welcome email");
    }
}
```

---

##### User manager / orchestrator

```java
class UserService {

    private UserRegistrationService registrationService =
            new UserRegistrationService();

    private AuthService authService =
            new AuthService();

    private EmailService emailService =
            new EmailService();

    void registerAndNotify() {
        registrationService.registerUser();
        emailService.sendWelcomeEmail();
    }

    void login() {
        authService.loginUser();
    }
}
```

Now responsibilities are separated.

---

### Real example from your projects

Think about your **automation system**.

If you created one class like:

```
TaskManager
- scheduleTask
- sendNotification
- generateReport
- logTask
- saveDatabase
```

That would violate SRP.

Instead you separated things like:

```
Scheduler
NotificationService
ReportService
LoggingService
Repository
```

That follows SRP.

---

### Another real-world example

Imagine a **Voter system** (similar to your voter project).

Bad design:

```
VoterService
- register voter
- send SMS
- export report
- generate analytics
```

Good design:

```
VoterService
SmsService
ReportService
AnalyticsService
```

Each class has **one reason to change**.

---

### Important interview tip

When explaining SRP, always say this sentence:

> A class should have **only one reason to change**.

Interviewers love this phrase.

---

### Quick SRP exercise

Look at this class:

```java
class InvoiceService {

    void calculateInvoice() {}

    void saveInvoiceToDatabase() {}

    void printInvoice() {}
}
```

Do you think this class **violates SRP or follows SRP**?

Explain **why**.

##### Answer:
> **It violates SRP.**

> This class **violates the Single Responsibility Principle because it has multiple responsibilities: invoice calculation, database persistence, and printing.**

---

### Why this class violates SRP

```java
class InvoiceService {

    void calculateInvoice() {}

    void saveInvoiceToDatabase() {}

    void printInvoice() {}
}
```

This class has **three responsibilities**.

| Method                  | Responsibility        |
| ----------------------- | --------------------- |
| calculateInvoice()      | business logic        |
| saveInvoiceToDatabase() | persistence           |
| printInvoice()          | presentation / output |

So it will change if:

```
Invoice calculation rules change
Database storage changes
Printing format changes
```

That means **multiple reasons to change → SRP violated**.

---

### Correct Design Using SRP

Split responsibilities.

##### Invoice calculation

```java
class InvoiceCalculator {

    void calculateInvoice() {
        System.out.println("Calculating invoice");
    }
}
```

---

##### Invoice repository

```java
class InvoiceRepository {

    void saveInvoice() {
        System.out.println("Saving invoice to database");
    }
}
```

---

##### Invoice printer

```java
class InvoicePrinter {

    void printInvoice() {
        System.out.println("Printing invoice");
    }
}
```

---

##### Manager / orchestrator

```java
class InvoiceService {

    InvoiceCalculator calculator = new InvoiceCalculator();
    InvoiceRepository repository = new InvoiceRepository();
    InvoicePrinter printer = new InvoicePrinter();

    void processInvoice() {
        calculator.calculateInvoice();
        repository.saveInvoice();
        printer.printInvoice();
    }
}
```

Now each class has **one responsibility**.

---

### Important Interview Tip

Interviewers often ask:

> Does SRP mean **one method per class?**

Correct answer:

❌ No.

SRP means:

```
One reason to change
```

Not one method.

---

### Real example from frameworks

In Spring applications you often see separation like:

```
Controller → handles HTTP
Service → business logic
Repository → database
```

This separation is **SRP in practice**.