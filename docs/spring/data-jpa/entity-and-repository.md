# Entity and Repository

## Definition

An entity is a Java class mapped to a database table. A repository is an interface used to perform database operations on entities.

## Why It Matters

Entity and repository are the base of Spring Boot database development.

## Core Example

```java
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
}
```

```java
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
}
```

## Common Traps

- Forgetting `@Id`.
- Using entity as API request or response.
- Not understanding generated primary key strategy.
- Putting business logic inside repository.

## Interview Answer

An entity is a class mapped to a database table using `@Entity`. The primary key is marked with `@Id`. A repository is an interface that extends `JpaRepository` or similar Spring Data interfaces. Spring Data JPA creates the implementation automatically at runtime.

## Quick Revision

- `@Entity`: maps class to table.
- `@Id`: primary key.
- `@GeneratedValue`: generated ID.
- Repository performs DB operations.
- `JpaRepository<Entity, IdType>` gives CRUD methods.

## Deep Dive

### Common Repository Methods

```java
findById(id)
findAll()
save(entity)
delete(entity)
existsById(id)
```

### Query Method Example

```java
List<Task> findByStatus(String status);
List<Task> findByEmployeeId(Long employeeId);
```

Spring creates queries from method names.

### Common Interview Questions

- What is an entity?
- What is repository?
- What is `JpaRepository`?
- How does Spring create query methods?

