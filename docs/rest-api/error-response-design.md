# Error Response Design

## Definition

Error response design defines the standard structure returned when an API request fails.

## Why It Matters

Clients need predictable error responses to show messages, retry safely, and debug issues.

## Core Example

```json
{
  "code": "TASK_NOT_FOUND",
  "message": "Task not found"
}
```

## Common Traps

- Returning different error formats from different APIs.
- Returning stack traces.
- Returning only generic message.
- Not including field validation errors.
- Returning `200 OK` with error body.

## Interview Answer

A REST API should return consistent error responses with proper HTTP status codes. The response can include error code, message, path, timestamp, and field errors for validation failures. It should not expose stack traces or sensitive internal details.

## Quick Revision

- Use proper HTTP status code.
- Keep error format consistent.
- Include error code and message.
- Include field errors for validation.
- Do not expose stack trace.

## Deep Dive

### Standard Error Response

```json
{
  "timestamp": "2026-05-14T10:30:00",
  "path": "/api/tasks/10",
  "code": "TASK_NOT_FOUND",
  "message": "Task not found"
}
```

### Validation Error Response

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

### Employee Task Examples

- Missing employee: `EMPLOYEE_NOT_FOUND`.
- Missing task: `TASK_NOT_FOUND`.
- Duplicate email: `EMPLOYEE_EMAIL_ALREADY_EXISTS`.
- Invalid status change: `INVALID_TASK_STATUS_CHANGE`.

### Common Interview Questions

- How do you design error response?
- What should validation error include?
- Should stack trace be returned?
- Why use error codes?

