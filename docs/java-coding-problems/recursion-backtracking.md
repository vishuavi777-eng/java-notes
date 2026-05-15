# Recursion and Backtracking Pattern

## Definition

Recursion solves a problem by solving smaller versions of the same problem. Backtracking explores choices and undoes them when needed.

## Why It Matters

This pattern appears in tree problems, combinations, permutations, subsets, and search problems.

## Core Example

Generate all subsets:

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int index, List<Integer> path,
                           List<List<Integer>> result) {
        if (index == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        path.add(nums[index]);
        backtrack(nums, index + 1, path, result);

        path.remove(path.size() - 1);
        backtrack(nums, index + 1, path, result);
    }
}
```

## Complexity

- Time: usually exponential for combinations/subsets
- Space: recursion stack plus result storage

## Common Traps

- Missing base case.
- Not undoing choice.
- Adding same list reference to result.
- Stack overflow for very deep recursion.

## Interview Answer

In recursion, I define a base case and solve smaller subproblems. In backtracking, I choose an option, explore it, then undo the choice before trying the next option.

## Quick Revision

- Base case is required.
- Choose, explore, undo.
- Copy current path into result.
- Common for subsets and permutations.

