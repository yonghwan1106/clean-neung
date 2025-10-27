# 클린릉 (Clean-Neung)

AI 기반 강릉 스마트 분리수거 플랫폼

## 프로젝트 개요

클린릉은 강릉시민과 관광객이 쓰레기 분리수거를 쉽게 할 수 있도록 돕는 AI 기반 웹 애플리케이션입니다. 사진을 촬영하면 Claude AI가 자동으로 쓰레기를 분류하고 배출 방법을 안내합니다.

## 주요 기능

- 🤖 **AI 자동 분류**: Claude 4.0 vision을 활용한 쓰레기 자동 인식
- 📅 **배출 일정 안내**: 강릉시 지역별 배출 일정 자동 표시
- 🎁 **포인트 시스템**: 올바른 분리수거 시 포인트 적립
- 📱 **PWA 지원**: 앱 설치 없이 모바일에서 바로 사용 가능
- 🌍 **다국어 지원** (Phase 2): 한국어, 영어, 중국어, 일본어

## 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Claude API, Google Sheets API
- **Deployment**: Vercel

## 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
CLAUDE_API_KEY=your-claude-api-key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

### 3. Google Sheets 설정

Google Sheets에 다음 6개의 시트 생성:
- `users`, `waste_logs`, `points`, `waste_categories`, `notifications`, `reports`

자세한 스키마는 `docs/PRD.md` 참조

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 확인

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router
├── components/       # React 컴포넌트
├── lib/             # API, 유틸리티, 타입
└── store/           # Zustand 상태 관리
```

## 개발 로드맵

### Phase 1 (MVP) - 8주
- [x] 프로젝트 초기 설정
- [x] AI 분류 API 개발
- [ ] 이미지 업로드 UI
- [ ] 배출 일정 페이지
- [ ] 포인트 시스템

### Phase 2 - 추후
- [ ] 불법 투기 신고
- [ ] 다국어 지원
- [ ] 관리자 대시보드

## 문서

- [제안서](docs/제안서_강릉_쓰레기_AI관리앱.md)
- [PRD](docs/PRD.md)

## 연락처

- **제안자**: 박용환
- **이메일**: sanoramyun8@gmail.com
