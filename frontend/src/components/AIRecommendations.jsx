import React from 'react';
import styles from '../pages/AIInsights.module.css';

const AIRecommendations = ({ recommendations }) => {
  return (
    <div className={styles.recommendationsPanel}>
      <h3 className={styles.recommendationsTitle}>AI Recommendations</h3>
      <div className={styles.recommendationsList}>
        {recommendations.map((rec, index) => (
          <div className={styles.recommendationItem} key={index}>
            {rec}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
