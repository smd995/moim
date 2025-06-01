// 스터디 모집 게시판
export interface Study {
  id: string;
  title: string;
  description: string;
  meetingType: "online" | "offline" | "hybrid";
  techStack: string[];
  level: "beginner" | "intermediate" | "advanced";
  expectedKnowledge: string;
  maxParticipants: number;
  region?: string;
  contactInfo: string;
  createdAt: string;
  hostKey: string;
}

// 스터디 참여 신청
export interface Application {
  id: string;
  studyId: string;
  nickname: string;
  contact: string;
  level: string;
  quizScore: number;
  introduction: string;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

// 스터디 참여 신청 퀴즈 문제
export interface QuizQuestion {
  id: string;
  techStack: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
}

// 스터디 참여 신청 퀴즈 문제 옵션
export type TechStack =
  | "React"
  | "Vue"
  | "Angular"
  | "JavaScript"
  | "TypeScript"
  | "Node.js"
  | "Python"
  | "Java"
  | "C++";

// 스터디 참여 신청 퀴즈 문제 난이도
export type Level = "beginner" | "intermediate" | "advanced";

// 스터디 모집 게시판 회의 타입
export type MeetingType = "online" | "offline" | "hybrid";
