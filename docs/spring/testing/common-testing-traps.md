# Common Testing Traps

## Definition

Testing traps are mistakes that make tests slow, weak, unstable, or hard to maintain.

## Why It Matters

Bad tests can give false confidence or slow down development. Good tests are focused, fast, and useful.

## Core Example

Bad pattern:

```java
@SpringBootTest
class SimpleCalculatorTest {
    // full app context for simple logic
}
```

Better pattern:

```java
class SimpleCalculatorTest {
    // plain unit test
}
```

## Common Traps

- Using `@SpringBootTest` for everything.
- Testing only happy path.
- Mocking the class under test.
- Not testing validation and error responses.
- Writing tests that depend on execution order.
- Using production services or databases in tests.

## Interview Answer

Common testing mistakes include using full Spring context for simple logic, mocking too much, ignoring failure cases, and writing unstable tests. A good strategy follows the test pyramid: many unit tests, some slice tests, and fewer full integration tests.

## Quick Revision

- Use the smallest test type that gives confidence.
- Unit tests should be fast.
- Slice tests check one Spring layer.
- Integration tests check important flows.
- Test success and failure paths.
- Avoid production dependencies in tests.

## Deep Dive

### Test Pyramid

```text
Many unit tests
Some slice tests
Few integration tests
```

### What to Avoid

- Sleep-based waiting in tests.
- Random data without control.
- Real external API calls.
- Tests depending on previous tests.
- Assertions that do not verify behavior.

### Employee Task Testing Strategy

- Service unit test: assignment rules.
- Controller test: API status and validation.
- Repository test: query methods.
- Integration test: full task creation and assignment flow.

### Common Interview Questions

- What is test pyramid?
- Why should tests be isolated?
- What should be mocked?
- How do you decide test type?

