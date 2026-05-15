# OOP Pillars and Summary

## Definition

Object-Oriented Programming organizes code around objects that contain data and behavior.

## Why It Matters

OOP is a core Java interview topic because Java classes, inheritance, abstraction, polymorphism, and encapsulation are used in almost every backend project.

## Core Example

A `BankAccount` class can hide its balance field and expose methods like `deposit()` and `withdraw()` to protect valid behavior.

## Common Traps

- Encapsulation is not only making fields private.
- Abstraction and encapsulation are related but different.
- Inheritance should not be used only for code reuse.
- Polymorphism depends on runtime object type for overridden methods.
- Fields are not polymorphic like methods.

## Interview Answer

OOP is a programming style based on objects. The four main pillars are encapsulation, abstraction, inheritance, and polymorphism. Encapsulation protects state, abstraction hides complexity, inheritance models an is-a relationship, and polymorphism allows the same reference type to call different overridden behavior at runtime.

## Quick Revision

- Encapsulation protects data.
- Abstraction hides implementation details.
- Inheritance models is-a relationship.
- Polymorphism allows dynamic behavior.
- Prefer composition when inheritance is not natural.
- Java uses classes and interfaces to model OOP.

## Deep Dive

We will cover:

```
1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism
```
---

### 1️⃣ Encapsulation

#### Definition (Interview Ready)

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

#### Example

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

#### Why Encapsulation?

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

#### Real World Example

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

#### Interview Trap

Question:

**Is Encapsulation only about data hiding?**

Answer:

```
No.
Encapsulation is binding data and behavior together.
Data hiding is one benefit of encapsulation.
```

---

#### Notes for Interview

You can answer like this:

```
Encapsulation means wrapping data and methods together in a class and restricting direct access to the data using access modifiers like private. This helps achieve data hiding and controlled access through public methods.
```

---

### 2️⃣ Abstraction

#### Definition

Abstraction means:

```
Hiding implementation details
and showing only essential features.
```

---

#### Real Example

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

#### How Java Implements Abstraction

Java provides two ways:

```
Abstract class
Interface
```

---

#### Abstract Class Example

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

#### Interface Example

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

#### Interview Trap

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

#### Interview Ready Answer

```
Abstraction means hiding internal implementation and exposing only necessary functionality to the user. In Java, abstraction is achieved using abstract classes and interfaces.
```

---

### 3️⃣ Inheritance

#### Definition

Inheritance means:

```
One class acquiring properties and behavior of another class.
```

Example:

```
Parent → Child relationship
```

---

#### Example

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

#### Benefits

```
Code reuse
Hierarchy modeling
Method overriding
```

---

#### Types of Inheritance in Java

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

#### Interview Trap

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

### 4️⃣ Polymorphism

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

### Compile-Time Polymorphism

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

### Runtime Polymorphism

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

### Interview Trap

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

### Method Dispatch Rule

```
Method call resolved at runtime
based on object type
```

Not reference type.

---

### Interview Ready OOP Summary

You can answer like this:

```
OOP in Java is based on four main principles:

Encapsulation – wrapping data and methods together and restricting direct access using access modifiers.

Abstraction – hiding implementation details and exposing only essential functionality using abstract classes and interfaces.

Inheritance – allowing one class to acquire properties and behavior of another class for code reuse.

Polymorphism – allowing one interface to have multiple implementations, achieved through method overloading and method overriding.
```

---

### Interview Tip

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

