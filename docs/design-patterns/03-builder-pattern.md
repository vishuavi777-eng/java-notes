# Builder Pattern

This one is extremely useful when objects have **many parameters**.

It is used heavily in:

```
Spring
Lombok
HTTP clients
configuration builders
```

And it will connect very well with your projects like:

```
API request builders
Diet plan builder
Notification message builder
Query builder
```

---

Before we start Builder Pattern, answer one quick question:

Imagine a class:

```java
class User {
    String name;
    int age;
    String email;
    String phone;
    String address;
}
```

Constructor:

```java
new User(name, age, email, phone, address)
```

What problem appears when the number of parameters becomes **large**?

### Explanation:

> When the number of parameters increases, it becomes **complex to construct the object correctly**.
> If a new parameter is added or an existing one is removed, **all constructor calls may need to be modified**, which reduces maintainability.

Let's understand this:
---

# Problem: Telescoping Constructor

Example class:

```java
class User {

    String name;
    int age;
    String email;
    String phone;
    String address;

    User(String name, int age, String email, String phone, String address) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}
```

Usage:

```java
User user = new User(
    "Vishu",
    30,
    "vishu@mail.com",
    "9999999999",
    "Pune"
);
```

---

# Problems With This Approach

### 1️⃣ Hard to read

```java
new User("Vishu", 30, "...", "...", "...");
```

We cannot easily see which parameter is which.

---

### 2️⃣ Optional parameters problem

Example:

```text
email optional
phone optional
address optional
```

Now constructor becomes messy.

---

### 3️⃣ Constructor explosion

You may need many constructors:

```java
User(name)
User(name, age)
User(name, age, email)
User(name, age, email, phone)
User(name, age, email, phone, address)
```

This is called:

```text
Telescoping Constructor Problem
```

---

# Solution → Builder Pattern

Builder Pattern allows:

```text
Step-by-step object construction
Readable code
Optional parameters support
Immutable objects
```

---

# Builder Pattern Definition

```text
Builder Pattern separates the construction of a complex object
from its representation so the same construction process
can create different representations.
```

Simpler meaning:

```text
Build object step by step
```

---

# Builder Pattern Implementation

### Step 1 — Class

```java
class User {

    private String name;
    private int age;
    private String email;
    private String phone;
    private String address;

    private User(UserBuilder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
        this.phone = builder.phone;
        this.address = builder.address;
    }
```

---

### Step 2 — Builder Class

```java
    public static class UserBuilder {

        private String name;
        private int age;
        private String email;
        private String phone;
        private String address;
```

---

### Step 3 — Builder Methods

```java
        public UserBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder setAge(int age) {
            this.age = age;
            return this;
        }

        public UserBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder setPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserBuilder setAddress(String address) {
            this.address = address;
            return this;
        }
```

---

### Step 4 — Build Method

```java
        public User build() {
            return new User(this);
        }
    }
}
```

---

# Usage

```java
User user = new User.UserBuilder()
        .setName("Vishu")
        .setAge(30)
        .setEmail("vishu@mail.com")
        .build();
```

Now object creation is:

```text
Readable
Flexible
Clean
```

---

# Output Concept

Builder gradually sets values, then:

```java
build()
```

creates the final object.

---

# Real Project Example (Similar to Your Work)

Example: **Notification Message Builder**

Suppose your system sends messages:

```text
SMS
Email
WhatsApp
Push Notification
```

Message fields:

```text
title
body
receiver
priority
retryPolicy
attachments
```

Builder pattern works perfectly.

Example:

```java
Notification message =
    new Notification.Builder()
        .setReceiver("user123")
        .setMessage("Diet reminder")
        .setPriority("HIGH")
        .build();
```

---

# Another Example Relevant to Your Apps

Imagine creating **API request objects**.

Example:

```java
ApiRequest request =
    new ApiRequest.Builder()
        .setEndpoint("/diet-plan")
        .setUserId("U123")
        .setToken("abc")
        .build();
```

Much cleaner than huge constructors.

---

# Java Examples of Builder Pattern

### 1️⃣ `StringBuilder`

```java
StringBuilder sb = new StringBuilder()
        .append("Hello")
        .append(" ")
        .append("World");
```

---

### 2️⃣ Java HTTP Client

```java
HttpRequest request =
    HttpRequest.newBuilder()
        .uri(uri)
        .GET()
        .build();
```

Classic builder usage.

---

### 3️⃣ Lombok Builder

Very common in modern Java.

```java
@Builder
class User {
    String name;
    int age;
}
```

Usage:

```java
User user = User.builder()
        .name("Vishu")
        .age(30)
        .build();
```

---

# Advantages of Builder Pattern

```text
Readable code
Supports optional parameters
Avoids telescoping constructors
Creates immutable objects easily
Better maintainability
```

---

# Disadvantages

```text
More code to write
Extra builder class required
Not useful for very simple objects
```

---

# Interview Answer

If interviewer asks:

**What is Builder Pattern?**

You can say:

```text
Builder Pattern is a creational design pattern used to construct complex objects step by step. It avoids telescoping constructors and allows optional parameters to be set in a readable and flexible way.
```

---

# Short Notes For Your Pattern Notes

```text
Builder Pattern

Purpose:
Construct complex objects step by step.

Problem solved:
Telescoping constructors with many parameters.

Key idea:
Separate object construction from representation.

Structure:
Main class
Static Builder class
Setter-style builder methods
build() method

Advantages:
Readable
Flexible
Supports optional parameters

Examples:
StringBuilder
HttpRequest.Builder
Lombok @Builder
```

---

# Small Interview Question

Imagine a **Diet Plan Builder** in your nutrition project.

Plan fields:

```text
calories
protein
carbs
fat
mealPlan
restrictions
```

### Would Builder Pattern be a good choice here?

Answer **yes or no** and explain **why**.

### Interview-Ready Answer:

```text
Yes, Builder Pattern is a good choice here because a diet plan may contain many optional parameters such as calories, protein, carbs, fat, meal plan, and dietary restrictions. Using multiple constructors would make the code difficult to maintain and read. Builder Pattern allows the diet plan to be constructed step by step with different combinations of options while keeping the object creation clear and flexible.
```

This is **exactly the kind of answer interviewers like**, especially when you connect it to **real projects**.

---

# Example From Your Nutrition App Context

Imagine a diet plan object.

```java
class DietPlan {

    private int calories;
    private int protein;
    private int carbs;
    private int fat;
    private String mealPlan;
    private String restrictions;

    private DietPlan(Builder builder) {
        this.calories = builder.calories;
        this.protein = builder.protein;
        this.carbs = builder.carbs;
        this.fat = builder.fat;
        this.mealPlan = builder.mealPlan;
        this.restrictions = builder.restrictions;
    }

    public static class Builder {

        private int calories;
        private int protein;
        private int carbs;
        private int fat;
        private String mealPlan;
        private String restrictions;

        public Builder calories(int calories) {
            this.calories = calories;
            return this;
        }

        public Builder protein(int protein) {
            this.protein = protein;
            return this;
        }

        public Builder carbs(int carbs) {
            this.carbs = carbs;
            return this;
        }

        public Builder fat(int fat) {
            this.fat = fat;
            return this;
        }

        public Builder mealPlan(String mealPlan) {
            this.mealPlan = mealPlan;
            return this;
        }

        public Builder restrictions(String restrictions) {
            this.restrictions = restrictions;
            return this;
        }

        public DietPlan build() {
            return new DietPlan(this);
        }
    }
}
```

---

# Usage

```java
DietPlan plan = new DietPlan.Builder()
        .calories(2000)
        .protein(120)
        .carbs(200)
        .mealPlan("Vegetarian")
        .build();
```

Very readable:

```
calories(2000)
protein(120)
carbs(200)
```

instead of:

```java
new DietPlan(2000,120,200,50,"Veg","None")
```

which is hard to read.

---

# Real Java Example

Java uses Builder Pattern here:

### HTTP Client

```java
HttpRequest request = HttpRequest.newBuilder()
        .uri(uri)
        .GET()
        .build();
```

This is **classic builder usage**.

---

# Your Design Pattern Progress

So far we covered:

```
1. Singleton
2. Factory
3. Builder
```

These are the **3 most common creational patterns**.