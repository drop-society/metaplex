import React from 'react';
import DialogCreator, { BaseProps } from 'src/reusable/DialogWrapper/DialogCreator';
import CancelSubmitButtons, {
  CancelSubmitButtonsProps,
} from 'src/reusable/CancelSubmitButtons/CancelSubmitButtons';
import { StandardHeader } from 'src/reusable/DialogWrapper/StandardDialog';

interface SubmitFooterProps
  extends BaseProps,
    Omit<CancelSubmitButtonsProps, 'handleCancel'> {
  onCancel?: () => void;
}
/**
 * Footer that has extra submit functionality to be used with DialogCreator
 */
export const SubmitFooter: React.FC<SubmitFooterProps> = ({
  setOpen,
  onCancel,
  ...props
}) => {
  return (
    <CancelSubmitButtons
      handleCancel={(): void => {
        if (onCancel) {
          onCancel();
        }
        setOpen(false);
      }}
      {...props}
    />
  );
};

/**
 * Submit dialog component created from DialogCreator.
 * Implements functionality for submitting forms.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead.
 */
export const SubmitDialog = DialogCreator(StandardHeader, SubmitFooter);
