# SQL Joins

## Definition

Joins combine rows from two or more tables based on related columns.

## Why It Matters

Most real data is stored across multiple tables. Joins are one of the most common SQL interview topics.

## Core Example

```sql
SELECT t.id, t.title, e.name
FROM tasks t
INNER JOIN employees e ON t.employee_id = e.id;
```

## Common Traps

- Confusing inner join and left join.
- Joining without proper condition.
- Creating duplicate rows unexpectedly.
- Not understanding many-to-many joins.
- Joining large tables without indexes.

## Interview Answer

A join is used to fetch related data from multiple tables. Inner join returns only matching rows from both tables. Left join returns all rows from the left table and matching rows from the right table. If there is no match, right table columns return NULL.

## Quick Revision

- Inner join: matching rows only.
- Left join: all left rows plus matching right rows.
- Join condition usually uses primary key and foreign key.
- Missing join condition can create wrong results.
- Indexes help join performance.

## Deep Dive

### Inner Join

```sql
SELECT e.name, t.title
FROM employees e
INNER JOIN tasks t ON e.id = t.employee_id;
```

Returns employees who have matching tasks.

### Left Join

```sql
SELECT e.name, t.title
FROM employees e
LEFT JOIN tasks t ON e.id = t.employee_id;
```

Returns all employees, even employees with no tasks.

### Employee Task Example

Find employees with their assigned task count:

```sql
SELECT e.id, e.name, COUNT(t.id) AS task_count
FROM employees e
LEFT JOIN tasks t ON e.id = t.employee_id
GROUP BY e.id, e.name;
```

### Common Interview Questions

- Inner join vs left join?
- What happens when left join has no match?
- Why do joins create duplicate rows?
- How do indexes help joins?

