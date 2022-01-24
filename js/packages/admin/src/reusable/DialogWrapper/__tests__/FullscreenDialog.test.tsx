/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { FullscreenDialog } from 'src/reusableDialogWrapper/FullscreenDialog';
import { shallow } from 'enzyme';
import { AppBar } from '@mui/material';

test('FullscreenDialog shallow test renders appbar', async () => {
  const component = shallow(<FullscreenDialog />);
  expect(component.find(AppBar)).toHaveLength(1);
});

test('FullscreenDialog shallow test renders children', async () => {
  const component = shallow(
    <FullscreenDialog>
      <div className="2B"></div>
    </FullscreenDialog>
  );
  expect(component.contains(<div className="2B"></div>)).toBe(true);
});
