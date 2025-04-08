import type { Final } from '../types/final'
import toSql from '../utils/to-sql'

export type WithClause = Final & {}

export default function with_ (name: string, query: Final): WithClause {
  const sql = `WITH ${name} AS (${query.toSql({ isSubQuery: true })})`

  return {
    toSql: (options) => toSql(sql, options)
  }
}
