# Conditions

Filter your query results using WHERE and HAVING clauses.

## WHERE Clause

Filter rows based on conditions:

```typescript
// Simple condition
select()
  .from('book')
  .where(eq('published', true))
  .toSql()
// Output: SELECT * FROM book WHERE published = $1;

// Condition with parameters
select()
  .from('book')
  .where(gte('page_count', 300))
  .toSql()
// Output: SELECT * FROM book WHERE page_count >= $1;

// Multiple conditions
select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    eq('genre', 'fiction')
  ))
  .toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND genre = $2);
```

::: tip Parameter Binding
When using the DSL approach, pgjs automatically handles parameter binding for you. The values you provide in the condition helpers (like `eq()`, `gte()`, etc.) are automatically parameterized in the generated SQL.

You can retrieve the parameter values using the `getParams()` method:

```typescript
const query = select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    eq('genre', 'fiction')
  ))

const sql = query.toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND genre = $2)

const params = query.getParams()
// Output: [300, 'fiction']
```

This approach ensures that all values are properly escaped, preventing SQL injection while maintaining the correct parameter order.
:::

## Complex Conditions

Build complex conditions using the DSL approach:

```typescript
// Using and() and or() functions
select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    or(eq('genre', 'fiction'), eq('genre', 'mystery')),
    gt('published_at', '2023-01-01')
  ))
  .toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND (genre = $2 OR genre = $3) AND published_at > $4);

// Type-safe conditions using helper functions
select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    or(eq('genre', 'fiction'), eq('genre', 'mystery')),
    gt('published_at', '2023-01-01')
  ))
  .toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND (genre = $2 OR genre = $3) AND published_at > $4);
```

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

::: tip Aggregate Functions
The HAVING clause often uses aggregate functions like `count()`, `avg()`, `sum()`, etc. For a complete list of available aggregate functions and their usage, see the [Aggregate Functions](/select/aggregates) page.
:::

## Condition Helpers

pgjs provides type-safe helper functions for building conditions. For a complete list of available operators and their usage, see the [Comparison Operators](/select/operators) page.

### Logical Operators

```typescript
// Logical operators
and(condition1, condition2, ...)  // condition1 AND condition2 AND ...
or(condition1, condition2, ...)   // condition1 OR condition2 OR ...
not(condition)                    // NOT condition

// Examples
select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    or(eq('genre', 'fiction'), eq('genre', 'mystery')),
    not(eq('status', 'draft'))
  ))
  .toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND (genre = $2 OR genre = $3) AND NOT status = $4);
``` 