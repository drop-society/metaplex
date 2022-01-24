import { useState, useCallback } from 'react';
import _ from 'lodash';
/**
 * Data returned from the {@link usePrefixFilter} custom hook.
 */
interface PrefixHookReturn {
  /** A string prefix. All items in the managed list will be filtered out that
   * don't begin with this string. */
  filter: string;
  /** The filtered content with only items matching the prefix string `filter`. */
  filtered: string[];
  /** Setsthe state of the current prefix filter to the specified value. */
  setFilterInput: (prefix: string) => void;
}
/**
 * Custom hook for managing the state of a string-prefixed filtered list.
 *
 * @param universe - The full un-filtered input list of options
 */
export const usePrefixFilter = (universe: string[]): PrefixHookReturn => {
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState(universe);
  const setFilterInput = useCallback(
    (prefix: string) => {
      setFilter(prefix);
      setFiltered(
        _.filter(universe, (item) =>
          _.startsWith(item.toLowerCase(), prefix.toLowerCase())
        )
      );
    },
    [universe]
  );
  return { filter, filtered, setFilterInput };
};
