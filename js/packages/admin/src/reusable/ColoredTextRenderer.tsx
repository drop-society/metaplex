import { styled } from '@mui/material/styles';
import React from 'react';
import TooltipWrapper from 'src/reusable/TooltipWrapper';

const PREFIX = 'ColoredTextRenderer';

const classes = {
  alignHorizontally: `${PREFIX}-alignHorizontally`
};

const Root = styled('span')({
  [`& .${classes.alignHorizontally}`]: {
    justifyContent: 'center',
  },
});

export interface ColoredTextRendererProps {
  color: string;
  tooltipText?: string;
}

const ColoredTextRenderer: React.FC<ColoredTextRendererProps> = ({
  color,
  tooltipText,
}: ColoredTextRendererProps) => {


  if (tooltipText) {
    return (
      <TooltipWrapper title={tooltipText} className={classes.alignHorizontally}>
        <Root style={{ color: color }}>{tooltipText}</Root>
      </TooltipWrapper>
    );
  } else {
    return <span style={{ color: color }}>{tooltipText}</span>;
  }
};

export default ColoredTextRenderer;
