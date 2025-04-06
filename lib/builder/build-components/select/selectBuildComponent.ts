import { BuildComponent } from "../buildComponent"
import SelectArguments from "./arguments/select"
import { DistinctClauseOptions } from "./enums/DistinctClauseOptions"

export default class SelectBuildComponent implements BuildComponent {
    fields: String[] = []
    distinct: DistinctClauseOptions = DistinctClauseOptions.ALL
    distinctOn: String[] = []

    constructor(args: SelectArguments) {
        this.fields = args.fields
        this.distinct = args.distinct
            ? DistinctClauseOptions.DISTINCT
            : DistinctClauseOptions.ALL
        this.distinctOn = args.distinctOn ?? []
    }

    toSQL(): string {
        if (this.distinctOn) {
            return `SELECT DISTINCT ON (${this.distinctOn.join(', ')}) ${this.fields.join(', ')}`;
        }

        const prefix = this.distinct ? 'SELECT DISTINCT' : 'SELECT';
        const fieldList = this.fields.length > 0 ? this.fields.join(', ') : '*';
        return `${prefix} ${fieldList}`;
    }
}
