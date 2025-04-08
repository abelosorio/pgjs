import { select } from '../../../lib'

describe('Invalid chaining', () => {
  it('should not allow SELECT WHERE', () => {
    expect(select()).not.toHaveProperty('where')
  })
})
