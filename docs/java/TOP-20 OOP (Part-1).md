# OOP Concepts

We will cover:

```
1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism
```
---

# 1️⃣ Encapsulation

## Definition (Interview Ready)

Encapsulation means:

```
Binding data and methods together in a single unit
and restricting direct access to the data.
```

In Java this is achieved using:

```
private variables
public getter/setter methods
```

---

## Example

```java
class BankAccount {

    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

Usage:

```java
BankAccount acc = new BankAccount();
acc.deposit(500);
System.out.println(acc.getBalance());
```

---

## Why Encapsulation?

Encapsulation provides:

```
Data hiding
Controlled access
Security
Maintainability
```

Example:

You cannot directly do:

```java
acc.balance = -1000;
```

because `balance` is **private**.

---

## Real World Example

```
ATM machine
```

User cannot directly modify bank database.

They interact using:

```
deposit()
withdraw()
```

methods.

---

## Interview Trap

Question:

**Is Encapsulation only about data hiding?**

Answer:

```
No.
Encapsulation is binding data and behavior together.
Data hiding is one benefit of encapsulation.
```

---

## Notes for Interview

You can answer like this:

```
Encapsulation means wrapping data and methods together in a class and restricting direct access to the data using access modifiers like private. This helps achieve data hiding and controlled access through public methods.
```

---

# 2️⃣ Abstraction

## Definition

Abstraction means:

```
Hiding implementation details
and showing only essential features.
```

---

## Real Example

```
Car driving
```

Driver uses:

```
steering
brake
accelerator
```

But driver doesn't know internal engine working.

That is **abstraction**.

---

## How Java Implements Abstraction

Java provides two ways:

```
Abstract class
Interface
```

---

## Abstract Class Example

```java
abstract class Animal {

    abstract void sound();

    void sleep() {
        System.out.println("Animal sleeping");
    }
}
```

Subclass:

```java
class Dog extends Animal {

    void sound() {
        System.out.println("Dog barking");
    }
}
```

---

## Interface Example

```java
interface Payment {
    void pay();
}
```

Implementation:

```java
class UPI implements Payment {
    public void pay() {
        System.out.println("Pay using UPI");
    }
}
```

---

## Interview Trap

Question:

**Difference between abstraction and encapsulation?**

Answer:

```
Encapsulation → hiding data
Abstraction → hiding implementation
```

Example:

```
Encapsulation → private variables
Abstraction → abstract class / interface
```

---

## Interview Ready Answer

```
Abstraction means hiding internal implementation and exposing only necessary functionality to the user. In Java, abstraction is achieved using abstract classes and interfaces.
```

---

# 3️⃣ Inheritance

## Definition

Inheritance means:

```
One class acquiring properties and behavior of another class.
```

Example:

```
Parent → Child relationship
```

---

## Example

```java
class Animal {

    void eat() {
        System.out.println("Animal eating");
    }
}
```

Child class:

```java
class Dog extends Animal {

    void bark() {
        System.out.println("Dog barking");
    }
}
```

Usage:

```java
Dog d = new Dog();
d.eat();
d.bark();
```

---

## Benefits

```
Code reuse
Hierarchy modeling
Method overriding
```

---

## Types of Inheritance in Java

Java supports:

```
Single inheritance
Multilevel inheritance
Hierarchical inheritance
```

Java does **NOT support multiple inheritance with classes**.

But supports it via:

```
Interfaces
```

---

## Interview Trap

Question:

**Why Java does not support multiple inheritance?**

Answer:

```
Diamond problem ambiguity
```

Example:

```
A
↑ ↑
B   C
↑
D
```

JVM would not know which method to use.

---

# 4️⃣ Polymorphism

Polymorphism means:

```
One interface, multiple implementations.
```

Two types:

```
Compile-time polymorphism
Runtime polymorphism
```

---

# Compile-Time Polymorphism

Also called:

```
Method Overloading
```

Example:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

Method decided **during compilation**.

---

# Runtime Polymorphism

Also called:

```
Method Overriding
```

Example:

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}
```

```java
class Dog extends Animal {
    void sound() {
        System.out.println("Dog barking");
    }
}
```

Usage:

```java
Animal a = new Dog();
a.sound();
```

Output:

```
Dog barking
```

Method decided **during runtime**.

---

# Interview Trap

Question:

```
Animal a = new Dog();
```

Which method executes?

Answer:

```
Method of Dog class
```

Because of **runtime polymorphism**.

---

# Method Dispatch Rule

```
Method call resolved at runtime
based on object type
```

Not reference type.

---

# Interview Ready OOP Summary

You can answer like this:

```
OOP in Java is based on four main principles:

Encapsulation – wrapping data and methods together and restricting direct access using access modifiers.

Abstraction – hiding implementation details and exposing only essential functionality using abstract classes and interfaces.

Inheritance – allowing one class to acquire properties and behavior of another class for code reuse.

Polymorphism – allowing one interface to have multiple implementations, achieved through method overloading and method overriding.
```

---

# Interview Tip

When interviewer asks:

**"Explain OOP concepts"**

Answer in **this order**:

```
Encapsulation
Inheritance
Polymorphism
Abstraction
```

This is the **most natural explanation order**.

---

Now we start **Polymorphism Deep Dive**, which is one of the **most asked OOP topics in interviews**.

We will cover:

```text
1. Method Overriding rules
2. Dynamic Method Dispatch
3. Covariant Return Type
4. Method Hiding (static methods)
5. super vs this
6. Constructor chaining
7. Important interview traps
```

I will also give **short notes you can remember for interviews**.

---

# 1️⃣ Method Overriding

## Definition (Interview Ready)

```text
Method overriding happens when a subclass provides
its own implementation of a method defined in the parent class.
```

---

## Example

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barking");
    }
}
```

Usage:

```java
Animal a = new Dog();
a.sound();
```

Output:

```
Dog barking
```

This is **runtime polymorphism**.

---

# 2️⃣ Dynamic Method Dispatch

This is the **core of runtime polymorphism**.

Example:

```java
Animal a = new Dog();
a.sound();
```

Here:

```
Reference type → Animal
Object type → Dog
```

JVM decides method **based on object type**, not reference type.

So:

```
Dog.sound()
```

runs.

---

# Interview Rule

```text
Method call depends on object type,
variable access depends on reference type.
```

Example:

```java
class Animal {
    int x = 10;
}

class Dog extends Animal {
    int x = 20;
}
```

```java
Animal a = new Dog();
System.out.println(a.x);
```

Output:

```
10
```

Because variables are resolved at **compile time**.

---

# Interview Note

```
Methods → runtime decision
Variables → compile-time decision
```

---

# 3️⃣ Rules of Method Overriding

For overriding to happen:

### Rule 1 — Same method name

```
Parent: sound()
Child: sound()
```

---

### Rule 2 — Same parameters

```java
void sound()
```

must match.

---

### Rule 3 — Return type must be same or compatible

Example:

```java
class Animal {
    Animal get() { return this; }
}

class Dog extends Animal {
    Dog get() { return this; }
}
```

This is called **Covariant Return Type**.

---

### Rule 4 — Access modifier cannot be more restrictive

Example:

Parent:

```java
protected void sound()
```

Child:

```java
public void sound()
```

Allowed.

But:

Parent:

```java
public void sound()
```

Child:

```java
private void sound()
```

❌ Not allowed.

---

### Rule 5 — Cannot override final method

```java
final void sound()
```

cannot be overridden.

---

### Rule 6 — Cannot override static method

Static methods are **hidden**, not overridden.

We will see this next.

---

# 4️⃣ Method Hiding (Static Methods)

Example:

```java
class Animal {
    static void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    static void sound() {
        System.out.println("Dog sound");
    }
}
```

Usage:

```java
Animal a = new Dog();
a.sound();
```

Output:

```
Animal sound
```

Because **static methods are resolved using reference type**.

This is called **method hiding**.

---

# Interview Rule

```
Instance method → overridden
Static method → hidden
```

---

# 5️⃣ super vs this

## this

Refers to **current object**.

Example:

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}
```

Here:

```
this.name
```

refers to object variable.

---

## super

Refers to **parent class**.

Example:

```java
class Animal {
    void eat() {
        System.out.println("Animal eating");
    }
}

class Dog extends Animal {

    void eat() {
        super.eat();
        System.out.println("Dog eating");
    }
}
```

Output:

```
Animal eating
Dog eating
```

---

# 6️⃣ Constructor Chaining

Constructors execute **from parent to child**.

Example:

```java
class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {
    Child() {
        System.out.println("Child constructor");
    }
}
```

Usage:

```java
Child c = new Child();
```

Output:

```
Parent constructor
Child constructor
```

Because JVM automatically calls:

```
super()
```

first.

---

# Interview Trap

If parent constructor has parameters:

```java
class Parent {
    Parent(int x) {}
}
```

Child must call:

```java
super(x);
```

otherwise compilation error.

---

# Famous Interview Question

Predict output:

```java
class Parent {
    Parent() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    Child() {
        System.out.println("Child");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
    }
}
```

Output:

```
Parent
Child
```

Constructor runs based on **object creation**, not reference type.

---

# Important Interview Trap

Methods follow:

```
runtime polymorphism
```

But constructors **do not**.

Constructors are **not overridden**.

---

# Final Interview Notes (Important)

Remember this summary:

```
Method overriding → runtime polymorphism
Method overloading → compile-time polymorphism

Methods → runtime binding
Variables → compile-time binding

Static methods → method hiding
Instance methods → overriding
```

---

# Next Important OOP Interview Topic

Before finishing OOP, the **next deep topics** are:

```
Object class methods
equals() vs ==
hashCode()
toString()
clone()
```

These appear in **almost every Java interview**.

---

# Quick Interview Question for You

### Predict output:

```java
class Animal {
    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog");
    }
}

public class Test {
    public static void main(String[] args) {

        Animal a = new Dog();
        a.sound();

        a = new Animal();
        a.sound();
    }
}
```

What will print?
Explain **why**.


### Output:

> Dog
> Animal

Better explanation sentence:

> The output is **Dog** then **Animal** because method execution depends on the **object type at runtime**.

---

# Execution Step-by-Step

## First Line

```java
Animal a = new Dog();
```

Reference type:

```
Animal
```

Object type:

```
Dog
```

Now:

```java
a.sound();
```

JVM checks **object type**, not reference type.

Object type = **Dog**

So JVM calls:

```
Dog.sound()
```

Output:

```
Dog
```

---

# Second Line

```java
a = new Animal();
```

Now:

Reference type:

```
Animal
```

Object type:

```
Animal
```

Now:

```java
a.sound();
```

JVM calls:

```
Animal.sound()
```

Output:

```
Animal
```

---

# Final Output

```
Dog
Animal
```

---

# Important Interview Rule

Instance methods follow:

```
Runtime Polymorphism
```

Meaning:

```
Method execution depends on object type
```

---

# Visual Memory

```
Animal a = new Dog();

Stack
-----
a  →  Dog Object

Heap
-----
Dog Object
```

Later:

```
a = new Animal();
```

Stack now points to new object:

```
a → Animal Object
```

---

# Interview Tip

When interviewer asks:

```
Animal a = new Dog();
```

Always explain two things:

```
Reference Type
Object Type
```

This shows strong OOP understanding.

---

# Very Important OOP Trap

Predict output:

```java
class Animal {
    int x = 10;
}

class Dog extends Animal {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {

        Animal a = new Dog();
        System.out.println(a.x);
    }
}
```

### What will print?

Explain **why**.

### Answer:

**10** is correct ✅.
> Because **variables are resolved using the reference type, not the object type**.


But the **reason interviewers expect** is slightly more precise.

---

# Code

```java
class Animal {
    int x = 10;
}

class Dog extends Animal {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {

        Animal a = new Dog();
        System.out.println(a.x);
    }
}
```

---

# Output

```
10
```

---

# Why?

Here:

```
Reference type → Animal
Object type → Dog
```

But **variables do NOT use runtime polymorphism**.

Variables are resolved **at compile time**.

So JVM checks the **reference type**.

Reference type = `Animal`

So JVM uses:

```
Animal.x
```

Which is:

```
10
```

---

# Important Interview Rule

This is a **very famous Java rule**.

```
Methods → runtime polymorphism (object type)
Variables → compile-time binding (reference type)
```

---

# Visual Explanation

```
Animal a = new Dog();
```

Memory:

```
Stack
-----
a → Dog object

Heap
-----
Dog Object
   x = 20
   (inherits Animal.x = 10)
```

But compiler resolves:

```
a.x → Animal.x
```

So output:

```
10
```

---

# Why Java Works Like This

Because variables **cannot be overridden**, they can only be **hidden**.

Example:

```
Animal.x
Dog.x
```

Both variables exist separately.

This is called:

```
Variable Hiding
```

---

# Interview Trick

Look at this modified code.

```java
Animal a = new Dog();
Dog d = new Dog();

System.out.println(a.x);
System.out.println(d.x);
```

Output:

```
10
20
```

Because:

```
a.x → Animal.x
d.x → Dog.x
```

---

# Another Famous Interview Trap

Predict output:

```java
class Animal {
    int x = 10;

    void show() {
        System.out.println(x);
    }
}

class Dog extends Animal {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.show();
    }
}
```

Will it print:

```
10
or
20
```

Explain **why**.

> It will print **10**.

# Output

```
10
```

Now let's understand **why**, because the reasoning here is very important for interviews.

---

# Step-by-Step Execution

### Step 1 — Object creation

```
Animal a = new Dog();
```

Reference type:

```
Animal
```

Object type:

```
Dog
```

Memory conceptually:

```
Stack
-----
a → Dog Object

Heap
-----
Dog Object
   x = 20
   inherits Animal.x = 10
```

Both variables exist:

```
Animal.x
Dog.x
```

---

# Step 2 — Method call

```
a.show();
```

Methods follow **runtime polymorphism**.

So JVM checks **object type**.

Object type = `Dog`.

But **Dog does not override show()**.

So JVM uses:

```
Animal.show()
```

---

# Step 3 — Inside `show()`

Inside method:

```java
System.out.println(x);
```

Here `x` belongs to **Animal class**, because the method is defined in `Animal`.

So it accesses:

```
Animal.x
```

Value:

```
10
```

---

# Important Interview Rule

Remember this clearly:

```
Method execution → object type (runtime)
Variable access → class where method is defined
```

Or more commonly stated:

```
Methods → runtime binding
Variables → compile-time binding
```

---

# What If Dog Overrides `show()`?

Example:

```java
class Dog extends Animal {

    int x = 20;

    void show() {
        System.out.println(x);
    }
}
```

Now code:

```java
Animal a = new Dog();
a.show();
```

Output becomes:

```
20
```

Because now:

```
Dog.show()
```

runs.

---

# Interview Summary Rule

```
Method overridden → runtime decision
Method not overridden → parent method executes
Variables never overridden → only hidden
```

---

# One More Famous Interview Trap

Predict the output:

```java
class Parent {

    Parent() {
        print();
    }

    void print() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    int x = 10;

    void print() {
        System.out.println(x);
    }
}

public class Test {

    public static void main(String[] args) {
        new Child();
    }
}
```

Will it print:

```
10
0
Parent
```

### Output

```java
0
```

---

# Why?

This is a **very famous Java interview trap**.

The tricky part is:

```java
Parent() {
    print();
}
```

Inside the parent constructor, JVM calls:

```java
print();
```

Because `print()` is an **overridden instance method**, JVM uses **runtime polymorphism**.

So it calls:

```java
Child.print()
```

---

# But Why Does It Print `0` Instead of `10`?

Because during object creation, initialization happens in this order:

## Step 1 — Memory allocated

Child object is created in heap.

At this moment all instance variables get **default values**:

```java
x = 0
```

---

## Step 2 — Parent constructor runs first

Before child constructor body and child field initialization, parent constructor executes.

So this line runs:

```java
print();
```

Due to overriding, it calls:

```java
Child.print()
```

But `x` is still:

```java
0
```

because child field initialization:

```java
int x = 10;
```

has **not happened yet**.

So output is:

```java
0
```

---

# Full Initialization Flow

For:

```java
new Child();
```

JVM does roughly this:

```text
1. Allocate Child object
2. Set default values
   x = 0
3. Call Parent constructor
4. Parent constructor calls print()
5. Due to polymorphism, Child.print() runs
6. Child.print() prints x → 0
7. Parent constructor finishes
8. Child field initialization happens
   x = 10
9. Child constructor body runs
```

---

# Important Interview Rule

```text
Never call overridable methods from constructors
```

Because subclass state may not be initialized yet.

This can cause:

* unexpected values
* bugs
* partially initialized object behavior

---

# Why This Happens

Because:

```text
Methods are polymorphic even inside constructors
```

But:

```text
Subclass fields are initialized only after parent constructor finishes
```

That combination creates this trap.

---

# Interview-Ready Note

You can answer like this:

```text
The output is 0 because during object creation the parent constructor runs before child field initialization. The parent constructor calls the overridden print() method, so Child.print() executes, but x still has its default value 0 at that time.
```

---

# Very Important OOP Trap Summary

Remember this order:

```text
Default initialization
→ Parent constructor
→ Child field initialization
→ Child constructor
```

---

# One more interview question

Predict output:

```java
class Parent {
    Parent() {
        show();
    }

    void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    String name = "Vishu";

    void show() {
        System.out.println(name);
    }
}

public class Test {
    public static void main(String[] args) {
        new Child();
    }
}
```

Will it print:

```text
Vishu
null
Parent show
```


### Output

> It will print **null**.

```java
null
```

---

# Why?

This is the **same constructor + polymorphism trap**.

## Flow

When this runs:

```java
new Child();
```

JVM does:

```text
1. Allocate Child object
2. Default initialize instance variables
   name = null
3. Call Parent constructor
4. Parent constructor calls show()
5. Due to overriding, Child.show() runs
6. name is still null
7. After parent constructor ends, child field initialization runs
   name = "Vishu"
```

So when `show()` is called from parent constructor, `name` has not yet been assigned `"Vishu"`.

Therefore output is:

```java
null
```

---

# Very Important Interview Rule

```text
Do not call overridable methods from constructors
```

Because child state may still have:

* default values
* partial initialization
* invalid state

---

# Notes for Interview

You can say:

```text
The output is null because the parent constructor calls an overridden method. At that time the child object is created but child instance variables are only default-initialized, so name is null. Child field initialization happens after the parent constructor completes.
```

---

# Important Initialization Order

Remember this exact order:

```text
1. Memory allocation
2. Default values
3. Parent constructor
4. Child instance field initialization
5. Child constructor
```

This order is **very important for OOP interviews**.

---

# Mini Note: constructor vs method behavior

```text
Constructors are not overridden
Methods are overridden
Calling overridden methods inside constructor is dangerous
```

---

# Next deep OOP topic

Now the next most important interview area is:

# `equals()`, `==`, `hashCode()`, `toString()`

This is asked very frequently because it checks whether you really understand:

* object comparison
* collections behavior
* HashMap / HashSet basics
* Object class methods

Let’s start with the most common one.

---

# `==` vs `equals()`

## `==`

For objects:

```text
Compares references (address-like identity)
```

Example:

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1 == s2);
```

Output:

```java
false
```

Because both are different objects.

---

## `equals()`

```text
Compares content or logical equality
```

Example:

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1.equals(s2));
```

Output:

```java
true
```

Because content is same.

---

# Important Trap

For custom classes:

```java
class Person {
    String name;
}
```

```java
Person p1 = new Person();
p1.name = "Vishu";

Person p2 = new Person();
p2.name = "Vishu";

System.out.println(p1.equals(p2));
```

What will be the output **if we do not override `equals()`**?

### Output

```
false
```

---

# Why?

Because we **did not override `equals()`**.

So Java uses the default implementation from:

```
java.lang.Object
```

Default `equals()` implementation is basically:

```java
return (this == obj);
```

So it compares **references**, not object content.

---

# Memory Concept

```
Stack
-----
p1 → Person Object A
p2 → Person Object B

Heap
-----
Person Object A
   name = "Vishu"

Person Object B
   name = "Vishu"
```

Even though the values are same, the **objects are different**.

So:

```
p1.equals(p2) → false
```

---

# Correct Way: Override `equals()`

Example:

```java
class Person {

    String name;

    public boolean equals(Object obj) {

        if (this == obj)
            return true;

        if (obj == null || getClass() != obj.getClass())
            return false;

        Person p = (Person) obj;

        return name.equals(p.name);
    }
}
```

Now:

```java
Person p1 = new Person();
p1.name = "Vishu";

Person p2 = new Person();
p2.name = "Vishu";

System.out.println(p1.equals(p2));
```

Output:

```
true
```

Because now comparison is based on **content**.

---

# Interview Tip

When interviewer asks:

**Why override equals()?**

Answer:

```
To compare logical equality of objects instead of reference equality.
```

---

# Very Important Rule

Whenever you override:

```
equals()
```

you **must also override**:

```
hashCode()
```

Otherwise collections like:

```
HashMap
HashSet
```

will behave incorrectly.

We will cover this next.

---

# Next Famous Interview Question

Predict output:

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

HashSet<Person> set = new HashSet<>();

set.add(new Person("Vishu"));
set.add(new Person("Vishu"));

System.out.println(set.size());
```

What will print?

```
1
or
2
```

Explain **why**.

### Output

```
2
```

> Because **HashSet uses `hashCode()` and `equals()` to determine object uniqueness and bucket placement**.
> Here both objects are **not considered equal**, so both will be stored in the set.

# Why?

We did **not override**:

```
equals()
hashCode()
```

So the default implementations from `Object` are used.

Default behavior:

```
equals() → reference comparison
hashCode() → memory-based hash
```

---

# What Happens Internally in HashSet

When you add an object:

```
HashSet → internally uses HashMap
```

Each object is stored as:

```
key → object
value → dummy value
```

---

# Step 1 — First Object

```
new Person("Vishu")
```

HashSet computes:

```
hashCode()
```

A bucket is selected.

Object stored.

---

# Step 2 — Second Object

```
new Person("Vishu")
```

Another object is created.

Even though name is same:

```
Different object
Different reference
Different hashCode()
```

So HashSet thinks:

```
This is a new unique element
```

Thus it stores it.

---

# Result

```
set.size() → 2
```

---

# Important Interview Rule

For HashSet to detect duplicates:

```
hashCode() must be same
AND
equals() must return true
```

Both conditions must hold.

---

# Correct Implementation

```java
class Person {

    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) return true;
        if (!(obj instanceof Person)) return false;

        Person p = (Person) obj;
        return name.equals(p.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
```

Now:

```java
set.add(new Person("Vishu"));
set.add(new Person("Vishu"));
```

Result:

```
set.size() → 1
```

---

# Important Interview Contract

Java rule:

```
If two objects are equal according to equals(),
they must have the same hashCode().
```

But the reverse is **not required**.

Meaning:

```
Same hashCode ≠ objects must be equal
```

---

# Famous Interview Trap

Look at this code:

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    public boolean equals(Object obj) {
        Person p = (Person) obj;
        return name.equals(p.name);
    }
}
```

Here we override:

```
equals()
```

but **not**:

```
hashCode()
```

Now this code:

```java
HashSet<Person> set = new HashSet<>();

set.add(new Person("Vishu"));
set.add(new Person("Vishu"));

System.out.println(set.size());
```

### What will print?

```
1
or
2
```

This is one of the **most famous Java interview questions**.

# Output

```
2
```

> It will print **2**.

# Why?

We **overrode `equals()`**, but we **did not override `hashCode()`**.

HashSet works in **two steps**:

```
Step 1 → hashCode() decides bucket
Step 2 → equals() checks duplicate inside bucket
```

---

# What Happens Internally

### First Object

```
new Person("Vishu")
```

JVM calls:

```
hashCode()
```

Since we did not override it, `Object.hashCode()` is used.

A bucket is chosen.

Object is stored.

---

### Second Object

```
new Person("Vishu")
```

JVM calls:

```
hashCode()
```

Again default hashCode().

But this object is a **different object**, so it usually produces a **different hashCode**.

Therefore:

```
Different bucket
```

Because buckets are different:

```
equals() is never called
```

So HashSet stores it.

---

# Result

```
set.size() → 2
```

---

# Important Interview Rule

Always remember this:

```
If equals() is overridden,
hashCode() must also be overridden.
```

Otherwise collections like:

```
HashSet
HashMap
HashTable
```

will behave incorrectly.

---

# Interview Contract (Very Important)

Java rule:

```
If two objects are equal according to equals(),
they must have the same hashCode().
```

But the reverse is not required.

Meaning:

```
Same hashCode does not guarantee equality.
```

---

# Correct Implementation

```java
class Person {

    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) return true;

        if (!(obj instanceof Person)) return false;

        Person p = (Person) obj;

        return name.equals(p.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
```

Now:

```
set.size() → 1
```

because both objects are considered equal.

---

# Interview Summary Notes (Important)

You can answer like this:

```
HashSet first uses hashCode() to determine the bucket.
If two objects fall into the same bucket, equals() is used to check logical equality.
Therefore when overriding equals(), we must also override hashCode() to maintain the contract.
```

---

# Very Famous Interview Question (Final Trap)

Predict output:

```java
String a = "Java";
String b = "Java";
String c = new String("Java");

System.out.println(a == b);
System.out.println(a == c);
System.out.println(a.equals(c));
```

### What will print? Explain **why**.

### Answer:

> `a == b` → **true**
> `a == c` → **false**
> `a.equals(c)` → **true**

Now let’s explain it **the way interviewers expect**.

---

# Step 1 — `"Java"` literal

```java
String a = "Java";
```

JVM checks the **String Pool**.

If `"Java"` is not present → create it.

Memory:

```
String Pool
-----------
"Java"
```

Then:

```
a → "Java"
```

---

# Step 2 — second literal

```java
String b = "Java";
```

JVM checks the pool again.

Since `"Java"` already exists:

```
b → same pool object
```

Memory:

```
a → "Java"
b → "Java"
```

---

# First Output

```java
a == b
```

`==` compares **references**.

Both references point to the **same pool object**.

```
true
```

---

# Step 3 — `new String("Java")`

```java
String c = new String("Java");
```

Two things happen:

1️⃣ `"Java"` literal exists in the pool
2️⃣ JVM creates **a new String object in heap**

Memory:

```
Stack
-----
a → pool "Java"
b → pool "Java"
c → heap "Java"

Heap
-----
String("Java")

String Pool
-----------
"Java"
```

---

# Second Output

```java
a == c
```

Reference comparison.

```
pool object ≠ heap object
```

So:

```
false
```

---

# Third Output

```java
a.equals(c)
```

`equals()` compares **content**, not reference.

Both contain:

```
"Java"
```

So:

```
true
```

---

# Important Interview Summary

| Expression | What it compares |
| ---------- | ---------------- |
| `==`       | reference        |
| `equals()` | content          |

---

# Next OOP Topic (Important for Interviews)

Now we move to **Object Class Methods**.

These are extremely common interview topics:

```
equals()
hashCode()
toString()
clone()
getClass()
```

Most interview questions come from:

```
equals()
hashCode()
toString()
```

You already understand **equals + hashCode**, so let's finish OOP with:

# `toString()` Method

---

# What is `toString()` ?

Every class in Java inherits from:

```
java.lang.Object
```

Inside `Object` class there is:

```java
public String toString()
```

Default implementation looks like:

```
ClassName@HexHashCode
```

---

# Example

```java
class Person {
    String name = "Vishu";
}

public class Test {

    public static void main(String[] args) {

        Person p = new Person();
        System.out.println(p);
    }
}
```

---

# Output

Example output:

```
Person@4a54c0de
```

Why?

Because internally Java calls:

```java
p.toString()
```

---

# Default `toString()` Implementation

Inside Object class:

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

So output becomes:

```
ClassName@HashCode
```

---

# Overriding `toString()`

Usually we override it to print meaningful data.

Example:

```java
class Person {

    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() {
        return name + " " + age;
    }
}
```

Usage:

```java
Person p = new Person("Vishu", 30);
System.out.println(p);
```

Output:

```
Vishu 30
```

---

# Interview Question

Why override `toString()`?

Answer:

```
To provide a meaningful string representation of an object.
```

Very useful for:

```
logging
debugging
printing objects
```

---

# Example in Collections

```java
List<Person> list = new ArrayList<>();

list.add(new Person("Vishu",30));

System.out.println(list);
```

If `toString()` is overridden:

```
[Vishu 30]
```

Otherwise:

```
[Person@15db9742]
```

---

# Another Important Object Method

# `getClass()`

Example:

```java
Person p = new Person();

System.out.println(p.getClass());
```

Output:

```
class Person
```

---

# One More Important OOP Topic

Before finishing OOP, we should cover:

# `clone()` Method

This is sometimes asked in interviews.

Example:

```java
class Person implements Cloneable {

    int age = 30;

    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

Usage:

```java
Person p1 = new Person();
Person p2 = (Person) p1.clone();
```

Now:

```
p1 ≠ p2
```

But they contain **same data**.

---

# Interview Trap

Difference between:

```
Shallow Copy
Deep Copy
```

Example:

```
clone() → shallow copy by default
```

---

# Shallow Copy Example

```java
class Person {
    Address address;
}
```

If we clone:

```
Person cloned
```

Both objects share same:

```
Address reference
```

---

# Deep Copy

Deep copy creates **completely independent objects**.

Example:

```
clone Person
clone Address
```

Now:

```
No shared references
```

---

# OOP Interview Summary

You can answer like this if interviewer asks **Explain OOP in Java**:

```
Java follows four main OOP principles:

Encapsulation – binding data and methods together and controlling access using access modifiers.

Inheritance – allowing one class to acquire properties and behavior of another class for code reuse.

Polymorphism – allowing the same method name to have multiple behaviors using method overloading and overriding.

Abstraction – hiding internal implementation and exposing only necessary functionality using abstract classes and interfaces.
```

---

# Your OOP Knowledge Now Covers

You understand:

```
Encapsulation
Inheritance
Polymorphism
Abstraction
Method Overriding rules
Dynamic method dispatch
super vs this
Constructor chaining
equals vs hashCode
HashSet behavior
toString
clone basics
```

This is **very solid OOP knowledge for interviews**.

---

# Now the Next Best Topic

For backend interviews the **most logical next topic** is:

```
Java Concurrency (Deep)
```

Because interviews ask things like:

```
synchronized
volatile
deadlock
thread pool
race condition
Java Memory Model
```

---

If you want, I can start with **Java Concurrency Deep Dive** including:

```
Thread vs Runnable
Thread lifecycle
synchronized
volatile
happens-before rule
deadlock
thread pool
ExecutorService
ConcurrentHashMap
```

These are **very frequently asked in Java interviews**.
