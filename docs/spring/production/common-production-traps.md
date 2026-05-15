# Common Production Traps

## Definition

Production traps are mistakes that make applications hard to operate, debug, secure, or scale after deployment.

## Why It Matters

A feature can work locally but still fail in production because of missing logs, bad configuration, slow dependencies, or weak monitoring.

## Core Example

Bad pattern:

```text
API works locally, but production database credentials are hardcoded in code.
```

Better pattern:

```properties
spring.datasource.password=${DB_PASSWORD}
```

## Common Traps

- No health checks.
- No useful logs.
- Secrets committed to git.
- No timeout for external APIs.
- Different behavior between local and production.
- Exposing internal error details.
- No monitoring for error rate or latency.

## Interview Answer

Common production mistakes include missing health checks, poor logging, hardcoded secrets, no timeout configuration, and no monitoring. A production-ready app should be configurable, observable, secure, and able to handle failures safely.

## Quick Revision

- Add health checks.
- Add useful logs.
- Keep secrets outside code.
- Configure timeouts.
- Monitor errors and latency.
- Do not expose internal details.

## Deep Dive

### Production Checklist

- Profiles configured.
- Secrets externalized.
- Actuator health enabled.
- Logs include useful IDs.
- Sensitive data not logged.
- External calls have timeouts.
- Validation and error handling are consistent.
- Metrics and alerts exist.

### Interview Tip

When asked about production readiness, do not only say "deploy the app". Talk about observability, configuration, security, failure handling, and monitoring.

### Common Interview Questions

- What is production readiness?
- How do you debug production issues?
- What should a health check show?
- What should be monitored in production?

