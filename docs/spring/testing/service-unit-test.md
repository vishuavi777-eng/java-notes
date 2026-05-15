# Service Unit Test

## Definition

A service unit test verifies business logic in the service layer without starting the Spring application context.

## Why It Matters

Service unit tests are fast and focus on business rules. They help test logic like task assignment, validation, and status changes.

## Core Example

```java
class TaskServiceTest {
    private TaskRepository taskRepository = mock(TaskRepository.class);
    private EmployeeRepository employeeRepository = mock(EmployeeRepository.class);
    private TaskService taskService = new TaskService(taskRepository, employeeRepository);
}
```

## Common Traps

- Starting Spring context for simple business logic.
- Mocking the class being tested.
- Testing only happy path.
- Not testing exceptions.
- Writing tests that know too much about implementation.

## Interview Answer

A service unit test tests business logic directly as plain Java. We usually mock repositories or external dependencies and verify the service behavior. It is fast because it does not load the Spring context.

## Quick Revision

- No Spring context needed.
- Test business logic.
- Mock repositories.
- Test success and failure paths.
- Keep tests fast.

## Deep Dive

### Employee Task Example

```java
@Test
void assignsTaskToEmployee() {
    Employee employee = new Employee(1L, "Amit");
    Task task = new Task(10L, "Call customer");

    when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
    when(taskRepository.findById(10L)).thenReturn(Optional.of(task));

    taskService.assignTask(10L, 1L);

    assertEquals(employee, task.getEmployee());
}
```

### What to Test

- Task is assigned to employee.
- Missing employee throws exception.
- Missing task throws exception.
- Completed task cannot be reassigned.

### Common Interview Questions

- What is a unit test?
- Why should service tests be fast?
- Why do we mock repositories in service tests?
- What is the difference between mock and real object?

