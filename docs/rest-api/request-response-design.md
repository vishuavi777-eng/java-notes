# Request and Response Design

## Definition

Request and response design defines how data is sent to and returned from an API.

## Why It Matters

Good API contracts make frontend, mobile, and backend integration easier.

## Core Example

```json
{
  "title": "Call customer",
  "employeeId": 5,
  "priority": "HIGH"
}
```

## Common Traps

- Returning database entities directly.
- Exposing sensitive fields.
- Inconsistent field names.
- Changing response shape without versioning.
- Mixing internal status names with public API names without thought.

## Interview Answer

A good REST API has clear request and response DTOs. Request data should include only what the client can provide. Response data should include only what the client needs. API contracts should be consistent, stable, and should not expose internal database structure or sensitive fields.

## Quick Revision

- Use DTOs for request and response.
- Keep field names consistent.
- Do not expose sensitive data.
- Avoid returning database entity directly.
- Return useful but not excessive data.

## Deep Dive

### Create Task Request

```json
{
  "title": "Call customer",
  "employeeId": 5,
  "dueDate": "2026-05-20"
}
```

### Task Response

```json
{
  "id": 10,
  "title": "Call customer",
  "status": "OPEN",
  "employeeName": "Amit Patil"
}
```

### Good Design Rules

- Use nouns for resource fields.
- Use consistent naming style.
- Do not send password, token, or internal flags.
- Keep date format consistent.
- Add new fields carefully to avoid breaking clients.

### Common Interview Questions

- Why use DTOs?
- What should be in request body?
- What should not be returned in response?
- How do you avoid breaking API clients?

