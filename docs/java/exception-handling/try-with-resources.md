# try-with-resources

## Definition

try-with-resources automatically closes resources that implement `AutoCloseable` after the try block finishes.

## Why It Matters

It prevents resource leaks and makes cleanup simpler for files, streams, database connections, and similar resources.

## Core Example

A `FileInputStream` opened in try-with-resources is closed automatically when the block ends.

## Common Traps

- The resource must implement AutoCloseable.
- Resources close in reverse order of creation.
- Suppressed exceptions can exist when close also fails.
- try-with-resources is better than manual finally cleanup for closeable resources.
- Closing can also throw an exception.

## Interview Answer

try-with-resources is a Java feature that automatically closes resources declared in the try header. The resource must implement `AutoCloseable` or `Closeable`. It reduces boilerplate and handles cleanup reliably, including suppressed exceptions when both the try block and close operation fail.

## Quick Revision

- Introduced in Java 7.
- Works with AutoCloseable.
- Closes resources automatically.
- Closes in reverse order.
- Can record suppressed exceptions.
- Use it for files, streams, sockets, and database resources.

## Deep Dive

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

### 1️⃣ Problem Before Java 7

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

### 2️⃣ try-with-resources Solution

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

### 3️⃣ How It Works Internally

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

### 4️⃣ Example

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

### 5️⃣ Multiple Resources

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

### 6️⃣ Very Important Concept

#### Suppressed Exceptions

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

### 7️⃣ Access Suppressed Exceptions

```java
e.getSuppressed();
```

---

### Interview One-liner

> try-with-resources automatically closes resources that implement AutoCloseable, preventing resource leaks.

---

### Very Common Interview Question

Which interface must a resource implement to be used in try-with-resources?

```
A) Serializable
B) AutoCloseable
C) Runnable
D) Cloneable
```

What do you think?

##### Answer:
“AutoClosable interface resource mush implement to try with resources so auto close the resource.” →
**“A resource must implement the AutoCloseable interface to be used in try-with-resources so that it can be automatically closed.”**

### Correct Answer

```
B) AutoCloseable
```

---

### Why AutoCloseable?

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

### AutoCloseable Interface

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

### Example

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

### Many Java Classes Implement AutoCloseable

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

### Example (Database)

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

### Interview One-Liner

> A resource must implement AutoCloseable to be used in try-with-resources, allowing Java to automatically call close() when the block finishes.

---

### Vishwambhar — Important

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

