# Two Sum

## Problem

Given an integer array `nums` and an integer `target`, return indices of two numbers such that they add up to `target`.

## Example

```text
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
```

## Approach

Use a HashMap to store each number and its index. For every number, calculate the required complement.

```text
need = target - current number
```

If the complement already exists in the map, return both indices.

## Java Code

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {
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
}
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Common Traps

- Using the same element twice.
- Adding current number to map before checking complement.
- Forgetting duplicate values.
- Returning values instead of indices.

## Interview Answer

I can solve this using a HashMap. I iterate through the array and for each number calculate what value is needed to reach the target. If that value already exists in the map, I return its index and the current index. Otherwise, I store the current number with its index.

## Quick Revision

- Pattern: Hashing.
- Store number and index.
- Check complement before inserting current number.
- Time is `O(n)`.

