# Tree Traversals

## Problem

Traverse a binary tree in inorder, preorder, and postorder.

## Example

```text
Tree:
    1
   / \
  2   3

Preorder: 1, 2, 3
Inorder: 2, 1, 3
Postorder: 2, 3, 1
```

## Approach

Use recursion. The order of root, left, and right decides traversal type.

## Java Code

```java
import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }
}

public class Solution {
    public List<Integer> inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorder(root, result);
        return result;
    }

    private void inorder(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        inorder(node.left, result);
        result.add(node.val);
        inorder(node.right, result);
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(h)` recursion stack, where `h` is tree height

## Common Traps

- Mixing traversal orders.
- Forgetting base case.
- Not understanding recursion stack.
- Confusing tree height with number of nodes.

## Interview Answer

Tree traversal visits every node in a specific order. Preorder is root-left-right, inorder is left-root-right, and postorder is left-right-root. Recursion is natural because each subtree follows the same logic.

## Quick Revision

- Preorder: root, left, right.
- Inorder: left, root, right.
- Postorder: left, right, root.
- Time is `O(n)`.

