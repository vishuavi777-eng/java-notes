# Client-Server Architecture

## Definition

Client-server architecture means the client sends requests and the server processes them and returns responses.

## Why It Matters

Most web apps, mobile apps, admin panels, and backend APIs follow this model.

## Core Example

```text
Mobile App -> REST API -> Database
```

## Common Traps

- Not separating client and server responsibilities.
- Putting business logic only in the frontend.
- Exposing database directly to clients.
- Not securing APIs.

## Interview Answer

In client-server architecture, the client is usually a mobile app, web app, or admin panel. It sends HTTP requests to the backend server. The server validates the request, applies business logic, talks to the database, and returns a response. The client should not directly access the database.

## Quick Revision

- Client sends request.
- Server processes request.
- Database is behind server.
- Backend protects business logic.
- API is the contract between client and server.

## Deep Dive

### Employee Task Example

```text
Admin Panel -> Spring Boot API -> MySQL
Employee App -> Spring Boot API -> MySQL
```

Admin creates tasks from the web panel. Employees view assigned tasks from app or web UI. Both clients use backend APIs.

### Responsibilities

| Part | Responsibility |
| --- | --- |
| Client | UI, user input, API calls |
| Server | validation, business logic, security |
| Database | persistent storage |

### Common Interview Questions

- What is client-server architecture?
- Why should client not access database directly?
- What is the role of backend API?
- What logic should be on server side?

