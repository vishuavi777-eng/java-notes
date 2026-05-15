# Reverse Linked List

## Problem

Given the head of a singly linked list, reverse the list and return the new head.

## Example

```text
Input: 1 -> 2 -> 3 -> null
Output: 3 -> 2 -> 1 -> null
```

## Approach

Use three pointers: `previous`, `current`, and `next`. Reverse one link at a time.

## Java Code

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode previous = null;
        ListNode current = head;

        while (current != null) {
            ListNode next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        return previous;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Losing reference to the next node.
- Not updating head correctly.
- Creating new nodes unnecessarily.
- Not handling empty list or single node.

## Interview Answer

I iterate through the linked list and reverse pointers one by one. Before changing `current.next`, I store the next node. Then I point current node to previous node and move both pointers forward. At the end, previous becomes the new head.

## Quick Revision

- Pattern: Linked list pointer reversal.
- Store next before changing link.
- Return previous as new head.
- Space is `O(1)`.

