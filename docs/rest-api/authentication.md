# Authentication in REST APIs

## Definition

Authentication verifies the identity of the client or user calling the API.

## Why It Matters

Most REST APIs protect user data and business operations. Authentication ensures only valid users can access protected APIs.

## Core Example

```text
Authorization: Bearer <jwt-token>
```

## Common Traps

- Sending tokens in URL query parameters.
- Not using HTTPS.
- Trusting client-provided roles.
- Not checking token expiry.
- Returning sensitive login failure details.

## Interview Answer

REST APIs commonly use token-based authentication such as JWT. After login, the server returns a token. The client sends that token in the Authorization header for protected requests. The backend validates the token, identifies the user, and then checks authorization rules.

## Quick Revision

- Authentication means verify identity.
- JWT is common for REST APIs.
- Send token in Authorization header.
- Use HTTPS.
- Validate token signature and expiry.
- Authorization is checked after authentication.

## Deep Dive

### Basic Flow

```text
1. User logs in.
2. Server validates credentials.
3. Server returns token.
4. Client sends token with requests.
5. Server validates token.
6. API allows or rejects request.
```

### Employee Task Example

```text
ADMIN can create employees and assign tasks.
EMPLOYEE can view assigned tasks.
```

The backend must enforce this. Frontend-only restrictions are not enough.

### Common Interview Questions

- How do you secure REST APIs?
- Where should token be sent?
- What is JWT?
- Authentication vs authorization?

