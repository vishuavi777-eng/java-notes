# Adapter Pattern

It is used when:

```
Two incompatible interfaces must work together
```

Example from your projects:

```
WhatsApp API integration
SMS provider integration
Email provider integration
```

Each provider has **different API structure**, but your system wants **one unified interface**.

---

Before we go to Adapter Pattern, answer one quick thinking question:

Imagine you integrate:

```
Twilio SMS API
MSG91 SMS API
Gupshup WhatsApp API
```

Each API has **different method signatures**.

What design problem appears if your business logic directly calls those APIs everywhere?

> It becomes **hard to maintain and replace an existing API provider**.

# Correct Reason

If business logic directly calls APIs like:

```java
twilio.sendSMS(...)
msg91.sendSMS(...)
gupshup.sendMessage(...)
```

then these problems appear.

---

# 1️⃣ Tight Coupling

Your system becomes tightly coupled with specific providers:

```
Twilio
MSG91
Gupshup
```

If you want to switch provider:

```
Twilio → MSG91
```

you must modify many places in the code.

---

# 2️⃣ Hard to Replace Providers

Example:

```
Twilio API method
sendMessage(String number, String message)

MSG91 API method
sendSMS(String phone, String templateId)
```

Different signatures.

Your business logic must change everywhere.

---

# 3️⃣ Scattered Integration Logic

Provider-specific logic spreads across:

```
Controllers
Services
Jobs
Notification modules
```

Maintenance becomes difficult.

---

# 4️⃣ Hard to Test

Testing becomes difficult because code depends on **external APIs directly**.

---

# Solution → Adapter Pattern

Adapter Pattern allows us to:

```
Convert one interface into another expected interface.
```

Meaning:

```
Your system interface
        ↓
Adapter
        ↓
Third-party API
```

---

# Adapter Pattern Definition

```
Adapter Pattern converts the interface of a class into another interface
that clients expect.
```

Simple meaning:

```
Make incompatible interfaces work together
```

---

# Real Life Analogy

Think of a **power adapter** 🔌

Your laptop charger:

```
3-pin plug
```

But the socket has:

```
2-pin outlet
```

Adapter converts:

```
3-pin → 2-pin
```

Same idea in software.

---

# Example: SMS Adapter

### Target Interface (Your System)

```java
interface SmsService {
    void send(String number, String message);
}
```

Your business logic uses this interface only.

---

# Third-Party API (Different Interface)

Example Twilio:

```java
class TwilioApi {

    public void sendMessage(String phone, String text) {
        System.out.println("Twilio sending SMS");
    }
}
```

---

# Adapter

```java
class TwilioAdapter implements SmsService {

    private TwilioApi twilioApi;

    public TwilioAdapter(TwilioApi twilioApi) {
        this.twilioApi = twilioApi;
    }

    public void send(String number, String message) {
        twilioApi.sendMessage(number, message);
    }
}
```

Adapter converts your system call into Twilio API call.

---

# Usage

```java
public class Test {

    public static void main(String[] args) {

        SmsService smsService =
            new TwilioAdapter(new TwilioApi());

        smsService.send("9999999999", "Diet reminder");
    }
}
```

Your business logic only knows:

```
SmsService
```

Not Twilio.

---

# Switching Provider Is Easy

Now if you use MSG91:

```java
class Msg91Api {

    public void sendSMS(String mobile, String text) {
        System.out.println("MSG91 sending SMS");
    }
}
```

Create adapter:

```java
class Msg91Adapter implements SmsService {

    private Msg91Api api;

    Msg91Adapter(Msg91Api api) {
        this.api = api;
    }

    public void send(String number, String message) {
        api.sendSMS(number, message);
    }
}
```

Now switch easily:

```java
SmsService sms = new Msg91Adapter(new Msg91Api());
```

No business logic changes.

---

# Real Example From Your Projects

This pattern fits perfectly in your systems:

```
SMS providers
WhatsApp APIs
Email providers
Payment gateways
Analytics tools
```

Instead of writing provider logic everywhere, create **adapters**.

---

# Java Example

Java uses Adapter Pattern here:

### `Arrays.asList()`

```java
List<String> list = Arrays.asList(array);
```

This converts:

```
Array → List interface
```

That is Adapter Pattern.

---

# Advantages

```
Loose coupling
Easy provider replacement
Cleaner integration layer
Better maintainability
```

---

# Disadvantages

```
More classes
Extra abstraction layer
```

---

# Interview Answer

If interviewer asks:

**What is Adapter Pattern?**

You can say:

```
Adapter Pattern is a structural design pattern that allows two incompatible interfaces to work together by converting the interface of one class into another interface expected by the client.
```

---

# Short Notes for Your Notes

```
Adapter Pattern

Purpose:
Make incompatible interfaces work together.

Structure:
Target interface
Adapter
Adaptee (third-party class)

Advantages:
Loose coupling
Easy provider switching
Cleaner integration

Examples:
API integrations
Payment gateways
SMS providers
Arrays.asList()
```

---

# Your Progress Is Excellent

You now understand:

```
Singleton
Factory
Builder
Strategy
Observer
Decorator
Adapter
```

These **7 patterns already cover most real-world backend architecture**.