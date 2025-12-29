import React from 'react';
import styles from '../pages/AIInsights.module.css';
import { FaBook, FaChartLine, FaExclamation, FaCheck } from 'react-icons/fa';

const WhyAIPanel = ({ steps }) => {
  const ICONS = [<FaBook />, <FaChartLine />, <FaExclamation />, <FaCheck />];

  return (
    <div className={styles.whyAiPanel}>
      <h3 className={styles.whyAiTitle}>Why This Water Quality Status?</h3>
      <div className={styles.whyAiSteps}>
        {steps.map((step, index) => (
          <div className={styles.whyAiStep} key={index}>
            <div className={styles.whyAiIcon}>{ICONS[index]}</div>
            <div className={styles.whyAiText}>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyAIPanel;
