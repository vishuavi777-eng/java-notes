# REST Fundamentals

## Definition

REST stands for Representational State Transfer. It is an architectural style for designing APIs using resources and HTTP.

## Why It Matters

A strong backend developer should understand REST concepts, not only how to create controller methods.

## Core Example

```text
Resource: task
URL: /api/tasks/10
Method: GET
Meaning: get task with ID 10
```

## Common Traps

- Saying REST is only JSON.
- Designing URLs as actions only.
- Not understanding stateless APIs.
- Ignoring HTTP method meaning.
- Mixing resource names and operation names badly.

## Interview Answer

REST is an API design style where resources are identified using URLs and operations are performed using HTTP methods. For example, `/api/tasks` represents task resources. GET reads data, POST creates data, PUT or PATCH updates data, and DELETE removes data. REST APIs are usually stateless, meaning each request should contain enough information to process it.

## Quick Revision

- REST is an architectural style.
- Resource means business object like employee or task.
- URL identifies resource.
- HTTP method defines operation.
- REST APIs should be stateless.
- JSON is common, but REST is not limited to JSON.

## Deep Dive

### Resource-Based URLs

Good:

```text
GET /api/employees/5
POST /api/tasks
PATCH /api/tasks/10/status
```

Weak:

```text
GET /api/getEmployee
POST /api/createTask
POST /api/updateTaskStatus
```

### Stateless Meaning

The server should not depend on previous request state to understand the current request. Authentication data is usually sent using a token or session cookie.

### Common Interview Questions

- What is REST?
- What is a resource?
- What does stateless mean?
- Is REST only JSON?

