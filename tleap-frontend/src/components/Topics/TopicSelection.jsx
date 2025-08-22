import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import topicsData from "../../data/topics.json";

const TopicSelectionPage = () => {
  const { classId, subject } = useParams();
  const navigate = useNavigate();

  // Correct way to fetch topics
  const classKey = `class${classId}`;
  const topics = topicsData[classKey]?.[subject.toLowerCase()] || [];

  const goNext = (topic) => {
    navigate(
      `/difficulty/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-md text-center">
        Choose a Topic
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 text-center max-w-2xl">
        Select a topic in <span className="font-semibold capitalize">{subject}</span> 
        for Class <span className="font-semibold">{classId}</span> to continue.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => goNext(topic)}
              className="flex items-center gap-4 px-6 py-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:bg-[#c5baff] hover:text-gray-900 transition-all transform hover:scale-105"
            >
              <span className="text-2xl">📘</span>
              <span className="text-lg font-semibold">{topic}</span>
            </button>
          ))
        ) : (
          <p className="text-gray-500">No topics available for this subject.</p>
        )}
      </div>
    </div>
  );
};

export default TopicSelectionPage;
