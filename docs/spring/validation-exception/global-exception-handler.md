# Global Exception Handler

## Definition

A global exception handler is a centralized class that catches exceptions from controllers and converts them into API responses.

## Why It Matters

Without global exception handling, every controller needs duplicate try-catch logic. A common handler keeps API errors consistent and easier to maintain.

## Core Example

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEmployeeNotFound(EmployeeNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("EMPLOYEE_NOT_FOUND", ex.getMessage()));
    }
}
```

## Common Traps

- Catching every exception inside controller methods.
- Returning only plain text error messages.
- Exposing stack trace in API response.
- Returning same status code for all errors.
- Swallowing exceptions without logging important failures.

## Interview Answer

In Spring Boot, global exception handling is done using `@RestControllerAdvice` and `@ExceptionHandler`. `@RestControllerAdvice` applies to all REST controllers, and `@ExceptionHandler` maps specific exception types to custom HTTP responses.

## Quick Revision

- `@RestControllerAdvice`: global REST error handler.
- `@ExceptionHandler`: handles specific exception type.
- Return `ResponseEntity` with status and body.
- Keep error response consistent.
- Do not expose internal stack trace.

## Deep Dive

### Custom Exception

```java
public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id) {
        super("Task not found with id: " + id);
    }
}
```

### Handler

```java
@ExceptionHandler(TaskNotFoundException.class)
public ResponseEntity<ErrorResponse> handleTaskNotFound(TaskNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse("TASK_NOT_FOUND", ex.getMessage()));
}
```

### Employee Task Project Connection

If admin assigns a task to an employee ID that does not exist, the service can throw `EmployeeNotFoundException`. The global handler converts it into a `404 Not Found` response.

### Common Interview Questions

- What is `@RestControllerAdvice`?
- What is `@ExceptionHandler`?
- Why is global exception handling better than try-catch in every controller?
- How do you handle resource not found errors?

