# Caching

## Definition

Caching stores frequently used data in a faster storage layer so repeated requests are served quickly.

## Why It Matters

Cache can reduce database load and improve response time for frequently accessed data.

## Core Example

```text
API -> Cache -> Database
```

If data is found in cache, the API does not need to query the database.

## Common Traps

- Caching everything.
- Not handling stale data.
- No cache expiry.
- Not invalidating cache after update.
- Using cache before understanding bottleneck.

## Interview Answer

Caching improves performance by storing frequently accessed data temporarily. For example, we can cache employee profile, configuration, or static lookup data. But cache must be used carefully because stale data and invalidation can cause bugs.

## Quick Revision

- Cache improves read performance.
- Useful for frequently read data.
- Cache should have TTL.
- Invalidate cache after updates.
- Do not cache sensitive data casually.

## Deep Dive

### Cache-Aside Pattern

```text
1. Check cache.
2. If found, return data.
3. If not found, query database.
4. Store result in cache.
5. Return data.
```

### Good Cache Candidates

- Employee role list.
- Static status list.
- Dashboard summary with short TTL.
- Frequently accessed profile data.

### Employee Task Example

Dashboard counts can be cached for a short time:

```text
open tasks count
pending calls count
employee workload summary
```

### Common Interview Questions

- What is caching?
- What is cache invalidation?
- What is TTL?
- What data should not be cached?

