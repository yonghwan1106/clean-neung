# 데모 계정 정보

로그인 테스트를 위한 데모 계정입니다.

## 계정 정보
- **이메일**: demo@cleanneung.kr
- **비밀번호**: demo1234

## Google Sheets에 수동으로 추가하는 방법

1. Google Sheets를 엽니다
2. `Users` 시트로 이동
3. 새 행에 다음 데이터를 입력:

### 컬럼별 값:

| 컬럼 | 값 |
|------|---|
| A (id) | usr_demo_001 |
| B (name) | 데모 사용자 |
| C (email) | demo@cleanneung.kr |
| D (password_hash) | $2b$10$Aux3nZFondeoyH5Munc96ez6nVowPA6Aq8hZAuv2OIIThaEGK3TaO |
| E (phone) | 010-1234-5678 |
| F (address) | 강원특별자치도 강릉시 교동 |
| G (address_detail) | 클린릉 빌딩 101호 |
| H (language) | ko |
| I (total_points) | 150 |
| J (is_active) | TRUE |
| K (created_at) | 2025-01-28T00:00:00.000Z |
| L (updated_at) | 2025-01-28T00:00:00.000Z |
| M (last_login_at) | (비워두기) |
| N (fcm_token) | (비워두기) |

## 비밀번호 해시 생성

아래 스크립트를 실행하여 비밀번호 해시를 생성할 수 있습니다:

```bash
npm run setup-demo
```

또는 Node.js에서 직접:

```javascript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('demo1234', 10));
```

## API 통해 추가하기

프로젝트가 Vercel에 배포된 후, 다음 API를 사용하여 데모 계정을 생성할 수 있습니다:

```bash
curl -X POST https://your-domain.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "데모 사용자",
    "email": "demo@cleanneung.kr",
    "password": "demo1234",
    "phone": "010-1234-5678",
    "address": "강원특별자치도 강릉시 교동",
    "addressDetail": "클린릉 빌딩 101호",
    "language": "ko"
  }'
```

## 데모 계정 특징

- **포인트**: 150P (테스트용)
- **주소**: 강릉시 교동 (배출 일정 확인 가능)
- **언어**: 한국어
- **활성 상태**: 활성

## 로그인 페이지에 안내 추가

로그인 페이지 (`/auth/login`)에 데모 계정 정보를 표시하여 사용자가 쉽게 테스트할 수 있습니다.
