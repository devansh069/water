import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAreas } from '../services/api';
import styles from './AreaSelection.module.css';

const AreaSelection = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const fetchedAreas = await getAreas();
        setAreas(fetchedAreas);
      } catch (err) {
        setError('Failed to fetch areas. Please ensure the backend server is running.');
        console.error('Error fetching areas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedArea) {
      navigate(`/dashboard/${selectedArea}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassmorphismCard}>
        <h2 className={styles.title}>
          Select Your Area
        </h2>

        {loading && <p className={styles.loadingText}>Loading areas...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        {!loading && !error && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="area-select" className="sr-only">Select an Area</label>
              <select 
                id="area-select" 
                value={selectedArea} 
                onChange={handleAreaChange}
                className={styles.selectInput}
              >
                <option value="">-- Choose a location --</option>
                {areas.map((area) => (
                  <option key={area.name} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              disabled={!selectedArea}
              className={styles.submitButton}
            >
              View Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AreaSelection;
