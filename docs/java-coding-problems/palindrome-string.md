# Palindrome String

## Problem

Check if a string is a palindrome. A palindrome reads the same forward and backward.

## Example

```text
Input: "madam"
Output: true
```

## Approach

Use two pointers. Compare characters from start and end. If any pair does not match, return false.

## Java Code

```java
public class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Reversing full string when two pointers are enough.
- Not clarifying case sensitivity.
- Not clarifying whether spaces and special characters should be ignored.

## Interview Answer

I use two pointers, one from the left and one from the right. I compare both characters and move inward. If all matching pairs are equal, the string is a palindrome.

## Quick Revision

- Pattern: Two pointers.
- Compare left and right.
- Ask about case and special characters.
- Time is `O(n)`.

