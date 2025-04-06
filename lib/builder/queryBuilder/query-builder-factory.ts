import QueryBuilderImpl from "./query-builder";
import { _SelectStage } from "./query-builder-steps";

export function createQueryBuilder(): _SelectStage {
    return new QueryBuilderImpl();
}
