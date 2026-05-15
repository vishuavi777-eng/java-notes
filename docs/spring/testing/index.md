# Testing Spring Boot Applications

## Definition

Testing Spring Boot applications means verifying business logic, REST APIs, database queries, and full application flow.

## Why It Matters

Tests protect refactoring and help prove that APIs, services, and database logic work correctly. Interviewers expect you to know when to use unit tests, slice tests, repository tests, and integration tests.

## Core Example

```java
@WebMvcTest(TaskController.class)
class TaskControllerTest {
    @Autowired
    MockMvc mockMvc;
}
```

## Common Traps

- Using `@SpringBootTest` for every test.
- Testing framework behavior instead of business logic.
- Mocking too much in integration tests.
- Ignoring error response tests.
- Not testing database query methods.

## Interview Answer

Spring Boot testing can be done at different levels. Unit tests test plain Java business logic without Spring. `@WebMvcTest` tests the controller layer. `@DataJpaTest` tests repository and JPA behavior. `@SpringBootTest` loads the full application context for integration testing. The correct test type depends on what we want to verify.

## Quick Revision

- Unit test: fast, no Spring context.
- `@WebMvcTest`: controller layer.
- `@DataJpaTest`: repository layer.
- `@SpringBootTest`: full application context.
- Mock external dependencies.
- Test both success and failure cases.

## Deep Dive

### Study Order

1. Service unit test
2. Controller test with MockMvc
3. Repository test with DataJpaTest
4. Integration test with SpringBootTest
5. Common testing traps

### Employee Task Project Connection

In the Employee Task / Call Allocation System, tests can verify task assignment logic, employee validation, REST API responses, repository queries, and complete task creation flow.

### Common Interview Questions

- Unit test vs integration test?
- What is `@WebMvcTest`?
- What is `@DataJpaTest`?
- When should we use `@SpringBootTest`?
- Why should we avoid using full context for every test?

