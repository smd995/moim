"use client";

import { useState } from "react";
import Link from "next/link";
import { Study, MeetingType, Level } from "@/types";
import { storage } from "@/lib/storage";

interface FormData {
  title: string;
  description: string;
  meetingType: MeetingType;
  techStack: string[];
  level: Level;
  expectedKnowledge: string;
  maxParticipants: number;
  region: string;
  contactInfo: string;
}

export default function CreateStudyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hostKey, setHostKey] = useState("");
  const [studyId, setStudyId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    meetingType: "online",
    techStack: [],
    level: "beginner",
    expectedKnowledge: "",
    maxParticipants: 4,
    region: "",
    contactInfo: "",
  });

  const techStacks = [
    "React",
    "Vue",
    "Angular",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "C++",
  ];

  const handleTechStackChange = (tech: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, tech],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        techStack: prev.techStack.filter((t) => t !== tech),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const id = storage.generateId();
      const key = storage.generateHostKey();

      const study: Study = {
        id,
        ...formData,
        createdAt: new Date().toISOString(),
        hostKey: key,
      };

      storage.addStudy(study);

      setStudyId(id);
      setHostKey(key);
      setIsSuccess(true);
    } catch (error) {
      console.error("스터디 생성 중 오류:", error);
      alert("스터디 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="card p-8 text-center">
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              스터디가 생성되었습니다!
            </h2>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">관리 링크</p>
                <p className="text-xs text-gray-800 break-all font-mono">
                  {`${window.location.origin}/study/${studyId}/manage?key=${hostKey}`}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  ⚠️ 이 링크를 잃어버리면 스터디를 관리할 수 없습니다!
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Link
                href={`/study/${studyId}`}
                className="btn btn-primary w-full"
              >
                스터디 보기
              </Link>
              <Link href="/" className="btn btn-secondary w-full">
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              새 스터디 만들기
            </h1>
            <p className="text-gray-600 mt-2">
              개발자들과 함께 공부할 스터디를 만들어보세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                스터디 제목 *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="input"
                placeholder="예: React 함께 공부하기"
              />
            </div>

            {/* 설명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                스터디 설명 *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="input resize-none"
                placeholder="스터디에 대한 자세한 설명을 작성해주세요..."
              />
            </div>

            {/* 진행방식 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                진행방식 *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "online", label: "온라인" },
                  { value: "offline", label: "오프라인" },
                  { value: "hybrid", label: "하이브리드" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="meetingType"
                      value={option.value}
                      checked={formData.meetingType === option.value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          meetingType: e.target.value as
                            | "online"
                            | "offline"
                            | "hybrid",
                        }))
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 기술스택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기술스택 * (하나 이상 선택)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {techStacks.map((tech) => (
                  <label
                    key={tech}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.techStack.includes(tech)}
                      onChange={(e) =>
                        handleTechStackChange(tech, e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">{tech}</span>
                  </label>
                ))}
              </div>
              {formData.techStack.length === 0 && (
                <p className="text-red-600 text-sm mt-1">
                  최소 하나의 기술스택을 선택해주세요.
                </p>
              )}
            </div>

            {/* 수준 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대상 수준 *
              </label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    level: e.target.value as
                      | "beginner"
                      | "intermediate"
                      | "advanced",
                  }))
                }
                className="input"
              >
                <option value="beginner">초급</option>
                <option value="intermediate">중급</option>
                <option value="advanced">고급</option>
              </select>
            </div>

            {/* 필요 지식 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                필요한 사전 지식 *
              </label>
              <textarea
                required
                rows={3}
                value={formData.expectedKnowledge}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expectedKnowledge: e.target.value,
                  }))
                }
                className="input resize-none"
                placeholder="참여하기 위해 필요한 사전 지식이나 경험을 작성해주세요..."
              />
            </div>

            {/* 최대 인원 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최대 참여 인원 *
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxParticipants: parseInt(e.target.value) || 2,
                  }))
                }
                className="input"
              />
            </div>

            {/* 지역 (오프라인/하이브리드인 경우) */}
            {(formData.meetingType === "offline" ||
              formData.meetingType === "hybrid") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지역 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, region: e.target.value }))
                  }
                  className="input"
                  placeholder="예: 서울 강남구, 부산 해운대구"
                />
              </div>
            )}

            {/* 연락처 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연락처 *
              </label>
              <input
                type="text"
                required
                value={formData.contactInfo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: e.target.value,
                  }))
                }
                className="input"
                placeholder="이메일, 카카오톡 오픈챗 링크 등"
              />
            </div>

            {/* 제출 버튼 */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || formData.techStack.length === 0}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? "생성 중..." : "스터디 만들기"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
