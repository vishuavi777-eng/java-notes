# Arrays and Strings

## Definition

An array stores elements in contiguous index-based positions. A string is a sequence of characters; in Java, `String` is immutable.

## Why It Matters

Arrays and strings are the base of many interview problems. They test indexing, two pointers, sliding window, prefix sums, and careful edge-case handling.

## Core Example

Two Sum can be solved in `O(n)` using a HashMap instead of checking all pairs in `O(n^2)`.

## Common Traps

- Off-by-one errors.
- Empty array or single-element array.
- Confusing index and value.
- Modifying a string repeatedly with `+` in loops.
- Forgetting duplicate values.

## Interview Answer

For array and string problems, first check if order matters. Then consider two pointers, sliding window, prefix sums, hashing, sorting, or binary search depending on the constraints.

## Quick Revision

- Array access is `O(1)`.
- Searching unsorted array is `O(n)`.
- Strings are immutable in Java.
- Use `StringBuilder` for repeated changes.
- Two pointers work well on sorted or paired movement problems.
- Sliding window works for contiguous subarray or substring problems.

## Deep Dive

### Core Patterns

#### Two Pointers

Use when two indexes move through the data.

Common cases:

- Sorted pair sum.
- Reverse array.
- Remove duplicates.
- Palindrome check.

Example:

```java
boolean isPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}
```

Time: `O(n)`.

Space: `O(1)`.

#### Sliding Window

Use for contiguous subarray or substring.

Examples:

- Maximum sum subarray of size `k`.
- Longest substring without repeating characters.
- Minimum window substring.

Fixed-size window:

```java
int maxSumOfSizeK(int[] nums, int k) {
    int window = 0;
    for (int i = 0; i < k; i++) window += nums[i];

    int best = window;
    for (int right = k; right < nums.length; right++) {
        window += nums[right];
        window -= nums[right - k];
        best = Math.max(best, window);
    }
    return best;
}
```

#### Prefix Sum

Use when many range sum queries are needed.

```java
int[] prefix = new int[nums.length + 1];
for (int i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
}
```

Range sum from `l` to `r`:

```text
prefix[r + 1] - prefix[l]
```

### String Notes for Java

Use `StringBuilder` for repeated string mutation.

```java
StringBuilder sb = new StringBuilder();
for (String word : words) {
    sb.append(word);
}
return sb.toString();
```

### Senior-Level Questions

Ask:

- Is input sorted?
- Can I change the input array?
- Are duplicates allowed?
- Are negative values possible?
- Is the answer a range, count, index, or actual values?

