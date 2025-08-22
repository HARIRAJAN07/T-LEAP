import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function QuestionPage() {
  const { classId, subject, topic, difficulty, questionType, mode } = useParams();
  const isPractice = mode === 'practice';
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [history, setHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const payload = useMemo(() => ({
    stdClass: classId,
    subject,
    difficulty,
    topicHint: decodeURIComponent(topic),
    language: "English",
    questionType: questionType,
  }), [classId, subject, difficulty, topic, questionType]);

  const fetchQuestion = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setSubmitted(false);
      setUserAnswer("");

      const res = await fetch(`${API_BASE}/generate-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      setQuestion(data);
    } catch (e) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [payload]);

  useEffect(() => { fetchQuestion(); }, [fetchQuestion]);

  const checkCorrect = (ua, q) => {
    if (!q) return false;
    const correct = (q.answer || '').toString().trim().toLowerCase();
    const got = (ua || '').toString().trim().toLowerCase();
    return correct === got;
  };

  const onSubmit = () => {
    if (!question) return;
    const isCorrect = checkCorrect(userAnswer, question);
    setSubmitted(true);
    setHistory(h => [...h, {
      question: question.question,
      type: question.type,
      correctAnswer: question.answer,
      userAnswer,
      isCorrect
    }]);
  };

  const onNext = () => {
    fetchQuestion();
  };

  const onEnd = () => {
    setSubmitted(true);
    if (isPractice) {
      navigate("/");
    } else {
      setShowReport(true);
    }
  };

  const correctCount = history.filter(h => h.isCorrect).length;

  // ===== UI Render helpers =====
  const renderMCQ = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {(question?.options || []).map((opt, i) => (
        <button key={i}
          onClick={() => setUserAnswer(opt)}
          className={`px-8 py-5 rounded-2xl border-2 text-xl font-semibold transition-all 
          ${userAnswer === opt 
            ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-xl' 
            : 'bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] text-gray-800 border-transparent hover:from-[#c5baff] hover:to-[#c4d9ff]'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const renderFill = () => (
    <input
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      className="w-full max-w-2xl px-6 py-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 shadow"
      placeholder="✍️ Type your answer here"
    />
  );

  const renderTrueFalse = () => (
    <div className="flex gap-6">
      {['True ✅', 'False ❌'].map(t => (
        <button key={t} onClick={() => setUserAnswer(t.split(" ")[0])}
          className={`px-8 py-4 rounded-2xl border-2 text-lg font-bold transition-all 
          ${userAnswer===t.split(" ")[0] 
            ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-xl' 
            : 'bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] text-gray-800 border-transparent hover:from-[#c5baff] hover:to-[#c4d9ff]'}`}
        >{t}</button>
      ))}
    </div>
  );

  const renderAssertion = () => {
    const opts = [
      'Both correct and reason explains assertion',
      'Both correct but reason does not explain assertion',
      'Assertion correct, Reason wrong',
      'Assertion wrong, Reason correct'
    ];
    return (
      <div className="grid grid-cols-1 gap-4 max-w-3xl">
        {opts.map((o,i) => (
          <button key={i} onClick={() => setUserAnswer(o)}
            className={`px-6 py-4 rounded-2xl border-2 text-left transition-all 
            ${userAnswer===o 
              ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-xl' 
              : 'bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] text-gray-800 border-transparent hover:from-[#c5baff] hover:to-[#c4d9ff]'}`}
          >{i+1}. {o}</button>
        ))}
      </div>
    );
  };

  const renderMatch = () => (
    <div className="w-full max-w-3xl">
      <div className="bg-gradient-to-br from-[#f9f9f9] to-[#f0f0ff] rounded-2xl p-6 border mb-6 shadow">
        <div className="font-semibold mb-3">🔗 Pairs to match:</div>
        {Object.entries(question?.pairs || {}).map(([k,v]) => (
          <div key={k} className="flex justify-between py-1"><span>{k}</span><span className="font-semibold">{v}</span></div>
        ))}
      </div>
      <input
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 shadow"
        placeholder="👉 Enter mapping like A-1, B-2, C-3, D-4"
      />
    </div>
  );

  // ===== Report Screen =====
  if (showReport && !isPractice) {
    const total = history.length;
    const wrong = total - correctCount;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-12 text-center">
          <h1 className="text-5xl font-bold text-black mb-6 drop-shadow-sm">📊 Test Report</h1>
          <div className="text-xl text-gray-700 mb-10">Class {classId} · {subject} · {decodeURIComponent(topic)} · {difficulty} · {questionType.toUpperCase()}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#e8f9ff] to-[#c4d9ff] shadow">
              <div className="text-5xl font-bold">{total}</div>
              <div className="text-gray-600">Total Questions</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow">
              <div className="text-5xl font-bold text-green-600">{correctCount}</div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 shadow">
              <div className="text-5xl font-bold text-red-600">{wrong}</div>
              <div className="text-gray-600">Wrong</div>
            </div>
          </div>
          <div className="text-left max-h-[50vh] overflow-auto border rounded-2xl p-6 bg-gray-50 shadow-inner">
            {history.map((h, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold">Q{i+1}. {h.question}</div>
                <div className="text-sm mt-1">Your Answer: <span className="font-medium">{h.userAnswer || '-'}</span></div>
                <div className="text-sm">Correct Answer: <span className="font-medium">{h.correctAnswer}</span></div>
                <div className={`text-sm mt-1 ${h.isCorrect? 'text-green-600':'text-red-600'}`}>{h.isCorrect? '✅ Correct':'❌ Incorrect'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== Main Question Screen =====
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c5baff] via-[#c4d9ff] to-[#e8f9ff] p-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h1 className="text-4xl font-extrabold text-black drop-shadow-sm">{isPractice ? '📖 Practice Mode' : '📝 Test Mode'}</h1>
          <div className="text-gray-700 font-medium">Class {classId} · {subject} · {decodeURIComponent(topic)} · {difficulty} · {questionType.toUpperCase()}</div>
        </div>

        {/* Question */}
        {loading && <div className="text-2xl">⏳ Loading question…</div>}
        {error && <div className="text-red-600 text-lg">{error}</div>}
        {question && (
          <>
            <div className="text-2xl font-semibold mb-8">{question.question}</div>
            
            {/* Type-specific UI */}
            {question.type === 'mcq' && renderMCQ()}
            {question.type === 'fill' && renderFill()}
            {question.type === 'truefalse' && renderTrueFalse()}
            {question.type === 'assertion' && renderAssertion()}
            {question.type === 'match' && renderMatch()}

            {/* Actions */}
            <div className="flex flex-wrap gap-6 mt-10">
              {!submitted && (
                <button onClick={onSubmit} className="px-8 py-4 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition">✅ Submit</button>
              )}
              <button onClick={onNext} className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">➡️ Next</button>
              <button onClick={onEnd} className="px-8 py-4 bg-red-600 text-white rounded-2xl shadow hover:bg-red-700 transition">🛑 End Test</button>
            </div>

            {/* Feedback */}
            {submitted && (
              <div className="mt-8 p-6 rounded-2xl border bg-gray-50 shadow-inner">
                {checkCorrect(userAnswer, question) ? (
                  <div className="text-green-700 font-semibold text-lg">✅ Correct!</div>
                ) : (
                  <div className="text-red-700 font-semibold text-lg">❌ Incorrect. Correct: {question.answer}</div>
                )}
                {isPractice && question.explanation && (
                  <div className="mt-3 text-gray-800"><span className="font-semibold">💡 Explanation:</span> {question.explanation}</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
