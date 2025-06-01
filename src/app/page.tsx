"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Study } from "@/types";
import { storage } from "@/lib/storage";
import { initializeSampleData } from "@/lib/sampleData";

const StudyCard = ({ study }: { study: Study }) => {
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
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {study.title}
        </h3>
        <span className={getMeetingTypeBadgeClass(study.meetingType)}>
          {study.meetingType === "online"
            ? "온라인"
            : study.meetingType === "offline"
            ? "오프라인"
            : "하이브리드"}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{study.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {study.techStack.map((tech, index) => (
          <span key={index} className="badge badge-blue">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className={getLevelBadgeClass(study.level)}>
          {study.level === "beginner"
            ? "초급"
            : study.level === "intermediate"
            ? "중급"
            : "고급"}
        </span>
        <span className="text-sm text-gray-500">
          {study.maxParticipants}명 모집
        </span>
      </div>

      {study.region && (
        <p className="text-sm text-gray-500 mb-4">📍 {study.region}</p>
      )}

      <div className="flex gap-2">
        <Link
          href={`/study/${study.id}`}
          className="btn btn-primary flex-1 text-center"
        >
          상세보기
        </Link>
      </div>
    </div>
  );
};

const FilterSection = ({
  onTechStackChange,
  onLevelChange,
  onMeetingTypeChange,
  techStackFilter,
  levelFilter,
  meetingTypeFilter,
}: {
  onTechStackChange: (tech: string) => void;
  onLevelChange: (level: string) => void;
  onMeetingTypeChange: (type: string) => void;
  techStackFilter: string;
  levelFilter: string;
  meetingTypeFilter: string;
}) => {
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
  const levels = [
    { value: "beginner", label: "초급" },
    { value: "intermediate", label: "중급" },
    { value: "advanced", label: "고급" },
  ];
  const meetingTypes = [
    { value: "online", label: "온라인" },
    { value: "offline", label: "오프라인" },
    { value: "hybrid", label: "하이브리드" },
  ];

  return (
    <div className="card p-4 mb-6">
      <h3 className="font-semibold mb-4">필터</h3>

      <div className="space-y-4">
        {/* 기술스택 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기술스택
          </label>
          <select
            value={techStackFilter}
            onChange={(e) => onTechStackChange(e.target.value)}
            className="input"
          >
            <option value="">전체</option>
            {techStacks.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        {/* 수준 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            수준
          </label>
          <select
            value={levelFilter}
            onChange={(e) => onLevelChange(e.target.value)}
            className="input"
          >
            <option value="">전체</option>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* 진행방식 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            진행방식
          </label>
          <select
            value={meetingTypeFilter}
            onChange={(e) => onMeetingTypeChange(e.target.value)}
            className="input"
          >
            <option value="">전체</option>
            {meetingTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [techStackFilter, setTechStackFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [meetingTypeFilter, setMeetingTypeFilter] = useState("");

  useEffect(() => {
    // 샘플 데이터 초기화
    initializeSampleData();

    const loadedStudies = storage.getStudies();
    setStudies(loadedStudies);
    setFilteredStudies(loadedStudies);
  }, []);

  useEffect(() => {
    let filtered = studies;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(
        (study) =>
          study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.techStack.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // 기술스택 필터
    if (techStackFilter) {
      filtered = filtered.filter((study) =>
        study.techStack.includes(techStackFilter)
      );
    }

    // 수준 필터
    if (levelFilter) {
      filtered = filtered.filter((study) => study.level === levelFilter);
    }

    // 진행방식 필터
    if (meetingTypeFilter) {
      filtered = filtered.filter(
        (study) => study.meetingType === meetingTypeFilter
      );
    }

    setFilteredStudies(filtered);
  }, [studies, searchTerm, techStackFilter, levelFilter, meetingTypeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              개발자 스터디 매칭
            </h1>
            <Link href="/create" className="btn btn-primary">
              스터디 만들기
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 필터 */}
          <aside className="lg:col-span-1">
            <FilterSection
              onTechStackChange={setTechStackFilter}
              onLevelChange={setLevelFilter}
              onMeetingTypeChange={setMeetingTypeFilter}
              techStackFilter={techStackFilter}
              levelFilter={levelFilter}
              meetingTypeFilter={meetingTypeFilter}
            />
          </aside>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* 검색바 */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="스터디 제목, 설명, 기술스택으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>

            {/* 스터디 목록 */}
            <div className="space-y-4">
              {filteredStudies.length === 0 ? (
                <div className="card p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    등록된 스터디가 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    첫 번째 스터디를 만들어보세요!
                  </p>
                  <Link href="/create" className="btn btn-primary">
                    스터디 만들기
                  </Link>
                </div>
              ) : (
                filteredStudies.map((study) => (
                  <StudyCard key={study.id} study={study} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
