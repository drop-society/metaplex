import Dialog, { DialogProps } from '@mui/material/Dialog';
import React, { SetStateAction } from 'react';
import _ from 'lodash';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Theme,
} from '@mui/material';

import { 
  createStyles,
  makeStyles,
} from '@mui/styles';

type exposedDialogProps = 'maxWidth';

/**
 * BaseProps for Dialogs created using DialogCreator.
 */
export interface BaseProps extends Pick<DialogProps, exposedDialogProps> {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: React.ReactNode;
  blocking?: boolean;
  position?: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    top: {
      position: 'absolute',
      top: theme.spacing(2),
    },
  });
});

/**
 * Helper function to combine a header component and a
 * footer component together into a single dialog.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead.
 * @param HeaderComponent
 * The top header of the dialog to be created
 * @param FooterComponent
 * The bottom footer of the dialog to be created
 */
function DialogCreator<H extends BaseProps, F extends BaseProps>(
  HeaderComponent: React.ComponentType<H>,
  FooterComponent: React.ComponentType<F>
): React.ComponentType<H & F> {
  const DialogWrapper: React.FC<H & F> = (props) => {
    const {
      open,
      setOpen,
      title,
      children,
      maxWidth = 'md',
      blocking,
      position = '',
    } = props;
    const classes = useStyles({});
    let disableEscapeKeyDown = false;
    let disableBackdropClick = false;
    if (blocking) {
      disableEscapeKeyDown = disableBackdropClick = true;
    }
    return (
      <Dialog
        classes={{ paper: _.get(classes, position, '') }}
        open={open}
        onClose={(): void => setOpen(false)}
        fullWidth
        maxWidth={maxWidth}
        disableEscapeKeyDown={disableEscapeKeyDown}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <HeaderComponent {...props} />
          {children}
        </DialogContent>
        <DialogActions>
          <FooterComponent {...props} />
        </DialogActions>
      </Dialog>
    );
  };
  return DialogWrapper;
}

export default DialogCreator;
