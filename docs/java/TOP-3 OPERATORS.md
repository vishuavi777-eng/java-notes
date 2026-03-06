# 📚 Operators In Java

We will cover:

1. Increment / Decrement (`++`, `--`)
2. Short-circuit operators (`&&`, `||`)
3. Ternary operator (`?:`)
4. Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`)

Step by step. No confusion.

---

# 1️⃣ Increment / Decrement (`++`, `--`)

## Two Types

* Pre-increment → `++x`
* Post-increment → `x++`

---

## 🔥 Difference

### Post-increment

```java
int x = 5;
int y = x++;
```

Step-by-step:

* y = 5
* then x becomes 6

Final:

```
x = 6
y = 5
```

---

### Pre-increment

```java
int x = 5;
int y = ++x;
```

Step-by-step:

* x becomes 6
* y = 6

Final:

```
x = 6
y = 6
```

---

## 🔥 Dangerous Interview Trap

Predict:

```java
int x = 5;
System.out.println(x++ + ++x);
```

Solve carefully.

Step-by-step:

1. x++ → 5 (then x becomes 6)
2. ++x → x becomes 7, value 7
3. 5 + 7 = 12

Final x = 7

Output:

```
12
```

---

⚠ Interview tip:
Avoid writing such confusing code in real projects.

---

# 2️⃣ Short-Circuit Operators (`&&`, `||`)

## Logical AND

```java
if (a > 5 && b > 10)
```

If first condition is false → second NOT evaluated.

---

## Example

```java
int x = 5;
if (x > 10 && ++x > 6) {
}
System.out.println(x);
```

Since `x > 10` is false → `++x` never executes.

Output:

```
5
```

---

## Difference Between `&&` and `&`

`&&` → short-circuit
`&` → evaluates both sides always

Same for:

`||` vs `|`

---

## 🔥 Interview Trap

```java
int x = 0;
if (true || ++x > 0) {
}
System.out.println(x);
```

Output?

`true || anything` → second not evaluated

Output:

```
0
```

---

# 3️⃣ Ternary Operator (`?:`)

Syntax:

```java
condition ? value1 : value2;
```

Example:

```java
int x = 10;
String result = (x > 5) ? "Big" : "Small";
```

---

## 🔥 Trap

```java
int x = 10;
System.out.println(x > 5 ? x++ : x--);
System.out.println(x);
```

Step-by-step:

* condition true
* prints 10 (post-increment)
* x becomes 11

Final output:

```
10
11
```

---

# 4️⃣ Bitwise Operators

Used at binary level.

---

## `&` AND

## `|` OR

## `^` XOR

## `~` NOT

## `<<` Left shift

## `>>` Right shift

## `>>>` Unsigned right shift

---

## Example

```java
System.out.println(5 & 3);
```

Binary:

```
5 = 0101
3 = 0011
--------------
    0001 = 1
```

Output:

```
1
```

---

## Left Shift

```java
System.out.println(5 << 1);
```

Binary:

```
0101 << 1 = 1010
```

Result:

```
10
```

Means:
`5 * 2`

---

## Right Shift

```java
System.out.println(8 >> 1);
```

Binary:

```
1000 >> 1 = 0100
```

Result:

```
4
```

Means:
`8 / 2`

---

# Code

```java
int x = 10;
int y = x++ + ++x + x++;
System.out.println(y);
System.out.println(x);
```

---

# Step-by-Step Execution (Left → Right Evaluation)

Java evaluates operands **left to right**.

Initial:

```
x = 10
```

---

### 1️⃣ First term → `x++`

Post-increment:

* Use current value → 10
* Then increment

After this:

```
Value used = 10
x = 11
```

---

### 2️⃣ Second term → `++x`

Pre-increment:

* Increment first → x = 12
* Then use value → 12

After this:

```
Value used = 12
x = 12
```

---

### 3️⃣ Third term → `x++`

Post-increment:

* Use current value → 12
* Then increment

After this:

```
Value used = 12
x = 13
```

---

### Final Calculation

```
y = 10 + 12 + 12
y = 34
```

Final:

```
x = 13
```

---

# ✅ Output

```
34
13
```

---

# ⚠ Interview Insight

Interviewers use this to test:

* Pre vs post increment understanding
* Left-to-right evaluation
* Side effects in expressions

And important:

👉 In real projects, **never write such code**.
It reduces readability and increases bugs.

---

# Code

```java
int x = 5;
int y = x++ + x++ + ++x;
System.out.println(y);
System.out.println(x);
```

---

# Step-by-step (Left → Right)

Initial:

```
x = 5
```

---

### 1️⃣ First term → `x++`

* Use value → 5
* Then increment → x becomes 6

Used value = 5
x = 6

---

### 2️⃣ Second term → `x++`

* Use value → 6
* Then increment → x becomes 7

Used value = 6
x = 7

---

### 3️⃣ Third term → `++x`

* Increment first → x becomes 8
* Use value → 8

Used value = 8
x = 8

---

# Final Calculation

```
y = 5 + 6 + 8
y = 19
```

Final:

```
x = 8
```

---

# ✅ Output

```
19
8
```

---

# 🔥 Interview Insight

If interviewer asks:

> What is rule for expression evaluation in Java?

Answer:

> Java evaluates expressions strictly from left to right. Side effects like post and pre-increment happen during evaluation in that order.

---


# Code

```java
int x = 5;
System.out.println(x++ + x++ + x++);
System.out.println(x);
```

---

# Step-by-step (Left → Right)

Initial:

```
x = 5
```

---

### 1️⃣ First `x++`

* Use 5
* Then x becomes 6

Used = 5
x = 6

---

### 2️⃣ Second `x++`

* Use 6
* Then x becomes 7

Used = 6
x = 7

---

### 3️⃣ Third `x++`

* Use 7
* Then x becomes 8

Used = 7
x = 8

---

# Final Calculation

```
5 + 6 + 7 = 18
```

Final:

```
x = 8
```

---

# ✅ Output

```
18
8
```

---

# 🧠 Important Interview Note

Java guarantees:

* Left-to-right operand evaluation.
* Post-increment returns old value, then increments.

This is defined behavior (unlike C/C++ where this can be undefined).

---

# Code

```java
int x = 1;
int y = 1;

if (x++ == 1 && ++y == 2) {
    x++;
}

System.out.println(x);
System.out.println(y);
```

---

# Step-by-Step Execution

Initial:

```
x = 1
y = 1
```

---

## 1️⃣ Evaluate: `x++ == 1`

* `x++` → use 1
* then x becomes 2
* 1 == 1 → true

Now:

```
x = 2
y = 1
```

Since first condition is **true**, second condition will be evaluated (`&&` needs both true).

---

## 2️⃣ Evaluate: `++y == 2`

* `++y` → y becomes 2
* 2 == 2 → true

Now:

```
x = 2
y = 2
```

Both conditions true → enter `if` block.

---

## 3️⃣ Inside if:

```java
x++;
```

* Use 2
* x becomes 3

Now:

```
x = 3
y = 2
```

---

# ✅ Final Output

```
3
2
```

---

# 🧠 What Interviewer Tests Here

* Post vs pre increment
* Short-circuit `&&`
* Evaluation order (left → right)
* Side effects inside condition

---

# Code

```java id="zky2lk"
int x = 1;
int y = 1;

if (x++ == 2 && ++y == 2) {
    x++;
}

System.out.println(x);
System.out.println(y);
```

---

## Step-by-step

Initial:

* x = 1
* y = 1

### 1️⃣ Evaluate `x++ == 2`

* `x++` uses 1, then x becomes 2
* `1 == 2` → **false**

Now:

* x = 2
* y = 1

### 2️⃣ Short-circuit happens

Because first part of `&&` is false, Java **will not evaluate** `++y == 2`.

So:

* y stays 1
* `if` block not executed

✅ Final output:

* 2
* 1

---

# Code

```java
int x = 10;
int y = 20;

int z = (x > y) ? x++ : y++;
System.out.println(z);
System.out.println(x);
System.out.println(y);
```

---

## Step-by-step

### Condition:

```java
x > y
```

10 > 20 → **false**

So ternary chooses the **false branch**:

```java
y++
```

---

### Evaluate `y++`

* Use current value → 20
* Then increment → y becomes 21

So:

```
z = 20
y = 21
```

`x` was never touched.

---

# ✅ Final State

```
z = 20
x = 10
y = 21
```

---

# 🧠 Important Interview Insight

In ternary operator:

👉 Only ONE branch executes.
👉 The other branch is completely ignored.

Unlike `if` statements where confusion sometimes happens with side effects, ternary is strictly one branch execution.

---

# Code

```java
int x = 5;
int y = 10;

System.out.println(x > y ? x++ : ++y);
System.out.println(x);
System.out.println(y);
```

---

## Step 1: Evaluate condition

```
x > y
5 > 10 → false
```

So ternary chooses **false branch**:

```
++y
```

---

## Step 2: Evaluate `++y`

Pre-increment:

* y becomes 11
* value used = 11

So first print:

```
11
```

Now:

```
x = 5
y = 11
```

---

## Step 3: Print x and y

```
5
11
```

---

# ✅ Final Output

```
11
5
11
```

---

# 🧠 What Interviewer Is Testing

* Only one branch executes
* Pre-increment changes value before usage
* Order of evaluation

---

# Code

```java
int x = 3;
int y = 4;

if ((x & 1) == 1 && (y++ > 3)) {
    x++;
}

System.out.println(x);
System.out.println(y);
```

---

## 1️⃣ Evaluate `(x & 1) == 1`

* `x = 3` → binary `0011`
* `1` → binary `0001`
* `3 & 1` → `0001` → **1**

So:

```text
(x & 1) == 1  →  true
```

Meaning: x is **odd** (common trick to check odd/even).

---

## 2️⃣ Because first part is true, evaluate second part

`(y++ > 3)`

* y++ uses current value 4
* checks `4 > 3` → true
* then y becomes 5

So the full `&&` becomes:

```text
true && true → true
```

So `if` block runs.

---

## 3️⃣ Inside if: `x++;`

x becomes 4.

Final:

* x = 4
* y = 5

✅ Output:

```text
4
5
```

---

# 📘 Notes (Important Interview Lines)

* `x & 1` checks odd/even:

  * 1 → odd
  * 0 → even
* `&&` short-circuits, but here it didn’t short-circuit because first condition was true.
* `y++` changes `y` even if condition is true/false depending on whether that side executes.

---


```java
int x = 0;
int y = 0;

if (x++ == 0 & y++ == 0) { }
System.out.println(x);
System.out.println(y);
```

## Key point: `&` is **NOT short-circuit**

Even in boolean expressions, single `&` evaluates **both sides**.

### Left side: `x++ == 0`

* uses x=0 → true
* then x becomes 1

### Right side: `y++ == 0`

* still evaluated because `&`
* uses y=0 → true
* then y becomes 1

So:

* x = 1
* y = 1

---

# 📘 Notes line (important)

* `&&` short-circuit: may skip right side
* `&` evaluates both sides always (even in boolean)

---


# 📘 Bitwise Shifts in Java (`<<`, `>>`, `>>>`)

## 1️⃣ What they do (Interview style)

* `<<` **Left shift**: shifts bits left, fills right with `0`
* `>>` **Signed right shift**: shifts bits right, fills left with **sign bit** (`0` for +, `1` for -)
* `>>>` **Unsigned right shift**: shifts bits right, fills left with `0` always

---

## 2️⃣ Quick rules (must remember)

### For positive numbers:

* `>>` and `>>>` behave the same (both fill with 0)

### For negative numbers:

* `>>` keeps negative sign (fills 1 on left)
* `>>>` makes it “look positive” (fills 0 on left)

---

## 3️⃣ Easy examples (positive)

### `5 << 1`

`5` in binary (8-bit view): `00000101`
Shift left 1 → `00001010` = `10`

So:

```java
5 << 1  => 10
```

### `8 >> 1`

`8`: `00001000`
Right shift 1 → `00000100` = `4`

So:

```java
8 >> 1  => 4
```

---

## 4️⃣ The BIG Interview Trap: negative numbers

### Example: `-4 >> 1`

Two’s complement (conceptually):

* `-4` ends with bits `...11111100`

Signed right shift `>> 1` fills with **1** (sign bit):

* result becomes `...11111110` which is `-2`

✅ So:

```java
-4 >> 1   => -2
```

### Example: `-4 >>> 1`

Unsigned right shift fills with **0**:

* left side becomes 0-filled
* result becomes a **large positive int**

✅ So:

```java
-4 >>> 1  => 2147483646
```

Why that number?

* For `int` (32-bit), `-4` is `0xFFFFFFFC`
* `>>> 1` → `0x7FFFFFFE` = **2147483646**

---

## 5️⃣ Another common trap: shift count masking

Java masks the shift distance:

* For `int`: only lower **5 bits** used → `n & 31` (0–31)
* For `long`: only lower **6 bits** used → `n & 63` (0–63)

So:

```java
1 << 32   // same as 1 << (32 & 31) = 1 << 0 = 1
```

This surprises many people.

---

## 6️⃣ When shifts act like multiply/divide

* `x << 1` ≈ `x * 2`
* `x >> 1` ≈ `x / 2` (for positives)

⚠ For negatives, `>>` is like divide-by-2 with rounding toward **negative infinity** behavior depending on bits. Safer to say: “it shifts bits; division equivalence is not always safe for negatives.”

---

# ✅ Bitwise shift “How to answer in interview”

> `<<` shifts left and fills zeros. `>>` shifts right and preserves the sign bit (arithmetic shift). `>>>` shifts right and fills zeros (logical shift), so for negative numbers it produces a large positive value.

---

# 📘 Operator Precedence Table (Interview-focused)

Highest → Lowest (common ones)

1. **Postfix**: `expr++` `expr--` `()` `[]` `.`
2. **Unary**: `++expr` `--expr` `+` `-` `!` `~` `(type)`
3. **Multiplicative**: `*` `/` `%`
4. **Additive**: `+` `-`
5. **Shift**: `<<` `>>` `>>>`
6. **Relational**: `<` `<=` `>` `>=` `instanceof`
7. **Equality**: `==` `!=`
8. **Bitwise AND**: `&`
9. **Bitwise XOR**: `^`
10. **Bitwise OR**: `|`
11. **Logical AND**: `&&`
12. **Logical OR**: `||`
13. **Ternary**: `?:`
14. **Assignment**: `=` `+=` `-=` `*=` `/=` `&=` `|=` `^=` `<<=` `>>=` `>>>=`

### Golden note:

* Same precedence operators evaluate **left to right**
  (except assignments are **right to left**)

---

# 🔥 Quick traps (tiny but powerful)

## Trap 1: `+` vs `<<`

```java
System.out.println(1 << 2 + 1);
```

`+` happens before `<<`
So it becomes `1 << 3` = **8**

## Trap 2: `&` vs `==`

```java
System.out.println(1 & 2 == 0);
```

`==` happens before `&`? Actually: **`&` has lower precedence than `==`**, so `2 == 0` evaluated first? Wait carefully:

* Precedence: **Equality (==)** is higher than **bitwise AND (&)** ✅
  So expression becomes:

```java
1 & (2 == 0)  // invalid: int & boolean
```

➡️ This does **NOT compile**.

Correct way:

```java
System.out.println((1 & 2) == 0); // true
```

---

# ✅ Your Notes Snapshot (copy-paste)

* `>>` keeps sign bit, `>>>` fills 0
* `-4 >> 1 = -2`
* `-4 >>> 1 = 2147483646`
* int shift distance masked by `& 31`

---


### ✅ Question 1

```java
System.out.println(1 << 2 + 1);
```

You answered **8** ✔ Correct.

Because:

* `2 + 1 = 3`
* `1 << 3 = 8`

---

### ✅ Question 2

```java
System.out.println(-1 >>> 1);
```

Let me explain quickly and finish this topic cleanly.

* `-1` in 32-bit binary = all 1s

  ```
  11111111 11111111 11111111 11111111
  ```

* `>>> 1` shifts right and fills left with **0**

So result becomes:

```
01111111 11111111 11111111 11111111
```

That equals:

```
2147483647
```

So answer is:

> 2147483647

---

# ✅ Operators Topic – Completed

You now clearly understand:

* Pre vs Post increment
* Short-circuit vs &
* Ternary
* Bitwise basics
* Shift traps
* Precedence basics

That’s strong.
