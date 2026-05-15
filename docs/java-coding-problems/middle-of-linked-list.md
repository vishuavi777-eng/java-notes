# Middle of Linked List

## Problem

Find the middle node of a singly linked list.

## Example

```text
Input: 1 -> 2 -> 3 -> 4 -> 5
Output: 3
```

## Approach

Use slow and fast pointers. Slow moves one step, fast moves two steps. When fast reaches the end, slow is at the middle.

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
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Using extra array unnecessarily.
- Null pointer error with `fast.next`.
- Not clarifying first or second middle for even length.

## Interview Answer

I use slow and fast pointers. Fast moves two nodes at a time, slow moves one node. When fast reaches the end, slow reaches the middle node.

## Quick Revision

- Pattern: Slow and fast pointers.
- Fast moves two steps.
- Slow becomes middle.
- Space is `O(1)`.

