# Move Zeroes

## Problem

Given an array, move all zeroes to the end while maintaining the order of non-zero elements.

## Example

```text
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```

## Approach

Use two pointers. One pointer tracks where the next non-zero value should be placed. Then fill the remaining positions with zero.

## Java Code

```java
public class Solution {
    public void moveZeroes(int[] nums) {
        int index = 0;

        for (int num : nums) {
            if (num != 0) {
                nums[index] = num;
                index++;
            }
        }

        while (index < nums.length) {
            nums[index] = 0;
            index++;
        }
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Changing order of non-zero elements.
- Creating extra array when in-place is expected.
- Forgetting to fill remaining positions with zero.

## Interview Answer

I keep one index for the next non-zero position. I copy all non-zero values in order, then fill the rest of the array with zeroes. This keeps the relative order and works in-place.

## Quick Revision

- Pattern: Two pointers.
- Preserve order.
- In-place solution.
- Time is `O(n)`.

