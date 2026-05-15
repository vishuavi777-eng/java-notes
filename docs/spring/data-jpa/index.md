# Data Access with Spring Data JPA

## Definition

Spring Data JPA simplifies database access by generating repository implementations and integrating with JPA.

## Why It Matters

Most backend applications need database access. Interviews often ask about entities, repositories, transactions, lazy loading, and the N+1 problem.

## Core Example

```java
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
}
```

## Common Traps

- Returning entities directly from controllers.
- Ignoring transaction boundaries.
- Lazy loading outside transaction.
- N+1 query problem.
- Confusing JPA with Spring Data JPA.

## Interview Answer

JPA maps Java entities to database tables. Spring Data JPA provides repository interfaces like `JpaRepository` to reduce boilerplate database code. It creates repository implementations automatically and supports CRUD operations, query methods, pagination, sorting, and custom queries.

## Quick Revision

- Entity maps to table.
- Repository handles database operations.
- `JpaRepository` gives CRUD methods.
- Query methods are derived from method names.
- `@Transactional` controls transaction boundary.
- Watch lazy loading and N+1 queries.

## Deep Dive

### Employee Task Project Connection

In the Employee Task system:

- `Employee` maps to employee table.
- `Task` maps to task table.
- `EmployeeRepository` handles employee queries.
- `TaskRepository` handles task queries.
- Service layer controls business logic and transactions.

### Common Interview Questions

- What is JPA?
- What is Spring Data JPA?
- What is an entity?
- What is `JpaRepository`?
- What is `@Transactional`?

