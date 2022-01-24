/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {
  SubmitDialog,
  SubmitFooter,
} from 'src/reusableDialogWrapper/SubmitDialog';
import { shallow } from 'enzyme';
import { AppBar } from '@mui/material';

test('SubmitDialog shallow does not render appbar', async () => {
  const component = shallow(<SubmitDialog />);
  expect(component.find(AppBar)).toHaveLength(0);
});

test('SubmitDialog shallow renders submit and close buttons', async () => {
  const component = shallow(<SubmitDialog />);
  expect(component.find(SubmitFooter)).toHaveLength(1);
});

test('SubmitDialog shallow renders children', async () => {
  const component = shallow(
    <SubmitDialog>
      <div className="9S"></div>
    </SubmitDialog>
  );
  expect(component.contains(<div className="9S"></div>)).toBe(true);
});
