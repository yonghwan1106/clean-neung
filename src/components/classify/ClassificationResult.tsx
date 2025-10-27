'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, MapPin, AlertCircle, Gift, Home } from 'lucide-react';
import type { ClassifyResponse } from '@/lib/types/api';
import Link from 'next/link';

interface ClassificationResultProps {
  result: ClassifyResponse;
  imagePreview?: string;
  onReset: () => void;
}

export function ClassificationResult({ result, imagePreview, onReset }: ClassificationResultProps) {
  return (
    <div className="space-y-6">
      {/* 이미지 미리보기 */}
      {imagePreview && (
        <Card>
          <CardContent className="p-4">
            <img
              src={imagePreview}
              alt="분류된 쓰레기"
              className="w-full h-auto max-h-64 object-contain rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {/* 분석 결과 요약 */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                분류 완료!
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                감지된 물품: <span className="font-semibold text-gray-900">{result.detected_item}</span>
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">AI 신뢰도</div>
              <div className="text-2xl font-bold text-green-600">{result.confidence}%</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-600">
                +{result.points_earned} 포인트 적립 완료!
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 분류 카테고리 */}
      <Card>
        <CardHeader>
          <CardTitle>분류 결과</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-lg font-bold text-blue-900">{result.category}</div>
          </div>
        </CardContent>
      </Card>

      {/* 배출 방법 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            배출 방법
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{result.disposal_method}</p>
          </div>
        </CardContent>
      </Card>

      {/* 배출 요일 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            배출 일정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-gray-600 mb-2">배출 가능 요일</div>
            <div className="flex flex-wrap gap-2">
              {result.disposal_days.map((day, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          {result.next_disposal_date && (
            <div>
              <div className="text-sm text-gray-600 mb-2">다음 배출일</div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold inline-block">
                {result.next_disposal_date}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Link href="/schedule">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                전체 배출 일정 보기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 특이사항 */}
      {result.special_notes && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <AlertCircle className="h-5 w-5" />
              특이사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-900">{result.special_notes}</p>
          </CardContent>
        </Card>
      )}

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onReset} className="flex-1 bg-green-600 hover:bg-green-700">
          다른 쓰레기 분류하기
        </Button>
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full">
            <Home className="mr-2 h-4 w-4" />
            홈으로
          </Button>
        </Link>
      </div>
    </div>
  );
}
