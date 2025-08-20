import React from 'react';

// Main App component that renders the Dashboard
export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Dashboard />
    </div>
  );
}

// Data for the course cards. This can be easily expanded.
const courses = [
  {
    subject: 'TAMIL',
    teacher: 'Teacher name',
    description: 'Dive into the world of data and algorithms and turn data into intelligent insights',
    image: 'https://placehold.co/400x200/52433a/ffffff?text=தமிழ்',
  },
  {
    subject: 'ENGLISH',
    teacher: 'Teacher name',
    description: 'Dive into the world of data and algorithms and turn data into intelligent insights',
    image: 'https://placehold.co/400x200/566133/ffffff?text=ENGLISH',
  },
  {
    subject: 'SCIENCE',
    teacher: 'Teacher name',
    description: 'Dive into the world of data and algorithms and turn data into intelligent insights',
    image: 'https://placehold.co/400x200/1e293b/ffffff?text=SCIENCE',
  },
  {
    subject: 'HISTORY',
    teacher: 'Teacher name',
    description: 'Dive into the world of data and algorithms and turn data into intelligent insights',
    image: 'https://placehold.co/400x200/1e293b/ffffff?text=HISTORY',
  },
  {
    subject: 'MATHS',
    teacher: 'Teacher name',
    description: 'Dive into the world of data and algorithms and turn data into intelligent insights',
    image: 'https://placehold.co/400x200/1e293b/ffffff?text=MATHS',
  },
];

// Reusable CourseCard component
const CourseCard = ({ subject, teacher, description, image }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <img src={image} alt={`${subject} course`} className="w-full h-32 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{subject}</h3>
        <span className="text-sm text-gray-500">{teacher}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
        Choose
      </button>
    </div>
  </div>
);

// Dashboard layout component
const Dashboard = () => (
  <div className="flex flex-col h-screen">
    {/* Navbar */}
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600 border-b-2 border-blue-600">
          Dashboard
        </a>
        <a href="#" className="hover:text-blue-600">
          Subjects
        </a>
        <a href="#" className="hover:text-blue-600">
          Analyze
        </a>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 p-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </nav>

    {/* Main content area */}
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            subject={course.subject}
            teacher={course.teacher}
            description={course.description}
            image={course.image}
          />
        ))}
      </div>
    </main>
  </div>
);
