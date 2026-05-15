# Binary Search

## Problem

Given a sorted array and a target value, return the index of the target. If the target does not exist, return `-1`.

## Example

```text
Input: nums = [1,3,5,7,9], target = 7
Output: 3
```

## Approach

Use two pointers: `left` and `right`. Check the middle element and reduce the search range by half each time.

## Java Code

```java
public class Solution {
    public int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }
}
```

## Complexity

- Time: `O(log n)`
- Space: `O(1)`

## Common Traps

- Array must be sorted.
- Infinite loop due to wrong pointer update.
- Integer overflow with `(left + right) / 2`.
- Using `left < right` incorrectly.

## Interview Answer

Binary search works on a sorted array. I check the middle element. If it is the target, I return the index. If target is greater, I search the right half. Otherwise, I search the left half. Each step reduces the search space by half.

## Quick Revision

- Pattern: Binary search.
- Requires sorted data.
- Use `left <= right`.
- Use safe mid calculation.
- Time is `O(log n)`.

