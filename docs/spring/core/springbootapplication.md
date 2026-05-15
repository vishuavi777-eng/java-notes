# `@SpringBootApplication`

## Definition

`@SpringBootApplication` is the main annotation used to start a Spring Boot application. It combines configuration, auto-configuration, and component scanning.

## Why It Matters

This annotation is usually the first thing an interviewer asks about Spring Boot startup. You should know what it does internally.

## Core Example

```java
@SpringBootApplication
public class EmployeeTaskApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeTaskApplication.class, args);
    }
}
```

## Common Traps

- Saying it only starts the application.
- Not knowing the three main annotations inside it.
- Keeping the main class outside the root package.
- Assuming it scans every package in the project.

## Interview Answer

`@SpringBootApplication` is a convenience annotation. It includes `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`. It tells Spring Boot to start from this class, scan components in the current package and child packages, and configure beans automatically based on dependencies and properties.

## Quick Revision

- `@Configuration`: class can define beans.
- `@EnableAutoConfiguration`: Spring Boot configures common infrastructure.
- `@ComponentScan`: scans annotated classes.
- Main class should be in the root package.

## Deep Dive

### Internal Annotations

```java
@Configuration
@EnableAutoConfiguration
@ComponentScan
```

### Component Scanning Rule

If the main class is in:

```text
com.example.taskallocation
```

Spring scans:

```text
com.example.taskallocation.controller
com.example.taskallocation.service
com.example.taskallocation.repository
```

It may not scan sibling packages outside this root unless configured.

### Interview Example

In my Employee Task / Call Allocation System, the main class starts the app. Spring Boot scans controllers like `EmployeeController`, services like `TaskService`, and repositories like `EmployeeRepository`.

### Common Interview Questions

- What does `@SpringBootApplication` contain?
- Why should the main class be placed in the root package?
- What is auto-configuration?
- What is component scanning?

