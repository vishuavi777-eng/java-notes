# Design Principles in Spring Boot

## Definition

Design principles help keep Spring Boot applications clean, flexible, testable, and maintainable.

## Why It Matters

Senior interviewers check whether you can connect Spring Boot coding practices with OOP, SOLID, and design patterns.

## Core Example

```text
Service depends on repository interface, not manual database code.
```

## Common Traps

- Memorizing SOLID without project examples.
- Creating large controllers and services.
- Using inheritance where composition is better.
- Adding patterns without real need.
- Not explaining trade-offs.

## Interview Answer

Spring Boot supports clean design through dependency injection, layered architecture, interfaces, and separation of concerns. For example, controller follows single responsibility by handling HTTP only, service handles business logic, and repository abstracts database access. Spring also uses proxy-based behavior for features like `@Transactional`.

## Quick Revision

- SRP: one class should have one main responsibility.
- DIP: depend on abstractions.
- Proxy pattern: used by AOP and transactions.
- Singleton scope: default Spring bean scope.
- Strategy pattern: useful for replaceable business rules.

## Deep Dive

### Single Responsibility Principle

Controller should not contain database logic.

```text
Controller = HTTP
Service = business rule
Repository = database
```

### Dependency Inversion

Service depends on repository abstraction:

```java
private final TaskRepository taskRepository;
```

### Proxy Pattern

Spring uses proxies for cross-cutting behavior like:

- `@Transactional`
- method security
- logging aspects

### Strategy Pattern Example

For call allocation:

```text
RoundRobinAllocationStrategy
PriorityBasedAllocationStrategy
LeastBusyEmployeeStrategy
```

### Common Interview Questions

- Which design principles are used in Spring Boot?
- How does dependency injection support loose coupling?
- How is proxy pattern used in Spring?
- Where can strategy pattern be useful?

