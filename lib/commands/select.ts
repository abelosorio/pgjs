import { ResolverInput } from '~/lib/types/resolver-input'
import fromResolver, { FromResolver } from '../clauses/select/from'

export type SelectCommand = {
  from: FromResolver
}

export type SelectResolver = () => SelectCommand

export function _select(
  context?: ResolverInput,
  ...fields: string[]
): SelectCommand {
  const sql = [context?.sql, 'SELECT', getFieldsSql(fields)]
    .filter((v) => Boolean(v))
    .join(' ')

  return {
    from: fromResolver({ sql })
  }
}

export default function selectResolver(
  input?: ResolverInput
): SelectResolver {
  return function (...fields: string[]): SelectCommand {
    return _select(input, ...fields)
  }
}

export function selectBuilder(...fields: string[]): SelectCommand {
  return _select(undefined, ...fields)
}

function getFieldsSql(fields: string[]): string {
  return fields.length > 0 ? fields.join(', ') : '*'
}
