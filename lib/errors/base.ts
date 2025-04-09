export class SqlBuilderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SqlBuilderError'
  }
} 