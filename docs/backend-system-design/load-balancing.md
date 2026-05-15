# Load Balancing

## Definition

Load balancing distributes incoming traffic across multiple application servers.

## Why It Matters

It improves availability and helps the system handle more requests.

## Core Example

```text
Client -> Load Balancer -> App Server 1
                       -> App Server 2
                       -> App Server 3
```

## Common Traps

- Keeping user session only in one server memory.
- Not adding health checks.
- Thinking load balancer fixes database bottlenecks.
- Not making app servers stateless.

## Interview Answer

A load balancer sits in front of multiple application instances and sends requests to healthy servers. It helps distribute traffic and improves availability. For load balancing to work well, backend services should be stateless or store session data in shared storage.

## Quick Revision

- Distributes traffic.
- Improves availability.
- Uses health checks.
- Works best with stateless services.
- Does not solve every bottleneck.

## Deep Dive

### Health Checks

The load balancer should send traffic only to healthy application instances.

```text
/actuator/health
```

### Stateless Backend

Avoid storing important user state in server memory. Use database, cache, or token-based authentication.

### Employee Task Example

Multiple Spring Boot instances can serve employee and task APIs. If one instance fails, the load balancer sends requests to other healthy instances.

### Common Interview Questions

- What is load balancer?
- Why should services be stateless?
- How does load balancer detect unhealthy server?
- Does load balancing solve database slowness?

