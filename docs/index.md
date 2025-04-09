# pgjs

THE ORM for PostgreSQL

## Features

- Type-safe SQL query builder
- First-class PostgreSQL support
- Modern async/await API
- Zero dependencies
- TypeScript-first design
- Comprehensive documentation

## Getting Started

```bash
npm install pgjs
```

## Quick Example

```typescript
import { select, eq, gt, count } from 'pgjs'

// Simple query
const query = select()
  .from('book')
  .where(eq('published', true))
  .toSql()
// Output: SELECT * FROM book WHERE published = $1;

// Complex query with joins and conditions
const complexQuery = select(
  'book.title',
  ['author.name', 'author_name'],
  [count(), 'book_count']
)
  .from('book')
  .innerJoin('author')
  .on(eq('book.author_id', 'author.id'))
  .where(gt('book.page_count', 300))
  .groupBy('book.title', 'author.name')
  .having(gt(count(), 5))
  .orderBy('book_count', 'DESC')
  .toSql()
// Output: SELECT book.title, author.name AS author_name, COUNT(*) AS book_count FROM book INNER JOIN author ON book.author_id = author.id WHERE book.page_count > $1 GROUP BY book.title, author.name HAVING COUNT(*) > $2 ORDER BY book_count DESC;
```

## Documentation

Check out our comprehensive documentation:

- [Introduction](/introduction)
- [Select Queries](/select/)
  - [Basics](/select/basics)
  - [Joins](/select/joins)
  - [Conditions](/select/conditions)
  - [Operators](/select/operators)
  - [Aggregates](/select/aggregates)
  - [Grouping](/select/grouping)
  - [Ordering](/select/ordering)
  - [Advanced](/select/advanced) 