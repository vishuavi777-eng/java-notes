# Parallel Streams

## Definition

Parallel streams split stream processing across multiple threads using the common ForkJoinPool.

## Why It Matters

Parallel streams can improve performance for CPU-heavy independent work, but they can also make code slower or unsafe when used incorrectly.

## Core Example

```java
long count = numbers.parallelStream()
    .filter(n -> isPrime(n))
    .count();
```

## Common Traps

- Parallel does not always mean faster.
- Shared mutable state can create race conditions.
- Ordering can reduce performance.
- Blocking I/O inside parallel streams can hurt the common pool.
- Small data sets often do not benefit.

## Interview Answer

Parallel streams process data using multiple threads. They are useful when work is CPU-heavy, independent, and large enough to justify splitting overhead. They should be avoided for shared mutable state, blocking operations, and code where ordering or side effects matter.

## Quick Revision

- Uses common ForkJoinPool.
- Best for CPU-bound independent tasks.
- Avoid shared mutable state.
- Avoid blocking I/O.
- Measure before using.
- Sequential stream is safer by default.

## Deep Dive

### Sequential vs Parallel

```java
users.stream()
    .filter(User::isActive)
    .toList();
```

```java
users.parallelStream()
    .filter(User::isActive)
    .toList();
```

Parallel stream splits work internally.

### Good Use Case

Good candidate:

- Large input.
- CPU-heavy operation.
- No shared mutation.
- No strict ordering requirement.

Example:

```java
List<Result> results = inputs.parallelStream()
    .map(this::cpuHeavyCalculation)
    .toList();
```

### Bad Use Case

```java
List<String> output = new ArrayList<>();

users.parallelStream()
    .forEach(user -> output.add(user.getName()));
```

This is unsafe because `ArrayList` is not thread-safe.

Better:

```java
List<String> output = users.parallelStream()
    .map(User::getName)
    .toList();
```

### forEach vs forEachOrdered

```java
stream.parallel()
    .forEach(System.out::println);
```

Order is not guaranteed.

```java
stream.parallel()
    .forEachOrdered(System.out::println);
```

Order is preserved, but performance may reduce.

### Senior-Level Notes

Parallel streams use the common pool by default. In backend applications, this can interfere with other tasks using the same pool. For critical performance work, explicit executor design is often better.

