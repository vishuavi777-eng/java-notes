# Optional and Null Handling

## Definition

`Optional` is a container that may or may not contain a value.

## Why It Matters

Stream operations like `findFirst`, `findAny`, `max`, and `min` often return Optional. It helps avoid direct null checks when used properly.

## Core Example

```java
Optional<User> user = users.stream()
    .filter(u -> u.getId() == id)
    .findFirst();
```

## Common Traps

- Do not call `get()` without checking.
- Optional is not a replacement for every nullable field.
- Avoid using Optional for entity fields in many persistence models.
- `orElse` always evaluates its argument.
- `orElseGet` evaluates lazily.

## Interview Answer

Optional represents a value that can be present or absent. It is useful as a return type when a method may not find a result. With streams, Optional appears in operations like `findFirst`, `max`, and `reduce` without identity.

## Quick Revision

- Optional may contain value or be empty.
- Use `isPresent`, `ifPresent`, `orElse`, `orElseGet`, `orElseThrow`.
- Avoid unsafe `get()`.
- `orElseGet` is lazy.
- Stream find operations return Optional.
- Optional is best for return values.

## Deep Dive

### Creating Optional

```java
Optional<String> name = Optional.of("Java");
Optional<String> empty = Optional.empty();
Optional<String> nullable = Optional.ofNullable(input);
```

`Optional.of(null)` throws `NullPointerException`.

### Safe Access

```java
user.ifPresent(u -> System.out.println(u.getName()));
```

Default value:

```java
String name = optionalName.orElse("Unknown");
```

Lazy default:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

Throw if absent:

```java
User user = optionalUser.orElseThrow(
    () -> new UserNotFoundException(id)
);
```

### Stream with Optional

```java
Optional<User> firstAdmin = users.stream()
    .filter(user -> user.getRole().equals("ADMIN"))
    .findFirst();
```

### orElse vs orElseGet

```java
String value = optional.orElse(expensiveCall());
```

`expensiveCall()` runs even if optional has value.

```java
String value = optional.orElseGet(() -> expensiveCall());
```

`expensiveCall()` runs only when optional is empty.

### Senior-Level Notes

Use Optional to make absence explicit. Do not overuse it in fields, method parameters, or places where it makes APIs awkward.

