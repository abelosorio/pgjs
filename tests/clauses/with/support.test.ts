import { with_, select } from '../../../lib'

describe('WITH support', () => {
  it('should connect WITH with SELECT correctly', () => {
    expect(
      with_([['sub_query', select().from('table')]])
        .select().from('sub_query')
        .toSql()
    )
      .toBe('WITH sub_query AS (SELECT * FROM table) SELECT * FROM sub_query;')
  })

  it('should support multiple with queries', () => {
    expect(
      with_([
        ['sub_query', select().from('table')],
        ['sub_query2', select().from('table2')],
        ['sub_query3', select().from('table3')]
      ])
        .select().from('sub_query')
        .toSql()
    )
      .toBe('WITH sub_query AS (SELECT * FROM table), sub_query2 AS (SELECT * FROM table2), sub_query3 AS (SELECT * FROM table3) SELECT * FROM sub_query;')
  })
})
