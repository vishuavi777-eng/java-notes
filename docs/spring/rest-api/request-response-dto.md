# Request Body, ResponseEntity, and DTO

## Definition

`@RequestBody` reads JSON request data into a Java object. `ResponseEntity` gives control over HTTP status and headers. DTOs define request and response shapes.

## Why It Matters

Clean API contracts are important in real projects. DTOs protect your database model and make validation easier.

## Core Example

```java
@PostMapping
public ResponseEntity<EmployeeResponse> createEmployee(
        @RequestBody CreateEmployeeRequest request) {
    EmployeeResponse response = employeeService.createEmployee(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
```

## Common Traps

- Returning entity classes directly from API.
- Accepting entity classes in request body.
- Always returning `200 OK`.
- Exposing sensitive fields in response.

## Interview Answer

`@RequestBody` converts JSON request data into a Java object. DTOs are used as request and response models so the API contract is separate from database entities. `ResponseEntity` is used when we need to control HTTP status, headers, or response body.

## Quick Revision

- `@RequestBody` reads JSON body.
- DTOs separate API model from DB model.
- `ResponseEntity` controls status and headers.
- Use `201 Created` after successful create.
- Do not expose entity directly.

## Deep Dive

### DTO Example

```java
public class CreateTaskRequest {
    private String title;
    private Long employeeId;
}

public class TaskResponse {
    private Long id;
    private String title;
    private String status;
}
```

### Entity vs DTO

Entity is for database mapping. DTO is for API input and output.

Benefits of DTO:

- Hide internal fields.
- Control API response.
- Add validation.
- Avoid exposing database structure.

### Common Interview Questions

- What is `@RequestBody`?
- What is DTO?
- Why not return entity from controller?
- When should we use `ResponseEntity`?

