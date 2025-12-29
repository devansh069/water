import React from 'react';
import styles from '../pages/AIInsights.module.css';
import { FaInfoCircle } from 'react-icons/fa';

const DataTransparencyNote = () => {
  return (
    <div className={styles.transparencyNote}>
      <FaInfoCircle className={styles.infoIcon} />
      <p>
        This AI insight is generated using recent water quality data and historical trends. This is a prototype using simulated IoT data.
      </p>
    </div>
  );
};

export default DataTransparencyNote;
