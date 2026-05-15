# Indexes

## Definition

An index is a database structure that helps find rows faster.

## Why It Matters

Indexes improve read performance for search, filter, join, and sort operations. But too many indexes can slow writes.

## Core Example

```sql
CREATE INDEX idx_tasks_employee_id ON tasks(employee_id);
```

## Common Traps

- Thinking indexes always improve everything.
- Adding indexes on every column.
- Not indexing foreign keys.
- Ignoring composite index order.
- Not checking query plan.

## Interview Answer

An index helps the database find data faster, similar to an index in a book. It is useful for columns used in `WHERE`, `JOIN`, `ORDER BY`, and sometimes `GROUP BY`. But indexes take storage and slow down insert, update, and delete operations because the index also needs to be maintained.

## Quick Revision

- Index improves read performance.
- Useful for search and joins.
- Has storage cost.
- Can slow write operations.
- Composite index column order matters.
- Use indexes based on query patterns.

## Deep Dive

### Useful Index Examples

```sql
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_employee_status ON tasks(employee_id, status);
CREATE INDEX idx_employees_email ON employees(email);
```

### When Index Helps

```sql
SELECT *
FROM tasks
WHERE employee_id = 5 AND status = 'OPEN';
```

Composite index on `(employee_id, status)` can help this query.

### When Index May Not Help

- Very small tables.
- Columns with very low selectivity.
- Queries applying functions on indexed column.
- Wrong column order in composite index.

### Common Interview Questions

- What is an index?
- When should we create index?
- Can indexes slow down performance?
- What is composite index?

