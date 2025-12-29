import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import styles from './ChartStyles.module.css';

const ComparativeAnalysisCharts = ({ currentData, weeklyData }) => {
  const comparisonData = [
    { name: 'pH', value: currentData.ph },
    { name: 'TDS', value: currentData.tds },
    { name: 'Turbidity', value: currentData.turbidity },
  ];

  const weeklyComparisonData = weeklyData.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    'Current Week': d.wqi,
    'Previous Week': d.wqi - 10, // Dummy data for previous week
  }));

  const radarData = [
    { subject: 'pH', A: currentData.ph, fullMark: 14 },
    { subject: 'TDS', A: currentData.tds, fullMark: 500 },
    { subject: 'Turbidity', A: currentData.turbidity, fullMark: 5 },
    { subject: 'Temperature', A: currentData.temperature, fullMark: 40 },
  ];

  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Parameter Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Weekly WQI Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyComparisonData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Current Week" fill="#82ca9d" />
            <Bar dataKey="Previous Week" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Water Quality Health Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparativeAnalysisCharts;
