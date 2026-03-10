# Template Method Pattern

This pattern is used when:

```
Algorithm structure is fixed
but some steps vary
```

Examples:

```
Payment processing flow
Report generation flow
File import workflow
Data validation pipeline
```

Frameworks use this pattern heavily.

---

# Quick thinking question before Template Method

Imagine a **payment processing workflow**:

```
validate request
authorize payment
process payment
send receipt
```

For different payment types:

```
UPI
Credit Card
Net Banking
```

Some steps are same, some steps differ.

### Should we duplicate the whole workflow for each payment type? Why or why not?


### Answer:
> No, we should not duplicate the workflow because it **repeats business logic**. If a new payment type is added, we would need to create another similar workflow again.

Let's understand problem:
---

# Why duplication is a problem

If each payment type has its own full workflow:

* `UpiPaymentWorkflow`
* `CardPaymentWorkflow`
* `NetBankingWorkflow`

and each one repeats:

* validate request
* process payment
* send receipt

then these problems appear:

### 1. Code duplication

Common steps are repeated in many classes.

### 2. Hard maintenance

If one common step changes, you must update all workflows.

### 3. Inconsistent behavior

One workflow may miss a step or implement it differently by mistake.

---

# Solution → Template Method Pattern

Template Method Pattern is useful when:

```text
overall algorithm is fixed,
but some individual steps can vary
```

So we define:

* common workflow once
* variable steps in subclasses

---

# Template Method Pattern Definition

```text
Template Method Pattern defines the skeleton of an algorithm in a base class and allows subclasses to override specific steps without changing the overall algorithm structure.
```

Simple meaning:

```text
same flow, different step implementations
```

---

# Real-Life Analogy

Think of making tea and coffee.

Common flow:

1. boil water
2. prepare main ingredient
3. pour into cup
4. serve

But some steps differ:

* tea leaves vs coffee powder
* milk amount
* extra flavor

So the **template is same**, but some steps vary.

---

# Payment Workflow Example

## Abstract base class

```java
abstract class PaymentProcessor {

    public final void processPayment() {
        validateRequest();
        authorizePayment();
        doPayment();
        sendReceipt();
    }

    void validateRequest() {
        System.out.println("Validating payment request");
    }

    abstract void authorizePayment();

    abstract void doPayment();

    void sendReceipt() {
        System.out.println("Sending payment receipt");
    }
}
```

---

## UPI payment

```java
class UpiPaymentProcessor extends PaymentProcessor {

    void authorizePayment() {
        System.out.println("Authorizing UPI payment");
    }

    void doPayment() {
        System.out.println("Processing UPI payment");
    }
}
```

---

## Card payment

```java
class CardPaymentProcessor extends PaymentProcessor {

    void authorizePayment() {
        System.out.println("Authorizing Card payment");
    }

    void doPayment() {
        System.out.println("Processing Card payment");
    }
}
```

---

# Usage

```java
public class Test {
    public static void main(String[] args) {
        PaymentProcessor upi = new UpiPaymentProcessor();
        upi.processPayment();

        System.out.println("----");

        PaymentProcessor card = new CardPaymentProcessor();
        card.processPayment();
    }
}
```

---

# Output

```text
Validating payment request
Authorizing UPI payment
Processing UPI payment
Sending payment receipt
----
Validating payment request
Authorizing Card payment
Processing Card payment
Sending payment receipt
```

---

# Key idea

This method is the template:

```java
public final void processPayment()
```

It defines the fixed workflow.

Subclasses change only these parts:

```java
authorizePayment()
doPayment()
```

---

# Why `final` is important

Interview trap.

We often make the template method `final`:

```java
public final void processPayment()
```

Why?

Because subclasses should **not change the algorithm order**.

They can customize steps, but not break the flow.

---

# Real project example for you

This pattern fits your project style very well.

## Example 1: Report generation workflow

Common steps:

* validate filters
* fetch data
* format report
* export report

Different report types:

* voter report
* analytics report
* diet plan report
* task assignment report

Overall flow same, formatting/fetching may differ.

---

## Example 2: Diet generation workflow

Common steps:

* validate user profile
* calculate requirement
* generate meal plan
* save history

Different diet types:

* weight loss
* muscle gain
* diabetic
* keto

Some steps differ, overall flow same.

This is a very good example from your nutrition project context.

---

# Java/framework examples

Template Method is used in many frameworks.

### Example idea in Java

Abstract classes often define workflow methods and leave some steps abstract.

### Spring / framework style

Framework defines lifecycle flow, and you override selected hooks.

This is a template-method style idea.

---

# Advantages

```text
Removes duplication
Keeps workflow consistent
Allows step customization
Good for reusable process skeletons
```

---

# Disadvantages

```text
Inheritance-based
Too many subclasses may appear
Less flexible than composition in some cases
```

---

# Strategy vs Template Method

Very common interview question.

### Strategy

* changes behavior using composition
* algorithm selected at runtime
* object holds strategy reference

### Template Method

* changes steps using inheritance
* workflow fixed in parent class
* subclasses override selected steps

Easy rule:

```text
Strategy → change whole behavior by plugging object
Template Method → keep workflow same, vary some steps
```

---

# Interview-ready answer

If interviewer asks:

**What is Template Method Pattern?**

You can say:

```text
Template Method Pattern is a behavioral design pattern that defines the skeleton of an algorithm in a base class and lets subclasses override specific steps without changing the overall algorithm structure.
```

---

# Short notes for your separate notes

```text
Template Method Pattern

Purpose:
Define fixed workflow and allow some steps to vary.

Structure:
Abstract base class
Template method
Abstract/overridable steps
Concrete subclasses

Advantages:
Avoids duplication
Keeps flow consistent
Reusable process skeleton

Examples:
Payment workflow
Report generation
Diet generation workflow
Framework lifecycle hooks
```

---

# Small thinking question

Imagine a **report export flow**:

* validate input
* fetch data
* format output
* save/export file

CSV and PDF reports follow the same flow, but formatting differs.

### Would **Template Method** be a good choice here? Answer **yes or no** and explain why.

### Answer

```text
Yes, Template Method Pattern is a good choice here because the overall workflow of exporting reports is the same: validate input, fetch data, format the output, and save the file. Only some steps, such as formatting and saving, differ between CSV and PDF formats. We can define the common workflow in an abstract parent class and declare the varying steps as abstract methods. Then subclasses like CSVReportExporter and PDFReportExporter implement those steps with their specific logic.
```

That is a **very strong design explanation**.

---

# Example Implementation

## Abstract Template Class

```java
abstract class ReportExporter {

    public final void exportReport() {
        validateInput();
        fetchData();
        formatOutput();
        saveFile();
    }

    void validateInput() {
        System.out.println("Validating input");
    }

    void fetchData() {
        System.out.println("Fetching data from database");
    }

    abstract void formatOutput();

    abstract void saveFile();
}
```

---

## CSV Implementation

```java
class CsvReportExporter extends ReportExporter {

    void formatOutput() {
        System.out.println("Formatting report as CSV");
    }

    void saveFile() {
        System.out.println("Saving CSV file");
    }
}
```

---

## PDF Implementation

```java
class PdfReportExporter extends ReportExporter {

    void formatOutput() {
        System.out.println("Formatting report as PDF");
    }

    void saveFile() {
        System.out.println("Saving PDF file");
    }
}
```

---

## Usage

```java
public class Test {

    public static void main(String[] args) {

        ReportExporter exporter = new CsvReportExporter();
        exporter.exportReport();

        System.out.println("-----");

        exporter = new PdfReportExporter();
        exporter.exportReport();
    }
}
```

---

# Output

```
Validating input
Fetching data from database
Formatting report as CSV
Saving CSV file
-----
Validating input
Fetching data from database
Formatting report as PDF
Saving PDF file
```

---

# Real Examples From Your Project Context

Template Method fits **many flows in your systems**.

### Example 1 — Diet generation workflow

```
validate user profile
calculate nutrition requirement
generate meal plan
store diet plan
```

Different diets:

```
WeightLossDiet
MuscleGainDiet
DiabeticDiet
KetoDiet
```

Flow same → calculations differ.

---

### Example 2 — Task workflow in automation system

```
validate task
assign task
notify employee
log activity
```

Different task types may override certain steps.

---

# Important Interview Trap

### Why template method often marked `final`?

```java
public final void processPayment()
```

Answer:

```
To prevent subclasses from modifying the algorithm order.
```

Subclasses should only override **specific steps**, not the workflow.

---

# Your Design Pattern Progress

You now understand **10 important patterns**:

```
1. Singleton
2. Factory
3. Builder
4. Strategy
5. Observer
6. Decorator
7. Adapter
8. Facade
9. Proxy
10. Template Method
```

These **10 patterns cover most practical backend design scenarios**.