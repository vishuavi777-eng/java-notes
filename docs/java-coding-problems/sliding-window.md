# Sliding Window Pattern

## Definition

Sliding window is a technique for solving subarray or substring problems by maintaining a moving range.

## Why It Matters

It avoids recalculating values for every possible subarray.

## Core Example

Find maximum sum of subarray of size `k`.

```java
public int maxSum(int[] nums, int k) {
    int windowSum = 0;

    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    int maxSum = windowSum;

    for (int right = k; right < nums.length; right++) {
        windowSum += nums[right];
        windowSum -= nums[right - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Recalculating window sum each time.
- Not removing left element.
- Wrong window size.
- Confusing fixed and variable window.

## Interview Answer

Sliding window keeps a range of elements and moves it step by step. Instead of recalculating the full range, I add the new element and remove the old element. This makes many subarray problems linear.

## Quick Revision

- Good for subarray and substring.
- Fixed window: constant size.
- Variable window: expand and shrink.
- Time is usually `O(n)`.

