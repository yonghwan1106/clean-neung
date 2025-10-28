import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '@/lib/api/sheets';
import type { CreateUserInput } from '@/lib/types/user';
import type { ApiResponse } from '@/lib/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserInput = await request.json();

    // 유효성 검사
    if (!body.name || !body.email || !body.password || !body.address) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '필수 항목을 모두 입력해주세요.',
          },
        },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '비밀번호는 최소 6자 이상이어야 합니다.',
          },
        },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingUser = await getUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: {
            code: 'EMAIL_EXISTS',
            message: '이미 사용 중인 이메일입니다.',
          },
        },
        { status: 409 }
      );
    }

    // 비밀번호 해시화
    const passwordHash = await bcrypt.hash(body.password, 10);

    // 사용자 ID 생성
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 사용자 생성
    await createUser({
      ...body,
      id: userId,
      passwordHash,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          message: '회원가입이 완료되었습니다.',
          userId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message:
            error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
}
