import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {
  Divider,
  Theme,
  Typography,
} from '@mui/material';

const PREFIX = 'Header';

const classes = {
  container: `${PREFIX}-container`
};

const Root = styled('div')(({theme}: {theme: Theme}) => ({
  [`&.${classes.container}`]: {
    marginBottom: theme.spacing(4),
    '&:last-child': {
      marginBottom: theme.spacing(2),
    },
  }
}));

const Header: React.FC<{ header: ReactNode }> = ({ children, header }) => {

  return (
    <Root className={classes.container}>
      <Typography variant="subtitle1">{header}</Typography>
      <Divider />
      {children}
    </Root>
  );
};
export default Header;
