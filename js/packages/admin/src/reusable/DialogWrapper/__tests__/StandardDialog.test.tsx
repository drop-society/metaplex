import * as React from 'react';
import {
  StandardDialog,
  StandardFooter,
} from 'src/reusableDialogWrapper/StandardDialog';
import { shallow } from 'enzyme';
import { AppBar } from '@mui/material';

test('StandardDialog shallow renders close button', async () => {
  const component = shallow(<StandardDialog />);
  expect(component.find(StandardFooter)).toHaveLength(1);
});

test('StandardDialog shallow renders child components', async () => {
  const component = shallow(
    <StandardDialog>
      <div className="A2"></div>
    </StandardDialog>
  );
  expect(component.contains(<div className="A2"></div>)).toBe(true);
});

test('StandardDialog shallow does not render appbar', async () => {
  const component = shallow(<StandardDialog />);
  expect(component.find(AppBar)).toHaveLength(0);
});
