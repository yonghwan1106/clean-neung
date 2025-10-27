import { google } from 'googleapis';

// 환경 변수 로드
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.error('GOOGLE_PRIVATE_KEY:', !!GOOGLE_PRIVATE_KEY);
  console.error('GOOGLE_SHEET_ID:', !!GOOGLE_SHEET_ID);
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

// 시트 정의
const SHEET_DEFINITIONS = [
  {
    title: 'users',
    headers: [
      'id',
      'name',
      'email',
      'phone',
      'address',
      'address_detail',
      'latitude',
      'longitude',
      'total_points',
      'language',
      'push_enabled',
      'created_at',
      'updated_at',
    ],
  },
  {
    title: 'waste_logs',
    headers: [
      'id',
      'user_id',
      'image_url',
      'detected_item',
      'category',
      'disposal_method',
      'disposal_day',
      'confidence',
      'ai_response',
      'points_earned',
      'created_at',
    ],
  },
  {
    title: 'points',
    headers: [
      'id',
      'user_id',
      'type',
      'amount',
      'reason',
      'related_id',
      'created_at',
    ],
  },
  {
    title: 'waste_categories',
    headers: [
      'id',
      'item_name',
      'category',
      'disposal_method',
      'disposal_days',
      'special_notes',
      'keywords',
      'created_at',
    ],
  },
  {
    title: 'notifications',
    headers: [
      'id',
      'user_id',
      'notification_type',
      'enabled',
      'schedule_time',
      'created_at',
      'updated_at',
    ],
  },
  {
    title: 'reports',
    headers: [
      'id',
      'user_id',
      'image_url',
      'location_address',
      'latitude',
      'longitude',
      'description',
      'status',
      'admin_note',
      'created_at',
      'resolved_at',
    ],
  },
];

async function setupSheets() {
  console.log('🚀 Google Sheets 설정을 시작합니다...\n');

  try {
    // 1. 기존 시트 목록 가져오기
    console.log('📋 기존 시트 확인 중...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID,
    });

    const existingSheets = spreadsheet.data.sheets?.map(
      (sheet) => sheet.properties?.title
    ) || [];
    console.log('기존 시트:', existingSheets.join(', ') || '없음\n');

    // 2. 필요한 시트 생성
    const requests = [];

    for (const sheetDef of SHEET_DEFINITIONS) {
      if (!existingSheets.includes(sheetDef.title)) {
        console.log(`✨ "${sheetDef.title}" 시트 생성 중...`);
        requests.push({
          addSheet: {
            properties: {
              title: sheetDef.title,
            },
          },
        });
      } else {
        console.log(`⏭️  "${sheetDef.title}" 시트가 이미 존재합니다.`);
      }
    }

    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEET_ID,
        requestBody: {
          requests,
        },
      });
      console.log(`\n✅ ${requests.length}개의 새 시트가 생성되었습니다.\n`);
    }

    // 3. 각 시트에 헤더 추가
    console.log('📝 헤더 추가 중...\n');

    for (const sheetDef of SHEET_DEFINITIONS) {
      console.log(`  → "${sheetDef.title}" 시트에 헤더 추가...`);

      // 기존 데이터 확인
      const existingData = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${sheetDef.title}!A1:Z1`,
      });

      if (existingData.data.values && existingData.data.values.length > 0) {
        console.log(`    ⏭️  이미 헤더가 존재합니다.`);
        continue;
      }

      // 헤더 추가
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${sheetDef.title}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [sheetDef.headers],
        },
      });

      console.log(`    ✅ 헤더 추가 완료 (${sheetDef.headers.length}개 컬럼)`);
    }

    console.log('\n🎉 Google Sheets 설정이 완료되었습니다!\n');
    console.log('📊 생성된 시트:');
    SHEET_DEFINITIONS.forEach((def, index) => {
      console.log(`   ${index + 1}. ${def.title} (${def.headers.length}개 컬럼)`);
    });

    console.log('\n🔗 스프레드시트 확인:');
    console.log(`   https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`);

  } catch (error) {
    console.error('\n❌ 오류 발생:', error);
    if (error instanceof Error) {
      console.error('메시지:', error.message);
      if ('code' in error) {
        console.error('코드:', (error as any).code);
      }
    }
    process.exit(1);
  }
}

// 실행
setupSheets();
