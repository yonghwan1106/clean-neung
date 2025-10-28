# 배포 가이드

## 현재 배포 상태

- **프로덕션 URL**: https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app
- **플랫폼**: Vercel
- **배포 날짜**: 2025-10-28
- **자동 배포**: ✅ `main` 브랜치 푸시 시 자동 배포
- **환경 변수**: ✅ 13개 설정 완료

---

## 1. GitHub 저장소 설정

### 1-1. GitHub에서 새 저장소 생성

1. https://github.com 로그인
2. 우측 상단 "+" → "New repository" 클릭
3. 저장소 정보 입력:
   - **Repository name**: `clean-neung`
   - **Description**: "AI 기반 강릉 스마트 분리수거 플랫폼"
   - **Visibility**: Public 또는 Private 선택
   - ⚠️ **"Initialize this repository with" 옵션은 모두 체크 해제** (이미 로컬에 코드가 있음)
4. "Create repository" 클릭

### 1-2. 로컬 저장소를 GitHub에 연결

생성된 저장소 페이지에서 표시되는 명령어를 실행하세요:

```bash
cd clean-neung

# 원격 저장소 추가 (your-username을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/your-username/clean-neung.git

# 또는 SSH를 사용하는 경우:
# git remote add origin git@github.com:your-username/clean-neung.git

# main 브랜치로 이름 변경 (선택사항, GitHub 기본값에 맞추기)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 1-3. 푸시 확인

```bash
# 원격 저장소 확인
git remote -v

# 현재 브랜치 확인
git branch

# 푸시 완료 확인
# GitHub 저장소 페이지에서 파일들이 표시되는지 확인
```

---

## 2. Vercel 배포

### 2-1. Vercel 계정 생성 및 로그인

1. https://vercel.com 접속
2. "Sign Up" 또는 "Log In"
3. **GitHub 계정으로 로그인 권장** (자동 연동 편리)

### 2-2. 새 프로젝트 Import

1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. "Import Git Repository" 섹션에서:
   - GitHub 저장소 `clean-neung` 선택
   - "Import" 클릭

### 2-3. 프로젝트 설정

#### Framework Preset
- 자동으로 "Next.js" 감지됨 ✅

#### Root Directory
- 기본값 `./` 유지 ✅

#### Build and Output Settings
- **Build Command**: `npm run build` (자동 설정됨)
- **Output Directory**: `.next` (자동 설정됨)
- **Install Command**: `npm install` (자동 설정됨)

#### Environment Variables (중요! ⚠️)

"Environment Variables" 섹션에서 다음 변수들을 **반드시** 추가하세요:

```env
# Claude AI
CLAUDE_API_KEY=your-claude-api-key-here
CLAUDE_MODEL=claude-sonnet-4-20250514

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
... (전체 Private Key 복사) ...
-----END PRIVATE KEY-----

GOOGLE_SHEET_ID=your-google-sheet-id-here

# Next.js
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
```

**주의사항:**
- `GOOGLE_PRIVATE_KEY`는 전체 내용을 그대로 복사해야 합니다 (줄바꿈 포함)
- Vercel은 자동으로 줄바꿈을 처리하므로 `\n`으로 변환할 필요 없습니다
- `NEXT_PUBLIC_APP_URL`은 배포 후 실제 URL로 업데이트하세요

### 2-4. 배포 시작

1. "Deploy" 버튼 클릭
2. 배포 진행 상황 확인 (약 2-3분 소요)
3. ✅ 배포 완료 시 "Congratulations!" 메시지 표시

### 2-5. 배포 URL 확인

배포가 완료되면 다음과 같은 URL이 생성됩니다:
- **Production URL**: `https://your-project-name.vercel.app`
- **Deployment URL**: `https://your-project-name-hash.vercel.app`

---

## 3. 배포 후 확인 사항

### 3-1. 기본 동작 확인

1. **메인 페이지 접속**
   ```
   https://your-project-name.vercel.app
   ```
   - ✅ 페이지가 정상적으로 로드되는가?
   - ✅ "클린릉" 제목이 표시되는가?
   - ✅ 버튼들이 작동하는가?

2. **분류 페이지 접속**
   ```
   https://your-project-name.vercel.app/classify
   ```
   - ✅ 이미지 업로드 UI가 표시되는가?
   - ✅ 카메라/파일 선택 버튼이 작동하는가?

3. **배출 일정 페이지**
   ```
   https://your-project-name.vercel.app/schedule
   ```
   - ✅ 일정이 정상적으로 표시되는가?

### 3-2. API 동작 확인

1. **분류 페이지에서 이미지 업로드**
   - 테스트 이미지 업로드
   - AI 분석 진행 확인
   - 결과 표시 확인

2. **에러 확인**
   - Vercel 대시보드 → 프로젝트 → "Logs" 탭
   - 에러 로그가 있는지 확인

### 3-3. Google Sheets 연동 확인

1. 분류 테스트 실행
2. Google Sheets에서 확인:
   - `waste_logs` 시트에 새 기록 추가되었는가?
   - `points` 시트에 포인트 적립 기록이 있는가?
   - `users` 시트에서 포인트가 업데이트되었는가?

---

## 4. 환경 변수 업데이트 (배포 후)

배포가 완료되면 `NEXT_PUBLIC_APP_URL`을 실제 URL로 업데이트하세요:

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Environment Variables"
3. `NEXT_PUBLIC_APP_URL` 편집
4. 값을 실제 배포 URL로 변경: `https://your-actual-url.vercel.app`
5. "Save" 클릭
6. "Redeploy" 필요 (자동으로 재배포됨)

---

## 5. 커스텀 도메인 설정 (선택사항)

### 5-1. 도메인 구매

- Vercel에서 직접 구매 가능
- 또는 외부 도메인 사용 (예: `cleanneung.kr`)

### 5-2. 도메인 연결

1. Vercel 대시보드 → 프로젝트 → "Settings" → "Domains"
2. "Add Domain" 클릭
3. 도메인 입력 (예: `cleanneung.kr`)
4. DNS 설정 안내에 따라 설정
5. 설정 완료 후 HTTPS 자동 적용 (Let's Encrypt)

---

## 6. 자동 배포 설정

GitHub와 연동된 경우 자동 배포가 설정됩니다:

### 6-1. 자동 배포 트리거

- `main` 브랜치에 push → 자동 배포
- Pull Request 생성 → 미리보기 배포

### 6-2. 배포 확인

```bash
# 로컬에서 변경사항 커밋 및 푸시
git add .
git commit -m "Update feature"
git push origin main

# Vercel에서 자동으로 배포 시작
# 이메일 또는 Vercel 대시보드에서 배포 상태 확인
```

---

## 7. 문제 해결

### 7-1. 빌드 에러

**증상**: 배포 중 빌드 실패

**해결 방법**:
1. Vercel 대시보드에서 "Deployment" → 실패한 배포 클릭
2. "Build Logs" 확인
3. 로컬에서 `npm run build` 실행하여 동일한 에러 재현
4. 에러 수정 후 다시 push

### 7-2. 환경 변수 에러

**증상**: API 호출 실패, "환경 변수가 설정되지 않았습니다" 에러

**해결 방법**:
1. Vercel 대시보드 → "Settings" → "Environment Variables"
2. 모든 변수가 올바르게 입력되었는지 확인
3. `GOOGLE_PRIVATE_KEY`의 경우 전체 내용이 복사되었는지 확인
4. 변경 후 "Redeploy" 필요

### 7-3. Google Sheets API 에러

**증상**: 403 Forbidden 또는 401 Unauthorized

**해결 방법**:
1. Service Account 이메일이 정확한지 확인
2. Google Sheets가 Service Account와 공유되었는지 확인
3. Google Cloud Console에서 Sheets API가 활성화되었는지 확인

### 7-4. Claude API 에러

**증상**: AI 분석 실패

**해결 방법**:
1. API 키가 유효한지 확인
2. Anthropic Console에서 사용량 확인
3. 모델명이 정확한지 확인 (`claude-sonnet-4-20250514`)

---

## 8. 모니터링

### 8-1. Vercel Analytics

1. Vercel 대시보드 → 프로젝트 → "Analytics"
2. 페이지 뷰, 사용자 수, 성능 지표 확인

### 8-2. 로그 확인

1. Vercel 대시보드 → 프로젝트 → "Logs"
2. Real-time 로그 확인
3. 필터링 가능 (Error, Warning, Info 등)

---

## 9. 성능 최적화 (선택사항)

### 9-1. 이미지 최적화

- Next.js Image 컴포넌트 사용 (이미 적용됨)
- Vercel CDN 자동 활용

### 9-2. 캐싱

- Static 페이지 자동 캐싱
- API 라우트는 기본적으로 동적

### 9-3. Edge Functions (고급)

- 필요시 Edge Runtime 설정 가능

---

## 10. 배포 체크리스트

배포 전 확인사항:

- [ ] 로컬에서 `npm run build` 성공
- [ ] 환경 변수 파일(.env.local) 준비됨
- [ ] GitHub 저장소 생성 완료
- [ ] .gitignore 확인 (.env.local이 포함되어 있음)
- [ ] Git 커밋 및 푸시 완료

배포 중 확인사항:

- [ ] Vercel 계정 생성/로그인
- [ ] GitHub 저장소 Import
- [ ] 모든 환경 변수 입력 완료
- [ ] 배포 성공 확인

배포 후 확인사항:

- [ ] 메인 페이지 로드 확인
- [ ] 분류 페이지 동작 확인
- [ ] 실제 이미지로 AI 분석 테스트
- [ ] Google Sheets 연동 확인
- [ ] 에러 로그 확인

---

## 배포 완료! 🎉

배포가 완료되면:

1. **배포 URL 공유**
   ```
   https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app
   ```

2. **README 업데이트** ✅
   - 배포 URL 추가 완료
   - 데모 링크 추가 완료

3. **테스트 진행** ✅
   - 홈페이지: 정상 작동
   - 포인트 페이지: 정상 작동
   - 마이페이지: 정상 작동
   - 배출 일정: 정상 작동
   - 모바일 네비게이션: 정상 작동

4. **다음 단계** (우선순위 1)
   - NextAuth.js 인증 시스템 추가 (진행 예정)
   - 이미지 업로드 UI 완성
   - 커스텀 도메인 연결 (cleanneung.kr)
   - Google Analytics 설정
   - Sentry 에러 모니터링
