# Async Processing and Queues

## Definition

Async processing means doing work in the background instead of making the user wait. Queues store work until workers process it.

## Why It Matters

Long-running work can slow APIs. Queues improve user experience and system reliability.

## Core Example

```text
API -> Queue -> Worker -> Email/SMS Provider
```

## Common Traps

- Doing slow external calls inside API request.
- Not handling retry failures.
- Not making background jobs idempotent.
- Not tracking job status.
- Using queue when direct processing is enough.

## Interview Answer

Queues are useful when work does not need to finish immediately in the request. For example, sending emails, SMS, reports, or notifications can be pushed to a queue and processed by workers. This keeps the API fast and allows retry if external service fails.

## Quick Revision

- Queue stores background work.
- Worker processes jobs.
- Keeps API response fast.
- Useful for notifications and reports.
- Need retry and failure handling.
- Jobs should be idempotent where possible.

## Deep Dive

### Employee Task Example

When a task is assigned:

```text
1. API saves task assignment.
2. API publishes notification job.
3. Worker sends SMS/email/push notification.
4. If provider fails, job can retry.
```

### Good Async Use Cases

- Email sending.
- SMS sending.
- Report generation.
- File processing.
- Bulk import.

### Common Interview Questions

- Why use queue?
- What is async processing?
- What should be processed in background?
- How do you handle failed jobs?

