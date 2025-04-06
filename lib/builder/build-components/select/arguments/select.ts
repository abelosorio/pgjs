type BaseSelect = {
    fields: string[];
};

type SelectWithDistinct = BaseSelect & {
    distinct: true;
    distinctOn?: never;
};

type SelectWithDistinctOn = BaseSelect & {
    distinct?: false;
    distinctOn: string[];
};

type SelectPlain = BaseSelect & {
    distinct?: false;
    distinctOn?: undefined;
};

type SelectArguments = SelectWithDistinct | SelectWithDistinctOn | SelectPlain;

export default SelectArguments;