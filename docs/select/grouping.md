# Grouping

Group and aggregate your query results using GROUP BY and HAVING clauses.

## GROUP BY

Group rows based on one or more columns:

```typescript
// Simple GROUP BY
select('genre')
  .from('book')
  .groupBy('genre')
  .toSql()
// Output: SELECT genre FROM book GROUP BY genre;

// Multiple columns GROUP BY
select('genre', 'publisher')
  .from('book')
  .groupBy('genre', 'publisher')
  .toSql()
// Output: SELECT genre, publisher FROM book GROUP BY genre, publisher;
```

## Aggregate Functions

Use aggregate functions with GROUP BY:

```typescript
// Basic aggregate functions
select(['count()', 'book_count'])
  .from('book')
  .groupBy('genre')
  .toSql()
// Output: SELECT COUNT(*) AS book_count FROM book GROUP BY genre;

// Multiple aggregate functions
select(
  'genre',
  ['count()', 'book_count'],
  ['avg(page_count)', 'avg_pages'],
  ['max(page_count)', 'max_pages'],
  ['min(page_count)', 'min_pages']
)
  .from('book')
  .groupBy('genre')
  .toSql()
// Output: SELECT genre, COUNT(*) AS book_count, AVG(page_count) AS avg_pages, MAX(page_count) AS max_pages, MIN(page_count) AS min_pages FROM book GROUP BY genre;
```

::: tip Aggregate Functions
For a complete list of available aggregate functions and their usage, see the [Aggregate Functions](/select/aggregates) page.
:::

## HAVING Clause

Filter groups after GROUP BY:

```typescript
// Simple HAVING condition
select('genre', ['count()', 'count'])
  .from('book')
  .groupBy('genre')
  .having(gt(count(), 5))
  .toSql()
// Output: SELECT genre, COUNT(*) AS count FROM book GROUP BY genre HAVING COUNT(*) > $1;

// Complex HAVING condition using DSL
select(
  'genre',
  ['count()', 'count'],
  ['avg(page_count)', 'avg_pages']
)
  .from('book')
  .groupBy('genre')
  .having(and(
    gt(count(), 5),
    gt(avg('page_count'), 300)
  ))
  .toSql()
// Output: SELECT genre, COUNT(*) AS count, AVG(page_count) AS avg_pages FROM book GROUP BY genre HAVING (COUNT(*) > $1 AND AVG(page_count) > $2);

// Type-safe HAVING condition using helper functions
select(
  'genre',
  ['count()', 'count'],
  ['avg(page_count)', 'avg_pages']
)
  .from('book')
  .groupBy('genre')
  .having(and(
    gt(count(), 5),
    gt(avg('page_count'), 300)
  ))
  .toSql()
// Output: SELECT genre, COUNT(*) AS count, AVG(page_count) AS avg_pages FROM book GROUP BY genre HAVING (COUNT(*) > $1 AND AVG(page_count) > $2);
```

## Combining with Other Clauses

GROUP BY can be combined with WHERE, ORDER BY, and LIMIT clauses:

```typescript
// GROUP BY with WHERE clause
select('genre', ['count()', 'count'])
  .from('book')
  .where(eq('published', true))
  .groupBy('genre')
  .having(gt(count(), 5))
  .toSql()
// Output: SELECT genre, COUNT(*) AS count FROM book WHERE published = $1 GROUP BY genre HAVING COUNT(*) > $2;

// GROUP BY with ORDER BY clause
select(
  'genre',
  ['count()', 'count'],
  ['avg(page_count)', 'avg_pages']
)
  .from('book')
  .groupBy('genre')
  .having(gt(count(), 5))
  .orderBy('avg_pages', 'DESC')
  .toSql()
// Output: SELECT genre, COUNT(*) AS count, AVG(page_count) AS avg_pages FROM book GROUP BY genre HAVING COUNT(*) > $1 ORDER BY avg_pages DESC;

// Complete example with all clauses
select(
  'genre',
  ['count()', 'count'],
  ['avg(page_count)', 'avg_pages']
)
  .from('book')
  .where(eq('published', true))
  .groupBy('genre')
  .having(and(
    gt(count(), 5),
    gt(avg('page_count'), 300)
  ))
  .orderBy('avg_pages', 'DESC')
  .limit(10)
  .offset(20)
  .toSql()
// Output: SELECT genre, COUNT(*) AS count, AVG(page_count) AS avg_pages FROM book WHERE published = $1 GROUP BY genre HAVING (COUNT(*) > $2 AND AVG(page_count) > $3) ORDER BY avg_pages DESC LIMIT 10 OFFSET 20;
``` 