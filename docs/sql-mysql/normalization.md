# Normalization

## Definition

Normalization is the process of organizing database tables to reduce duplicate data and improve data consistency.

## Why It Matters

Good table design prevents duplicate, inconsistent, and hard-to-maintain data.

## Core Example

Instead of storing employee name inside every task row, store employee details in `employees` table and reference it using `employee_id`.

## Common Traps

- Storing repeated data in many rows.
- Over-normalizing simple read-heavy data.
- Not understanding one-to-many relationships.
- Mixing unrelated fields in one table.
- Not thinking about reporting queries.

## Interview Answer

Normalization organizes data into related tables and reduces duplication. For example, employee information should be stored once in the employees table, and tasks should store `employee_id` as a reference. This avoids repeating employee details in every task record.

## Quick Revision

- Normalization reduces duplication.
- Improves data consistency.
- Uses related tables.
- Foreign keys connect tables.
- Too much normalization can make queries complex.

## Deep Dive

### Employee Task Example

Tables:

```text
employees
tasks
task_history
roles
employee_roles
```

Bad design:

```text
tasks table stores employee_name, employee_email, employee_phone repeatedly
```

Better design:

```text
tasks.employee_id references employees.id
```

### Common Normal Forms

- 1NF: atomic values, no repeating groups.
- 2NF: no partial dependency on composite key.
- 3NF: no transitive dependency.

### Common Interview Questions

- What is normalization?
- Why normalize database?
- What is denormalization?
- When can denormalization be useful?

