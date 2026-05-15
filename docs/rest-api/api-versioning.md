# API Versioning

## Definition

API versioning means managing changes in an API without breaking existing clients.

## Why It Matters

Mobile apps, web apps, and external clients may use older API behavior. Versioning helps release changes safely.

## Core Example

```text
/api/v1/tasks
/api/v2/tasks
```

## Common Traps

- Changing response fields without checking clients.
- Removing fields suddenly.
- Not documenting changes.
- Creating new version for every small change.
- Breaking mobile apps that cannot update immediately.

## Interview Answer

API versioning helps manage breaking changes. Common approaches include URL versioning, header versioning, and media type versioning. URL versioning like `/api/v1/tasks` is simple and commonly used. We should avoid breaking existing clients and use versioning when request or response contract changes significantly.

## Quick Revision

- Versioning protects clients.
- Use versioning for breaking changes.
- URL versioning is simple.
- Additive changes may not need new version.
- Document API changes.

## Deep Dive

### URL Versioning

```text
GET /api/v1/tasks
GET /api/v2/tasks
```

### Header Versioning

```text
Accept-Version: v1
```

### Breaking vs Non-Breaking Change

Non-breaking:

- Add optional response field.
- Add optional request field.

Breaking:

- Rename field.
- Remove field.
- Change field type.
- Change meaning of status.

### Common Interview Questions

- Why do we need API versioning?
- What are API versioning approaches?
- Is adding a new response field breaking?
- When should a new API version be created?

