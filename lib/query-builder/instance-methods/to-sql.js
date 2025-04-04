export default function toSql () {
  let sql = `SELECT ${this.fieldsToString()}`

  sql += ` FROM ${this.table}`
  sql += ';'

  return sql
}
