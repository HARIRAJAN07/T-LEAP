import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const levels = [
  { key: 'Beginner 🐣', desc: 'Start easy and warm up' },
  { key: 'Intermediate 🚀', desc: 'A balanced challenge' },
  { key: 'Advanced 🧠', desc: 'For pros only' },
];

const DifficultySelectionPage = () => {
  const navigate = useNavigate();
  const { classId, subject, topic } = useParams();

  const goNext = (difficulty) => {
    navigate(`/quiz-type/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}/${encodeURIComponent(difficulty)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-8">
      <div className="bg-[#fbfbfb] rounded-3xl shadow-2xl p-12 w-full max-w-6xl">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center text-black mb-4 drop-shadow-sm">
          Select Difficulty
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          Choose your challenge level and test your knowledge at your own pace.
        </p>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {levels.map(l => (
            <button 
              key={l.key}
              onClick={() => goNext(l.key)}
              className="relative rounded-2xl border-2 border-transparent px-12 py-20 
              bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] 
              hover:from-[#c5baff] hover:to-[#c4d9ff] 
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-4xl font-bold text-gray-800 text-center">{l.key}</div>
              <div className="text-gray-600 mt-6 text-xl text-center">{l.desc}</div>
              
              {/* Decorative glowing circle */}
              <div className="absolute -top-5 -right-5 w-10 h-10 rounded-full bg-[#c5baff] animate-pulse"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelectionPage;
