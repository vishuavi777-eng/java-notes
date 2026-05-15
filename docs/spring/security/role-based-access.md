# Role-Based Access

## Definition

Role-based access means allowing or denying API access based on user roles or permissions.

## Why It Matters

Most applications have different user types. Admin, manager, and employee should not have the same access.

## Core Example

```java
@PreAuthorize("hasRole('ADMIN')")
public TaskResponse assignTask(AssignTaskRequest request) {
    return taskService.assignTask(request);
}
```

## Common Traps

- Giving every logged-in user full access.
- Trusting role from frontend request.
- Confusing role prefix `ROLE_`.
- Not checking ownership for user-specific data.
- Only hiding UI buttons but not securing backend APIs.

## Interview Answer

Role-based access control restricts APIs based on roles like ADMIN, MANAGER, or EMPLOYEE. In Spring Security, access can be configured using HTTP security rules or method-level annotations like `@PreAuthorize`. Backend APIs must enforce access rules even if frontend hides options.

## Quick Revision

- Role controls broad access.
- Permission controls fine-grained access.
- Use `@PreAuthorize` for method-level security.
- Secure backend, not only frontend.
- Also check ownership when needed.

## Deep Dive

### Employee Task Project Example

```text
ADMIN: create employees, assign tasks, view reports.
MANAGER: assign tasks to team members.
EMPLOYEE: view and update own tasks.
```

### Method Security

```java
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
public TaskResponse assignTask(AssignTaskRequest request) {
    return taskService.assignTask(request);
}
```

### Ownership Check

Sometimes role is not enough.

Example:

```text
Employee can view task only if task is assigned to that employee.
```

### Common Interview Questions

- What is role-based access control?
- Role vs permission?
- What is `@PreAuthorize`?
- Why is frontend-only access control not enough?

