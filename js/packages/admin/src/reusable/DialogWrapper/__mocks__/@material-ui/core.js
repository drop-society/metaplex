import * as Styles from '@mui/material';

// Needed to make shallow rendering work with themes:
// https://github.com/mui-org/material-ui/issues/15404#issuecomment-497373555

const makeStyles = () => {
  return () => {
    return {};
  };
};

module.exports = { ...Styles, makeStyles };
