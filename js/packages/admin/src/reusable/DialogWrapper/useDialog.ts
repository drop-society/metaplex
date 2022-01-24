import { SetStateAction, useState, Dispatch } from 'react';

interface PopupControl {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Hook to be used with DialogMaster that helps with maintaining open state of dialogs.
 * @param startingValue The initial open value of the dialog. By default, this is false.
 */
export function useDialog(startingValue?: boolean): PopupControl {
  const defaultValue = startingValue ? startingValue : false;
  const [open, setOpen] = useState<boolean>(defaultValue);
  return {
    open: open,
    setOpen: setOpen,
  };
}
export default useDialog;
