import React from 'react';
import {
  ClickAwayListener,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  Theme,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

interface Props {
  isActive: boolean;
}
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    simpleMenu: {
      marginLeft: 'auto',
      padding: 0,
      backgroundColor: (props: Props): string =>
        props.isActive ? theme.colors.BLACK : 'inherit',
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  });
});

export interface SimpleMenuProps {
  onClick?: () => void;
}

export const SimpleMenu = ({
  onClick,
  children,
}: React.PropsWithChildren<SimpleMenuProps>): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles({ isActive: Boolean(anchorEl) });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (onClick) {
      onClick();
    }
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  return (
    <ClickAwayListener onClickAway={(): void => setAnchorEl(null)}>
      <div data-testid="dropdown-menu">
        <IconButton
          onClick={handleClick}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          data-testid="icon-button"
          className={classes.simpleMenu}
          size="large">
          <MoreHoriz />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
        >
          {children}
        </Menu>
      </div>
    </ClickAwayListener>
  );
};
