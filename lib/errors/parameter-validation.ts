import { SqlBuilderError } from './base'

export class ParameterValidationError extends SqlBuilderError {
  constructor(message: string) {
    super(message)
    this.name = 'ParameterValidationError'
  }
} 