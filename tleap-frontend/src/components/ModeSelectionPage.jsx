import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModeSelectionPage = () => {
  const navigate = useNavigate();
  const { classId, subject, topic, difficulty, questionType } = useParams();

  const go = (mode) => {
<<<<<<< Updated upstream
    navigate(`/quiz/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}/${encodeURIComponent(difficulty)}/${questionType}/${mode}`);
=======
    navigate(
      `/language/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(
        topic
      )}/${encodeURIComponent(difficulty)}/${questionType}/${mode}`
    );
>>>>>>> Stashed changes
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-8">Choose Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => go('practice')} className="px-8 py-6 rounded-xl border-2 border-emerald-300 hover:border-emerald-600 hover:shadow-lg transition">
            <div className="text-2xl font-bold">Practice</div>
            <div className="text-gray-600 mt-2">See answers & explanations</div>
          </button>
          <button onClick={() => go('test')} className="px-8 py-6 rounded-xl border-2 border-indigo-300 hover:border-indigo-600 hover:shadow-lg transition">
            <div className="text-2xl font-bold">Test</div>
            <div className="text-gray-600 mt-2">No explanations, get a report</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionPage;