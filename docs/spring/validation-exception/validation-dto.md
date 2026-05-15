# Validation DTO

## Definition

A validation DTO is a request object with validation annotations that define what input is allowed.

## Why It Matters

Validation protects the API boundary. It stops invalid data before it reaches service logic or database logic.

## Core Example

```java
public record CreateTaskRequest(
    @NotBlank(message = "Title is required")
    String title,

    @NotNull(message = "Employee id is required")
    Long employeeId
) {}
```

## Common Traps

- Validating entity classes instead of request DTOs.
- Forgetting `@Valid` in controller method.
- Writing all validation manually in service.
- Not giving clear validation messages.
- Mixing simple input validation with business rules.

## Interview Answer

In Spring Boot, request validation is usually added on DTO classes using Bean Validation annotations. For example, `@NotBlank` checks required text, `@Email` checks email format, and `@Positive` checks positive numbers. The controller uses `@Valid` to trigger validation before calling the service.

## Quick Revision

- DTO is the API input model.
- Validation annotations define input rules.
- `@Valid` triggers validation.
- Invalid input usually returns `400 Bad Request`.
- Keep entity and request DTO separate.

## Deep Dive

### Common Validation Annotations

```java
@NotNull
@NotBlank
@Email
@Size
@Min
@Max
@Positive
@Past
@Future
```

### Controller Example

```java
@PostMapping
public TaskResponse createTask(@Valid @RequestBody CreateTaskRequest request) {
    return taskService.createTask(request);
}
```

### Input Validation vs Business Validation

Input validation:

- title is required
- email format is valid
- age is positive

Business validation:

- employee must exist
- task cannot be assigned to inactive employee
- completed task cannot be reassigned

Business validation belongs in the service layer.

### Common Interview Questions

- What is Bean Validation?
- What is the use of `@Valid`?
- DTO validation vs business validation?
- Why should we not validate directly on entity classes?

