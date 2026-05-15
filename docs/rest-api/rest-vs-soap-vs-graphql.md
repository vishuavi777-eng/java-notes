# REST vs SOAP vs GraphQL

## Definition

REST, SOAP, and GraphQL are different approaches for API communication.

## Why It Matters

Interviewers may ask this to check whether you understand trade-offs, not only one technology.

## Core Example

```text
REST: GET /api/tasks/10
GraphQL: query { task(id: 10) { title status } }
SOAP: XML-based request and response contract
```

## Common Traps

- Saying one approach is always best.
- Thinking REST and JSON are the same.
- Not knowing SOAP is contract-heavy.
- Not knowing GraphQL lets clients choose fields.

## Interview Answer

REST uses resource-based URLs and HTTP methods. SOAP is a protocol that uses XML and strict contracts, often used in enterprise integrations. GraphQL lets clients request exactly the fields they need using a query language. REST is simple and widely used for backend APIs, SOAP is strict and contract-based, and GraphQL is useful when clients need flexible data fetching.

## Quick Revision

- REST: resources and HTTP methods.
- SOAP: XML and strict contract.
- GraphQL: client asks for exact fields.
- REST is common and simple.
- GraphQL can reduce over-fetching.
- SOAP is still used in some enterprise systems.

## Deep Dive

### Comparison

| Topic | REST | SOAP | GraphQL |
| --- | --- | --- | --- |
| Style | Architectural style | Protocol | Query language |
| Data format | Usually JSON | XML | JSON |
| Contract | Moderate | Strict WSDL | Schema |
| Flexibility | Endpoint-based | Contract-based | Client selects fields |
| Common use | Web/mobile APIs | Enterprise integrations | Complex frontend data |

### When REST Is Good

- CRUD APIs.
- Mobile and web backend.
- Simple resource-based systems.
- Easy caching and HTTP status usage.

### Common Interview Questions

- REST vs SOAP?
- REST vs GraphQL?
- When would you use GraphQL?
- Is SOAP still used?

