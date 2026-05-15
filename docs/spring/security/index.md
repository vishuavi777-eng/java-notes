# Spring Security Fundamentals

## Definition

Spring Security provides authentication, authorization, and protection mechanisms for Spring applications.

## Why It Matters

Most backend applications need secure APIs. Interviewers expect clear understanding of login, roles, JWT, password hashing, filters, and access control.

## Core Example

```java
@PreAuthorize("hasRole('ADMIN')")
public void deleteEmployee(Long id) {
    employeeRepository.deleteById(id);
}
```

## Common Traps

- Confusing authentication and authorization.
- Storing plain text passwords.
- Trusting roles sent by the client.
- Not validating JWT properly.
- Disabling CSRF without understanding why.

## Interview Answer

Spring Security secures a Spring Boot application using a filter chain. Authentication checks who the user is. Authorization checks what the user can access. After successful authentication, Spring stores user details in the SecurityContext and applies access rules for protected APIs.

## Quick Revision

- Authentication: identity.
- Authorization: permission.
- Passwords must be hashed.
- JWT is used for stateless authentication.
- SecurityContext stores current authentication.
- Filter chain processes security before controller.

## Deep Dive

### Study Order

1. Authentication vs authorization
2. Spring Security filter chain
3. Password hashing
4. JWT flow
5. Role-based access
6. Common security traps

### Employee Task Project Connection

In the Employee Task / Call Allocation System, admin APIs can be protected so only admins can create employees, assign tasks, and view reports. Normal employees can only view or update their assigned work.

### Common Interview Questions

- What is Spring Security?
- Authentication vs authorization?
- What is SecurityContext?
- How does JWT authentication work?
- How do you restrict APIs by role?

