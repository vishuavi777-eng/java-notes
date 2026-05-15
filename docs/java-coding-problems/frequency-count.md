# Frequency Count

## Problem

Count how many times each element appears in an array or string.

## Example

```text
Input: [1,2,2,3,3,3]
Output: {1=1, 2=2, 3=3}
```

## Approach

Use a HashMap. For every element, increase its count.

## Java Code

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public Map<Integer, Integer> frequencyCount(int[] nums) {
        Map<Integer, Integer> frequency = new HashMap<>();

        for (int num : nums) {
            frequency.put(num, frequency.getOrDefault(num, 0) + 1);
        }

        return frequency;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Common Traps

- Using nested loops.
- Forgetting `getOrDefault`.
- Not handling empty input.
- Confusing value and frequency.

## Interview Answer

I use a HashMap where key is the element and value is its count. I iterate once through the array and update the count for each element.

## Quick Revision

- Pattern: Hashing.
- Key = element.
- Value = count.
- Time is `O(n)`.

