# MockMvc Controller Test

## Definition

`MockMvc` tests Spring MVC controller behavior without running a real server.

## Why It Matters

Controller tests verify request mapping, validation, status codes, and response JSON.

## Core Example

```java
@WebMvcTest(TaskController.class)
class TaskControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    TaskService taskService;
}
```

## Common Traps

- Testing service business logic in controller tests.
- Forgetting to mock service dependencies.
- Not testing validation errors.
- Checking only status code but not response body.
- Using full `@SpringBootTest` when `@WebMvcTest` is enough.

## Interview Answer

`@WebMvcTest` loads only the web layer required for controller testing. `MockMvc` sends mock HTTP requests to the controller and verifies status codes, headers, validation errors, and response body. Service dependencies are usually mocked.

## Quick Revision

- `@WebMvcTest`: controller slice test.
- `MockMvc`: performs mock HTTP calls.
- Mock service layer.
- Test request mapping and validation.
- Test success and error responses.

## Deep Dive

### Controller Test Example

```java
@Test
void createsTask() throws Exception {
    when(taskService.createTask(any()))
        .thenReturn(new TaskResponse(1L, "Call customer", "OPEN"));

    mockMvc.perform(post("/api/tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"title":"Call customer","employeeId":1}
                """))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.title").value("Call customer"));
}
```

### Validation Test Example

```java
mockMvc.perform(post("/api/tasks")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {"title":"","employeeId":null}
            """))
    .andExpect(status().isBadRequest());
```

### Common Interview Questions

- What is `MockMvc`?
- What does `@WebMvcTest` load?
- Why do we mock service in controller test?
- How do you test validation errors?

