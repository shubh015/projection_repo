import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import NameEntryPage from './pages/NameEntry';
import EmotionSelectionPage from './pages/EmotionSelection';
import ExitPage from './pages/ExitPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/name-entry" element={<NameEntryPage />} />
        <Route path="/emotion-selection" element={<EmotionSelectionPage />} />
        <Route path = "/exit-page" element={<ExitPage/>}/>
        <Route path="/" element={<NameEntryPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;