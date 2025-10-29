import { NextRequest, NextResponse } from 'next/server';
import { getUserById, getWasteLogsByUserId } from '@/lib/api/sheets';
import type { ApiResponse } from '@/lib/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    // 사용자 정보 가져오기
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

    // 최근 분류 기록 가져오기
    let recentLogs = await getWasteLogsByUserId(userId, 5);

    // 통계 계산
    let allLogs = await getWasteLogsByUserId(userId, 1000);

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let thisMonthLogs = allLogs.filter((log) => {
      const logDate = new Date(log.created_at);
      return logDate >= thisMonthStart;
    });

    // 데모 계정인 경우 샘플 데이터 제공
    if (userId === 'usr_demo_001') {
      const demoLogs = [
        {
          id: 'log_demo_001',
          user_id: 'usr_demo_001',
          detected_item: '페트병',
          category: '재활용 (플라스틱)',
          confidence: 95,
          disposal_method: '라벨 제거 후 배출',
          disposal_day: '월요일, 수요일',
          ai_response: 'Claude AI',
          points_earned: 10,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'log_demo_002',
          user_id: 'usr_demo_001',
          detected_item: '종이박스',
          category: '재활용 (종이)',
          confidence: 92,
          disposal_method: '테이프 제거 후 접어서 배출',
          disposal_day: '월요일, 수요일',
          ai_response: 'Claude AI',
          points_earned: 10,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'log_demo_003',
          user_id: 'usr_demo_001',
          detected_item: '캔',
          category: '재활용 (캔)',
          confidence: 98,
          disposal_method: '물로 헹군 후 배출',
          disposal_day: '월요일, 수요일',
          ai_response: 'Naver Clova',
          points_earned: 10,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'log_demo_004',
          user_id: 'usr_demo_001',
          detected_item: '플라스틱 용기',
          category: '재활용 (플라스틱)',
          confidence: 88,
          disposal_method: '깨끗이 씻어서 배출',
          disposal_day: '월요일, 수요일',
          ai_response: 'Claude AI',
          points_earned: 10,
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'log_demo_005',
          user_id: 'usr_demo_001',
          detected_item: '유리병',
          category: '재활용 (유리)',
          confidence: 94,
          disposal_method: '뚜껑 제거 후 배출',
          disposal_day: '월요일, 수요일',
          ai_response: 'Naver Clova',
          points_earned: 10,
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      recentLogs = demoLogs.slice(0, 5);
      allLogs = [...demoLogs, ...Array(20).fill(null).map((_, i) => ({
        ...demoLogs[i % demoLogs.length],
        id: `log_demo_${100 + i}`,
        created_at: new Date(Date.now() - (20 + i) * 24 * 60 * 60 * 1000).toISOString(),
      }))];

      thisMonthLogs = allLogs.filter((log) => {
        const logDate = new Date(log.created_at);
        return logDate >= thisMonthStart;
      });
    }

    const stats = {
      totalClassifications: allLogs.length,
      thisMonthClassifications: thisMonthLogs.length,
      totalPoints: user.total_points,
    };

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        user,
        recent_logs: recentLogs,
        stats,
      },
    });

  } catch (error) {
    console.error('User API error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : '사용자 정보를 불러오는데 실패했습니다.',
      },
    }, { status: 500 });
  }
}
