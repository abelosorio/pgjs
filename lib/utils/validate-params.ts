import { SqlParameter } from '../types/sql-parameter'
import { ParameterValidationError } from '../errors/parameter-validation'

export function validateParams(params?: SqlParameter[]): void {
  if (!params) return
  
  for (const param of params) {
    if (param === undefined) {
      throw new ParameterValidationError(
        'Undefined values are not allowed in SQL parameters'
      )
    }
  }
} 