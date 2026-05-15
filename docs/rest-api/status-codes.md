# HTTP Status Codes

## Definition

HTTP status codes tell the client whether a request succeeded or failed and what type of result happened.

## Why It Matters

Correct status codes make APIs easier to integrate, debug, and test.

## Core Example

```http
201 Created
```

This is commonly returned after a resource is created successfully.

## Common Traps

- Returning `200 OK` for every response.
- Returning `500` for validation errors.
- Confusing `401` and `403`.
- Not using `404` for missing resources.
- Not using `409` for duplicate or conflict cases.

## Interview Answer

REST APIs should return proper HTTP status codes. `200 OK` is used for successful read or update, `201 Created` for successful creation, `400 Bad Request` for invalid input, `401 Unauthorized` for missing or invalid authentication, `403 Forbidden` for no permission, `404 Not Found` for missing resource, `409 Conflict` for duplicate or state conflict, and `500 Internal Server Error` for unexpected server failure.

## Quick Revision

- `200`: success.
- `201`: created.
- `204`: success with no body.
- `400`: invalid request.
- `401`: not authenticated.
- `403`: not allowed.
- `404`: not found.
- `409`: conflict.
- `500`: server error.

## Deep Dive

### Common Status Codes

| Code | Meaning | Example |
| --- | --- | --- |
| `200` | OK | Task details returned |
| `201` | Created | Employee created |
| `204` | No Content | Task deleted |
| `400` | Bad Request | Missing required field |
| `401` | Unauthorized | Token missing |
| `403` | Forbidden | User is not admin |
| `404` | Not Found | Task ID does not exist |
| `409` | Conflict | Duplicate email |
| `500` | Server Error | Unexpected failure |

### Employee Task Examples

- Create employee successfully: `201 Created`.
- Create task without title: `400 Bad Request`.
- Assign task to missing employee: `404 Not Found`.
- Create employee with duplicate email: `409 Conflict`.

### Common Interview Questions

- Difference between `401` and `403`?
- When should API return `201`?
- When should API return `409`?
- Should validation error return `500`?

