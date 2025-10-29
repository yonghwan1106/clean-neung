import { NextRequest, NextResponse } from 'next/server';
import { getPointsByUserId, getUserById } from '@/lib/api/sheets';
import type { ApiResponse } from '@/lib/types/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'User ID가 필요합니다.',
        },
      }, { status: 400 });
    }

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

    // 포인트 히스토리 가져오기
    let pointsHistory = await getPointsByUserId(userId, 10);

    // 데모 계정인 경우 샘플 데이터 제공
    if (userId === 'usr_demo_001') {
      pointsHistory = [
        {
          id: 'point_demo_001',
          user_id: 'usr_demo_001',
          amount: 10,
          type: 'earn' as const,
          reason: '쓰레기 분류',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'point_demo_002',
          user_id: 'usr_demo_001',
          amount: 10,
          type: 'earn' as const,
          reason: '쓰레기 분류',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'point_demo_003',
          user_id: 'usr_demo_001',
          amount: 20,
          type: 'earn' as const,
          reason: '연속 사용 보너스',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'point_demo_004',
          user_id: 'usr_demo_001',
          amount: 10,
          type: 'earn' as const,
          reason: '쓰레기 분류',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'point_demo_005',
          user_id: 'usr_demo_001',
          amount: 50,
          type: 'earn' as const,
          reason: '주간 챌린지',
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'point_demo_006',
          user_id: 'usr_demo_001',
          amount: 10,
          type: 'earn' as const,
          reason: '쓰레기 분류',
          created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'point_demo_007',
          user_id: 'usr_demo_001',
          amount: 20,
          type: 'earn' as const,
          reason: '불법 투기 신고',
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
    }

    // 이번 달 적립 포인트 계산
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisMonthPoints = pointsHistory.filter((point) => {
      const pointDate = new Date(point.created_at);
      return pointDate >= thisMonthStart && point.type === 'earn';
    });

    const thisMonthEarned = thisMonthPoints.reduce(
      (sum, point) => sum + point.amount,
      0
    );

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        userId: user.id,
        total_points: user.total_points,
        this_month_earned: thisMonthEarned,
        recent_history: pointsHistory,
      },
    });

  } catch (error) {
    console.error('Points API error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : '포인트 정보를 불러오는데 실패했습니다.',
      },
    }, { status: 500 });
  }
}
