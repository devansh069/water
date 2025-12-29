import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMonitor, FiCpu, FiShield } from 'react-icons/fi';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Water Quality Monitoring System
          </h1>
          <p className={styles.heroSubtitle}>
            Safeguarding Water with IoT and AI
          </p>
          <NavLink
            to="/area-selection"
            className={styles.ctaButton}
          >
            Explore Water Quality
          </NavLink>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>A New Standard in Water Safety</h2>
            <p className={styles.sectionSubtitle}>Harnessing technology to ensure clean water for everyone.</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <FiMonitor className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Real-Time Monitoring</h3>
              <p className={styles.featureText}>
                Live sensor data provides up-to-the-minute insights into water quality parameters across the city.
              </p>
            </div>
            <div className={styles.featureCard}>
              <FiCpu className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>AI-Powered Analysis</h3>
              <p className={styles.featureText}>
                Gemini API analyzes complex data to provide simple, actionable insights and water safety assessments.
              </p>
            </div>
            <div className={styles.featureCard}>
              <FiShield className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Safe Water for Citizens</h3>
              <p className={styles.featureText}>
                Empowering citizens and authorities with the information needed to ensure water is safe for all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
