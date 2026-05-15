# Linked Lists

## Definition

A linked list stores elements as nodes where each node points to the next node.

## Why It Matters

Linked list problems test pointer handling, null checks, slow-fast pointer logic, and in-place manipulation.

## Core Example

To reverse a linked list, keep `prev`, `curr`, and `next` pointers and change links one by one.

## Common Traps

- Losing the next node while changing links.
- Not handling empty list.
- Not handling one-node list.
- Infinite loop in cycle problems.
- Forgetting to update head after reversal.

## Interview Answer

Linked lists are useful when frequent insertions and deletions are needed and direct index access is not required. In interviews, linked list problems usually focus on pointer movement and edge cases.

## Quick Revision

- Access by index is `O(n)`.
- Insert/delete after known node is `O(1)`.
- Use dummy node to simplify head changes.
- Use slow-fast pointers for middle and cycle.
- Reversal needs careful pointer updates.
- Always check null before `node.next`.

## Deep Dive

### Node Structure

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}
```

### Reverse Linked List

```java
ListNode reverse(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;

    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

Time: `O(n)`.

Space: `O(1)`.

### Slow and Fast Pointer

Use for:

- Find middle.
- Detect cycle.
- Find cycle start.

Cycle detection:

```java
boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}
```

### Dummy Node Pattern

Use when head may change.

```java
ListNode dummy = new ListNode(0);
dummy.next = head;
```

This makes delete/insert logic cleaner.

### Senior-Level Notes

Linked lists are not cache-friendly because nodes are scattered in memory. In real Java code, `ArrayList` is often faster for iteration and random access. Linked lists are still important in interviews because they test pointer reasoning.

