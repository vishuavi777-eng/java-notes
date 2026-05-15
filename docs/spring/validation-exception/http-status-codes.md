# HTTP Status Codes for Errors

## Definition

HTTP status codes tell the client whether the request succeeded or failed, and what type of failure happened.

## Why It Matters

Correct status codes make APIs easier to use and debug. Interviewers often check whether you understand common backend API responses.

## Core Example

```java
return ResponseEntity.status(HttpStatus.NOT_FOUND)
    .body(new ErrorResponse("TASK_NOT_FOUND", "Task not found"));
```

## Common Traps

- Returning `200 OK` for failed requests.
- Returning `500 Internal Server Error` for validation errors.
- Confusing `401` and `403`.
- Not using `409 Conflict` for duplicate or state conflicts.

## Interview Answer

In REST APIs, we should return proper HTTP status codes. Validation errors usually return `400 Bad Request`, unauthenticated requests return `401`, forbidden requests return `403`, missing resources return `404`, duplicate or conflicting operations return `409`, and unexpected server failures return `500`.

## Quick Revision

- `400`: bad request or validation error.
- `401`: not authenticated.
- `403`: authenticated but not allowed.
- `404`: resource not found.
- `409`: conflict.
- `500`: server error.

## Deep Dive

| Status | Meaning | Example |
| --- | --- | --- |
| `400` | Invalid request | Missing title in create task request |
| `401` | Not authenticated | No token or invalid token |
| `403` | Not allowed | User does not have admin role |
| `404` | Not found | Employee ID does not exist |
| `409` | Conflict | Duplicate email or invalid state change |
| `500` | Server error | Unexpected application failure |

### Employee Task Project Examples

- Create employee with invalid email: `400 Bad Request`.
- Assign task to missing employee: `404 Not Found`.
- Create employee with duplicate email: `409 Conflict`.
- Access admin API without login: `401 Unauthorized`.
- Access admin API with normal user role: `403 Forbidden`.

### Common Interview Questions

- Difference between `401` and `403`?
- When do you return `400`?
- When do you return `404`?
- When should `409 Conflict` be used?

