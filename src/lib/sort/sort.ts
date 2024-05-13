function sortArray<T>(input: T, sortOrder: SortOrder): T {
  if (!Array.isArray(input)) {
    return input;
  }
  return input
    .sort((a, b) => sortOrder.sort(a, b))
    .map((item, i) => sort(item, sortOrder.getChildSortOrder(i))) as T;
}

function sortObject<T>(input: T, sortOrder: SortOrder): T {
  if (typeof input !== 'object' || input === null) {
    return input;
  }

  return Object.entries(input)
    .sort(([keyA], [keyB]) => sortOrder.sort(keyA, keyB))
    .reduce(
      (actual, [key, value]) => ({
        ...actual,
        [key]: sort(value, sortOrder.getChildSortOrder(key)),
      }),
      {}
    ) as T;
}

export default function sort<T>(input: T, sortOrder: SortOrder): T {
  if (Array.isArray(input)) {
    return sortArray(input, sortOrder);
  }
  if (typeof input === 'object' && input !== null) {
    return sortObject(input, sortOrder);
  }
  return input;
}
