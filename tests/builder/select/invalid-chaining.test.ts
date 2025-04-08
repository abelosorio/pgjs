import select from '../../../lib/commands/select'

describe('Invalid chaining', () => {
  it('should not allow SELECT WHERE', () => {
    expect(select()).not.toHaveProperty('where')
  })
})
