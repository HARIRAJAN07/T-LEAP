import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function QuestionPage() {
  const { classId, subject, topic, difficulty, questionType, mode } = useParams();
  const isPractice = mode === 'practice';
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState(null); // current question object
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [history, setHistory] = useState([]); // {q, userAnswer, correct, isCorrect}

  const payload = useMemo(() => ({
    stdClass: classId,
    subject,
    difficulty,
    topicHint: decodeURIComponent(topic),
    language: "English", // adjust if you add language selection
    questionType: questionType, // 'mcq' | 'fill' | 'assertion' | 'truefalse' | 'match' | 'mix'
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
    setSubmitted(true); // freeze current
    if (isPractice) {
      navigate("/"); // go back to Dashboard in practice mode
    } else {
      setShowReport(true); // show report only in test mode
    }
  };

  const [showReport, setShowReport] = useState(false);

  const correctCount = history.filter(h => h.isCorrect).length;

  // ====== Render helpers by type ======
  const renderMCQ = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center mb-8">
      {(question?.options || []).map((opt, i) => (
        <button key={i}
          onClick={() => setUserAnswer(opt)}
          className={`px-6 py-4 w-full text-xl font-semibold rounded-xl border-2 transition ${userAnswer === opt ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-indigo-100'}`}
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
      className="w-full max-w-xl px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
      placeholder="Type your answer"
    />
  );

  const renderTrueFalse = () => (
    <div className="flex gap-4">
      {['True', 'False'].map(t => (
        <button key={t} onClick={() => setUserAnswer(t)}
          className={`px-6 py-3 rounded-xl border-2 ${userAnswer===t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 hover:bg-indigo-50'}`}
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
      <div className="grid grid-cols-1 gap-3 max-w-3xl">
        {opts.map((o,i) => (
          <button key={i} onClick={() => setUserAnswer(o)}
            className={`text-left px-4 py-3 rounded-xl border-2 ${userAnswer===o ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 hover:bg-indigo-50'}`}
          >{i+1}. {o}</button>
        ))}
      </div>
    );
  };

  const renderMatch = () => (
    <div className="w-full max-w-2xl">
      <div className="bg-gray-50 rounded-xl p-4 border mb-4">
        <div className="font-semibold mb-2">Pairs to match:</div>
        {Object.entries(question?.pairs || {}).map(([k,v]) => (
          <div key={k} className="flex justify-between py-1"><span>{k}</span><span className="font-semibold">{v}</span></div>
        ))}
      </div>
      <input
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        placeholder="Enter mapping like A-1, B-2, C-3, D-4"
      />
    </div>
  );

  if (showReport && !isPractice) {
    const total = history.length;
    const wrong = total - correctCount;
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10 text-center">
          <h1 className="text-5xl font-bold text-indigo-700 mb-6">Test Report</h1>
          <div className="text-2xl mb-8">Class {classId} · {subject} · {decodeURIComponent(topic)} · {difficulty} · {questionType.toUpperCase()}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-xl border-2 border-gray-200">
              <div className="text-4xl font-bold">{total}</div>
              <div className="text-gray-600">Total Questions</div>
            </div>
            <div className="p-6 rounded-xl border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600">{correctCount}</div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div className="p-6 rounded-xl border-2 border-red-200">
              <div className="text-4xl font-bold text-red-600">{wrong}</div>
              <div className="text-gray-600">Wrong</div>
            </div>
          </div>
          <div className="text-left max-h-[50vh] overflow-auto border rounded-xl p-4">
            {history.map((h, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold">Q{i+1}. {h.question}</div>
                <div className="text-sm mt-1">Your Answer: <span className="font-medium">{h.userAnswer || '-'}</span></div>
                <div className="text-sm">Correct Answer: <span className="font-medium">{h.correctAnswer}</span></div>
                <div className={`text-sm mt-1 ${h.isCorrect? 'text-green-600':'text-red-600'}`}>{h.isCorrect? 'Correct':'Incorrect'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">{isPractice ? 'Practice' : 'Test'} Mode</h1>
          <div className="text-gray-600">Class {classId} · {subject} · {decodeURIComponent(topic)} · {difficulty} · {questionType.toUpperCase()}</div>
        </div>

        {/* Question */}
        {loading && <div className="text-xl">Loading question…</div>}
        {error && <div className="text-red-600">{error}</div>}
        {question && (
          <>
            <div className="text-2xl font-semibold mb-6">{question.question}</div>
            {/* Type-specific UI */}
            {question.type === 'mcq' && renderMCQ()}
            {question.type === 'fill' && renderFill()}
            {question.type === 'truefalse' && renderTrueFalse()}
            {question.type === 'assertion' && renderAssertion()}
            {question.type === 'match' && renderMatch()}

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-6">
              {!submitted && (
                <button onClick={onSubmit} className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700">Submit</button>
              )}
              <button onClick={onNext} className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">Next</button>
              <button onClick={onEnd} className="px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700">End Test</button>
            </div>

            {/* Feedback */}
            {submitted && (
              <div className="mt-6 p-4 rounded-xl border">
                {checkCorrect(userAnswer, question) ? (
                  <div className="text-green-700 font-semibold">✅ Correct!</div>
                ) : (
                  <div className="text-red-700 font-semibold">❌ Incorrect. Correct: {question.answer}</div>
                )}
                {isPractice && question.explanation && (
                  <div className="mt-2 text-gray-800"><span className="font-semibold">Explanation:</span> {question.explanation}</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
