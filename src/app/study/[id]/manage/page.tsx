"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Study, Application } from "@/types";
import { storage } from "@/lib/storage";

interface ManagePageProps {
  params: Promise<{ id: string }>;
}

export default function ManagePage({ params }: ManagePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [study, setStudy] = useState<Study | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const hostKey = searchParams.get("key");
      const foundStudy = storage.getStudyById(resolvedParams.id);

      if (!foundStudy) {
        alert("스터디를 찾을 수 없습니다.");
        router.push("/");
        return;
      }

      if (!hostKey || foundStudy.hostKey !== hostKey) {
        alert("권한이 없습니다.");
        router.push(`/study/${resolvedParams.id}`);
        return;
      }

      setStudy(foundStudy);
      setIsAuthorized(true);
      loadApplications(resolvedParams.id);
      setIsLoading(false);
    }
  }, [resolvedParams, searchParams, router]);

  const loadApplications = (studyId: string) => {
    const studyApplications = storage.getApplicationsByStudyId(studyId);
    setApplications(studyApplications);
  };

  const handleApplicationStatusChange = (
    applicationId: string,
    status: Application["status"]
  ) => {
    storage.updateApplicationStatus(applicationId, status);
    if (resolvedParams) {
      loadApplications(resolvedParams.id);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "badge badge-green";
      case "rejected":
        return "badge badge-red";
      default:
        return "badge badge-yellow";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "승인됨";
      case "rejected":
        return "거절됨";
      default:
        return "대기중";
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">권한을 확인하는 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized || !study) {
    return null;
  }

  const pendingApplications = applications.filter(
    (app) => app.status === "pending"
  );
  const approvedApplications = applications.filter(
    (app) => app.status === "approved"
  );
  const rejectedApplications = applications.filter(
    (app) => app.status === "rejected"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              개발자 스터디 매칭
            </Link>
            <div className="flex gap-2">
              <Link href={`/study/${study.id}`} className="btn btn-secondary">
                스터디 보기
              </Link>
              <Link href="/" className="btn btn-secondary">
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 스터디 정보 */}
        <div className="card mb-8">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {study.title} - 관리 페이지
            </h1>
            <p className="text-gray-600">스터디 신청자를 관리할 수 있습니다.</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {applications.length}
                </div>
                <div className="text-sm text-gray-600">총 신청자</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingApplications.length}
                </div>
                <div className="text-sm text-gray-600">대기중</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {approvedApplications.length}
                </div>
                <div className="text-sm text-gray-600">승인됨</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {rejectedApplications.length}
                </div>
                <div className="text-sm text-gray-600">거절됨</div>
              </div>
            </div>
          </div>
        </div>

        {/* 신청자 목록 */}
        <div className="space-y-6">
          {/* 대기중인 신청자 */}
          {pendingApplications.length > 0 && (
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  대기중인 신청자 ({pendingApplications.length}명)
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {pendingApplications.map((application) => (
                  <div key={application.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.nickname}
                        </h3>
                        <p className="text-gray-600">{application.contact}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={getLevelBadgeClass(application.level)}>
                          {application.level === "beginner"
                            ? "초급"
                            : application.level === "intermediate"
                            ? "중급"
                            : "고급"}
                        </span>
                        {application.quizScore > 0 && (
                          <span className="badge badge-blue">
                            퀴즈 {application.quizScore}점
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          자기소개
                        </h4>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">
                          {application.introduction}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          참여 동기
                        </h4>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">
                          {application.motivation}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleApplicationStatusChange(
                            application.id,
                            "approved"
                          )
                        }
                        className="btn btn-primary text-sm"
                      >
                        승인
                      </button>
                      <button
                        onClick={() =>
                          handleApplicationStatusChange(
                            application.id,
                            "rejected"
                          )
                        }
                        className="btn btn-danger text-sm"
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 승인된 신청자 */}
          {approvedApplications.length > 0 && (
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  승인된 신청자 ({approvedApplications.length}명)
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {approvedApplications.map((application) => (
                  <div key={application.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.nickname}
                        </h3>
                        <p className="text-gray-600">{application.contact}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={getStatusBadgeClass(application.status)}
                        >
                          {getStatusText(application.status)}
                        </span>
                        <button
                          onClick={() =>
                            handleApplicationStatusChange(
                              application.id,
                              "rejected"
                            )
                          }
                          className="btn btn-danger text-sm"
                        >
                          거절로 변경
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 거절된 신청자 */}
          {rejectedApplications.length > 0 && (
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  거절된 신청자 ({rejectedApplications.length}명)
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {rejectedApplications.map((application) => (
                  <div key={application.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.nickname}
                        </h3>
                        <p className="text-gray-600">{application.contact}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={getStatusBadgeClass(application.status)}
                        >
                          {getStatusText(application.status)}
                        </span>
                        <button
                          onClick={() =>
                            handleApplicationStatusChange(
                              application.id,
                              "approved"
                            )
                          }
                          className="btn btn-primary text-sm"
                        >
                          승인으로 변경
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 신청자가 없는 경우 */}
          {applications.length === 0 && (
            <div className="card p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                아직 신청자가 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                스터디가 등록되면 신청자들이 나타날 예정입니다.
              </p>
              <Link href={`/study/${study.id}`} className="btn btn-primary">
                스터디 페이지 보기
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
