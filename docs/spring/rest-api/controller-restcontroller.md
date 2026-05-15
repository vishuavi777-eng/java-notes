# Controller and RestController

## Definition

`@Controller` is used for web MVC pages. `@RestController` is used for REST APIs and returns data directly in the response body.

## Why It Matters

Backend interviews often check whether you understand how Spring handles HTTP requests and JSON responses.

## Core Example

```java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
}
```

## Common Traps

- Using `@Controller` for REST API and forgetting `@ResponseBody`.
- Writing business logic in controller.
- Returning database entities directly.
- Making one controller handle too many modules.

## Interview Answer

`@RestController` is a combination of `@Controller` and `@ResponseBody`. It tells Spring that the class handles web requests and method return values should be written directly to the HTTP response, usually as JSON.

## Quick Revision

- `@Controller`: often used for views.
- `@RestController`: used for REST APIs.
- `@ResponseBody`: returns data, not a view.
- Controller should handle HTTP layer only.

## Deep Dive

### Thin Controller

```java
@PostMapping
public TaskResponse createTask(@RequestBody CreateTaskRequest request) {
    return taskService.createTask(request);
}
```

The controller receives the request and delegates to service.

### Good Controller Responsibilities

- Map URL and HTTP method.
- Read request data.
- Trigger validation.
- Return response DTO and status.

### Bad Controller Responsibilities

- Writing SQL logic.
- Applying complex business rules.
- Updating multiple tables directly.

### Common Interview Questions

- Difference between `@Controller` and `@RestController`?
- What does `@ResponseBody` do?
- Why should controller stay thin?

