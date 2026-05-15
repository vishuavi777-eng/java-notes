# Two Pointers Pattern

## Definition

Two pointers means using two indexes or references to scan data from different positions.

## Why It Matters

This pattern solves many array, string, and linked list problems efficiently.

## Core Example

```java
int left = 0;
int right = nums.length - 1;
```

## Common Use Cases

- Reverse array or string.
- Palindrome check.
- Pair sum in sorted array.
- Move zeroes.
- Remove duplicates from sorted array.

## Common Traps

- Moving wrong pointer.
- Infinite loop.
- Off-by-one error.
- Using two pointers when array is not sorted for pair sum.

## Interview Answer

The two pointers pattern uses two indexes to process data efficiently. Sometimes pointers start from both ends, and sometimes both move in the same direction. It often reduces nested loop problems to linear time.

## Quick Revision

- Good for arrays and strings.
- Can start from both ends.
- Can move in same direction.
- Often gives `O(n)` solution.

