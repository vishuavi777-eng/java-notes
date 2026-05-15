# CrudRepository vs JpaRepository

## Definition

`CrudRepository`, `PagingAndSortingRepository`, and `JpaRepository` are Spring Data repository interfaces with different levels of functionality.

## Why It Matters

Interviewers often ask which repository interface you use and why.

## Core Example

```java
public interface TaskRepository extends JpaRepository<Task, Long> {
}
```

## Common Traps

- Thinking `JpaRepository` is required for every project.
- Not knowing what extra features `JpaRepository` provides.
- Confusing Spring Data repository interfaces with JPA itself.

## Interview Answer

`CrudRepository` provides basic CRUD operations. `PagingAndSortingRepository` adds pagination and sorting. `JpaRepository` adds JPA-specific features like flushing and batch operations. In most Spring Boot JPA applications, `JpaRepository` is commonly used because it includes CRUD, pagination, sorting, and JPA features.

## Quick Revision

- `CrudRepository`: basic CRUD.
- `PagingAndSortingRepository`: pagination and sorting.
- `JpaRepository`: CRUD + pagination + JPA-specific methods.
- Most Spring Boot JPA projects use `JpaRepository`.

## Deep Dive

### Interface Hierarchy

```text
Repository
-> CrudRepository
-> PagingAndSortingRepository
-> JpaRepository
```

### Pagination Example

```java
Page<Task> findByStatus(String status, Pageable pageable);
```

### Common Interview Questions

- Difference between `CrudRepository` and `JpaRepository`?
- Why do we use `JpaRepository`?
- How do you implement pagination in Spring Data JPA?

