/* eslint-disable @typescript-eslint/explicit-function-return-type*/
import React from 'react';
import { Link as RLink, LinkProps as RLinkProps } from 'react-router-dom';

import Link, { LinkProps } from '@mui/material/Link';

export type RouterLinkProps = RLinkProps & LinkProps;

export default <P extends RouterLinkProps>(props: P) => {
  return <Link {...props} component={(p: RLinkProps) => <RLink {...p} />} />;
};
