# Spring Boot Actuator

## Definition

Spring Boot Actuator provides production-ready endpoints to monitor and manage an application.

## Why It Matters

Production systems need health checks, metrics, and visibility. Actuator helps teams know whether the app is running correctly.

## Core Example

```text
/actuator/health
```

## Common Traps

- Exposing sensitive actuator endpoints publicly.
- Not enabling health checks.
- Ignoring metrics.
- Exposing environment details without security.
- Thinking Actuator replaces logging or monitoring.

## Interview Answer

Spring Boot Actuator provides endpoints like health, metrics, info, loggers, and environment details. In production, health endpoints are useful for deployment and monitoring tools. Sensitive endpoints should be secured and not exposed publicly.

## Quick Revision

- Actuator gives production endpoints.
- `/actuator/health` shows health status.
- `/actuator/metrics` gives metrics.
- Secure sensitive endpoints.
- Useful for monitoring and deployment checks.

## Deep Dive

### Common Endpoints

| Endpoint | Use |
| --- | --- |
| `/actuator/health` | Application health |
| `/actuator/info` | Application information |
| `/actuator/metrics` | Runtime metrics |
| `/actuator/loggers` | Logger levels |
| `/actuator/env` | Environment details |

### Example Configuration

```properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when_authorized
```

### Employee Task Project Connection

Health checks can tell whether the Employee Task API is running and whether important dependencies like database are available.

### Common Interview Questions

- What is Actuator?
- What is `/actuator/health`?
- Which Actuator endpoints should be exposed?
- Why should some Actuator endpoints be secured?

