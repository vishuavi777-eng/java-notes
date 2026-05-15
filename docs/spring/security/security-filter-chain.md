# Spring Security Filter Chain

## Definition

The Spring Security filter chain is a series of filters that process HTTP requests before they reach the controller.

## Why It Matters

Spring Security works before controller methods. Understanding the filter chain helps explain JWT validation, login handling, and access control.

## Core Example

```text
Request -> Security Filters -> Controller -> Service -> Repository
```

## Common Traps

- Thinking security starts inside controller.
- Not knowing where JWT validation happens.
- Not understanding why unauthorized requests never reach controller.
- Disabling filters without understanding impact.

## Interview Answer

Spring Security uses a filter chain to intercept incoming HTTP requests. Filters can check credentials, validate tokens, create Authentication objects, store them in SecurityContext, and enforce authorization rules before the request reaches the controller.

## Quick Revision

- Filters run before controllers.
- JWT validation usually happens in a custom filter.
- SecurityContext stores authenticated user details.
- Unauthorized requests may be blocked before controller.
- Filter order matters.

## Deep Dive

### Basic Flow

```text
1. Client sends request.
2. Security filter chain receives request.
3. Authentication filter checks token or credentials.
4. SecurityContext is populated if valid.
5. Authorization rules are checked.
6. Request reaches controller if allowed.
```

### SecurityContext

SecurityContext stores current authenticated user information for the current request.

```java
Authentication authentication = SecurityContextHolder
    .getContext()
    .getAuthentication();
```

### Employee Task Project Connection

For an admin-only task assignment API, Spring Security can block non-admin users before the request reaches `TaskController`.

### Common Interview Questions

- What is Spring Security filter chain?
- Where is JWT validated?
- What is SecurityContext?
- Why can a request be blocked before controller?

