# SQL Basics

## Definition

SQL basics include commands to create, read, update, and delete data from relational database tables.

## Why It Matters

Every backend developer should be comfortable writing basic SQL queries without depending only on ORM tools.

## Core Example

```sql
SELECT *
FROM tasks
WHERE status = 'OPEN';
```

## Common Traps

- Using `SELECT *` everywhere.
- Forgetting `WHERE` in update or delete queries.
- Not understanding NULL.
- Confusing `WHERE` and `HAVING`.
- Not limiting large result sets.

## Interview Answer

SQL is used to work with relational databases. Common SQL operations include `SELECT` to read data, `INSERT` to add data, `UPDATE` to modify data, and `DELETE` to remove data. We use `WHERE` to filter rows and `ORDER BY` to sort results.

## Quick Revision

- `SELECT`: read data.
- `INSERT`: add data.
- `UPDATE`: modify data.
- `DELETE`: remove data.
- `WHERE`: filter rows.
- `ORDER BY`: sort rows.

## Deep Dive

### Common Commands

```sql
INSERT INTO employees (name, email)
VALUES ('Amit Patil', 'amit@example.com');

UPDATE tasks
SET status = 'DONE'
WHERE id = 10;

DELETE FROM tasks
WHERE id = 10;
```

### Employee Task Examples

```sql
SELECT id, title, status
FROM tasks
WHERE employee_id = 5
ORDER BY created_at DESC;
```

### Common Interview Questions

- What is SQL?
- Difference between `WHERE` and `ORDER BY`?
- What happens if `UPDATE` has no `WHERE`?
- Why should we avoid `SELECT *` in production queries?

