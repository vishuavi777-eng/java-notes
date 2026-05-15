# Logging

## Definition

Logging records important application events, errors, and debugging information.

## Why It Matters

In production, logs help debug issues when users face problems. Good logs reduce investigation time.

## Core Example

```java
private static final Logger log = LoggerFactory.getLogger(TaskService.class);

log.info("Task assigned. taskId={}, employeeId={}", taskId, employeeId);
```

## Common Traps

- Logging passwords, tokens, or private user data.
- Logging too much data.
- Logging too little context.
- Using `System.out.println` in production.
- Ignoring error logs.

## Interview Answer

Logging helps track what happened in the application. Good logs should include useful context like request ID, user ID, task ID, and error details when safe. Sensitive data like passwords, tokens, and personal information should never be logged.

## Quick Revision

- Use logger, not `System.out.println`.
- Log important business events.
- Include useful IDs.
- Do not log secrets.
- Use proper log levels.

## Deep Dive

### Log Levels

| Level | Use |
| --- | --- |
| `DEBUG` | Detailed debugging |
| `INFO` | Normal important events |
| `WARN` | Something unusual but recoverable |
| `ERROR` | Failure that needs attention |

### Good Log Example

```java
log.info("Task status updated. taskId={}, oldStatus={}, newStatus={}",
    taskId, oldStatus, newStatus);
```

### Bad Log Example

```java
log.info("Login request password={}", password);
```

### Common Interview Questions

- Why is logging important?
- What should not be logged?
- Difference between INFO, WARN, and ERROR?
- What information helps debug production issues?

