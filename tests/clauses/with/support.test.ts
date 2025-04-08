import { with_, select } from '../../../lib'

describe('WITH support', () => {
  it('should support basic WITH name AS ( select query )', () => {
    expect(with_('sub_query', select().from('table')).toSql())
      .toBe('WITH sub_query AS (SELECT * FROM table);')
  })
})
