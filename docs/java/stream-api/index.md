# Stream API Overview

## Definition

Stream API is a Java feature used to process collections and sequences of data in a functional style.

## Why It Matters

Stream API is common in modern Java backend code. It helps write readable filtering, mapping, grouping, sorting, and aggregation logic.

## Core Example

```java
List<String> names = users.stream()
    .filter(user -> user.isActive())
    .map(User::getName)
    .toList();
```

## Common Traps

- A stream does not store data.
- A stream can be consumed only once.
- Intermediate operations are lazy.
- Terminal operations trigger execution.
- Streams should not be used when a simple loop is clearer.

## Interview Answer

Stream API provides a pipeline for processing data. A stream starts from a source like a collection, applies intermediate operations like `filter`, `map`, and `sorted`, and finishes with a terminal operation like `collect`, `count`, `forEach`, or `reduce`.

## Quick Revision

- Stream processes data, it does not store data.
- Source can be collection, array, file, or generator.
- Intermediate operations are lazy.
- Terminal operation starts execution.
- Stream pipeline can be sequential or parallel.
- Prefer readability over forcing streams everywhere.

## Deep Dive

### Why Stream API Exists

Before streams, collection processing often used loops:

```java
List<String> names = new ArrayList<>();

for (User user : users) {
    if (user.isActive()) {
        names.add(user.getName());
    }
}
```

With streams:

```java
List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .toList();
```

The stream version focuses on **what** we want, not every detail of **how** to loop.

### Stream Pipeline

```text
source -> intermediate operations -> terminal operation
```

Example:

```java
long count = users.stream()
    .filter(User::isActive)
    .count();
```

Source:

```java
users.stream()
```

Intermediate operation:

```java
filter(User::isActive)
```

Terminal operation:

```java
count()
```

### Stream vs Collection

Collection stores data.

Stream processes data.

```text
Collection = data structure
Stream = data processing pipeline
```

### One-Time Use

```java
Stream<String> stream = names.stream();

stream.count();
stream.forEach(System.out::println); // error
```

After a terminal operation, the stream is consumed.

### When to Use Streams

Use streams when:

- Filtering data.
- Transforming data.
- Grouping data.
- Aggregating data.
- Chaining readable operations.

Avoid streams when:

- Logic has many side effects.
- Debugging becomes difficult.
- A simple loop is clearer.
- You need complex break/continue behavior.

