# REST API Quick Revision

## REST Basics

- REST uses resources and HTTP methods.
- URLs should be resource-based.
- REST APIs should be stateless.
- JSON is common, but REST is not only JSON.

## HTTP Methods

- GET: read.
- POST: create.
- PUT: full update.
- PATCH: partial update.
- DELETE: remove.

## Status Codes

- `200`: success.
- `201`: created.
- `204`: no content.
- `400`: invalid request.
- `401`: not authenticated.
- `403`: not allowed.
- `404`: not found.
- `409`: conflict.
- `500`: server error.

## Design

- Use DTOs.
- Do not expose entity directly.
- Use pagination for list APIs.
- Use consistent error response.
- Secure APIs using token and role checks.

## Employee Task Examples

- `POST /api/tasks`
- `PATCH /api/tasks/{id}/assign`
- `PATCH /api/tasks/{id}/status`
- `GET /api/tasks?status=OPEN&page=0&size=20`

