import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './ChartStyles.module.css';

const TimeBasedCharts = ({ weeklyData }) => {
  const formatXAxis = (tickItem) => new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>pH Variation (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" name="pH" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>TDS Variation (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tds" stroke="#82ca9d" name="TDS" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={`${styles.chartWrapper} ${styles.fullWidth}`}>
        <h3 className={styles.chartTitle}>Overall Water Quality Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="wqi" stroke="#ffc658" fill="#ffc658" name="Water Quality Index" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeBasedCharts;
