import React from 'react';
import styles from './About.module.css';
import { FiTrendingUp, FiClock, FiAlertTriangle, FiCheckCircle, FiCloud, FiCpu, FiBarChart2, FiBell } from 'react-icons/fi';

const About = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Section 1: Hero */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainHeading}>About The Project</h1>
          <p className={styles.introText}>
            Our mission is to ensure safe and clean water for every citizen by leveraging cutting-edge IoT and AI technologies to provide real-time, actionable insights into water quality.
          </p>
        </div>
      </section>

      {/* Section 2: Problem Statement */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why This Project Matters</h2>
        <div className={styles.grid}>
          <div className={styles.problemItem}>
            <FiAlertTriangle className={styles.problemIcon} />
            <h3>Urban Contamination Risks</h3>
            <p>Increasing pollution in urban areas poses significant health risks through water contamination.</p>
          </div>
          <div className={styles.problemItem}>
            <FiClock className={styles.problemIcon} />
            <h3>Delayed Testing Systems</h3>
            <p>Traditional water testing methods are slow, often taking days to yield results, which delays critical responses.</p>
          </div>
          <div className={styles.problemItem}>
            <FiTrendingUp className={styles.problemIcon} />
            <h3>Lack of Predictive Monitoring</h3>
            <p>Existing systems are reactive. There is a need for proactive, predictive models to anticipate and prevent quality issues.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Solution */}
      <section className={`${styles.section} ${styles.solutionSection}`}>
        <h2 className={styles.sectionTitle}>Our Solution</h2>
        <p className={styles.solutionText}>
          WaterGuard AI is a smart water quality monitoring platform that provides a comprehensive, real-time, and predictive overview of water safety. By combining IoT sensors with powerful AI analysis, we bridge the gap between data collection and actionable intelligence, making water quality management transparent and efficient for both citizens and authorities.
        </p>
      </section>
      
      {/* Section 4: How It Works */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How The System Works</h2>
        <div className={styles.flow}>
          <div className={styles.flowStep}><span>1</span><FiCloud /> IoT sensors collect data (pH, TDS, etc.).</div>
          <div className={styles.flowArrow}>&rarr;</div>
          <div className={styles.flowStep}><span>2</span><FiCpu /> Data is sent to cloud servers for analysis.</div>
          <div className={styles.flowArrow}>&rarr;</div>
          <div className={styles.flowStep}><span>3</span><FiBarChart2 /> AI analyzes real-time & historical data.</div>
          <div className={styles.flowArrow}>&rarr;</div>
          <div className={styles.flowStep}><span>4</span><FiCheckCircle /> Water is classified (Safe, Moderate, Unsafe).</div>
          <div className={styles.flowArrow}>&rarr;</div>
          <div className={styles.flowStep}><span>5</span><FiBell /> Results are shown on the dashboard with alerts.</div>
        </div>
      </section>

      {/* Section 5: Impact & Benefits */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Impact & Benefits</h2>
        <div className={styles.grid}>
          <div className={styles.impactCard}><h3>Improved Public Health</h3><p>Reduces health risks by ensuring access to safe water.</p></div>
          <div className={styles.impactCard}><h3>Faster Response</h3><p>Enables quick action against contamination events.</p></div>
          <div className={styles.impactCard}><h3>Smart City Ready</h3><p>A scalable solution for modern urban infrastructure.</p></div>
          <div className={styles.impactCard}><h3>Data-Driven Policy</h3><p>Provides valuable data for better water management.</p></div>
        </div>
      </section>

      {/* Section 6: Vision & Future Scope */}
      <section className={`${styles.section} ${styles.visionSection}`}>
        <h2 className={styles.sectionTitle}>Our Vision for the Future</h2>
        <p className={styles.visionText}>
          Our goal is to deploy WaterGuard AI in multiple cities, integrating with government water boards to create a nationwide network of real-time monitoring. Future plans include a citizen-facing mobile app for instant alerts and the development of more advanced AI models for long-term risk prediction and infrastructure planning.
        </p>
      </section>

      {/* Section 7: Prototype Disclaimer */}
      <section className={`${styles.section} ${styles.disclaimerSection}`}>
        <h2 className={styles.sectionTitle}>Prototype Notice</h2>
        <p>
          This project is a prototype developed for hackathon demonstration. The system currently uses simulated IoT data to represent real-world sensor readings. The architecture is fully compatible with real hardware deployment.
        </p>
      </section>

      {/* Section 8: Closing Statement */}
      <footer className={styles.footer}>
        <p>Leveraging IoT and AI to protect water, empower citizens, and enable smarter cities.</p>
      </footer>
    </div>
  );
};

export default About;