# Stream Intermediate Operations

## Definition

Intermediate operations transform a stream and return another stream.

## Why It Matters

Most stream pipelines use intermediate operations to filter, map, sort, limit, skip, or remove duplicates from data.

## Core Example

```java
List<String> result = names.stream()
    .filter(name -> name.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .toList();
```

## Common Traps

- Intermediate operations do not execute until a terminal operation is called.
- `map` and `flatMap` are different.
- `sorted()` can be expensive.
- `distinct()` depends on `equals()` and `hashCode()`.
- `peek()` should not be used for business logic.

## Interview Answer

Intermediate operations build a stream pipeline. They are lazy, so Java does not process elements until a terminal operation starts the pipeline. Common intermediate operations are `filter`, `map`, `flatMap`, `sorted`, `distinct`, `limit`, and `skip`.

## Quick Revision

- Intermediate operations return Stream.
- They are lazy.
- `filter` keeps matching elements.
- `map` transforms one element to one result.
- `flatMap` flattens nested streams.
- `sorted` needs ordering.

## Deep Dive

### filter

Keeps elements that match a condition.

```java
List<Integer> evens = nums.stream()
    .filter(n -> n % 2 == 0)
    .toList();
```

### map

Transforms each element.

```java
List<String> names = users.stream()
    .map(User::getName)
    .toList();
```

One input gives one output.

```text
User -> String
```

### flatMap

Flattens nested data.

```java
List<String> allTags = articles.stream()
    .flatMap(article -> article.getTags().stream())
    .toList();
```

Use when one input can produce many outputs.

```text
Article -> Stream<Tag>
```

### distinct

Removes duplicates.

```java
List<String> unique = names.stream()
    .distinct()
    .toList();
```

For custom objects, `distinct()` uses `equals()` and `hashCode()`.

### sorted

Natural order:

```java
List<Integer> sorted = nums.stream()
    .sorted()
    .toList();
```

Custom order:

```java
List<User> usersByAge = users.stream()
    .sorted(Comparator.comparingInt(User::getAge))
    .toList();
```

### limit and skip

```java
List<String> page = names.stream()
    .skip(20)
    .limit(10)
    .toList();
```

Useful for pagination-like logic.

### peek

`peek()` is mainly for debugging.

```java
users.stream()
    .peek(System.out::println)
    .filter(User::isActive)
    .toList();
```

Do not put important business mutation in `peek()`.

