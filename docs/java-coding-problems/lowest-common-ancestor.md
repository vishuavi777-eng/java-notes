# Lowest Common Ancestor

## Problem

Find the lowest common ancestor of two nodes in a binary tree.

## Example

```text
For nodes 5 and 1, LCA is 3.
```

## Approach

Use recursion. If current node is null, `p`, or `q`, return it. Search left and right. If both sides return non-null, current node is LCA.

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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {
            return root;
        }

        return left != null ? left : right;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(h)` recursion stack

## Common Traps

- Confusing binary tree LCA with BST LCA.
- Comparing values instead of node references.
- Not handling null subtree.

## Interview Answer

I search both left and right subtrees recursively. If both sides return a node, current node is the lowest common ancestor. If only one side returns a node, I pass that result upward.

## Quick Revision

- Pattern: Tree recursion.
- Return root if root is `p` or `q`.
- Both sides non-null means LCA.
- Time is `O(n)`.

