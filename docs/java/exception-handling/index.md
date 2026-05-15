# Exception Handling Overview

## Definition

Exception handling is Java’s mechanism for handling runtime problems without crashing the normal program flow immediately.

## Why It Matters

It helps you write reliable code and explain checked exceptions, unchecked exceptions, error handling flow, and exception hierarchy in interviews.

## Core Example

If file reading fails, Java can throw an exception and the program can handle it with `try` and `catch`.

## Common Traps

- `Exception` and `Error` are different.
- Checked exceptions must be handled or declared.
- Unchecked exceptions are not checked at compile time.
- Catching very broad exceptions can hide bugs.
- An exception object contains type, message, and stack trace.

## Interview Answer

Exception handling lets Java separate normal logic from error handling logic. Code that may fail is placed in `try`, problems are caught in `catch`, and cleanup can happen in `finally` or try-with-resources. Checked exceptions are verified by the compiler, while unchecked exceptions usually represent programming or runtime problems.

## Quick Revision

- Throwable is the root type.
- Exception is for recoverable problems.
- Error is for serious JVM/system problems.
- Checked exceptions need handling or throws.
- Unchecked exceptions extend RuntimeException.
- Use specific catch blocks when possible.

## Deep Dive

#### Exception Topic Roadmap (We Will Cover Everything)

We will go **deep step-by-step** like we did with multithreading.

```
1. What is an Exception
2. Exception hierarchy
3. Checked vs Unchecked exceptions
4. try-catch-finally
5. throw vs throws
6. Custom exceptions
7. try-with-resources
8. Multiple catch blocks
9. Exception propagation
10. Suppressed exceptions
11. Best practices
12. Interview traps
```

---

### Step 1 — What is an Exception?

##### Definition

An **exception** is an event that occurs during program execution and disrupts the normal flow of the program.

Example:

```java
int a = 10;
int b = 0;

int c = a / b;
```

Output:

```
java.lang.ArithmeticException: / by zero
```

Program crashes.

---

### Why Exceptions Exist

Without exception handling:

```
Program crashes immediately
No recovery
Bad user experience
```

With exception handling:

```
Detect error
Handle it properly
Continue program
```

---

### Example

```java
try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}
```

Output:

```
Cannot divide by zero
```

Program continues.

---

### Exception Handling Flow

```
Error occurs
      ↓
Exception object created
      ↓
JVM searches for matching catch block
      ↓
If found → handle
If not found → program terminates
```

---

### Java Exception Hierarchy

Very important for interviews.

```
Throwable
   |
   +-- Error
   |
   +-- Exception
          |
          +-- RuntimeException
```

Explanation:

```
Error → serious JVM problems
Exception → application errors
RuntimeException → programming mistakes
```

---

### Example Types

##### Error

```
OutOfMemoryError
StackOverflowError
```

Usually **cannot recover**.

---

##### Checked Exception

```
IOException
SQLException
FileNotFoundException
```

Compiler **forces handling**.

---

##### Unchecked Exception

```
NullPointerException
ArithmeticException
ArrayIndexOutOfBoundsException
```

Occurs due to **programming mistakes**.

---

### Interview One-Liner

> An exception is an object representing an abnormal condition that disrupts the normal flow of program execution.

---

### First Check Question

Which of these are **checked exceptions**?

```
A) IOException
B) NullPointerException
C) SQLException
D) ArithmeticException
```

##### Answer:
```text 
✅ — A and C are checked exceptions.
```

> **“IOException and SQLException are checked exceptions because the compiler forces the programmer to handle or declare them.”**

---

### Explanation

##### Checked Exceptions

These are exceptions that the **compiler forces you to handle**.

Example:

```java
FileReader file = new FileReader("data.txt");
```

Compiler error:

```
Unhandled exception: FileNotFoundException
```

You must handle it:

```java
try {
    FileReader file = new FileReader("data.txt");
} catch (FileNotFoundException e) {
}
```

or declare it:

```java
public void readFile() throws FileNotFoundException
```

---

### Examples of Checked Exceptions

```
IOException
SQLException
FileNotFoundException
ClassNotFoundException
InterruptedException
```

---

### Unchecked Exceptions

These are **not checked by compiler**.

Examples:

```
NullPointerException
ArithmeticException
ArrayIndexOutOfBoundsException
IllegalArgumentException
```

These usually indicate **programming mistakes**.

Example:

```java
String s = null;
s.length();   // NullPointerException
```

Compiler **does not force handling**.

---

### Key Interview Rule

```
Checked Exception → compile-time checking
Unchecked Exception → runtime error
```

---

### Very Important Interview Trap

Which of these is **NOT a checked exception**?

```
A) IOException
B) SQLException
C) RuntimeException
D) ClassNotFoundException
```

##### Answer:
```text
RuntimeException and its subclasses are unchecked exceptions, meaning the compiler does not require them to be caught or declared.
```

---

### Why RuntimeException is Unchecked

Example:

```java
int a = 10 / 0;
```

Compiler allows it.

But at runtime:

```
ArithmeticException: / by zero
```

Program crashes.

Compiler **does not force handling**.

---

### RuntimeException Hierarchy

```
Throwable
   |
   +-- Exception
          |
          +-- RuntimeException
                 |
                 +-- NullPointerException
                 +-- ArithmeticException
                 +-- IndexOutOfBoundsException
                 +-- IllegalArgumentException
```

All of these are **unchecked exceptions**.

---

### Checked Exception Hierarchy

```
Throwable
   |
   +-- Exception
          |
          +-- IOException
          +-- SQLException
          +-- ClassNotFoundException
```

These must be **handled or declared**.

---

### Interview One-Liner

> `RuntimeException` and its subclasses are unchecked exceptions, meaning the compiler does not require them to be caught or declared.

---

