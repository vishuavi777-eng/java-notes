# Singleton Pattern

---

# 1. What is Singleton Pattern?

## Definition

Singleton pattern ensures that:

```text
Only one object of a class is created
and a global access point is provided to that object.
```

---

# 2. Why Do We Need Singleton?

Sometimes in an application, we need only **one shared object**.

Examples:

* App configuration manager
* Logger
* Cache manager
* Database connection manager
* Feature flag manager
* Environment settings manager
* WhatsApp template config manager
* Notification settings manager

If many objects are created unnecessarily:

* memory waste
* inconsistent state
* duplicate configuration
* harder debugging

---

# 3. Real-Life Analogy

Think of:

## Government Aadhaar central server config

There should be one central authority, not many separate random authorities.

Or simpler:

## Printer spooler in an office

There should be one central manager controlling print jobs.

---

# 4. Basic Java Singleton Example

```java
class AppConfig {

    private static AppConfig instance;

    private AppConfig() {
    }

    public static AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }
}
```

Usage:

```java
public class Test {
    public static void main(String[] args) {
        AppConfig c1 = AppConfig.getInstance();
        AppConfig c2 = AppConfig.getInstance();

        System.out.println(c1 == c2); // true
    }
}
```

---

# 5. How It Works

## Step 1

Constructor is made:

```java
private AppConfig()
```

So nobody can do:

```java
new AppConfig();
```

from outside.

## Step 2

Class keeps one static reference:

```java
private static AppConfig instance;
```

## Step 3

`getInstance()` creates object only once.

If already created, same object is returned.

---

# 6. Memory Understanding

```text
AppConfig.instance  --->  one AppConfig object
```

Every caller gets same reference.

---

# 7. Problem with Basic Singleton

This version is **not thread safe**.

If two threads call this at the same time:

```java
if (instance == null)
```

both may create object.

So two instances may get created.

That breaks Singleton.

This is a **very common interview trap**.

---

# 8. Thread-Safe Singleton Approaches

There are multiple ways.

---

## A. Synchronized Method Singleton

```java
class AppConfig {

    private static AppConfig instance;

    private AppConfig() {
    }

    public static synchronized AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }
}
```

### Benefit

Thread safe.

### Problem

Every call is synchronized, so performance is slower.

---

## B. Eager Initialization Singleton

```java
class AppConfig {

    private static final AppConfig instance = new AppConfig();

    private AppConfig() {
    }

    public static AppConfig getInstance() {
        return instance;
    }
}
```

### Benefit

Simple and thread safe.

### Problem

Object is created even if never used.

---

## C. Double-Checked Locking Singleton

Very important for interviews.

```java
class AppConfig {

    private static volatile AppConfig instance;

    private AppConfig() {
    }

    public static AppConfig getInstance() {
        if (instance == null) {
            synchronized (AppConfig.class) {
                if (instance == null) {
                    instance = new AppConfig();
                }
            }
        }
        return instance;
    }
}
```

### Why `volatile` is required?

Because without `volatile`, instruction reordering can make a partially initialized object visible to another thread.

This is where **JVM + concurrency + JMM** connect.

---

## D. Bill Pugh Singleton / Inner Static Helper

This is one of the best implementations.

```java
class AppConfig {

    private AppConfig() {
    }

    private static class Holder {
        private static final AppConfig INSTANCE = new AppConfig();
    }

    public static AppConfig getInstance() {
        return Holder.INSTANCE;
    }
}
```

### Why it is good?

* lazy loaded
* thread safe
* no synchronized overhead
* clean design

This is interview-friendly.

---

## E. Enum Singleton

Best from safety perspective.

```java
enum AppConfig {
    INSTANCE;

    public void show() {
        System.out.println("Singleton using enum");
    }
}
```

Usage:

```java
public class Test {
    public static void main(String[] args) {
        AppConfig.INSTANCE.show();
    }
}
```

### Why very strong?

It protects against:

* serialization issues
* reflection attacks (mostly)
* multiple instance creation

Joshua Bloch strongly recommends this style in many cases.

---

# 9. Real Example From Your Project Context

Let’s take your project-style example.

## Example: Environment Config Manager

In your projects, you often have things like:

* API base URL
* app mode
* feature flags
* role-based toggles
* WhatsApp service keys
* email provider keys
* database environment config

A Singleton fits well for:

```java
class EnvironmentConfig {

    private static final EnvironmentConfig instance = new EnvironmentConfig();

    private String apiBaseUrl;
    private boolean prodMode;

    private EnvironmentConfig() {
        this.apiBaseUrl = "https://api.example.com";
        this.prodMode = true;
    }

    public static EnvironmentConfig getInstance() {
        return instance;
    }

    public String getApiBaseUrl() {
        return apiBaseUrl;
    }

    public boolean isProdMode() {
        return prodMode;
    }
}
```

Usage in your app:

* Android network layer
* backend API client
* admin dashboard service config
* notification service config

This is realistic for your **Nourish / dashboard / automation-type systems**.

---

# 10. Another Project Example Relevant to You

## Notification Manager

Suppose your app has:

* push notifications
* WhatsApp notifications
* email notifications
* retry policy
* rate limit config

Having multiple random managers can create inconsistency.

So one central object:

```java
class NotificationManager {

    private static final NotificationManager instance = new NotificationManager();

    private NotificationManager() {
    }

    public static NotificationManager getInstance() {
        return instance;
    }

    public void send(String message) {
        System.out.println("Sending: " + message);
    }
}
```

This matches your automation and communication tools work.

---

# 11. Where Java / Frameworks Use Singleton-Like Ideas

## In Java / JDK

Some examples include:

* `Runtime.getRuntime()`
* `Desktop.getDesktop()` in some contexts
* many cached manager-like utilities

Example:

```java
Runtime runtime = Runtime.getRuntime();
```

This is a classic example interviewers like.

---

## In Spring

By default, Spring beans are **singleton scoped**.

Important:
Spring singleton means:

```text
one object per Spring container
```

Not exactly one object for entire JVM always.

This is another common interview trap.

---

# 12. Advantages of Singleton

* controlled single instance
* shared global access
* memory saving
* consistent state
* useful for config and manager classes

---

# 13. Disadvantages of Singleton

Very important for interviews.

* behaves like global state
* harder to test
* can increase coupling
* can hide dependencies
* may create concurrency issues if mutable
* often overused

So Singleton is useful, but not for everything.

---

# 14. Common Interview Traps

## Trap 1: Is Singleton always thread safe?

No. Basic lazy singleton is not thread safe.

## Trap 2: Is Spring singleton same as Java Singleton?

No.

* Java singleton: one per classloader / JVM-style implementation
* Spring singleton: one per IoC container

## Trap 3: Can reflection break singleton?

Yes, in many classic implementations reflection can call private constructor.

## Trap 4: Can serialization break singleton?

Yes.
Deserialization can create a new object unless handled properly.

## Trap 5: Best singleton implementation?

Safe answers:

* Enum singleton
* Bill Pugh singleton
  depending on context

---

# 15. Serialization Problem Example

```java
class AppConfig implements Serializable {
    private static final AppConfig instance = new AppConfig();

    private AppConfig() {}

    public static AppConfig getInstance() {
        return instance;
    }
}
```

During deserialization, a new object may get created.

To fix in classic singleton:

```java
protected Object readResolve() {
    return instance;
}
```

---

# 16. Reflection Problem Example

Even private constructor can be accessed using reflection.

That can break singleton.

Enum singleton is stronger against this.

---

# 17. Interview-Ready Answer

If interviewer asks:

## “What is Singleton pattern?”

You can answer:

```text
Singleton pattern ensures that only one instance of a class is created and provides a global access point to it. It is commonly used for configuration managers, loggers, caches, and runtime managers. In Java, it can be implemented using eager initialization, lazy initialization, double-checked locking, static inner helper class, or enum.
```

---

# 18. When Should You Use Singleton?

Use it when:

* exactly one shared instance is logically needed
* object represents app-wide manager/config/service
* state must stay consistent globally

Avoid it when:

* dependencies should be injected
* testing is important
* object is not truly global
* stateful mutable object can cause bugs

---

# 19. Short Notes for Your Separate Notes File

## Singleton Pattern — Short Notes

```text
Definition:
Ensures only one instance of a class exists and provides global access to it.

Use cases:
Config manager, logger, cache manager, runtime manager, notification manager.

Key implementation points:
- private constructor
- private static instance
- public static getter

Types:
1. Lazy initialization
2. Eager initialization
3. Synchronized singleton
4. Double-checked locking
5. Bill Pugh inner static helper
6. Enum singleton

Best interview points:
- Basic lazy singleton is not thread safe
- Double-checked locking needs volatile
- Enum singleton is safest against serialization/reflection
- Spring singleton is per container, not exactly global JVM singleton

Advantages:
- controlled single instance
- memory efficient
- consistent shared state

Disadvantages:
- global state
- tight coupling
- hard to test
- can be misused
```

---

# 20. Mini Interview Questions

Try answering these:

### 1

Why is basic lazy singleton not thread safe?

### 2

Why is `volatile` needed in double-checked locking?

### 3

Which singleton implementation is safest?

### 4

Give one real project example where singleton is useful.

---

### Answers:

# 1️⃣ Why basic lazy Singleton is not thread safe?

Your answer (improved wording):

> Basic lazy Singleton is not thread safe because if multiple threads call `getInstance()` at the same time and `instance == null`, each thread may create its own object.

✔ Correct.

### Interview-ready explanation

```text
Lazy singleton is not thread safe because two threads may enter the getInstance() method simultaneously when instance is null. Both threads may create separate objects before either assigns the instance reference, resulting in multiple instances.
```

Example problem:

```java
if(instance == null) {
    instance = new AppConfig();
}
```

Thread A and Thread B may both see `instance == null`.

---

# 2️⃣ Why `volatile` is needed in Double-Checked Locking?

Your answer is **very good**.

Improved explanation:

```text
volatile prevents instruction reordering and guarantees visibility of the instance variable across threads.
```

### Why this matters

Without `volatile`, JVM may reorder instructions like this:

```text
1 allocate memory
2 assign reference
3 run constructor
```

Another thread may see the **reference before object initialization finishes**.

So you may get a **partially constructed object**.

`volatile` prevents this.

---

# 3️⃣ Safest Singleton Implementation

Your answer:

> Enum singleton is safest way

✔ Correct.

### Why enum Singleton is safest

```text
Protects against:
- reflection attacks
- serialization creating new instances
- multiple instance creation
```

Example:

```java
enum AppConfig {
    INSTANCE;
}
```

Also recommended by **Effective Java (Joshua Bloch)**.

---

# 4️⃣ Real Project Example

Your example is excellent.

> AppConfig for API URL, feature flags, app mode.

That is a **perfect real-world Singleton use case**.

Interviewers love this kind of explanation.

You could say:

```text
In one of my projects I used a Singleton AppConfig class to maintain global configuration such as API base URL, feature flags, and environment mode. Since this configuration should remain consistent across the entire application, Singleton ensured a single shared instance accessible globally.
```

This is a **very strong interview answer**.

---