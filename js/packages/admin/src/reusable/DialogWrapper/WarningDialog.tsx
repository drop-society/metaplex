import React from 'react';
import DialogCreator, { BaseProps } from 'src/reusable/DialogWrapper/DialogCreator';
import {
  StandardHeader,
  StandardDialog,
} from 'src/reusable/DialogWrapper/StandardDialog';
import { CancelSubmitButtonsProps } from 'src/reusable/CancelSubmitButtons/CancelSubmitButtons';
import WarningIcon from '@mui/icons-material/Warning';
import { Theme, Typography } from '@mui/material';
import { SubmitFooter } from 'src/reusable/DialogWrapper/SubmitDialog';

import { 
  createStyles,
  makeStyles,
} from '@mui/styles';

const titleMaker = (isError: boolean): React.FC<{ title: React.ReactNode }> => {
  const useStyles = makeStyles((theme: Theme) => {
    const iconColor = isError
      ? theme.palette.error.main
      : theme.palette.warning.main;
    const titleColor = isError ? theme.palette.error.main : theme.palette.common.white;
    return createStyles({
      icon: {
        top: theme.spacing(.5),
        position: 'relative',
        color: iconColor,
        padding: theme.spacing(0, 1, 0, 0),
      },
      title: {
        color: titleColor,
        fontWeight: 600,
        fontSize: '16px',
      },
    });
  });
  const TitleComponent: React.FC<{ title: React.ReactNode }> = ({ title }) => {
    const classes = useStyles({});
    return (
      <>
        <WarningIcon className={classes.icon} display={'inline'} />
        <Typography className={classes.title} display={'inline'}>
          {title}
        </Typography>
      </>
    );
  };
  return TitleComponent;
};

const dialogMaker = (
  TitleComponent: ReturnType<typeof titleMaker>
): React.ComponentType<BaseProps> => {
  const Dialog: React.ComponentType<BaseProps> = ({ title, ...props }) => {
    return (
      <StandardDialog title={<TitleComponent title={title} />} {...props} />
    );
  };
  return Dialog;
};

const ErrorTitle = titleMaker(true);
const WarningTitle = titleMaker(false);

/**
 * Error dialog component created from DialogCreator.
 * Implements functionality for submitting form.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead.
 */
export const ErrorDialog = dialogMaker(ErrorTitle);

/**
 * Warning dialog component created from DialogCreator.
 * Implements functionality for submitting form.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead.
 */
export const WarningDialog = dialogMaker(WarningTitle);

const WarningSubmitDialogComponent = DialogCreator(
  StandardHeader,
  SubmitFooter
);

interface WarningSubmitFooterProps
  extends BaseProps,
    Omit<CancelSubmitButtonsProps, 'handleCancel'> {
  onCancel?: () => void;
}

/**
 * Warning submit dialog component created from DialogCreator.
 * Implements functionality for submitting form.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead.
 */
export const WarningSubmitDialog: React.ComponentType<
  BaseProps & WarningSubmitFooterProps
> = ({ title, ...props }) => {
  return (
    <WarningSubmitDialogComponent
      title={<WarningTitle title={title} />}
      {...props}
    />
  );
};
