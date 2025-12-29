import React from 'react';
import styles from '../pages/AIInsights.module.css';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const ParameterExplanationCard = ({ parameter }) => {
  const getStatusIcon = (status) => {
    if (status === 'Good') {
      return <FaCheckCircle className={`${styles.icon} ${styles.green}`} />;
    } else if (status === 'Moderate') {
      return <FaExclamationTriangle className={`${styles.icon} ${styles.yellow}`} />;
    } else {
      return <FaTimesCircle className={`${styles.icon} ${styles.red}`} />;
    }
  };

  return (
    <div className={styles.parameterCard}>
      <h4 className={styles.parameterTitle}>{parameter.name}</h4>
      <div className={styles.parameterValue}>
        Current Value: {parameter.value} {parameter.unit}
      </div>
      <div className={styles.parameterRange}>
        Normal Range: {parameter.range}
      </div>
      <div className={styles.parameterExplanation}>
        {parameter.explanation}
      </div>
      <div className={styles.parameterStatus}>
        {getStatusIcon(parameter.status)} {parameter.status}
      </div>
    </div>
  );
};

export default ParameterExplanationCard;
