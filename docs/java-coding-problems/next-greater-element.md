# Next Greater Element

## Problem

For each element in an array, find the next greater element on its right. If no greater element exists, return `-1`.

## Example

```text
Input: [2,1,2,4,3]
Output: [4,2,4,-1,-1]
```

## Approach

Use a monotonic stack. Traverse from right to left and keep possible greater elements in stack.

## Java Code

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int[] result = new int[nums.length];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = nums.length - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= nums[i]) {
                stack.pop();
            }

            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(nums[i]);
        }

        return result;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Common Traps

- Using nested loops.
- Not popping smaller elements.
- Confusing next greater value with index.
- Traversing direction incorrectly.

## Interview Answer

I use a stack to keep useful greater elements. Traversing from right to left, I remove elements smaller than or equal to current because they cannot be next greater. The top of stack becomes the answer.

## Quick Revision

- Pattern: Monotonic stack.
- Traverse from right to left.
- Pop smaller values.
- Time is `O(n)`.

