# Profiles

## Definition

Profiles allow a Spring Boot application to use different configuration for different environments like dev, test, and prod.

## Why It Matters

Local development, testing, and production usually use different databases, URLs, logging levels, and security settings.

## Core Example

```properties
spring.profiles.active=dev
```

Profile files:

```text
application-dev.properties
application-prod.properties
```

## Common Traps

- Using the same configuration for every environment.
- Hardcoding production values.
- Committing local database passwords.
- Forgetting which profile is active.
- Changing code instead of changing configuration.

## Interview Answer

Spring profiles help separate environment-specific configuration. For example, the dev profile can use a local database, while the prod profile can use a production database. We can activate profiles using properties, environment variables, or deployment configuration.

## Quick Revision

- Profiles separate environment configuration.
- Common profiles: dev, test, prod.
- Use profile-specific property files.
- Do not hardcode environment values.
- Activate profile during deployment.

## Deep Dive

### Example Files

```text
application.properties
application-dev.properties
application-prod.properties
```

### Example Config

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_dev
logging.level.com.example=DEBUG
```

Production can use:

```properties
spring.datasource.url=${DB_URL}
logging.level.com.example=INFO
```

### Common Interview Questions

- What are Spring profiles?
- How do you configure dev and prod separately?
- How do you activate a profile?
- Why should environment values not be hardcoded?

