import { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  // JavaScript 기초
  {
    id: "js-1",
    techStack: "JavaScript",
    question: "함수란 무엇인가요?",
    options: [
      "코드를 한 번만 실행하는 구문",
      "재사용 가능한 코드 블록",
      "변수를 저장하는 공간",
      "HTML 요소를 조작하는 기능",
    ],
    correctAnswer: "재사용 가능한 코드 블록",
    difficulty: "beginner",
  },
  {
    id: "js-2",
    techStack: "JavaScript",
    question: "let과 const의 차이점은?",
    options: [
      "let은 재할당 가능, const는 재할당 불가능",
      "let은 함수 스코프, const는 블록 스코프",
      "let은 호이스팅 안됨, const는 호이스팅 됨",
      "차이점이 없다",
    ],
    correctAnswer: "let은 재할당 가능, const는 재할당 불가능",
    difficulty: "beginner",
  },
  {
    id: "js-3",
    techStack: "JavaScript",
    question: "if문의 역할은?",
    options: [
      "반복문을 실행하는 것",
      "함수를 정의하는 것",
      "조건에 따라 코드를 실행하는 것",
      "변수를 선언하는 것",
    ],
    correctAnswer: "조건에 따라 코드를 실행하는 것",
    difficulty: "beginner",
  },
  {
    id: "js-4",
    techStack: "JavaScript",
    question: "배열의 push() 메서드는 무엇을 하나요?",
    options: [
      "배열의 첫 번째 요소를 제거",
      "배열의 마지막에 요소를 추가",
      "배열을 정렬",
      "배열의 길이를 반환",
    ],
    correctAnswer: "배열의 마지막에 요소를 추가",
    difficulty: "beginner",
  },
  {
    id: "js-5",
    techStack: "JavaScript",
    question: "클로저(Closure)란?",
    options: [
      "함수가 종료된 후에도 그 함수의 변수에 접근할 수 있는 기능",
      "객체를 생성하는 방법",
      "비동기 처리를 위한 기능",
      "에러를 처리하는 방법",
    ],
    correctAnswer: "함수가 종료된 후에도 그 함수의 변수에 접근할 수 있는 기능",
    difficulty: "intermediate",
  },

  // React 기초
  {
    id: "react-1",
    techStack: "React",
    question: "React의 가상 DOM이란?",
    options: [
      "HTML DOM의 복사본",
      "메모리상에서 관리되는 DOM의 표현",
      "서버에서 렌더링되는 DOM",
      "CSS로 스타일링된 DOM",
    ],
    correctAnswer: "메모리상에서 관리되는 DOM의 표현",
    difficulty: "beginner",
  },
  {
    id: "react-2",
    techStack: "React",
    question: "useState 훅의 용도는?",
    options: [
      "함수형 컴포넌트에서 상태를 관리",
      "컴포넌트 간 데이터 전달",
      "API 호출을 위한 기능",
      "라우팅을 관리하는 기능",
    ],
    correctAnswer: "함수형 컴포넌트에서 상태를 관리",
    difficulty: "beginner",
  },
  {
    id: "react-3",
    techStack: "React",
    question: "React에서 key 속성의 중요성은?",
    options: [
      "요소를 스타일링하기 위해",
      "이벤트 핸들러를 등록하기 위해",
      "React가 요소를 효율적으로 업데이트하기 위해",
      "컴포넌트에 데이터를 전달하기 위해",
    ],
    correctAnswer: "React가 요소를 효율적으로 업데이트하기 위해",
    difficulty: "intermediate",
  },
  {
    id: "react-4",
    techStack: "React",
    question: "useEffect 훅은 언제 사용하나요?",
    options: [
      "상태 변수를 선언할 때",
      "사이드 이펙트를 처리할 때",
      "컴포넌트를 렌더링할 때",
      "props를 전달할 때",
    ],
    correctAnswer: "사이드 이펙트를 처리할 때",
    difficulty: "intermediate",
  },
  {
    id: "react-5",
    techStack: "React",
    question: "React.memo는 언제 사용하나요?",
    options: [
      "메모리 사용량을 줄이기 위해",
      "컴포넌트의 불필요한 리렌더링을 방지하기 위해",
      "API 응답을 캐싱하기 위해",
      "상태를 초기화하기 위해",
    ],
    correctAnswer: "컴포넌트의 불필요한 리렌더링을 방지하기 위해",
    difficulty: "advanced",
  },

  // TypeScript 기초
  {
    id: "ts-1",
    techStack: "TypeScript",
    question: "TypeScript의 주요 장점은?",
    options: [
      "런타임 성능 향상",
      "정적 타입 검사로 개발 시 에러 감소",
      "번들 크기 감소",
      "브라우저 호환성 향상",
    ],
    correctAnswer: "정적 타입 검사로 개발 시 에러 감소",
    difficulty: "beginner",
  },
  {
    id: "ts-2",
    techStack: "TypeScript",
    question: "interface와 type의 차이점은?",
    options: [
      "interface는 객체만, type은 모든 타입 정의 가능",
      "interface는 확장 불가능, type은 확장 가능",
      "interface는 런타임에 존재, type은 컴파일 타임에만 존재",
      "차이점이 없다",
    ],
    correctAnswer: "interface는 객체만, type은 모든 타입 정의 가능",
    difficulty: "intermediate",
  },
  {
    id: "ts-3",
    techStack: "TypeScript",
    question: "제네릭(Generic)의 용도는?",
    options: [
      "코드를 간단하게 만들기 위해",
      "타입 안정성을 유지하면서 재사용 가능한 코드 작성",
      "런타임 성능을 향상시키기 위해",
      "메모리 사용량을 줄이기 위해",
    ],
    correctAnswer: "타입 안정성을 유지하면서 재사용 가능한 코드 작성",
    difficulty: "intermediate",
  },

  // Node.js 기초
  {
    id: "node-1",
    techStack: "Node.js",
    question: "Node.js의 특징은?",
    options: [
      "멀티스레드 기반의 JavaScript 런타임",
      "싱글스레드 이벤트 루프 기반의 JavaScript 런타임",
      "브라우저에서만 실행되는 JavaScript",
      "컴파일 언어",
    ],
    correctAnswer: "싱글스레드 이벤트 루프 기반의 JavaScript 런타임",
    difficulty: "beginner",
  },
  {
    id: "node-2",
    techStack: "Node.js",
    question: "npm의 역할은?",
    options: [
      "Node.js 패키지 관리자",
      "JavaScript 컴파일러",
      "웹 서버",
      "데이터베이스",
    ],
    correctAnswer: "Node.js 패키지 관리자",
    difficulty: "beginner",
  },

  // Python 기초
  {
    id: "python-1",
    techStack: "Python",
    question: "Python의 특징이 아닌 것은?",
    options: ["인터프리터 언어", "동적 타이핑", "컴파일 언어", "간결한 문법"],
    correctAnswer: "컴파일 언어",
    difficulty: "beginner",
  },
  {
    id: "python-2",
    techStack: "Python",
    question: "Python에서 리스트와 튜플의 차이점은?",
    options: [
      "리스트는 순서가 있고 튜플은 순서가 없다",
      "리스트는 변경 가능하고 튜플은 변경 불가능하다",
      "리스트는 숫자만 저장하고 튜플은 문자열만 저장한다",
      "차이점이 없다",
    ],
    correctAnswer: "리스트는 변경 가능하고 튜플은 변경 불가능하다",
    difficulty: "beginner",
  },

  // Java 기초
  {
    id: "java-1",
    techStack: "Java",
    question: "Java의 특징은?",
    options: [
      "플랫폼 독립적, 객체지향",
      "플랫폼 종속적, 절차지향",
      "스크립트 언어",
      "마크업 언어",
    ],
    correctAnswer: "플랫폼 독립적, 객체지향",
    difficulty: "beginner",
  },
  {
    id: "java-2",
    techStack: "Java",
    question: "JVM의 역할은?",
    options: [
      "자바 코드를 컴파일",
      "자바 바이트코드를 실행",
      "자바 코드를 디버깅",
      "자바 라이브러리 관리",
    ],
    correctAnswer: "자바 바이트코드를 실행",
    difficulty: "intermediate",
  },

  // C++ 기초
  {
    id: "cpp-1",
    techStack: "C++",
    question: "C++에서 포인터의 용도는?",
    options: [
      "변수의 값을 저장",
      "메모리 주소를 저장",
      "함수를 정의",
      "클래스를 생성",
    ],
    correctAnswer: "메모리 주소를 저장",
    difficulty: "intermediate",
  },
];

export const getQuestionsByTechStack = (techStack: string): QuizQuestion[] => {
  return quizQuestions.filter((q) => q.techStack === techStack);
};

export const calculateLevel = (
  score: number,
  totalQuestions: number
): string => {
  const percentage = (score / totalQuestions) * 100;
  if (percentage >= 80) return "advanced";
  if (percentage >= 60) return "intermediate";
  return "beginner";
};
