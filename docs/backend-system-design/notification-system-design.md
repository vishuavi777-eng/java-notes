# Notification System Design

## Definition

A notification system sends messages to users through email, SMS, push notification, or in-app notification.

## Why It Matters

Many business systems need notifications for task assignment, reminders, alerts, and status changes.

## Core Example

```text
Task Assigned -> Notification Event -> Queue -> Notification Worker -> SMS/Email
```

## Common Traps

- Sending notifications inside main transaction.
- No retry on provider failure.
- No notification history.
- Sending duplicate notifications.
- Not respecting user preferences.

## Interview Answer

A good notification system should be asynchronous. When an event happens, such as task assignment, the backend saves the main business data and publishes a notification job. A worker processes the job and sends email, SMS, or push notification. The system should track status, retry failures, and avoid duplicate notifications.

## Quick Revision

- Notifications should often be async.
- Use queue for reliability.
- Track notification status.
- Retry failed sends.
- Avoid duplicates.
- Respect user preferences.

## Deep Dive

### Basic Flow

```text
1. Task assigned.
2. Notification job created.
3. Worker picks job.
4. Message sent through provider.
5. Status saved as SENT or FAILED.
```

### Notification Table

```text
notifications
- id
- user_id
- type
- channel
- message
- status
- retry_count
- created_at
- sent_at
```

### Employee Task Example

When admin assigns a call to an employee, the system can send:

- in-app notification
- email
- SMS
- push notification

### Common Interview Questions

- How do you design notification system?
- Why use queue?
- How do you handle failed notifications?
- How do you avoid duplicate notifications?

