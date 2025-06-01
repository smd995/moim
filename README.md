# 개발자 스터디 매칭 플랫폼

Next.js 15 App Router + TypeScript로 만든 개발자 스터디 매칭 웹 애플리케이션입니다.

## 🚀 주요 기능

### ✨ 핵심 특징

- **회원가입 없는 간편한 접근**: 누구나 쉽게 스터디를 만들고 참여할 수 있습니다
- **모바일 우선 반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **클라이언트 사이드 데이터 관리**: localStorage를 활용한 빠른 데이터 처리
- **스터디장 승인제**: 체계적인 스터디 멤버 관리

### 📚 주요 기능들

1. **스터디 생성 및 관리**

   - 상세한 스터디 정보 등록
   - 기술스택, 수준, 진행방식 설정
   - 스터디장 전용 관리 페이지

2. **지능형 매칭 시스템**

   - 기술스택별 실시간 퀴즈
   - 자동 수준 평가 및 분류
   - 퀴즈 점수 기반 신청 검증

3. **고도화된 필터링**

   - 기술스택, 수준, 지역, 진행방식별 필터
   - 실시간 검색 기능
   - 직관적인 카드 기반 UI

4. **포괄적인 신청 관리**
   - 상세한 신청서 양식
   - 스터디장의 승인/거절 시스템
   - 신청 상태 실시간 추적

## 🛠 기술 스택

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **데이터 관리**: localStorage (클라이언트 사이드)
- **상태 관리**: React Hooks (useState, useEffect, Custom Hooks)

## �� 페이지 구조

```
/ (홈페이지)
├── 스터디 목록 및 필터링
├── 검색 기능
└── 스터디 생성 버튼

/create (스터디 생성)
├── 스터디 정보 입력 폼
├── 기술스택 및 조건 설정
└── 관리 링크 생성

/study/[id] (스터디 상세)
├── 스터디 정보 표시
├── 퀴즈 링크
└── 참여 신청 폼

/quiz/[tech] (기술스택별 퀴즈)
├── 5문제 랜덤 출제
├── 진행률 표시
└── 점수 기반 수준 평가

/study/[id]/manage (스터디 관리)
├── 신청자 목록
├── 승인/거절 기능
└── 상태별 분류 표시
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📊 데이터 구조

### Study (스터디)

```typescript
interface Study {
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
  hostKey: string; // 스터디장 관리용
}
```

### Application (신청서)

```typescript
interface Application {
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
```

### QuizQuestion (퀴즈)

```typescript
interface QuizQuestion {
  id: string;
  techStack: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
}
```

## 🎯 사용 방법

### 1. 스터디 생성하기

1. 메인 페이지에서 "스터디 만들기" 클릭
2. 스터디 정보 입력 (제목, 설명, 기술스택 등)
3. 생성 완료 후 관리 링크 저장 ⚠️ **중요: 관리 링크를 잃어버리면 스터디 관리 불가**

### 2. 스터디 참여하기

1. 관심있는 스터디 카드에서 "상세보기" 클릭
2. 기술스택 퀴즈 풀기 (선택사항)
3. 신청서 작성 후 제출
4. 스터디장 승인 대기

### 3. 스터디 관리하기 (스터디장)

1. 스터디 생성 시 받은 관리 링크 접속
2. 신청자 목록 확인
3. 신청서 내용 검토 후 승인/거절

### 4. 퀴즈 시스템

- 기술스택별 5문제 랜덤 출제
- 점수에 따른 자동 수준 분류
  - 80% 이상: 고급 (Advanced)
  - 60% 이상: 중급 (Intermediate)
  - 60% 미만: 초급 (Beginner)

## 🎨 UI/UX 특징

- **깔끔한 디자인**: 흰색/회색 베이스 + 블루 포인트 컬러
- **카드 기반 레이아웃**: 직관적인 정보 표시
- **모바일 최적화**: 터치 친화적인 버튼 크기
- **실시간 피드백**: 로딩 상태 및 결과 알림

## 🗂 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── create/             # 스터디 생성 페이지
│   ├── quiz/[tech]/        # 기술스택별 퀴즈 페이지
│   ├── study/[id]/         # 스터디 상세 페이지
│   │   └── manage/         # 스터디 관리 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── types/                  # TypeScript 타입 정의
├── lib/                    # 유틸리티 및 데이터 관리
│   ├── storage.ts          # localStorage 관리
│   ├── quizData.ts         # 퀴즈 데이터 및 로직
│   └── sampleData.ts       # 개발용 샘플 데이터
└── hooks/                  # 커스텀 React 훅
    └── useLocalStorage.ts  # localStorage 훅
```

## 🧪 테스트 및 개발

### 샘플 데이터

개발 편의를 위해 4개의 샘플 스터디가 자동으로 생성됩니다:

- React 완전 정복 스터디 (중급, 온라인)
- Python 알고리즘 스터디 (초급, 오프라인)
- Node.js 백엔드 마스터 (고급, 하이브리드)
- Vue.js 프론트엔드 스터디 (초급, 온라인)

### 관리 링크 테스트

샘플 스터디 관리 페이지 접속:

```
/study/sample-1/manage?key=sample-host-key-1
/study/sample-2/manage?key=sample-host-key-2
/study/sample-3/manage?key=sample-host-key-3
/study/sample-4/manage?key=sample-host-key-4
```

## 🔧 개발 가이드

### 새로운 기술스택 퀴즈 추가

`src/lib/quizData.ts`에서 `quizQuestions` 배열에 새 문제 추가:

```typescript
{
  id: 'unique-id',
  techStack: '기술스택명',
  question: '문제 내용',
  options: ['선택지1', '선택지2', '선택지3', '선택지4'],
  correctAnswer: '정답',
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}
```

### 커스텀 스타일 추가

`src/app/globals.css`에서 Tailwind CSS 유틸리티 클래스 확장:

```css
.custom-button {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 이슈를 생성해 주세요.

---

**즐거운 스터디 매칭 되세요! 🎉**
