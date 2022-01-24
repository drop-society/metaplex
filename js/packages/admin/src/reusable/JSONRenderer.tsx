import React from 'react';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';
import { getBase16Theme } from 'react-base16-styling';

const JSONRenderer: React.FC<ReactJsonViewProps> = (
  props: ReactJsonViewProps
) => {
  // modify flat theme
  const theme = getBase16Theme('flat');
  theme.base00 = 'transparent';
  theme.base07 = 'grey';

  // set value colors
  theme.base0B = '#fff';
  theme.base09 = '#fff';
  theme.base03 = '#fff';
  theme.base08 = '#fff';
  theme.base0D = '#fff';

  return (
    <ReactJson
      theme={theme}
      indentWidth={2}
      name={false}
      displayDataTypes={false}
      displayObjectSize={false}
      collapseStringsAfterLength={16}
      enableClipboard={false}
      {...props}
    />
  );
};

export default JSONRenderer;
