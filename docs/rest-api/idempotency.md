# Idempotency

## Definition

An operation is idempotent if calling it multiple times gives the same final result as calling it once.

## Why It Matters

Idempotency matters for retries, network failures, payment APIs, task updates, and reliable backend systems.

## Core Example

```http
DELETE /api/tasks/10
```

Deleting the same task multiple times should leave the system in the same final state: task is deleted.

## Common Traps

- Thinking idempotent means same response body every time.
- Retrying `POST` without duplicate protection.
- Not understanding PUT vs POST.
- Ignoring idempotency in external integrations.

## Interview Answer

Idempotency means the final result remains the same even if the same request is repeated multiple times. GET, PUT, and DELETE are generally idempotent. POST is usually not idempotent because repeated POST requests may create duplicate records, unless we design it with an idempotency key.

## Quick Revision

- Idempotent means same final state.
- GET is idempotent.
- PUT is idempotent.
- DELETE is usually idempotent.
- POST is usually not idempotent.
- Idempotency helps safe retries.

## Deep Dive

### Method Idempotency

| Method | Idempotent? | Reason |
| --- | --- | --- |
| GET | Yes | Only reads data |
| PUT | Yes | Replaces resource with same data |
| PATCH | Depends | Can be idempotent if designed carefully |
| DELETE | Usually yes | Resource remains deleted |
| POST | Usually no | May create duplicates |

### Employee Task Example

This can create duplicate tasks if retried:

```http
POST /api/tasks
```

This should be safe to repeat:

```http
PATCH /api/tasks/10/status
{
  "status": "DONE"
}
```

### Common Interview Questions

- What is idempotency?
- Which HTTP methods are idempotent?
- Why is POST usually not idempotent?
- How does idempotency help retries?

