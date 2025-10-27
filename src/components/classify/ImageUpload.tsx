'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onReset?: () => void;
  selectedImage?: File | null;
}

export function ImageUpload({ onImageSelect, onReset, selectedImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 파일 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('이미지 크기는 10MB 이하여야 합니다.');
        return;
      }

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 부모 컴포넌트에 전달
      onImageSelect(file);
    }
  };

  const handleReset = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    onReset?.();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {preview ? (
          // 이미지 미리보기
          <div className="space-y-4">
            <div className="relative">
              <img
                src={preview}
                alt="미리보기"
                className="w-full h-auto max-h-96 object-contain rounded-lg border-2 border-gray-200"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 text-center">
              선택된 이미지를 변경하려면 X 버튼을 클릭하세요
            </p>
          </div>
        ) : (
          // 업로드 영역
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-center p-8">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  쓰레기 사진을 업로드하세요
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  사진을 촬영하거나 파일을 선택해주세요
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleCameraClick}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    사진 촬영
                  </Button>
                  <Button
                    onClick={handleFileClick}
                    variant="outline"
                    size="lg"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    파일 선택
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>✓ 지원 형식: JPEG, PNG, WEBP</p>
              <p>✓ 최대 크기: 10MB</p>
              <p>💡 물품을 명확하게 촬영하면 더 정확한 결과를 얻을 수 있어요</p>
            </div>
          </div>
        )}

        {/* Hidden inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />
      </CardContent>
    </Card>
  );
}
