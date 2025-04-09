import { select } from '../../../lib/index'

describe('where', () => {
  it('should add where clause to the query', () => {
    const query = select().from('users').where('id = 1')
    expect(query.toSql()).toBe('SELECT * FROM users WHERE id = 1;')
  })

  it('should add where clause with params', () => {
    const query = select().from('users').where('id = $1', [1])
    expect(query.toSql()).toBe('SELECT * FROM users WHERE id = $1;')
  })

  it('should add where clause with multiple params', () => {
    const query = select()
      .from('users')
      .where('id = $1 AND name = $2', [1, 'John'])
    expect(query.toSql())
      .toBe('SELECT * FROM users WHERE id = $1 AND name = $2;')
    expect(query.getParams()).toEqual([1, 'John'])
  })
})
