# throw, throws, and Exception Propagation

## Definition

`throw` actually throws an exception object. `throws` declares that a method may pass an exception to its caller. Propagation means the exception moves up the call stack.

## Why It Matters

These keywords are often confused. They are central to checked exception handling and method API design.

## Core Example

A method can `throw new IOException()` and declare `throws IOException` so callers know they must handle or declare it.

## Common Traps

- `throw` and `throws` are not the same.
- `throw` is used inside method body.
- `throws` is used in method signature.
- Checked exceptions must be handled or declared.
- Unchecked exceptions can propagate without declaration.

## Interview Answer

`throw` is used to create and throw a specific exception from code. `throws` is written in a method signature to tell callers that the method may pass that exception upward. If an exception is not handled in the current method, it propagates to the caller until it is caught or the program terminates.

## Quick Revision

- `throw`: action.
- `throws`: declaration.
- Propagation moves exception up the stack.
- Checked exceptions need handling or declaration.
- Unchecked exceptions do not require throws.
- Use throws when caller should decide handling.

## Deep Dive

Now we move to a **very common interview question**:

#### `throw` vs `throws`

Example:

```java
throw new IOException();
```

vs

```java
public void readFile() throws IOException
```

---

### Quick Question

Which keyword is used to **declare that a method may throw an exception**?

```
A) throw
B) throws
```

##### Answer:
**“The `throws` keyword declares that a method may throw a specified exception.”**

---

### `throw` vs `throws`

This is a **very common Java interview question**, so you should know it clearly.

#### 1️⃣ `throws` (Declaration)

`throws` is used in the **method signature** to declare that the method may throw an exception.

Example:

```java
public void readFile() throws IOException {
    FileReader file = new FileReader("data.txt");
}
```

Meaning:

```
This method might throw IOException
Caller must handle it
```

So responsibility goes to the **caller method**.

---

#### 2️⃣ `throw` (Actual Exception)

`throw` is used **inside the method** to actually create and throw an exception.

Example:

```java
throw new ArithmeticException("Division by zero");
```

Example:

```java
public void divide(int a, int b) {
    if(b == 0) {
        throw new ArithmeticException("Cannot divide by zero");
    }
}
```

---

### Key Difference

| Feature        | `throw`            | `throws`            |
| -------------- | ------------------ | ------------------- |
| Purpose        | throw an exception | declare exception   |
| Location       | inside method      | method signature    |
| Number allowed | one exception      | multiple exceptions |
| Used with      | exception object   | exception class     |

---

### Example Combining Both

```java
public void readFile() throws IOException {

    if(fileNotFound) {
        throw new IOException("File missing");
    }

}
```

Here:

```
throws → declaration
throw → actual exception
```

---

### Interview One-liner

> `throw` is used to explicitly throw an exception, while `throws` is used in the method signature to declare possible exceptions.

---

### Important Interview Trap

What will happen here?

```java
public static void main(String[] args) {

    throw new IOException("Error");

}
```

Will it:

```
A) Compile
B) Not compile
C) Compile but crash at runtime
```

##### Answer:
**“It will not compile because IOException is a checked exception, and the compiler forces us to handle or declare it.”**

---

### What Happens in This Code

```java
public static void main(String[] args) {

    throw new IOException("Error");

}
```

Compilation error:

```
Unhandled exception: IOException
```

Because:

```
IOException → checked exception
```

Java requires either:

```
Handle it with try-catch
OR
Declare it with throws
```

---

### Correct Version 1 — Try/Catch

```java
public static void main(String[] args) {

    try {
        throw new IOException("Error");
    } catch(IOException e) {
        System.out.println("Handled");
    }

}
```

---

### Correct Version 2 — throws

```java
public static void main(String[] args) throws IOException {

    throw new IOException("Error");

}
```

Here:

```
main() declares the exception
```

JVM handles it.

Program will compile but crash at runtime.

---

### Important Interview Insight

Even `main()` can declare exceptions:

```java
public static void main(String[] args) throws Exception
```

This is very common.

---

### Next Important Topic

Now we should understand **Exception Propagation**.

Example:

```java
method3()
  ↓
method2()
  ↓
method1()
  ↓
main()
```

If `method3()` throws an exception and **no catch block exists**, where does the exception go?

##### Answer:

```text
Exception propagation is the process where an exception moves up the call stack until it is handled by a catch block.
```

**“It will go to method2.”**
**“If method2 does not handle it, it goes to the next caller method.”**

---

### Exception Propagation

Exception propagation means:

```text
Exception moves up the call stack
until a catch block handles it.
```

---

### Example

```java
public class Test {

    static void method3() {
        int a = 10 / 0;
    }

    static void method2() {
        method3();
    }

    static void method1() {
        method2();
    }

    public static void main(String[] args) {
        method1();
    }
}
```

---

### Execution Flow

```
main()
   ↓
method1()
   ↓
method2()
   ↓
method3()
   ↓
Exception occurs
```

Exception type:

```
ArithmeticException
```

---

### Propagation Path

```
method3 → method2 → method1 → main → JVM
```

If none handle it:

```
Program crashes
Stack trace printed
```

Example output:

```
Exception in thread "main"
java.lang.ArithmeticException: / by zero
```

---

### Important Rule

Propagation happens **only if there is no catch block**.

Example:

```java
static void method2() {
    try {
        method3();
    } catch(Exception e) {
        System.out.println("Handled");
    }
}
```

Now the exception **stops at method2**.

---

### Interview One-Liner

> Exception propagation is the process where an exception moves up the call stack until it is handled by a catch block.

---

### Very Important Interview Trap

What happens here?

```java
try {
    return 10;
}
finally {
    return 20;
}
```

What will be the output?


##### Answer:

```
20 will be returned because finally executes even if try has a return.
```

---

### Why This Happens

Code:

```java
try {
    return 10;
}
finally {
    return 20;
}
```

Execution flow:

```
try block executes
return 10 prepared
before returning → finally executes
finally returns 20
```

So the **finally return overrides the try return**.

---

### Step-by-Step JVM Behavior

```
1 try executes
2 JVM stores return value (10)
3 finally executes
4 finally returns 20
5 final result = 20
```

---

### Very Important Rule

```text
finally block always executes
even if try contains return
```

Except in rare cases:

```
System.exit()
JVM crash
```

---

### Interview Warning ⚠

This is considered **bad coding practice**.

Example:

```java
try {
    return value;
}
finally {
    cleanup();
}
```

Good.

But this is bad:

```java
finally {
    return something;
}
```

Because it **hides exceptions and return values**.

---

### Another Famous Interview Trap

What will be printed?

```java
try {
    System.out.println("A");
    throw new RuntimeException();
}
catch(Exception e) {
    System.out.println("B");
}
finally {
    System.out.println("C");
}
```

What do you think the output is?

##### ✅ the output is:

```
A
B
C
```

> **“First `A` is printed, then the exception is caught so `B` is printed, and finally the `finally` block prints `C`.”**

---

### Step-by-Step Execution

Code:

```java
try {
    System.out.println("A");
    throw new RuntimeException();
}
catch(Exception e) {
    System.out.println("B");
}
finally {
    System.out.println("C");
}
```

##### Step 1

```
try block starts
```

Prints:

```
A
```

---

##### Step 2

Exception occurs:

```
RuntimeException
```

So execution jumps to the **catch block**.

---

##### Step 3

Catch block executes:

```
B
```

Printed.

---

##### Step 4

Finally block **always executes**.

Prints:

```
C
```

---

### Final Output

```
A
B
C
```

---

### Important Interview Rule

Execution order:

```
try → catch → finally
```

If exception occurs:

```
try → catch → finally
```

If no exception:

```
try → finally
```

---

### Very Famous Interview Trap

What happens here?

```java
try {
    System.out.println("A");
    throw new RuntimeException();
}
finally {
    System.out.println("B");
}
```

Will the program:

```
A) print A B and terminate
B) print A B then crash
C) print only A
```

What do you think?

Correct ✅ — **B) print A, then B, then crash**.

##### Output

```text
A
B
Exception in thread "main" java.lang.RuntimeException
```

##### Why

* `try` prints `A`
* exception is thrown
* there is **no catch**
* `finally` still runs and prints `B`
* then exception propagates upward and program terminates

### Key rule

> `finally` executes even when an exception is not caught.

---

