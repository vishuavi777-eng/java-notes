# Maximum Subarray

## Problem

Given an integer array, find the contiguous subarray with the largest sum.

## Example

```text
Input: [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has sum 6
```

## Approach

Use Kadane's algorithm. Keep a running sum. At each index, decide whether to extend the previous subarray or start a new subarray from the current number.

## Java Code

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Initializing max sum as `0` when all numbers can be negative.
- Not handling single element array.
- Confusing subarray with subsequence.

## Interview Answer

I use Kadane's algorithm. For each element, I decide whether to continue the previous subarray or start from the current element. I maintain the best sum seen so far. This gives linear time and constant space.

## Quick Revision

- Pattern: Dynamic programming / Kadane.
- Track current sum and max sum.
- Initialize with first element.
- Time is `O(n)`.

