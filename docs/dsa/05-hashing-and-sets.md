# Hashing and Sets

## Definition

Hashing maps a key to an index or bucket. A set stores unique values.

## Why It Matters

Hashing is one of the most useful tools for improving brute-force solutions from `O(n^2)` to `O(n)`.

## Core Example

Two Sum can store visited values in a HashMap and find the complement in constant average time.

## Common Traps

- Forgetting duplicates.
- Confusing HashMap keys and values.
- Assuming HashMap is sorted.
- Ignoring collision behavior.
- Using mutable objects as keys without stable `equals()` and `hashCode()`.

## Interview Answer

HashMap and HashSet provide average `O(1)` insert, lookup, and delete. They are useful when we need fast membership checks, frequency counting, duplicate detection, or key-value lookup.

## Quick Revision

- HashSet checks existence.
- HashMap stores key-value pairs.
- Average operations are `O(1)`.
- Worst case depends on collisions.
- Keys need correct `equals()` and `hashCode()`.
- Not sorted by default.

## Deep Dive

### Frequency Map

```java
Map<Character, Integer> freq = new HashMap<>();
for (char ch : s.toCharArray()) {
    freq.put(ch, freq.getOrDefault(ch, 0) + 1);
}
```

Use for:

- Anagrams.
- Counting occurrences.
- Majority element variants.
- First unique character.

### Two Sum

```java
int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> indexByValue = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (indexByValue.containsKey(need)) {
            return new int[] { indexByValue.get(need), i };
        }
        indexByValue.put(nums[i], i);
    }
    return new int[] { -1, -1 };
}
```

### Set for Duplicate Detection

```java
boolean hasDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int x : nums) {
        if (!seen.add(x)) return true;
    }
    return false;
}
```

### Hashing vs Sorting

Hashing:

- Usually `O(n)` time.
- Uses extra memory.
- Does not preserve sorted order.

Sorting:

- Usually `O(n log n)` time.
- Can reduce extra memory.
- Useful when order helps.

### Senior-Level Notes

In Java, custom HashMap keys must implement consistent `equals()` and `hashCode()`.

If `a.equals(b)` is true, then `a.hashCode()` must equal `b.hashCode()`.

