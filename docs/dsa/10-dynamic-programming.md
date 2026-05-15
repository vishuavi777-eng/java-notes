# Dynamic Programming

## Definition

Dynamic Programming (DP) solves problems by reusing results of overlapping subproblems.

## Why It Matters

DP is a senior-level interview filter because it tests pattern recognition, state design, recurrence, and optimization.

## Core Example

Fibonacci can be improved from exponential recursion to `O(n)` by storing previous results.

## Common Traps

- Starting with table before defining state.
- Wrong base cases.
- Confusing index meaning.
- Forgetting overlapping subproblems.
- Not explaining recurrence clearly.

## Interview Answer

Use DP when the problem has overlapping subproblems and optimal substructure. Define the state, write the recurrence, set base cases, choose top-down or bottom-up, then optimize space if possible.

## Quick Revision

- DP needs repeated subproblems.
- Define state first.
- Recurrence explains transition.
- Base cases stop or initialize.
- Memoization is top-down.
- Tabulation is bottom-up.

## Deep Dive

### DP Thinking Process

```text
1. What does dp[i] mean?
2. What smaller answers are needed?
3. What is the recurrence?
4. What are base cases?
5. What is final answer?
6. Can space be optimized?
```

### Fibonacci

```java
int fib(int n) {
    if (n <= 1) return n;

    int prev2 = 0;
    int prev1 = 1;

    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

Time: `O(n)`.

Space: `O(1)`.

### Common DP Patterns

#### 1D DP

Examples:

- Climbing stairs.
- House robber.
- Decode ways.

#### 2D DP

Examples:

- Grid paths.
- Longest common subsequence.
- Edit distance.

#### Knapsack

Examples:

- 0/1 knapsack.
- Subset sum.
- Partition equal subset sum.

#### Interval DP

Examples:

- Matrix chain multiplication.
- Burst balloons.

### Top-Down vs Bottom-Up

Top-down:

- Easier to write from recursion.
- Uses memo map/table.

Bottom-up:

- Often faster.
- Iterative.
- Space optimization is clearer.

### Senior-Level Notes

In interviews, DP is won by explaining state clearly. A correct recurrence with clean base cases matters more than jumping directly into code.

