import _ from 'lodash';

export interface Diff<T> {
  field: string;
  originalValue: T;
  newValue: T;
}

interface GetDiffProps<S, T> {
  previousState: S;
  newState: S;
  transformMap?: TransformFunctions<S, T>;
  customDiffer?: CustomDiffer<S>;
  emptyOriginalValueDefault?: string;
}

export type CustomDiffer<S> = {
  [P in keyof S]?: (a: S[keyof S], b: S[keyof S]) => boolean;
};

export type TransformFunctions<S, T = S[keyof S]> = {
  [P in keyof S]?: (original: Diff<T | S[keyof S]>) => Diff<T | S[keyof S]>;
};

const getDiffDisplay = <S, T>(transformMap: TransformFunctions<S, T>) => (
  diff: Diff<T>
): Diff<T> => {
  if (diff.field in transformMap) {
    return transformMap[diff.field](diff);
  }

  return diff;
};

/**
 * getDiff does a diff for 2 objects based on matching keys.
 * It can be passed a custom differ, and a set of transformation functions
 * too transform the final result
 * The source type S, is the type of object to compare
 * The target type T any type that we want the output diff to contain,
 * and are not present as a type of a field in S
 * For example, if our S is:
 * interface example {
 *   a: string;
 *   b: {
 *     c: number;
 *   }
 * };
 * Then getDiff will automatically infer that the following types are
 * needed in the output:
 *
 * type output = string | {c: number};
 *
 * If this is all that's needed, we can simply call getDiff with:
 * getDiff<example>(...)
 * If you have a transform function turns example['b'] into a number,
 * Then you would need to let getDiff know:
 * getDiff<example, number>
 * The result will be a union of all of the field types in example, as well
 * as number:
 *
 * type output = string | {c: number} | number;
 * @param an object containint the previousState, the newState, an optional transformMap for
 * custom transformation functions, and an optional customDiffer map for custom diffing functions
 */
const getDiff = <S, T = S[keyof S]>({
  previousState,
  newState,
  transformMap,
  customDiffer,
  emptyOriginalValueDefault,
}: GetDiffProps<S, T | S[keyof S]>): Array<Diff<T | S[keyof S]>> => {
  const diff = _.compact(
    _.map(_.keysIn(newState), (key) => {
      const previous = _.get(previousState, key, null);
      const current = _.get(newState, key, null);
      if (current !== null && !_.isEqual(previous, current)) {
        // use the custom differ map, which should have a function that returns true if there's a diff
        if (_.get(customDiffer, key) && !customDiffer[key](previous, current)) {
          return null;
        }
        let originalValueStr = previousState?.[key];
        if (emptyOriginalValueDefault) {
          originalValueStr = previous
            ? previousState?.[key]
            : emptyOriginalValueDefault;
        }

        return {
          field: key,
          originalValue: originalValueStr,
          newValue: newState[key],
        };
      }
      return null;
    })
  );

  if (!transformMap) {
    return diff;
  }
  return _.map(diff, getDiffDisplay(transformMap));
};

export default getDiff;
