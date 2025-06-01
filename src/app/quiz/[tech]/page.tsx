"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuizQuestion } from "@/types";
import { getQuestionsByTechStack, calculateLevel } from "@/lib/quizData";

interface QuizPageProps {
  params: Promise<{ tech: string }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ tech: string } | null>(
    null
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const techStack = decodeURIComponent(resolvedParams.tech);
      const quizQuestions = getQuestionsByTechStack(techStack);

      if (quizQuestions.length === 0) {
        alert("해당 기술스택에 대한 퀴즈가 없습니다.");
        router.push("/");
        return;
      }

      // 랜덤하게 5문제 선택
      const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, Math.min(5, shuffled.length)));
      setSelectedAnswers(new Array(Math.min(5, shuffled.length)).fill(""));
    }
  }, [resolvedParams, router]);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 점수 계산
      let correctCount = 0;
      questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctCount++;
        }
      });

      setScore(correctCount);
      setLevel(calculateLevel(correctCount, questions.length));
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(""));
    setShowResult(false);
    setScore(0);
    setLevel("");
  };

  const saveQuizResult = () => {
    // 퀴즈 결과를 localStorage에 저장하여 신청서에서 사용할 수 있도록 함
    if (resolvedParams) {
      const result = {
        techStack: decodeURIComponent(resolvedParams.tech),
        score,
        level,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("lastQuizResult", JSON.stringify(result));
      router.push("/");
    }
  };

  if (!resolvedParams || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">퀴즈를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const techStack = decodeURIComponent(resolvedParams.tech);

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-900">
                개발자 스터디 매칭
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">
              {score === questions.length
                ? "🎉"
                : score >= questions.length * 0.6
                ? "👏"
                : "💪"}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {techStack} 퀴즈 완료!
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {score} / {questions.length}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                정답률: {Math.round((score / questions.length) * 100)}%
              </div>

              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
                <span
                  className={
                    level === "advanced"
                      ? "bg-red-100 text-red-800"
                      : level === "intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {level === "advanced"
                    ? "고급"
                    : level === "intermediate"
                    ? "중급"
                    : "초급"}{" "}
                  수준
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={saveQuizResult}
                className="btn btn-primary w-full"
              >
                결과 저장하고 메인으로
              </button>
              <button
                onClick={handleRetakeQuiz}
                className="btn btn-secondary w-full"
              >
                다시 도전하기
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              개발자 스터디 매칭
            </Link>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-blue-600 h-2 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-blue">{techStack}</span>
              <span className="text-sm text-gray-500">
                문제 {currentQuestion + 1}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              {currentQ.question}
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion] === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={selectedAnswers[currentQuestion] === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedAnswers[currentQuestion] === option
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === option && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion]}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? "완료" : "다음"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
