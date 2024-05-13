function arrayIndex<T, U>(needle: U, haystack: T) {
  if (!Array.isArray(haystack)) {
    throw new Error('Expected haystack to be an array');
  }

  const getLookupValue = (i: unknown) => {
    if (typeof i === 'object' && i !== null) {
      if ('name' in i) {
        return (i = i.name);
      } else if ('url' in i) {
        return i.url;
      } else {
        return JSON.stringify(i);
      }
    }
    return i;
  };
  const needleValue = getLookupValue(needle);
  return (haystack || []).findIndex(
    (item) => getLookupValue(item) === needleValue
  );
}
function objectIndex<T, U>(needle: U, haystack: T) {
  return Object.keys(haystack || {}).findIndex((key) => key === needle);
}

function getIndex<T, U>(needle: U, haystack: T) {
  if (Array.isArray(haystack)) {
    return arrayIndex(needle, haystack);
  }
  return objectIndex(needle, haystack);
}

function sort<A = unknown, B = unknown>(
  a: A,
  aIndex: number,
  b: B,
  bIndex: number
) {
  if (aIndex === -1 && bIndex === -1) {
    return ('' + a).localeCompare('' + b);
  }
  if (aIndex === -1) {
    return 1;
  }
  if (bIndex === -1) {
    return -1;
  }
  return aIndex - bIndex;
}

export function sortToTemplate<T>(template: T): SortOrder<T> {
  return {
    sort: (a, b) => sort(a, getIndex(a, template), b, getIndex(b, template)),
    getChildSortOrder: (key: string | number | keyof T) =>
      sortToTemplate(template?.[key as keyof T]),
  };
}
