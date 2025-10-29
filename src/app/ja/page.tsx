'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera, Calendar, Gift, MapPin, Recycle,
  Users, ArrowRight, FileText, Phone,
  Leaf, Globe, Award, LogIn, UserPlus, User, LogOut, ChevronRight,
  Building2, TrendingUp, Clock
} from "lucide-react";

export default function JapaneseHome() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Link href="/" className="text-blue-200 hover:text-white">KOR</Link>
              <span className="text-blue-200">|</span>
              <Link href="/en" className="text-blue-200 hover:text-white">ENG</Link>
              <span className="text-blue-200">|</span>
              <Link href="/zh" className="text-blue-200 hover:text-white">CHN</Link>
              <span className="text-blue-200">|</span>
              <span className="flex items-center gap-1 font-bold">
                <Globe className="h-3 w-3" />
                JPN
              </span>
            </div>
            <div className="flex gap-4 items-center">
              {session ? (
                <>
                  <span className="text-blue-200">{session.user?.name}様</span>
                  <Link href="/mypage" className="hover:text-blue-200 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    マイページ
                  </Link>
                  <button onClick={handleLogout} className="hover:text-blue-200 flex items-center gap-1">
                    <LogOut className="h-3 w-3" />
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="hover:text-blue-200 flex items-center gap-1">
                    <LogIn className="h-3 w-3" />
                    ログイン
                  </Link>
                  <Link href="/auth/signup" className="hover:text-blue-200 flex items-center gap-1">
                    <UserPlus className="h-3 w-3" />
                    会員登録
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/ja" className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Clean-Neung</h1>
                  <p className="text-sm text-gray-600">江陵市スマートごみ分別プラットフォーム</p>
                </div>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">お問い合わせ</p>
                <p className="text-lg font-bold text-blue-600">033-640-5000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex">
                <Link href="/classify" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Camera className="h-4 w-4" />
                  AI分類
                </Link>
                <Link href="/schedule" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4" />
                  収集日程
                </Link>
                <Link href="/points" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Gift className="h-4 w-4" />
                  ポイント
                </Link>
                <Link href="/mypage" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <User className="h-4 w-4" />
                  マイページ
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                江陵市公式AIプラットフォーム
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                写真1枚で<br />
                ごみ分別
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Claude AIとNaver Clovaが自動的にごみを分類し<br />
                正しい処分方法をご案内します
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-bold" asChild>
                  <Link href="/classify">
                    <Camera className="mr-2 h-5 w-5" />
                    今すぐ始める
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-bold backdrop-blur-sm" asChild>
                  <Link href="/schedule" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    日程を見る
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Recycle className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">本日の分類</p>
                        <p className="text-3xl font-bold text-gray-900">567件</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">アクティブユーザー</p>
                        <p className="text-3xl font-bold text-gray-900">1,234人</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Award className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">獲得ポイント</p>
                        <p className="text-3xl font-bold text-gray-900">12,340P</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              カスタマイズされたサービス
            </h2>
            <p className="text-lg text-gray-600">
              市民と観光客のためのスマートごみ分別サービス
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Citizens */}
            <Card className="hover:shadow-xl transition-all border-t-4 border-blue-600">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <Badge variant="secondary">市民</Badge>
                </div>
                <CardTitle className="text-2xl">市民サービス</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/classify">AIごみ分類</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/schedule">収集日程確認</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/points">ポイント獲得</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>不法投棄通報</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tourists */}
            <Card className="hover:shadow-xl transition-all border-t-4 border-green-600">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <Badge variant="secondary">観光客</Badge>
                </div>
                <CardTitle className="text-2xl">観光客サービス</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>4か国語サポート</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>ごみ箱位置案内</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>分別ガイド</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>観光情報</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Admin */}
            <Card className="hover:shadow-xl transition-all border-t-4 border-purple-600">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Building2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <Badge variant="secondary">管理者</Badge>
                </div>
                <CardTitle className="text-2xl">管理者サービス</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin">ダッシュボード</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/reports">通報管理</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/locations">ごみ箱管理</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/users">ユーザー管理</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-white">Clean-Neung</h3>
              </div>
              <p className="text-sm text-gray-400">
                江陵市公式AI<br />
                スマートごみ分別プラットフォーム
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">主なサービス</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/classify" className="hover:text-white">AIごみ分類</Link></li>
                <li><Link href="/schedule" className="hover:text-white">収集日程</Link></li>
                <li><Link href="/points" className="hover:text-white">ポイント獲得</Link></li>
                <li><Link href="/mypage" className="hover:text-white">マイページ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">サポート</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">お知らせ</li>
                <li className="hover:text-white cursor-pointer">利用ガイド</li>
                <li className="hover:text-white cursor-pointer">よくある質問</li>
                <li className="hover:text-white cursor-pointer">お問い合わせ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">連絡先</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  033-640-5000
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  平日 09:00 - 18:00
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  江陵市庁環境課
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 江陵市庁. All rights reserved.</p>
            <p className="mt-2">このプラットフォームは江陵市の環境改善のために運営されています。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
