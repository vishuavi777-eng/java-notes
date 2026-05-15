# Valid Anagram

## Problem

Check whether two strings are anagrams. Two strings are anagrams if they contain the same characters with the same frequency.

## Example

```text
Input: s = "listen", t = "silent"
Output: true
```

## Approach

Use a frequency array or HashMap. Count characters from the first string and subtract counts using the second string.

## Java Code

```java
public class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        int[] count = new int[26];

        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int value : count) {
            if (value != 0) {
                return false;
            }
        }

        return true;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)` for lowercase English letters

## Common Traps

- Sorting both strings gives `O(n log n)`.
- Not checking length first.
- Assuming only lowercase letters without confirming.
- Forgetting duplicate character counts.

## Interview Answer

I first check if both strings have the same length. Then I count character frequencies. If both strings are anagrams, every character count should become zero after adding from one string and subtracting from the other.

## Quick Revision

- Pattern: Frequency count.
- Check length first.
- Count characters.
- Time is `O(n)`.

