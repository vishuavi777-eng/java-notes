# Password Hashing

## Definition

Password hashing converts a password into a one-way hashed value before storing it in the database.

## Why It Matters

Plain text passwords are a serious security risk. If the database leaks, user passwords must not be directly visible.

## Core Example

```java
PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
String hash = passwordEncoder.encode(rawPassword);
```

## Common Traps

- Storing plain text passwords.
- Encrypting passwords instead of hashing them.
- Using weak hashing algorithms.
- Logging passwords.
- Returning password fields in API responses.

## Interview Answer

Passwords should never be stored in plain text. In Spring Security, we commonly use `PasswordEncoder`, such as `BCryptPasswordEncoder`, to hash passwords. During login, the raw password is compared with the stored hash using the password encoder.

## Quick Revision

- Never store plain text passwords.
- Use one-way hashing.
- BCrypt is commonly used.
- Compare raw password with hash using `matches`.
- Never expose password in response DTO.

## Deep Dive

### Registration Flow

```java
String encodedPassword = passwordEncoder.encode(request.password());
user.setPassword(encodedPassword);
userRepository.save(user);
```

### Login Check

```java
boolean valid = passwordEncoder.matches(rawPassword, user.getPassword());
```

### Hashing vs Encryption

Hashing is one-way. Encryption is reversible with a key. Passwords should be hashed, not encrypted.

### Common Interview Questions

- Why should passwords be hashed?
- What is BCrypt?
- Hashing vs encryption?
- How do you verify a password during login?

