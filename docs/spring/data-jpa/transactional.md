# `@Transactional`

## Definition

`@Transactional` defines a transaction boundary. It makes multiple database operations succeed or fail as one unit.

## Why It Matters

Without correct transaction handling, data can become inconsistent when one operation succeeds and another fails.

## Core Example

```java
@Transactional
public TaskResponse assignTask(Long taskId, Long employeeId) {
    Task task = taskRepository.findById(taskId)
        .orElseThrow(() -> new TaskNotFoundException(taskId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new EmployeeNotFoundException(employeeId));

    task.assignTo(employee);
    return TaskResponse.from(task);
}
```

## Common Traps

- Not knowing where to put `@Transactional`.
- Using transactions in controller instead of service.
- Expecting checked exceptions to rollback by default.
- Calling transactional method from same class and expecting proxy behavior.

## Interview Answer

`@Transactional` tells Spring to run a method inside a database transaction. If the method completes successfully, changes are committed. If a runtime exception occurs, changes are rolled back. It is usually placed on service methods because service methods represent business operations.

## Quick Revision

- Transaction = all operations succeed or fail together.
- Usually put on service layer.
- Runtime exceptions rollback by default.
- Commit happens when method completes.
- Rollback happens on failure.

## Deep Dive

### Why Service Layer

Service layer often contains a full business use case.

Example:

```text
Find task -> find employee -> assign task -> save status
```

These operations should be one transaction.

### Read Only Transaction

```java
@Transactional(readOnly = true)
public TaskResponse getTask(Long id) {
    return taskRepository.findById(id)
        .map(TaskResponse::from)
        .orElseThrow(() -> new TaskNotFoundException(id));
}
```

### Common Interview Questions

- What is `@Transactional`?
- Where should it be used?
- What causes rollback?
- Why is transaction important in service layer?

