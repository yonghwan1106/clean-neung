'use client';

import { useState } from 'react';
import { ImageUpload } from '@/components/classify/ImageUpload';
import { ClassificationResult } from '@/components/classify/ClassificationResult';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ClassifyResponse } from '@/lib/types/api';
import { fileToBase64 } from '@/lib/utils/image';

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-green-600 mb-2">쓰레기 분류</h1>
          <p className="text-gray-600">AI가 사진을 분석하여 분리수거 방법을 알려드립니다</p>
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
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                AI 분류 시작하기
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
              <CardTitle className="text-blue-900">사용 방법</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-900">
              <p>1. 📸 쓰레기 사진을 촬영하거나 파일을 선택하세요</p>
              <p>2. 🤖 AI가 자동으로 쓰레기를 분석합니다</p>
              <p>3. 📋 분류 결과와 배출 방법을 확인하세요</p>
              <p>4. 🎁 올바른 분류로 포인트를 적립하세요</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
