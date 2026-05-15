# Repository Test

## Definition

A repository test verifies JPA entity mapping, query methods, and database behavior.

## Why It Matters

Repository tests catch query mistakes, mapping problems, and database-related issues.

## Core Example

```java
@DataJpaTest
class TaskRepositoryTest {
    @Autowired
    TaskRepository taskRepository;
}
```

## Common Traps

- Not testing custom queries.
- Assuming method-name queries always work.
- Testing repository with mocked database only.
- Ignoring entity relationship mappings.
- Not testing constraints like unique email.

## Interview Answer

`@DataJpaTest` is used to test the JPA layer. It loads repository-related beans and usually uses an embedded test database by default. It is useful for testing query methods, custom queries, entity mappings, and persistence behavior.

## Quick Revision

- `@DataJpaTest`: JPA slice test.
- Tests repositories and entity mappings.
- Good for query methods.
- Usually uses test database.
- Faster than full integration test.

## Deep Dive

### Query Method Test

```java
@Test
void findsTasksByStatus() {
    taskRepository.save(new Task("Call customer", "OPEN"));
    taskRepository.save(new Task("Send report", "DONE"));

    List<Task> openTasks = taskRepository.findByStatus("OPEN");

    assertEquals(1, openTasks.size());
}
```

### What to Test

- Query methods.
- Custom `@Query`.
- Entity relationships.
- Unique constraints.
- Sorting and pagination queries.

### Common Interview Questions

- What is `@DataJpaTest`?
- What does repository test verify?
- Why test query methods?
- Difference between repository test and integration test?

