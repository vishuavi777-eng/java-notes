# Initialization and Constructor Traps

## Definition

Object initialization is the process where Java allocates an object, sets default values, runs field initializers and blocks, and then runs constructors.

## Why It Matters

Initialization order is a common interview trap, especially when constructors call overridden methods or parent and child classes initialize together.

## Core Example

When creating a child object, Java first initializes the parent part, then the child part.

## Common Traps

- Parent constructor runs before child constructor body.
- Overridden methods called from constructors can run before child fields are initialized.
- Fields get default values before explicit initialization.
- Constructor does not create the object; it initializes it.
- Initialization order affects output questions.

## Interview Answer

When an object is created, memory is allocated first and fields get default values. Then Java runs superclass initialization before subclass initialization. Constructor bodies run after field initialization for that class. Calling overridable methods from constructors is risky because child state may not be ready.

## Quick Revision

- Memory allocation happens before constructor body.
- Fields get default values first.
- Parent initialization happens before child initialization.
- Avoid calling overridable methods in constructors.
- Constructor initializes object state.
- Initialization order is important for output questions.

## Deep Dive

Before finishing OOP, the **next deep topics** are:

```
Object class methods
equals() vs ==
hashCode()
toString()
clone()
```

These appear in **almost every Java interview**.

---

### Quick Interview Question for You

##### Predict output:

```java
class Animal {
    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog");
    }
}

public class Test {
    public static void main(String[] args) {

        Animal a = new Dog();
        a.sound();

        a = new Animal();
        a.sound();
    }
}
```

What will print?
Explain **why**.


##### Output:

> Dog
> Animal

Better explanation sentence:

> The output is **Dog** then **Animal** because method execution depends on the **object type at runtime**.

---

### Execution Step-by-Step

#### First Line

```java
Animal a = new Dog();
```

Reference type:

```
Animal
```

Object type:

```
Dog
```

Now:

```java
a.sound();
```

JVM checks **object type**, not reference type.

Object type = **Dog**

So JVM calls:

```
Dog.sound()
```

Output:

```
Dog
```

---

### Second Line

```java
a = new Animal();
```

Now:

Reference type:

```
Animal
```

Object type:

```
Animal
```

Now:

```java
a.sound();
```

JVM calls:

```
Animal.sound()
```

Output:

```
Animal
```

---

### Final Output

```
Dog
Animal
```

---

### Important Interview Rule

Instance methods follow:

```
Runtime Polymorphism
```

Meaning:

```
Method execution depends on object type
```

---

### Visual Memory

```
Animal a = new Dog();

Stack
-----
a  →  Dog Object

Heap
-----
Dog Object
```

Later:

```
a = new Animal();
```

Stack now points to new object:

```
a → Animal Object
```

---

### Interview Tip

When interviewer asks:

```
Animal a = new Dog();
```

Always explain two things:

```
Reference Type
Object Type
```

This shows strong OOP understanding.

---

### Very Important OOP Trap

Predict output:

```java
class Animal {
    int x = 10;
}

class Dog extends Animal {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {

        Animal a = new Dog();
        System.out.println(a.x);
    }
}
```

##### What will print?

Explain **why**.

##### Answer:

**10** is correct ✅.
> Because **variables are resolved using the reference type, not the object type**.


But the **reason interviewers expect** is slightly more precise.

---

### Code

```java
class Animal {
    int x = 10;
}

class Dog extends Animal {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {

        Animal a = new Dog();
        System.out.println(a.x);
    }
}
```

---

### Output

```
10
```

---

### Why?

Here:

```
Reference type → Animal
Object type → Dog
```

But **variables do NOT use runtime polymorphism**.

Variables are resolved **at compile time**.

So JVM checks the **reference type**.

Reference type = `Animal`

So JVM uses:

```
Animal.x
```

Which is:

```
10
```

---

### Important Interview Rule

This is a **very famous Java rule**.

```
Methods → runtime polymorphism (object type)
Variables → compile-time binding (reference type)
```

---

### Visual Explanation

```
Animal a = new Dog();
```

Memory:

```
Stack
-----
a → Dog object

Heap
-----
Dog Object
   x = 20
   (inherits Animal.x = 10)
```

But compiler resolves:

```
a.x → Animal.x
```

So output:

```
10
```

---

### Why Java Works Like This

Because variables **cannot be overridden**, they can only be **hidden**.

Example:

```
Animal.x
Dog.x
```

Both variables exist separately.

This is called:

```
Variable Hiding
```

---

### Interview Trick

Look at this modified code.

```java
Animal a = new Dog();
Dog d = new Dog();

System.out.println(a.x);
System.out.println(d.x);
```

Output:

```
10
20
```

Because:

```
a.x → Animal.x
d.x → Dog.x
```

---

### Another Famous Interview Trap

Predict output:

```java
class Animal {
    int x = 10;

    void show() {
        System.out.println(x);
    }
}

class Dog extends Animal {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.show();
    }
}
```

Will it print:

```
10
or
20
```

Explain **why**.

> It will print **10**.

### Output

```
10
```

Now let's understand **why**, because the reasoning here is very important for interviews.

---

### Step-by-Step Execution

##### Step 1 — Object creation

```
Animal a = new Dog();
```

Reference type:

```
Animal
```

Object type:

```
Dog
```

Memory conceptually:

```
Stack
-----
a → Dog Object

Heap
-----
Dog Object
   x = 20
   inherits Animal.x = 10
```

Both variables exist:

```
Animal.x
Dog.x
```

---

### Step 2 — Method call

```
a.show();
```

Methods follow **runtime polymorphism**.

So JVM checks **object type**.

Object type = `Dog`.

But **Dog does not override show()**.

So JVM uses:

```
Animal.show()
```

---

### Step 3 — Inside `show()`

Inside method:

```java
System.out.println(x);
```

Here `x` belongs to **Animal class**, because the method is defined in `Animal`.

So it accesses:

```
Animal.x
```

Value:

```
10
```

---

### Important Interview Rule

Remember this clearly:

```
Method execution → object type (runtime)
Variable access → class where method is defined
```

Or more commonly stated:

```
Methods → runtime binding
Variables → compile-time binding
```

---

### What If Dog Overrides `show()`?

Example:

```java
class Dog extends Animal {

    int x = 20;

    void show() {
        System.out.println(x);
    }
}
```

Now code:

```java
Animal a = new Dog();
a.show();
```

Output becomes:

```
20
```

Because now:

```
Dog.show()
```

runs.

---

### Interview Summary Rule

```
Method overridden → runtime decision
Method not overridden → parent method executes
Variables never overridden → only hidden
```

---

### One More Famous Interview Trap

Predict the output:

```java
class Parent {

    Parent() {
        print();
    }

    void print() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    int x = 10;

    void print() {
        System.out.println(x);
    }
}

public class Test {

    public static void main(String[] args) {
        new Child();
    }
}
```

Will it print:

```
10
0
Parent
```

##### Output

```java
0
```

---

### Why?

This is a **very famous Java interview trap**.

The tricky part is:

```java
Parent() {
    print();
}
```

Inside the parent constructor, JVM calls:

```java
print();
```

Because `print()` is an **overridden instance method**, JVM uses **runtime polymorphism**.

So it calls:

```java
Child.print()
```

---

### But Why Does It Print `0` Instead of `10`?

Because during object creation, initialization happens in this order:

#### Step 1 — Memory allocated

Child object is created in heap.

At this moment all instance variables get **default values**:

```java
x = 0
```

---

#### Step 2 — Parent constructor runs first

Before child constructor body and child field initialization, parent constructor executes.

So this line runs:

```java
print();
```

Due to overriding, it calls:

```java
Child.print()
```

But `x` is still:

```java
0
```

because child field initialization:

```java
int x = 10;
```

has **not happened yet**.

So output is:

```java
0
```

---

### Full Initialization Flow

For:

```java
new Child();
```

JVM does roughly this:

```text
1. Allocate Child object
2. Set default values
   x = 0
3. Call Parent constructor
4. Parent constructor calls print()
5. Due to polymorphism, Child.print() runs
6. Child.print() prints x → 0
7. Parent constructor finishes
8. Child field initialization happens
   x = 10
9. Child constructor body runs
```

---

### Important Interview Rule

```text
Never call overridable methods from constructors
```

Because subclass state may not be initialized yet.

This can cause:

* unexpected values
* bugs
* partially initialized object behavior

---

### Why This Happens

Because:

```text
Methods are polymorphic even inside constructors
```

But:

```text
Subclass fields are initialized only after parent constructor finishes
```

That combination creates this trap.

---

### Interview-Ready Note

You can answer like this:

```text
The output is 0 because during object creation the parent constructor runs before child field initialization. The parent constructor calls the overridden print() method, so Child.print() executes, but x still has its default value 0 at that time.
```

---

### Very Important OOP Trap Summary

Remember this order:

```text
Default initialization
→ Parent constructor
→ Child field initialization
→ Child constructor
```

---

### One more interview question

Predict output:

```java
class Parent {
    Parent() {
        show();
    }

    void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    String name = "Vishu";

    void show() {
        System.out.println(name);
    }
}

public class Test {
    public static void main(String[] args) {
        new Child();
    }
}
```

Will it print:

```text
Vishu
null
Parent show
```


##### Output

> It will print **null**.

```java
null
```

---

### Why?

This is the **same constructor + polymorphism trap**.

#### Flow

When this runs:

```java
new Child();
```

JVM does:

```text
1. Allocate Child object
2. Default initialize instance variables
   name = null
3. Call Parent constructor
4. Parent constructor calls show()
5. Due to overriding, Child.show() runs
6. name is still null
7. After parent constructor ends, child field initialization runs
   name = "Vishu"
```

So when `show()` is called from parent constructor, `name` has not yet been assigned `"Vishu"`.

Therefore output is:

```java
null
```

---

### Very Important Interview Rule

```text
Do not call overridable methods from constructors
```

Because child state may still have:

* default values
* partial initialization
* invalid state

---

### Notes for Interview

You can say:

```text
The output is null because the parent constructor calls an overridden method. At that time the child object is created but child instance variables are only default-initialized, so name is null. Child field initialization happens after the parent constructor completes.
```

---

### Important Initialization Order

Remember this exact order:

```text
1. Memory allocation
2. Default values
3. Parent constructor
4. Child instance field initialization
5. Child constructor
```

This order is **very important for OOP interviews**.

---

### Mini Note: constructor vs method behavior

```text
Constructors are not overridden
Methods are overridden
Calling overridden methods inside constructor is dangerous
```

---

