# Collectors and Grouping

## Definition

Collectors are utilities that gather stream elements into collections, maps, strings, groups, or summary results.

## Why It Matters

Collectors are heavily used in backend code for converting lists, grouping records, counting values, and building maps.

## Core Example

```java
Map<String, List<User>> usersByRole = users.stream()
    .collect(Collectors.groupingBy(User::getRole));
```

## Common Traps

- `toMap` fails on duplicate keys unless merge function is provided.
- Grouping creates a map of groups.
- `toList()` and `Collectors.toList()` are not always identical in mutability.
- Collectors can become unreadable when deeply nested.
- Be careful with null keys and values depending on collector/map type.

## Interview Answer

Collectors are terminal helpers used with `collect()`. They convert stream output into structures like lists, sets, maps, grouped maps, joined strings, counts, and summaries. `groupingBy`, `toMap`, `mapping`, `counting`, and `joining` are common collectors.

## Quick Revision

- `collect()` is terminal.
- `Collectors.toList()` collects to list.
- `groupingBy` groups by key.
- `toMap` builds map.
- Duplicate map keys need merge function.
- `joining` combines strings.

## Deep Dive

### Collect to List

```java
List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.toList());
```

### Collect to Set

```java
Set<String> roles = users.stream()
    .map(User::getRole)
    .collect(Collectors.toSet());
```

### toMap

```java
Map<Long, User> userById = users.stream()
    .collect(Collectors.toMap(User::getId, Function.identity()));
```

If duplicate keys are possible:

```java
Map<String, User> userByEmail = users.stream()
    .collect(Collectors.toMap(
        User::getEmail,
        Function.identity(),
        (oldValue, newValue) -> newValue
    ));
```

### groupingBy

```java
Map<String, List<User>> byRole = users.stream()
    .collect(Collectors.groupingBy(User::getRole));
```

Count by group:

```java
Map<String, Long> countByRole = users.stream()
    .collect(Collectors.groupingBy(
        User::getRole,
        Collectors.counting()
    ));
```

### mapping

```java
Map<String, List<String>> namesByRole = users.stream()
    .collect(Collectors.groupingBy(
        User::getRole,
        Collectors.mapping(User::getName, Collectors.toList())
    ));
```

### joining

```java
String csv = names.stream()
    .collect(Collectors.joining(", "));
```

### Summary Statistics

```java
IntSummaryStatistics stats = users.stream()
    .collect(Collectors.summarizingInt(User::getAge));
```

Gives:

- count
- sum
- min
- max
- average

