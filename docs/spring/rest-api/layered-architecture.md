# Layered Architecture in REST APIs

## Definition

Layered architecture separates controller, service, repository, and database responsibilities.

## Why It Matters

This is one of the most important Spring Boot interview topics. Good layer separation makes code easier to test, maintain, and change.

## Core Example

```text
Controller -> Service -> Repository -> Database
```

## Common Traps

- Writing business logic in controller.
- Calling repository directly from controller.
- Returning entity objects from every layer.
- Making service methods only pass data without business value.

## Interview Answer

In Spring Boot, we commonly use layered architecture. The controller handles HTTP requests, the service layer contains business logic, and the repository layer handles database operations. This separation keeps the code clean and makes testing easier.

## Quick Revision

- Controller: HTTP request and response.
- Service: business logic.
- Repository: database access.
- DTO: API data shape.
- Entity: database table mapping.

## Deep Dive

### Employee Task Flow

```text
POST /api/tasks
-> TaskController
-> TaskService
-> TaskRepository
-> MySQL
```

### Example Responsibility Split

Controller:

```java
@PostMapping
public TaskResponse createTask(@RequestBody CreateTaskRequest request) {
    return taskService.createTask(request);
}
```

Service:

```java
public TaskResponse createTask(CreateTaskRequest request) {
    Employee employee = employeeRepository.findById(request.getEmployeeId())
        .orElseThrow(() -> new EmployeeNotFoundException(request.getEmployeeId()));

    Task task = new Task(request.getTitle(), employee);
    return TaskResponse.from(taskRepository.save(task));
}
```

### Common Interview Questions

- Explain controller, service, repository layers.
- Where should business logic be written?
- Why should controller not call database directly?
- How does layered architecture help testing?

