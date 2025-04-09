# Aggregate Functions

pgjs provides a DSL approach for working with aggregate functions, making your queries more type-safe and intuitive.

## Basic Aggregate Functions

```typescript
// Count all rows
select(count())
  .from('book')
  .toSql()
// Output: SELECT COUNT(*) FROM book;

// Count with alias
select(['count()', 'total_books'])
  .from('book')
  .toSql()
// Output: SELECT COUNT(*) AS total_books FROM book;

// Count with condition
select(count())
  .from('book')
  .where(eq('published', true))
  .toSql()
// Output: SELECT COUNT(*) FROM book WHERE published = $1;
```

## Column Aggregates

```typescript
// Average of a column
select(avg('page_count'))
  .from('book')
  .toSql()
// Output: SELECT AVG(page_count) FROM book;

// Average with alias
select(['avg(page_count)', 'avg_pages'])
  .from('book')
  .toSql()
// Output: SELECT AVG(page_count) AS avg_pages FROM book;

// Multiple aggregates
select(
  ['count()', 'total_books'],
  ['avg(page_count)', 'avg_pages'],
  ['max(page_count)', 'max_pages'],
  ['min(page_count)', 'min_pages'],
  ['sum(page_count)', 'total_pages']
)
  .from('book')
  .toSql()
// Output: SELECT COUNT(*) AS total_books, AVG(page_count) AS avg_pages, MAX(page_count) AS max_pages, MIN(page_count) AS min_pages, SUM(page_count) AS total_pages FROM book;
```

## Aggregate Functions with GROUP BY

```typescript
// Group by with count
select('genre', ['count()', 'book_count'])
  .from('book')
  .groupBy('genre')
  .toSql()
// Output: SELECT genre, COUNT(*) AS book_count FROM book GROUP BY genre;

// Group by with multiple aggregates
select(
  'genre',
  ['count()', 'book_count'],
  ['avg(page_count)', 'avg_pages'],
  ['max(page_count)', 'max_pages']
)
  .from('book')
  .groupBy('genre')
  .toSql()
// Output: SELECT genre, COUNT(*) AS book_count, AVG(page_count) AS avg_pages, MAX(page_count) AS max_pages FROM book GROUP BY genre;
```

## Aggregate Functions in HAVING Clauses

```typescript
// Simple HAVING condition
select('genre', ['count()', 'count'])
  .from('book')
  .groupBy('genre')
  .having(gt(count(), 5))
  .toSql()
// Output: SELECT genre, COUNT(*) AS count FROM book GROUP BY genre HAVING COUNT(*) > $1;

// Complex HAVING condition
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

## Available Aggregate Functions

pgjs provides a comprehensive set of aggregate functions that match PostgreSQL's capabilities. Here's a complete list of all supported aggregate functions:

| PostgreSQL Function | pgjs DSL | Description | Example |
|---------------------|----------|-------------|---------|
| `COUNT(*)` | `count()` | Counts the number of rows | `count()` |
| `COUNT(column)` | `count('column')` | Counts the number of non-null values in a column | `count('author_id')` |
| `AVG(column)` | `avg('column')` | Calculates the average of a column | `avg('page_count')` |
| `SUM(column)` | `sum('column')` | Calculates the sum of a column | `sum('page_count')` |
| `MAX(column)` | `max('column')` | Finds the maximum value in a column | `max('page_count')` |
| `MIN(column)` | `min('column')` | Finds the minimum value in a column | `min('page_count')` |
| `STRING_AGG(column, delimiter)` | `stringAgg('column', 'delimiter')` | Concatenates values from a column with a delimiter | `stringAgg('title', ', ')` |
| `ARRAY_AGG(column)` | `arrayAgg('column')` | Creates an array from values in a column | `arrayAgg('title')` |
| `JSON_AGG(column)` | `jsonAgg('column')` | Creates a JSON array from values in a column | `jsonAgg('title')` |
| `JSONB_AGG(column)` | `jsonbAgg('column')` | Creates a JSONB array from values in a column | `jsonbAgg('title')` |
| `PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY column)` | `percentileCont(0.5, 'column')` | Calculates the continuous distribution percentile | `percentileCont(0.5, 'page_count')` |
| `PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY column)` | `percentileDisc(0.5, 'column')` | Calculates the discrete distribution percentile | `percentileDisc(0.5, 'page_count')` |
| `MODE() WITHIN GROUP (ORDER BY column)` | `mode('column')` | Returns the most frequent value in a column | `mode('genre')` |
| `RANK()` | `rank()` | Assigns a rank to each row within a partition | `rank()` |
| `DENSE_RANK()` | `denseRank()` | Assigns a rank to each row within a partition, with no gaps | `denseRank()` |
| `ROW_NUMBER()` | `rowNumber()` | Assigns a sequential number to each row within a partition | `rowNumber()` |
| `NTILE(n)` | `ntile(n)` | Divides rows into n buckets | `ntile(4)` |
| `LAG(column, offset, default)` | `lag('column', offset, default)` | Accesses data from a previous row | `lag('page_count', 1, 0)` |
| `LEAD(column, offset, default)` | `lead('column', offset, default)` | Accesses data from a following row | `lead('page_count', 1, 0)` |
| `FIRST_VALUE(column)` | `firstValue('column')` | Returns the first value in a window | `firstValue('title')` |
| `LAST_VALUE(column)` | `lastValue('column')` | Returns the last value in a window | `lastValue('title')` |
| `NTH_VALUE(column, n)` | `nthValue('column', n)` | Returns the nth value in a window | `nthValue('title', 3)` |
| `CUME_DIST()` | `cumeDist()` | Calculates the cumulative distribution | `cumeDist()` |
| `PERCENT_RANK()` | `percentRank()` | Calculates the relative rank of a row | `percentRank()` |
| `STDDEV(column)` | `stddev('column')` | Calculates the standard deviation | `stddev('page_count')` |
| `STDDEV_POP(column)` | `stddevPop('column')` | Calculates the population standard deviation | `stddevPop('page_count')` |
| `STDDEV_SAMP(column)` | `stddevSamp('column')` | Calculates the sample standard deviation | `stddevSamp('page_count')` |
| `VARIANCE(column)` | `variance('column')` | Calculates the variance | `variance('page_count')` |
| `VAR_POP(column)` | `varPop('column')` | Calculates the population variance | `varPop('page_count')` |
| `VAR_SAMP(column)` | `varSamp('column')` | Calculates the sample variance | `varSamp('page_count')` |
| `BIT_AND(column)` | `bitAnd('column')` | Performs a bitwise AND operation | `bitAnd('flags')` |
| `BIT_OR(column)` | `bitOr('column')` | Performs a bitwise OR operation | `bitOr('flags')` |
| `BIT_XOR(column)` | `bitXor('column')` | Performs a bitwise XOR operation | `bitXor('flags')` |
| `BOOL_AND(column)` | `boolAnd('column')` | Returns true if all values are true | `boolAnd('published')` |
| `BOOL_OR(column)` | `boolOr('column')` | Returns true if any value is true | `boolOr('published')` |
| `EVERY(column)` | `every('column')` | Same as BOOL_AND | `every('published')` |
| `REGR_AVGX(column1, column2)` | `regrAvgX('column1', 'column2')` | Calculates the average of the independent variable | `regrAvgX('price', 'rating')` |
| `REGR_AVGY(column1, column2)` | `regrAvgY('column1', 'column2')` | Calculates the average of the dependent variable | `regrAvgY('price', 'rating')` |
| `REGR_COUNT(column1, column2)` | `regrCount('column1', 'column2')` | Counts the number of non-null pairs | `regrCount('price', 'rating')` |
| `REGR_INTERCEPT(column1, column2)` | `regrIntercept('column1', 'column2')` | Calculates the y-intercept | `regrIntercept('price', 'rating')` |
| `REGR_R2(column1, column2)` | `regrR2('column1', 'column2')` | Calculates the coefficient of determination | `regrR2('price', 'rating')` |
| `REGR_SLOPE(column1, column2)` | `regrSlope('column1', 'column2')` | Calculates the slope | `regrSlope('price', 'rating')` |
| `REGR_SXX(column1, column2)` | `regrSxx('column1', 'column2')` | Calculates the sum of squares of the independent variable | `regrSxx('price', 'rating')` |
| `REGR_SXY(column1, column2)` | `regrSxy('column1', 'column2')` | Calculates the sum of products | `regrSxy('price', 'rating')` |
| `REGR_SYY(column1, column2)` | `regrSyy('column1', 'column2')` | Calculates the sum of squares of the dependent variable | `regrSyy('price', 'rating')` |
| `COVAR_POP(column1, column2)` | `covarPop('column1', 'column2')` | Calculates the population covariance | `covarPop('price', 'rating')` |
| `COVAR_SAMP(column1, column2)` | `covarSamp('column1', 'column2')` | Calculates the sample covariance | `covarSamp('price', 'rating')` |
| `CORR(column1, column2)` | `corr('column1', 'column2')` | Calculates the correlation coefficient | `corr('price', 'rating')` |

## Combining with Other Clauses

Aggregate functions can be combined with WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT clauses:

```typescript
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