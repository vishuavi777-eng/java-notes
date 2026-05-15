# JWT Flow

## Definition

JWT is a token format used for stateless authentication. After login, the server sends a token, and the client sends that token with future requests.

## Why It Matters

JWT is commonly used in REST APIs because the server does not need to store session data for every request.

## Core Example

```text
Authorization: Bearer <token>
```

## Common Traps

- Storing passwords or sensitive data inside JWT.
- Not validating token signature.
- Not checking token expiry.
- Trusting token roles without verifying the token.
- Using very long token expiry without refresh strategy.

## Interview Answer

In JWT authentication, the user logs in with valid credentials. The server creates a signed token and returns it to the client. The client sends the token in the Authorization header for protected APIs. The server validates the token, extracts user details, sets authentication in SecurityContext, and allows or rejects the request.

## Quick Revision

- JWT is stateless.
- Token is usually sent in `Authorization` header.
- Server validates signature and expiry.
- Do not store sensitive data in token.
- Use HTTPS.

## Deep Dive

### Basic JWT Flow

```text
1. User logs in.
2. Server verifies username and password.
3. Server creates signed JWT.
4. Client stores token safely.
5. Client sends token with protected requests.
6. Server validates token.
7. Server sets SecurityContext.
8. Controller is called if access is allowed.
```

### Header Example

```text
Authorization: Bearer eyJhbGciOi...
```

### Token Usually Contains

- subject / user id
- username
- roles or permissions
- issued time
- expiry time

### Common Interview Questions

- What is JWT?
- Why is JWT called stateless?
- Where do we send JWT in request?
- What should be validated in JWT?
- What should not be stored in JWT?

