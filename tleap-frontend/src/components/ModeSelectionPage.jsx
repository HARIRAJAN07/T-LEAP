import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const modes = [
  { key: "practice", title: "Practice 📝", desc: "See answers & explanations" },
  { key: "test", title: "Test 🏆", desc: "No explanations, get a report" },
];

const ModeSelectionPage = () => {
  const navigate = useNavigate();
  const { classId, subject, topic, difficulty, questionType } = useParams();

  const go = (mode) => {
    navigate(
      `/quiz/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(
        topic
      )}/${encodeURIComponent(difficulty)}/${questionType}/${mode}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-8">
      <div className="bg-[#fbfbfb] rounded-3xl shadow-2xl p-12 w-full max-w-5xl">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center text-black mb-4 drop-shadow-sm">
          Choose Mode
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          Select how you want to learn and challenge yourself!
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => go(m.key)}
              className="relative rounded-2xl border-2 border-transparent px-10 py-16 
              bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] 
              hover:from-[#c5baff] hover:to-[#c4d9ff] 
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-3xl font-bold text-gray-800 text-center">
                {m.title}
              </div>
              <div className="text-gray-600 mt-4 text-lg text-center">
                {m.desc}
              </div>

              {/* Decorative glowing circle */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#c5baff] animate-pulse"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
