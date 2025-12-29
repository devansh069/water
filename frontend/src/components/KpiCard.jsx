import React from 'react';
import styles from './KpiCard.module.css';

const KpiCard = ({ title, value, unit, icon, color }) => {
  return (
    <div className={`${styles.kpiCard} ${styles[color]}`}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value} <span className={styles.unit}>{unit}</span></p>
      </div>
    </div>
  );
};

export default KpiCard;