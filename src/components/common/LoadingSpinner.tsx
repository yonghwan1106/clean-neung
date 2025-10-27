'use client';

import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'AI가 이미지를 분석하고 있습니다...' }: LoadingSpinnerProps) {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600" />
          <p className="text-lg font-medium text-gray-700">{message}</p>
          <div className="text-sm text-gray-500 text-center space-y-1">
            <p>잠시만 기다려주세요</p>
            <p className="text-xs">보통 5초 이내에 완료됩니다</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
