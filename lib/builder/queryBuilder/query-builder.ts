import SelectArguments from "../build-components/select/arguments/select";
import SelectBuildComponent from "../build-components/select/selectBuildComponent";
import { _FromStage, _SelectStage, _ToSqlStage } from "./query-builder-steps";



export default class QueryBuilderImpl implements _SelectStage, _FromStage, _ToSqlStage {
  selectBuildBlock: SelectBuildComponent | undefined
  table: string = ''

  select(args: SelectArguments): _FromStage {
    this.selectBuildBlock = new SelectBuildComponent(args)

    return this
  }

  from(table: string): this {
    this.table = table

    return this
  }

  toSql(): string {
    if (!this.selectBuildBlock) throw new Error('Missing select');
    let sql = `${this.selectBuildBlock.toSQL()}`

    sql += ` FROM ${this.table}`
    sql += (this as any).getWhereClause()
    sql += ';'

    return sql
  }
}
