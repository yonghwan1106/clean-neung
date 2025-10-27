export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string; // 동 단위
  address_detail?: string;
  latitude?: number;
  longitude?: number;
  total_points: number;
  language: 'ko' | 'en' | 'zh' | 'ja';
  push_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address: string;
  address_detail?: string;
  language?: 'ko' | 'en' | 'zh' | 'ja';
  push_enabled?: boolean;
}
