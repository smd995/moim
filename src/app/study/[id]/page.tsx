"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Study, Application } from "@/types";
import { storage } from "@/lib/storage";

interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function StudyDetailPage({ params }: StudyDetailPageProps) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [study, setStudy] = useState<Study | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const [applicationForm, setApplicationForm] = useState({
    nickname: "",
    contact: "",
    introduction: "",
    motivation: "",
    selectedTechStack: "",
  });

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const foundStudy = storage.getStudyById(resolvedParams.id);
      if (!foundStudy) {
        alert("스터디를 찾을 수 없습니다.");
        router.push("/");
        return;
      }
      setStudy(foundStudy);
    }
  }, [resolvedParams, router]);

  const handleStartQuiz = (techStack: string) => {
    router.push(`/quiz/${encodeURIComponent(techStack)}`);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!study) return;

    setIsSubmitting(true);

    try {
      // 저장된 퀴즈 결과 가져오기
      const lastQuizResult = localStorage.getItem("lastQuizResult");
      let quizScore = 0;
      let level = "beginner";

      if (lastQuizResult) {
        const quizData = JSON.parse(lastQuizResult);
        if (quizData.techStack === applicationForm.selectedTechStack) {
          quizScore = quizData.score;
          level = quizData.level;
        }
      }

      const application: Application = {
        id: storage.generateId(),
        studyId: study.id,
        nickname: applicationForm.nickname,
        contact: applicationForm.contact,
        level,
        quizScore,
        introduction: applicationForm.introduction,
        motivation: applicationForm.motivation,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      storage.addApplication(application);
      setApplicationSuccess(true);

      // 퀴즈 결과 삭제
      localStorage.removeItem("lastQuizResult");
    } catch (error) {
      console.error("신청 중 오류:", error);
      alert("신청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!study) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">스터디 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (applicationSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="card p-8 text-center">
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              신청이 완료되었습니다!
            </h2>
            <p className="text-gray-600 mb-6">
              스터디장의 승인을 기다려주세요.
            </p>
            <div className="space-y-2">
              <Link href="/" className="btn btn-primary w-full">
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "beginner":
        return "badge badge-green";
      case "intermediate":
        return "badge badge-yellow";
      case "advanced":
        return "badge badge-red";
      default:
        return "badge badge-blue";
    }
  };

  const getMeetingTypeBadgeClass = (type: string) => {
    switch (type) {
      case "online":
        return "badge badge-blue";
      case "offline":
        return "badge badge-green";
      case "hybrid":
        return "badge badge-yellow";
      default:
        return "badge badge-blue";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              개발자 스터디 매칭
            </Link>
            <Link href="/" className="btn btn-secondary">
              목록으로
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 스터디 정보 */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {study.title}
                  </h1>
                  <span className={getMeetingTypeBadgeClass(study.meetingType)}>
                    {study.meetingType === "online"
                      ? "온라인"
                      : study.meetingType === "offline"
                      ? "오프라인"
                      : "하이브리드"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {study.techStack.map((tech, index) => (
                    <span key={index} className="badge badge-blue">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className={getLevelBadgeClass(study.level)}>
                    {study.level === "beginner"
                      ? "초급"
                      : study.level === "intermediate"
                      ? "중급"
                      : "고급"}
                  </span>
                  <span>최대 {study.maxParticipants}명</span>
                  {study.region && <span>📍 {study.region}</span>}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    스터디 소개
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {study.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    필요한 사전 지식
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {study.expectedKnowledge}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    연락처
                  </h3>
                  <p className="text-gray-700">{study.contactInfo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                스터디 참여하기
              </h3>

              {!showApplicationForm ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    참여하고 싶은 기술스택의 퀴즈를 먼저 풀어주세요.
                  </p>

                  <div className="space-y-2">
                    {study.techStack.map((tech, index) => (
                      <button
                        key={index}
                        onClick={() => handleStartQuiz(tech)}
                        className="btn btn-primary w-full text-sm"
                      >
                        {tech} 퀴즈 풀기
                      </button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      className="btn btn-secondary w-full text-sm"
                    >
                      퀴즈 없이 신청하기
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      닉네임 *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationForm.nickname}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          nickname: e.target.value,
                        }))
                      }
                      className="input text-sm"
                      placeholder="닉네임을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationForm.contact}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          contact: e.target.value,
                        }))
                      }
                      className="input text-sm"
                      placeholder="이메일 또는 연락처"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      관심 기술스택 *
                    </label>
                    <select
                      required
                      value={applicationForm.selectedTechStack}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          selectedTechStack: e.target.value,
                        }))
                      }
                      className="input text-sm"
                    >
                      <option value="">선택하세요</option>
                      {study.techStack.map((tech, index) => (
                        <option key={index} value={tech}>
                          {tech}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      자기소개 *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={applicationForm.introduction}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          introduction: e.target.value,
                        }))
                      }
                      className="input text-sm resize-none"
                      placeholder="간단한 자기소개를 작성해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      참여 동기 *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={applicationForm.motivation}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          motivation: e.target.value,
                        }))
                      }
                      className="input text-sm resize-none"
                      placeholder="스터디에 참여하고 싶은 이유를 작성해주세요"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="btn btn-secondary flex-1 text-sm"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary flex-1 text-sm"
                    >
                      {isSubmitting ? "신청 중..." : "신청하기"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
