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
    const recentLogs = await getWasteLogsByUserId(userId, 5);

    // 통계 계산
    const allLogs = await getWasteLogsByUserId(userId, 1000);

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisMonthLogs = allLogs.filter((log) => {
      const logDate = new Date(log.created_at);
      return logDate >= thisMonthStart;
    });

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
