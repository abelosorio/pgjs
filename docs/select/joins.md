# Joins

Join multiple tables in your query using various join types.

## Join Types

pgjs supports all standard PostgreSQL join types:

```typescript
// Inner join
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .innerJoin(['author', 'a'])
  .on('b.author_id = a.id')
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b INNER JOIN author AS a ON b.author_id = a.id;

// Left join
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .leftJoin(['author', 'a'])
  .on('b.author_id = a.id')
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b LEFT JOIN author AS a ON b.author_id = a.id;

// Right join
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .rightJoin(['author', 'a'])
  .on('b.author_id = a.id')
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b RIGHT JOIN author AS a ON b.author_id = a.id;

// Full join
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .fullJoin(['author', 'a'])
  .on('b.author_id = a.id')
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b FULL JOIN author AS a ON b.author_id = a.id;

// Cross join
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .crossJoin(['author', 'a'])
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b CROSS JOIN author AS a;
```

## Join Conditions

### Basic Join Conditions

```typescript
// Simple join condition
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .innerJoin(['author', 'a'])
  .on('b.author_id = a.id')
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b INNER JOIN author AS a ON b.author_id = a.id;

// Join with parameters
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .innerJoin(['author', 'a'])
  .on('b.author_id = $1 AND b.status = $2', [123, 'published'])
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b INNER JOIN author AS a ON b.author_id = $1 AND b.status = $2;
```

### Complex Join Conditions

```typescript
// Complex join conditions using DSL
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .innerJoin(['author', 'a'])
  .on(and(
    'b.author_id = a.id',
    or('b.status = $1', 'b.genre = $2'),
    'b.published_at > $3'
  ), ['published', 'fiction', '2023-01-01'])
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b INNER JOIN author AS a ON (b.author_id = a.id AND (b.status = $1 OR b.genre = $2) AND b.published_at > $3);

// Type-safe join conditions using helper functions
select('b.id', 'b.title', ['a.id', 'author_id'])
  .from(['book', 'b'])
  .innerJoin(['author', 'a'])
  .on(and(
    eq('b.author_id', 'a.id'),
    or(eq('b.status', 'published'), eq('b.genre', 'fiction')),
    gt('b.published_at', '2023-01-01')
  ))
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id FROM book AS b INNER JOIN author AS a ON (b.author_id = a.id AND (b.status = $1 OR b.genre = $2) AND b.published_at > $3);
```

## Multiple Joins

```typescript
// Multiple joins
select('b.id', 'b.title', ['a.id', 'author_id'], ['p.id', 'publisher_id'])
  .from(['book', 'b'])
  .innerJoin(['author', 'a'])
  .on('b.author_id = a.id')
  .innerJoin(['publisher', 'p'])
  .on('b.publisher_id = p.id')
  .toSql()
// Output: SELECT b.id, b.title, a.id AS author_id, p.id AS publisher_id FROM book AS b INNER JOIN author AS a ON b.author_id = a.id INNER JOIN publisher AS p ON b.publisher_id = p.id;
``` 