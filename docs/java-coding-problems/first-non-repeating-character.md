# First Non-Repeating Character

## Problem

Find the first character in a string that appears only once.

## Example

```text
Input: "leetcode"
Output: 'l'
```

## Approach

Use a frequency map or array. First count all characters. Then scan the string again and return the first character with count `1`.

## Java Code

```java
public class Solution {
    public char firstNonRepeatingChar(String s) {
        int[] count = new int[256];

        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i)]++;
        }

        for (int i = 0; i < s.length(); i++) {
            if (count[s.charAt(i)] == 1) {
                return s.charAt(i);
            }
        }

        return '\0';
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)` for fixed character set

## Common Traps

- Returning any non-repeating character instead of first.
- Not handling no-answer case.
- Assuming only lowercase without clarifying.
- Using nested loops and making it `O(n^2)`.

## Interview Answer

I count frequency of every character first. Then I scan the string again from left to right. The first character with frequency one is the answer. This keeps the original order.

## Quick Revision

- Pattern: Frequency count.
- First pass counts.
- Second pass finds first unique.
- Handle no result.

