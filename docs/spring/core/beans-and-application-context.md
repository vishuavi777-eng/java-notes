# Beans and ApplicationContext

## Definition

A bean is an object managed by Spring. The ApplicationContext is the container that creates, stores, and provides those beans.

## Why It Matters

Spring Boot applications depend on Spring-managed objects. If you understand beans, service wiring, testing, and dependency injection become easier.

## Core Example

```java
@Service
public class TaskService {
    public void assignTask(Long employeeId, Long taskId) {
        // business logic
    }
}
```

`TaskService` becomes a Spring bean because it is annotated with `@Service`.

## Common Traps

- Thinking every Java object is a bean.
- Creating Spring-managed classes manually using `new`.
- Confusing bean name and bean type.
- Forgetting that singleton is the default bean scope.

## Interview Answer

A bean is an object created and managed by Spring. The ApplicationContext is Spring's container. It scans classes, creates beans, manages their lifecycle, and injects them where needed. Common bean annotations are `@Component`, `@Service`, `@Repository`, `@Controller`, and `@RestController`.

## Quick Revision

- Bean = Spring-managed object.
- ApplicationContext = Spring container.
- Default scope is singleton.
- Services, repositories, and controllers are usually beans.
- Avoid creating Spring beans manually with `new`.

## Deep Dive

### Common Bean Annotations

```java
@Component
@Service
@Repository
@Controller
@RestController
@Configuration
```

### Singleton Scope

By default, Spring creates one bean instance per application context.

This does not mean Java singleton pattern. It means Spring manages one shared instance inside the container.

### Employee Task Project Connection

In an Employee Task system:

- `EmployeeController` is a controller bean.
- `EmployeeService` is a service bean.
- `EmployeeRepository` is a repository bean.

Spring creates and connects these objects automatically.

### Common Interview Questions

- What is a Spring bean?
- What is ApplicationContext?
- What is the default bean scope?
- Difference between singleton bean and singleton design pattern?

