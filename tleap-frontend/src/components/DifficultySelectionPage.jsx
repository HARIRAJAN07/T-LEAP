import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const levels = [
  { key: 'Beginner', desc: 'Start easy and warm up' },
  { key: 'Intermediate', desc: 'A balanced challenge' },
  { key: 'Advanced', desc: 'For pros only' },
];

const DifficultySelectionPage = () => {
  const navigate = useNavigate();
  const { classId, subject, topic } = useParams();

  const goNext = (difficulty) => {
    navigate(`/quiz-type/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}/${encodeURIComponent(difficulty)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-sky-100 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Select Difficulty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map(l => (
            <button key={l.key}
              onClick={() => goNext(l.key)}
              className="rounded-xl border-2 border-indigo-200 p-6 hover:shadow-lg hover:border-indigo-500 transition text-left"
            >
              <div className="text-2xl font-bold">{l.key}</div>
              <div className="text-gray-600 mt-2">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelectionPage;