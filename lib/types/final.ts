import type { Options } from '../utils/to-sql'

export type Final = {
  toSql: (options?: Options) => string
}
