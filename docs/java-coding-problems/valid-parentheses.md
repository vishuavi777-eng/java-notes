# Valid Parentheses

## Problem

Given a string containing brackets, check whether the brackets are valid.

## Example

```text
Input: "()[]{}"
Output: true
```

```text
Input: "([)]"
Output: false
```

## Approach

Use a stack. Push opening brackets. For closing brackets, check if the top of stack has the matching opening bracket.

## Java Code

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) {
                    return false;
                }

                char top = stack.pop();
                if ((ch == ')' && top != '(')
                        || (ch == '}' && top != '{')
                        || (ch == ']' && top != '[')) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Common Traps

- Not checking empty stack before pop.
- Forgetting to check stack is empty at the end.
- Matching bracket type incorrectly.
- Using `Stack` class instead of `Deque`.

## Interview Answer

I use a stack because the last opened bracket should be closed first. I push opening brackets. When I find a closing bracket, I pop and check whether it matches. At the end, the stack should be empty.

## Quick Revision

- Pattern: Stack.
- Last open bracket closes first.
- Check empty before pop.
- Final stack must be empty.

