# Database Scaling

## Definition

Database scaling means improving database capacity, performance, and reliability as data and traffic grow.

## Why It Matters

In many backend systems, the database becomes the main bottleneck before the application servers.

## Core Example

```text
App Servers -> Primary Database
            -> Read Replica
```

## Common Traps

- Scaling application servers but ignoring database.
- Not adding indexes.
- Returning huge result sets.
- Not archiving old data.
- Using read replicas for writes.

## Interview Answer

Database scaling can be improved using indexes, query optimization, pagination, connection pooling, read replicas, partitioning, archiving old data, and sometimes sharding. The right approach depends on the bottleneck and data access pattern.

## Quick Revision

- Add proper indexes.
- Optimize slow queries.
- Use pagination.
- Read replicas handle read traffic.
- Archive old data.
- Sharding is complex and should not be first step.

## Deep Dive

### Practical Order

1. Check slow queries.
2. Add missing indexes.
3. Use pagination.
4. Optimize queries.
5. Add read replica if reads are high.
6. Archive old data.
7. Consider partitioning or sharding only if needed.

### Employee Task Example

For task lists:

```sql
CREATE INDEX idx_tasks_employee_status ON tasks(employee_id, status);
```

For old completed tasks, keep active tasks in main access path and archive old history if data grows heavily.

### Common Interview Questions

- How do you scale database?
- What is read replica?
- What is sharding?
- Why is sharding complex?

