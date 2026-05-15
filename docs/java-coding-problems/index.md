# Java Coding Problems Roadmap

## Definition

Java coding problems are practical interview questions where you write code to solve array, string, hashing, linked list, stack, tree, and search problems.

## Why It Matters

DSA theory is useful, but interviews usually ask you to write working code. These problems help practice patterns, Java syntax, complexity, and clear explanation.

## Core Example

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (map.containsKey(need)) {
            return new int[] { map.get(need), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}
```

## Common Traps

- Writing code without explaining approach.
- Ignoring edge cases.
- Not knowing time and space complexity.
- Using nested loops when a better pattern exists.
- Not testing with small examples.

## Interview Answer

For coding problems, first clarify input and output. Then explain a simple approach and improve it if needed. After writing code, test it with examples and explain time and space complexity.

## Quick Revision

- Clarify the problem.
- Explain approach before coding.
- Handle edge cases.
- Write clean Java code.
- Test with examples.
- Explain complexity.

## Starter Problems

1. [Two Sum](two-sum.md)
2. [Maximum Subarray](maximum-subarray.md)
3. [Move Zeroes](move-zeroes.md)
4. [Reverse String](reverse-string.md)
5. [Palindrome String](palindrome-string.md)
6. [Valid Anagram](valid-anagram.md)
7. [First Non-Repeating Character](first-non-repeating-character.md)
8. [Valid Parentheses](valid-parentheses.md)
9. [Binary Search](binary-search.md)
10. [Reverse Linked List](reverse-linked-list.md)

## More Practice Problems

- [Rotate Array](rotate-array.md)
- [Frequency Count](frequency-count.md)
- [Duplicate Elements](duplicate-elements.md)
- [Group Anagrams](group-anagrams.md)
- [Middle of Linked List](middle-of-linked-list.md)
- [Detect Cycle in Linked List](detect-cycle.md)
- [Next Greater Element](next-greater-element.md)
- [Tree Traversals](tree-traversals.md)
- [Maximum Depth of Binary Tree](maximum-depth.md)
- [Lowest Common Ancestor](lowest-common-ancestor.md)

## Interview Patterns

- [Two Pointers Pattern](two-pointers.md)
- [Sliding Window Pattern](sliding-window.md)
- [Recursion and Backtracking Pattern](recursion-backtracking.md)

## Deep Dive

### Practice Method

Use this order for every problem:

```text
Problem -> Example -> Approach -> Code -> Complexity -> Edge cases -> Interview explanation
```

### Common Interview Questions

- Can you optimize this solution?
- What is the time complexity?
- What is the space complexity?
- What edge cases did you handle?
- Can you solve it without extra space?
