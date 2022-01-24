import {
  Slide,
  Dialog,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Grid,
  Theme,
} from '@mui/material';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { BaseProps } from 'src/reusable/DialogWrapper/DialogCreator';

import { 
  createStyles,
  makeStyles,
} from '@mui/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    appBar: {
      position: 'relative',
      paddingLeft: theme.spacing(13),
    },
    title: {
      flex: 1,
    },
    dialog: {
      backgroundColor: theme.palette.grey[800],
    },
    content: {
      justifyContent: 'center',
    },
    main: {
      paddingTop: theme.spacing(6),
    },
  });
});

type Props = Omit<BaseProps, 'position' | 'blocking' | 'className'>;

/**
 * Component that implements full screen dialog functionality.
 * DO NOT USE OUTSIDE OF FOLDER. Use DialogMaster instead
 */
export const FullscreenDialog: React.FC<Props> = ({
  title,
  open,
  setOpen,
  children,
}) => {
  const classes = useStyles({});
  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={Transition as React.ComponentType<TransitionProps>}
      PaperProps={{ className: classes.dialog }}
    >
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            edge="start"
            color="default"
            aria-label="close"
            onClick={handleClose}
            size="large">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.content}>
        <Grid container className={classes.main}>
          {children}
        </Grid>
      </Grid>
    </Dialog>
  );
};
