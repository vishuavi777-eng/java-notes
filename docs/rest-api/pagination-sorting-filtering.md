# Pagination, Sorting, and Filtering

## Definition

Pagination splits large result sets into pages. Sorting orders results. Filtering returns only matching records.

## Why It Matters

Large APIs should not return all records at once. Pagination improves performance and user experience.

## Core Example

```text
GET /api/tasks?page=0&size=20&sort=createdAt,desc&status=OPEN
```

## Common Traps

- Returning thousands of rows in one response.
- Not defining default page size.
- Allowing very large page sizes.
- Not documenting filters.
- Sorting on fields without database index.

## Interview Answer

For list APIs, we should support pagination, sorting, and filtering. Pagination controls how many records are returned, sorting controls order, and filtering narrows results based on conditions. In Spring Boot, this is commonly implemented using `Pageable`, `Page`, and query parameters.

## Quick Revision

- Pagination prevents huge responses.
- Sorting controls order.
- Filtering narrows records.
- Use default page size.
- Limit maximum page size.
- Return pagination metadata.

## Deep Dive

### Common Query Parameters

```text
page=0
size=20
sort=createdAt,desc
status=OPEN
employeeId=5
```

### Response Example

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 150,
  "totalPages": 8
}
```

### Employee Task Example

Useful list APIs:

```text
GET /api/tasks?status=OPEN&page=0&size=20
GET /api/employees/5/tasks?sort=dueDate,asc
GET /api/calls?type=FOLLOW_UP&status=PENDING
```

### Common Interview Questions

- Why is pagination needed?
- How do you design filtering?
- What metadata should paginated response include?
- What can go wrong with very large page size?

