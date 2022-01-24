import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, Menu, Theme, makeStyles } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const PREFIX = 'OutlinedMenu';

const classes = {
  actionsButton: `${PREFIX}-actionsButton`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  actionsDropdown: `${PREFIX}-actionsDropdown`
};

const StyledGrid = styled(Grid)((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.actionsButton}`]: {
    marginLeft: theme.spacing(2),
    minWidth: theme.spacing(23),
  },

  [`&.${classes.buttonContainer}`]: {
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.actionsDropdown}`]: {
    midWidth: theme.spacing(23),
  }
}));

interface Props {
  menuTitle: string;
}

const OutlinedMenu: React.FC<Props> = ({ menuTitle, children }) => {

  const [menuEl, setMenuEl] = React.useState(null);

  return (
    <StyledGrid item className={classes.buttonContainer}>
      <Button
        data-testid={'actionMenu'}
        disabled={false}
        onClick={(event): void => {
          setMenuEl(event.currentTarget);
        }}
        size={'medium'}
        variant={'outlined'}
        className={classes.actionsButton}
      >
        {menuTitle}
        <ArrowDropDown />
      </Button>
      <Menu
        open={!!menuEl}
        anchorEl={menuEl}
        onClose={(): void => setMenuEl(null)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{ className: classes.actionsDropdown }}
      >
        {children}
      </Menu>
    </StyledGrid>
  );
};

export default OutlinedMenu;
