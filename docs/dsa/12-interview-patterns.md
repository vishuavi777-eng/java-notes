# Interview Problem Patterns

## Definition

Interview patterns are reusable ways to recognize and solve groups of DSA problems.

## Why It Matters

Strong developers do not memorize thousands of problems. They identify the pattern, explain the trade-off, and adapt it to constraints.

## Core Example

If a problem asks for the longest contiguous substring with a condition, sliding window is often a strong candidate.

## Common Traps

- Forcing a pattern without checking constraints.
- Ignoring edge cases.
- Not explaining why the pattern fits.
- Jumping to optimized code without brute force.
- Memorizing code but failing to adapt it.

## Interview Answer

I first classify the problem by input structure and required output. Then I check common patterns like two pointers, sliding window, hashing, stack, BFS/DFS, heap, binary search, backtracking, or DP. I choose the pattern that matches the constraints and explain complexity.

## Quick Revision

- Contiguous range: sliding window or prefix sum.
- Sorted pair: two pointers.
- Fast lookup: hashing.
- Nested matching: stack.
- Shortest unweighted path: BFS.
- All possibilities: backtracking.
- Overlapping subproblems: DP.

## Deep Dive

### Pattern Map

| Problem Signal | Likely Pattern |
| --- | --- |
| Sorted array, pair needed | Two pointers |
| Longest/shortest contiguous range | Sliding window |
| Range sum queries | Prefix sum |
| Fast existence/count lookup | HashMap/HashSet |
| Matching brackets or next greater | Stack |
| Level order or shortest unweighted path | BFS |
| Connected components or path existence | DFS |
| Top K or repeated best item | Heap |
| Monotonic answer space | Binary search on answer |
| All subsets/permutations | Backtracking |
| Repeated subproblems | Dynamic programming |

### Interview Communication Template

```text
Brute force:
  Explain simplest correct approach.

Optimization:
  Identify repeated work or expensive operation.

Data structure:
  Choose array, map, set, stack, queue, heap, tree, or graph.

Complexity:
  State time and space clearly.

Edge cases:
  Empty input, duplicates, negative values, overflow, null.
```

### Senior-Level Trade-Offs

Hashing improves lookup but uses extra memory.

Sorting simplifies order-based logic but costs `O(n log n)`.

Recursion is clean but can overflow stack.

DP is powerful but can use large memory.

Heaps are good for top K but not for full sorting.

### Practice Plan

1. Solve 5 problems per pattern.
2. Write brute force first in notes.
3. Write optimized version.
4. Explain why optimization works.
5. Re-solve after one week without looking.

