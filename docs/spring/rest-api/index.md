# REST API Development

## Definition

REST API development in Spring Boot means creating HTTP endpoints that receive requests, call business logic, and return structured responses.

## Why It Matters

Most Java backend applications expose REST APIs. Interviewers expect clean controller design, DTO usage, correct status codes, and separation between controller, service, and repository layers.

## Core Example

```java
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(@PathVariable Long id) {
        return employeeService.getEmployee(id);
    }
}
```

## Common Traps

- Putting business logic in controller.
- Returning entity objects directly.
- Using wrong HTTP status codes.
- Not validating request bodies.
- Ignoring pagination for list APIs.

## Interview Answer

In Spring Boot, REST APIs are created using `@RestController`, mapping annotations like `@GetMapping` and `@PostMapping`, DTOs for request and response, and services for business logic. The controller should be thin and should delegate business logic to the service layer.

## Quick Revision

- `@RestController` returns JSON response.
- `@RequestMapping` defines base path.
- `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` map HTTP methods.
- Use DTOs for API contracts.
- Keep controllers thin.

## Deep Dive

### Request Flow

```text
Client -> Controller -> Service -> Repository -> Database
```

### Employee Task Project Connection

In the Employee Task system, REST APIs can create employees, create tasks, assign tasks, update task status, and list employee work.

### Common Interview Questions

- What is REST API?
- What is `@RestController`?
- Controller vs service responsibility?
- Why should we use DTOs?
- What status code should be returned after create?

