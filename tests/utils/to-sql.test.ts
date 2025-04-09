import toSql from '../../lib/utils/to-sql'

describe('toSql', () => {
  it('should add semicolon by default for top-level queries', () => {
    expect(toSql('SELECT * FROM users')).toBe('SELECT * FROM users;')
  })

  it('should not add semicolon for subqueries', () => {
    expect(toSql('SELECT * FROM users', { isSubQuery: true }))
      .toBe('SELECT * FROM users')
  })

  it('should not add semicolon if query already ends with one', () => {
    expect(toSql('SELECT * FROM users;')).toBe('SELECT * FROM users;')
  })

  it('should handle multiple statements', () => {
    const sql = 'SELECT * FROM users; SELECT * FROM orders'
    expect(toSql(sql)).toBe('SELECT * FROM users; SELECT * FROM orders;')
  })
}) 
