# Transactions and ACID

## Definition

A transaction is a group of database operations that should succeed or fail together. ACID defines transaction reliability properties.

## Why It Matters

Transactions protect data consistency when multiple database changes are part of one business operation.

## Core Example

```sql
START TRANSACTION;
UPDATE tasks SET status = 'ASSIGNED' WHERE id = 10;
INSERT INTO task_history (task_id, status) VALUES (10, 'ASSIGNED');
COMMIT;
```

## Common Traps

- Updating multiple tables without transaction.
- Not understanding rollback.
- Thinking transaction is only for money transfer.
- Keeping transaction open too long.
- Doing slow external API calls inside transaction.

## Interview Answer

A transaction groups multiple database operations into one unit. If all operations succeed, the transaction commits. If something fails, the transaction rolls back. ACID means Atomicity, Consistency, Isolation, and Durability. These properties help keep database data correct and reliable.

## Quick Revision

- Transaction = all or nothing.
- Commit saves changes.
- Rollback cancels changes.
- ACID protects consistency.
- Use transactions for multi-step database updates.

## Deep Dive

### ACID

| Property | Meaning |
| --- | --- |
| Atomicity | All operations succeed or fail together |
| Consistency | Data remains valid after transaction |
| Isolation | Transactions do not interfere incorrectly |
| Durability | Committed data is saved permanently |

### Employee Task Example

When assigning a task:

```text
Update task employee_id
Update task status
Insert assignment history
```

These should happen in one transaction.

### Common Interview Questions

- What is transaction?
- What is ACID?
- Commit vs rollback?
- Why are transactions important?

