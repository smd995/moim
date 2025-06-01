export type QuizOption = {
  id: string;
  text: string;
};

export type QuizData = {
  id: string;
  tech_stack: string | null;
  question: string;
  options: QuizOption[];
  correct_answer: string;
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
};

// 프로그래밍 기초 문제
export const basicQuestions: QuizData[] = [
  {
    id: "basic-1",
    tech_stack: null,
    question: "변수란 무엇인가요?",
    options: [
      { id: "a", text: "값을 저장하는 공간" },
      { id: "b", text: "프로그램을 실행하는 명령어" },
      { id: "c", text: "화면에 출력하는 함수" },
      { id: "d", text: "코드를 정리하는 방법" },
    ],
    correct_answer: "a",
    difficulty: "easy",
    explanation: "변수는 데이터를 저장하기 위한 메모리 공간입니다.",
  },
  {
    id: "basic-2",
    tech_stack: null,
    question: "함수의 주요 목적은 무엇인가요?",
    options: [
      { id: "a", text: "데이터를 저장하기 위해" },
      { id: "b", text: "코드를 재사용 가능하게 만들기 위해" },
      { id: "c", text: "변수를 선언하기 위해" },
      { id: "d", text: "프로그램을 종료하기 위해" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation:
      "함수는 특정 작업을 수행하는 코드를 묶어서 재사용할 수 있게 해줍니다.",
  },
  {
    id: "basic-3",
    tech_stack: null,
    question: "if문의 역할은 무엇인가요?",
    options: [
      { id: "a", text: "반복 작업을 수행한다" },
      { id: "b", text: "조건에 따라 다른 코드를 실행한다" },
      { id: "c", text: "함수를 정의한다" },
      { id: "d", text: "변수를 초기화한다" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation: "if문은 조건문으로, 특정 조건이 참일 때만 코드를 실행합니다.",
  },
  {
    id: "basic-4",
    tech_stack: null,
    question: "배열(Array)이란 무엇인가요?",
    options: [
      { id: "a", text: "하나의 값만 저장할 수 있는 변수" },
      { id: "b", text: "여러 개의 값을 순서대로 저장하는 자료구조" },
      { id: "c", text: "함수를 정의하는 방법" },
      { id: "d", text: "조건을 검사하는 명령어" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation:
      "배열은 여러 개의 값을 하나의 변수에 순서대로 저장할 수 있는 자료구조입니다.",
  },
  {
    id: "basic-5",
    tech_stack: null,
    question: "반복문(for문, while문)의 목적은 무엇인가요?",
    options: [
      { id: "a", text: "조건을 한 번만 검사하기 위해" },
      { id: "b", text: "같은 작업을 여러 번 반복하기 위해" },
      { id: "c", text: "함수를 호출하기 위해" },
      { id: "d", text: "변수를 삭제하기 위해" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation:
      "반복문은 특정 조건이 만족될 때까지 코드를 반복 실행하는 구조입니다.",
  },
];

// React 문제
export const reactQuestions: QuizData[] = [
  {
    id: "react-1",
    tech_stack: "React",
    question: "React의 주요 특징은 무엇인가요?",
    options: [
      { id: "a", text: "컴포넌트 기반 아키텍처" },
      { id: "b", text: "서버 사이드 렌더링만 지원" },
      { id: "c", text: "오직 모바일 앱 개발용" },
      { id: "d", text: "데이터베이스 관리 도구" },
    ],
    correct_answer: "a",
    difficulty: "easy",
    explanation:
      "React는 컴포넌트 기반으로 UI를 구성하는 JavaScript 라이브러리입니다.",
  },
  {
    id: "react-2",
    tech_stack: "React",
    question: "JSX란 무엇인가요?",
    options: [
      { id: "a", text: "JavaScript 함수" },
      { id: "b", text: "HTML과 JavaScript를 결합한 문법" },
      { id: "c", text: "CSS 스타일링 방법" },
      { id: "d", text: "데이터베이스 쿼리 언어" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation:
      "JSX는 JavaScript에서 HTML 같은 마크업을 작성할 수 있게 해주는 문법입니다.",
  },
  {
    id: "react-3",
    tech_stack: "React",
    question: "useState Hook의 역할은 무엇인가요?",
    options: [
      { id: "a", text: "컴포넌트의 상태를 관리한다" },
      { id: "b", text: "API를 호출한다" },
      { id: "c", text: "CSS 스타일을 적용한다" },
      { id: "d", text: "라우팅을 처리한다" },
    ],
    correct_answer: "a",
    difficulty: "medium",
    explanation:
      "useState는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 Hook입니다.",
  },
];

// Vue 문제
export const vueQuestions: QuizData[] = [
  {
    id: "vue-1",
    tech_stack: "Vue",
    question: "Vue.js의 주요 특징은 무엇인가요?",
    options: [
      { id: "a", text: "점진적 프레임워크" },
      { id: "b", text: "오직 대규모 애플리케이션용" },
      { id: "c", text: "서버 개발 전용" },
      { id: "d", text: "모바일 앱 전용" },
    ],
    correct_answer: "a",
    difficulty: "easy",
    explanation:
      "Vue.js는 점진적으로 도입할 수 있는 사용자 인터페이스 프레임워크입니다.",
  },
  {
    id: "vue-2",
    tech_stack: "Vue",
    question: "Vue에서 데이터 바인딩을 위해 사용하는 문법은?",
    options: [
      { id: "a", text: "{{}}" },
      { id: "b", text: "[]" },
      { id: "c", text: "()" },
      { id: "d", text: "<>" },
    ],
    correct_answer: "a",
    difficulty: "easy",
    explanation:
      "Vue에서는 이중 중괄호 {{}}를 사용하여 데이터를 템플릿에 바인딩합니다.",
  },
];

// Node.js 문제
export const nodeQuestions: QuizData[] = [
  {
    id: "node-1",
    tech_stack: "Node.js",
    question: "Node.js란 무엇인가요?",
    options: [
      { id: "a", text: "브라우저에서만 실행되는 JavaScript" },
      { id: "b", text: "서버에서 JavaScript를 실행할 수 있는 런타임" },
      { id: "c", text: "CSS 프레임워크" },
      { id: "d", text: "데이터베이스 관리 시스템" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation:
      "Node.js는 V8 엔진을 기반으로 서버에서 JavaScript를 실행할 수 있는 런타임입니다.",
  },
  {
    id: "node-2",
    tech_stack: "Node.js",
    question: "NPM의 역할은 무엇인가요?",
    options: [
      { id: "a", text: "코드 에디터" },
      { id: "b", text: "Node.js 패키지 관리자" },
      { id: "c", text: "브라우저" },
      { id: "d", text: "데이터베이스" },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation:
      "NPM은 Node.js의 패키지 관리자로, 외부 라이브러리를 설치하고 관리합니다.",
  },
];

// Python 문제
export const pythonQuestions: QuizData[] = [
  {
    id: "python-1",
    tech_stack: "Python",
    question: "Python의 주요 특징은 무엇인가요?",
    options: [
      { id: "a", text: "가독성이 높고 간결한 문법" },
      { id: "b", text: "오직 웹 개발만 가능" },
      { id: "c", text: "컴파일이 필요한 언어" },
      { id: "d", text: "모바일 앱 전용 언어" },
    ],
    correct_answer: "a",
    difficulty: "easy",
    explanation:
      "Python은 읽기 쉽고 간결한 문법으로 유명한 고급 프로그래밍 언어입니다.",
  },
  {
    id: "python-2",
    tech_stack: "Python",
    question: "Python에서 리스트를 생성하는 방법은?",
    options: [
      { id: "a", text: "list = {}" },
      { id: "b", text: "list = []" },
      { id: "c", text: "list = ()" },
      { id: "d", text: 'list = ""' },
    ],
    correct_answer: "b",
    difficulty: "easy",
    explanation: "Python에서는 대괄호 []를 사용하여 리스트를 생성합니다.",
  },
];

export const getAllQuestions = () => ({
  basic: basicQuestions,
  React: reactQuestions,
  Vue: vueQuestions,
  "Node.js": nodeQuestions,
  Python: pythonQuestions,
  Angular: [], // 나중에 추가
  Java: [], // 나중에 추가
  TypeScript: [], // 나중에 추가
  JavaScript: [], // 나중에 추가
});

export const getQuestionsForTechStack = (techStack: string): QuizData[] => {
  const allQuestions = getAllQuestions();
  const basic = allQuestions.basic;
  const specific = allQuestions[techStack as keyof typeof allQuestions] || [];

  return [...basic, ...specific];
};
