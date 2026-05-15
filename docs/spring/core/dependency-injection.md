# Dependency Injection

## Definition

Dependency injection means Spring provides required objects to a class instead of the class creating them manually.

## Why It Matters

Dependency injection keeps code loosely coupled, easier to test, and easier to maintain.

## Core Example

```java
@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
}
```

## Common Traps

- Using field injection without understanding drawbacks.
- Creating repository or service objects manually.
- Not knowing why constructor injection is preferred.
- Injecting too many dependencies into one class.

## Interview Answer

Dependency injection is a design pattern where dependencies are provided from outside. In Spring Boot, the container injects beans into other beans. Constructor injection is preferred because dependencies are visible, required dependencies are enforced, fields can be final, and testing becomes easier.

## Quick Revision

- DI reduces tight coupling.
- Spring injects beans automatically.
- Constructor injection is preferred.
- Avoid field injection in production code.
- Too many dependencies can mean the class has too many responsibilities.

## Deep Dive

### Constructor Injection

```java
@Service
public class CallAllocationService {
    private final EmployeeRepository employeeRepository;
    private final CallRepository callRepository;

    public CallAllocationService(EmployeeRepository employeeRepository,
                                 CallRepository callRepository) {
        this.employeeRepository = employeeRepository;
        this.callRepository = callRepository;
    }
}
```

### Why Constructor Injection Is Better

- Dependencies are clear.
- Object can be immutable.
- Easy to write unit tests.
- Required dependencies cannot be missed.

### Field Injection Problem

```java
@Autowired
private EmployeeRepository employeeRepository;
```

This hides dependencies and makes testing harder.

### Common Interview Questions

- What is dependency injection?
- Constructor injection vs field injection?
- Why does DI improve testing?
- What happens if two beans of the same type exist?

