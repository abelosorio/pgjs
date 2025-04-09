# Comparison Operators

pgjs provides a set of type-safe comparison operators for building conditions. These operators automatically handle parameter binding and SQL injection prevention.

## Basic Comparison Operators

```typescript
// Equal to
eq('column', value)      // column = value
// Example
select()
  .from('book')
  .where(eq('genre', 'fiction'))
  .toSql()
// Output: SELECT * FROM book WHERE genre = $1;

// Not equal to
neq('column', value)     // column != value
// Example
select()
  .from('book')
  .where(neq('status', 'draft'))
  .toSql()
// Output: SELECT * FROM book WHERE status != $1;

// Greater than
gt('column', value)      // column > value
// Example
select()
  .from('book')
  .where(gt('page_count', 300))
  .toSql()
// Output: SELECT * FROM book WHERE page_count > $1;

// Greater than or equal to
gte('column', value)     // column >= value
// Example
select()
  .from('book')
  .where(gte('page_count', 300))
  .toSql()
// Output: SELECT * FROM book WHERE page_count >= $1;

// Less than
lt('column', value)      // column < value
// Example
select()
  .from('book')
  .where(lt('price', 20))
  .toSql()
// Output: SELECT * FROM book WHERE price < $1;

// Less than or equal to
lte('column', value)     // column <= value
// Example
select()
  .from('book')
  .where(lte('price', 20))
  .toSql()
// Output: SELECT * FROM book WHERE price <= $1;
```

## NULL Operators

```typescript
// IS NULL
isNull('column')         // column IS NULL
// Example
select()
  .from('book')
  .where(isNull('parent_id'))
  .toSql()
// Output: SELECT * FROM book WHERE parent_id IS NULL;

// IS NOT NULL
isNotNull('column')      // column IS NOT NULL
// Example
select()
  .from('book')
  .where(isNotNull('parent_id'))
  .toSql()
// Output: SELECT * FROM book WHERE parent_id IS NOT NULL;
```

## IN Operators

```typescript
// IN
in_('column', values)    // column IN (value1, value2, ...)
// Example
select()
  .from('book')
  .where(in_('genre', ['fiction', 'mystery', 'sci-fi']))
  .toSql()
// Output: SELECT * FROM book WHERE genre IN ($1, $2, $3);

// NOT IN
not().in_('column', values)  // column NOT IN (value1, value2, ...)
// Example
select()
  .from('book')
  .where(not().in_('genre', ['fiction', 'mystery', 'sci-fi']))
  .toSql()
// Output: SELECT * FROM book WHERE genre NOT IN ($1, $2, $3);
```

## LIKE Operators

```typescript
// LIKE
like('column', pattern)  // column LIKE pattern
// Example
select()
  .from('book')
  .where(like('title', '%Harry Potter%'))
  .toSql()
// Output: SELECT * FROM book WHERE title LIKE $1;

// NOT LIKE
not().like('column', pattern) // column NOT LIKE pattern
// Example
select()
  .from('book')
  .where(not().like('title', '%Harry Potter%'))
  .toSql()
// Output: SELECT * FROM book WHERE title NOT LIKE $1;

// ILIKE (case-insensitive LIKE)
iLike('column', pattern) // column ILIKE pattern
// Example
select()
  .from('book')
  .where(iLike('title', '%harry potter%'))
  .toSql()
// Output: SELECT * FROM book WHERE title ILIKE $1;
```

## BETWEEN Operator

```typescript
// BETWEEN
between('column', min, max) // column BETWEEN min AND max
// Example
select()
  .from('book')
  .where(between('page_count', 200, 500))
  .toSql()
// Output: SELECT * FROM book WHERE page_count BETWEEN $1 AND $2;

// NOT BETWEEN
not().between('column', min, max) // column NOT BETWEEN min AND max
// Example
select()
  .from('book')
  .where(not().between('page_count', 200, 500))
  .toSql()
// Output: SELECT * FROM book WHERE page_count NOT BETWEEN $1 AND $2;
```

## Combining Operators

You can combine these operators with logical operators (`and`, `or`, `not`) to create complex conditions:

```typescript
select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    or(
      in_('genre', ['fiction', 'mystery']),
      like('title', '%Harry Potter%')
    ),
    not(isNull('author'))
  ))
  .toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND (genre IN ($2, $3) OR title LIKE $4) AND NOT author IS NULL);
```

::: tip Parameter Binding
All comparison operators automatically handle parameter binding. You can retrieve the parameter values using the `getParams()` method:

```typescript
const query = select()
  .from('book')
  .where(and(
    gte('page_count', 300),
    in_('genre', ['fiction', 'mystery'])
  ))

const sql = query.toSql()
// Output: SELECT * FROM book WHERE (page_count >= $1 AND genre IN ($2, $3))

const params = query.getParams()
// Output: [300, 'fiction', 'mystery']
```
:::

## Available Operators

pgjs provides a comprehensive set of operators that match PostgreSQL's capabilities. Here's a complete list of all supported operators:

| PostgreSQL Operator | pgjs DSL | Description | Example |
|---------------------|----------|-------------|---------|
| `=` | `eq('column', value)` | Equal to | `eq('genre', 'fiction')` |
| `!=` or `<>` | `neq('column', value)` | Not equal to | `neq('status', 'draft')` |
| `>` | `gt('column', value)` | Greater than | `gt('page_count', 300)` |
| `>=` | `gte('column', value)` | Greater than or equal to | `gte('page_count', 300)` |
| `<` | `lt('column', value)` | Less than | `lt('price', 20)` |
| `<=` | `lte('column', value)` | Less than or equal to | `lte('price', 20)` |
| `IS NULL` | `isNull('column')` | Is null | `isNull('parent_id')` |
| `IS NOT NULL` | `isNotNull('column')` | Is not null | `isNotNull('parent_id')` |
| `IN (values)` | `in_('column', values)` | In a set of values | `in_('genre', ['fiction', 'mystery'])` |
| `NOT IN (values)` | `not().in_('column', values)` | Not in a set of values | `not().in_('genre', ['fiction', 'mystery'])` |
| `LIKE pattern` | `like('column', pattern)` | Matches a pattern | `like('title', '%Harry Potter%')` |
| `NOT LIKE pattern` | `not().like('column', pattern)` | Does not match a pattern | `not().like('title', '%Harry Potter%')` |
| `ILIKE pattern` | `iLike('column', pattern)` | Case-insensitive match | `iLike('title', '%harry potter%')` |
| `BETWEEN min AND max` | `between('column', min, max)` | Between two values | `between('page_count', 200, 500)` |
| `NOT BETWEEN min AND max` | `not().between('column', min, max)` | Not between two values | `not().between('page_count', 200, 500)` |
| `AND` | `and(condition1, condition2, ...)` | Logical AND | `and(eq('genre', 'fiction'), gt('page_count', 300))` |
| `OR` | `or(condition1, condition2, ...)` | Logical OR | `or(eq('genre', 'fiction'), eq('genre', 'mystery'))` |
| `NOT` | `not(condition)` | Logical NOT | `not(eq('genre', 'fiction'))` |
| `EXISTS (subquery)` | `exists(subquery)` | Checks if a subquery returns any rows | `exists(select().from('author').where(eq('id', 'book.author_id')))` |
| `NOT EXISTS (subquery)` | `not().exists(subquery)` | Checks if a subquery returns no rows | `not().exists(select().from('author').where(eq('id', 'book.author_id')))` |
| `IS TRUE` | `isTrue('column')` | Is true | `isTrue('published')` |
| `IS NOT TRUE` | `isNotTrue('column')` | Is not true | `isNotTrue('published')` |
| `IS FALSE` | `isFalse('column')` | Is false | `isFalse('published')` |
| `IS NOT FALSE` | `isNotFalse('column')` | Is not false | `isNotFalse('published')` |
| `IS UNKNOWN` | `isUnknown('column')` | Is unknown (null) | `isUnknown('rating')` |
| `IS NOT UNKNOWN` | `isNotUnknown('column')` | Is not unknown (not null) | `isNotUnknown('rating')` |
| `IS DISTINCT FROM` | `isDistinctFrom('column', value)` | Is distinct from | `isDistinctFrom('genre', 'fiction')` |
| `IS NOT DISTINCT FROM` | `isNotDistinctFrom('column', value)` | Is not distinct from | `isNotDistinctFrom('genre', 'fiction')` |
| `SIMILAR TO` | `similarTo('column', pattern)` | Matches a regex pattern | `similarTo('title', '%(Harry|Potter)%')` |
| `NOT SIMILAR TO` | `not().similarTo('column', pattern)` | Does not match a regex pattern | `not().similarTo('title', '%(Harry|Potter)%')` |
| `~` | `regexpMatch('column', pattern)` | Matches a regex pattern | `regexpMatch('title', 'Harry.*Potter')` |
| `!~` | `not().regexpMatch('column', pattern)` | Does not match a regex pattern | `not().regexpMatch('title', 'Harry.*Potter')` |
| `~*` | `regexpMatchi('column', pattern)` | Case-insensitive regex match | `regexpMatchi('title', 'harry.*potter')` |
| `!~*` | `not().regexpMatchi('column', pattern)` | Case-insensitive regex non-match | `not().regexpMatchi('title', 'harry.*potter')` |
| `@>` | `contains('column', value)` | Contains (for arrays/json) | `contains('tags', ['fiction', 'fantasy'])` |
| `<@` | `containedBy('column', value)` | Contained by (for arrays/json) | `containedBy('tags', ['fiction', 'fantasy', 'adventure'])` |
| `&&` | `overlaps('column', value)` | Overlaps (for arrays) | `overlaps('tags', ['fiction', 'mystery'])` |
| `?` | `hasKey('column', key)` | Has key (for json) | `hasKey('metadata', 'isbn')` |
| `?|` | `hasAnyKeys('column', keys)` | Has any keys (for json) | `hasAnyKeys('metadata', ['isbn', 'asin'])` |
| `?&` | `hasAllKeys('column', keys)` | Has all keys (for json) | `hasAllKeys('metadata', ['isbn', 'asin'])` |
| `@>` | `jsonContains('column', value)` | JSON contains | `jsonContains('metadata', { publisher: 'Penguin' })` |
| `<@` | `jsonContainedBy('column', value)` | JSON contained by | `jsonContainedBy('metadata', { publisher: 'Penguin', year: 2020 })` |
| `?` | `jsonPathExists('column', path)` | JSON path exists | `jsonPathExists('metadata', '$.publisher')` |
| `?|` | `jsonPathExistsAny('column', paths)` | JSON path exists any | `jsonPathExistsAny('metadata', ['$.publisher', '$.year'])` |
| `?&` | `jsonPathExistsAll('column', paths)` | JSON path exists all | `jsonPathExistsAll('metadata', ['$.publisher', '$.year'])` |
| `@>` | `tsContains('column', value)` | Text search contains | `tsContains('description', 'fantasy & adventure')` |
| `<@` | `tsContainedBy('column', value)` | Text search contained by | `tsContainedBy('description', 'fantasy & adventure & magic')` |
| `@@` | `tsMatch('column', query)` | Text search match | `tsMatch('description', 'fantasy & adventure')` |
| `@@` | `tsMatchPlain('column', query)` | Plain text search match | `tsMatchPlain('description', 'fantasy adventure')` |
| `@@` | `tsMatchPhrase('column', query)` | Phrase text search match | `tsMatchPhrase('description', 'fantasy adventure')` |
| `@@` | `tsMatchWebsearch('column', query)` | Websearch text search match | `tsMatchWebsearch('description', 'fantasy OR adventure')` |
| `@>` | `ltreeContains('column', value)` | LTree contains | `ltreeContains('path', 'root.parent.child')` |
| `<@` | `ltreeContainedBy('column', value)` | LTree contained by | `ltreeContainedBy('path', 'root.parent.child.grandchild')` |
| `~` | `ltreeMatch('column', pattern)` | LTree match | `ltreeMatch('path', '*.child.*')` |
| `?` | `ltreeHasParent('column', value)` | LTree has parent | `ltreeHasParent('path', 'root.parent')` |
| `?` | `ltreeHasChild('column', value)` | LTree has child | `ltreeHasChild('path', 'root.parent.child')` |
| `?` | `ltreeHasAncestor('column', value)` | LTree has ancestor | `ltreeHasAncestor('path', 'root')` |
| `?` | `ltreeHasDescendant('column', value)` | LTree has descendant | `ltreeHasDescendant('path', 'root.parent.child')` |
| `?` | `ltreeHasSibling('column', value)` | LTree has sibling | `ltreeHasSibling('path', 'root.parent.other')` |
| `?` | `ltreeHasPath('column', value)` | LTree has path | `ltreeHasPath('path', 'root.parent.child')` |
| `?` | `ltreeHasAnyPath('column', values)` | LTree has any path | `ltreeHasAnyPath('path', ['root.parent.child', 'root.other.child'])` |
| `?` | `ltreeHasAllPaths('column', values)` | LTree has all paths | `ltreeHasAllPaths('path', ['root.parent.child', 'root.parent.other'])` |
| `?` | `ltreeHasAnyParent('column', values)` | LTree has any parent | `ltreeHasAnyParent('path', ['root.parent', 'root.other'])` |
| `?` | `ltreeHasAllParents('column', values)` | LTree has all parents | `ltreeHasAllParents('path', ['root', 'root.parent'])` |
| `?` | `ltreeHasAnyChild('column', values)` | LTree has any child | `ltreeHasAnyChild('path', ['root.parent.child', 'root.parent.other'])` |
| `?` | `ltreeHasAllChildren('column', values)` | LTree has all children | `ltreeHasAllChildren('path', ['root.parent.child', 'root.parent.other'])` |
| `?` | `ltreeHasAnyAncestor('column', values)` | LTree has any ancestor | `ltreeHasAnyAncestor('path', ['root', 'root.parent'])` |
| `?` | `ltreeHasAllAncestors('column', values)` | LTree has all ancestors | `ltreeHasAllAncestors('path', ['root', 'root.parent'])` |
| `?` | `ltreeHasAnyDescendant('column', values)` | LTree has any descendant | `ltreeHasAnyDescendant('path', ['root.parent.child', 'root.parent.other'])` |
| `?` | `ltreeHasAllDescendants('column', values)` | LTree has all descendants | `ltreeHasAllDescendants('path', ['root.parent.child', 'root.parent.other'])` |
| `?` | `ltreeHasAnySibling('column', values)` | LTree has any sibling | `ltreeHasAnySibling('path', ['root.parent.other', 'root.parent.another'])` |
| `?` | `ltreeHasAllSiblings('column', values)` | LTree has all siblings | `ltreeHasAllSiblings('path', ['root.parent.other', 'root.parent.another'])` |