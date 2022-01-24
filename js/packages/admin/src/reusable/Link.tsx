import React, { AnchorHTMLAttributes, FC } from 'react';
import { makeStyles, createStyles, Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    urlLink: theme.general.urlLink,
  });
});

const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const { href, children, ...rest } = props;
  const classes = useStyles(props);
  return (
    <a
      className={classes.urlLink}
      target={'_blank'}
      rel={'noopener noreferrer'}
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
