---
layout: default
title: Golang Development Guidelines
---

# Introduction

This document outlines the coding conventions and practices for the project, specifically tailored for golang development. Adhering to these standards ensures code consistency, readability, and maintainability across the project.

---

# General Coding Standards

## Naming Conventions

### Variables and Functions:

Use `camelCase` for variable.

- Additional words can be added to disambiguate similar names, for example userCount and projectCount.
- Do not simply drop letters to save typing. For example `sandbox` is preferred over `Sbx`, particularly for exported names.
- Omit types and type-like words from most variable names.
  - For a number, `userCount` is a better name than `numUsers` or `usersInt`.
  - For a slice, `users` is a better name than `userSlice`.
- Omit words that are clear from the surrounding context. For example, in the implementation of a `UserCount` method, a local variable called `userCount` is probably redundant; `count`, `users` are just as readable.
- Use `camelCase` for function names if they are not exported, and `PascalCase` if they are exported. For example, `getUserByID` is a private function, and `GetUserByID` is a public function. All that is not exported should be added after the // private comment.

### Structs:

Use `PascalCase` for struct names.

**Good Example**:

```go
type User struct {
    ID   int
    Name string
}

users := []User{
    {ID: 1, Name: "Alice"},
    {ID: 2, Name: "Bob"},
}

var userCount int

func GetUserByID(userID int) {
    // Implementation
}

// private
func getUserByID(userID int) {
    // Implementation
}
```

**Bad Example**:

```go
type UserStruct struct {
    UserID   int
    UserName string
}

userSlice := []UserStruct{
    {UserID: 1, UserName: "Alice"},
    {UserID: 2, UserName: "Bob"},
}

var user_count int

func getUserByID(userID int) {
    // Implementation
}

// private
func GetUserByID(userID int) {
    // Implementation
}
```

---

### Interfaces:

- Interfaces should be prefixed with `I` (e.g., `IService`) to indicate it's an interface.

Good Example:

```go
type IUserService interface {
    GetUserByID(id int) (*User, error)
}
```

Bad Example:

```go
type UserService interface {
    GetUserByID(id int) (*User, error)
}
```

---

### Constants:

Use MixedCaps for constants.

- **MixedCaps**: For example, a constant is MaxLength (not MAX_LENGTH) if exported and maxLength (not max_length) if unexported.

**Good Example:**

```go
const MaxLength = 10
const minPasswordLength = 8
```

**Bad Example:**

```go
const MAX_LENGTH = 10
const MIN_PASSWORD_LENGTH = 8
```

### Packages

Go package names should be short and contain only lowercase letters. A package name composed of multiple words should be left unbroken in all lowercase. For example, the package tabwriter is not named `tabWriter`, `TabWriter`, or `tab_writer`. Additionally the packages must be self-explanative and should not be named `common`, `utils`, `helpers`, etc.

To avoid the code duplication, functions inside the packages must not be named the same as the package name.

**Good Example:**

```go
package user

func GetByID(id int) (*User, error) {
    // Implementation
}
```

```go
package main

import "github.com/username/project/user"

func main() {
    user.GetByID(1)
}
```

**Bad Example:**

```go
package user

func GetUserByID(id int) (*User, error) {
    // Implementation
}
```

```go
package main

import "github.com/username/project/user"

func main() {
    user.GetUserByID(1)
}
```

---

## Code Structure

### File Naming:

Use descriptive names, and separate words with underscores (e.g., `user.go`, `user_validations.go`).

### Folder Structure:

Organize code into meaningful packages and folders (e.g., `controller/`, `service/`, `repository/`, `model/`, `pkg/`)

### Test Files:

Name test files with `_test.go` suffix (e.g., `user_test.go`).

**Good Example:**

```go
package user
package uservalidations
```

```
project/
    ├── controller/
    │   ├── user.go
    |   ├── user_test.go
    │   └── ...
    ├── service/
    │   ├── user.go
    |   ├── user_test.go
    │   └── ...
    ├── repository/
    │   ├── user.go
    |   ├── user_test.go
    │   └── ...
    |── model/
    |   ├── user.go
    └── main.go
```

**Bad Example:**

```go
package User
package user_validations
```

```
project/
    ├── controllers/
    │   ├── controller_user.go
    |   ├── controller_userTest.go
    │   └── ...
    ├── services/
    │   ├── userService.go
    |   ├── userService_test.go
    │   └── ...
    ├── repositories/
    │   ├── userRepository.go
    |   ├── userRepositorytest.go
    │   └── ...
    |── models/
    |   ├── user_model.go
    └── main.go
```

---

## Formatting

### Newlines:

Ensure there is a newline after `}` when there is a `return` or new `var` and before `var` or any other line following a closing brace. 

Also, include a newline after each `case` in a `switch` statement.

**Good Example:**

```go
func example() {
    if condition {
        return
    }

    var x int
    x = 10
    if x > 5 {
        fmt.Println("x is greater than 5")
    }

    switch x {
    case 1:
        fmt.Println("x is 1")

    case 2:
        fmt.Println("x is 2")

    default:
        fmt.Println("x is neither 1 nor 2")
    }

    return x
}
```

**Bad Example:**

```go
func example() {
    if condition {
        return
    }
    var x int
    x = 10
    if x > 5 {
        fmt.Println("x is greater than 5")
    }
    switch x {
    case 1:
        fmt.Println("x is 1")
    case 2:
        fmt.Println("x is 2")
    default:
        fmt.Println("x is neither 1 nor 2")
    }
    return x
}
```

### Commenting:

Add comments to explain complex logic or non-obvious code.

---

## Error Handling

### Error return:

Prefer returning errors explicitly instead of using panic.

**Good Example:**

```go
func getUserByID(userID int) (*User, error) {
    user, err := userRepository.FindByID(userID)
    if err != nil {
        return nil, fmt.Errorf("finding user by ID failed: %v", err)
    }

    return user, nil
}
```

**Bad Example:**

```go
func getUserByID(userID int) *User {
    user, err := userRepository.FindByID(userID)
    if err != nil {
        panic(err)
    }

    return user
}
```

---

### Error Messages:

Provide meaningful error messages when returning errors.

**Good Example:**

```go
func getUserByID(userID int) (*User, error) {
    user, err := userRepository.FindByID(userID)
    if err != nil {
        return nil, fmt.Errorf("finding user by ID failed: %v", err)
    }

    return user, nil
}
```

**Bad Example:**

```go
func getUserByID(userID int) (*User, error) {
    user, err := userRepository.FindByID(userID)
    if err != nil {
        return nil, err
    }

    return user, nil
}
```

---

### Error shorthand:

Use the `err` shorthand for error variables.

**Good Example:**

```go
if err := someFunction(); err != nil {
    return err
}
```

**Bad Example:**

```go
err := someFunction()
if err != nil {
    return err
}
```

---

## Miscellaneous

### One-letter variable names:

Avoid using one-letter variable names except in cases like loop indices or maths (`i`, `j`, `k`).

**Good Example:**

```go
func calculateArea(length, width int) int {
    return length * width
}
```

**Bad Example:**

```go
func calculateArea(l, w int) int {
    return l * w
}
```

### Enumerations:

Enums should be defined within the `model` package with their respective constants.

**Good Example:**

```go
package enum

type Coverage string

const (
	CoverageMostSegments      Coverage = "MOST_SEGMENTS"
	CoverageAtLeastOneSegment Coverage = "AT_LEAST_ONE_SEGMENT"
	CoverageAllSegments       Coverage = "ALL_SEGMENTS"
)

var Coverages = []string{
	string(CoverageMostSegments),
	string(CoverageAtLeastOneSegment),
	string(CoverageAllSegments),
}
```

**Bad Example:**

```go
package enum

const (
    MostSegments      = "MOST_SEGMENTS"
    AtLeastOneSegment = "AT_LEAST_ONE_SEGMENT"
    AllSegments       = "ALL_SEGMENTS"
)

var Coverages = []string{
    MostSegments,
    AtLeastOneSegment,
    AllSegments,
}
```

---

# Layer-Specific Guidelines

To ensure the maintainability and scalability of Golang projectts, there are multiple different software design patterns available. Here are some of the most common patterns used in Golang projects.

## MVC Layered Pattern based on Gin Gonic

### Router (using Gin Gonic)

- Define routes using Gin Gonic's Router.
- Use meaningful route paths and HTTP methods.

#### Example: Gin Router Setup

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()

    // Example route with handler
    router.GET("/users/:id", getUserHandler)

    router.Run(":8080")
}

func getUserHandler(ctx *gin.Context) {
    // Implementation to fetch user by ID
    userID := ctx.Param("id")

    // Call service layer to fetch user details
    user, err := userService.GetUserByID(userID)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "error": err.Error()
        })
        return
    }

    ctx.JSON(http.StatusOK, user)
}
```

### Controller

- Controllers should handle HTTP request/response lifecycle.
- Validate request, query, path parameters, and call service methods.

Example: **UserController**

```go
package controllers

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "strconv"
)

// UserController handles user-related requests
type UserController struct {
    userService IUserService
}

// NewUserController creates a new UserController
func NewUserController(userService IUserService) *UserController {
    return &UserController{userService: userService}
}

// GetUserByID retrieves a user by ID
func (userController *UserController) GetUserByID(ctx *gin.Context) {
    idStr := ctx.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "error": "invalid id parameter"
        })
        return
    }

    user, err := userController.userService.GetUser(id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": err.Error()
        })
        return
    }

    ctx.JSON(http.StatusOK, user)
}
```

### Service

- Business logic should reside here.
- Follow Single Responsibility Principle (SRP) for service methods.

Example: **UserService**

```go
package services

import (
    "errors"
)

// UserService provides user-related operations
type UserService struct {
    // Service dependencies if any
}

// NewUserService creates a new instance of UserService
func NewUserService() *UserService {
    return &UserService{}
}

// GetUser retrieves a user by ID
func (userService *UserService) GetUser(id int) (*User, error) {
    // Example logic to fetch user from repository layer
    user, err := userRepository.FindByID(id)
    if err != nil {
        return nil, errors.New("failed to fetch user")
    }

    return user, nil
}
```

### Repository

- Data access layer for interacting with databases or external services.
- Implement data persistence logic.

Example: **UserRepository**

```go
package repositories

// UserRepository provides data access operations for users
type UserRepository struct {
    // Repository dependencies if any
}

// NewUserRepository creates a new instance of UserRepository
func NewUserRepository() *UserRepository {
    return &UserRepository{}
}

// FindByID retrieves a user by ID from the database
func (userRepository *UserRepository) FindByID(id int) (*User, error) {
    // Example implementation to fetch user from database or external service
    // Placeholder code for demonstration purposes
    user := &User{
        ID:   id,
        Name: "John Doe",
        Age:  30,
    }

    return user, nil
}
```

# Software Design

## SOLID

At Wisepace we're using SOLID development principles to ensure the maintainability of the code.

### 1. Single Responsibility Principle (SRP)
Each module or class should have one, and only one, reason to change.

In Go, this means that a function or struct should only do one thing.

Bad:
```go
type Report struct {
    Title string
    Data  []string
}

func (r *Report) Generate() string {
    return "Report Title: " + r.Title
}

func (r *Report) SaveToFile(filename string) error {
    // Saving logic here...
    return nil
}
```

Here, the Report struct handles both generating the report and saving it to a file. These are two separate responsibilities.

Good:

```go
type Report struct {
    Title string
    Data  []string
}

func (r *Report) Generate() string {
    return "Report Title: " + r.Title
}

type FileSaver struct {}

func (fs *FileSaver) SaveToFile(filename string, content string) error {
    // Saving logic here...
    return nil
}
```

Now, Report is responsible for generating reports, while FileSaver is responsible for file-saving logic.

### 2. Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification.

In Go, this means you should design your code to allow new functionality to be added without changing existing code.

Bad:
```go
type PaymentProcessor struct {}

func (p *PaymentProcessor) Process(paymentType string) {
    if paymentType == "credit" {
        // Process credit payment
    } else if paymentType == "paypal" {
        // Process PayPal payment
    }
}
```
Adding a new payment type requires modifying Process.

Good:

```go
type PaymentMethod interface {
    Pay()
}

type CreditPayment struct {}

func (c *CreditPayment) Pay() {
    // Process credit payment
}

type PayPalPayment struct {}

func (p *PayPalPayment) Pay() {
    // Process PayPal payment
}

type PaymentProcessor struct {}

func (p *PaymentProcessor) Process(method PaymentMethod) {
    method.Pay()
}
```

Now, to add a new payment type, you just implement the PaymentMethod interface.

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without altering the correctness of the program.

In Go, this means you should ensure that implementations of an interface adhere to its contract.

Bad:

```go
type Bird interface {
    Fly()
}

type Sparrow struct {}

func (s *Sparrow) Fly() {
    // Sparrow flies
}

type Ostrich struct {}

func (o *Ostrich) Fly() {
    panic("Ostriches can't fly!")
}
```

Here, Ostrich violates the principle because it doesn’t conform to the expected behavior of Bird.

Good:

```go
type Bird interface {
    Move()
}

type Sparrow struct {}

func (s *Sparrow) Move() {
    fmt.Println("Sparrow flies!")
}

type Ostrich struct {}

func (o *Ostrich) Move() {
    fmt.Println("Ostrich runs!")
}
```

Now both Sparrow and Ostrich adhere to the behavior defined by the Bird interface.

### 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

In Go, this means creating smaller, more focused interfaces.

Bad:

```go
type Printer interface {
    Print()
    Scan()
    Fax()
}

type BasicPrinter struct {}

func (p *BasicPrinter) Print() {
    fmt.Println("Printing...")
}

func (p *BasicPrinter) Scan() {
    panic("Scan not supported!")
}

func (p *BasicPrinter) Fax() {
    panic("Fax not supported!")
}
```

A BasicPrinter doesn’t need to implement Scan or Fax.

Good:

```go
type Printer interface {
    Print()
}

type Scanner interface {
    Scan()
}

type Faxer interface {
    Fax()
}

type BasicPrinter struct {}

func (p *BasicPrinter) Print() {
    fmt.Println("Printing...")
}
```

Now BasicPrinter only implements what it needs.

### 5. Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions.

In Go, this means your code should depend on interfaces, not specific implementations.

Bad:

```go
type Database struct {}

func (d *Database) Save(data string) {
    fmt.Println("Saving data:", data)
}

type UserService struct {
    DB Database
}

func (us *UserService) StoreUser(name string) {
    us.DB.Save(name)
}
```
Here, UserService is tightly coupled to Database.

Good:

```go
type Storage interface {
    Save(data string)
}

type Database struct {}

func (d *Database) Save(data string) {
    fmt.Println("Saving data:", data)
}

type UserService struct {
    Storage Storage
}

func (us *UserService) StoreUser(name string) {
    us.Storage.Save(name)
}
```

Now, UserService depends on the Storage interface, so you can easily replace Database with another implementation.

Recap
SRP: One responsibility per module.
OCP: Add new features without modifying existing code.
LSP: Subtypes should behave as their base type expects.
ISP: Create focused interfaces.
DIP: Depend on interfaces, not implementations.
Using these principles, your Go code will become easier to maintain, extend, and understand!

# Code Review

Code reviews are main part of software delivery process, where product development team is responsible for the changes reaching the production.

## Code Review Checklist

Add code review checklist, where developers can ensure, they have followed all the best practices.

Example checklist:

```
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I've performed/added tests/lints that prove my fix is effective or that my feature works
```

## 4-Eye Principle

All code changes must be reviewed at least by two team members before merging into the main branch. If no resources are available, the code can be reviewed by one senior team member or mentor.

Team members must test the code locally to ensure that it works as expected. If not possible, the reviewer should ask the author to provide a demo or test environment, where the feature can be tested.

## Draft PR

Before creating a PR and assigning to team member, create a draft PR and check that code follows the guidelines mentioned on this page.

## Commit Messages

Commit messages should be clear and descriptive. 

Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to maintain consistency across the project if any other process is not used.

**Good Example:**

```
feat: add user registration endpoint
```

**Bad Example:**

```
Added new feature
```

# Conclusion

By following these coding conventions and best practices, we aim to maintain a high standard of code quality, readability, and maintainability across the project. 

Consistency in coding style and structure will help streamline development and collaboration among team members. 

For any questions or suggestions regarding these practices, please reach out to the team.


# References

- [Effective Go](https://golang.org/doc/effective_go)
- [Learning Go: An Idiomatic Approach to Real-World Go Programming by Jon Bodner](https://www.amazon.com/Learning-Go-Idiomatic-Real-World-Programming/dp/1492077216)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Semantic Versioning](https://semver.org/)
- [Gin Gonic](https://gin-gonic.com/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Twelve Factor App](https://12factor.net/)
