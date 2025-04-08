import { select } from '../../../lib'

describe('SELECT support', () => {
  it('should generate a query with 1 field', () => {
    expect(select('id').from('table').toSql())
      .toBe('SELECT id FROM table;')
  })

  it('should generate a query with 2 fields', () => {
    expect(select('id', 'name').from('table').toSql())
      .toBe('SELECT id, name FROM table;')
  })

  it('should generate a SELECT * FROM', () => {
    expect(select().from('table').toSql()).toBe('SELECT * FROM table;')
  })
})
