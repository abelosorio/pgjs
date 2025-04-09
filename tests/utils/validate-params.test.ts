import { validateParams } from '../../lib/utils/validate-params'
import { ParameterValidationError } from '../../lib/errors/parameter-validation'
import { SqlParameter } from '../../lib/types/sql-parameter'

describe('validateParams', () => {
  it('should accept valid SQL parameters', () => {
    const validParams = ['string', 123, true, null, new Date()]
    expect(() => validateParams(validParams)).not.toThrow()
  })

  it('should accept empty params array', () => {
    expect(() => validateParams([])).not.toThrow()
  })

  it('should accept undefined params', () => {
    expect(() => validateParams(undefined)).not.toThrow()
  })

  it('should throw ParameterValidationError for undefined params', () => {
    const invalidParams = ['valid', undefined, 123] as unknown as SqlParameter[]
    expect(() => validateParams(invalidParams))
      .toThrow(ParameterValidationError)
    expect(() => validateParams(invalidParams))
      .toThrow('Undefined values are not allowed in SQL parameters')
  })

  it('should throw error when first param is undefined', () => {
    const invalidParams = [undefined, 'valid', 123] as unknown as SqlParameter[]
    expect(() => validateParams(invalidParams))
      .toThrow(ParameterValidationError)
  })

  it('should throw error when last param is undefined', () => {
    const invalidParams = ['valid', 123, undefined] as unknown as SqlParameter[]
    expect(() => validateParams(invalidParams))
      .toThrow(ParameterValidationError)
  })
}) 