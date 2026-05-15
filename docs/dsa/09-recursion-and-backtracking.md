# Recursion and Backtracking

## Definition

Recursion is a function calling itself. Backtracking is recursion with choices, exploration, and undoing choices.

## Why It Matters

Many tree, graph, subset, permutation, and search problems are naturally recursive.

## Core Example

Generating all subsets means deciding for each element: include it or skip it.

## Common Traps

- Missing base case.
- Infinite recursion.
- Forgetting to undo a choice.
- Sharing mutable lists incorrectly.
- Ignoring recursion stack space.

## Interview Answer

Recursion solves a problem by reducing it into smaller versions of itself. Backtracking uses recursion to explore possible choices and undo choices when returning. It is useful when we need all combinations, permutations, subsets, or valid configurations.

## Quick Revision

- Base case stops recursion.
- Recursive case reduces problem.
- Backtracking makes a choice, explores, then undoes.
- Recursion stack uses memory.
- Use copies when storing current path.
- Prune invalid paths early.

## Deep Dive

### Recursion Template

```java
void solve(state) {
    if (baseCase) {
        recordAnswer();
        return;
    }

    for (choice : choices) {
        makeChoice(choice);
        solve(nextState);
        undoChoice(choice);
    }
}
```

### Subsets

```java
List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

void backtrack(int[] nums, int index, List<Integer> path, List<List<Integer>> result) {
    if (index == nums.length) {
        result.add(new ArrayList<>(path));
        return;
    }

    backtrack(nums, index + 1, path, result);

    path.add(nums[index]);
    backtrack(nums, index + 1, path, result);
    path.remove(path.size() - 1);
}
```

### Permutations

Use:

- `used[]` array.
- Current path.
- Add answer when path size equals input size.

### Backtracking vs DFS

DFS is traversal.

Backtracking is DFS with state changes and undo logic.

### Senior-Level Notes

Backtracking often has exponential complexity. Mention pruning when possible.

Examples:

- Stop when partial sum exceeds target.
- Sort input to skip duplicates.
- Validate partial board early in Sudoku/N-Queens.

