import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-5xl font-bold text-green-600 mb-4">
            클린릉
          </h1>
          <p className="text-xl text-gray-600">
            AI 기반 강릉 스마트 분리수거 플랫폼
          </p>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">사진 한 장으로 쓰레기 분류하기</CardTitle>
              <CardDescription>
                쓰레기 사진을 찍으면 AI가 즉시 분리수거 방법을 알려드립니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-md aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">이미지 업로드 영역</p>
                </div>
                <Link href="/classify">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    분류 시작하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>AI 자동 인식</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Claude AI가 쓰레기 사진을 분석하여 정확한 분류 방법을 안내합니다
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>배출 일정 알림</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                강릉시 지역별 배출 일정을 자동으로 확인하고 알림을 받아보세요
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>포인트 적립</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                올바른 분리수거로 포인트를 적립하고 지역 상점에서 사용하세요
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-gray-600 mb-8">
            강릉시의 깨끗한 환경을 위해 함께해요
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/classify">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                쓰레기 분류하기
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" variant="outline">
                배출 일정 보기
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
