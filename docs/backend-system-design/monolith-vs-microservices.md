# Monolith vs Microservices

## Definition

A monolith is one application containing many features. Microservices split features into smaller independent services.

## Why It Matters

Interviewers ask this to check if you understand trade-offs. Microservices are not always better.

## Core Example

```text
Monolith: one Spring Boot app for employees, tasks, calls, reports.
Microservices: employee-service, task-service, notification-service.
```

## Common Traps

- Saying microservices are always better.
- Splitting too early.
- Ignoring deployment and monitoring complexity.
- Ignoring data consistency problems.
- Creating microservices without clear boundaries.

## Interview Answer

A monolith is simpler to build, deploy, test, and debug because everything is in one application. Microservices can scale and deploy independently, but they add complexity like service communication, distributed transactions, monitoring, and deployment overhead. For many small or medium systems, a modular monolith is a good starting point.

## Quick Revision

- Monolith is simpler.
- Microservices scale independently.
- Microservices add operational complexity.
- Start simple unless scale or team size needs splitting.
- Clear module boundaries are important.

## Deep Dive

### When Monolith Is Good

- Small team.
- Early-stage product.
- Simple deployment.
- Shared database is acceptable.
- Fast development needed.

### When Microservices Help

- Large team ownership.
- Different modules need independent scaling.
- Independent deployments are required.
- Strong domain boundaries exist.

### Employee Task Example

Start as a modular monolith:

```text
employee module
task module
call allocation module
notification module
report module
```

Later split notification or reporting if traffic grows.

### Common Interview Questions

- Monolith vs microservices?
- When would you choose monolith?
- What are microservice challenges?
- What is modular monolith?

