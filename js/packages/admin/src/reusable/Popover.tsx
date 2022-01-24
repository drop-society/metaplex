import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@mui/material/styles';
import { Paper, Popover } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    popoverContainer: {
      padding: theme.spacing(2),
    },
  });
});

interface Props {
  anchorEl: Element;
  setAnchorEl: React.Dispatch<Element>;
}

const PaperPopover: FC<Props> = (props) => {
  const classes = useStyles({});
  const { anchorEl, setAnchorEl } = props;

  return (
    <Popover
      open={!!anchorEl}
      onClose={(): void => setAnchorEl(null)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Paper className={classes.popoverContainer}>{props.children}</Paper>
    </Popover>
  );
};

export default PaperPopover;
