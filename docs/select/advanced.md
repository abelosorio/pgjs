# Advanced Features

Use advanced PostgreSQL features like window functions, Common Table Expressions (CTEs), subqueries, and set operations.

## Window Functions

Use window functions for advanced analytics:

```typescript
// Simple window function
select(
  'genre',
  'title',
  'page_count',
  'AVG(page_count) OVER (PARTITION BY genre) as avg_genre_pages'
)
  .from('book')
  .toSql()
// Output: SELECT genre, title, page_count, AVG(page_count) OVER (PARTITION BY genre) as avg_genre_pages FROM book;

// Window function with ORDER BY
select(
  'genre',
  'title',
  'page_count',
  'RANK() OVER (PARTITION BY genre ORDER BY page_count DESC) as page_rank'
)
  .from('book')
  .toSql()
// Output: SELECT genre, title, page_count, RANK() OVER (PARTITION BY genre ORDER BY page_count DESC) as page_rank FROM book;

// Multiple window functions
select(
  'genre',
  'title',
  'page_count',
  'AVG(page_count) OVER (PARTITION BY genre) as avg_genre_pages',
  'RANK() OVER (PARTITION BY genre ORDER BY page_count DESC) as page_rank',
  'PERCENT_RANK() OVER (PARTITION BY genre ORDER BY page_count) as page_percentile'
)
  .from('book')
  .toSql()
// Output: SELECT genre, title, page_count, AVG(page_count) OVER (PARTITION BY genre) as avg_genre_pages, RANK() OVER (PARTITION BY genre ORDER BY page_count DESC) as page_rank, PERCENT_RANK() OVER (PARTITION BY genre ORDER BY page_count) as page_percentile FROM book;
```

## Common Table Expressions (CTEs)

Use CTEs for complex queries:

```typescript
// Simple CTE
with_('published_books', 
  select()
    .from('book')
    .where(eq('published', true))
)
  .select()
  .from('published_books')
  .toSql()
// Output: WITH published_books AS (SELECT * FROM book WHERE published = $1) SELECT * FROM published_books;

// Multiple CTEs
with_('published_books', 
  select()
    .from('book')
    .where(eq('published', true))
)
  .with_('book_stats',
    select('book_id', 'COUNT(*) as review_count')
      .from('review')
      .groupBy('book_id')
  )
  .select('pb.id', 'pb.title', 'bs.review_count')
  .from('published_books', 'pb')
  .leftJoin(['book_stats', 'bs'])
  .on(eq('pb.id', 'bs.book_id'))
  .toSql()
// Output: WITH published_books AS (SELECT * FROM book WHERE published = $1), book_stats AS (SELECT book_id, COUNT(*) as review_count FROM review GROUP BY book_id) SELECT pb.id, pb.title, bs.review_count FROM published_books AS pb LEFT JOIN book_stats AS bs ON pb.id = bs.book_id;

// Recursive CTE
with_('RECURSIVE', 'book_series',
  select('id', 'title', 'parent_id', '1 as level')
    .from('book')
    .where(isNull('parent_id'))
    .union(
      select('b.id', 'b.title', 'b.parent_id', 'bs.level + 1')
        .from('book', 'b')
        .innerJoin(['book_series', 'bs'])
        .on(eq('b.parent_id', 'bs.id'))
    )
)
  .select()
  .from('book_series')
  .orderBy('level', 'id')
  .toSql()
// Output: WITH RECURSIVE book_series AS (SELECT id, title, parent_id, 1 as level FROM book WHERE parent_id IS NULL UNION SELECT b.id, b.title, b.parent_id, bs.level + 1 FROM book AS b INNER JOIN book_series AS bs ON b.parent_id = bs.id) SELECT * FROM book_series ORDER BY level, id;
```

## Subqueries

Use subqueries for complex queries:

```typescript
// Subquery in WHERE clause
select()
  .from('book')
  .where(in_('id', 
    select('book_id')
      .from('review')
      .where(gte('rating', 4))
  ))
  .toSql()
// Output: SELECT * FROM book WHERE id IN (SELECT book_id FROM review WHERE rating >= $1);

// Subquery in FROM clause
select('b.id', 'b.title', 'r.review_count')
  .from(
    select('book_id', 'COUNT(*) as review_count')
      .from('review')
      .groupBy('book_id'),
    'r'
  )
  .innerJoin(['book', 'b'])
  .on(eq('b.id', 'r.book_id'))
  .toSql()
// Output: SELECT b.id, b.title, r.review_count FROM (SELECT book_id, COUNT(*) as review_count FROM review GROUP BY book_id) AS r INNER JOIN book AS b ON b.id = r.book_id;

// Correlated subquery
select('b.id', 'b.title', 
  select('COUNT(*)')
    .from('review')
    .where(eq('book_id', 'b.id'))
    .as('review_count')
)
  .from('book', 'b')
  .toSql()
// Output: SELECT b.id, b.title, (SELECT COUNT(*) FROM review WHERE book_id = b.id) AS review_count FROM book AS b;
```

## Set Operations

Use set operations to combine results from multiple queries:

```typescript
// UNION
select('id', 'title')
  .from('book')
  .where(eq('published', true))
  .union(
    select('id', 'title')
      .from('ebook')
  )
  .toSql()
// Output: SELECT id, title FROM book WHERE published = $1 UNION SELECT id, title FROM ebook;

// UNION ALL
select('id', 'title')
  .from('book')
  .where(eq('published', true))
  .unionAll(
    select('id', 'title')
      .from('ebook')
  )
  .toSql()
// Output: SELECT id, title FROM book WHERE published = $1 UNION ALL SELECT id, title FROM ebook;

// INTERSECT
select('id', 'title')
  .from('book')
  .where(eq('published', true))
  .intersect(
    select('id', 'title')
      .from('bestseller')
  )
  .toSql()
// Output: SELECT id, title FROM book WHERE published = $1 INTERSECT SELECT id, title FROM bestseller;

// EXCEPT
select('id', 'title')
  .from('book')
  .where(eq('published', true))
  .except(
    select('id', 'title')
      .from('bestseller')
  )
  .toSql()
// Output: SELECT id, title FROM book WHERE published = $1 EXCEPT SELECT id, title FROM bestseller;
``` 