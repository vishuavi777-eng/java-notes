# N+1 Query Problem

## Definition

N+1 query problem happens when one query loads parent records and then one extra query runs for each child relation.

## Why It Matters

N+1 queries can make APIs slow when data grows.

## Core Example

```text
1 query  -> fetch all employees
N queries -> fetch tasks for each employee
```

## Common Traps

- Not checking SQL logs.
- Returning entities directly from APIs.
- Looping over lazy relations.
- Testing only with small data.

## Interview Answer

N+1 problem happens when we fetch a list of entities and then access a lazy relation for each item, causing many extra queries. We can fix it using fetch join, entity graph, DTO projection, batch fetching, or designing a query based on the API use case.

## Quick Revision

- 1 query for parent list.
- N extra queries for children.
- Common with lazy relations.
- Fix with fetch join, entity graph, DTO query, or batch fetching.
- Always check generated SQL for important APIs.

## Deep Dive

### Example

```java
List<Employee> employees = employeeRepository.findAll();

for (Employee employee : employees) {
    employee.getTasks().size();
}
```

This may execute one query for employees and one query per employee for tasks.

### Fix Example

```java
@Query("select e from Employee e left join fetch e.tasks")
List<Employee> findAllWithTasks();
```

### Interview Tip

Do not only say "use eager loading". That can create bigger performance problems. Say you choose fetching strategy based on API requirement.

### Common Interview Questions

- What is N+1 query problem?
- How do you identify it?
- How do you fix it?
- Is eager loading always a good solution?

