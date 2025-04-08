import toSql from '../../utils/to-sql'
import { ResolverInput } from '../../types/resolver-input'
import { Final } from '../../types/final'

import whereResolver, { WhereResolver } from './where'

export type FromClause = Final & {
  where: WhereResolver
}

export type FromResolver = (fromItem: string) => FromClause

export default function from ({ sql: prevSql }: ResolverInput): FromResolver {
  return function (fromItem) {
    const sql = prevSql + ` FROM ${fromItem}`

    return {
      where: whereResolver({ sql }),
      toSql: (options) => toSql(sql, options)
    }
  }
}
