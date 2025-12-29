import React from 'react';
import styles from './AISummaryCard.module.css';
import { FiCpu } from 'react-icons/fi';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const AISummaryCard = ({ overallStatus, confidenceScore, verdict, loading }) => {
  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <FiCpu className={styles.icon} />
          <h3 className={styles.title}>AI-Powered Analysis</h3>
        </div>
        <div className="animate-pulse space-y-3 p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const getStatusColorClass = (status) => {
    if (status === 'Good') return styles.statusGood;
    if (status === 'Moderate') return styles.statusModerate;
    if (status === 'Poor' || status === 'Unsafe') return styles.statusPoor;
    return '';
  };

  const getStatusIcon = (status) => {
    if (status === 'Good') return <FaCheckCircle />;
    if (status === 'Moderate') return <FaExclamationTriangle />;
    if (status === 'Poor' || status === 'Unsafe') return <FaTimesCircle />;
    return <FiCpu />;
  };

  return (
    <div className={`${styles.card} ${getStatusColorClass(overallStatus)}`}>
      <div className={styles.overviewHeader}>
        <div className={styles.overviewStatus}>
          {getStatusIcon(overallStatus)} {overallStatus}
        </div>
        <div className={styles.confidenceScore}>
          Confidence: {confidenceScore}%
        </div>
      </div>
      <div className={styles.overviewVerdict}>
        {verdict}
      </div>
      <div className={styles.footer}>
        Powered by Gemini
      </div>
    </div>
  );
};

export default AISummaryCard;
