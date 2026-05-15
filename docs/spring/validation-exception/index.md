# Validation and Exception Handling

## Definition

Validation checks whether API input is correct. Exception handling converts application errors into clear HTTP responses.

## Why It Matters

Real APIs must reject invalid input clearly and return consistent error responses. This is important for frontend apps, mobile apps, backend clients, and interview discussions.

## Core Example

```java
public record CreateEmployeeRequest(
    @NotBlank String name,
    @Email String email
) {}
```

## Common Traps

- Adding validation annotations but forgetting `@Valid`.
- Returning raw stack traces to the client.
- Handling exceptions inside every controller method.
- Returning `200 OK` for failed requests.
- Mixing request validation with business validation.

## Interview Answer

Spring Boot supports validation using Bean Validation annotations like `@NotBlank`, `@Email`, `@Size`, and `@Positive`. We trigger validation using `@Valid` in controller methods. For errors, we use `@RestControllerAdvice` with `@ExceptionHandler` to return consistent API error responses.

## Quick Revision

- Use DTO validation annotations.
- Add `@Valid` in controller method.
- Use `@RestControllerAdvice` for global error handling.
- Return consistent error response.
- Use correct HTTP status codes.
- Do not expose internal stack traces.

## Deep Dive

### Study Order

1. Validation DTOs
2. `@Valid` in controller methods
3. Global exception handler
4. Custom error response
5. HTTP status codes
6. Common validation and exception traps

### Employee Task Project Connection

In the Employee Task / Call Allocation System, validation is needed when creating employees, creating tasks, assigning tasks, and updating task status. Exception handling is needed when employee ID or task ID does not exist.

### Common Interview Questions

- How do you validate request body in Spring Boot?
- What is `@Valid`?
- What is `@RestControllerAdvice`?
- How do you return custom error responses?
- Which HTTP status code is used for validation errors?

