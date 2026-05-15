# JVM ClassLoader Subsystem

## Definition

The ClassLoader subsystem loads `.class` files into JVM memory when a class is needed.

## Why It Matters

ClassLoader questions test whether you understand lazy loading, parent delegation, class initialization, and static block execution.

## Core Example

When `Main` uses `Person`, the JVM asks the ClassLoader to load `Person.class`. Core Java classes like `String` are loaded by higher-level parent class loaders.

## Common Traps

- Creating a reference as `Test t = null` does not initialize the class.
- Accessing a compile-time constant may not trigger class initialization.
- Parent delegation checks parent loaders before child loaders.
- Loading and initialization are not the same step.

## Interview Answer

The ClassLoader loads class bytecode into JVM memory. Java mainly uses Bootstrap, Extension or Platform, and Application class loaders. They follow the parent delegation model, where a loader asks its parent first. After loading, the JVM links and initializes the class when active use requires it.

## Quick Revision

- Class loading happens on demand.
- Bootstrap loads core Java classes.
- Application loader loads application classes.
- Parent delegation protects core classes.
- Class lifecycle: loading, linking, initialization.
- Static blocks run during class initialization.

## Deep Dive

This is **very commonly asked in backend interviews**.

Many candidates know memory but **fail ClassLoader questions**.

---

### What is ClassLoader?

ClassLoader is responsible for:

```
Loading .class files into JVM memory
```

Example:

```
Main.class
Person.class
String.class
System.class
```

When JVM needs a class, the **ClassLoader loads it into memory**.

---

### ClassLoader Types

There are **3 main ClassLoaders**.

```
1 Bootstrap ClassLoader
2 Extension ClassLoader
3 Application ClassLoader
```

Diagram:

```
           Bootstrap ClassLoader
                 ↑
           Extension ClassLoader
                 ↑
          Application ClassLoader
```

This is called **Parent Delegation Model**.

---

### 1️⃣ Bootstrap ClassLoader

This is the **root classloader**.

Loads **core Java classes**.

Examples:

```
java.lang.String
java.lang.Object
java.lang.System
java.util.*
```

Location:

```
<JAVA_HOME>/lib
```

Important:

Bootstrap is written in **native code (C/C++)**, not Java.

---

### 2️⃣ Extension ClassLoader

Loads **Java extension libraries**.

Location:

```
<JAVA_HOME>/lib/ext
```

Examples:

```
security extensions
crypto libraries
```

---

### 3️⃣ Application ClassLoader

Loads **your application classes**.

Example:

```
Main.class
Person.class
Demo.class
```

These are loaded from:

```
CLASSPATH
```

---

### Example

When JVM runs:

```
java Main
```

Application ClassLoader loads:

```
Main.class
Person.class
```

---

### Parent Delegation Model

This is **very important interview concept**.

Suppose JVM needs to load:

```
java.lang.String
```

Steps:

```
Application ClassLoader
   ↓
asks parent

Extension ClassLoader
   ↓
asks parent

Bootstrap ClassLoader
```

Bootstrap loads the class.

---

### Why Parent Delegation Exists

Security.

Imagine if Application ClassLoader loaded `java.lang.String`.

Someone could write a fake String class like:

```java
package java.lang;

public class String {
}
```

Parent delegation prevents this.

Core classes must come from **Bootstrap ClassLoader**.

---

### Interview Question

##### Who loads `java.lang.String`?

Answer:

```
Bootstrap ClassLoader
```

---

### Interview Trap

##### Can we override `java.lang.String`?

Answer:

```
No
```

Because parent delegation loads it first.

---

### Class Loading Phases

When JVM loads a class, there are **3 major phases**.

```
1 Loading
2 Linking
3 Initialization
```

---

### 1️⃣ Loading

ClassLoader reads `.class` file and loads it into memory.

---

### 2️⃣ Linking

Linking has 3 steps.

```
Verification
Preparation
Resolution
```

You already saw this earlier.

---

### 3️⃣ Initialization

Static variables get actual values.

Static blocks run.

Example:

```java
class Test {
    static int x = 10;

    static {
        System.out.println("Loaded");
    }
}
```

When class loads:

```
Loaded
```

prints.

---

### Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Test t = null;
    }
}
```

##### Will **"Static Block"** print?

Think carefully.

This question checks **when class initialization happens**, which is a **very famous JVM interview trap**.

**correct answer is actually NO** ❌.

##### Output:

```
(no output)
```

The **static block will NOT execute**.

---

### Why?

Because **class initialization does not happen here**.

Important rule:

```text
Loading ≠ Initialization
```

JVM may load the class, but the **static block runs only when the class is initialized**.

---

### When Does Class Initialization Happen?

Class initialization happens only when JVM detects **active use** of the class.

Examples of active use:

1️⃣ Creating an object

```java
Test t = new Test();
```

2️⃣ Accessing a static variable

```java
System.out.println(Test.x);
```

3️⃣ Calling a static method

```java
Test.method();
```

4️⃣ Reflection

5️⃣ Main class loading

---

### Why `Test t = null` Does Not Trigger Initialization

This line:

```java
Test t = null;
```

does **not create an object**.

It only creates a **reference variable**.

Memory:

```
Stack
-----
t → null
```

No object, no static access → **no class initialization**.

So:

```
Static block not executed
```

---

### Correct Example Where Static Block Runs

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Test t = new Test();
    }
}
```

Output:

```
Static Block
```

Because object creation triggers initialization.

---

### Another Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static int x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
    }
}
```

Output:

```
Static Block
10
```

Because accessing static field **initializes the class**.

---

### Very Famous JVM Interview Question

Predict output:

```java
class Parent {
    static {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static {
        System.out.println("Child");
    }
}

public class Main {
    public static void main(String[] args) {
        Child c = new Child();
    }
}
```

Output:

```
Parent
Child
```

Reason:

```text
Superclass initializes before subclass
```

---

### One More Trap (Very Important)

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Class.forName("Test");
    }
}
```

Output:

```
Static Block
```

Because:

```
Class.forName() triggers class initialization
```

---

### Summary Rule

Static block executes when **class initialization occurs**, not just when class is loaded.

---

### Quick Interview Quiz

##### What will be the output?

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static int x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
        System.out.println(Test.x);
    }
}
```

Will `"Static Block"` print **once or twice**? Explain why.

> It prints **once** because the class is **initialized only one time**. If the class is already initialized, the static block does not run again.

##### Output

```
Static Block
10
10
```

Static block runs **only once**.

---

### Important Clarification

You said:

> class loading happen one time

But the correct JVM concept is:

```text
Static block runs during CLASS INITIALIZATION
```

Not during **class loading**.

---

### JVM Class Lifecycle

When JVM deals with a class, it goes through **three main phases**:

```
1 Loading
2 Linking
3 Initialization
```

Static blocks run during:

```
Initialization
```

---

### Execution Flow

When JVM reaches:

```java
System.out.println(Test.x);
```

JVM sees that class `Test` is **not initialized yet**.

So it performs initialization:

##### Step 1

Static block executes:

```
Static Block
```

##### Step 2

Static variable initialized:

```
x = 10
```

##### Step 3

Now `Test.x` is accessed.

```
10
```

---

### Second Access

Now JVM executes:

```java
System.out.println(Test.x);
```

But the class is **already initialized**.

So:

```
Static block does NOT run again
```

Only prints:

```
10
```

---

### Key Interview Rule

```text
Class initialization happens only once per classloader
```

That’s why static block executes **only once**.

---

### Another Important Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static int x = 10;
}

public class Main {
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
    }
}
```

What will print?

Correct answer:

```
Static Block
```

Only once.

Because:

```
Class initialization happens only once
```

Even if multiple objects are created.

---

### Another Famous Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }
}

public class Main {
    public static void main(String[] args) {
        Test[] arr = new Test[10];
    }
}
```

Will the static block run?

Think carefully.

This question checks whether **array creation triggers class initialization**, which is a **very tricky JVM interview concept**.


##### Answer:

The **static block will NOT execute**.

Output:

```
(no output)
```

---

### Why Static Block Does NOT Run

This line:

```java
Test[] arr = new Test[10];
```

creates **an array of references**, not objects.

Memory looks like:

```
Stack
-----
arr  → reference

Heap
-----
Array[10]
   null
   null
   null
   null
   null
   null
   null
   null
   null
   null
```

Important:

```
No Test objects are created
```

Therefore:

```
Test class is not initialized
```

So the **static block does not execute**.

---

### Important JVM Rule

```text
Array creation does not trigger class initialization
```

Only **active use** of a class triggers initialization.

---

### Example Where Static Block WILL Run

```java
Test[] arr = new Test[10];
arr[0] = new Test();
```

Now output:

```
Static Block
```

Because:

```
new Test()
```

creates an object → class initialization happens.

---

### Another Famous Interview Trap

Predict output:

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static final int x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
    }
}
```

##### What will print?

Will **"Static Block"** print or not?


##### Output

```java
10
```

There is **no** `Static Block`.

---

### Why?

Because:

```java
static final int x = 10;
```

is a **compile-time constant**.

So the compiler replaces:

```java
System.out.println(Test.x);
```

with something like:

```java
System.out.println(10);
```

That means JVM does **not need to initialize `Test` class** to get `x`.

So:

* class initialization does not happen
* static block does not run

---

### Important JVM Rule

Accessing a `static` field usually triggers class initialization, **but not when the field is a compile-time constant**.

Examples of compile-time constants:

```java
static final int x = 10;
static final String s = "Java";
static final boolean flag = true;
```

---

### But See This

```java
class Test {
    static {
        System.out.println("Static Block");
    }

    static final Integer x = 10;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Test.x);
    }
}
```

Now the output is:

```java
Static Block
10
```

---

### Why this time?

Because:

```java
static final Integer x = 10;
```

is **not** a compile-time constant in the same way as primitive `int`.

`Integer` is an object reference, so JVM must initialize the class.

---

### Interview Trap Summary

#### Static block will NOT run

```java
static final int x = 10;
System.out.println(Test.x);
```

Because `x` is a compile-time constant.

#### Static block WILL run

```java
static int x = 10;
System.out.println(Test.x);
```

or

```java
static final Integer x = 10;
System.out.println(Test.x);
```

Because class initialization is required.

---

### Easy Rule for Interview

If it is:

* `static final`
* primitive or String
* value known at compile time

then it may be **inlined by compiler** and class initialization may not happen.

---

### Now you are entering real JVM interview depth.

Before moving to GC, let’s finish this class-loading trap section with one more famous question.

#### Predict output

```java
class Parent {
    static int x = 10;

    static {
        System.out.println("Parent Static");
    }
}

class Child extends Parent {
    static {
        System.out.println("Child Static");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Child.x);
    }
}
```

##### Will it print:

1. only `10`
2. `Parent Static` then `10`
3. `Parent Static`, `Child Static`, then `10`

Answer this:


##### Output

```
Parent Static
10
```

---

### Why?

This line executes:

```java
System.out.println(Child.x);
```

But `x` is **not declared in Child**.

It is declared in:

```
Parent
```

So JVM rule:

```
Accessing a static field triggers initialization
of the class that actually declares that field
```

Since `x` belongs to **Parent**, JVM initializes **Parent only**.

---

### Execution Flow

Step 1

JVM accesses:

```
Child.x
```

Step 2

JVM finds `x` in **Parent class**.

Step 3

JVM initializes **Parent class**.

```
Parent Static
```

Step 4

JVM reads `x = 10`.

```
10
```

---

### Why Child Static Block Does NOT Run

Because:

```
Child class is not initialized
```

We only accessed **Parent’s static field**.

---

### Important Interview Rule

```
Referencing a static field initializes
only the class that declares the field
```

Not the subclass.

---

### Visual Flow

```
Child.x
   ↓
x belongs to Parent
   ↓
Initialize Parent
   ↓
Print Parent Static
   ↓
Return x
   ↓
Print 10
```

---

### Interview Trap Example

Now predict this:

```java
class Parent {
    static {
        System.out.println("Parent Static");
    }
}

class Child extends Parent {
    static int x = 10;

    static {
        System.out.println("Child Static");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Child.x);
    }
}
```

##### What will print?

1️⃣ `Child Static 10`
2️⃣ `Parent Static Child Static 10`
3️⃣ `Parent Static 10`


##### Output

```java
Parent Static
Child Static
10
```

---

### Why?

Now `x` is declared inside **Child**:

```java
static int x = 10;
```

So when JVM accesses:

```java
Child.x
```

it must initialize **Child class**.

But before a subclass is initialized:

```text
Superclass must be initialized first
```

So JVM flow is:

```text
Initialize Parent
→ print Parent Static

Initialize Child
→ assign x = 10
→ print Child Static

Access x
→ print 10
```

---

### Very Important Interview Rule

#### If static member belongs to parent:

Only parent initializes.

#### If static member belongs to child:

Parent initializes first, then child initializes.

---

Excellent.
Now let’s move to the next **big JVM interview topic**:
