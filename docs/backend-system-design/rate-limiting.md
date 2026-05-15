# Rate Limiting

## Definition

Rate limiting controls how many requests a user, IP, or client can make in a specific time period.

## Why It Matters

It protects APIs from abuse, accidental high traffic, and brute-force attacks.

## Core Example

```text
Allow 100 requests per user per minute.
```

## Common Traps

- No rate limit on login APIs.
- Same limit for all API types.
- Blocking real users too aggressively.
- Not returning proper error response.
- Not logging repeated violations.

## Interview Answer

Rate limiting protects backend APIs by restricting request count in a time window. It can be applied by user ID, IP address, API key, or token. When the limit is exceeded, the API can return `429 Too Many Requests`.

## Quick Revision

- Prevents abuse.
- Protects login and public APIs.
- Can be per user, IP, or API key.
- Return `429 Too Many Requests`.
- Limits should match API importance.

## Deep Dive

### Common Algorithms

- Fixed window.
- Sliding window.
- Token bucket.
- Leaky bucket.

### Employee Task Example

Rate limiting can protect:

- Login API.
- Search API.
- Report generation API.
- Bulk upload API.

### Response Example

```json
{
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please try again later."
}
```

### Common Interview Questions

- What is rate limiting?
- Why do we need rate limiting?
- What status code is used for rate limit?
- Where would you apply rate limit?

