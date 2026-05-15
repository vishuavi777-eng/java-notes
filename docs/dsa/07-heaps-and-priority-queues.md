# Heaps and Priority Queues

## Definition

A heap is a tree-based structure where the highest or lowest priority element can be accessed quickly. Java uses `PriorityQueue` for heap behavior.

## Why It Matters

Heaps are useful for top K problems, scheduling, merging sorted data, and shortest path algorithms.

## Core Example

To find the k largest numbers, keep a min-heap of size `k`.

## Common Traps

- Java `PriorityQueue` is a min-heap by default.
- Iterating a PriorityQueue does not produce sorted order.
- Polling repeatedly gives priority order.
- Top K can use min-heap or max-heap depending on direction.
- Comparator mistakes can break ordering.

## Interview Answer

A priority queue returns the smallest or highest-priority item first. In Java, `PriorityQueue` is a min-heap by default. It gives `O(log n)` insert and remove, and `O(1)` peek.

## Quick Revision

- Min-heap gives smallest first.
- Java PriorityQueue is min-heap.
- Use comparator for max-heap.
- `offer` is `O(log n)`.
- `poll` is `O(log n)`.
- `peek` is `O(1)`.

## Deep Dive

### Java Min-Heap

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
```

### Java Max-Heap

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
```

### Top K Largest

```java
List<Integer> topK(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();

    for (int x : nums) {
        heap.offer(x);
        if (heap.size() > k) {
            heap.poll();
        }
    }

    return new ArrayList<>(heap);
}
```

Time: `O(n log k)`.

Space: `O(k)`.

### Merge K Sorted Lists

Use a min-heap containing the current node from each list.

This gives:

```text
O(n log k)
```

where `n` is total nodes and `k` is number of lists.

### Senior-Level Notes

Use heaps when you only need the next best item, not a fully sorted list.

If you need all items sorted, sorting may be simpler. If you need repeated priority extraction, a heap is better.

