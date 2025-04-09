# Select Query

The Select query is the foundation of data retrieval in pgjs. It provides a fluent API for building PostgreSQL SELECT statements with support for all standard SQL features.

## Overview

The Select query builder allows you to:

- Select specific columns or all columns from tables
- Join multiple tables with various join types
- Filter data with WHERE conditions
- Group data with GROUP BY
- Filter groups with HAVING
- Order results with ORDER BY
- Limit results with LIMIT and OFFSET
- Use window functions for advanced analytics
- Create Common Table Expressions (CTEs)
- Use subqueries for complex queries
- Perform set operations (UNION, INTERSECT, EXCEPT)

## Documentation Sections

- [Basics](./basics.md) - Basic usage and column selection
- [Joins](./joins.md) - All join-related documentation
- [Conditions](./conditions.md) - WHERE, HAVING, and condition building
- [Grouping](./grouping.md) - GROUP BY and HAVING
- [Ordering](./ordering.md) - ORDER BY, LIMIT, OFFSET
- [Advanced](./advanced.md) - Window functions, CTEs, subqueries, set operations

## Quick Start

```typescript
import { select } from 'pgjs';

// Basic select
const query = select('id', 'name')
  .from('users')
  .where('active = true')
  .toSql();

// With joins
const queryWithJoins = select('u.id', 'u.name', ['o.id', 'order_id'])
  .from(['users', 'u'])
  .innerJoin(['orders', 'o'])
  .on('u.id = o.user_id')
  .toSql();
``` 