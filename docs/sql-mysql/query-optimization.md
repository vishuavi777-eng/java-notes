# Query Optimization

## Definition

Query optimization means improving SQL queries so they run faster and use fewer resources.

## Why It Matters

Slow queries can make APIs slow, increase database load, and hurt user experience.

## Core Example

Bad:

```sql
SELECT *
FROM tasks;
```

Better:

```sql
SELECT id, title, status
FROM tasks
WHERE status = 'OPEN'
LIMIT 20;
```

## Common Traps

- Selecting unnecessary columns.
- Missing indexes.
- Loading too many rows.
- Using functions on indexed columns.
- Ignoring query execution plan.
- Optimizing without measuring.

## Interview Answer

Query optimization means writing efficient SQL and using proper indexes. We should select only required columns, filter early, use indexes for common search and join columns, avoid loading unnecessary data, use pagination, and check execution plans for slow queries.

## Quick Revision

- Select required columns only.
- Add proper indexes.
- Use pagination.
- Avoid unnecessary joins.
- Check query plan.
- Measure before and after optimization.

## Deep Dive

### Practical Checklist

- Avoid `SELECT *`.
- Add indexes for frequent `WHERE` and `JOIN` columns.
- Use `LIMIT` for list APIs.
- Avoid leading wildcard search when possible.
- Avoid functions on indexed columns in `WHERE`.
- Review `EXPLAIN` output.

### Employee Task Example

Slow query:

```sql
SELECT *
FROM tasks
WHERE status = 'OPEN'
ORDER BY created_at DESC;
```

Possible index:

```sql
CREATE INDEX idx_tasks_status_created_at
ON tasks(status, created_at);
```

### Common Interview Questions

- How do you optimize slow SQL query?
- Why avoid `SELECT *`?
- What is `EXPLAIN`?
- How do indexes improve query performance?

