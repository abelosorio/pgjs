import SelectArguments from "../build-components/select/arguments/select";

/**
 * @internal
 */
export interface _SelectStage {
    select(args: SelectArguments): _FromStage;
}

/**
 * @internal
 */
export interface _FromStage {
    from(table: string): _ToSqlStage;
}

/**
 * @internal
 */
export interface _ToSqlStage {
    toSql(): string;
}
