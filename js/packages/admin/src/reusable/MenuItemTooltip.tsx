import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Tooltip, MenuItem } from '@mui/material';
import { MenuItemProps } from '@mui/material/MenuItem';
import { SvgIconComponent } from '@mui/icons-material';
import { TooltipProps } from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => {
  return createStyles({
    icon: {
      position: 'absolute',
      right: theme.spacing(1),
    },
  });
});

type MenuItemToolTipProps<C extends React.ElementType> = MenuItemProps<
  C,
  { component?: C }
> &
  Pick<TooltipProps, 'placement' | 'title'> & {
    Icon?: SvgIconComponent;
    key?: number | string;
  };

function MenuItemTooltip<C extends React.ElementType>({
  title,
  children,
  button,
  placement = 'right',
  Icon,
  ...props
}: MenuItemToolTipProps<C>): JSX.Element {
  const { icon } = useStyles({});
  if (title) {
    return (
      <Tooltip title={title} placement={placement}>
        <div>
          <MenuItem {...props}>
            {children}
            {Icon !== null
              ? (): ReactElement => <Icon className={icon} />
              : null}
          </MenuItem>
        </div>
      </Tooltip>
    );
  }
  return (
    <MenuItem {...props}>
      {children}
      {Icon !== null ? (): ReactElement => <Icon className={icon} /> : null}
    </MenuItem>
  );
}

export default MenuItemTooltip;
