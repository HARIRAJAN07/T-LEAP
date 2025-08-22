import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const subjects = [
  { name: "Science", icon: "🔬", color: "bg-green-500" },
  { name: "Math", icon: "➗", color: "bg-purple-500" },
  { name: "Social Studies", icon: "📜", color: "bg-amber-500" },
  { name: "Tamil", icon: "📖", color: "bg-blue-500" },
  { name: "English", icon: "🗣️", color: "bg-red-500" },
];

const SubjectSelectionPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [flipped, setFlipped] = useState({});

  const handleSelectSubject = (subject) => {
    navigate(`/topics/${classId}/${encodeURIComponent(subject)}`);
  };

  const toggleFlip = (subjectName) => {
    setFlipped((prev) => ({
      ...prev,
      [subjectName]: !prev[subjectName],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-8">
      <div className="bg-[#fbfbfb] rounded-3xl shadow-2xl p-12 w-full max-w-6xl">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-center text-black mb-4 drop-shadow-sm">
          Choose Your Subject
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Select a subject to test your knowledge and begin your quiz!
        </p>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="relative w-64 h-80 md:w-72 md:h-96 [perspective:1000px]"
              onClick={() => toggleFlip(subject.name)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  flipped[subject.name] ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front */}
                <div
                  className={`${subject.color} absolute inset-0 rounded-3xl shadow-xl flex flex-col items-center justify-center [backface-visibility:hidden] p-6`}
                >
                  <span className="text-8xl md:text-9xl mb-4">
                    {subject.icon}
                  </span>
                  <h2 className="text-3xl text-white font-bold text-center drop-shadow-lg">
                    {subject.name}
                  </h2>
                </div>

                {/* Back */}
<div className="absolute inset-0 rounded-3xl shadow-xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-6 text-gray-800 bg-gradient-to-br from-[#e8f9ff] via-[#c4d9ff] to-[#c5baff]">
  <h3 className="text-2xl font-bold text-center mb-4">
    Go to {subject.name}
  </h3>
  <p className="text-lg text-center mb-6">
    Click below to continue with {subject.name}.
  </p>
<button
  onClick={(e) => {
    e.stopPropagation();
    handleSelectSubject(subject.name);
  }}
  className="px-8 py-3 bg-white font-bold rounded-full shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
  style={{ color: "#2c2c2c" }}
>
  Choose Topic
</button>

</div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelectionPage;
