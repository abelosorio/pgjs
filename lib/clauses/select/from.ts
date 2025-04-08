import { ResolverInput } from '../../types/resolver-input'
import whereResolver, { WhereResolver } from './where'

export interface FromClause {
  toSql: () => string
  where: WhereResolver
}

export type FromResolver = (fromItem: string) => FromClause

export default function from ({ sql: prevSql }: ResolverInput): FromResolver {
  return function (fromItem) {
    const sql = prevSql + ` FROM ${fromItem}`

    return {
      where: whereResolver({ sql }),
      toSql: () => sql + ';'
    }
  }
}
