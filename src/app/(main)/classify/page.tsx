'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageUpload } from '@/components/classify/ImageUpload';
import { ClassificationResult } from '@/components/classify/ClassificationResult';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ClassifyResponse } from '@/lib/types/api';

type PageState = 'upload' | 'loading' | 'result' | 'error';

export default function ClassifyPage() {
  const [state, setState] = useState<PageState>('upload');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 테스트용 User ID (실제로는 인증 시스템에서 가져와야 함)
  const TEST_USER_ID = 'usr_test_001';

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = async () => {
    if (!selectedImage) return;

    setState('loading');
    setError(null);

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('userId', TEST_USER_ID);

      // API 호출
      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || '분류에 실패했습니다.');
      }

      setResult(data.data);
      setState('result');
    } catch (err) {
      console.error('Classification error:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('upload');
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 페이지 제목 with Image */}
        <div className="mb-8 bg-white border-l-4 border-blue-600 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=400&fit=crop"
              alt="AI 쓰레기 분류"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            <div className="absolute inset-0 flex items-center px-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  AI 쓰레기 분류
                </h1>
                <p className="text-lg text-white/90">
                  사진을 업로드하면 AI가 자동으로 쓰레기를 분류하고 배출 방법을 안내합니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 상태별 렌더링 */}
        {state === 'upload' && (
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              onReset={handleReset}
              selectedImage={selectedImage}
            />
            {selectedImage && (
              <Button
                onClick={handleClassify}
                className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg"
                size="lg"
              >
                🤖 AI 분류 시작하기
              </Button>
            )}
          </div>
        )}

        {state === 'loading' && <LoadingSpinner />}

        {state === 'result' && result && (
          <ClassificationResult
            result={result}
            imagePreview={imagePreview || undefined}
            onReset={handleReset}
          />
        )}

        {state === 'error' && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">오류 발생</CardTitle>
              <CardDescription className="text-red-700">
                {error || '알 수 없는 오류가 발생했습니다.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleReset} variant="outline" className="w-full">
                다시 시도하기
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 안내 정보 */}
        {state === 'upload' && !selectedImage && (
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <span>💡</span> 사용 방법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-900">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <p>📸 쓰레기 사진을 촬영하거나 파일을 선택하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <p>🤖 AI가 자동으로 쓰레기를 분석합니다</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <p>📋 분류 결과와 배출 방법을 확인하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <p>🎁 올바른 분류로 포인트를 적립하세요</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
