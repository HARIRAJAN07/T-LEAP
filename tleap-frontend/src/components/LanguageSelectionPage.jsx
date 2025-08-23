import { useNavigate, useParams } from "react-router-dom";

export default function LanguageSelectionPage() {
  const { classId, subject, topic, difficulty, questionType, mode } = useParams();
  const navigate = useNavigate();

  const selectLanguage = (lang) => {
    navigate(`/quiz/${classId}/${subject}/${topic}/${difficulty}/${questionType}/${mode}/${lang}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-12 text-center">
        <h1 className="text-4xl font-extrabold text-black mb-8 drop-shadow-sm">🌐 Choose Language</h1>
        <p className="text-lg text-gray-600 mb-10">Do you want the questions in Tamil or English?</p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <button
            onClick={() => selectLanguage("English")}
            className="px-8 py-5 bg-indigo-600 text-white rounded-2xl shadow hover:bg-indigo-700 transition text-xl font-semibold"
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => selectLanguage("Tamil")}
            className="px-8 py-5 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition text-xl font-semibold"
          >
            🇮🇳 Tamil
          </button>
        </div>
      </div>
    </div>
  );
}
