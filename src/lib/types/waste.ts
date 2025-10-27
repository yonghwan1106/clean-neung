export interface WasteLog {
  id: string;
  user_id: string;
  image_url?: string;
  detected_item: string;
  category: string;
  disposal_method: string;
  disposal_day: string;
  confidence: number;
  ai_response: string; // JSON string
  points_earned: number;
  created_at: string;
}

export interface WasteCategory {
  id: string;
  item_name: string;
  category: string;
  disposal_method: string;
  disposal_days: string[]; // JSON array
  special_notes?: string;
  keywords?: string;
  created_at: string;
}

export interface ClassificationResult {
  detected_item: string;
  category: string;
  disposal_method: string;
  disposal_days: string[];
  confidence: number;
  special_notes?: string;
  next_disposal_date?: string;
}

export interface Point {
  id: string;
  user_id: string;
  type: 'earn' | 'use';
  amount: number;
  reason: string;
  related_id?: string;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  image_url: string;
  location_address: string;
  latitude: number;
  longitude: number;
  description?: string;
  status: 'pending' | 'processing' | 'resolved';
  admin_note?: string;
  created_at: string;
  resolved_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  notification_type: 'disposal_reminder' | 'point_earned';
  enabled: boolean;
  schedule_time?: string;
  created_at: string;
  updated_at: string;
}
