# Reverse String

## Problem

Reverse a character array in-place.

## Example

```text
Input: ['h','e','l','l','o']
Output: ['o','l','l','e','h']
```

## Approach

Use two pointers, one at the start and one at the end. Swap characters and move both pointers toward the center.

## Java Code

```java
public class Solution {
    public void reverseString(char[] s) {
        int left = 0;
        int right = s.length - 1;

        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;

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

- Creating a new array when in-place is required.
- Off-by-one error with right pointer.
- Forgetting to move both pointers.

## Interview Answer

I use two pointers from both ends of the array. I swap the characters and move the pointers inward until they meet. This reverses the array in-place with constant space.

## Quick Revision

- Pattern: Two pointers.
- Swap start and end.
- Move inward.
- Space is `O(1)`.

