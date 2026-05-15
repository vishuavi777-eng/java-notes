# Common Security Traps

## Definition

Security traps are common mistakes that make APIs unsafe even when Spring Security is added.

## Why It Matters

Security is not only about adding dependencies. You must protect authentication, authorization, tokens, passwords, and sensitive data.

## Core Example

Bad pattern:

```text
Frontend hides admin button, but backend API has no role check.
```

Better pattern:

```java
@PreAuthorize("hasRole('ADMIN')")
```

## Common Traps

- Storing plain text passwords.
- Disabling all security for development and forgetting it.
- Trusting frontend role values.
- Not validating JWT signature and expiry.
- Returning too much error detail.
- Exposing passwords or tokens in logs.
- Not using HTTPS in production.

## Interview Answer

Common security mistakes include storing plain text passwords, trusting client data, not validating JWT properly, and securing only the frontend. Backend APIs should enforce authentication and authorization, hash passwords, validate tokens, avoid leaking sensitive details, and use HTTPS in production.

## Quick Revision

- Hash passwords.
- Validate JWT signature and expiry.
- Never trust client-provided roles.
- Secure APIs on backend.
- Do not log secrets.
- Use HTTPS.

## Deep Dive

### Bad Error Message

```text
Password is wrong for user admin@example.com
```

Better:

```text
Invalid username or password
```

This avoids leaking which part is correct.

### Backend Security Rule

Frontend security improves user experience, but backend security protects data.

Always assume someone can call APIs directly using Postman or curl.

### Common Interview Questions

- Why should backend validate roles?
- Why should passwords not be logged?
- What can go wrong with JWT?
- Why should error messages not leak details?

