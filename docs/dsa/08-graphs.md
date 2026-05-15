# Graphs

## Definition

A graph is a set of nodes connected by edges.

## Why It Matters

Graphs model networks, dependencies, routes, permissions, recommendations, and many system design problems.

## Core Example

Use BFS to find the shortest path in an unweighted graph.

## Common Traps

- Forgetting visited set.
- Infinite loops in cyclic graphs.
- Confusing directed and undirected edges.
- Using DFS for shortest path in unweighted graph when BFS is needed.
- Not handling disconnected components.

## Interview Answer

Graph problems usually need a representation, traversal, and visited tracking. Use BFS for shortest path in unweighted graphs, DFS for connected components and cycle exploration, topological sort for dependencies, and Dijkstra for weighted shortest paths with non-negative weights.

## Quick Revision

- Graph has vertices and edges.
- Use adjacency list for most problems.
- BFS uses queue.
- DFS uses recursion or stack.
- Topological sort works on DAG.
- Dijkstra needs non-negative weights.

## Deep Dive

### Graph Representation

Adjacency list:

```java
Map<Integer, List<Integer>> graph = new HashMap<>();
```

Build undirected graph:

```java
graph.computeIfAbsent(a, k -> new ArrayList<>()).add(b);
graph.computeIfAbsent(b, k -> new ArrayList<>()).add(a);
```

### BFS

```java
void bfs(int start, Map<Integer, List<Integer>> graph) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new ArrayDeque<>();

    visited.add(start);
    queue.offer(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int next : graph.getOrDefault(node, List.of())) {
            if (visited.add(next)) {
                queue.offer(next);
            }
        }
    }
}
```

### DFS

```java
void dfs(int node, Map<Integer, List<Integer>> graph, Set<Integer> visited) {
    if (!visited.add(node)) return;

    for (int next : graph.getOrDefault(node, List.of())) {
        dfs(next, graph, visited);
    }
}
```

### Topological Sort

Use for dependency order.

Examples:

- Course schedule.
- Build order.
- Task dependencies.

Kahn algorithm:

```text
1. Count indegree for every node.
2. Push nodes with indegree 0 into queue.
3. Remove node, reduce neighbors indegree.
4. If all nodes processed, no cycle.
```

### Dijkstra

Use when:

- Graph has weights.
- Weights are non-negative.
- Need shortest path.

Uses priority queue.

### Senior-Level Notes

For large graphs, recursion may overflow the stack. Use iterative DFS or BFS. In production, graph traversal also needs limits, timeouts, and memory awareness.

