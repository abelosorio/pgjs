import toSql from '../../utils/to-sql'
import { ResolverInput } from '../../types/resolver-input'
import { Final } from '../../types/final'

export type WhereClause = Final & {
  getParams: () => any[] | undefined
}

export type WhereResolver = (
  condition: string,
  params?: any[]
) => WhereClause

export default function where({ sql }: ResolverInput): WhereResolver {
  return function (condition, params) {
    return {
      toSql: (options) => toSql(sql + ` WHERE ${condition}`, options),
      getParams: () => params
    }
  }
}
