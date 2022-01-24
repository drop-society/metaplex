import * as React from 'react';
import { CircularProgress } from '@mui/material';
import { 
  createStyles,
  makeStyles,
} from '@mui/styles';

interface DialogLoadingProps {
  size?: number;
}

const useStyles = makeStyles(() => {
  return createStyles({
    circularProgress: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  });
});

const DialogLoading: React.FC<DialogLoadingProps> = ({ size = 48 }) => {
  const classes = useStyles({});
  return (
    <div className={classes.circularProgress}>
      <CircularProgress size={size} />
    </div>
  );
};

export default DialogLoading;
