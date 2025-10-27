import { NextRequest, NextResponse } from 'next/server';
import { classifyWasteImage } from '@/lib/api/claude';
import { createWasteLog, createPointLog, getUserById, updateUserPoints } from '@/lib/api/sheets';
import { getNextDisposalDate } from '@/lib/constants/schedules';
import { POINTS } from '@/lib/constants/wasteCategories';
import type { ApiResponse, ClassifyResponse } from '@/lib/types/api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const userId = formData.get('userId') as string;

    // 입력 검증
    if (!image || !userId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '이미지와 사용자 ID가 필요합니다.',
        },
      }, { status: 400 });
    }

    // 이미지 검증
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (image.size > maxSize) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: {
          code: 'FILE_TOO_LARGE',
          message: '이미지 크기는 10MB 이하여야 합니다.',
        },
      }, { status: 400 });
    }

    // 사용자 확인
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: '사용자를 찾을 수 없습니다.',
        },
      }, { status: 404 });
    }

    // 이미지를 Base64로 변환
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    // Claude AI로 이미지 분류
    const classification = await classifyWasteImage(base64Image);

    // 다음 배출일 계산
    const nextDisposalDate = getNextDisposalDate(classification.disposal_days);

    // 쓰레기 분류 기록 저장
    const logId = await createWasteLog({
      user_id: userId,
      detected_item: classification.detected_item,
      category: classification.category,
      disposal_method: classification.disposal_method,
      disposal_day: classification.disposal_days.join(', '),
      confidence: classification.confidence,
      ai_response: JSON.stringify(classification),
      points_earned: POINTS.CLASSIFY,
    });

    // 포인트 적립
    await createPointLog({
      user_id: userId,
      type: 'earn',
      amount: POINTS.CLASSIFY,
      reason: '쓰레기 분류',
      related_id: logId,
    });

    // 사용자 총 포인트 업데이트
    const newTotalPoints = user.total_points + POINTS.CLASSIFY;
    await updateUserPoints(userId, newTotalPoints);

    // 응답
    const response: ClassifyResponse = {
      logId,
      detected_item: classification.detected_item,
      category: classification.category,
      disposal_method: classification.disposal_method,
      disposal_days: classification.disposal_days,
      confidence: classification.confidence,
      special_notes: classification.special_notes,
      points_earned: POINTS.CLASSIFY,
      next_disposal_date: nextDisposalDate,
    };

    return NextResponse.json<ApiResponse<ClassifyResponse>>({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error('Classification API error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: {
        code: 'AI_ANALYSIS_FAILED',
        message: error instanceof Error ? error.message : '이미지 분석에 실패했습니다. 다시 시도해주세요.',
      },
    }, { status: 500 });
  }
}
