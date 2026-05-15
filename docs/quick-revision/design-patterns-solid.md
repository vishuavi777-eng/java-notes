# Design Patterns and SOLID Quick Revision

## SOLID

- SRP: one class should have one main responsibility.
- OCP: open for extension, closed for modification.
- LSP: child class should replace parent safely.
- ISP: small focused interfaces are better.
- DIP: depend on abstractions, not concrete classes.

## Common Patterns

- Singleton: one shared instance.
- Factory: create objects without exposing creation logic.
- Builder: create complex objects step by step.
- Strategy: switch behavior without large if-else.
- Observer: notify subscribers when event happens.
- Decorator: add behavior without changing original class.
- Adapter: make incompatible interfaces work together.
- Facade: simple interface over complex system.

## Spring Connection

- Spring beans are singleton by default.
- Dependency injection supports DIP.
- `@Transactional` uses proxy behavior.
- Strategy pattern is useful for business rules.

## Interview Tip

Do not only define patterns. Explain where you used or could use them in backend logic.

