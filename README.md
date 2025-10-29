# 클린릉 (Clean-Neung)

AI 기반 강릉 스마트 분리수거 플랫폼

[![Deploy with Vercel](https://vercel.com/button)](https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app)

**🚀 프로덕션 사이트**: https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app

## 프로젝트 개요

클린릉은 강릉시민과 관광객이 쓰레기 분리수거를 쉽게 할 수 있도록 돕는 AI 기반 웹 애플리케이션입니다. 사진을 촬영하면 Claude AI가 자동으로 쓰레기를 분류하고 배출 방법을 안내합니다.

### 데모 계정

프로덕션 사이트에서 다음 기능을 테스트할 수 있습니다:
- 마이페이지: 사용자 프로필 및 활동 내역
- 포인트: 포인트 잔액 및 적립 내역
- 배출 일정: 강릉시 지역별 배출 일정
- AI 분류: 쓰레기 사진 업로드 및 자동 분류 (개발 중)

## 주요 기능

- 🤖 **AI 자동 분류**: Claude 4.5 Sonnet + Naver Clova를 활용한 쓰레기 자동 인식
- 📅 **배출 일정 안내**: 강릉시 지역별 배출 일정 자동 표시
- 🎁 **포인트 시스템**: 올바른 분리수거 시 포인트 적립
- 📱 **PWA 지원**: 앱 설치 없이 모바일에서 바로 사용 가능
- 🌍 **다국어 지원**: 한국어, 영어, 중국어, 일본어
- 👮 **관리자 대시보드**: 불법 투기 신고 관리, 쓰레기통 위치 관리, 사용자 통계

## 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes, NextAuth v5
- **AI**: Claude 4.5 Sonnet, Naver Clova Vision API
- **Database**: Google Sheets API
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

### Phase 1 (MVP) - 완료 ✅
- [x] 프로젝트 초기 설정
- [x] Google Sheets API 통합
- [x] AI 분류 API 개발 (Claude + Naver Clova)
- [x] 홈페이지 및 기본 레이아웃
- [x] 배출 일정 페이지
- [x] 포인트 시스템
- [x] 마이페이지
- [x] 모바일 네비게이션
- [x] Vercel 프로덕션 배포
- [x] 이미지 업로드 UI
- [x] 인증 시스템 (NextAuth v5)

### Phase 2 (Enhanced Features) - 완료 ✅
- [x] 다국어 지원 (한국어, 영어, 중국어, 일본어)
- [x] 관리자 대시보드
- [x] 불법 투기 신고 관리
- [x] 쓰레기통 위치 관리
- [x] 사용자 통계 및 관리
- [x] 프롬프트 엔지니어링을 통한 AI 정확도 개선
- [x] Naver Clova Vision API 통합

### Phase 3 - 추후
- [ ] 실시간 쓰레기통 만원 알림
- [ ] 커뮤니티 챌린지 및 리더보드
- [ ] 커스텀 도메인 (cleanneung.kr)
- [ ] Google Analytics
- [ ] Sentry 에러 모니터링
- [ ] PWA 매니페스트 및 서비스 워커

## 문서

- [제안서](docs/제안서_강릉_쓰레기_AI관리앱.md)
- [PRD](docs/PRD.md)
- [개발 진행 상황](docs/PROGRESS.md)
- [배포 가이드](docs/DEPLOYMENT.md)

## 배포

프로젝트는 Vercel에 배포되어 있습니다.

- **프로덕션 URL**: https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app
- **플랫폼**: Vercel
- **자동 배포**: `main` 브랜치에 푸시 시 자동 배포

자세한 배포 방법은 [DEPLOYMENT.md](docs/DEPLOYMENT.md)를 참조하세요.

## 연락처

- **제안자**: 박용환
- **이메일**: sanoramyun8@gmail.com
