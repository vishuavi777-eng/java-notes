# Employee Task Database Design

## Definition

Employee Task database design means defining tables and relationships needed for employees, tasks, calls, assignments, roles, and status tracking.

## Why It Matters

Database design questions are common in backend interviews. This page connects SQL concepts with your Spring Boot project.

## Core Example

```text
employees -> tasks -> task_history
```

## Common Traps

- Storing everything in one table.
- Not tracking task history.
- Not using foreign keys.
- Not planning indexes for list APIs.
- Not separating employee and role data.

## Interview Answer

For an Employee Task / Call Allocation System, I would design separate tables for employees, tasks, call records, task history, and roles. Employees can have many tasks. A task can be assigned to one employee at a time. Task history can store status changes and assignment changes. Foreign keys maintain relationships, and indexes improve common searches like tasks by employee and status.

## Quick Revision

- `employees`: employee data.
- `tasks`: task details and current status.
- `calls`: call-specific records.
- `task_history`: status and assignment history.
- `roles`: user roles.
- Add indexes on employee, status, and created date.

## Deep Dive

### Suggested Tables

```text
employees
tasks
task_history
calls
roles
employee_roles
```

### Employees Table

```sql
CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    status VARCHAR(30) NOT NULL,
    created_at DATETIME NOT NULL
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    employee_id BIGINT,
    status VARCHAR(30) NOT NULL,
    priority VARCHAR(30),
    due_date DATE,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

### Task History Table

```sql
CREATE TABLE task_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id BIGINT NOT NULL,
    old_status VARCHAR(30),
    new_status VARCHAR(30),
    changed_by BIGINT,
    changed_at DATETIME NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
```

### Useful Indexes

```sql
CREATE INDEX idx_tasks_employee_id ON tasks(employee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_employee_status ON tasks(employee_id, status);
CREATE INDEX idx_task_history_task_id ON task_history(task_id);
```

### Common Interview Questions

- How would you design database tables for your project?
- What are the relationships?
- Which indexes would you add?
- Why do we need task history?
- How do you avoid duplicate employee email?

### Related Interview Topics

- [Spring Boot Project Explanation](../spring/interview-system-design/employee-task-project-explanation.md)
- [Employee Task API Design](../rest-api/employee-task-api-design.md)
- [Employee Task System Design](../backend-system-design/employee-task-system-design.md)
- [Primary Key and Foreign Key](primary-key-foreign-key.md)
- [Joins](joins.md)
- [Indexes](indexes.md)
- [Transactions and ACID](transactions-acid.md)
- [Query Optimization](query-optimization.md)
- [Pagination Queries](pagination-queries.md)
- [Data Access with Spring Data JPA](../spring/data-jpa/index.md)
