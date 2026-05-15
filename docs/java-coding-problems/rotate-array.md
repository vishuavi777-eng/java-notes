# Rotate Array

## Problem

Given an array, rotate it to the right by `k` steps.

## Example

```text
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

## Approach

Use reverse technique:

1. Reverse the whole array.
2. Reverse first `k` elements.
3. Reverse remaining elements.

## Java Code

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;

        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Forgetting `k = k % n`.
- Using extra array when in-place is expected.
- Off-by-one error in reverse ranges.

## Interview Answer

I use the reverse technique. First I reverse the full array, then reverse the first `k` elements, and finally reverse the remaining elements. This rotates the array in-place with constant extra space.

## Quick Revision

- Pattern: Array reversal.
- Handle `k > n`.
- In-place solution.
- Time is `O(n)`.

