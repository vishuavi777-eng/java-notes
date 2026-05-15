# Stacks and Queues

## Definition

A stack follows Last In First Out (LIFO). A queue follows First In First Out (FIFO).

## Why It Matters

Stacks and queues are used in parsing, BFS, monotonic problems, undo systems, scheduling, and expression evaluation.

## Core Example

Use a stack to check balanced parentheses. Push opening brackets and pop when a matching closing bracket appears.

## Common Traps

- Using legacy `Stack` instead of `ArrayDeque`.
- Forgetting empty-stack checks.
- Mixing queue and stack ordering.
- Not recognizing monotonic stack problems.
- Using recursion when an explicit stack is safer.

## Interview Answer

Stack is useful when the most recent item must be processed first. Queue is useful when the earliest item must be processed first. In Java, prefer `ArrayDeque` for stack and queue behavior unless a specific concurrent queue is needed.

## Quick Revision

- Stack: LIFO.
- Queue: FIFO.
- Use `ArrayDeque` in Java.
- BFS uses queue.
- DFS can use stack.
- Monotonic stack solves next greater/smaller problems.

## Deep Dive

### Java Choice

Prefer:

```java
Deque<Integer> stack = new ArrayDeque<>();
Queue<Integer> queue = new ArrayDeque<>();
```

Avoid old `Stack` for normal interview code.

### Balanced Parentheses

```java
boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();

    for (char ch : s.toCharArray()) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
        } else {
            if (stack.isEmpty()) return false;
            char open = stack.pop();
            if (ch == ')' && open != '(') return false;
            if (ch == ']' && open != '[') return false;
            if (ch == '}' && open != '{') return false;
        }
    }
    return stack.isEmpty();
}
```

### Monotonic Stack

Use when you need next greater or next smaller element.

Example problem:

```text
For each element, find the next greater element on the right.
```

Idea:

- Keep a stack of unresolved indexes.
- When current value is greater than stack top, resolve it.

### Queue for BFS

```java
Queue<TreeNode> queue = new ArrayDeque<>();
queue.offer(root);

while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
}
```

### Senior-Level Notes

Use `BlockingQueue` for thread coordination. Use `PriorityQueue` for ordered processing. Use `ArrayDeque` for normal stack/queue interview problems.

