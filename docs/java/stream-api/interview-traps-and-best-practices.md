# Stream API Interview Traps and Best Practices

## Definition

Stream API best practices are rules that keep stream code readable, safe, and efficient.

## Why It Matters

Many candidates know `filter` and `map`, but fail questions about laziness, terminal operations, side effects, `Optional`, collectors, and parallel streams.

## Core Example

```java
List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .toList();
```

This is good because it is clear, side-effect free, and easy to read.

## Common Traps

- Reusing a stream after terminal operation.
- Mutating external state inside stream operations.
- Using `peek` for business logic.
- Using parallel stream without measuring.
- Making stream chains too long and unreadable.

## Interview Answer

Good stream code should be clear, mostly side-effect free, and use the right operation for the job. Streams are lazy until terminal operation, can be consumed once, and should not be forced where loops are simpler.

## Quick Revision

- Do not reuse streams.
- Avoid side effects.
- Keep pipelines readable.
- Use collectors for grouping.
- Use loops when logic is complex.
- Be careful with parallel streams.

## Deep Dive

### Trap 1: No Terminal Operation

```java
users.stream()
    .filter(User::isActive)
    .map(User::getName);
```

This does nothing because there is no terminal operation.

Correct:

```java
List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .toList();
```

### Trap 2: Reusing Stream

```java
Stream<User> stream = users.stream();
stream.count();
stream.toList(); // error
```

A stream is consumed after terminal operation.

### Trap 3: Side Effects

Avoid:

```java
List<String> names = new ArrayList<>();
users.stream()
    .filter(User::isActive)
    .forEach(user -> names.add(user.getName()));
```

Prefer:

```java
List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .toList();
```

### Trap 4: map vs flatMap

Use `map`:

```java
User -> String
```

Use `flatMap`:

```java
User -> Stream<Order>
```

### Trap 5: Debugging Long Chains

If a stream chain is too long, split it:

```java
Stream<User> activeUsers = users.stream()
    .filter(User::isActive);

List<String> names = activeUsers
    .map(User::getName)
    .toList();
```

Or use a loop when business logic is easier to read.

### Senior-Level Best Practices

- Prefer method references when they improve clarity.
- Prefer lambdas when logic needs parameters or conditions.
- Keep stream operations pure when possible.
- Avoid parallel streams for database calls and HTTP calls.
- Use collectors for aggregation.
- Use loops for complex branching or error handling.

