import QueryBuilder from '~/lib/builder'

describe('WHERE clause support', () => {
  it('should generate a query with a WHERE clause and 1 param', () => {
    const qb = new QueryBuilder()

    expect(qb.select().from('table').where('field = $1', 'value').toSql())
      .toBe('SELECT * FROM table WHERE field = $1;')
    expect(qb.getParams()).toEqual(['value'])
  })

  it('should generate a query without WHERE clause if not used', () => {
    const qb = new QueryBuilder()
    const sql = qb.select('id').from('users').toSql()

    expect(sql).toBe('SELECT id FROM users;')
    expect(qb.getParams()).toEqual([])
  })

  it('should support multiple params in WHERE', () => {
    const qb = new QueryBuilder()
    const sql = qb
      .select('email')
      .from('users')
      .where('name = $1 AND status = $2', 'John', 'active')
      .toSql()

    expect(sql).toBe('SELECT email FROM users WHERE name = $1 AND status = $2;')
    expect(qb.getParams()).toEqual(['John', 'active'])
  })
})
