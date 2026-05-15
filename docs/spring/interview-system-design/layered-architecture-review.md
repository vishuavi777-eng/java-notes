# Layered Architecture Review

## Definition

Layered architecture separates an application into clear layers such as controller, service, repository, DTO, and entity.

## Why It Matters

Good separation makes code easier to test, debug, maintain, and extend.

## Core Example

```text
Controller -> Service -> Repository -> Database
```

## Common Traps

- Calling repository directly from controller.
- Writing business logic in controller.
- Returning entities directly from API.
- Creating one large service for everything.
- Not defining clear DTOs.

## Interview Answer

In Spring Boot, the controller handles HTTP requests and responses, the service layer handles business logic, and the repository layer handles database access. DTOs are used for API input and output, while entities are used for database mapping. This keeps the application clean and easy to test.

## Quick Revision

- Controller: HTTP layer.
- Service: business rules.
- Repository: database access.
- DTO: API model.
- Entity: database model.
- Exception handler: error response.

## Deep Dive

### Responsibility Table

| Layer | Responsibility |
| --- | --- |
| Controller | Request mapping, validation trigger, response status |
| Service | Business rules, orchestration, transaction boundary |
| Repository | Database operations |
| DTO | Request and response shape |
| Entity | Table mapping |
| Exception handler | Consistent error response |

### Employee Task Example

Controller:

```java
@PostMapping
public TaskResponse createTask(@Valid @RequestBody CreateTaskRequest request) {
    return taskService.createTask(request);
}
```

Service:

```java
public TaskResponse createTask(CreateTaskRequest request) {
    Employee employee = employeeRepository.findById(request.employeeId())
        .orElseThrow(() -> new EmployeeNotFoundException(request.employeeId()));

    Task task = new Task(request.title(), employee);
    return TaskResponse.from(taskRepository.save(task));
}
```

### Common Interview Questions

- Why do we use layered architecture?
- Where should business logic be written?
- Why should controller not call repository directly?
- DTO vs entity?

