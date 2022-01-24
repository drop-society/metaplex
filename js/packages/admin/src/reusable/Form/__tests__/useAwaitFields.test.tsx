import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import Form from 'src/reusable/Form';
import { useAwaitFields } from 'src/reusable/Form/utils';

test.each`
  title                   | formState             | hookArgs      | expectedResult
  ${'no args'}            | ${{}}                 | ${[]}         | ${true}
  ${'one true'}           | ${{ a: {}, b: null }} | ${['a']}      | ${true}
  ${'one false'}          | ${{ a: null }}        | ${['a']}      | ${false}
  ${'one true one false'} | ${{ a: null, b: {} }} | ${['a', 'b']} | ${false}
`('$title', ({ formState, hookArgs, expectedResult }) => {
  const wrapper = ({ children }): React.ReactElement => (
    <Form initialValues={formState} validate={jest.fn()} onSubmit={jest.fn()}>
      {children}
    </Form>
  );

  const {
    result: { current },
  } = renderHook(() => useAwaitFields<typeof formState>(...hookArgs), {
    wrapper,
  });

  expect(current).toEqual(expectedResult);
});
