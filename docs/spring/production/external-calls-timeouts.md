# External Calls and Timeouts

## Definition

External calls are requests from your application to another service, API, or system. Timeouts define how long your app waits before failing the call.

## Why It Matters

If an external service is slow or down, your application should not hang forever. Proper timeouts protect system stability.

## Core Example

```text
Employee Task API -> Notification API -> SMS/Email provider
```

## Common Traps

- No timeout configuration.
- Retrying too many times.
- Retrying non-idempotent operations incorrectly.
- No fallback behavior.
- Not logging external API failures.

## Interview Answer

For external calls, we should configure connection timeout and read timeout. We should also think about retries, fallback, circuit breaker, and idempotency. Without timeouts, one slow dependency can make our API slow or unavailable.

## Quick Revision

- Always configure timeouts.
- Retry carefully.
- Use fallback where possible.
- Think about circuit breaker.
- Do not retry unsafe operations blindly.

## Deep Dive

### Important Concepts

- Connection timeout: time to establish connection.
- Read timeout: time waiting for response.
- Retry: call again after failure.
- Circuit breaker: stop calling failing dependency temporarily.
- Fallback: alternate response or behavior.

### Employee Task Project Example

If task assignment sends an SMS notification and SMS provider is slow, task assignment should not hang forever. The system can save the task and queue notification retry separately.

### Common Interview Questions

- Why are timeouts important?
- What is retry?
- What is circuit breaker?
- What is fallback?
- Why should we be careful with retries?

