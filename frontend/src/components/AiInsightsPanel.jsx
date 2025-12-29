import React from 'react';
import styles from './AiInsightsPanel.module.css';

const AiInsightsPanel = ({ summary }) => {
  return (
    <div className={styles.aiPanel}>
      <h3 className={styles.panelTitle}>AI-Powered Insights</h3>
      <p className={styles.summaryText}>{summary}</p>
      <div className={styles.footer}>
        <span className={styles.confidence}>Confidence: 95%</span>
        <span className={styles.poweredBy}>Powered by Gemini</span>
      </div>
    </div>
  );
};

export default AiInsightsPanel;
