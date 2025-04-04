import QueryBuilder from '~/lib/builder'

describe('SELECT support', () => {
  it('should generate a query with 1 field', () => {
    const qb = new QueryBuilder()

    expect(qb.select('id').from('table').toSql())
      .toBe('SELECT id FROM table;')
  })

  it('should generate a query with 2 fields', () => {
    const qb = new QueryBuilder()

    expect(qb.select('id', 'name').from('table').toSql())
      .toBe('SELECT id, name FROM table;')
  })

  it('should generate a SELECT * FROM', () => {
    const qb = new QueryBuilder()

    expect(qb.select().from('table').toSql()).toBe('SELECT * FROM table;')
    expect(qb.from('table').toSql()).toBe('SELECT * FROM table;')
  })
})
