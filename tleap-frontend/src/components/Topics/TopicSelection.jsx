import React from "react";
import { useParams } from "react-router-dom";
import topicsData from "../../data/topics.json";

const TopicSelectionPage = () => {
  const { classId, subject } = useParams(); // extract both params
  const topics = topicsData[subject] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-md text-center">
        Choose a Topic
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 text-center max-w-2xl">
        Select a topic in <span className="font-semibold capitalize">{subject}</span> 
        for Class <span className="font-semibold">{classId}</span> to continue.
      </p>

      {/* Topics list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => console.log(`Go to quiz for Class ${classId} - ${subject} - ${topic}`)}
            className="flex items-center gap-4 px-6 py-4 bg-white rounded-xl shadow-md border border-gray-200 
                       hover:shadow-lg hover:bg-[#c5baff] hover:text-gray-900 transition-all transform hover:scale-105"
          >
            <span className="text-2xl">📘</span>
            <span className="text-lg font-semibold">{topic}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelectionPage;
