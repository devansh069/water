import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getWaterQualityData,
  getWeeklyWaterQualityData,
  getMonthlyWaterQualityData,
  getAIAssessment,
} from '../services/api';
import styles from './Dashboard.module.css';
import KpiCard from '../components/KpiCard';
import TimeBasedCharts from '../components/TimeBasedCharts';
import ComparativeAnalysisCharts from '../components/ComparativeAnalysisCharts';
import StatusAndDistributionCharts from '../components/StatusAndDistributionCharts';
import AiInsightsPanel from '../components/AiInsightsPanel';
import { FaTint, FaThermometerHalf, FaTachometerAlt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { areaName } = useParams();
  const [currentData, setCurrentData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const current = await getWaterQualityData(areaName);
        setCurrentData(current);

        const weekly = await getWeeklyWaterQualityData(areaName);
        // Add a dummy WQI to the weekly data for the charts
        const weeklyWithWQI = weekly.map(d => ({
          ...d,
          wqi: Math.round(100 - ((d.turbidity * 5) + (Math.abs(d.ph - 7) * 10) + (d.tds / 10)))
        }));
        setWeeklyData(weeklyWithWQI);

        if (weekly && weekly.length > 0) {
          const summary = await getAIAssessment(weekly);
          if (summary && summary.assessment) {
            setAiSummary(summary.assessment);
          }
        }
      } catch (err) {
        setError('Failed to fetch dashboard data. Please ensure the backend server is running.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [areaName]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }
  if (!currentData || !weeklyData) {
    return <div className={styles.noDataMessage}>No data available for this area.</div>;
  }
  
  const waterQualityIndex = Math.round(100 - ((currentData.turbidity * 5) + (Math.abs(currentData.ph - 7) * 10) + (currentData.tds / 10)));
  const overallStatus = waterQualityIndex > 80 ? 'Safe' : waterQualityIndex > 60 ? 'Moderate' : 'Unsafe';
  const statusIcon = waterQualityIndex > 80 ? <FaCheckCircle /> : waterQualityIndex > 60 ? <FaExclamationTriangle /> : <FaTimesCircle />;
  const statusColor = waterQualityIndex > 80 ? 'green' : waterQualityIndex > 60 ? 'yellow' : 'red';


  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.areaName}>{areaName}</h1>
        <p className={styles.subHeader}>Real-time water quality overview</p>
      </header>
      
      <div className={styles.kpiGrid}>
        <KpiCard title="Water Quality Index" value={waterQualityIndex} unit="/ 100" icon={<FaTachometerAlt />} color={statusColor} />
        <KpiCard title="pH Level" value={currentData.ph} icon={<FaTint />} color="blue" />
        <KpiCard title="TDS" value={currentData.tds} unit="ppm" icon={<FaTint />} color="purple" />
        <KpiCard title="Turbidity" value={currentData.turbidity} unit="NTU" icon={<FaTint />} color="teal" />
        <KpiCard title="Temperature" value={currentData.temperature} unit="°C" icon={<FaThermometerHalf />} color="blue" />
        <KpiCard title="Overall Status" value={overallStatus} icon={statusIcon} color={statusColor} />
      </div>

      <div className={styles.mainGrid}>
        <TimeBasedCharts weeklyData={weeklyData} />
        <ComparativeAnalysisCharts currentData={currentData} weeklyData={weeklyData} />
        <StatusAndDistributionCharts weeklyData={weeklyData} wqi={waterQualityIndex} />
        <AiInsightsPanel summary={aiSummary} />
      </div>
    </div>
  );
};

export default Dashboard;
