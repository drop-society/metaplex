import React from 'react';
import {
  StandardDialog,
  StandardNoCloseDialog,
} from 'src/reusable/DialogWrapper/StandardDialog';
import { Theme } from '@mui/material';
import { SubmitDialog } from 'src/reusable/DialogWrapper/SubmitDialog';
import {
  ErrorDialog,
  WarningDialog,
} from 'src/reusable/DialogWrapper/WarningDialog';
import { WarningSubmitDialog } from 'src/reusable/DialogWrapper/WarningDialog';
import { FullscreenDialog } from 'src/reusable/DialogWrapper/FullscreenDialog';
import { 
  createStyles,
  makeStyles,
} from '@mui/styles';

/**
 * 
 * Styling for standard dialog title elements
 */
export const useDialogStyles = makeStyles((theme: Theme) => {
  return createStyles({
    icon: {
      top: theme.spacing(.5),
      position: 'relative',
      padding: theme.spacing(0, 1, 0, 0),
    },
    title: {
      fontWeight: 600,
      fontSize: '16px',
    },
    textLowerPadding: {
      paddingBottom: theme.spacing(2),
    },
  });
});

/**
 * Const indicating Standard DialogType
 */
export const Standard = 'STANDARD';
export const StandardNoClose = 'STANDARD_NO_CLOSE';

/**
 * Const indicating Submit DialogType
 */
export const Submit = 'SUBMIT';

/**
 * Const indicating the Error DialogType
 */
export const Error = 'ERROR';

/**
 * Const indicating the Warning DialogType
 */
export const Warning = 'WARNING';

/**
 * Const indicating the Warning Submit DialogType
 */
export const WarningSubmit = 'WARNING_SUBMIT';

/**
 * Const indicating Fullscreen DialogType
 */
export const Fullscreen = 'FULLSCREEN';

type STANDARD = typeof Standard;
type STANDARD_NO_CLOSE = typeof StandardNoClose;
type SUBMIT = typeof Submit;
type ERROR = typeof Error;
type WARNING_SUBMIT = typeof WarningSubmit;
type FULLSCREEN = typeof Fullscreen;
type WARNING = typeof Warning;
type DialogType =
  | STANDARD
  | STANDARD_NO_CLOSE
  | SUBMIT
  | ERROR
  | WARNING
  | WARNING_SUBMIT
  | FULLSCREEN;

type DialogNarrower<T extends DialogType> = T extends STANDARD
  ? React.ComponentPropsWithoutRef<typeof StandardDialog>
  : T extends STANDARD_NO_CLOSE
  ? React.ComponentPropsWithoutRef<typeof StandardNoCloseDialog>
  : T extends SUBMIT
  ? React.ComponentPropsWithoutRef<typeof SubmitDialog>
  : T extends ERROR
  ? React.ComponentPropsWithoutRef<typeof ErrorDialog>
  : T extends WARNING
  ? React.ComponentPropsWithoutRef<typeof WarningDialog>
  : T extends WARNING_SUBMIT
  ? React.ComponentPropsWithoutRef<typeof WarningSubmitDialog>
  : T extends FULLSCREEN
  ? React.ComponentPropsWithoutRef<typeof FullscreenDialog>
  : object;

type DialogMasterProps<T extends DialogType> = {
  DialogType: T;
} & DialogNarrower<T>;

/**
 * DialogMaster is a facade for all dialog types used in INFR.
 * The type of dialog is determined by the DialogType prop.
 * The rest of the props will be typed accordingly based on the DialogType.
 * Please use exported consts for DialogType
 * @param DialogType Indicates which dialog to use.
 * Currently supported are: Standard, Submit, Warning, WarningSubmit, Fullscreen.
 */
function DialogMaster<C extends DialogType>(
  props: DialogMasterProps<C>
): JSX.Element {
  const { DialogType } = props;
  switch (DialogType) {
    case Standard:
      return (
        <StandardDialog
          {...(props as DialogNarrower<STANDARD>)}
        ></StandardDialog>
      );
    case StandardNoClose:
      return (
        <StandardNoCloseDialog
          {...(props as DialogNarrower<STANDARD>)}
        ></StandardNoCloseDialog>
      );
    case Submit:
      return (
        <SubmitDialog {...(props as DialogNarrower<SUBMIT>)}></SubmitDialog>
      );
    case Error:
      return <ErrorDialog {...(props as DialogNarrower<ERROR>)}></ErrorDialog>;
    case Warning:
      return (
        <WarningDialog {...(props as DialogNarrower<WARNING>)}></WarningDialog>
      );
    case WarningSubmit:
      return (
        <WarningSubmitDialog
          {...(props as DialogNarrower<WARNING_SUBMIT>)}
        ></WarningSubmitDialog>
      );
    case Fullscreen:
      return (
        <FullscreenDialog
          {...(props as DialogNarrower<FULLSCREEN>)}
        ></FullscreenDialog>
      );
    default:
      throw TypeError('Invalid option provided for popup');
  }
}

export default DialogMaster;
