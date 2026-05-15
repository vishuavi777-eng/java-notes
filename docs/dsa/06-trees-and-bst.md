# Trees and Binary Search Trees

## Definition

A tree is a hierarchical data structure. A binary tree has at most two children per node. A binary search tree (BST) keeps left values smaller and right values larger.

## Why It Matters

Trees test recursion, traversal, divide-and-conquer thinking, and hierarchical data modeling.

## Core Example

Inorder traversal of a valid BST returns values in sorted order.

## Common Traps

- Confusing binary tree with BST.
- Checking only parent-child relation instead of full BST range.
- Forgetting null base case.
- Ignoring recursion stack space.
- Using BFS when DFS is simpler, or the reverse.

## Interview Answer

Trees are useful for hierarchical data. Common operations use DFS recursion or BFS queue traversal. For BST problems, always maintain valid min and max bounds, not only local parent comparison.

## Quick Revision

- DFS: preorder, inorder, postorder.
- BFS: level order.
- BST inorder gives sorted order.
- Height affects performance.
- Balanced BST operations are `O(log n)`.
- Skewed BST can become `O(n)`.

## Deep Dive

### Tree Node

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }
}
```

### DFS Traversals

Preorder:

```text
root, left, right
```

Inorder:

```text
left, root, right
```

Postorder:

```text
left, right, root
```

### Recursive Inorder

```java
void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);
    inorder(root.right, result);
}
```

### Level Order BFS

```java
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}
```

### Validate BST

```java
boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

boolean valid(TreeNode node, long low, long high) {
    if (node == null) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val)
        && valid(node.right, node.val, high);
}
```

### Senior-Level Notes

Balanced trees keep operations efficient. Java `TreeMap` and `TreeSet` are tree-based sorted collections with `O(log n)` operations.

