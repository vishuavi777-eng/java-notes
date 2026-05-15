# SQL and MySQL Roadmap

## Definition

SQL is used to store, read, filter, join, update, and analyze data in relational databases. MySQL is a popular relational database used in many backend applications.

## Why It Matters

Backend developers work with databases every day. Java and Spring Boot interviews commonly ask SQL queries, joins, indexes, transactions, and database design.

## Core Example

```sql
SELECT id, name, email
FROM employees
WHERE status = 'ACTIVE';
```

## Common Traps

- Knowing only basic `SELECT`.
- Not understanding joins.
- Creating indexes without knowing why.
- Ignoring transactions.
- Not thinking about query performance.
- Not designing tables properly.

## Interview Answer

SQL is used to work with relational data. In backend projects, we use SQL to create tables, insert records, read data, join related tables, filter results, update records, and manage transactions. MySQL is commonly used with Java and Spring Boot applications for storing application data.

## Quick Revision

- SQL works with relational tables.
- Primary key uniquely identifies a row.
- Foreign key connects tables.
- Joins combine related data.
- Indexes improve read performance.
- Transactions protect data consistency.

## Deep Dive

### Study Order

1. SQL basics
2. Primary key and foreign key
3. Joins
4. Group By and Having
5. Indexes
6. Transactions and ACID
7. Isolation levels
8. Normalization
9. Query optimization
10. Pagination queries
11. Employee Task database design

### Employee Task Project Connection

In the Employee Task / Call Allocation System, MySQL can store employees, tasks, call records, task status history, roles, and assignment details.

### Common Interview Questions

- What is SQL?
- What is primary key and foreign key?
- Inner join vs left join?
- What is index?
- What is transaction?
- How do you design tables for your project?

