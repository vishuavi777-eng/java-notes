# 📘 METHODS & STACK FRAMES

We will cover:

1️⃣ What happens when a method is called
2️⃣ Stack memory structure
3️⃣ Stack Frame creation
4️⃣ Pass-by-value (big confusion area)
5️⃣ Recursion stack behavior
6️⃣ Interview traps

---

# 1️⃣ What Happens When a Method is Called?

Example:

```java
public class Test {
    public static void main(String[] args) {
        int x = 5;
        int result = add(x);
        System.out.println(result);
    }

    static int add(int num) {
        return num + 10;
    }
}
```

---

## Step-by-Step Execution

### 🧠 Step 1: Program starts

* JVM creates **main thread**
* Stack created for main thread
* `main()` stack frame pushed

---

## Stack Now:

```
|-------------------|
| main() frame      |
| x = ?             |
| result = ?        |
|-------------------|
```

---

### 🧠 Step 2: `x = 5`

```
main()
  x = 5
```

---

### 🧠 Step 3: `add(x)` is called

* New stack frame created for `add()`
* Parameter `num` receives copy of `x`

Important:
👉 Java is **pass-by-value**
👉 `num` gets copy of 5

---

## Stack Now:

```
|-------------------|
| add() frame       |
| num = 5           |
|-------------------|
| main() frame      |
| x = 5             |
| result = ?        |
|-------------------|
```

---

### 🧠 Step 4: `return num + 10`

* 15 returned
* add() frame destroyed (popped)

---

## Stack After Pop:

```
|-------------------|
| main() frame      |
| x = 5             |
| result = 15       |
|-------------------|
```

---

### 🧠 Step 5: Print result

Output:

```
15
```

---

# 2️⃣ What is a Stack Frame?

Every method call creates:

* Local variables
* Parameters
* Return address
* Operand stack

Stored inside a **stack frame**.

When method finishes:
👉 Frame is popped
👉 Memory automatically cleaned

---

# 3️⃣ Important Rule

Each thread has:

* Its own stack
* Multiple stack frames

Stack is LIFO (Last In First Out).

---

# 4️⃣ Big Interview Question: Is Java Pass-by-Reference?

Answer:

❌ NO
✔ Java is always pass-by-value

Even for objects.

---

Example:

```java
static void change(int x) {
    x = 100;
}

public static void main(String[] args) {
    int a = 10;
    change(a);
    System.out.println(a);
}
```

Output:

```
10
```

Because:

* Copy of 10 passed
* Original not changed

---

# 5️⃣ Object Pass-by-Value Trap

```java
class Person {
    int age;
}

static void change(Person p) {
    p.age = 50;
}

public static void main(String[] args) {
    Person obj = new Person();
    obj.age = 20;
    change(obj);
    System.out.println(obj.age);
}
```

Output:

```
50
```

Why?

Because:

* Copy of reference passed
* Both point to same object
* Object modified

But if:

```java
static void change(Person p) {
    p = new Person();
    p.age = 100;
}
```

Then output:

```
20
```

Because:

* Only local copy changed
* Original reference unchanged

---

# 🔥 Now I Test Your Understanding

Predict output:

```java
static void modify(int a) {
    a = a + 5;
}

static void modifyArray(int[] arr) {
    arr[0] = 100;
}

public static void main(String[] args) {
    int x = 10;
    modify(x);
    System.out.println(x);

    int[] nums = {1, 2, 3};
    modifyArray(nums);
    System.out.println(nums[0]);
}
```

✅ Output:

```
10
100
```

Now the *interview-level* explanation (short but deep):

---

## 1️⃣ `modify(x)`

* `x` is a primitive (`int`)
* Java passes a **copy of the value** (`10`) into `a`
* Inside method, `a` becomes `15`, but that’s only the local copy
* `x` in `main` stays `10`

So first print: **10**

---

## 2️⃣ `modifyArray(nums)`

* `nums` is a reference variable
* Java passes a **copy of the reference**
* Both `arr` (inside method) and `nums` (in main) point to the **same array object in heap**
* Changing `arr[0]` changes the same heap array

So second print: **100**

---

# 📘 Notes Line (Most Important)

✅ Java is pass-by-value always.

* For primitives: value copy
* For objects/arrays: reference copy (so object can be mutated)

---


# Examples

```java
Person p = new Person(20);

changeRef(p);
System.out.println(p.age);

changeObj(p);
System.out.println(p.age);
```

---

# 1️⃣ `changeRef(p)`

```java
static void changeRef(Person p) {
    p = new Person(99);
}
```

### What happens?

* A **copy of reference** is passed
* Inside method, `p` now points to a NEW object
* But original reference in `main` still points to old object

So after method:

```
main → p → Person(age=20)
```

Output:

```
20
```

---

# 2️⃣ `changeObj(p)`

```java
static void changeObj(Person p) {
    p.age = 99;
}
```

### What happens?

* Copy of reference passed
* Both references point to SAME object
* Modifying `p.age` modifies heap object

So:

```
main → p → Person(age=99)
```

Output:

```
99
```

---

# 🧠 Interview-Level Explanation (Memorize This)

> Java is strictly pass-by-value. When passing objects, the value passed is a copy of the reference. Therefore, methods can modify the object’s state but cannot change the original reference.

This line alone can impress interviewers.

---

# 🔥 Now Stack Frame Deep Test

Predict output:

```java
static void fun(int x) {
    x = x + 1;
    System.out.println(x);
}

public static void main(String[] args) {
    int x = 5;
    fun(x);
    System.out.println(x);
}
```

✅ Correct Output:

```
6
5
```

### Why (quick stack-frame reasoning)

* `fun(x)` receives a **copy** of `x` (5)
* inside `fun`, local `x` becomes 6 → prints 6
* main’s `x` stays 5 → prints 5

---

# 📘 Stack Frames + Recursion (Next)

Now we move to **recursion** because it’s the clearest way to *see* stack frames.

## Example

```java
static void f(int n) {
    if (n == 0) return;
    System.out.print(n + " ");
    f(n - 1);
    System.out.print(n + " ");
}

public static void main(String[] args) {
    f(3);
}
```

✅ Correct Output:

```text
3 2 1 1 2 3
```

Now let’s make it **crystal clear** with stack-frame thinking (this is what interviewers love).

---

# Why this output happens

```java
f(3):
 print 3
  f(2):
   print 2
    f(1):
     print 1
      f(0): return
     print 1   // after returning
   print 2
 print 3
```

So:

* First half prints while **going down** the recursion: `3 2 1`
* Second half prints while **coming back up**: `1 2 3`

---

# 📘 Notes (One line)

Recursion has two phases:

* **Forward (call)** phase
* **Backtracking (return)** phase

---

# 🔥 Next Recursion + Stack Frame Trap

Predict output:

```java
static int g(int n) {
    if (n == 0) return 0;
    return n + g(n - 1);
}

public static void main(String[] args) {
    System.out.println(g(3));
}
```

✅ Correct Output.

```text
6
```

`g(3)` computes:

* g(3) = 3 + g(2)
* g(2) = 2 + g(1)
* g(1) = 1 + g(0)
* g(0) = 0

So total = 3 + 2 + 1 + 0 = **6**.

---

# 🔥 Next: Stack Overflow + Recursion Depth (Interview)

If interviewer asks:

**“Why does recursion cause StackOverflowError?”**

You answer:

> Each recursive call creates a new stack frame. If recursion is too deep (or has no base case), the call stack grows until it exceeds the stack memory limit, causing `StackOverflowError`.

---

# Final Method + Stack Frame Trap (Super Common)

Predict output:

```java
static void h(int n) {
    if (n == 0) return;
    h(n - 1);
    System.out.print(n + " ");
}

public static void main(String[] args) {
    h(3);
}
```

✅ Correct Output:

```text
1 2 3
```

Reason (quick, interview-style):

* `h(3)` calls `h(2)` calls `h(1)` calls `h(0)` return
* Printing happens **after** the recursive call returns, so it prints in reverse order while the stack unwinds: `1 2 3`

---

# ✅ Methods & Stack Frames Notes — Completed Core

You now fully understand:

* Stack vs stack frame
* Method call frame creation & pop
* Pass-by-value (primitive + reference)
* Recursion call stack (forward + backward phase)

---




