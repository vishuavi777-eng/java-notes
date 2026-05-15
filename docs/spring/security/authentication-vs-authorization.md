# Authentication vs Authorization

## Definition

Authentication checks who the user is. Authorization checks what the user is allowed to access.

## Why It Matters

This is the most basic Spring Security interview question. Many candidates mix these two concepts.

## Core Example

```text
Authentication: user logs in with username and password.
Authorization: admin can assign tasks, employee can view only assigned tasks.
```

## Common Traps

- Saying authentication and authorization are the same.
- Checking only login but not access rules.
- Trusting role values sent from frontend.
- Giving all authenticated users the same access.

## Interview Answer

Authentication means verifying the user's identity, usually using username/password, token, or another login mechanism. Authorization means checking whether the authenticated user has permission to access a resource or perform an action.

## Quick Revision

- Authentication: who are you?
- Authorization: what can you access?
- Authentication happens first.
- Authorization happens after identity is known.
- Roles and permissions are used for authorization.

## Deep Dive

### Employee Task Example

```text
Login successful -> authentication completed.
Admin assigns task -> authorization checks ADMIN role.
Employee views own tasks -> authorization checks EMPLOYEE role and ownership.
```

### Role vs Permission

Role:

```text
ADMIN
EMPLOYEE
MANAGER
```

Permission:

```text
TASK_CREATE
TASK_ASSIGN
TASK_READ
EMPLOYEE_CREATE
```

Permissions are more fine-grained than roles.

### Common Interview Questions

- Difference between authentication and authorization?
- Which happens first?
- What is role-based access control?
- What is permission-based access control?

