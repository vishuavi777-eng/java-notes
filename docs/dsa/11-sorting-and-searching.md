# Sorting and Searching

## Definition

Sorting arranges data in order. Searching finds a target or position in data.

## Why It Matters

Sorting and searching are core tools for optimization. Many problems become easier after sorting or by using binary search.

## Core Example

Binary search finds a target in a sorted array in `O(log n)`.

## Common Traps

- Binary search overflow with `(low + high) / 2`.
- Infinite loop from wrong boundary update.
- Sorting changes original order.
- Comparator mistakes.
- Assuming binary search only works on arrays.

## Interview Answer

Sorting is useful when order helps simplify comparisons, grouping, or duplicate handling. Binary search is useful when the search space is sorted or monotonic. The key is to define the condition that tells us which half to discard.

## Quick Revision

- Merge sort: `O(n log n)`.
- Quick sort: average `O(n log n)`.
- Binary search: `O(log n)`.
- Java Arrays.sort for primitives is optimized.
- Comparator controls object sorting.
- Binary search works on monotonic answer spaces too.

## Deep Dive

### Binary Search Template

```java
int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) return mid;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```

### Binary Search on Answer

Use when:

- You can check if an answer is possible.
- If answer `x` works, all larger or smaller answers also work.

Examples:

- Minimum capacity to ship packages.
- Koko eating bananas.
- Allocate books.

### Sorting in Java

```java
Arrays.sort(nums);
```

For objects:

```java
people.sort(Comparator.comparingInt(Person::age));
```

### Comparator Trap

Avoid subtraction comparator when overflow is possible:

```java
(a, b) -> a - b
```

Prefer:

```java
Integer.compare(a, b)
```

### Senior-Level Notes

Sorting can simplify a problem but costs `O(n log n)`. If hashing solves the same problem in `O(n)` and order is not needed, hashing may be better.

