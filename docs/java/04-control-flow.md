# Control Flow

## Definition

Control flow decides the order in which Java statements execute.

## Why It Matters

Control flow is needed for conditions, loops, branching, and reading output-based interview questions.

## Core Example

`if` chooses a branch, `for` repeats a block, and `break` exits a loop or switch.

## Common Traps

- `break` exits the nearest loop or switch.
- `continue` skips to the next loop iteration.
- Loop conditions are checked at specific times.
- Nested loops can make break/continue confusing.
- Unreachable code can cause compile errors.

## Interview Answer

Control flow statements control execution order. Java uses decision statements like `if` and `switch`, loops like `for`, `while`, and `do-while`, and jump statements like `break`, `continue`, and `return` to control how code runs.

## Quick Revision

- if/else chooses branches.
- switch selects matching case.
- for/while repeat code.
- break exits.
- continue skips current iteration.
- return exits method.

## Deep Dive

We’ll cover:

1️⃣ `if / else`
2️⃣ `switch`
3️⃣ Loops (`for`, `while`, `do-while`)
4️⃣ `break`, `continue`
5️⃣ Common Interview Traps

---

### 1️⃣ IF / ELSE

#### Basic

```java
if (condition) {
   // code
}
```

Condition must be **boolean**.

⚠ Java does NOT allow:

```java
if (1)   // ❌ Not allowed (C allows this)
```

---

#### 🔥 Interview Trap 1

```java
int x = 5;
if (x = 10) { }  // ❌
```

Why error?

Because:

* `x = 10` returns int
* if expects boolean

In C it works. In Java it doesn’t.

---

#### 🔥 Interview Trap 2: No Braces

```java
int x = 5;
if (x > 3)
    System.out.println("Hi");
    System.out.println("Hello");
```

Output:

```
Hi
Hello
```

Because only first statement is inside if.

Always use `{}` in real projects.

---

### 2️⃣ SWITCH

#### Basic

```java
int x = 2;

switch(x) {
    case 1:
        System.out.println("One");
        break;
    case 2:
        System.out.println("Two");
        break;
}
```

---

#### 🔥 Trap: Fall-through

```java
int x = 1;

switch(x) {
    case 1:
        System.out.println("One");
    case 2:
        System.out.println("Two");
}
```

Output:

```
One
Two
```

Because no `break`.

---

#### 🔥 Trap: Valid Types

Switch supports:

* byte
* short
* char
* int
* String
* enum

❌ Not allowed:

* long
* float
* double
* boolean

---

#### 🔥 Trap: Duplicate case

```java
final int x = 1;
switch(1) {
    case x:  // allowed (compile-time constant)
}
```

But:

```java
int x = 1;
case x;  // ❌ not constant
```

---

### 3️⃣ LOOPS

---

#### FOR Loop

```java
for(int i = 0; i < 3; i++) {
   System.out.println(i);
}
```

---

#### 🔥 Trap

```java
for(;;) {
   System.out.println("Hi");
}
```

Infinite loop.

All 3 parts optional.

---

#### WHILE

```java
while(condition) {
}
```

---

#### DO-WHILE

Runs at least once.

```java
do {
   System.out.println("Hi");
} while(false);
```

Output:

```
Hi
```

---

### 4️⃣ BREAK & CONTINUE

#### Break

Stops loop.

#### Continue

Skips current iteration.

---

#### 🔥 Trap

```java
for(int i = 0; i < 5; i++) {
    if(i == 2) continue;
    System.out.print(i);
}
```

Output:

```
0134
```

---

### 5️⃣ Labelled Break (Interview Trap)

```java
outer:
for(int i = 0; i < 3; i++) {
    for(int j = 0; j < 3; j++) {
        break outer;
    }
}
```

Exits both loops.

---

### ✅ Question 1 – Dangling Else

```java
int x = 0;
if (x > 0)
    if (x < 10)
        System.out.println("A");
    else
        System.out.println("B");
```

##### Rule:

👉 In Java, `else` always matches the **nearest unmatched if**.

So `else` belongs to:

```java
if (x < 10)
```

This is called the **Dangling Else Problem**.

In real code → always use braces `{}`.

---

### ✅ Question 2 – While with Semicolon

```java
int x = 0;
while(x++ < 3);
System.out.println(x);
```

Notice:

```java
while(x++ < 3);   // <-- semicolon
```

This is an **empty loop**.

Step-by-step:

* x=0 → 0<3 → true → x=1
* x=1 → 1<3 → true → x=2
* x=2 → 2<3 → true → x=3
* x=3 → 3<3 → false → x=4 (because post-increment happens)

Loop exits.

Final x = 4

Correct answer: **4**

---

### ✅ Question 3 – For Loop with Print in Update

```java
for(int i = 0; i < 3; System.out.print(i++));
```

Execution order in `for`:

```
Initialization
Condition
Body
Update
```

But body is empty because of semicolon.

So:

* i=0 → condition true → update prints 0 (i becomes 1)
* i=1 → condition true → update prints 1 (i becomes 2)
* i=2 → condition true → update prints 2 (i becomes 3)
* i=3 → condition false → stop

Output:

```
012
```

Correct.

---

### 🧠 You Are Strong in Control Flow

You are thinking clearly about:

* Semicolon traps
* Post increment behavior
* Loop evaluation order
* Dangling else

This is very good sign.

---


### ✅ Question 4 – Dangling Else

```java
int x = 0;
if (x > 0)
    if (x < 10)
        System.out.println("A");
    else
        System.out.println("B");
```

##### Rule:

👉 In Java, `else` always matches the **nearest unmatched if**.

So `else` belongs to:

```java
if (x < 10)
```

This is called the **Dangling Else Problem**.

In real code → always use braces `{}`.

---

### ✅ Question 5 – While with Semicolon

```java
int x = 0;
while(x++ < 3);
System.out.println(x);
```

Notice:

```java
while(x++ < 3);   // <-- semicolon
```

This is an **empty loop**.

Step-by-step:

* x=0 → 0<3 → true → x=1
* x=1 → 1<3 → true → x=2
* x=2 → 2<3 → true → x=3
* x=3 → 3<3 → false → x=4 (because post-increment happens)

Loop exits.

Final x = 4

Correct answer: **4**

---

### ✅ Question 6 – For Loop with Print in Update

```java
for(int i = 0; i < 3; System.out.print(i++));
```

Execution order in `for`:

```
Initialization
Condition
Body
Update
```

But body is empty because of semicolon.

So:

* i=0 → condition true → update prints 0 (i becomes 1)
* i=1 → condition true → update prints 1 (i becomes 2)
* i=2 → condition true → update prints 2 (i becomes 3)
* i=3 → condition false → stop

Output:

```
012
```

Correct.

---

### 🧠 You Are Strong in Control Flow

You are thinking clearly about:

* Semicolon traps
* Post increment behavior
* Loop evaluation order
* Dangling else

This is very good sign.

---

### ✅ Next: Nested Loops (Very Important)

Interviewers use nested loops to test:

* Understanding of iteration
* Dry run ability
* Time complexity thinking
* Pattern logic

---

### 📘 1️⃣ Basic Nested Loop

```java
for(int i = 0; i < 3; i++) {
    for(int j = 0; j < 3; j++) {
        System.out.print(i + "" + j + " ");
    }
}
```

##### Dry Run:

When i = 0:

* j = 0 → 00
* j = 1 → 01
* j = 2 → 02

When i = 1:

* 10 11 12

When i = 2:

* 20 21 22

##### Output:

```
00 01 02 10 11 12 20 21 22
```

---

### 📘 2️⃣ Classic Pattern Trap

Predict output:

```java
for(int i = 1; i <= 3; i++) {
    for(int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}
```

Think step-by-step.

---

### 📘 3️⃣ Time Complexity Insight

Nested loops like:

```java
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
    }
}
```

Time complexity = **O(n²)**

But this:

```java
for(int i = 0; i < n; i++) {
    for(int j = 0; j < i; j++) {
    }
}
```

Time complexity =
1 + 2 + 3 + ... + n
= n(n+1)/2
= **O(n²)** (still quadratic)

Interviewers love asking this.

---

Now let’s quickly verify like interview dry-run style.

---

### ✅ Pattern 1

```java
for(int i = 1; i <= 3; i++) {
    for(int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}
```

i = 1 → print 1 star
i = 2 → print 2 stars
i = 3 → print 3 stars

So:

```
*
**
***
```

Correct.

---

### ✅ Pattern 2

```java
for(int i = 3; i >= 1; i--) {
    for(int j = 1; j <= i; j++) {
        System.out.print(j);
    }
    System.out.println();
}
```

i = 3 → 1 2 3
i = 2 → 1 2
i = 1 → 1

So:

```
123
12
1
```

Correct.

---

### 🧠 Interview Insight

Nested loops are testing:

* Control of outer loop
* Resetting inner loop each iteration
* Understanding loop boundaries

---

### Let’s Confirm (Interview Dry Run)

```java
for(int i = 1; i <= 3; i++) {
    for(int j = i; j <= 3; j++) {
        System.out.print(j);
    }
    System.out.println();
}
```

---

##### i = 1

j starts at 1 → prints 1 2 3

```
123
```

---

##### i = 2

j starts at 2 → prints 2 3

```
23
```

---

##### i = 3

j starts at 3 → prints 3

```
3
```

---

### 🧠 Why This Is Important

Interviewers use this to test:

* Inner loop start value depends on outer loop
* Changing bounds changes pattern
* Understanding triangular iteration (used in DSA often)

---


### Code

```java
for(int i = 1; i <= 3; i++) {
    for(int j = 1; j <= 3; j++) {
        if(i == j)
            break;
        System.out.print(i + "" + j + " ");
    }
}
```

#### Dry run

##### i = 1

* j = 1 → i == j → **break**
  (no print)

##### i = 2

* j = 1 → i != j → print **21**
* j = 2 → i == j → break

##### i = 3

* j = 1 → print **31**
* j = 2 → print **32**
* j = 3 → break

✅ Output:

```
21 31 32
```

---


### Let’s Dry Run (Interview Style)

```java
for(int i = 1; i <= 3; i++) {
    for(int j = 1; j <= 3; j++) {
        if(i == j)
            continue;
        System.out.print(i + "" + j + " ");
    }
}
```

---

#### i = 1

* j = 1 → skip (continue)
* j = 2 → print 12
* j = 3 → print 13

---

#### i = 2

* j = 1 → print 21
* j = 2 → skip
* j = 3 → print 23

---

#### i = 3

* j = 1 → print 31
* j = 2 → print 32
* j = 3 → skip

---

✅ Final Output:

```
12 13 21 23 31 32
```

---

### 🧠 Key Difference (Interview Gold)

| break                       | continue                |
| --------------------------- | ----------------------- |
| exits loop                  | skips current iteration |
| stops inner loop completely | moves to next iteration |

---





