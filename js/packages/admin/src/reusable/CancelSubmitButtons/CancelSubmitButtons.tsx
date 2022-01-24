import React from 'react';
import {
  Button,
  CircularProgress,
  Theme,
} from '@mui/material';
import TooltipWrapper from 'src/reusable/TooltipWrapper';
import { TooltipProps } from '@mui/material/Tooltip';

import { 
  createStyles,
  makeStyles,
} from '@mui/styles';


export enum ButtonTypes {
  Standard = 'STANDARD',
  Error = 'ERROR',
}

export interface CancelSubmitButtonsProps {
  disableSubmit: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  inProgress?: boolean;
  cancelText?: string;
  submitText?: string;
  submitOnly?: boolean;
  buttonType?: ButtonTypes;
  tooltipProps?: Omit<TooltipProps, 'children'>;
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    error: {
      backgroundColor: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.main,
      },
    },
    tooltip: {
      display: 'inline',
    },
    buttonContainer: {
      '& > :not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
  });
});

export const CancelSubmitButtons: React.FC<CancelSubmitButtonsProps> = ({
  handleCancel,
  handleSubmit,
  disableSubmit,
  inProgress = false,
  cancelText = 'Cancel',
  submitText = 'Submit',
  submitOnly = false,
  buttonType = ButtonTypes.Standard,
  tooltipProps = {
    title: '',
    placement: 'right',
  },
}) => {
  const classes = useStyles({});
  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    handleCancel();
  };
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <div className={classes.buttonContainer}>
      {!submitOnly && (
        <Button variant="outlined" onClick={cancel}>
          {cancelText}
        </Button>
      )}
      {inProgress ? (
        <Button disabled={true}>
          <CircularProgress />
        </Button>
      ) : (
        <TooltipWrapper className={classes.tooltip} {...tooltipProps}>
          <Button
            variant="contained"
            color="primary"
            className={
              buttonType !== ButtonTypes.Standard ? classes.error : null
            }
            disabled={disableSubmit}
            onClick={submit}
          >
            {submitText}
          </Button>
        </TooltipWrapper>
      )}
    </div>
  );
};

export default CancelSubmitButtons;
