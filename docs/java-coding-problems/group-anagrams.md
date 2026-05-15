# Group Anagrams

## Problem

Group strings that are anagrams of each other.

## Example

```text
Input: ["eat","tea","tan","ate","nat","bat"]
Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
```

## Approach

Sort each string. Anagrams have the same sorted form. Use the sorted string as HashMap key.

## Java Code

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);

            map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
        }

        return new ArrayList<>(map.values());
    }
}
```

## Complexity

- Time: `O(n * k log k)` where `k` is max string length
- Space: `O(n * k)`

## Common Traps

- Comparing every pair of strings.
- Not grouping all anagrams together.
- Forgetting duplicate words.
- Not knowing sorted string can be key.

## Interview Answer

I sort every string and use the sorted value as a key. All anagrams produce the same sorted key, so I group original strings in a map by that key.

## Quick Revision

- Pattern: HashMap grouping.
- Key = sorted string.
- Value = list of anagrams.
- Good for anagram grouping.

