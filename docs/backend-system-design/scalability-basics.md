# Scalability Basics

## Definition

Scalability means the system can handle more users, requests, or data without failing.

## Why It Matters

Backend systems should continue working when traffic or data grows.

## Core Example

```text
More users -> more API requests -> need more application capacity
```

## Common Traps

- Thinking scalability only means adding servers.
- Ignoring database bottlenecks.
- Not measuring performance.
- Adding complex tools too early.
- Not knowing vertical vs horizontal scaling.

## Interview Answer

Scalability means designing a system so it can handle growth. Vertical scaling means increasing resources on one server. Horizontal scaling means adding more servers. We can also improve scalability using caching, database indexes, pagination, queues, and load balancing.

## Quick Revision

- Vertical scaling: bigger server.
- Horizontal scaling: more servers.
- Database can become bottleneck.
- Cache reduces repeated reads.
- Queue helps process work asynchronously.
- Measure before optimizing.

## Deep Dive

### Vertical Scaling

```text
Increase CPU, RAM, disk on same server.
```

Simple but has limits.

### Horizontal Scaling

```text
Run multiple app instances behind load balancer.
```

Better for high traffic but needs stateless backend design.

### Employee Task Example

If many employees use task APIs, we can run multiple Spring Boot instances behind a load balancer. Database indexes help task list queries. Queues can process notification sending separately.

### Common Interview Questions

- What is scalability?
- Vertical vs horizontal scaling?
- How do you scale REST APIs?
- What can become bottleneck?

