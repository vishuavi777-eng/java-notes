# Stream Terminal Operations

## Definition

Terminal operations finish a stream pipeline and produce a result or side effect.

## Why It Matters

Without a terminal operation, a stream pipeline does not execute. Terminal operations are key to collecting, counting, matching, reducing, and iterating results.

## Core Example

```java
long activeCount = users.stream()
    .filter(User::isActive)
    .count();
```

## Common Traps

- A stream pipeline runs only after terminal operation.
- After terminal operation, the stream is consumed.
- `forEach` should not be abused for mutation.
- `findFirst` and `findAny` differ in parallel streams.
- `reduce` can be hard to read when a collector is clearer.

## Interview Answer

Terminal operations trigger stream execution and produce the final result. Examples include `collect`, `toList`, `count`, `forEach`, `reduce`, `anyMatch`, `allMatch`, `noneMatch`, `findFirst`, and `findAny`.

## Quick Revision

- Terminal operations start execution.
- Stream is consumed after terminal operation.
- `count` returns number of elements.
- `toList` collects elements.
- `anyMatch` checks at least one.
- `reduce` combines values.

## Deep Dive

### toList

Modern Java:

```java
List<String> names = users.stream()
    .map(User::getName)
    .toList();
```

`toList()` returns an unmodifiable list in modern Java.

If you need mutable list:

```java
List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.toCollection(ArrayList::new));
```

### count

```java
long count = users.stream()
    .filter(User::isActive)
    .count();
```

### forEach

```java
users.stream()
    .filter(User::isActive)
    .forEach(user -> sendEmail(user));
```

Use carefully. If the main goal is mutation or side effects, a loop may be clearer.

### anyMatch, allMatch, noneMatch

```java
boolean hasAdmin = users.stream()
    .anyMatch(user -> user.getRole().equals("ADMIN"));
```

```java
boolean allActive = users.stream()
    .allMatch(User::isActive);
```

```java
boolean noDeletedUsers = users.stream()
    .noneMatch(User::isDeleted);
```

These operations can short-circuit.

### findFirst and findAny

```java
Optional<User> firstActive = users.stream()
    .filter(User::isActive)
    .findFirst();
```

`findFirst()` respects encounter order.

`findAny()` allows more flexibility, especially in parallel streams.

### reduce

```java
int sum = nums.stream()
    .reduce(0, Integer::sum);
```

Use `reduce` when combining many values into one result.

For grouping or building collections, collectors are usually clearer.

