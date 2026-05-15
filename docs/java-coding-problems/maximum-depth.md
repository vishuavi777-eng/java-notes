# Maximum Depth of Binary Tree

## Problem

Find the maximum depth or height of a binary tree.

## Example

```text
Tree:
    1
   / \
  2   3
 /
4

Output: 3
```

## Approach

Use recursion. The depth of a node is `1 + max(left depth, right depth)`.

## Java Code

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }
}

public class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(h)` recursion stack

## Common Traps

- Returning `1` for null.
- Forgetting to add `1` for current node.
- Confusing depth and number of edges.

## Interview Answer

I calculate depth recursively. For each node, I find the depth of left and right subtree, take the maximum, and add one for the current node.

## Quick Revision

- Pattern: Tree recursion.
- Null depth is `0`.
- Return `1 + max(left, right)`.
- Time is `O(n)`.

