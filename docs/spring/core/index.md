# Core Spring Boot Fundamentals

## Definition

Core Spring Boot fundamentals explain how a Spring Boot application starts, creates objects, wires dependencies, and reads configuration.

## Why It Matters

Without core fundamentals, annotations look like magic. In interviews, you should explain what Spring creates, why it creates it, and how objects work together.

## Core Example

```java
@SpringBootApplication
public class TaskAllocationApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskAllocationApplication.class, args);
    }
}
```

## Common Traps

- Thinking Spring Boot is different from normal Java.
- Not knowing what `@SpringBootApplication` includes.
- Confusing a class with a Spring bean.
- Using field injection everywhere.
- Placing the main class in the wrong package and breaking component scanning.

## Interview Answer

Spring Boot starts from the main class annotated with `@SpringBootApplication`. It creates an application context, scans components, creates beans, applies auto-configuration, and injects dependencies. It reduces boilerplate, but the application still follows normal Java object principles.

## Quick Revision

- Main class starts the app.
- ApplicationContext stores Spring-managed objects.
- Bean means object managed by Spring.
- Auto-configuration creates common setup.
- Component scanning finds annotated classes.
- Constructor injection is preferred.

## Deep Dive

### Study Order

1. `@SpringBootApplication`
2. ApplicationContext and beans
3. Dependency injection
4. Component scanning
5. Configuration properties and profiles

### Employee Task Project Connection

In the Employee Task / Call Allocation System, Spring Boot creates controllers, services, repositories, and configuration objects. The controller receives API calls, the service handles business logic, and the repository talks to the database.

### Common Interview Questions

- What happens when a Spring Boot application starts?
- What is a bean?
- What is dependency injection?
- Why is constructor injection preferred?
- What is auto-configuration?

