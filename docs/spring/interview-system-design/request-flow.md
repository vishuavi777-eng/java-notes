# Spring Boot Request Flow

## Definition

Request flow explains how an HTTP request travels through a Spring Boot application from client to database and back.

## Why It Matters

This is a common interview question because it checks whether you understand the complete backend flow, not only annotations.

## Core Example

```text
Client
  -> Security Filter Chain
  -> DispatcherServlet
  -> Controller
  -> Service
  -> Repository
  -> Database
```

## Common Traps

- Starting explanation directly from controller.
- Forgetting security filters.
- Not mentioning validation.
- Putting repository before service.
- Not explaining response DTO.

## Interview Answer

When a request comes to a Spring Boot application, it first passes through filters such as security filters. Then DispatcherServlet finds the correct controller method. The controller reads the request and triggers validation. The service layer handles business logic and transactions. The repository layer performs database operations. Finally, the response is returned as a DTO with a proper HTTP status.

## Quick Revision

- Filters run before controller.
- DispatcherServlet routes request.
- Controller handles HTTP input and output.
- Service handles business logic.
- Repository handles database.
- Response should be DTO, not entity.

## Deep Dive

### Employee Task Example

```text
POST /api/tasks
-> JWT filter validates token
-> TaskController receives request
-> CreateTaskRequest is validated
-> TaskService checks employee and task rules
-> TaskRepository saves task
-> TaskResponse is returned
```

### Where Each Concern Belongs

| Concern | Layer |
| --- | --- |
| JWT validation | Filter |
| URL mapping | Controller |
| Request validation | Controller boundary |
| Business rules | Service |
| Transaction | Service |
| Database query | Repository |
| Error response | Global exception handler |

### Common Interview Questions

- Explain Spring Boot request flow.
- What is DispatcherServlet?
- Where does validation happen?
- Where should transaction start?

