import React, { useState, useEffect } from 'react';
import { getAreas, getWeeklyWaterQualityData, getAIAssessment } from '../services/api';
import AISummaryCard from '../components/AISummaryCard'; // This will be the AI Overview Card
import ParameterExplanationCard from '../components/ParameterExplanationCard';
import WhyAIPanel from '../components/WhyAIPanel';
import AIRecommendations from '../components/AIRecommendations';
import DataTransparencyNote from '../components/DataTransparencyNote';
import styles from './AIInsights.module.css';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


// Visual Insights component with actual charts
const VisualInsights = ({ weeklyData, latestData, overallStatus }) => {
  const formatXAxis = (tickItem) => new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const waterQualityIndex = latestData ? Math.round(100 - ((latestData.turbidity * 5) + (Math.abs(latestData.ph - 7) * 10) + (latestData.tds / 10))) : 0;

  const radarData = latestData ? [
    { subject: 'pH', A: latestData.ph, fullMark: 14 },
    { subject: 'TDS', A: latestData.tds, fullMark: 1000 }, // Assuming max TDS 1000 for radar scale
    { subject: 'Turbidity', A: latestData.turbidity, fullMark: 10 }, // Assuming max Turbidity 10
    { subject: 'Temperature', A: latestData.temperature, fullMark: 40 }, // Assuming max Temp 40
  ] : [];

  const riskData = [
    { name: 'Low', value: 33, color: '#28a745' },
    { name: 'Moderate', value: 33, color: '#ffc107' },
    { name: 'High', value: 34, color: '#dc3545' },
  ];

  let riskLevel = 0; // 0: Low, 1: Moderate, 2: High
  if (overallStatus === 'Moderate') riskLevel = 1;
  if (overallStatus === 'Poor') riskLevel = 2;

  const riskIndicatorValue = riskLevel * 33 + 16.5; // Center the indicator in the segment

  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Water Quality Index</h3>
        <ResponsiveContainer width="100%" height={200}>
          <Gauge
            value={waterQualityIndex}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                transform: 'translate(0px, 0px)',
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: waterQualityIndex > 80 ? '#28a745' : waterQualityIndex > 60 ? '#ffc107' : '#dc3545',
              },
            }}
            text={
              ({ value, valueMax }) => `${value} / ${valueMax}`
            }
          />
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Parameter Health Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 1000]} />
            <Radar name="Current" dataKey="A" stroke="#007bff" fill="#007bff" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>pH & TDS Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" name="pH" />
            <Line type="monotone" dataKey="tds" stroke="#82ca9d" name="TDS" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Risk Level Indicator</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart layout="vertical" data={riskData} stackOffset="expand" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip />
            {riskData.map((entry, index) => (
              <Bar key={`bar-${index}`} dataKey="value" fill={entry.color} stackId="a" />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const AIInsights = () => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(''); // Changed from 'area' to 'selectedArea'
  const [availableAreas, setAvailableAreas] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [latestData, setLatestData] = useState(null);


  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const areas = await getAreas();
        if (areas && areas.length > 0) {
          const firstArea = areas[0].name;
          setSelectedArea(firstArea);
          setAvailableAreas(areas.map(a => a.name)); // Store all available areas
          
          const fetchedWeeklyData = await getWeeklyWaterQualityData(firstArea);
          setWeeklyData(fetchedWeeklyData);
          if (fetchedWeeklyData && fetchedWeeklyData.length > 0) {
            setLatestData(fetchedWeeklyData[fetchedWeeklyData.length - 1]);
            const aiResult = await getAIAssessment(firstArea); // Pass area name directly
            const parsedAnalysis = parseAiAssessment(aiResult.assessment, fetchedWeeklyData[fetchedWeeklyData.length - 1]);
            setAiAnalysis(parsedAnalysis);
          } else {
            setAiAnalysis({
              overallStatus: 'No Data',
              confidenceScore: '0',
              verdict: 'No recent data for this area.',
              explanation: 'Please ensure there is recent water quality data available for analysis in the selected area.',
              parameters: [],
              decisionSteps: ['No data available for analysis.'],
              recommendations: ['Collect more data for this area.']
            });
          }
        } else {
          setAiAnalysis({
            overallStatus: 'No Areas',
            confidenceScore: '0',
            verdict: 'No areas available in the system.',
            explanation: 'Please add water quality data for at least one area to get AI insights.',
            parameters: [],
            decisionSteps: ['No areas found.'],
            recommendations: ['Add data for a new area.']
          });
        }
      } catch (err) {
        setError('Failed to initialize AI insight. Please ensure the backend server is running and accessible.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []); // Run once on component mount

  // Helper function to parse the AI assessment string
  const parseAiAssessment = (assessmentString, latestData) => {
    const lines = assessmentString.split('\n').filter(line => line.trim() !== '');
    
    let overallStatus = 'Moderate';
    let verdict = lines[0] || 'Overall assessment not clear.';
    let explanation = lines.slice(1).join('\n') || 'Detailed explanation not available.';
    let confidenceScore = '90'; // Placeholder, as the current API doesn't provide it

    // Simple keyword spotting for status
    if (assessmentString.toLowerCase().includes('good')) {
      overallStatus = 'Good';
    } else if (assessmentString.toLowerCase().includes('poor') || assessmentString.toLowerCase().includes('unsafe')) {
      overallStatus = 'Poor';
    }

    const parameters = [
      {
        name: 'pH Level',
        value: latestData?.ph || 'N/A',
        unit: '',
        range: '6.5-8.5',
        explanation: 'AI explanation for pH (dummy).',
        status: (latestData?.ph > 6.5 && latestData?.ph < 8.5) ? 'Good' : 'Poor'
      },
      {
        name: 'TDS',
        value: latestData?.tds || 'N/A',
        unit: 'ppm',
        range: '< 500 ppm',
        explanation: 'AI explanation for TDS (dummy).',
        status: (latestData?.tds < 500) ? 'Good' : 'Poor'
      },
      {
        name: 'Turbidity',
        value: latestData?.turbidity || 'N/A',
        unit: 'NTU',
        range: '< 5 NTU',
        explanation: 'AI explanation for Turbidity (dummy).',
        status: (latestData?.turbidity < 5) ? 'Good' : 'Poor'
      },
      {
        name: 'Temperature',
        value: latestData?.temperature || 'N/A',
        unit: '°C',
        range: '10-30 °C',
        explanation: 'AI explanation for Temperature (dummy).',
        status: (latestData?.temperature > 10 && latestData?.temperature < 30) ? 'Good' : 'Poor'
      },
    ];

    const decisionSteps = [
      'Compared current readings with safe standards.',
      'Analyzed fluctuations from past 7 days.',
      'Detected anomalies or risks.',
      'Generated final assessment.'
    ];

    const recommendations = [
      'Monitor pH levels closely for the next 24 hours.',
      'Consider installing a TDS filter if levels remain high.',
      'Inspect water source for turbidity causes.'
    ];


    return { overallStatus, confidenceScore, verdict, explanation, parameters, decisionSteps, recommendations };
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading AI insights...</p>
      </div>
    );
  }
  
  if (error) {
    return (
        <div className={styles.errorMessage}>
            {error}
            {!selectedArea && availableAreas.length === 0 && (
                <p>No areas found in the database. Please add some water quality data.</p>
            )}
        </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI-Powered Water Quality Insights</h1>
        <p className={styles.subtitle}>
          Using the Gemini API to analyze weekly trends for <span className={styles.areaName}>{selectedArea}</span>.
        </p>
      </header>

      {aiAnalysis && (
        <>
          <AISummaryCard 
            overallStatus={aiAnalysis.overallStatus}
            confidenceScore={aiAnalysis.confidenceScore}
            verdict={aiAnalysis.verdict}
          />

          <section className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>AI-Generated Summary</h2>
            <p className={styles.summaryText}>{aiAnalysis.explanation}</p>
          </section>

          <section>
            <h2 className={styles.summaryTitle}>Parameter-wise AI Explanation</h2>
            <div className={styles.parameterGrid}>
              {aiAnalysis.parameters.map((param, index) => (
                <ParameterExplanationCard key={index} parameter={param} />
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.summaryTitle}>Visual Insights</h2>
            <VisualInsights weeklyData={weeklyData} latestData={latestData} overallStatus={aiAnalysis.overallStatus} />
          </section>

          <section>
            <WhyAIPanel steps={aiAnalysis.decisionSteps} />
          </section>

          <section>
            <AIRecommendations recommendations={aiAnalysis.recommendations} />
          </section>

          <DataTransparencyNote />
        </>
      )}
    </div>
  );
};

export default AIInsights;