# Configuration Properties and Profiles

## Definition

Configuration properties store external values like server port, database URL, app name, and environment-specific settings. Profiles separate configuration for dev, test, and production.

## Why It Matters

Real projects need different settings for local development, testing, and production. Hardcoding values makes deployment risky.

## Core Example

```properties
spring.application.name=employee-task-system
server.port=8080
spring.profiles.active=dev
```

## Common Traps

- Hardcoding database URLs and secrets.
- Mixing development and production settings.
- Committing passwords into source code.
- Not understanding profile-specific files.

## Interview Answer

Spring Boot reads configuration from files like `application.properties` or `application.yml`. Profiles allow different configuration for different environments, such as `dev`, `test`, and `prod`. This helps keep application code the same while changing environment-specific values externally.

## Quick Revision

- `application.properties` stores configuration.
- Profiles separate environment settings.
- Use environment variables for secrets.
- Do not hardcode production values.
- Keep code independent from deployment environment.

## Deep Dive

### Profile Files

```text
application.properties
application-dev.properties
application-prod.properties
```

### Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_db
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
```

### Employee Task Project Connection

For the Employee Task system, local development can use a local MySQL database, while production can use a different database server. The same code can run in both places using different configuration.

### Common Interview Questions

- What is `application.properties`?
- What are Spring profiles?
- How do you manage different environment settings?
- Where should passwords and secrets be stored?

