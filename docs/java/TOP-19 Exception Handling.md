# Exception Handling

## Exception Topic Roadmap (We Will Cover Everything)

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

# Step 1 — What is an Exception?

### Definition

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

# Why Exceptions Exist

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

# Example

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

# Exception Handling Flow

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

# Java Exception Hierarchy

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

# Example Types

### Error

```
OutOfMemoryError
StackOverflowError
```

Usually **cannot recover**.

---

### Checked Exception

```
IOException
SQLException
FileNotFoundException
```

Compiler **forces handling**.

---

### Unchecked Exception

```
NullPointerException
ArithmeticException
ArrayIndexOutOfBoundsException
```

Occurs due to **programming mistakes**.

---

# Interview One-Liner

> An exception is an object representing an abnormal condition that disrupts the normal flow of program execution.

---

# First Check Question

Which of these are **checked exceptions**?

```
A) IOException
B) NullPointerException
C) SQLException
D) ArithmeticException
```

### Answer:
```text 
✅ — A and C are checked exceptions.
```

> **“IOException and SQLException are checked exceptions because the compiler forces the programmer to handle or declare them.”**

---

# Explanation

### Checked Exceptions

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

# Examples of Checked Exceptions

```
IOException
SQLException
FileNotFoundException
ClassNotFoundException
InterruptedException
```

---

# Unchecked Exceptions

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

# Key Interview Rule

```
Checked Exception → compile-time checking
Unchecked Exception → runtime error
```

---

# Very Important Interview Trap

Which of these is **NOT a checked exception**?

```
A) IOException
B) SQLException
C) RuntimeException
D) ClassNotFoundException
```

### Answer:
```text
RuntimeException and its subclasses are unchecked exceptions, meaning the compiler does not require them to be caught or declared.
```

---

# Why RuntimeException is Unchecked

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

# RuntimeException Hierarchy

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

# Checked Exception Hierarchy

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

# Interview One-Liner

> `RuntimeException` and its subclasses are unchecked exceptions, meaning the compiler does not require them to be caught or declared.

---

# Next Important Concept

Now we move to a **very common interview question**:

## `throw` vs `throws`

Example:

```java
throw new IOException();
```

vs

```java
public void readFile() throws IOException
```

---

# Quick Question

Which keyword is used to **declare that a method may throw an exception**?

```
A) throw
B) throws
```

### Answer:
**“The `throws` keyword declares that a method may throw a specified exception.”**

---

# `throw` vs `throws`

This is a **very common Java interview question**, so you should know it clearly.

## 1️⃣ `throws` (Declaration)

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

## 2️⃣ `throw` (Actual Exception)

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

# Key Difference

| Feature        | `throw`            | `throws`            |
| -------------- | ------------------ | ------------------- |
| Purpose        | throw an exception | declare exception   |
| Location       | inside method      | method signature    |
| Number allowed | one exception      | multiple exceptions |
| Used with      | exception object   | exception class     |

---

# Example Combining Both

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

# Interview One-liner

> `throw` is used to explicitly throw an exception, while `throws` is used in the method signature to declare possible exceptions.

---

# Important Interview Trap

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

### Answer:
**“It will not compile because IOException is a checked exception, and the compiler forces us to handle or declare it.”**

---

# What Happens in This Code

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

# Correct Version 1 — Try/Catch

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

# Correct Version 2 — throws

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

# Important Interview Insight

Even `main()` can declare exceptions:

```java
public static void main(String[] args) throws Exception
```

This is very common.

---

# Next Important Topic

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

### Answer:

```text
Exception propagation is the process where an exception moves up the call stack until it is handled by a catch block.
```

**“It will go to method2.”**
**“If method2 does not handle it, it goes to the next caller method.”**

---

# Exception Propagation

Exception propagation means:

```text
Exception moves up the call stack
until a catch block handles it.
```

---

# Example

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

# Execution Flow

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

# Propagation Path

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

# Important Rule

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

# Interview One-Liner

> Exception propagation is the process where an exception moves up the call stack until it is handled by a catch block.

---

# Very Important Interview Trap

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


### Answer:

```
20 will be returned because finally executes even if try has a return.
```

---

# Why This Happens

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

# Step-by-Step JVM Behavior

```
1 try executes
2 JVM stores return value (10)
3 finally executes
4 finally returns 20
5 final result = 20
```

---

# Very Important Rule

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

# Interview Warning ⚠

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

# Another Famous Interview Trap

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

### ✅ the output is:

```
A
B
C
```

> **“First `A` is printed, then the exception is caught so `B` is printed, and finally the `finally` block prints `C`.”**

---

# Step-by-Step Execution

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

### Step 1

```
try block starts
```

Prints:

```
A
```

---

### Step 2

Exception occurs:

```
RuntimeException
```

So execution jumps to the **catch block**.

---

### Step 3

Catch block executes:

```
B
```

Printed.

---

### Step 4

Finally block **always executes**.

Prints:

```
C
```

---

# Final Output

```
A
B
C
```

---

# Important Interview Rule

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

# Very Famous Interview Trap

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

### Output

```text
A
B
Exception in thread "main" java.lang.RuntimeException
```

### Why

* `try` prints `A`
* exception is thrown
* there is **no catch**
* `finally` still runs and prints `B`
* then exception propagates upward and program terminates

# Key rule

> `finally` executes even when an exception is not caught.

---

# Next important exception concept

## Multi-catch and catch order

Question:

Will this compile?

```java
try {
    int x = 10 / 0;
}
catch(Exception e) {
    System.out.println("Exception");
}
catch(ArithmeticException e) {
    System.out.println("Arithmetic");
}
```

What do you think?

### Answer:

```text
It does not compile because the parent exception is caught before the subclass exception, making the second catch block unreachable.
```

# Why This Does Not Compile

Code:

```java
try {
    int x = 10 / 0;
}
catch(Exception e) {
    System.out.println("Exception");
}
catch(ArithmeticException e) {
    System.out.println("Arithmetic");
}
```

Hierarchy:

```
Exception
   ↑
ArithmeticException
```

So:

```text
catch(Exception e)
```

already catches **ALL exceptions**, including:

```
ArithmeticException
NullPointerException
IOException
etc.
```

Therefore the next block:

```
catch(ArithmeticException e)
```

will **never execute**.

Compiler error:

```
Unreachable catch block
```

---

# Correct Order

Always catch **more specific exceptions first**.

```java
try {
    int x = 10 / 0;
}
catch(ArithmeticException e) {
    System.out.println("Arithmetic");
}
catch(Exception e) {
    System.out.println("Exception");
}
```

Now it works.

---

# Rule for Catch Blocks

```
Child exception → first
Parent exception → later
```

---

# Interview One-Liner

> In multiple catch blocks, more specific exceptions must be caught before their parent exceptions to avoid unreachable code.

---

# Very Famous Java Interview Trap

What happens here?

```java
try {
    System.out.println("A");
}
catch(Exception e) {
    System.out.println("B");
}
finally {
    System.out.println("C");
}
```

What will be printed?



### Output will be:

```
A
C
```

### Explanation

Code:

```java
try {
    System.out.println("A");
}
catch(Exception e) {
    System.out.println("B");
}
finally {
    System.out.println("C");
}
```

### Execution flow

1️⃣ `try` block runs

```
print "A"
```

2️⃣ No exception occurs
So `catch` block is **skipped**

3️⃣ `finally` always executes

```
print "C"
```

### Final Output

```
A
C
```

---

# Important Rule

```
If no exception → try → finally
If exception → try → catch → finally
```

---

# Another Famous Interview Trap

What happens here?

```java
try {
    System.out.println("A");
    return;
}
finally {
    System.out.println("B");
}
```

What will be printed?

### Answer:

> **“The try block prints A, then the return statement is prepared. Before returning, the JVM executes the finally block, which prints B.”**

# Output

```
A
B
```

---

# Execution Flow

Code:

```java
try {
    System.out.println("A");
    return;
}
finally {
    System.out.println("B");
}
```

Step-by-step:

1️⃣ `try` block executes

```
print A
```

2️⃣ `return` encountered

But before the method exits:

```
finally block executes
```

3️⃣ `finally` prints:

```
B
```

4️⃣ Method returns.

---

# Important JVM Rule

```
finally always executes
even if try contains return
```

Except rare cases:

```
System.exit()
JVM crash
Power failure
```

---

# Interview One-Liner

> Even if a return statement exists in the try block, the finally block executes before the method returns.

---

# Super Famous Java Interview Trap

What happens here?

```java
public static int test() {

    try {
        return 10;
    }
    finally {
        return 20;
    }

}
```

What will this method return?

### Answer:
✅ — the method returns **20**.

### Why

Code:

```java
public static int test() {
    try {
        return 10;
    } finally {
        return 20;
    }
}
```

Execution flow:

1. `try` executes → `return 10` is **prepared** (value saved).
2. Before the method actually returns, the **finally block runs**.
3. `finally` has its **own return**, which **overrides the previous return**.

So the final result becomes:

```
20
```

### Key Rule

> A `return` in `finally` overrides any return from `try` or `catch`.

### Important Interview Note ⚠

This is considered **bad practice**, because it can:

* hide exceptions
* override earlier return values
* make debugging difficult

Example problem:

```java
try {
    throw new RuntimeException();
} finally {
    return 10;   // hides the exception!
}
```

The exception is **lost**.

---

✅ **Interview one-liner**

> A return statement inside `finally` overrides any previous return from `try` or `catch`, which is why using `return` in `finally` is discouraged.

---

If you're okay, the **next very important exception topic** (often asked in interviews) is:

**try-with-resources and suppressed exceptions**.

It explains how Java automatically closes resources like files, streams, and database connections.

---

# try-with-resources

Java introduced **try-with-resources** in **Java 7** to automatically close resources like:

```
File
Stream
Socket
Database Connection
Scanner
```

This prevents **resource leaks**.

---

# 1️⃣ Problem Before Java 7

Old code:

```java
FileInputStream file = null;

try {
    file = new FileInputStream("data.txt");
}
catch(IOException e) {
}
finally {
    if(file != null) {
        file.close();
    }
}
```

Problems:

```
verbose code
easy to forget closing
resource leak risk
```

---

# 2️⃣ try-with-resources Solution

Java allows declaring resources **inside try()**.

Example:

```java
try(FileInputStream file =
        new FileInputStream("data.txt")) {

    // use file

}
```

JVM automatically calls:

```
file.close()
```

after the block finishes.

---

# 3️⃣ How It Works Internally

The resource must implement:

```
AutoCloseable
```

or

```
Closeable
```

Example hierarchy:

```
AutoCloseable
      ↑
   Closeable
      ↑
FileInputStream
BufferedReader
Scanner
```

Because these implement `close()`.

---

# 4️⃣ Example

```java
try(Scanner sc = new Scanner(System.in)) {

    int x = sc.nextInt();
    System.out.println(x);

}
```

After execution:

```
sc.close()
```

is called automatically.

---

# 5️⃣ Multiple Resources

You can declare multiple resources.

```java
try(
    FileInputStream f = new FileInputStream("a.txt");
    BufferedReader br = new BufferedReader(new InputStreamReader(f))
) {

}
```

Close order:

```
br.close()
f.close()
```

Reverse order.

---

# 6️⃣ Very Important Concept

## Suppressed Exceptions

Suppose this happens:

```
Exception in try block
Exception in close()
```

Example:

```java
try(Resource r = new Resource()) {
    throw new RuntimeException("try error");
}
```

and

```
close() throws another exception
```

Now Java must decide which exception to show.

Rule:

```
Primary exception → try block exception
Suppressed exception → close() exception
```

Java keeps suppressed exceptions inside the main exception.

Example output:

```
Exception in try
Suppressed: exception in close()
```

---

# 7️⃣ Access Suppressed Exceptions

```java
e.getSuppressed();
```

---

# Interview One-liner

> try-with-resources automatically closes resources that implement AutoCloseable, preventing resource leaks.

---

# Very Common Interview Question

Which interface must a resource implement to be used in try-with-resources?

```
A) Serializable
B) AutoCloseable
C) Runnable
D) Cloneable
```

What do you think?

### Answer:
“AutoClosable interface resource mush implement to try with resources so auto close the resource.” →
**“A resource must implement the AutoCloseable interface to be used in try-with-resources so that it can be automatically closed.”**

# Correct Answer

```
B) AutoCloseable
```

---

# Why AutoCloseable?

Any resource used in:

```java
try (resource) { }
```

must implement:

```java
AutoCloseable
```

Because Java will automatically call:

```java
close()
```

when the block finishes.

---

# AutoCloseable Interface

Definition:

```java
public interface AutoCloseable {
    void close() throws Exception;
}
```

So when the try block ends:

```
resource.close()
```

is executed automatically.

---

# Example

```java
try(Scanner sc = new Scanner(System.in)) {
    int x = sc.nextInt();
}
```

After execution:

```
sc.close()
```

runs automatically.

---

# Many Java Classes Implement AutoCloseable

Examples:

```
Scanner
FileInputStream
BufferedReader
Connection (JDBC)
Statement
ResultSet
Socket
```

This is why try-with-resources is used heavily in **database and file operations**.

---

# Example (Database)

```java
try(
    Connection con = DriverManager.getConnection(url);
    Statement st = con.createStatement();
    ResultSet rs = st.executeQuery("SELECT * FROM user")
) {

}
```

All of these will automatically close:

```
rs.close()
st.close()
con.close()
```

---

# Interview One-Liner

> A resource must implement AutoCloseable to be used in try-with-resources, allowing Java to automatically call close() when the block finishes.

---

# Vishwambhar — Important

You have now covered almost the **entire Exception Handling topic**:

```
Exception hierarchy
Checked vs Unchecked
try / catch / finally
throw vs throws
Exception propagation
Multiple catch blocks
try-with-resources
Suppressed exceptions
```

This is **strong interview preparation**.

---

# Next Small But Important Topic

One more concept remains in exceptions:

## Custom Exceptions

Example:

```java
if(age < 18) {
    throw new InvalidAgeException();
}
```

Before I explain:

### Quick question

Custom exceptions should usually extend:

```
A) Throwable
B) Exception
C) Error
D) Object
```

What do you think?

### Answer:
✅ — **B) Exception** is the typical choice.

> **“Custom exceptions usually extend `Exception` when we want a checked exception, or `RuntimeException` when we want an unchecked exception.”**

---

# Custom Exceptions in Java

Custom exceptions allow you to create **application-specific errors**.

Example cases:

```text
InvalidAgeException
InsufficientBalanceException
UserNotFoundException
OrderLimitExceededException
```

---

# 1️⃣ Checked Custom Exception

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

# 2️⃣ Unchecked Custom Exception

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

# When to Use Which?

| Type              | Use Case               |
| ----------------- | ---------------------- |
| Checked Exception | recoverable conditions |
| RuntimeException  | programming errors     |

---

# Real Example (Bank System)

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

# Best Practice for Custom Exceptions

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

# Interview One-liner

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

### Answer:

```
It will print Exception
```

---

# Step-by-Step Execution

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

### Step 1

Exception thrown:

```
Exception
```

Type:

```
java.lang.Exception
```

---

### Step 2

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

### Step 3

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

# Important Interview Rule

Catch blocks are checked:

```
top → bottom
first matching catch executes
```

---

# Exception Hierarchy Here

```
Throwable
   |
   +-- Exception
          |
          +-- RuntimeException
```

Since `RuntimeException` is a **subclass**, it cannot catch a **parent exception**.

---

# Interview One-Liner

> The JVM checks catch blocks sequentially from top to bottom and executes the first matching exception handler.

---

# Exception Handling Topic Complete 🎯

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