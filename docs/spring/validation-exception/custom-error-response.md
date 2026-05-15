# Custom Error Response

## Definition

A custom error response is a standard JSON structure returned when an API request fails.

## Why It Matters

Frontend, mobile apps, and API clients need predictable error responses. A consistent structure makes error handling easier.

## Core Example

```java
public record ErrorResponse(
    String code,
    String message
) {}
```

## Common Traps

- Returning different error formats from different APIs.
- Returning stack traces.
- Returning technical exception class names to users.
- Not including field-level validation errors.
- Making error messages too vague.

## Interview Answer

A custom error response gives a consistent error format for all API failures. It can include fields like error code, message, timestamp, path, and validation errors. This helps clients handle errors properly and improves API maintainability.

## Quick Revision

- Keep error format consistent.
- Include error code and message.
- Add field errors for validation failures.
- Avoid stack traces in response.
- Use proper HTTP status with the response body.

## Deep Dive

### Simple Error Response

```java
public record ErrorResponse(
    String code,
    String message,
    String path
) {}
```

### Validation Error Response

```java
public record ValidationErrorResponse(
    String code,
    String message,
    Map<String, String> fieldErrors
) {}
```

Example JSON:

```json
{
  "code": "VALIDATION_FAILED",
  "message": "Invalid request data",
  "fieldErrors": {
    "title": "Title is required",
    "employeeId": "Employee id is required"
  }
}
```

### Practical Fields

- `timestamp`
- `path`
- `code`
- `message`
- `fieldErrors`
- `traceId`

### Common Interview Questions

- Why do we need custom error response?
- What should an error response contain?
- How do you return validation field errors?
- Should stack trace be sent to the client?

