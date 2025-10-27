export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ClassifyRequest {
  image: File;
  userId: string;
}

export interface ClassifyResponse {
  logId: string;
  detected_item: string;
  category: string;
  disposal_method: string;
  disposal_days: string[];
  confidence: number;
  special_notes?: string;
  points_earned: number;
  next_disposal_date?: string;
}
