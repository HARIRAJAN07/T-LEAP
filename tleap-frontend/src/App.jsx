import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SubjectSelectionPage from "./components/Subjects/SubjectsSelectionPage";
import TopicSelectionPage from "./components/Topics/TopicSelection";
import DifficultySelectionPage from "./components/DifficultySelectionPage";
import QuizType from "./components/QuizType";
import ModeSelectionPage from "./components/ModeSelectionPage";
import QuestionPage from "./components/QuestionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subjects/:classId" element={<SubjectSelectionPage />} />
        <Route path="/topics/:classId/:subject" element={<TopicSelectionPage />} />
        <Route path="/difficulty/:classId/:subject/:topic" element={<DifficultySelectionPage />} />
        <Route path="/quiz-type/:classId/:subject/:topic/:difficulty" element={<QuizType />} />
        <Route path="/mode/:classId/:subject/:topic/:difficulty/:questionType" element={<ModeSelectionPage />} />
        <Route path="/quiz/:classId/:subject/:topic/:difficulty/:questionType/:mode" element={<QuestionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}