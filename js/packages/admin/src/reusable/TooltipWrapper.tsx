import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { makeStyles, createStyles } from '@mui/material';

const PREFIX = 'TooltipWrapper';

const classes = {
  tooltip: `${PREFIX}-tooltip`
};

const StyledTooltip = styled(Tooltip)(() =>
  ({
    [`& .${classes.tooltip}`]: {
      pointerEvents: 'all',
      display: 'inherit',
    }
  }));

interface Props {
  disabled?: boolean;
  stopEventPropagation?: boolean;
  preventDefault?: boolean;
}

/**
 * In order to allow tooltip to show when the tooltip hosting component is disabled,
 * we need to include a wrapped non-disabled component such as <span>
 * Note: Use this instead of material-core Tooltip directly
 */
const TooltipWrapper: React.FC<TooltipProps & Props> = ({
  children,
  title,
  className,
  disabled = false,
  placement = 'top',
  stopEventPropagation = true,
  preventDefault = true,
}) => {

  if (disabled) {
    return children;
  }

  return (
    // Tooltip can be used only here.
    // eslint-disable-next-line react/forbid-elements
    <StyledTooltip title={title} placement={placement}>
      <span
        className={`${styles.tooltip} ${className}`}
        onClick={(event): void => {
          if (stopEventPropagation) {
            event.stopPropagation();
          }
          if (preventDefault) {
            event.preventDefault();
          }
        }}
      >
        {children}
      </span>
    </StyledTooltip>
  );
};

export default TooltipWrapper;
