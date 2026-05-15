/*
  Add new questions by copying one object and changing:
  id, skill, topic, level, question, answer, keyPoints, followUps, source.
*/
window.INTERVIEW_PRACTICE_QUESTIONS = [
  {
    id: "java-core-variables-001",
    skill: "Java",
    topic: "Core Java",
    level: "Junior",
    question: "What is the difference between primitive and non-primitive data types in Java?",
    answer: [
      "Primitive data types store simple values like int, double, boolean, and char. Non-primitive types are objects, such as String, ArrayList, or custom classes.",
      "Primitive values are stored directly, while object variables store a reference to an object."
    ],
    keyPoints: ["Primitive types have fixed size.", "Objects can have methods and fields.", "String is not primitive."],
    followUps: ["Is String primitive in Java?", "What is autoboxing?"],
    source: "java/01-variables-and-data-types/"
  },
  {
    id: "java-core-casting-001",
    skill: "Java",
    topic: "Core Java",
    level: "Junior",
    question: "What is type casting in Java?",
    answer: [
      "Type casting means converting one data type into another. Widening casting is automatic when we convert a smaller type to a larger type. Narrowing casting is manual because data can be lost."
    ],
    keyPoints: ["int to long is widening.", "double to int is narrowing.", "Narrowing can lose decimal data."],
    followUps: ["What happens when double is converted to int?", "What is implicit casting?"],
    source: "java/02-type-conversion-and-casting/"
  },
  {
    id: "java-core-overload-override-001",
    skill: "Java",
    topic: "OOP",
    level: "Junior",
    question: "What is the difference between method overloading and overriding?",
    answer: [
      "Overloading means same method name with different parameters in the same class. Overriding means child class provides its own implementation of a parent class method.",
      "Overloading is decided at compile time. Overriding is decided at runtime."
    ],
    keyPoints: ["Overloading changes parameters.", "Overriding keeps compatible method signature.", "Overriding supports runtime polymorphism."],
    followUps: ["Can we override static methods?", "Can return type change in overriding?"],
    source: "java/07-method-overloading-and-overriding/"
  },
  {
    id: "java-core-final-001",
    skill: "Java",
    topic: "Core Java",
    level: "Junior",
    question: "What is the use of final keyword in Java?",
    answer: [
      "final can be used with variables, methods, and classes. A final variable cannot be reassigned. A final method cannot be overridden. A final class cannot be inherited."
    ],
    keyPoints: ["final variable means no reassignment.", "final method means no override.", "final class means no subclass."],
    followUps: ["Is final object immutable?", "Can constructor be final?"],
    source: "java/10-final-keyword/"
  },
  {
    id: "java-oop-interface-001",
    skill: "Java",
    topic: "OOP",
    level: "Junior",
    question: "What is the difference between abstract class and interface?",
    answer: [
      "An abstract class is useful when classes share common state and behavior. An interface is useful to define a contract that different classes can implement.",
      "A class can extend only one abstract class, but it can implement multiple interfaces."
    ],
    keyPoints: ["Abstract class can have state.", "Interface defines capability.", "Use interface for loose coupling."],
    followUps: ["Can interface have default methods?", "When would you choose abstract class?"],
    source: "java/12-abstract-class-vs-interface/"
  },
  {
    id: "java-string-001",
    skill: "Java",
    topic: "Core Java",
    level: "Junior",
    question: "Why is String immutable in Java?",
    answer: [
      "String is immutable for security, thread safety, caching, and reliable use as a key in maps. Once created, its value cannot be changed."
    ],
    keyPoints: ["String pool depends on immutability.", "Safe for sharing between threads.", "Good for HashMap keys."],
    followUps: ["What is String pool?", "StringBuilder vs StringBuffer?"],
    source: "java/13-string-stringbuilder-stringbuffer/"
  },
  {
    id: "java-collections-arraylist-001",
    skill: "Java",
    topic: "Collections",
    level: "Mid",
    question: "How does ArrayList work internally?",
    answer: [
      "ArrayList uses an internal array. When the array becomes full, it creates a bigger array and copies old elements into it.",
      "It is fast for random access but can be slow for insert or delete in the middle because elements may need shifting."
    ],
    keyPoints: ["Backed by array.", "Random access is O(1).", "Middle insert/delete can be O(n)."],
    followUps: ["ArrayList vs LinkedList?", "What is initial capacity?"],
    source: "java/collections-framework/arraylist-internals/"
  },
  {
    id: "java-collections-hashmap-001",
    skill: "Java",
    topic: "Collections",
    level: "Mid",
    question: "How does HashMap work internally?",
    answer: [
      "HashMap stores key-value pairs using hashing. It calculates hash for the key, finds a bucket, and stores the entry there.",
      "If multiple keys go to the same bucket, collision handling is used. In modern Java, long collision chains can become trees."
    ],
    keyPoints: ["Uses hashCode and equals.", "Average get/put is O(1).", "Bad hash can reduce performance."],
    followUps: ["Why override equals and hashCode together?", "What is collision?"],
    source: "java/collections-framework/hashmap-internals/"
  },
  {
    id: "java-jvm-memory-001",
    skill: "Java",
    topic: "JVM",
    level: "Mid",
    question: "Explain JVM memory areas in simple words.",
    answer: [
      "JVM memory mainly includes heap, stack, method area, program counter, and native method stack. Objects are stored in heap. Method calls and local variables are stored in stack frames."
    ],
    keyPoints: ["Heap stores objects.", "Stack stores method calls.", "Each thread has its own stack."],
    followUps: ["What causes StackOverflowError?", "What causes OutOfMemoryError?"],
    source: "java/jvm/memory-structure/"
  },
  {
    id: "java-jvm-gc-001",
    skill: "Java",
    topic: "JVM",
    level: "Mid",
    question: "What is garbage collection in Java?",
    answer: [
      "Garbage collection automatically removes objects that are no longer reachable. It helps manage memory, but it does not remove the need to write memory-conscious code."
    ],
    keyPoints: ["GC works on unreachable objects.", "It runs automatically.", "Memory leaks can still happen through unwanted references."],
    followUps: ["Can we force GC?", "What is memory leak in Java?"],
    source: "java/jvm/garbage-collection/"
  },
  {
    id: "java-thread-race-001",
    skill: "Java",
    topic: "Multithreading",
    level: "Mid",
    question: "What is a race condition?",
    answer: [
      "A race condition happens when multiple threads access shared data at the same time and the final result depends on timing. It can produce wrong or inconsistent output."
    ],
    keyPoints: ["Shared mutable state is risky.", "Use synchronization or locks.", "Atomic classes can help for simple counters."],
    followUps: ["How do you fix race condition?", "What is thread safety?"],
    source: "java/multithreading/race-condition-sleep-wait/"
  },
  {
    id: "java-thread-volatile-001",
    skill: "Java",
    topic: "Multithreading",
    level: "Senior",
    question: "What does volatile do in Java?",
    answer: [
      "volatile makes changes to a variable visible across threads. It is useful for simple flags. It does not make compound operations like count++ atomic."
    ],
    keyPoints: ["Visibility, not full atomicity.", "Good for flags.", "Use AtomicInteger or locks for increments."],
    followUps: ["volatile vs synchronized?", "Why is count++ not atomic?"],
    source: "java/multithreading/volatile-atomic-and-happens-before/"
  },
  {
    id: "java-exception-checked-001",
    skill: "Java",
    topic: "Exception Handling",
    level: "Junior",
    question: "What is the difference between checked and unchecked exceptions?",
    answer: [
      "Checked exceptions are checked at compile time and must be handled or declared. Unchecked exceptions happen at runtime and usually represent programming mistakes or invalid state."
    ],
    keyPoints: ["IOException is checked.", "NullPointerException is unchecked.", "Do not catch exceptions blindly."],
    followUps: ["When would you create custom exception?", "throw vs throws?"],
    source: "java/exception-handling/"
  },
  {
    id: "spring-core-application-001",
    skill: "Spring Boot",
    topic: "Core",
    level: "Junior",
    question: "What does @SpringBootApplication do?",
    answer: [
      "@SpringBootApplication is a convenience annotation. It combines configuration, component scanning, and auto-configuration for a Spring Boot application."
    ],
    keyPoints: ["Includes @Configuration.", "Includes @EnableAutoConfiguration.", "Includes @ComponentScan."],
    followUps: ["Where should main class be placed?", "What is auto-configuration?"],
    source: "spring/core/springbootapplication/"
  },
  {
    id: "spring-core-di-001",
    skill: "Spring Boot",
    topic: "Core",
    level: "Junior",
    question: "What is dependency injection?",
    answer: [
      "Dependency injection means objects receive their dependencies from outside instead of creating them directly. In Spring, the container creates and injects beans."
    ],
    keyPoints: ["Improves loose coupling.", "Makes testing easier.", "Constructor injection is usually preferred."],
    followUps: ["Constructor vs field injection?", "What is a bean?"],
    source: "spring/core/dependency-injection/"
  },
  {
    id: "spring-rest-controller-001",
    skill: "Spring Boot",
    topic: "REST API",
    level: "Junior",
    question: "What is the difference between @Controller and @RestController?",
    answer: [
      "@Controller is mainly used for web pages. @RestController is used for REST APIs and returns data directly in the response body."
    ],
    keyPoints: ["@RestController includes @ResponseBody.", "Use it for JSON APIs.", "Use @Controller for MVC views."],
    followUps: ["What is @ResponseBody?", "How does JSON conversion happen?"],
    source: "spring/rest-api/controller-restcontroller/"
  },
  {
    id: "spring-rest-layered-001",
    skill: "Spring Boot",
    topic: "REST API",
    level: "Mid",
    question: "Explain layered architecture in a Spring Boot REST API.",
    answer: [
      "A common Spring Boot API has controller, service, repository, DTO, and entity layers. Controller handles HTTP request. Service contains business logic. Repository handles database access."
    ],
    keyPoints: ["Controller should stay thin.", "Service owns business rules.", "Repository talks to database."],
    followUps: ["Why not put business logic in controller?", "DTO vs entity?"],
    source: "spring/rest-api/layered-architecture/"
  },
  {
    id: "spring-validation-001",
    skill: "Spring Boot",
    topic: "Validation",
    level: "Mid",
    question: "How do you validate request data in Spring Boot?",
    answer: [
      "I create a request DTO, add validation annotations like @NotBlank or @NotNull, and use @Valid in the controller method. Validation errors can be handled using a global exception handler."
    ],
    keyPoints: ["Validate DTO, not entity.", "Use @Valid.", "Return clear error response."],
    followUps: ["How do you handle MethodArgumentNotValidException?", "Why use DTO?"],
    source: "spring/validation-exception/validation-dto/"
  },
  {
    id: "spring-exception-global-001",
    skill: "Spring Boot",
    topic: "Exception Handling",
    level: "Mid",
    question: "What is a global exception handler in Spring Boot?",
    answer: [
      "A global exception handler is a central place to handle exceptions for the application. We usually create it with @RestControllerAdvice and methods with @ExceptionHandler."
    ],
    keyPoints: ["Keeps controller clean.", "Returns consistent error response.", "Maps exception to proper HTTP status."],
    followUps: ["What status for not found?", "How to handle validation errors?"],
    source: "spring/validation-exception/global-exception-handler/"
  },
  {
    id: "spring-jpa-repository-001",
    skill: "Spring Boot",
    topic: "JPA",
    level: "Junior",
    question: "What is Spring Data JPA repository?",
    answer: [
      "A repository is an interface used to perform database operations. Spring Data JPA provides common CRUD methods and can create queries from method names."
    ],
    keyPoints: ["Reduces boilerplate.", "JpaRepository gives CRUD and pagination support.", "Repository should not contain business logic."],
    followUps: ["CrudRepository vs JpaRepository?", "What are query methods?"],
    source: "spring/data-jpa/entity-and-repository/"
  },
  {
    id: "spring-jpa-transactional-001",
    skill: "Spring Boot",
    topic: "JPA",
    level: "Mid",
    question: "What is the use of @Transactional?",
    answer: [
      "@Transactional makes a method run inside a database transaction. If something fails, changes can be rolled back so data remains consistent."
    ],
    keyPoints: ["Used mostly in service layer.", "Rollback protects consistency.", "Read-only can help for read operations."],
    followUps: ["What is transaction rollback?", "Where should @Transactional be placed?"],
    source: "spring/data-jpa/transactional/"
  },
  {
    id: "spring-jpa-nplusone-001",
    skill: "Spring Boot",
    topic: "JPA",
    level: "Senior",
    question: "What is the N+1 query problem?",
    answer: [
      "N+1 happens when one query loads parent records and then one extra query runs for each related child record. It can make APIs slow when data grows."
    ],
    keyPoints: ["Common with lazy relations.", "Fix with fetch join, entity graph, or DTO query.", "Always check SQL logs for hidden queries."],
    followUps: ["How do you detect N+1?", "Fetch join vs entity graph?"],
    source: "spring/data-jpa/n-plus-one-problem/"
  },
  {
    id: "spring-security-jwt-001",
    skill: "Spring Boot",
    topic: "Security",
    level: "Senior",
    question: "Explain JWT authentication flow.",
    answer: [
      "User logs in with credentials. Server validates user and returns a signed token. Client sends the token in Authorization header. Server validates token on each protected request."
    ],
    keyPoints: ["JWT is signed.", "Do not store password in token.", "Validate token on each request."],
    followUps: ["Where should JWT be stored?", "Authentication vs authorization?"],
    source: "spring/security/jwt-flow/"
  },
  {
    id: "spring-testing-mockmvc-001",
    skill: "Spring Boot",
    topic: "Testing",
    level: "Mid",
    question: "What is MockMvc used for?",
    answer: [
      "MockMvc is used to test Spring MVC controllers without starting a real server. We can test request mapping, status codes, validation, and response body."
    ],
    keyPoints: ["Good for controller tests.", "Service can be mocked.", "Tests API behavior."],
    followUps: ["@WebMvcTest vs @SpringBootTest?", "What should controller tests verify?"],
    source: "spring/testing/mockmvc-controller-test/"
  },
  {
    id: "rest-stateless-001",
    skill: "REST API",
    topic: "REST Concepts",
    level: "Junior",
    question: "What does stateless mean in REST API?",
    answer: [
      "Stateless means each request contains all information needed to process it. The server does not depend on previous request state."
    ],
    keyPoints: ["Improves scalability.", "Token or request data carries context.", "Server should not depend on session for API state."],
    followUps: ["Is JWT stateless?", "Why stateless APIs scale better?"],
    source: "rest-api/rest-fundamentals/"
  },
  {
    id: "rest-methods-001",
    skill: "REST API",
    topic: "HTTP Methods",
    level: "Junior",
    question: "What is the difference between GET, POST, PUT, PATCH, and DELETE?",
    answer: [
      "GET reads data. POST creates data or triggers an action. PUT replaces a resource. PATCH updates part of a resource. DELETE removes a resource."
    ],
    keyPoints: ["GET should not change data.", "PUT is usually full update.", "PATCH is partial update."],
    followUps: ["PUT vs PATCH?", "Which methods are idempotent?"],
    source: "rest-api/http-methods/"
  },
  {
    id: "rest-status-001",
    skill: "REST API",
    topic: "Status Codes",
    level: "Junior",
    question: "Which HTTP status codes do you commonly use in REST APIs?",
    answer: [
      "Common codes are 200 for success, 201 for created, 204 for success without body, 400 for bad request, 401 for unauthenticated, 403 for forbidden, 404 for not found, and 500 for server error."
    ],
    keyPoints: ["Use correct status for clear API contract.", "Do not return 200 for errors.", "Validation errors often use 400."],
    followUps: ["401 vs 403?", "When use 409 Conflict?"],
    source: "rest-api/status-codes/"
  },
  {
    id: "rest-idempotency-001",
    skill: "REST API",
    topic: "REST Concepts",
    level: "Mid",
    question: "What is idempotency?",
    answer: [
      "Idempotency means making the same request multiple times has the same final effect on the server. GET, PUT, and DELETE are usually idempotent. POST is usually not."
    ],
    keyPoints: ["Same final state matters.", "Response can still differ.", "Important for retries."],
    followUps: ["Is DELETE idempotent?", "Why is POST not idempotent?"],
    source: "rest-api/idempotency/"
  },
  {
    id: "rest-error-response-001",
    skill: "REST API",
    topic: "API Design",
    level: "Mid",
    question: "What should a good REST error response contain?",
    answer: [
      "A good error response should contain proper HTTP status, error code, clear message, timestamp or trace id if needed, and field errors for validation problems."
    ],
    keyPoints: ["Consistent format.", "Clear message.", "No sensitive internal details."],
    followUps: ["How do you handle validation errors?", "Why avoid stack trace in response?"],
    source: "rest-api/error-response-design/"
  },
  {
    id: "sql-joins-001",
    skill: "SQL / MySQL",
    topic: "Joins",
    level: "Junior",
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    answer: [
      "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table and matching rows from the right table. If there is no match, right table columns are null."
    ],
    keyPoints: ["INNER means matching only.", "LEFT keeps all left rows.", "Useful for optional relationships."],
    followUps: ["When would you use LEFT JOIN?", "How to find records without match?"],
    source: "sql-mysql/joins/"
  },
  {
    id: "sql-index-001",
    skill: "SQL / MySQL",
    topic: "Indexes",
    level: "Mid",
    question: "What is an index in MySQL?",
    answer: [
      "An index is a data structure that helps the database find rows faster. It improves read queries but adds cost to insert, update, and delete operations."
    ],
    keyPoints: ["Speeds up search/filter/sort.", "Too many indexes slow writes.", "Useful on columns used in WHERE and JOIN."],
    followUps: ["What is composite index?", "Why not index every column?"],
    source: "sql-mysql/indexes/"
  },
  {
    id: "sql-transaction-001",
    skill: "SQL / MySQL",
    topic: "Transactions",
    level: "Mid",
    question: "What are ACID properties?",
    answer: [
      "ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties help ensure database transactions are reliable and keep data correct."
    ],
    keyPoints: ["Atomicity means all or nothing.", "Isolation handles concurrent transactions.", "Durability means committed data survives."],
    followUps: ["What is rollback?", "What are isolation levels?"],
    source: "sql-mysql/transactions-acid/"
  },
  {
    id: "sql-optimization-001",
    skill: "SQL / MySQL",
    topic: "Optimization",
    level: "Senior",
    question: "How do you improve a slow SQL query?",
    answer: [
      "First I check the query, indexes, joins, filters, and execution plan. Then I reduce unnecessary columns, add or improve indexes, avoid functions on indexed columns, and paginate large results."
    ],
    keyPoints: ["Use EXPLAIN.", "Check indexes.", "Avoid SELECT * for large data."],
    followUps: ["What is EXPLAIN?", "How can indexes hurt performance?"],
    source: "sql-mysql/query-optimization/"
  },
  {
    id: "dsa-complexity-001",
    skill: "DSA",
    topic: "Complexity",
    level: "Junior",
    question: "What is time complexity?",
    answer: [
      "Time complexity describes how the number of operations grows when input size grows. Big O is used to express this growth."
    ],
    keyPoints: ["O(1), O(log n), O(n), O(n log n), O(n^2).", "Focus on growth, not exact time.", "Drop constants."],
    followUps: ["What is space complexity?", "Why ignore constants?"],
    source: "dsa/01-complexity-analysis/"
  },
  {
    id: "dsa-hashing-001",
    skill: "DSA",
    topic: "Hashing",
    level: "Junior",
    question: "When do you use HashMap in DSA problems?",
    answer: [
      "I use HashMap when I need fast lookup, frequency counting, grouping, or checking if a value was seen before."
    ],
    keyPoints: ["Average lookup O(1).", "Useful for two sum.", "Uses extra memory."],
    followUps: ["HashMap vs HashSet?", "What is frequency map?"],
    source: "dsa/05-hashing-and-sets/"
  },
  {
    id: "dsa-two-pointers-001",
    skill: "DSA",
    topic: "Patterns",
    level: "Mid",
    question: "What is the two pointers pattern?",
    answer: [
      "Two pointers means using two indexes to scan data efficiently. It is common in arrays, strings, sorted data, and linked list problems."
    ],
    keyPoints: ["Can reduce nested loops.", "Common for sorted arrays.", "Useful for palindrome and pair problems."],
    followUps: ["When use fast and slow pointers?", "Two pointers vs sliding window?"],
    source: "dsa/12-interview-patterns/"
  },
  {
    id: "dsa-sliding-window-001",
    skill: "DSA",
    topic: "Patterns",
    level: "Mid",
    question: "What is sliding window?",
    answer: [
      "Sliding window is used for subarray or substring problems where we maintain a moving range instead of recalculating from scratch."
    ],
    keyPoints: ["Useful for contiguous data.", "Can be fixed or variable size.", "Often improves O(n^2) to O(n)."],
    followUps: ["Fixed vs variable window?", "When not to use sliding window?"],
    source: "dsa/12-interview-patterns/"
  },
  {
    id: "dsa-dp-001",
    skill: "DSA",
    topic: "Dynamic Programming",
    level: "Senior",
    question: "How do you identify a dynamic programming problem?",
    answer: [
      "A problem may need dynamic programming when it has overlapping subproblems and optimal substructure. That means smaller results can be reused to build the final answer."
    ],
    keyPoints: ["Overlapping subproblems.", "Optimal substructure.", "Use memoization or tabulation."],
    followUps: ["Memoization vs tabulation?", "What is state in DP?"],
    source: "dsa/10-dynamic-programming/"
  },
  {
    id: "coding-two-sum-001",
    skill: "Java Coding Problems",
    topic: "Arrays",
    level: "Junior",
    question: "How do you solve Two Sum?",
    answer: [
      "Use a HashMap to store numbers and their indexes. For each number, calculate target minus current number and check if that value already exists in the map."
    ],
    keyPoints: ["One pass solution.", "Time O(n).", "Space O(n)."],
    followUps: ["Can it be solved without extra space?", "What if array is sorted?"],
    source: "java-coding-problems/two-sum/"
  },
  {
    id: "coding-max-subarray-001",
    skill: "Java Coding Problems",
    topic: "Arrays",
    level: "Mid",
    question: "Explain Kadane's algorithm for maximum subarray.",
    answer: [
      "Kadane's algorithm keeps current sum and best sum. If current sum becomes worse than starting fresh, we restart from current element."
    ],
    keyPoints: ["Time O(n).", "Handles continuous subarray.", "Track current and best."],
    followUps: ["How handle all negative numbers?", "Can you print the subarray too?"],
    source: "java-coding-problems/maximum-subarray/"
  },
  {
    id: "system-scale-001",
    skill: "Backend System Design",
    topic: "Scalability",
    level: "Mid",
    question: "What does scalability mean in backend systems?",
    answer: [
      "Scalability means the system can handle increased load by adding resources or improving design. We can scale vertically by using a bigger server or horizontally by adding more servers."
    ],
    keyPoints: ["Vertical scaling means bigger machine.", "Horizontal scaling means more machines.", "Stateless services are easier to scale."],
    followUps: ["What is load balancing?", "Why stateless helps scaling?"],
    source: "backend-system-design/scalability-basics/"
  },
  {
    id: "system-cache-001",
    skill: "Backend System Design",
    topic: "Caching",
    level: "Mid",
    question: "Why do we use caching?",
    answer: [
      "Caching stores frequently used data in a faster place so the system can respond quickly and reduce database load."
    ],
    keyPoints: ["Improves speed.", "Reduces repeated database queries.", "Need invalidation strategy."],
    followUps: ["What can go wrong with cache?", "What is cache invalidation?"],
    source: "backend-system-design/caching/"
  },
  {
    id: "system-rate-limit-001",
    skill: "Backend System Design",
    topic: "Reliability",
    level: "Senior",
    question: "What is rate limiting?",
    answer: [
      "Rate limiting controls how many requests a user or client can make in a given time. It protects the system from abuse, overload, and accidental traffic spikes."
    ],
    keyPoints: ["Protects APIs.", "Can be per user, IP, or token.", "Return 429 when limit is crossed."],
    followUps: ["Token bucket vs fixed window?", "Where do you apply rate limiting?"],
    source: "backend-system-design/rate-limiting/"
  },
  {
    id: "project-diet-engine-001",
    skill: "Project",
    topic: "Diet Engine",
    level: "Mid",
    question: "Explain your Diet Engine project in interview language.",
    answer: [
      "I worked on a Diet Engine system in the nutrition and healthcare domain. The system generated personalized diet and meal plans based on user goals, food preferences, restrictions, eating pattern, and history.",
      "My work included backend APIs, business logic, database design, admin dashboard modules, mobile app integration, and automation logic."
    ],
    keyPoints: ["Mention business problem.", "Mention automation and backend logic.", "Mention real impact: reduced manual work."],
    followUps: ["What challenges did you face?", "How did you handle dynamic diet rules?"],
    source: "interview-preparation/explain-current-previous-project/"
  },
  {
    id: "project-call-allocation-001",
    skill: "Project",
    topic: "Automation",
    level: "Mid",
    question: "How did your customer support call automation work?",
    answer: [
      "The system automatically scheduled and allocated calls to employees based on call type and conditions. It handled calls like weight check, motivation, birthday, feedback, and pre/post diet calls."
    ],
    keyPoints: ["Avoid duplicate assignment.", "Manage priorities.", "Reduce manual team work."],
    followUps: ["How did you avoid duplicate calls?", "How did it improve productivity?"],
    source: "interview-preparation/project-challenges/"
  },
  {
    id: "project-spring-employee-001",
    skill: "Project",
    topic: "Spring Boot Project",
    level: "Junior",
    question: "Explain your Employee Task / Call Allocation System.",
    answer: [
      "It is a Spring Boot backend project for managing employees, tasks, and call assignments. Admin can create employees, create tasks, assign tasks, and track status using REST APIs.",
      "I used controller, service, and repository layers, DTOs, entities, Spring Data JPA, MySQL, and global exception handling."
    ],
    keyPoints: ["Mention layered architecture.", "Mention REST APIs.", "Mention JPA and MySQL."],
    followUps: ["What APIs did you create?", "How did you design the database?"],
    source: "interview-preparation/spring-boot-project/"
  },
  {
    id: "behavior-self-intro-001",
    skill: "Behavioral",
    topic: "Personal",
    level: "Junior",
    question: "Tell me about yourself.",
    answer: [
      "My name is Vishwambhar Patil. I have around 9 years of experience as a Software Developer, mainly in nutrition and healthcare-related applications.",
      "I have worked on Android apps, backend APIs, admin panels, automation systems, databases, and mobile apps. Recently I am focusing more on Java backend, Spring Boot, REST APIs, and DSA."
    ],
    keyPoints: ["Keep it 1.5 to 2 minutes.", "Focus on backend direction.", "Mention real experience."],
    followUps: ["Why Java backend now?", "What was your strongest project?"],
    source: "interview-preparation/tell-me-about-yourself/"
  },
  {
    id: "behavior-job-change-001",
    skill: "Behavioral",
    topic: "Career",
    level: "Junior",
    question: "Why are you looking for a job change?",
    answer: [
      "I am looking for a job change because I want to work more in Java backend and modern backend technologies like Spring Boot. I already have practical experience in backend logic, APIs, databases, and automation systems."
    ],
    keyPoints: ["Do not speak negatively.", "Focus on growth.", "Connect to Java/Spring Boot direction."],
    followUps: ["Why should we hire you?", "What role are you looking for?"],
    source: "interview-preparation/job-change/"
  },
  {
    id: "behavior-hire-001",
    skill: "Behavioral",
    topic: "Hiring",
    level: "Mid",
    question: "Why should we hire you?",
    answer: [
      "You should hire me because I have practical experience working on real business systems and solving real problems through software. I have worked on backend systems, APIs, databases, automation tools, mobile apps, and admin dashboards."
    ],
    keyPoints: ["Mention practical experience.", "Mention automation thinking.", "Mention willingness to learn Java backend."],
    followUps: ["What value can you add?", "What is your strongest skill?"],
    source: "interview-preparation/why-should-we-hire-you/"
  }
];
