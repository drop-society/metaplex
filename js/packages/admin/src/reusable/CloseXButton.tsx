import * as React from 'react';
import { IconButton, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { 
  createStyles,
  makeStyles,
} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    closeIcon: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  });
});


interface Props {
  onClick: () => void;
}

const CloseXButton: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles()
  return (
    <IconButton
      aria-label="close"
      className={classes.closeIcon}
      onClick={onClick}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseXButton;
