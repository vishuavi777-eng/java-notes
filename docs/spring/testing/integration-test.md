# Integration Test

## Definition

An integration test verifies multiple parts of the application working together, usually with full Spring context.

## Why It Matters

Integration tests give confidence that controller, service, repository, configuration, and database flow work together.

## Core Example

```java
@SpringBootTest
class EmployeeTaskIntegrationTest {
}
```

## Common Traps

- Using integration tests for every small method.
- Mocking too many dependencies in integration tests.
- Making tests slow and unstable.
- Not cleaning test data.
- Depending on production database.

## Interview Answer

`@SpringBootTest` loads the full Spring application context. It is useful when we need to test how multiple layers work together. Integration tests are slower than unit tests, so we should use them for important flows, not every small method.

## Quick Revision

- `@SpringBootTest`: full context.
- Tests complete application flow.
- Slower than unit or slice tests.
- Use for important workflows.
- Avoid production database.

## Deep Dive

### Employee Task Flow Example

An integration test can verify:

```text
Create employee -> create task -> assign task -> update status -> read task
```

### When to Use

- End-to-end backend workflow.
- Security + controller + service flow.
- Database transaction behavior.
- Application startup verification.

### Testcontainers Note

For real database confidence, many teams use Testcontainers to run a temporary database during tests.

### Common Interview Questions

- What is integration testing?
- When do you use `@SpringBootTest`?
- Why not use full context for all tests?
- What is Testcontainers?

