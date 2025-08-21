// src/components/SubjectSelectionPage.jsx
import React from 'react';

// Placeholder for your navigation logic.
// You would likely use a routing library like react-router-dom here.
const handleSelectSubject = (subject) => {
  console.log(`Navigating to the next page for ${subject}.`);
  // Example with react-router-dom:
  // const navigate = useNavigate();
  // navigate(`/select-topic/${subject}`);
};

const subjects = [
  { name: 'Science', icon: '🔬', color: 'bg-green-500' },
  { name: 'Math', icon: '➗', color: 'bg-purple-500' },
  { name: 'Social Studies', icon: '📜', color: 'bg-amber-500' },
  { name: 'Tamil', icon: '📖', color: 'bg-blue-500' },
  { name: 'English', icon: '🗣️', color: 'bg-red-500' },
];

const SubjectSelectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center py-12 px-4">
      
      {/* Page Title and Description */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-4 drop-shadow-md">
        Choose Your Subject
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-3xl">
        Select a subject to test your knowledge and begin your quiz!
      </p>

      {/* This is the new, correctly structured section */}
      <div className="flex justify-center w-full"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {subjects.map((subject) => (
            <div 
              key={subject.name} 
              className="relative w-64 h-80 md:w-72 md:h-96 group [perspective:1000px]"
            >
              <div 
                className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                
                {/* Front of the card */}
                <div 
                  className={`absolute inset-0 ${subject.color} rounded-3xl shadow-2xl flex flex-col items-center justify-center [backface-visibility:hidden] p-6 transition-all duration-300 group-hover:shadow-3xl`}
                >
                  <span className="text-8xl md:text-9xl mb-4 transform group-hover:scale-110 transition-transform">
                    {subject.icon}
                  </span>
                  <h2 className="text-3xl text-white font-bold text-center drop-shadow-lg">
                    {subject.name}
                  </h2>
                </div>
                
                {/* Back of the card */}
                <div 
                  className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-6 text-gray-800 transition-all duration-300 group-hover:shadow-3xl"
                >
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Go to {subject.name}
                  </h3>
                  <p className="text-lg text-center mb-6">
                    Click the button to continue with {subject.name}.
                  </p>
<button
  onClick={() => handleSelectSubject(subject.name)}
  className="px-8 py-3 bg-[#c5baff] font-bold rounded-full shadow-lg hover:bg-[#b6a3ff] transition-colors transform hover:scale-105"
  style={{ color: '#2c2c2c' }}
>
  Choose topic
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