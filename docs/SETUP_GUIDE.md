# 클린릉 설정 가이드

## 완료된 작업 ✅

### 1. 프로젝트 초기화
- ✅ Next.js 15 프로젝트 생성 (TypeScript, Tailwind CSS, App Router)
- ✅ 필수 의존성 설치 (zustand, react-hook-form, googleapis, @anthropic-ai/sdk)
- ✅ shadcn/ui 설정 및 컴포넌트 추가 (button, card, input, label, form, sonner)

### 2. 프로젝트 구조
- ✅ 폴더 구조 생성 (app, components, lib, store)
- ✅ TypeScript 타입 정의 (User, WasteLog, Point, API types)
- ✅ 상수 파일 생성 (schedules, wasteCategories)
- ✅ 유틸리티 함수 (image processing)

### 3. API 통합
- ✅ Claude AI API 통합 (이미지 분석 및 분류)
- ✅ Google Sheets API 통합 (데이터 저장)
- ✅ AI 분류 API 라우트 (/api/classify)

### 4. UI
- ✅ 메인 랜딩 페이지
- ✅ 기본 레이아웃 및 스타일링

### 5. Git
- ✅ Git 저장소 초기화
- ✅ 초기 커밋 완료

---

## 다음 단계 🚀

### Phase 1: Google Sheets 설정

1. **Google Cloud 프로젝트 생성**
   - https://console.cloud.google.com/ 접속
   - 새 프로젝트 생성: "clean-neung"

2. **Google Sheets API 활성화**
   - API 및 서비스 → 라이브러리
   - "Google Sheets API" 검색 및 활성화

3. **Service Account 생성**
   - API 및 서비스 → 사용자 인증 정보
   - 사용자 인증 정보 만들기 → 서비스 계정
   - 서비스 계정 이름: "clean-neung-service"
   - 역할: 편집자

4. **Service Account 키 다운로드**
   - 생성된 서비스 계정 클릭
   - 키 탭 → 키 추가 → 새 키 만들기 → JSON
   - 다운로드된 JSON 파일에서:
     - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
     - `private_key` → `GOOGLE_PRIVATE_KEY`

5. **Google Sheet 생성**
   - https://sheets.google.com/ 에서 새 시트 생성
   - 시트 이름: "클린릉_데이터"
   - 시트 ID 복사 (URL에서): `GOOGLE_SHEET_ID`

6. **시트 공유**
   - Service Account 이메일과 시트 공유 (편집자 권한)

7. **6개 시트 생성 및 헤더 추가**

**Sheet 1: users**
```
id | name | email | phone | address | address_detail | latitude | longitude | total_points | language | push_enabled | created_at | updated_at
```

**Sheet 2: waste_logs**
```
id | user_id | image_url | detected_item | category | disposal_method | disposal_day | confidence | ai_response | points_earned | created_at
```

**Sheet 3: points**
```
id | user_id | type | amount | reason | related_id | created_at
```

**Sheet 4: waste_categories**
```
id | item_name | category | disposal_method | disposal_days | special_notes | keywords | created_at
```

**Sheet 5: notifications**
```
id | user_id | notification_type | enabled | schedule_time | created_at | updated_at
```

**Sheet 6: reports**
```
id | user_id | image_url | location_address | latitude | longitude | description | status | admin_note | created_at | resolved_at
```

### Phase 2: 환경 변수 설정

`.env.local` 파일에 실제 값 입력:

```env
# Claude AI (이미 설정됨)
CLAUDE_API_KEY=sk-ant-api03-...

# Google Sheets (위에서 얻은 값)
GOOGLE_SERVICE_ACCOUNT_EMAIL=clean-neung-service@...iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n실제_키_값\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1ABC...XYZ
```

### Phase 3: 개발 진행

현재 개발 서버가 실행 중입니다:
- URL: http://localhost:3002
- 메인 페이지가 표시되는지 확인하세요

다음 개발 작업:
1. **이미지 업로드 컴포넌트** 생성
   - 카메라 촬영 기능
   - 파일 선택 기능
   - 이미지 미리보기

2. **분류 페이지** (/classify)
   - 이미지 업로드 UI
   - AI 분석 중 로딩 상태
   - 분류 결과 표시

3. **배출 일정 페이지** (/schedule)
   - 지역별 배출 일정 표시
   - 캘린더 뷰

4. **포인트 페이지** (/points)
   - 포인트 잔액 표시
   - 포인트 히스토리

5. **마이페이지** (/mypage)
   - 사용자 정보 표시
   - 사용 통계

### Phase 4: Vercel 배포

1. **GitHub 저장소 생성**
   ```bash
   # GitHub에서 새 저장소 생성 후
   git remote add origin https://github.com/your-username/clean-neung.git
   git push -u origin master
   ```

2. **Vercel 배포**
   - https://vercel.com/ 로그인
   - Import Project → GitHub 저장소 선택
   - 환경 변수 설정 (`.env.local` 내용 복사)
   - Deploy 클릭

---

## 테스트 체크리스트

### API 테스트
- [ ] `/api/classify` 엔드포인트에 이미지 전송
- [ ] AI 분석 결과 수신 확인
- [ ] Google Sheets에 데이터 저장 확인

### UI 테스트
- [ ] 메인 페이지 로딩
- [ ] 반응형 디자인 (모바일/데스크톱)
- [ ] 버튼 클릭 동작

### 통합 테스트
- [ ] 이미지 업로드 → 분류 → 결과 표시 전체 플로우
- [ ] 포인트 적립 확인
- [ ] 오류 처리

---

## 문제 해결

### Google Sheets API 오류
- Service Account 이메일이 시트에 공유되어 있는지 확인
- `GOOGLE_PRIVATE_KEY`의 줄바꿈(`\n`)이 올바른지 확인

### Claude AI API 오류
- API 키가 유효한지 확인
- 모델명이 정확한지 확인 (`claude-sonnet-4-20250514`)

### 개발 서버 오류
- 포트 충돌: 다른 포트 사용 (`npm run dev -- -p 3001`)
- 의존성 문제: `npm install` 다시 실행

---

## 참고 자료

- [Next.js 15 문서](https://nextjs.org/docs)
- [Claude API 문서](https://docs.anthropic.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**작업 완료일**: 2025-10-27
**다음 업데이트**: Google Sheets 설정 완료 후
