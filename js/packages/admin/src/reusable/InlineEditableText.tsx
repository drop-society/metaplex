import {
  createStyles,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {Theme, makeStyles} from '@mui/material/styles'
import React, { SyntheticEvent, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    bold: { fontWeight: theme.fontWeight.bold },
    alignedFlexBox: {
      alignItems: 'center',
      display: 'flex',
    },
    flexOne: {
      flex: 1,
    },
    clickableText: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    grey: { color: theme.colors.GREY[500] },
  });
});

interface InlineEditableTextProps {
  value: string;
  setValue: (value: string) => void;
  validate?: (testValue: string, clearError?: boolean) => string | null;
}

const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  setValue,
  validate,
  ...props
}: InlineEditableTextProps) => {
  const classes = useStyles({});

  const [tempTextFieldValue, setTempTextFieldValue] = useState(value);
  const [hoveringOver, setHoveringOver] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tempErrorMsg, setTempErrorMsg] = useState<string>(null);

  const toggleHoveringOver = (): void => {
    setHoveringOver(!hoveringOver);
  };

  const finishedEditing = (): void => {
    const errorMsg = validate?.(tempTextFieldValue);
    setTempErrorMsg(errorMsg);

    if (!errorMsg) {
      setValue(tempTextFieldValue);
      setHoveringOver(false);
      setEditing(false);
    }
  };

  const canceledEditing = (event: SyntheticEvent): void => {
    event.stopPropagation();
    setHoveringOver(false);
    setTempTextFieldValue(value);
    validate?.(tempTextFieldValue, true);
    setTempErrorMsg(null);
    setEditing(false);
  };

  const handleKeyPress = (event): void => {
    // Want to set the value if enter is pressed
    if (event.key === 'Enter') {
      finishedEditing();
    }
  };

  return (
    <div className={clsx(classes.alignedFlexBox, classes.flexOne)}>
      {!editing ? (
        <div
          className={classes.alignedFlexBox}
          onMouseEnter={toggleHoveringOver}
          onMouseLeave={toggleHoveringOver}
        >
          <Typography
            variant="body1"
            className={clsx(classes.bold, classes.clickableText)}
            onClick={(): void => setEditing(true)}
          >
            {value}
          </Typography>
          {hoveringOver ? (
            <IconButton
              size="small"
              onMouseDown={(event): void => event.preventDefault()}
              onClick={(): void => setEditing(true)}
            >
              <CreateIcon className={classes.grey} />
            </IconButton>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          className={clsx(classes.alignedFlexBox, classes.flexOne)}
          onBlur={finishedEditing}
        >
          <TextField
            {...props}
            autoFocus
            value={tempTextFieldValue}
            onChange={(event): void =>
              setTempTextFieldValue(event.target?.value)
            }
            onKeyPress={handleKeyPress}
            fullWidth
            error={!!tempErrorMsg}
            helperText={tempErrorMsg}
          />
          <IconButton size="small" onClick={finishedEditing}>
            <CheckCircleIcon className={classes.grey} />
          </IconButton>
          <IconButton
            size="small"
            // Need this to prevent the onBlur from triggering
            onMouseDown={(event): void => event.preventDefault()}
            onClick={canceledEditing}
          >
            <CancelIcon className={classes.grey} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default InlineEditableText;
