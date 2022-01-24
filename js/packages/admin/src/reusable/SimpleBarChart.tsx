import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface BarData {
  group: string;
  count: number;
}

interface Props {
  data: Array<BarData>;
  height?: number;
  barSize?: number;
  barFill?: string;
  iconSize?: number;
  dataKey: string;
  groupBy: string;
  allowDecimals?: boolean;
  tickFormatter?: (val: string) => string;
  tooltipFormatter?: (val) => string | Array<string>;
  tooltipLabelFormatter?: () => string;
  tickStyles?: {
    fontSize?: number;
  };
}

const SimpleBarChart: React.FC<Props> = (props) => {
  const {
    data,
    dataKey,
    groupBy,
    height = 300,
    barSize = 50,
    barFill,
    allowDecimals,
    tickFormatter,
    tickStyles,
    tooltipFormatter,
    tooltipLabelFormatter,
  } = props;

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data} barSize={barSize}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={groupBy}
          stroke={'#FFFFFF'}
          tick={tickStyles}
          tickFormatter={tickFormatter}
        />
        <YAxis
          stroke={'#FFFFFF'}
          allowDecimals={allowDecimals}
          tick={tickStyles}
        />
        <Tooltip
          formatter={tooltipFormatter}
          cursor={{ fill: 'rgba(206, 206, 206, 0.1)' }}
          contentStyle={{
            backgroundColor: '#757575',
            borderRadius: '3px',
            border: '0px',
          }}
          itemStyle={{ color: '#FFFFFF', fontSize: 12 }}
          labelFormatter={tooltipLabelFormatter}
        />
        <Bar dataKey={dataKey} fill={barFill} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(SimpleBarChart);
