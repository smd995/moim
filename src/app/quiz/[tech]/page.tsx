"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getQuestionsForTechStack, type QuizData } from "@/lib/quiz-data";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const tech = decodeURIComponent(params.tech as string);

  const [questions, setQuestions] = useState<QuizData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    level: string;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  useEffect(() => {
    const quizQuestions = getQuestionsForTechStack(tech);
    setQuestions(quizQuestions);
  }, [tech]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = () => {
    const correctAnswers = questions.reduce((count, question) => {
      return selectedAnswers[question.id] === question.correct_answer
        ? count + 1
        : count;
    }, 0);

    const score = Math.round((correctAnswers / questions.length) * 100);

    let level = "Beginner";
    if (score >= 80) level = "Advanced";
    else if (score >= 60) level = "Intermediate";

    setQuizResult({
      score,
      level,
      correctAnswers,
      totalQuestions: questions.length,
    });
    setShowResult(true);
  };

  const handleReturnWithResult = () => {
    // 퀴즈 결과를 localStorage에 저장 (실제로는 부모 컴포넌트나 상태관리로 전달)
    if (quizResult) {
      localStorage.setItem(
        "quizResult",
        JSON.stringify({
          tech,
          ...quizResult,
        })
      );
    }
    router.back();
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">퀴즈를 불러오는 중...</div>
      </div>
    );
  }

  if (showResult && quizResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">퀴즈 완료!</h2>
          <p className="text-gray-600">{tech} 수준 평가가 완료되었습니다</p>
        </div>

        <div className="card text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {quizResult.score}점
          </div>
          <div className="text-lg">
            <span className="font-semibold text-gray-900">수준: </span>
            <span
              className={`font-bold ${
                quizResult.level === "Advanced"
                  ? "text-green-600"
                  : quizResult.level === "Intermediate"
                  ? "text-yellow-600"
                  : "text-blue-600"
              }`}
            >
              {quizResult.level}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {quizResult.correctAnswers}개 / {quizResult.totalQuestions}개 정답
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">수준별 설명</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <span className="font-medium text-green-800">
                Advanced (80점 이상)
              </span>
              <span className="text-green-600">고급 수준</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <span className="font-medium text-yellow-800">
                Intermediate (60-79점)
              </span>
              <span className="text-yellow-600">중급 수준</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span className="font-medium text-blue-800">
                Beginner (59점 이하)
              </span>
              <span className="text-blue-600">초급 수준</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowResult(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setQuizResult(null);
            }}
            className="flex-1 btn-outline"
          >
            다시 도전
          </button>
          <button
            onClick={handleReturnWithResult}
            className="flex-1 btn-primary"
          >
            결과 확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{tech} 퀴즈</h2>
        <p className="text-gray-600">
          문제 {currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>

      {/* 진행률 바 */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* 현재 문제 */}
      {currentQuestion && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestion.id] === option.id
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm font-bold">
                      {option.id.toUpperCase()}
                    </span>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion.id]}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? "완료" : "다음"}
            </button>
          </div>

          {/* 현재 선택된 답안 정보 */}
          {selectedAnswers[currentQuestion.id] && (
            <div className="text-sm text-gray-600 text-center">
              선택한 답안: {selectedAnswers[currentQuestion.id].toUpperCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
