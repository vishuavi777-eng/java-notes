# Proxy Pattern

It is used for:

```
Security checks
Lazy loading
Caching
Remote calls
Access control
```

Examples in Java:

```
Hibernate lazy loading
Spring AOP proxies
Java dynamic proxies
```

---

Before we start Proxy Pattern, answer one quick thinking question:

Imagine a system where a **file download service** must:

```
check user authentication
check permission
log access
then download file
```

### Should these checks be inside `FileDownloadService` itself, or handled separately?

Explain **why**.

> It should be **handled separately**, because `FileDownloadService` does **not need to know about those other services**.

---

# Why it should be handled separately

If `FileDownloadService` itself does:

* authentication
* authorization
* logging
* download logic

then these problems appear:

### 1. Single Responsibility Principle breaks

`FileDownloadService` should mainly handle:

```text
file download
```

But now it is also doing:

```text
security
permission validation
logging
```

So one class gets too many responsibilities.

---

### 2. Tight coupling increases

`FileDownloadService` will depend on:

* AuthService
* PermissionService
* LoggerService

That makes the core service harder to maintain.

---

### 3. Reusability decreases

Suppose later you need same checks for:

* image download
* report download
* invoice download

If checks are embedded in each service, code gets duplicated.

---

# This leads to Proxy Pattern

Proxy Pattern is useful when you want:

```text
one object to control access to another object
```

So client calls proxy, and proxy decides:

* authenticate
* authorize
* log
* cache
* lazy load
* then call real service

---

# Proxy Pattern Definition

```text
Proxy Pattern provides a placeholder or surrogate for another object
to control access to it.
```

Simple meaning:

```text
middle layer before actual object
```

---

# Real-Life Analogy

Think of a **VIP office receptionist**.

You do not directly enter the CEO room.

First receptionist checks:

* who you are
* whether you have permission
* whether appointment exists

Then access is granted.

Here:

* Receptionist = Proxy
* CEO = Real object

---

# Example: File Download Proxy

## Subject interface

```java
interface FileService {
    void download(String fileName);
}
```

---

## Real service

```java
class FileDownloadService implements FileService {

    public void download(String fileName) {
        System.out.println("Downloading file: " + fileName);
    }
}
```

---

## Proxy

```java
class FileDownloadProxy implements FileService {

    private FileDownloadService realService = new FileDownloadService();

    public void download(String fileName) {

        System.out.println("Checking authentication");
        System.out.println("Checking permission");
        System.out.println("Logging access");

        realService.download(fileName);
    }
}
```

---

## Usage

```java
public class Test {
    public static void main(String[] args) {

        FileService service = new FileDownloadProxy();
        service.download("report.pdf");
    }
}
```

### Output

```text
Checking authentication
Checking permission
Logging access
Downloading file: report.pdf
```

---

# Why Proxy is useful

The client sees only:

```text
FileService
```

And can call:

```java
service.download(...)
```

But proxy adds extra control before delegating to real object.

---

# Types of Proxy Pattern

Very important for interviews.

## 1. Protection Proxy

Controls access based on authorization.

Example:

```text
admin can access
normal user cannot access
```

---

## 2. Virtual Proxy

Creates heavy object only when needed.

Example:

```text
lazy loading image/file
```

---

## 3. Remote Proxy

Represents remote object.

Example:

```text
RPC / network service / remote API
```

---

## 4. Caching Proxy

Stores results and avoids repeated expensive calls.

Example:

```text
report download cache
API response cache
```

---

# Real Java / Framework Examples

### 1. Spring AOP Proxies

Spring often creates proxies for:

* transactions
* security
* logging
* lazy beans

---

### 2. Hibernate Lazy Loading

Hibernate uses proxies for lazy-loaded entities.

Example:
actual object loads only when needed.

---

### 3. Java Dynamic Proxy

Java provides proxy support through reflection APIs.

---

# Real Example From Your Project Context

This pattern fits your projects well.

## Example 1: Role-based dashboard access

Before opening candidate or admin dashboard:

* check user role
* check campaign access
* log access

Then call real dashboard service.

---

## Example 2: API wrapper

Before calling sensitive API:

* validate token
* check permission
* log request
* then call actual API service

---

## Example 3: File/report download

Before exporting reports:

* check whether user is admin
* verify rate limit
* log audit
* then generate/download report

This is a perfect proxy use case.

---

# Proxy vs Decorator

Very common interview question.

They look similar because both wrap an object.

### Decorator

Adds behavior dynamically.

Example:

```text
notification + logging + retry + encryption
```

### Proxy

Controls access to the real object.

Example:

```text
auth check + permission + lazy loading + caching
```

Easy rule:

```text
Decorator → enhance behavior
Proxy → control access
```

---

# Advantages

```text
Access control
Lazy loading
Logging and security outside main service
Better separation of concerns
```

---

# Disadvantages

```text
Adds extra layer
Can increase complexity
Too many proxies may make flow harder to trace
```

---

# Interview-ready answer

If interviewer asks:

**What is Proxy Pattern?**

You can say:

```text
Proxy Pattern is a structural design pattern in which a proxy object controls access to a real object. It acts as an intermediary and can add features like security checks, logging, caching, lazy loading, or remote access without changing the real service implementation.
```

---

# Short notes for your separate notes

```text
Proxy Pattern

Purpose:
Control access to a real object.

Problem solved:
Need security, logging, caching, lazy loading, or remote access before calling actual object.

Structure:
Subject interface
Real subject
Proxy class

Types:
Protection Proxy
Virtual Proxy
Remote Proxy
Caching Proxy

Examples:
Spring AOP proxies
Hibernate lazy loading
File access control
API security wrapper

Difference from Decorator:
Decorator adds behavior
Proxy controls access
```

---

# Small thinking question

Imagine an image gallery app.

Loading every full-size image immediately is expensive.

### Would **Virtual Proxy** be useful here?

Answer **yes or no** and explain why.


### Answer:

```text
Yes, Virtual Proxy helps here.. Because it would provide lazy loading of images, It can create thumbnails and delay loading the full-size image until needed. Do some kind of sorting etc.
```

---

# Why Virtual Proxy is Useful Here

Your reasoning is correct.

A Virtual Proxy is used when:

```text
Object creation is expensive
or
Object should be loaded lazily
```

Example:

```
High-resolution images
Large files
Remote resources
Database objects
```

Instead of loading everything immediately.

---

# Problem Without Proxy

Imagine a gallery with **1000 images**.

If application loads all images:

```
1000 full-size images
```

Problems:

```
Huge memory usage
Slow UI loading
Poor performance
```

---

# Solution With Virtual Proxy

Instead of loading real images immediately:

```
Create lightweight proxy objects
```

Proxy loads the real image **only when required**.

Example:

```
Gallery shows thumbnails
↓
User clicks image
↓
Real image loads
```

This is **lazy loading**.

---

# Example Code

### Subject interface

```java
interface Image {
    void display();
}
```

---

### Real object (heavy)

```java
class RealImage implements Image {

    private String fileName;

    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading image from disk: " + fileName);
    }

    public void display() {
        System.out.println("Displaying image: " + fileName);
    }
}
```

---

### Proxy

```java
class ImageProxy implements Image {

    private RealImage realImage;
    private String fileName;

    public ImageProxy(String fileName) {
        this.fileName = fileName;
    }

    public void display() {

        if(realImage == null) {
            realImage = new RealImage(fileName);
        }

        realImage.display();
    }
}
```

---

# Usage

```java
public class Test {

    public static void main(String[] args) {

        Image image = new ImageProxy("photo.jpg");

        System.out.println("Gallery opened");

        image.display();   // real image loads here
    }
}
```

---

# Execution Flow

```
Gallery opened
↓
Proxy object created
↓
Real image NOT loaded yet
↓
display() called
↓
RealImage created
↓
Image loaded
```

---

# Output Example

```
Gallery opened
Loading image from disk: photo.jpg
Displaying image: photo.jpg
```

---

# Real Examples of Virtual Proxy

### 1️⃣ Hibernate Lazy Loading

Example:

```
User
   ↓
Orders
```

Orders may not load until accessed.

Proxy object represents database entity.

---

### 2️⃣ Image viewers

Used in:

```
photo gallery
video preview
document viewer
```

---

### 3️⃣ Remote service calls

Proxy delays actual network call until needed.

---

# Real Example Related to Your Work

In systems like your automation or dashboard apps.

Example:

```
Large analytics report
```

Instead of generating full report immediately:

```
Dashboard shows summary
↓
User clicks report
↓
Proxy triggers full report generation
```

Same idea.

---

# Interview Answer

If interviewer asks:

**When is Virtual Proxy useful?**

You can answer:

```
Virtual Proxy is useful when an object is expensive to create or load. The proxy delays creation of the real object until it is actually needed, improving performance and memory usage.
```

---

# Short Notes for Your Pattern Notes

```
Virtual Proxy

Purpose:
Lazy loading of expensive objects.

Use cases:
Images
Database entities
Remote resources
Large reports

Key idea:
Create proxy object first
Real object created only when required

Examples:
Hibernate lazy loading
Image gallery systems
Large file viewers
```

---

# Your Progress (Very Strong)

You now understand **9 important patterns**:

```
1 Singleton
2 Factory
3 Builder
4 Strategy
5 Observer
6 Decorator
7 Adapter
8 Facade
9 Proxy
```

These **9 patterns alone cover most real-world backend systems**.
