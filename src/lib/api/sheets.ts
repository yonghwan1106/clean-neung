import { google } from 'googleapis';
import type { User, CreateUserInput } from '@/lib/types/user';
import type { WasteLog, Point } from '@/lib/types/waste';

// Google Sheets 인증
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Sheet 이름
const SHEETS = {
  USERS: 'users',
  WASTE_LOGS: 'waste_logs',
  POINTS: 'points',
  WASTE_CATEGORIES: 'waste_categories',
  NOTIFICATIONS: 'notifications',
  REPORTS: 'reports',
};

// ===== Users =====

export async function createUser(userData: CreateUserInput & { id: string; passwordHash: string }): Promise<void> {
  const now = new Date().toISOString();
  const values = [[
    userData.id,
    userData.name,
    userData.email,
    userData.passwordHash, // 해시된 비밀번호
    userData.phone || '',
    userData.address,
    userData.address_detail || '',
    '', // latitude
    '', // longitude
    0, // total_points
    userData.language || 'ko',
    userData.push_enabled !== false ? 'TRUE' : 'FALSE',
    now,
    now,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.USERS}!A:N`, // 확장: password_hash 포함
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.USERS}!A:N`, // 확장: password_hash 포함
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) return null;

  // 첫 번째 행은 헤더이므로 제외
  const userRow = rows.slice(1).find(row => row[2] === email);
  if (!userRow) return null;

  return parseUserRow(userRow);
}

export async function getUserById(userId: string): Promise<User | null> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.USERS}!A:N`, // 확장: password_hash 포함
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) return null;

  const userRow = rows.slice(1).find(row => row[0] === userId);
  if (!userRow) return null;

  return parseUserRow(userRow);
}

export async function updateUserPoints(userId: string, points: number): Promise<void> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.USERS}!A:M`,
  });

  const rows = response.data.values;
  if (!rows) throw new Error('No data found');

  const userRowIndex = rows.findIndex(row => row[0] === userId);
  if (userRowIndex === -1) throw new Error('User not found');

  // 포인트 컬럼은 I (9번째, 0-based index 8)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.USERS}!I${userRowIndex + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[points]],
    },
  });
}

function parseUserRow(row: any[]): User {
  return {
    id: row[0],
    name: row[1],
    email: row[2],
    password_hash: row[3] || '', // 해시된 비밀번호
    phone: row[4] || undefined,
    address: row[5],
    address_detail: row[6] || undefined,
    latitude: row[7] ? parseFloat(row[7]) : undefined,
    longitude: row[8] ? parseFloat(row[8]) : undefined,
    total_points: parseInt(row[9]) || 0,
    language: row[10] as 'ko' | 'en' | 'zh' | 'ja',
    push_enabled: row[11] === 'TRUE',
    created_at: row[12],
    updated_at: row[13],
  };
}

// ===== Waste Logs =====

export async function createWasteLog(logData: Omit<WasteLog, 'id' | 'created_at'>): Promise<string> {
  const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();

  const values = [[
    id,
    logData.user_id,
    logData.image_url || '',
    logData.detected_item,
    logData.category,
    logData.disposal_method,
    logData.disposal_day,
    logData.confidence,
    logData.ai_response,
    logData.points_earned,
    now,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.WASTE_LOGS}!A:K`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });

  return id;
}

export async function getWasteLogsByUserId(userId: string, limit: number = 10): Promise<WasteLog[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.WASTE_LOGS}!A:K`,
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) return [];

  const userLogs = rows.slice(1)
    .filter(row => row[1] === userId)
    .map(parseWasteLogRow)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);

  return userLogs;
}

function parseWasteLogRow(row: any[]): WasteLog {
  return {
    id: row[0],
    user_id: row[1],
    image_url: row[2] || undefined,
    detected_item: row[3],
    category: row[4],
    disposal_method: row[5],
    disposal_day: row[6],
    confidence: parseFloat(row[7]),
    ai_response: row[8],
    points_earned: parseInt(row[9]),
    created_at: row[10],
  };
}

// ===== Points =====

export async function createPointLog(pointData: Omit<Point, 'id' | 'created_at'>): Promise<void> {
  const id = `pt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();

  const values = [[
    id,
    pointData.user_id,
    pointData.type,
    pointData.amount,
    pointData.reason,
    pointData.related_id || '',
    now,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.POINTS}!A:G`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

export async function getPointsByUserId(userId: string, limit: number = 10): Promise<Point[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.POINTS}!A:G`,
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) return [];

  const userPoints = rows.slice(1)
    .filter(row => row[1] === userId)
    .map(parsePointRow)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);

  return userPoints;
}

function parsePointRow(row: any[]): Point {
  return {
    id: row[0],
    user_id: row[1],
    type: row[2] as 'earn' | 'use',
    amount: parseInt(row[3]),
    reason: row[4],
    related_id: row[5] || undefined,
    created_at: row[6],
  };
}
