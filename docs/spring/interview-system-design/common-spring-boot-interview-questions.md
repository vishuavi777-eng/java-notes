# Common Spring Boot Interview Questions

## Definition

This page lists common Spring Boot interview questions with short answer directions.

## Why It Matters

Quick revision helps you prepare answers without memorizing long paragraphs.

## Core Example

```text
Question: What does @SpringBootApplication do?
Answer: It combines configuration, auto-configuration, and component scanning.
```

## Common Traps

- Giving one-word answers.
- Explaining annotation names only.
- Not using project examples.
- Not mentioning trade-offs.
- Not knowing where each layer fits.

## Interview Answer

For Spring Boot interviews, answer with a simple definition, why it is used, and one practical project example. This shows both concept knowledge and real project understanding.

## Quick Revision

- Define the concept.
- Explain why it matters.
- Give one example.
- Mention a common trap.
- Connect answer to project experience.

## Deep Dive

### Questions and Answer Direction

| Question | Short Answer Direction |
| --- | --- |
| What does `@SpringBootApplication` do? | It enables configuration, auto-configuration, and component scanning. |
| What is dependency injection? | Spring provides required objects instead of creating them manually. |
| Why constructor injection? | Dependencies are clear, required, immutable, and easy to test. |
| What is a bean? | Object managed by Spring container. |
| Controller vs Service vs Repository? | HTTP vs business logic vs database access. |
| DTO vs Entity? | API model vs database model. |
| What is `@Transactional`? | Defines database transaction boundary. |
| Lazy vs eager loading? | Load relation when needed vs immediately. |
| What is N+1 problem? | One query plus extra query per related record. |
| How do you validate request body? | DTO annotations plus `@Valid`. |
| How do you handle exceptions? | `@RestControllerAdvice` and `@ExceptionHandler`. |
| Authentication vs authorization? | Who you are vs what you can access. |
| What is JWT? | Stateless signed token used for authentication. |
| What is `@WebMvcTest`? | Controller layer test. |
| What is Actuator? | Production endpoints for health and metrics. |

### Interview Practice Format

Use this structure:

```text
Definition -> Why it is used -> Project example -> Common trap
```

### Common Interview Questions

- Explain your Spring Boot project.
- Explain request flow in Spring Boot.
- How do you handle validation and exception handling?
- How do you secure REST APIs?
- How do you test Spring Boot APIs?

