import fromResolver, { FromResolver } from '../clauses/select/from'

interface SelectCommand {
  from: FromResolver
}

export default function select (...fields: string[]): SelectCommand {
  const sql = 'SELECT ' + getFieldsSql(fields)

  return {
    from: fromResolver({ sql })
  }
}

function getFieldsSql (fields: string[]): string {
  return fields.length > 0 ? fields.join(', ') : '*'
}
