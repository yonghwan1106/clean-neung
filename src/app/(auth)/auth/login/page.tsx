'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (result?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">클린릉 로그인</CardTitle>
          <CardDescription className="text-center">
            계정에 로그인하여 쓰레기 분류를 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 데모 계정 안내 */}
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <AlertDescription className="text-sm text-blue-900">
              <div className="font-semibold mb-1">🎯 데모 계정으로 테스트하기</div>
              <div className="space-y-1 text-xs">
                <div>이메일: <code className="bg-blue-100 px-1 py-0.5 rounded">demo@cleanneung.kr</code></div>
                <div>비밀번호: <code className="bg-blue-100 px-1 py-0.5 rounded">demo1234</code></div>
              </div>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">또는</span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">계정이 없으신가요? </span>
              <Link href="/auth/signup" className="text-green-600 hover:underline font-medium">
                회원가입
              </Link>
            </div>

            <div className="text-center text-sm">
              <Link href="/" className="text-gray-600 hover:underline">
                ← 홈으로 돌아가기
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
