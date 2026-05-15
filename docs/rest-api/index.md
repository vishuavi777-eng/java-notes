# REST API Roadmap

## Definition

REST API is a way for applications to communicate over HTTP using resources, URLs, HTTP methods, status codes, and structured request/response data.

## Why It Matters

REST APIs are used in backend, mobile apps, web apps, admin panels, and third-party integrations. Java and Spring Boot interviews often ask REST questions separately from Spring annotations.

## Core Example

```text
GET /api/tasks/10
```

This request means: get task details for task ID `10`.

## Common Traps

- Thinking REST means only JSON.
- Using `POST` for every operation.
- Returning `200 OK` for every response.
- Designing URLs with verbs instead of resources.
- Ignoring pagination, filtering, versioning, and error response design.

## Interview Answer

REST API is an architectural style for designing web APIs. It uses HTTP methods like GET, POST, PUT, PATCH, and DELETE to perform operations on resources. A good REST API has clear resource-based URLs, correct status codes, consistent request and response bodies, proper error handling, authentication, and pagination for large data.

## Quick Revision

- REST works with resources.
- URLs should be resource-based.
- HTTP methods define action.
- Status codes explain result.
- Request and response should be consistent.
- APIs should handle errors clearly.

## Deep Dive

### Study Order

1. REST fundamentals
2. HTTP methods
3. Status codes
4. Idempotency
5. Pagination, sorting, and filtering
6. Request and response design
7. Error response design
8. Authentication
9. API versioning
10. REST vs SOAP vs GraphQL
11. Employee Task API design

### Employee Task Project Connection

In the Employee Task / Call Allocation System, REST APIs can manage employees, create tasks, assign calls, update task status, and show reports.

### Common Interview Questions

- What is REST API?
- GET vs POST vs PUT vs PATCH?
- What is idempotency?
- How do you design API URLs?
- How do you handle errors in REST APIs?

