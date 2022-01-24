import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, createStyles, Theme, makeStyles } from '@mui/material';

const PREFIX = 'BarChartLegend';

const classes = {
  legend: `${PREFIX}-legend`,
  square: `${PREFIX}-square`
};

const Root = styled('div')((
  { theme }: {theme: Theme}
) => ({
  [`&.${classes.legend}`]: {
    border: `1px solid ${theme.colors.WHITE}`,
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.square}`]: {
    height: theme.spacing(2),
    width: theme.spacing(2),
    backgroundColor: (props: Props): string => props.boxColor,
    marginRight: theme.spacing(1),
  }
}));

interface Props {
  boxColor: string;
  text: string;
}

const BarChartLegend: React.FC<Props> = (props) => {
  const { text } = props;

  return (
    <Root className={classes.legend}>
      <div className={classes.square} />
      <Typography variant={'body2'}>{text}</Typography>
    </Root>
  );
};

export default BarChartLegend;
