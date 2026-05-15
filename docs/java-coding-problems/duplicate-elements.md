# Duplicate Elements

## Problem

Find duplicate elements in an array.

## Example

```text
Input: [1,2,3,2,4,1]
Output: [2,1]
```

## Approach

Use two sets. One set tracks seen elements, and another stores duplicates.

## Java Code

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new HashSet<>();

        for (int num : nums) {
            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }

        return new ArrayList<>(duplicates);
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Common Traps

- Returning same duplicate multiple times.
- Using nested loops.
- Not deciding whether output order matters.
- Not handling no duplicate case.

## Interview Answer

I use a HashSet to track seen elements. If adding an element fails, that means it already exists, so I add it to duplicate set. This avoids repeated duplicate values.

## Quick Revision

- Pattern: HashSet.
- Seen set tracks first occurrence.
- Duplicate set avoids repeated output.
- Time is `O(n)`.

