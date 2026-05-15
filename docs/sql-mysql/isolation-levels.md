# Isolation Levels

## Definition

Isolation levels define how much one transaction can see changes made by another transaction.

## Why It Matters

Isolation controls consistency and concurrency. Higher isolation can reduce data issues but may reduce performance.

## Core Example

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

## Common Traps

- Not knowing dirty read, non-repeatable read, and phantom read.
- Assuming highest isolation is always best.
- Ignoring concurrency issues.
- Not knowing default database behavior.

## Interview Answer

Isolation level controls visibility between concurrent transactions. Common levels are Read Uncommitted, Read Committed, Repeatable Read, and Serializable. Higher isolation gives stronger consistency but can reduce concurrency and performance.

## Quick Revision

- Read Uncommitted: weakest isolation.
- Read Committed: avoids dirty reads.
- Repeatable Read: same row read stays consistent.
- Serializable: strongest isolation.
- Higher isolation can reduce performance.

## Deep Dive

### Common Problems

| Problem | Meaning |
| --- | --- |
| Dirty read | Reading uncommitted data from another transaction |
| Non-repeatable read | Same row gives different value in same transaction |
| Phantom read | New matching rows appear in repeated query |

### Isolation Levels

| Level | Notes |
| --- | --- |
| Read Uncommitted | Allows dirty reads |
| Read Committed | Prevents dirty reads |
| Repeatable Read | Prevents dirty and non-repeatable reads |
| Serializable | Strongest, behaves like transactions run one by one |

### Employee Task Example

If two admins assign the same task at the same time, transaction handling and proper locking help avoid inconsistent assignment.

### Common Interview Questions

- What is isolation level?
- What is dirty read?
- What is non-repeatable read?
- What is phantom read?
- Why not always use Serializable?

