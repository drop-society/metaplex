import * as React from 'react';
import { FullscreenDialog } from 'src/reusableDialogWrapper/FullscreenDialog';
import { SubmitDialog } from 'src/reusableDialogWrapper/SubmitDialog';
import { StandardDialog } from 'src/reusableDialogWrapper/StandardDialog';
import DialogMaster, {
  Standard,
  Fullscreen,
  Submit,
} from 'src/reusableDialogWrapper/index';
import { shallow } from 'enzyme';

test('DialogMaster shallow renders Standard', async () => {
  const component = shallow(
    <DialogMaster DialogType={Standard}></DialogMaster>
  );
  expect(component.find(StandardDialog)).toHaveLength(1);
});
test('DialogMaster shallow renders Fullscreen', async () => {
  const component = shallow(
    <DialogMaster DialogType={Fullscreen}></DialogMaster>
  );
  expect(component.find(FullscreenDialog)).toHaveLength(1);
});
test('DialogMaster shallow renders Submit', async () => {
  const component = shallow(<DialogMaster DialogType={Submit}></DialogMaster>);
  expect(component.find(SubmitDialog)).toHaveLength(1);
});
