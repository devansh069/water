import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import styles from './ChartStyles.module.css';

const StatusAndDistributionCharts = ({ weeklyData, wqi }) => {
  const statusData = weeklyData.reduce(
    (acc, item) => {
      if (item.wqi > 80) {
        acc[0].value += 1;
      } else if (item.wqi > 60) {
        acc[1].value += 1;
      } else {
        acc[2].value += 1;
      }
      return acc;
    },
    [
      { name: 'Safe', value: 0 },
      { name: 'Moderate', value: 0 },
      { name: 'Unsafe', value: 0 },
    ]
  );

  const COLORS = ['#28a745', '#ffc107', '#dc3545'];

  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Weekly Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Water Quality Index</h3>
        <ResponsiveContainer width="100%" height={300}>
        <Gauge
        value={wqi}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: 'translate(0px, 0px)',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: wqi > 80 ? '#28a745' : wqi > 60 ? '#ffc107' : '#dc3545',
          },
        }}
        text={
          ({ value, valueMax }) => `${value} / ${valueMax}`
        }
      />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusAndDistributionCharts;
