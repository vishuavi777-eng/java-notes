# Custom Exceptions

## Definition

A custom exception is an application-specific exception class created to represent a meaningful business or domain error.

## Why It Matters

Custom exceptions make error handling clearer and help express domain-specific problems in service and backend code.

## Core Example

`InsufficientBalanceException` is clearer than throwing a generic `Exception` in a banking flow.

## Common Traps

- Do not create custom exceptions for every small error.
- Use checked exceptions only when callers can reasonably recover.
- Use unchecked exceptions for programming or business rule violations when compile-time handling is not useful.
- Preserve the original cause when wrapping exceptions.
- Name exceptions clearly.

## Interview Answer

Custom exceptions represent application-specific error cases. We create them by extending `Exception` for checked exceptions or `RuntimeException` for unchecked exceptions. They improve readability when the exception name clearly explains the failure, such as `InvalidOrderStateException` or `InsufficientBalanceException`.

## Quick Revision

- Extend Exception for checked custom exceptions.
- Extend RuntimeException for unchecked custom exceptions.
- Use meaningful names.
- Include useful messages.
- Preserve root cause when wrapping.
- Do not overuse custom exceptions.

## Deep Dive

One more concept remains in exceptions:

#### Custom Exceptions

Example:

```java
if(age < 18) {
    throw new InvalidAgeException();
}
```

Before I explain:

##### Quick question

Custom exceptions should usually extend:

```
A) Throwable
B) Exception
C) Error
D) Object
```

What do you think?

##### Answer:
✅ — **B) Exception** is the typical choice.

> **“Custom exceptions usually extend `Exception` when we want a checked exception, or `RuntimeException` when we want an unchecked exception.”**

---

### Custom Exceptions in Java

Custom exceptions allow you to create **application-specific errors**.

Example cases:

```text
InvalidAgeException
InsufficientBalanceException
UserNotFoundException
OrderLimitExceededException
```

---

### 1️⃣ Checked Custom Exception

Extend:

```java
Exception
```

Example:

```java
class InvalidAgeException extends Exception {

    public InvalidAgeException(String message) {
        super(message);
    }

}
```

Usage:

```java
public void vote(int age) throws InvalidAgeException {

    if(age < 18) {
        throw new InvalidAgeException("Age must be >= 18");
    }

}
```

Compiler forces handling.

---

### 2️⃣ Unchecked Custom Exception

Extend:

```java
RuntimeException
```

Example:

```java
class InvalidAgeException extends RuntimeException {

    public InvalidAgeException(String message) {
        super(message);
    }

}
```

Now compiler **does not force handling**.

---

### When to Use Which?

| Type              | Use Case               |
| ----------------- | ---------------------- |
| Checked Exception | recoverable conditions |
| RuntimeException  | programming errors     |

---

### Real Example (Bank System)

```java
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String msg){
        super(msg);
    }
}
```

Usage:

```java
if(balance < withdrawAmount) {
    throw new InsufficientBalanceException("Balance too low");
}
```

---

### Best Practice for Custom Exceptions

Always include:

```java
constructor with message
constructor with cause
```

Example:

```java
public class MyException extends Exception {

    public MyException(String message) {
        super(message);
    }

    public MyException(String message, Throwable cause) {
        super(message, cause);
    }

}
```

---

### Interview One-liner

> Custom exceptions are user-defined exception classes that extend `Exception` or `RuntimeException` to represent application-specific errors.

---

Before we move forward, one last **classic interview trap**:

What happens here?

```java
try {
    throw new Exception("Error");
}
catch(RuntimeException e) {
    System.out.println("Runtime");
}
catch(Exception e) {
    System.out.println("Exception");
}
```

What will be printed?

##### Answer:

```
It will print Exception
```

---

### Step-by-Step Execution

Code:

```java
try {
    throw new Exception("Error");
}
catch(RuntimeException e) {
    System.out.println("Runtime");
}
catch(Exception e) {
    System.out.println("Exception");
}
```

##### Step 1

Exception thrown:

```
Exception
```

Type:

```
java.lang.Exception
```

---

##### Step 2

JVM checks catch blocks **from top to bottom**.

First catch:

```java
catch(RuntimeException e)
```

But:

```
Exception ≠ RuntimeException
```

So this block **does not match**.

---

##### Step 3

Next catch:

```java
catch(Exception e)
```

This matches because:

```
Exception → same type
```

So it executes.

Output:

```
Exception
```

---

### Important Interview Rule

Catch blocks are checked:

```
top → bottom
first matching catch executes
```

---

### Exception Hierarchy Here

```
Throwable
   |
   +-- Exception
          |
          +-- RuntimeException
```

Since `RuntimeException` is a **subclass**, it cannot catch a **parent exception**.

---

### Interview One-Liner

> The JVM checks catch blocks sequentially from top to bottom and executes the first matching exception handler.

---

### Exception Handling Topic Complete 🎯

```
Exception hierarchy
Checked vs Unchecked
try/catch/finally
throw vs throws
Propagation
Multiple catch
finally behavior
try-with-resources
Suppressed exceptions
Custom exceptions
```
