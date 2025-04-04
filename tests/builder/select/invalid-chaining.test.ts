import QueryBuilder from '~/lib/builder'

describe('Invalid chaining', () => {
  it('should not allow SELECT after WHERE', () => {
    const qb = new QueryBuilder()

    expect(() => qb.where('a IS TRUE').select()).toThrow()
  })

  // Exception for subqueries: SELECT * FROM ( SELECT... )
  it('should not allow SELECT after FROM', () => {
    const qb = new QueryBuilder()

    expect(() => qb.from('table').select()).toThrow()
  })


  it('should not allow FROM after WHERE', () => {
    const qb = new QueryBuilder()

    expect(() => qb.where('a IS TRUE').from('table')).toThrow()
  })

  // Exception for subqueries: WHERE a IN ( SELECT... )
  it('should not allow SELECT after WHERE', () => {
    const qb = new QueryBuilder()

    expect(() => qb.where('a IS TRUE').select()).toThrow()
  })
})
