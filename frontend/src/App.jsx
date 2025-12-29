import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AreaSelection from './pages/AreaSelection';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AIInsights from './pages/AIInsights';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/area-selection" element={<AreaSelection />} />
          <Route path="/dashboard/:areaName" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;