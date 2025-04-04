# pgjs Roadmap

This is the high-level roadmap for supporting 100% of PostgreSQL functionality in pgjs.

---

## ✅ Core Query Types

- [ ] SELECT builder
- [ ] INSERT builder
- [ ] UPDATE builder
- [ ] DELETE builder
- [ ] UPSERT (ON CONFLICT DO UPDATE)
- [ ] VALUES as standalone input

---

## 🧱 SQL Clauses & Expressions

### Common Clauses
- [ ] WHERE
- [ ] LIMIT, OFFSET
- [ ] ORDER BY
- [ ] GROUP BY, HAVING
- [ ] RETURNING
- [ ] DISTINCT, DISTINCT ON

### Joins
- [ ] INNER JOIN
- [ ] LEFT, RIGHT, FULL JOIN
- [ ] CROSS JOIN
- [ ] LATERAL JOIN
- [ ] NATURAL JOIN
- [ ] Support ON, USING, subqueries in joins

---

## 🛠 Advanced PostgreSQL Features

### Expressions
- [ ] Subqueries
- [ ] Aliases (AS)
- [ ] Type casting (::)
- [ ] Function calls (NOW(), COUNT(), etc.)
- [ ] CASE WHEN
- [ ] IN, NOT IN, BETWEEN, IS NULL, IS DISTINCT FROM
- [ ] Full operator support (~, ILIKE, etc.)
- [ ] ARRAY, JSONB, HSTORE operators

### PostgreSQL Superpowers
- [ ] WITH (CTEs)
- [ ] WITH RECURSIVE
- [ ] WINDOW functions (OVER, PARTITION BY)
- [ ] FILTER in aggregates
- [ ] TABLESAMPLE
- [ ] FETCH FIRST, OFFSET ... ROWS
- [ ] LOCKING clauses (FOR UPDATE, FOR SHARE)
- [ ] SET LOCAL, SET CONSTRAINTS

---

## 🧩 Data Types

- [ ] UUID, INET, MACADDR, JSONB, HSTORE
- [ ] Arrays
- [ ] Domain types
- [ ] Composite types
- [ ] Enum types

---

## 🗃 Schema & Metadata

- [ ] CREATE TABLE, DROP TABLE
- [ ] CREATE INDEX, DROP INDEX
- [ ] CREATE SCHEMA, DROP SCHEMA
- [ ] COMMENT ON
- [ ] ALTER TABLE

---

## 🔒 Permissions & Security

- [ ] GRANT, REVOKE
- [ ] SECURITY DEFINER / INVOKER
- [ ] Row-Level Security (optional)

---

## 🧪 Developer-Facing Features

- [ ] SQL validation (linting / dry-run)
- [ ] Safe parameter injection
- [ ] SQL + params output ({ sql, params })
- [ ] Raw SQL export
- [ ] Optional execution integration (e.g. pg)
- [ ] TypeScript types for all builders
- [ ] API Docs (TypeDoc)
- [ ] ESLint + Prettier config
- [ ] Usage examples and tests

---

## ✅ Optional Meta Features

- [ ] Plugin/mixin system
- [ ] AST-based query generation
- [ ] Query to JSON serialization

---

## 📁 Suggested Structure

```
lib/
├── builder/
│   ├── select.ts
│   ├── insert.ts
│   ├── delete.ts
│   └── update.ts
├── clauses/
│   ├── where.ts
│   ├── limit.ts
│   ├── join.ts
│   └── group-by.ts
├── expressions/
│   ├── jsonb.ts
│   ├── array.ts
│   └── case.ts
└── utils/
    └── escape.ts
```
