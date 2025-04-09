# Basic Usage

The Select query is the foundation of data retrieval in pgjs. It provides a fluent API for building PostgreSQL SELECT statements.

## Basic Usage

```typescript
import { select } from 'pgjs'

// Select all columns
select()
  .from('book')
  .toSql()
// Output: SELECT * FROM book;

// Select specific columns
select('id', 'title', 'author')
  .from('book')
  .toSql()
// Output: SELECT id, title, author FROM book;
```

## Features

### Column Selection

Select specific columns or all columns from a table:

```typescript
// Select all columns
select()
  .from('book')
  .toSql()
// Output: SELECT * FROM book;

// Select specific columns
select('id', 'title', 'author')
  .from('book')
  .toSql()
// Output: SELECT id, title, author FROM book;

// Select with aliases
select(['id', 'book_id'], ['title', 'book_title'])
  .from('book')
  .toSql()
// Output: SELECT id AS book_id, title AS book_title FROM book;
```

### Table Selection

Use the `from` clause to specify the table to select from:

```typescript
// Simple table
select()
  .from('book')
  .toSql()
// Output: SELECT * FROM book;

// Table with alias
select()
  .from(['book', 'b'])
  .toSql()
// Output: SELECT * FROM book AS b;
``` 