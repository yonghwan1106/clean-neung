import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function addDemoAccount() {
  try {
    // Google Sheets 설정
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    // 데모 계정 정보
    const demoUser = {
      id: 'usr_demo_001',
      name: '데모 사용자',
      email: 'demo@cleanneung.kr',
      password: 'demo1234',
      phone: '010-1234-5678',
      address: '강원특별자치도 강릉시 교동',
      address_detail: '클린릉 빌딩 101호',
      language: 'ko',
      total_points: 150,
      is_active: true,
    };

    // 비밀번호 해싱
    const passwordHash = await bcrypt.hash(demoUser.password, 10);

    // 현재 날짜 (ISO 형식)
    const now = new Date().toISOString();

    // 기존 데모 계정 확인
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'users!A:N',
    });

    const rows = response.data.values || [];
    const demoUserIndex = rows.findIndex((row) => row[0] === demoUser.id);

    if (demoUserIndex > 0) {
      // 이미 존재하면 업데이트
      console.log('데모 계정이 이미 존재합니다. 업데이트합니다...');
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `users!A${demoUserIndex + 1}:N${demoUserIndex + 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              demoUser.id,
              demoUser.name,
              demoUser.email,
              passwordHash,
              demoUser.phone,
              demoUser.address,
              demoUser.address_detail,
              '', // latitude
              '', // longitude
              demoUser.total_points,
              demoUser.language,
              'TRUE', // push_enabled
              now, // created_at
              now, // updated_at
            ],
          ],
        },
      });
    } else {
      // 없으면 새로 추가
      console.log('데모 계정을 추가합니다...');
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'users!A:N',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              demoUser.id,
              demoUser.name,
              demoUser.email,
              passwordHash,
              demoUser.phone,
              demoUser.address,
              demoUser.address_detail,
              '', // latitude
              '', // longitude
              demoUser.total_points,
              demoUser.language,
              'TRUE', // push_enabled
              now, // created_at
              now, // updated_at
            ],
          ],
        },
      });
    }

    console.log('✅ 데모 계정이 성공적으로 설정되었습니다!');
    console.log('\n📧 이메일: demo@cleanneung.kr');
    console.log('🔑 비밀번호: demo1234');
    console.log('\n로그인 페이지에서 위 계정으로 로그인하세요.');
  } catch (error) {
    console.error('❌ 데모 계정 생성 중 오류:', error);
    process.exit(1);
  }
}

addDemoAccount();
