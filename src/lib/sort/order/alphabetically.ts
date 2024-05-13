export function sortAlphabetically(): SortOrder {
  return {
    sort: (a, b) => ('' + a).localeCompare('' + b),
    getChildSortOrder: () => sortAlphabetically(),
  };
}
