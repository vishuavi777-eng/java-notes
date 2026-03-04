# 📘 MODERN SWITCH

Now we move to **Switch Advanced + Modern Switch (Java 14+)**

This topic is important for interviews because many candidates only know old switch.

---

# 📘 1️⃣ Traditional Switch (Old Style)

Basic syntax:

```java
switch(expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code
}
```

---

# 🔥 Important Rules

## 1️⃣ Expression Type Must Be:

Allowed:

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

## 🔥 Trap 1: Fall-Through

```java
int x = 2;

switch(x) {
    case 1:
        System.out.println("One");
    case 2:
        System.out.println("Two");
    case 3:
        System.out.println("Three");
}
```

### Output:

```
Two
Three
```

Because no `break`.

---

## 🔥 Trap 2: Order of Cases

Cases can be in any order.

```java
switch(x) {
    case 5:
    case 1:
    case 3:
}
```

Valid.

---

## 🔥 Trap 3: Case Must Be Compile-Time Constant

```java
int a = 5;
switch(5) {
    case a:   // ❌ ERROR
}
```

But:

```java
final int a = 5;
case a:   // ✅ allowed
```

Because final primitive constant is compile-time constant.

---

# 📘 2️⃣ Switch with String

```java
String day = "MON";

switch(day) {
    case "MON":
        System.out.println("Start");
        break;
}
```

Internally, Java uses hashcode comparison.

---

# 📘 3️⃣ Modern Switch (Java 14+)

This is very important for modern interviews.

---

## ✅ Switch Expression (Arrow Style)

```java
int day = 2;

String result = switch(day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Other";
};

System.out.println(result);
```

No break needed.

---

## 🔥 Key Difference

Old switch:

* statement
* needs break
* fall-through possible

New switch:

* expression
* no fall-through
* returns value
* cleaner syntax

---

# 📘 4️⃣ Multiple Cases in One Line (Modern)

```java
int day = 2;

String result = switch(day) {
    case 1, 2, 3 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Other";
};
```

---

# 📘 5️⃣ Block Style in Modern Switch

```java
int day = 2;

String result = switch(day) {
    case 2 -> {
        System.out.println("Processing...");
        yield "Tuesday";
    }
    default -> "Other";
};
```

`yield` is required when using block.

---

# ✅ Question 1

```java
int x = 1;

switch(x) {
    case 1:
        System.out.println("A");
    default:
        System.out.println("B");
    case 2:
        System.out.println("C");
}
```

### Execution:

* x = 1 → case 1 matches
* Print A
* No break → fall through
* default → print B
* case 2 → print C

✅ Output:

```
A
B
C
```

---

#  Question 2

```java
int x = 1;

String result = switch(x) {
    case 1 -> "A";
    case 2 -> "B";
};

System.out.println(result);
```

---

## The Real Reason

Modern switch (switch expression) must be **exhaustive**.

That means:

* It must cover all possible values
* Or have a `default`

Since `int` can be many values (not just 1 and 2),
compiler says:

> "Switch expression does not cover all possible input values"

So it does NOT compile.

---

## Correct Version

```java
String result = switch(x) {
    case 1 -> "A";
    case 2 -> "B";
    default -> "Other";
};
```

Now it compiles.

---

# 🧠 Interview Insight

Old switch:

* default optional

New switch expression:

* must be exhaustive
* especially for int

BUT:

If switching on enum and covering all enum constants,
default is not required.

Example:

```java
enum Day { MON, TUE }

String result = switch(day) {
    case MON -> "Start";
    case TUE -> "Next";
};
```

This compiles because enum values are fully covered.

---

# 🧠 Important Interview Insight

Modern switch:

* Multiple values per case allowed (`case 1, 2`)
* No fall-through
* Must be exhaustive
* Cleaner and safer than old switch

---

# ✅ Control Flow Topic Status

You now understand:

* if / else (dangling else)
* loops (semicolon traps)
* nested loops
* break vs continue
* traditional switch
* modern switch expression
* exhaustiveness rule

That is strong foundation.