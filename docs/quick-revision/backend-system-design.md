# Backend System Design Quick Revision

## Answer Flow

```text
Requirements -> APIs -> Database -> Main flow -> Scaling -> Failure handling -> Monitoring
```

## Core Concepts

- Client-server architecture.
- Monolith vs microservices.
- Scalability.
- Load balancing.
- Caching.
- Database scaling.
- Async processing and queues.
- Rate limiting.
- Logging and monitoring.

## Practical Rules

- Start simple.
- Do not jump to microservices.
- Add cache only when needed.
- Use queues for slow background work.
- Add indexes before complex database scaling.
- Use logs, metrics, and health checks.

## Employee Task System

- Users: admin, manager, employee.
- Modules: employee, task, call allocation, notification, report.
- Database: employees, tasks, calls, task history, notifications.
- Queue: notification sending.
- Cache: dashboard summary if needed.
- Scale: load balancer + multiple Spring Boot instances.

