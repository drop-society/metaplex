import * as React from 'react';

/**
 * Creates a Ref object which is a mutable container to check previous values
 * @param value
 * @external https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export default function usePrevious<T>(value: T): T {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
