# Pagination Queries

## Definition

Pagination queries return data in smaller pages instead of returning all rows at once.

## Why It Matters

Large APIs should not load thousands of records in one request. Pagination improves performance and user experience.

## Core Example

```sql
SELECT id, title, status
FROM tasks
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;
```

## Common Traps

- Returning all rows.
- Not using deterministic ordering.
- Very large OFFSET causing slow queries.
- Not limiting maximum page size.
- Not indexing sort/filter columns.

## Interview Answer

Pagination is used to return records in pages. In MySQL, we commonly use `LIMIT` and `OFFSET`. For large datasets, offset pagination can become slow, so cursor-based pagination may be better. APIs should also return pagination metadata like page number, size, and total count when needed.

## Quick Revision

- Use `LIMIT` to control page size.
- Use `OFFSET` to skip rows.
- Always use `ORDER BY`.
- Large offsets can be slow.
- Cursor pagination is better for large data.

## Deep Dive

### Offset Pagination

```sql
SELECT id, title, status
FROM tasks
WHERE status = 'OPEN'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

Next page:

```sql
LIMIT 20 OFFSET 20;
```

### Cursor Pagination

```sql
SELECT id, title, status
FROM tasks
WHERE id < 1000
ORDER BY id DESC
LIMIT 20;
```

### Employee Task Example

```sql
SELECT id, title, status, due_date
FROM tasks
WHERE employee_id = 5
ORDER BY due_date ASC
LIMIT 10 OFFSET 0;
```

### Common Interview Questions

- How do you paginate in MySQL?
- Why should pagination use `ORDER BY`?
- What is offset pagination?
- What is cursor pagination?

