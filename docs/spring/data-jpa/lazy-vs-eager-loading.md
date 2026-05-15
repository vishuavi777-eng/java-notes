# Lazy vs Eager Loading

## Definition

Lazy loading loads related data only when it is accessed. Eager loading loads related data immediately with the main entity.

## Why It Matters

Wrong fetching strategy can cause slow APIs, extra queries, or `LazyInitializationException`.

## Core Example

```java
@ManyToOne(fetch = FetchType.LAZY)
private Employee employee;
```

## Common Traps

- Making everything eager.
- Accessing lazy fields outside transaction.
- Returning entity directly from controller.
- Not noticing hidden extra queries.

## Interview Answer

Lazy loading means related data is fetched only when needed. Eager loading means related data is fetched immediately. Lazy loading is usually preferred for large relationships, but we must access required data inside a transaction or fetch it using a proper query.

## Quick Revision

- Lazy: load when accessed.
- Eager: load immediately.
- Lazy can cause `LazyInitializationException`.
- Eager can load unnecessary data.
- Use DTO queries or fetch joins when needed.

## Deep Dive

### Example Problem

```java
Task task = taskRepository.findById(id).orElseThrow();
String employeeName = task.getEmployee().getName();
```

If `employee` is lazy and the session is closed, this can fail.

### Better Options

- Fetch required data inside service transaction.
- Use fetch join.
- Use DTO projection.
- Avoid returning entity directly.

### Common Interview Questions

- Difference between lazy and eager loading?
- What is `LazyInitializationException`?
- Why should we not make everything eager?
- How can we fix lazy loading issues?

