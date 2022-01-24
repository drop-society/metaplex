import React from 'react';
import DialogCreator, { BaseProps } from 'src/reusable/DialogWrapper/DialogCreator';
import { Button } from '@mui/material';
import CloseXButton from 'src/reusable/CloseXButton';

/**
 * Standard header component for dialogs to be used with DialogCreator.
 *
 */
export const StandardHeader: React.FC<BaseProps> = ({ setOpen }) => {
  return <CloseXButton onClick={(): void => setOpen(false)} />;
};

/**
 * Standard footer component for dialogs to be used with DialogCreator
 */
export const StandardFooter: React.FC<BaseProps> = ({ setOpen }) => {
  return (
    <Button onClick={(): void => setOpen(false)} autoFocus variant={'outlined'}>
      Close
    </Button>
  );
};

const StandardNoCloseFooter: React.FC<BaseProps> = () => {
  return <div></div>;
};

/**
 * Standard dialog component created from DialogCreator.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead.
 */
export const StandardDialog = DialogCreator(StandardHeader, StandardFooter);
export const StandardNoCloseDialog = DialogCreator(
  StandardHeader,
  StandardNoCloseFooter
);
