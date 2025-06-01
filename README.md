# 개발자 스터디 매칭 - MOIM

Next.js 15 App Router + TypeScript + Supabase를 사용한 개발자 스터디 매칭 웹 애플리케이션입니다.

## 🚀 주요 기능

### 🎯 핵심 특징

- **회원가입/로그인 없이 접근 가능** - 누구나 쉽게 이용
- **모바일 우선 반응형 디자인** - Tailwind CSS로 구현
- **스터디장 승인제** - 수준 매칭을 통한 효율적인 스터디 구성
- **수준 평가 퀴즈 시스템** - 기술스택별 자동 수준 분류

### 📱 주요 기능

1. **스터디 생성**

   - 기본 정보 설정 (제목, 설명, 최대 인원)
   - 모임 형태 선택 (온라인/오프라인/하이브리드)
   - 기술스택 및 수준 설정
   - 연락처 정보 등록

2. **스터디 목록 & 필터링**

   - 카드 기반 레이아웃
   - 기술스택별 필터
   - 수준별/지역별/형태별 필터
   - 실시간 검색

3. **수준 평가 퀴즈**

   - 프로그래밍 기초 개념 (5문제)
   - 기술스택별 전문 문제
   - 자동 수준 분류 (Beginner/Intermediate/Advanced)

4. **스터디 참여 신청**

   - 퀴즈 응시 후 수준 확인
   - 간단한 자기소개 및 참여 동기 작성

5. **스터디장 승인 시스템**
   - 신청자 목록 및 정보 확인
   - 수준 매칭도 표시
   - 승인/거절 기능

## 🛠 기술 스택

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel (추천)

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                 # 메인 레이아웃
│   ├── page.tsx                   # 홈페이지 (스터디 목록)
│   ├── create/
│   │   └── page.tsx              # 스터디 생성 페이지
│   ├── study/
│   │   └── [id]/
│   │       ├── page.tsx          # 스터디 상세 페이지
│   │       └── applications/
│   │           └── page.tsx      # 신청자 관리 페이지
│   └── quiz/
│       └── [tech]/
│           └── page.tsx          # 기술스택별 퀴즈 페이지
├── lib/
│   ├── supabase.ts               # Supabase 클라이언트 설정
│   └── quiz-data.ts              # 퀴즈 문제 데이터
└── globals.css                   # 전역 스타일
```

## 🏗 설치 및 실행

### 1. 프로젝트 클론 및 의존성 설치

```bash
# 의존성이 이미 설치되어 있다면 스킵
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 환경 변수 설정:

```bash
# .env.local 파일 생성
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. 데이터베이스 스키마 설정

Supabase SQL Editor에서 다음 스키마를 실행하세요:

```sql
-- studies 테이블
create table studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  meeting_type text check (meeting_type in ('online', 'offline', 'hybrid')),
  tech_stack text[],
  level text,
  expected_knowledge text,
  max_participants integer,
  region text,
  contact_info text,
  created_at timestamp default now()
);

-- applications 테이블
create table applications (
  id uuid primary key default gen_random_uuid(),
  study_id uuid references studies(id),
  nickname text not null,
  contact text not null,
  level text,
  quiz_score integer,
  introduction text,
  motivation text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp default now()
);

-- quiz_questions 테이블 (선택사항 - 현재는 로컬 데이터 사용)
create table quiz_questions (
  id uuid primary key default gen_random_uuid(),
  tech_stack text,
  question text,
  options jsonb,
  correct_answer text,
  difficulty text
);

-- Row Level Security 활성화
alter table studies enable row level security;
alter table applications enable row level security;
alter table quiz_questions enable row level security;

-- 모든 사용자가 읽기 가능하도록 정책 설정
create policy "Studies are viewable by everyone" on studies for select using (true);
create policy "Applications are viewable by everyone" on applications for select using (true);
create policy "Quiz questions are viewable by everyone" on quiz_questions for select using (true);

-- 모든 사용자가 생성 가능하도록 정책 설정
create policy "Everyone can create studies" on studies for insert with check (true);
create policy "Everyone can create applications" on applications for insert with check (true);

-- 업데이트 정책 (applications 상태 변경용)
create policy "Everyone can update applications" on applications for update using (true);
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📱 페이지별 기능

### 홈페이지 (/)

- 스터디 목록을 카드 형태로 표시
- 기술스택/수준/지역/형태별 필터링
- 실시간 검색 및 정렬

### 스터디 생성 (/create)

- 단계별 스터디 정보 입력
- 기술스택 다중 선택
- 모임 형태별 추가 옵션

### 퀴즈 (/quiz/[tech])

- 프로그래밍 기초 + 기술스택별 문제
- 진행률 표시 및 이전/다음 네비게이션
- 자동 수준 분류 및 결과 표시

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: Blue 계열 (`blue-600`, `blue-700`)
- **Background**: Gray 계열 (`gray-50`, `white`)
- **Text**: Gray 계열 (`gray-900`, `gray-600`)
- **Accent**: 상황별 색상 (success: green, warning: yellow)

### 컴포넌트 클래스

- `.card`: 기본 카드 스타일
- `.btn-primary`: 주요 버튼
- `.btn-secondary`: 보조 버튼
- `.btn-outline`: 아웃라인 버튼
- `.input-field`: 입력 필드
- `.tag`: 태그/라벨

## 🚀 배포

### Vercel 배포 (추천)

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경 변수 설정
4. 자동 배포 완료

## 🔧 커스터마이징

### 기술스택 추가

1. `src/lib/quiz-data.ts`에서 새로운 기술스택의 문제 추가
2. 각 페이지의 `TECH_STACKS` 배열에 추가

### 퀴즈 문제 추가

1. `src/lib/quiz-data.ts`에서 해당 기술스택 배열에 문제 추가
2. `QuizData` 타입을 따라 객체 구성

### 디자인 수정

1. `src/app/globals.css`에서 컴포넌트 클래스 수정
2. Tailwind CSS 클래스로 스타일 조정

## 📝 향후 개선 계획

- [ ] 실시간 채팅 기능
- [ ] 스터디 진행 상황 추적
- [ ] 평가 및 리뷰 시스템
- [ ] 푸시 알림 기능
- [ ] 관리자 대시보드
- [ ] 고급 필터링 옵션

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

**MOIM** - 개발자들을 위한 스터디 매칭 플랫폼 💻✨
