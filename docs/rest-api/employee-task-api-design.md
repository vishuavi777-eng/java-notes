# Employee Task API Design

## Definition

Employee Task API design means defining REST endpoints for managing employees, tasks, call allocation, and status tracking.

## Why It Matters

This connects REST theory with your Spring Boot project and helps answer practical design questions in interviews.

## Core Example

```text
POST /api/tasks
PATCH /api/tasks/10/assign
PATCH /api/tasks/10/status
```

## Common Traps

- Designing only one generic endpoint.
- Using action-heavy URLs everywhere.
- Not validating employee and task IDs.
- Not handling duplicate or invalid status transitions.
- Not thinking about pagination for task lists.

## Interview Answer

For an Employee Task / Call Allocation System, I would design REST APIs around resources like employees, tasks, and calls. Admin can create employees, create tasks, assign tasks to employees, and track task status. List APIs should support pagination and filtering. Error responses should be consistent, and protected APIs should require authentication and role-based authorization.

## Quick Revision

- Main resources: employees, tasks, calls.
- Use resource-based URLs.
- Use correct HTTP methods.
- Add pagination for lists.
- Validate IDs and status changes.
- Secure admin APIs.

## Deep Dive

### Employee APIs

```text
GET    /api/employees
POST   /api/employees
GET    /api/employees/{id}
PUT    /api/employees/{id}
DELETE /api/employees/{id}
```

### Task APIs

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PATCH  /api/tasks/{id}/assign
PATCH  /api/tasks/{id}/status
DELETE /api/tasks/{id}
```

### Call Allocation APIs

```text
GET   /api/calls?status=PENDING&page=0&size=20
POST  /api/calls
PATCH /api/calls/{id}/assign
PATCH /api/calls/{id}/status
```

### Example Create Task Request

```json
{
  "title": "Follow-up call",
  "description": "Call customer for feedback",
  "employeeId": 5,
  "priority": "HIGH",
  "dueDate": "2026-05-20"
}
```

### Example Task Response

```json
{
  "id": 10,
  "title": "Follow-up call",
  "status": "OPEN",
  "priority": "HIGH",
  "employeeId": 5,
  "employeeName": "Amit Patil"
}
```

### Common Interview Questions

- How would you design APIs for your Spring Boot project?
- What endpoints are needed?
- How do you handle task assignment?
- How do you handle pagination?
- How do you secure admin APIs?

### Related Interview Topics

- [Spring Boot Project Explanation](../spring/interview-system-design/employee-task-project-explanation.md)
- [Employee Task Database Design](../sql-mysql/employee-task-database-design.md)
- [Employee Task System Design](../backend-system-design/employee-task-system-design.md)
- [HTTP Methods](http-methods.md)
- [HTTP Status Codes](status-codes.md)
- [Pagination, Sorting, and Filtering](pagination-sorting-filtering.md)
- [Request and Response Design](request-response-design.md)
- [Error Response Design](error-response-design.md)
- [Authentication in REST APIs](authentication.md)
- [API Versioning](api-versioning.md)
