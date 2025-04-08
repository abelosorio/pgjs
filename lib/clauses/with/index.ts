import selectResolver, { SelectCommand } from '~/lib/commands/select'
import type { Final } from '~/lib/types/final'

export type WithClause = {
  select: (...fields: string[]) => SelectCommand
}

export type WithOptions = {
  recursive: boolean
}

type WithQuery = [name: string, query: Final]

export default function withBuilder (
  withQueries: WithQuery[],
  options?: WithOptions
): WithClause {
  const sql = composeSql(withQueries, options)

  return {
    select: selectResolver({ sql })
  }
}

function composeSql (withQueries: WithQuery[], options?: WithOptions): string {
  let sql = 'WITH '

  if (options?.recursive) sql += 'RECURSIVE '

  const queries = withQueries.map(([name, query]) => (
    `${name} AS (${query.toSql({ isSubQuery: true })})`
  ))

  return sql + queries.join(', ')
}
