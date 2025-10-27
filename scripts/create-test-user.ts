import { google } from 'googleapis';

// 환경 변수 로드
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

// Google Sheets API 인증
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// 테스트 사용자 데이터
const TEST_USERS = [
  {
    id: 'usr_test_001',
    name: '김강릉',
    email: 'test1@cleanneung.kr',
    phone: '010-1234-5678',
    address: '교동',
    address_detail: '123번길 45',
    latitude: 37.7519,
    longitude: 128.8761,
    total_points: 0,
    language: 'ko',
    push_enabled: 'TRUE',
  },
  {
    id: 'usr_test_002',
    name: '이관광',
    email: 'test2@cleanneung.kr',
    phone: '010-2345-6789',
    address: '포남동',
    address_detail: '경포로 365',
    latitude: 37.7956,
    longitude: 128.9078,
    total_points: 150,
    language: 'ko',
    push_enabled: 'TRUE',
  },
  {
    id: 'usr_test_003',
    name: 'Park Tourist',
    email: 'test3@cleanneung.kr',
    phone: '010-3456-7890',
    address: '안목동',
    address_detail: '커피거리 12',
    latitude: 37.7725,
    longitude: 128.9473,
    total_points: 50,
    language: 'en',
    push_enabled: 'TRUE',
  },
];

async function createTestUsers() {
  console.log('🚀 테스트 사용자 생성을 시작합니다...\n');

  try {
    // 기존 사용자 확인
    console.log('📋 기존 사용자 확인 중...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'users!A:A',
    });

    const existingIds = response.data.values?.slice(1).map(row => row[0]) || [];
    console.log(`기존 사용자 수: ${existingIds.length}\n`);

    // 테스트 사용자 생성
    let createdCount = 0;
    let skippedCount = 0;

    for (const user of TEST_USERS) {
      if (existingIds.includes(user.id)) {
        console.log(`⏭️  "${user.name}" (${user.id})는 이미 존재합니다.`);
        skippedCount++;
        continue;
      }

      const now = new Date().toISOString();
      const values = [[
        user.id,
        user.name,
        user.email,
        user.phone,
        user.address,
        user.address_detail,
        user.latitude,
        user.longitude,
        user.total_points,
        user.language,
        user.push_enabled,
        now,
        now,
      ]];

      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'users!A:M',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      console.log(`✅ "${user.name}" (${user.email}) 생성 완료`);
      console.log(`   📍 주소: ${user.address} ${user.address_detail}`);
      console.log(`   🎁 포인트: ${user.total_points}P`);
      console.log(`   🌍 언어: ${user.language}\n`);

      createdCount++;
    }

    console.log('═══════════════════════════════════════════════');
    console.log('🎉 테스트 사용자 생성 완료!\n');
    console.log(`📊 결과:`);
    console.log(`   ✨ 새로 생성: ${createdCount}명`);
    console.log(`   ⏭️  이미 존재: ${skippedCount}명`);
    console.log(`   📝 전체: ${existingIds.length + createdCount}명\n`);

    console.log('👤 생성된 테스트 계정:');
    TEST_USERS.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   이메일: ${user.email}`);
      console.log(`   User ID: ${user.id}`);
      console.log(`   주소: ${user.address}`);
      console.log(`   포인트: ${user.total_points}P`);
    });

    console.log('\n💡 사용 방법:');
    console.log('   분류 API 테스트 시 위의 User ID를 사용하세요.');
    console.log('   예: userId = "usr_test_001"\n');

    console.log('🔗 스프레드시트 확인:');
    console.log(`   https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit#gid=0`);

  } catch (error) {
    console.error('\n❌ 오류 발생:', error);
    if (error instanceof Error) {
      console.error('메시지:', error.message);
    }
    process.exit(1);
  }
}

// 실행
createTestUsers();
