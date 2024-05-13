#! /usr/bin/env node

import yaml from 'js-yaml';
import {
  sort as originalSort,
  sortToTemplate as originalSortToTemplate,
  sortAlphabetically as originalSortAlphabetically,
} from '../sort/index.js';

// Taken from https://stackoverflow.com/a/32922084/9969672
function deepEqual<X = unknown, Y = unknown>(x: X, y: Y): boolean {
  const tx = typeof x;
  const ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every((key) =>
          deepEqual(x[key as keyof X], y[key as keyof Y])
        )
    : (x as unknown) === (y as unknown);
}

export function sortToTemplate(templateFileContents: string) {
  const template = yaml.load(templateFileContents);

  return originalSortToTemplate(template);
}

export const sortAlphabetically = originalSortAlphabetically;

export function sort(inputFileContents: string, sortOrder: SortOrder) {
  const input = yaml.load(inputFileContents);

  const sorted = originalSort(input, sortOrder);

  if (deepEqual(input, sorted)) {
    return yaml.dump(sorted);
  } else {
    throw new Error('Result does not match input!');
  }
}
