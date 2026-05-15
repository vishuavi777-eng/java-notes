# Group By and Having

## Definition

`GROUP BY` groups rows with the same values. `HAVING` filters grouped results.

## Why It Matters

Reports, dashboards, and analytics often need grouped data like counts, totals, and averages.

## Core Example

```sql
SELECT employee_id, COUNT(*) AS task_count
FROM tasks
GROUP BY employee_id;
```

## Common Traps

- Confusing `WHERE` and `HAVING`.
- Selecting columns not included in `GROUP BY`.
- Grouping too much data without filters.
- Not understanding aggregate functions.

## Interview Answer

`GROUP BY` is used to group rows and apply aggregate functions like `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`. `WHERE` filters rows before grouping. `HAVING` filters groups after grouping.

## Quick Revision

- `GROUP BY`: groups rows.
- `COUNT`: counts rows.
- `SUM`: totals values.
- `AVG`: average value.
- `WHERE`: before grouping.
- `HAVING`: after grouping.

## Deep Dive

### Count Tasks by Status

```sql
SELECT status, COUNT(*) AS total
FROM tasks
GROUP BY status;
```

### Having Example

```sql
SELECT employee_id, COUNT(*) AS task_count
FROM tasks
GROUP BY employee_id
HAVING COUNT(*) > 5;
```

### Employee Task Report

```sql
SELECT e.name, COUNT(t.id) AS open_tasks
FROM employees e
LEFT JOIN tasks t ON e.id = t.employee_id AND t.status = 'OPEN'
GROUP BY e.id, e.name
HAVING COUNT(t.id) > 0;
```

### Common Interview Questions

- `WHERE` vs `HAVING`?
- What is aggregate function?
- How do you count records by status?
- Why do we use `GROUP BY`?

