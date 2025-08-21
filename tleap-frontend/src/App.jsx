import React from 'react'
import Dashboard from './components/dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectSelectionPage from "./components/Subjects/SubjectsSelectionPage";
import TopicSelectionPage from "./components/Topics/TopicSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectSelectionPage />} />
        <Route path="/topics/:classId/:subject" element={<TopicSelectionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
