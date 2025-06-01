"use client";

import { useState, useEffect } from "react";
import { supabase, type Study } from "@/lib/supabase";

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
const MEETING_TYPES = {
  online: "온라인",
  offline: "오프라인",
  hybrid: "하이브리드",
};

export default function HomePage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);

  // 필터 상태
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    fetchStudies();
  }, []);

  useEffect(() => {
    filterStudies();
  }, [studies, selectedTech, selectedLevel, selectedType]);

  const fetchStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStudies(data || []);
    } catch (error) {
      console.error("스터디 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterStudies = () => {
    let filtered = studies;

    if (selectedTech) {
      filtered = filtered.filter((study) =>
        study.tech_stack.includes(selectedTech)
      );
    }

    if (selectedLevel) {
      filtered = filtered.filter((study) => study.level === selectedLevel);
    }

    if (selectedType) {
      filtered = filtered.filter(
        (study) => study.meeting_type === selectedType
      );
    }

    setFilteredStudies(filtered);
  };

  const clearFilters = () => {
    setSelectedTech("");
    setSelectedLevel("");
    setSelectedType("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">스터디 목록을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">개발자 스터디</h2>
        <p className="text-gray-600">함께 성장할 동료를 찾아보세요</p>
      </div>

      {/* 필터 섹션 */}
      <div className="space-y-4">
        {/* 기술스택 필터 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">기술스택</h3>
          <div className="flex flex-wrap gap-2">
            {TECH_STACKS.map((tech) => (
              <button
                key={tech}
                onClick={() =>
                  setSelectedTech(selectedTech === tech ? "" : tech)
                }
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTech === tech
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* 수준 및 형태 필터 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              수준
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field text-sm"
            >
              <option value="">전체</option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              형태
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field text-sm"
            >
              <option value="">전체</option>
              {Object.entries(MEETING_TYPES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 필터 초기화 */}
        {(selectedTech || selectedLevel || selectedType) && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 스터디 목록 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            스터디 목록 ({filteredStudies.length})
          </h3>
          <a href="/create" className="btn-primary text-sm">
            스터디 만들기
          </a>
        </div>

        {filteredStudies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              조건에 맞는 스터디가 없습니다
            </div>
            <a href="/create" className="btn-primary">
              첫 번째 스터디 만들기
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 스터디 카드 컴포넌트
function StudyCard({ study }: { study: Study }) {
  return (
    <a href={`/study/${study.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {study.title}
          </h4>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md whitespace-nowrap ml-2">
            {MEETING_TYPES[study.meeting_type]}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {study.description || "스터디 설명이 없습니다."}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {study.tech_stack.map((tech) => (
            <span key={tech} className="tag text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>수준: {study.level}</span>
            <span>최대 {study.max_participants}명</span>
          </div>
          {study.region && <span className="text-xs">{study.region}</span>}
        </div>
      </div>
    </a>
  );
}
