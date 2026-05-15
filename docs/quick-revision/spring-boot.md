# Spring Boot Quick Revision

## Core

- `@SpringBootApplication` = configuration + auto-configuration + component scanning.
- Bean = object managed by Spring.
- ApplicationContext = Spring container.
- Constructor injection is preferred.
- Profiles separate dev, test, and prod configuration.

## REST API

- Controller handles HTTP request and response.
- Service handles business logic.
- Repository handles database.
- DTO protects API boundary.
- Use correct HTTP methods and status codes.

## Validation and Exception

- Use DTO validation annotations.
- Add `@Valid` in controller method.
- Use `@RestControllerAdvice` for global error handling.
- Return consistent error response.

## JPA

- Entity maps to table.
- Repository handles database operations.
- `JpaRepository` provides CRUD, paging, sorting.
- `@Transactional` defines transaction boundary.
- Watch lazy loading and N+1 query problem.

## Security

- Authentication: who are you?
- Authorization: what can you access?
- JWT is stateless token-based auth.
- Passwords must be hashed.
- Backend must enforce role-based access.

## Testing and Production

- Unit test: service logic.
- `@WebMvcTest`: controller.
- `@DataJpaTest`: repository.
- `@SpringBootTest`: integration.
- Actuator, logging, profiles, timeouts, and external config matter in production.

