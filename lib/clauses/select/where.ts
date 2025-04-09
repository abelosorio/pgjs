import toSql from '../../utils/to-sql'
import { ResolverInput } from '../../types/resolver-input'
import { Final } from '../../types/final'
import { SqlParameter } from '../../types/sql-parameter'
import { validateParams } from '../../utils/validate-params'

export type WhereClause = Final & {
  getParams: () => SqlParameter[] | undefined
}

export type WhereResolver = (
  condition: string,
  params?: SqlParameter[]
) => WhereClause

export default function where({ sql }: ResolverInput): WhereResolver {
  return function (condition, params) {
    validateParams(params)
    
    return {
      toSql: (options) => toSql(sql + ` WHERE ${condition}`, options),
      getParams: () => params
    }
  }
}
