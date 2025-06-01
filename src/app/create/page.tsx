"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const TECH_STACKS = [
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "JavaScript",
];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function CreateStudyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    meeting_type: "online" as "online" | "offline" | "hybrid",
    tech_stack: [] as string[],
    level: "",
    expected_knowledge: "",
    max_participants: 4,
    region: "",
    contact_info: "",
  });

  const handleTechStackToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter((t) => t !== tech)
        : [...prev.tech_stack, tech],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.contact_info ||
      formData.tech_stack.length === 0 ||
      !formData.level
    ) {
      alert("필수 필드를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("studies")
        .insert([
          {
            id: uuidv4(),
            ...formData,
          },
        ])
        .select();

      if (error) throw error;

      alert("스터디가 성공적으로 생성되었습니다!");
      router.push("/");
    } catch (error) {
      console.error("스터디 생성 실패:", error);
      alert("스터디 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">스터디 생성</h2>
        <p className="text-gray-600">새로운 스터디를 만들어보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              스터디 제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input-field"
              placeholder="예: React 기초부터 실전까지"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              스터디 설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="input-field"
              rows={4}
              placeholder="스터디에 대한 자세한 설명을 작성해주세요..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              최대 인원 *
            </label>
            <select
              value={formData.max_participants}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  max_participants: Number(e.target.value),
                }))
              }
              className="input-field"
              required
            >
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}명
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 모임 형태 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">모임 형태</h3>

          <div className="flex gap-2">
            {[
              { value: "online", label: "온라인" },
              { value: "offline", label: "오프라인" },
              { value: "hybrid", label: "하이브리드" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    meeting_type: option.value as any,
                  }))
                }
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.meeting_type === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {(formData.meeting_type === "offline" ||
            formData.meeting_type === "hybrid") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                지역
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, region: e.target.value }))
                }
                className="input-field"
                placeholder="예: 강남구, 홍대, 판교 등"
              />
            </div>
          )}
        </div>

        {/* 기술스택 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">기술스택 *</h3>

          <div className="flex flex-wrap gap-2">
            {TECH_STACKS.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechStackToggle(tech)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  formData.tech_stack.includes(tech)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {formData.tech_stack.length === 0 && (
            <p className="text-sm text-red-500">
              최소 1개 이상의 기술스택을 선택해주세요
            </p>
          )}
        </div>

        {/* 수준 설정 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">수준 설정 *</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              대상 수준
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, level: e.target.value }))
              }
              className="input-field"
              required
            >
              <option value="">수준을 선택해주세요</option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              요구되는 지식
            </label>
            <textarea
              value={formData.expected_knowledge}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expected_knowledge: e.target.value,
                }))
              }
              className="input-field"
              rows={3}
              placeholder="참여자들이 미리 알고 있어야 할 지식이나 경험을 작성해주세요..."
            />
          </div>
        </div>

        {/* 연락처 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">연락처 정보 *</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              연락처
            </label>
            <input
              type="text"
              value={formData.contact_info}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contact_info: e.target.value,
                }))
              }
              className="input-field"
              placeholder="이메일, 전화번호, 카카오톡 ID 등"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              신청자들이 연락할 수 있는 방법을 입력해주세요
            </p>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 btn-secondary"
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary"
            disabled={loading}
          >
            {loading ? "생성 중..." : "스터디 생성"}
          </button>
        </div>
      </form>
    </div>
  );
}
