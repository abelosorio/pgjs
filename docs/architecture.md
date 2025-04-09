# Architecture

## Overview

### 1. Functional Programming
- Use only pure functions, not classes.
- All functions should be immutable (no side effects).
- Functions should be predictable and testable.
- Avoid shared state between functions.

### 2. Code Readability
- Code should be easy to understand for a high school student.
- Use descriptive variable and function names.
- Add comments for complex logic.
- Break down complex operations into smaller, focused functions.

### 3. Code Organization
- Keep files under 30 lines when possible.
- Keep lines under 80 characters when possible.
- Split large files into smaller, focused modules.
- Group related functionality together.

### 4. Test-Driven Development
- Write tests before implementing functionality.
- For bugfixes, first write a test that reproduces the bug.
- Tests should be clear and focused on a single behavior.
- Use descriptive test names that explain the expected behavior.
- Tests should be independent and not rely on each other.

### 5. Builder Pattern
Every clause and command follows a builder pattern:
```typescript
// Example: WITH clause
const query = with_('cte_name')
  .as(subquery)
  .select()
  .from('table')
```

### 6. Type Structure
Each clause/command has:
- Options type for configuration.
- Main type for the clause/command.
- Builder function that returns methods.

### 7. SQL Generation
- Use `toSql` utility for consistent SQL formatting.
- Keep SQL generation in the `toSql` method.
- Handle options and parameters consistently.

### 8. Error Handling
- All error types must be defined in the `errors/` folder
- Each error type should be in its own file (e.g., `errors/subquery.ts`)
- Error classes should extend `Error` and set their `name` property
- Use specific error types for validation (e.g., `SubqueryValidationError`)
- Validate early in the builder chain
- Provide clear error messages that guide users to fix the issue

## File Structure
```
lib/
  ├── clauses/           # SQL clauses (WITH, WHERE, etc.)
  │   └── clause-name/
  │       ├── index.ts   # Exports
  │       ├── types.ts   # Type definitions
  │       └── clause.ts  # Implementation
  ├── commands/          # SQL commands (SELECT, INSERT, etc.)
  ├── decorators/        # Reusable decorators
  ├── errors/           # Error types and classes
  ├── types/            # Shared types
  └── utils/            # Shared utilities
```

## Implementation Steps
1. Write tests for the new functionality.
2. Define types.
3. Create builder function.
4. Implement methods.
5. Add SQL generation.
6. Add validation.
7. Refactor and ensure all tests pass.

## Bugfixing Process
1. Write a test that reproduces the bug.
2. Run the test to confirm it fails.
3. Implement the fix.
4. Run the test to confirm it passes.
5. Refactor if needed while keeping tests passing.

## Best Practices
- Start with tests before implementation.
- Use TypeScript's type system to enforce constraints.
- Keep functions focused on a single responsibility.
- Use composition over inheritance.
- Prefer explicit over implicit behavior.
- Document public APIs thoroughly.
- Use consistent naming conventions.
- Handle edge cases explicitly.

## Naming Conventions

### Builder Functions, Resolvers, and Commands
Each SQL component follows a consistent naming pattern:

1. **Builder Functions** (e.g., `selectBuilder`, `withBuilder`)
   - Entry point for creating a new SQL component
   - Returns a Command type
   - Example: `selectBuilder()` returns `SelectCommand`

2. **Resolvers** (e.g., `selectResolver`, `withResolver`)
   - Functions that create builder functions
   - Accept context/input parameters
   - Return a function that creates Commands
   - Example: `selectResolver(input)` returns `SelectResolver`

3. **Commands** (e.g., `SelectCommand`, `WithCommand`)
   - The final type returned by builders
   - Contains all methods for the SQL component
   - Example: `SelectCommand` has `from`, `where`, etc.

4. **Internal Functions** (e.g., `_select`, `_with`)
   - Private implementation functions
   - Used by builders and resolvers
   - Prefixed with underscore
   - Example: `_select()` implements the core SELECT logic

This pattern should be followed for all SQL components to maintain consistency:
```typescript
// Example structure
type MyCommand = {
  method1: () => MyCommand
  method2: () => MyCommand
}

type MyResolver = () => MyCommand

function _myCommand(): MyCommand {
  // Implementation
}

function myResolver(input?: Input): MyResolver {
  return () => _myCommand()
}

function myBuilder(): MyCommand {
  return _myCommand()
}
```  