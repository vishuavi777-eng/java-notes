# HTTP Methods

## Definition

HTTP methods describe the type of operation the client wants to perform on a resource.

## Why It Matters

Correct method usage makes APIs predictable and easier to understand.

## Core Example

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/10
PATCH  /api/tasks/10/status
DELETE /api/tasks/10
```

## Common Traps

- Using `POST` for every request.
- Using `GET` to modify data.
- Confusing `PUT` and `PATCH`.
- Not knowing which methods are idempotent.

## Interview Answer

GET is used to read data. POST is used to create data. PUT is used to replace a complete resource. PATCH is used for partial update. DELETE is used to remove a resource. We should choose the method based on the operation, not only convenience.

## Quick Revision

- GET: read.
- POST: create.
- PUT: full update or replace.
- PATCH: partial update.
- DELETE: delete.
- GET should not modify data.

## Deep Dive

### Employee Task Examples

| Method | URL | Purpose |
| --- | --- | --- |
| `GET` | `/api/employees` | List employees |
| `POST` | `/api/employees` | Create employee |
| `GET` | `/api/tasks/10` | Get task details |
| `PATCH` | `/api/tasks/10/status` | Update task status |
| `DELETE` | `/api/tasks/10` | Delete task |

### PUT vs PATCH

PUT replaces the full resource:

```http
PUT /api/tasks/10
```

PATCH changes only selected fields:

```http
PATCH /api/tasks/10/status
```

### Common Interview Questions

- GET vs POST?
- PUT vs PATCH?
- Can GET change data?
- Which HTTP method is used to delete a resource?

