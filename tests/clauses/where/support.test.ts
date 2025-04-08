import select from '../../../lib/commands/select'

describe('WHERE clause support', () => {
  it('should generate a query with a WHERE clause and 1 param', () => {
    expect(select().from('table').where('field = $1', ['value']).toSql())
      .toBe('SELECT * FROM table WHERE field = $1;')
  })

  it('should generate a query without WHERE clause if not used', () => {
    expect(select('id').from('users').toSql()).toBe('SELECT id FROM users;')
  })

  it('should support multiple params in WHERE', () => {
    const query = select('email')
      .from('users')
      .where('name = $1 AND status = $2', ['John', 'active'])

    expect(query.toSql()).toBe('SELECT email FROM users WHERE name = $1 AND status = $2;')
    expect(query.getParams()).toEqual(['John', 'active'])
  })
})
