# SQL / MySQL Quick Revision

## Basics

- `SELECT`: read.
- `INSERT`: add.
- `UPDATE`: modify.
- `DELETE`: remove.
- Always use `WHERE` carefully with update/delete.

## Keys

- Primary key uniquely identifies a row.
- Foreign key connects two tables.
- Unique key prevents duplicate values.

## Joins

- Inner join returns matching rows.
- Left join returns all left rows and matching right rows.
- Join usually uses primary key and foreign key.

## Indexes

- Index improves read performance.
- Useful for `WHERE`, `JOIN`, `ORDER BY`.
- Too many indexes slow writes.
- Composite index order matters.

## Transactions

- Transaction means all operations succeed or fail together.
- ACID: Atomicity, Consistency, Isolation, Durability.
- Commit saves changes.
- Rollback cancels changes.

## Employee Task Tables

- `employees`
- `tasks`
- `calls`
- `task_history`
- `roles`
- `employee_roles`

