import React, { useState, useEffect } from 'react';
import { getAlerts } from '../services/api';
import styles from './Alerts.module.css';
import { FiAlertTriangle } from 'react-icons/fi';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const fetchedAlerts = await getAlerts();
        setAlerts(fetchedAlerts);
      } catch (err) {
        setError('Failed to fetch alerts. Please ensure the backend server is running.');
        console.error('Error fetching alerts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Water Quality Alerts</h1>
        <p className={styles.subtitle}>Real-time notifications for critical water quality issues.</p>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading alerts...</p>
        </div>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      {!loading && !error && alerts.length === 0 && (
        <div className={styles.noAlerts}>
          <h3>All Clear!</h3>
          <p>No critical water quality alerts at the moment.</p>
        </div>
      )}

      {!loading && !error && alerts.length > 0 && (
        <div className={styles.timeline}>
          {alerts.map((alert, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <FiAlertTriangle />
              </div>
              <div className={styles.timelineContent}>
                <span className={styles.areaName}>{alert.areaName}</span>
                <p className={styles.message}>{alert.message}</p>
                <span className={styles.date}>
                  {new Date(alert.date).toLocaleString()}
                </span>
                <span className={`${styles.severity} ${styles[alert.severity.toLowerCase()]}`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;