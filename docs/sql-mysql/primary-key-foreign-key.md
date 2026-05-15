# Primary Key and Foreign Key

## Definition

A primary key uniquely identifies each row in a table. A foreign key connects one table to another table.

## Why It Matters

Primary keys and foreign keys help maintain data identity and relationships between tables.

## Core Example

```sql
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY,
    employee_id BIGINT,
    title VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

## Common Traps

- Creating tables without primary keys.
- Not enforcing relationships with foreign keys.
- Confusing primary key with unique key.
- Using meaningful business data as primary key without thinking.
- Not indexing foreign key columns.

## Interview Answer

A primary key uniquely identifies a row in a table and cannot be null. A foreign key is a column that refers to the primary key of another table. It helps maintain relationships and referential integrity between tables.

## Quick Revision

- Primary key uniquely identifies row.
- Primary key cannot be null.
- Foreign key creates relationship.
- Foreign key references another table.
- One employee can have many tasks.

## Deep Dive

### Employee and Task Relationship

```text
employees.id -> tasks.employee_id
```

This means one employee can have many tasks.

### Unique Key

```sql
ALTER TABLE employees
ADD CONSTRAINT uk_employee_email UNIQUE (email);
```

Email can be unique, but `id` is still usually the primary key.

### Common Interview Questions

- What is primary key?
- What is foreign key?
- Primary key vs unique key?
- Why are foreign keys useful?

