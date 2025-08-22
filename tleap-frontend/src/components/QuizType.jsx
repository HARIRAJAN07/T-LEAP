import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const questionTypes = [
  { key: "mcq", label: "Multiple Choice", emoji: "📝", desc: "Pick the correct option" },
  { key: "match", label: "Match the Following", emoji: "🔗", desc: "Pair items correctly" },
  { key: "assertion", label: "Assertion & Reason", emoji: "🤔", desc: "Decide if reasoning fits" },
  { key: "truefalse", label: "True or False", emoji: "✔️❌", desc: "Simple but tricky" },
  { key: "fill", label: "Fill in the Blanks", emoji: "✍️", desc: "Complete the sentences" },
];

export default function QuizType() {
  const navigate = useNavigate();
  const { classId, subject, topic, difficulty } = useParams();

  const goNext = (typeKey) => {
    navigate(
      `/mode/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(
        topic
      )}/${encodeURIComponent(difficulty)}/${typeKey}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-8">
      <div className="bg-[#fbfbfb] rounded-3xl shadow-2xl p-12 w-full max-w-6xl">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center text-black mb-4 drop-shadow-sm">
          Select Question Type
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          Choose how you want to test your knowledge.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {questionTypes.map((q) => (
            <button
              key={q.key}
              onClick={() => goNext(q.key)}
              className="relative rounded-2xl border-2 border-transparent px-8 py-12 
              bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] 
              hover:from-[#c5baff] hover:to-[#c4d9ff] 
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-center"
            >
              <div className="text-5xl mb-4">{q.emoji}</div>
              <div className="text-2xl font-bold text-gray-800">{q.label}</div>
              <div className="text-gray-600 mt-3 text-lg">{q.desc}</div>

              {/* Decorative glowing circle */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#c5baff] animate-pulse"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
