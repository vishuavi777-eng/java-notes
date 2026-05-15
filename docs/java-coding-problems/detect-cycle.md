# Detect Cycle in Linked List

## Problem

Check whether a linked list has a cycle.

## Example

```text
1 -> 2 -> 3 -> 4
     ^         |
     |_________|
Output: true
```

## Approach

Use Floyd's cycle detection algorithm. Slow pointer moves one step and fast pointer moves two steps. If they meet, cycle exists.

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
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Common Traps

- Comparing node values instead of node references.
- Null pointer error with fast pointer.
- Using HashSet when constant space is expected.

## Interview Answer

I use slow and fast pointers. If there is a cycle, the fast pointer will eventually meet the slow pointer. If fast reaches null, there is no cycle.

## Quick Revision

- Pattern: Floyd cycle detection.
- Compare node references.
- Fast moves two steps.
- Space is `O(1)`.

