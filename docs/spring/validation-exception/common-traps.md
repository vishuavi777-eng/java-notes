# Common Validation and Exception Traps

## Definition

Validation and exception traps are common mistakes that make APIs unclear, unsafe, or difficult to maintain.

## Why It Matters

Good backend developers do not only make APIs work. They make APIs predictable when something goes wrong.

## Core Example

Bad pattern:

```java
try {
    return taskService.createTask(request);
} catch (Exception ex) {
    return null;
}
```

Better pattern:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    // centralized handlers
}
```

## Common Traps

- Forgetting `@Valid`.
- Catching generic `Exception` everywhere.
- Returning null from controller.
- Returning stack trace to API client.
- Using same error message for every failure.
- Handling business rules as field validation.

## Interview Answer

Common mistakes include forgetting `@Valid`, handling exceptions inside every controller, returning raw exception details, and using wrong HTTP status codes. A better approach is to validate DTOs at the API boundary and use global exception handling for consistent error responses.

## Quick Revision

- Use `@Valid` with request DTO.
- Keep validation at API boundary.
- Keep business rules in service layer.
- Use custom exceptions for business failures.
- Use global exception handling.
- Return stable error response format.

## Deep Dive

### Trap: Validation Annotation Without `@Valid`

```java
public TaskResponse createTask(@RequestBody CreateTaskRequest request) {
    return taskService.createTask(request);
}
```

Validation annotations on DTO may not run without `@Valid`.

Correct:

```java
public TaskResponse createTask(@Valid @RequestBody CreateTaskRequest request) {
    return taskService.createTask(request);
}
```

### Trap: Business Rule in DTO

DTO validation should check input format. Business rules should be checked in service.

Example:

- DTO: `employeeId` must not be null.
- Service: employee must exist and must be active.

### Common Interview Questions

- What happens if `@Valid` is missing?
- Why should business validation be in service?
- Why should we avoid generic catch blocks?
- How do you keep API error responses consistent?

