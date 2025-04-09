# Ordering and Pagination

Order your query results and implement pagination using ORDER BY, LIMIT, and OFFSET.

## ORDER BY

Order rows based on one or more columns:

```typescript
// Simple ORDER BY
select()
  .from('book')
  .orderBy('title')
  .toSql()
// Output: SELECT * FROM book ORDER BY title;

// ORDER BY with direction
select()
  .from('book')
  .orderBy('title', 'desc')
  .toSql()
// Output: SELECT * FROM book ORDER BY title DESC;

// Multiple columns
select()
  .from('book')
  .orderBy('author', 'asc')
  .orderBy('title', 'asc')
  .toSql()
// Output: SELECT * FROM book ORDER BY author ASC, title ASC;

// Using array syntax
select()
  .from('book')
  .orderBy(['author', 'asc'], ['title', 'asc'])
  .toSql()
// Output: SELECT * FROM book ORDER BY author ASC, title ASC;
```

## LIMIT and OFFSET

Limit the number of rows returned and skip rows for pagination:

```typescript
// Simple LIMIT
select()
  .from('book')
  .limit(10)
  .toSql()
// Output: SELECT * FROM book LIMIT 10;

// LIMIT with OFFSET
select()
  .from('book')
  .limit(10)
  .offset(20)
  .toSql()
// Output: SELECT * FROM book LIMIT 10 OFFSET 20;

// Using array syntax for LIMIT and OFFSET
select()
  .from('book')
  .limit([10, 20])
  .toSql()
// Output: SELECT * FROM book LIMIT 10 OFFSET 20;
```

## Combining Ordering with Other Clauses

```typescript
// ORDER BY with WHERE
select()
  .from('book')
  .where('published = true')
  .orderBy('title')
  .toSql()
// Output: SELECT * FROM book WHERE published = true ORDER BY title;

// ORDER BY with GROUP BY
select('genre', 'COUNT(*) as count')
  .from('book')
  .groupBy('genre')
  .having('COUNT(*) > $1', [5])
  .orderBy('count', 'desc')
  .toSql()
// Output: SELECT genre, COUNT(*) as count FROM book GROUP BY genre HAVING COUNT(*) > $1 ORDER BY count DESC;

// Complete example with all clauses
select('genre', 'COUNT(*) as count', 'AVG(page_count) as avg_pages')
  .from('book')
  .where('published = true')
  .groupBy('genre')
  .having('COUNT(*) > $1 AND AVG(page_count) > $2', [5, 300])
  .orderBy('avg_pages', 'desc')
  .limit(10)
  .offset(20)
  .toSql()
// Output: SELECT genre, COUNT(*) as count, AVG(page_count) as avg_pages FROM book WHERE published = true GROUP BY genre HAVING COUNT(*) > $1 AND AVG(page_count) > $2 ORDER BY avg_pages DESC LIMIT 10 OFFSET 20;
```

## Pagination Helper

pgjs provides a helper function for pagination:

```typescript
// Using paginate helper
select()
  .from('book')
  .orderBy('title')
  .paginate(2, 10)
  .toSql()
// Output: SELECT * FROM book ORDER BY title LIMIT 10 OFFSET 10;

// With other clauses
select('genre', 'COUNT(*) as count', 'AVG(page_count) as avg_pages')
  .from('book')
  .where('published = true')
  .groupBy('genre')
  .having('COUNT(*) > $1 AND AVG(page_count) > $2', [5, 300])
  .orderBy('avg_pages', 'desc')
  .paginate(3, 10)
  .toSql()
// Output: SELECT genre, COUNT(*) as count, AVG(page_count) as avg_pages FROM book WHERE published = true GROUP BY genre HAVING COUNT(*) > $1 AND AVG(page_count) > $2 ORDER BY avg_pages DESC LIMIT 10 OFFSET 20;
``` 