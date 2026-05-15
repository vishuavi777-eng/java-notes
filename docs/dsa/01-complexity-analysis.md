# Complexity Analysis

## Definition

Complexity analysis measures how an algorithm grows as input size grows.

## Why It Matters

Correct code can still fail if it is too slow or uses too much memory. Complexity helps you compare approaches before coding.

## Core Example

Looping through an array once is `O(n)`. Two nested loops over the same array are usually `O(n^2)`.

## Common Traps

- Dropping important factors too early when input size is small.
- Confusing `O(log n)` with `O(n log n)`.
- Forgetting space complexity.
- Treating HashMap operations as always guaranteed O(1).
- Ignoring recursion stack space.

## Interview Answer

Big O describes the upper growth rate of an algorithm. We usually keep the dominant term and ignore constants. Time complexity measures operations, while space complexity measures extra memory used by the algorithm.

## Quick Revision

- `O(1)`: constant.
- `O(log n)`: divide input each step.
- `O(n)`: scan once.
- `O(n log n)`: many efficient sorts.
- `O(n^2)`: pair comparison or nested loops.
- Recursion uses call stack space.

## Deep Dive

### Common Complexities

| Complexity | Meaning | Example |
| --- | --- | --- |
| `O(1)` | Constant work | Array index access |
| `O(log n)` | Input halves repeatedly | Binary search |
| `O(n)` | Visit each item once | Linear scan |
| `O(n log n)` | Split and process | Merge sort |
| `O(n^2)` | Compare pairs | Bubble sort |
| `O(2^n)` | Explore subsets | Some recursion |
| `O(n!)` | Explore permutations | Brute force permutations |

### Time vs Space

Time complexity asks: how many operations grow with input?

Space complexity asks: how much extra memory grows with input?

Example:

```java
Set<Integer> seen = new HashSet<>();
for (int x : nums) {
    seen.add(x);
}
```

Time: `O(n)` average.

Space: `O(n)`.

### Recursion Complexity

For recursion, think about:

```text
number of calls * work per call
```

Also include recursion stack.

Example:

```java
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```

Time: `O(n)`.

Space: `O(n)` because of call stack.

### Senior Interview Notes

HashMap and HashSet operations are average `O(1)`, but worst-case can degrade due to collisions. Java 8 improves heavy collision buckets by treeifying them, but you should still say average case when discussing hash tables.

When input size is small, simpler `O(n^2)` code may be acceptable. When input size is large, choose better complexity.

