# External Configuration and Secrets

## Definition

External configuration means keeping environment-specific values outside application code. Secrets are sensitive values like passwords, API keys, and tokens.

## Why It Matters

Production systems must not keep secrets in source code. Configuration should change by environment without changing code.

## Core Example

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
```

## Common Traps

- Committing passwords to git.
- Hardcoding API keys.
- Sharing production secrets in local files.
- Printing secrets in logs.
- Using same secret in every environment.

## Interview Answer

Spring Boot supports externalized configuration using properties, YAML, environment variables, command-line arguments, and secret managers. Sensitive values like database passwords and API keys should come from environment variables or secure secret storage, not from source code.

## Quick Revision

- Do not hardcode secrets.
- Use environment variables.
- Keep configuration outside code.
- Use different values for each environment.
- Never log secrets.

## Deep Dive

### Safe Pattern

```properties
jwt.secret=${JWT_SECRET}
payment.api.key=${PAYMENT_API_KEY}
```

### Examples of Secrets

- Database password.
- JWT signing secret.
- API key.
- OAuth client secret.
- SMTP password.

### Employee Task Project Connection

The Employee Task API should read MySQL credentials and JWT secret from environment variables during deployment.

### Common Interview Questions

- What is externalized configuration?
- How do you manage secrets?
- Why should secrets not be committed?
- How do profiles and environment variables work together?

