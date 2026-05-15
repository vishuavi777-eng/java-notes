# Request Mapping and HTTP Methods

## Definition

Request mapping connects an HTTP request path and method to a Java controller method.

## Why It Matters

Correct API design makes backend systems easier to understand, test, and maintain.

## Core Example

```java
@RequestMapping("/api/tasks")
public class TaskController {
    @GetMapping("/{id}")
    public TaskResponse getTask(@PathVariable Long id) {
        return taskService.getTask(id);
    }
}
```

## Common Traps

- Using `POST` for every operation.
- Not using resource-based URLs.
- Confusing `@PathVariable` and `@RequestParam`.
- Not using proper status codes.

## Interview Answer

Spring Boot provides mapping annotations like `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, and `@DeleteMapping`. These annotations map HTTP requests to controller methods. REST APIs should use HTTP methods based on action: GET for read, POST for create, PUT or PATCH for update, and DELETE for delete.

## Quick Revision

- GET: read data.
- POST: create data.
- PUT: full update.
- PATCH: partial update.
- DELETE: remove data.
- `@RequestMapping`: common base path.

## Deep Dive

### Employee Task API Example

```text
GET    /api/employees
POST   /api/employees
GET    /api/tasks/{id}
POST   /api/tasks
PATCH  /api/tasks/{id}/status
DELETE /api/tasks/{id}
```

### Path Variable vs Request Param

```java
@GetMapping("/{id}")
public TaskResponse getTask(@PathVariable Long id) { }

@GetMapping
public List<TaskResponse> getTasks(@RequestParam String status) { }
```

Use path variable for resource identity. Use request param for filters, search, sorting, and pagination.

### Common Interview Questions

- Difference between GET and POST?
- PUT vs PATCH?
- `@PathVariable` vs `@RequestParam`?
- What is a resource-based URL?

