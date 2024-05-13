type SortOrder<T = unknown> = {
  sort: (a: string, b: string) => number;
  getChildSortOrder: (
    key: string | number | keyof T
  ) => SortOrder<T[keyof T] | null | undefined | unknown>;
};
