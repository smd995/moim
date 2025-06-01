import { Study } from "@/types";
import { storage } from "./storage";

export const sampleStudies: Study[] = [
  {
    id: "sample-1",
    title: "React 완전 정복 스터디",
    description:
      "React 기초부터 고급까지 함께 학습하는 스터디입니다.\n\n- 주 2회 온라인 모임\n- 실습 위주의 진행\n- 포트폴리오 프로젝트 개발",
    meetingType: "online",
    techStack: ["React", "JavaScript", "TypeScript"],
    level: "intermediate",
    expectedKnowledge:
      "JavaScript 기본 문법, HTML/CSS 기초 지식이 필요합니다.\nES6+ 문법에 대한 이해가 있으면 좋습니다.",
    maxParticipants: 6,
    contactInfo: "react.study@example.com",
    createdAt: "2024-01-15T10:00:00.000Z",
    hostKey: "sample-host-key-1",
  },
  {
    id: "sample-2",
    title: "Python 알고리즘 스터디",
    description:
      "코딩테스트 대비를 위한 Python 알고리즘 스터디입니다.\n\n매주 토요일 오후 2시-5시\n강남 스터디카페에서 진행",
    meetingType: "offline",
    techStack: ["Python"],
    level: "beginner",
    expectedKnowledge:
      "Python 기본 문법을 알고 있어야 합니다.\n코딩테스트 경험은 필요 없습니다.",
    maxParticipants: 4,
    region: "서울 강남구",
    contactInfo: "카카오톡 오픈채팅: algorithm-study-2024",
    createdAt: "2024-01-14T15:30:00.000Z",
    hostKey: "sample-host-key-2",
  },
  {
    id: "sample-3",
    title: "Node.js 백엔드 마스터",
    description:
      "Node.js와 Express를 이용한 백엔드 개발 스터디입니다.\n\n- 실제 서비스 수준의 API 개발\n- 데이터베이스 설계 및 최적화\n- 배포 및 운영 경험",
    meetingType: "hybrid",
    techStack: ["Node.js", "JavaScript", "TypeScript"],
    level: "advanced",
    expectedKnowledge:
      "JavaScript/TypeScript에 익숙해야 합니다.\nRESTful API 개념을 알고 있어야 합니다.\n데이터베이스 기본 지식이 필요합니다.",
    maxParticipants: 5,
    region: "서울 홍대",
    contactInfo: "backend.nodejs@example.com",
    createdAt: "2024-01-13T09:15:00.000Z",
    hostKey: "sample-host-key-3",
  },
  {
    id: "sample-4",
    title: "Vue.js 프론트엔드 스터디",
    description:
      "Vue.js를 배워보고 싶은 분들을 위한 스터디입니다.\n\n초보자 환영!\n차근차근 기초부터 시작합니다.",
    meetingType: "online",
    techStack: ["Vue", "JavaScript"],
    level: "beginner",
    expectedKnowledge: "HTML, CSS, JavaScript 기초 지식이 있으면 됩니다.",
    maxParticipants: 8,
    contactInfo: "vue.study.group@example.com",
    createdAt: "2024-01-12T20:00:00.000Z",
    hostKey: "sample-host-key-4",
  },
];

export const initializeSampleData = () => {
  // 기존에 데이터가 없을 때만 샘플 데이터 추가
  const existingStudies = storage.getStudies();
  if (existingStudies.length === 0) {
    sampleStudies.forEach((study) => {
      storage.addStudy(study);
    });
    console.log("샘플 데이터가 추가되었습니다.");
  }
};
