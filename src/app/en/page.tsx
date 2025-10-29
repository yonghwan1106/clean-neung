'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera, Calendar, Gift, MapPin, Recycle,
  Users, ArrowRight, Bell, FileText, Phone,
  Leaf, Globe, Award, LogIn, UserPlus, User, LogOut, ChevronRight,
  Building2, TrendingUp, Clock
} from "lucide-react";

export default function EnglishHome() {
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
              <span className="flex items-center gap-1 font-bold">
                <Globe className="h-3 w-3" />
                ENG
              </span>
              <span className="text-blue-200">|</span>
              <Link href="/zh" className="text-blue-200 hover:text-white">CHN</Link>
              <span className="text-blue-200">|</span>
              <Link href="/ja" className="text-blue-200 hover:text-white">JPN</Link>
            </div>
            <div className="flex gap-4 items-center">
              {session ? (
                <>
                  <span className="text-blue-200">{session.user?.name}</span>
                  <Link href="/mypage" className="hover:text-blue-200 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    My Page
                  </Link>
                  <button onClick={handleLogout} className="hover:text-blue-200 flex items-center gap-1">
                    <LogOut className="h-3 w-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="hover:text-blue-200 flex items-center gap-1">
                    <LogIn className="h-3 w-3" />
                    Login
                  </Link>
                  <Link href="/auth/signup" className="hover:text-blue-200 flex items-center gap-1">
                    <UserPlus className="h-3 w-3" />
                    Sign Up
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
            <Link href="/en" className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Clean-Neung</h1>
                  <p className="text-sm text-gray-600">Gangneung Smart Waste Sorting Platform</p>
                </div>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Consultation</p>
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
                  AI Classify
                </Link>
                <Link href="/schedule" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Link>
                <Link href="/points" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Gift className="h-4 w-4" />
                  Points
                </Link>
                <Link href="/mypage" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <User className="h-4 w-4" />
                  My Page
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
                Official Gangneung AI Platform
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Classify Waste<br />
                with One Photo
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Claude AI and Naver Clova automatically classify waste<br />
                and guide you on proper disposal methods
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-bold" asChild>
                  <Link href="/classify">
                    <Camera className="mr-2 h-5 w-5" />
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-bold backdrop-blur-sm" asChild>
                  <Link href="/schedule" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    View Schedule
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
                        <p className="text-sm text-gray-600">Today's Classifications</p>
                        <p className="text-3xl font-bold text-gray-900">567</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-3xl font-bold text-gray-900">1,234</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Award className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Points Earned</p>
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
              Customized Services
            </h2>
            <p className="text-lg text-gray-600">
              Smart waste sorting services for citizens and tourists
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
                  <Badge variant="secondary">Citizens</Badge>
                </div>
                <CardTitle className="text-2xl">Citizen Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/classify">AI Waste Classification</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/schedule">Disposal Schedule</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/points">Earn Points</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>Report Illegal Dumping</span>
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
                  <Badge variant="secondary">Tourists</Badge>
                </div>
                <CardTitle className="text-2xl">Tourist Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>4 Languages Support</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>Bin Location Guide</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>Sorting Guide</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>Tourist Information</span>
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
                  <Badge variant="secondary">Admin</Badge>
                </div>
                <CardTitle className="text-2xl">Admin Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin">Dashboard</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/reports">Report Management</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/locations">Bin Management</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/users">User Management</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                      Announcements
                    </CardTitle>
                    <Button variant="ghost" size="sm">More +</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 pb-3 border-b hover:bg-gray-50 px-2 py-2 rounded cursor-pointer">
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 hover:text-blue-600">Clean-Neung Platform Official Launch</p>
                        <p className="text-xs text-gray-500 mt-1">2025-10-29</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 pb-3 border-b hover:bg-gray-50 px-2 py-2 rounded cursor-pointer">
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 hover:text-blue-600">AI Classification Accuracy Update</p>
                        <p className="text-xs text-gray-500 mt-1">2025-10-28</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 pb-3 border-b hover:bg-gray-50 px-2 py-2 rounded cursor-pointer">
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 hover:text-blue-600">Multi-language Service Launch</p>
                        <p className="text-xs text-gray-500 mt-1">2025-10-27</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      Sorting Statistics
                    </CardTitle>
                    <Badge variant="outline">Real-time</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Recyclable (Plastic)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{width: '32%'}}></div>
                        </div>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Recyclable (Paper)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 rounded-full" style={{width: '25%'}}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Food Waste</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-600 rounded-full" style={{width: '20%'}}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">General Waste</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-600 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-white">Clean-Neung</h3>
              </div>
              <p className="text-sm text-gray-400">
                Official AI-based<br />
                Smart Waste Sorting Platform
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Main Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/classify" className="hover:text-white">AI Classification</Link></li>
                <li><Link href="/schedule" className="hover:text-white">Disposal Schedule</Link></li>
                <li><Link href="/points" className="hover:text-white">Earn Points</Link></li>
                <li><Link href="/mypage" className="hover:text-white">My Page</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Announcements</li>
                <li className="hover:text-white cursor-pointer">User Guide</li>
                <li className="hover:text-white cursor-pointer">FAQ</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  033-640-5000
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Weekdays 09:00 - 18:00
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Gangneung City Hall
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Gangneung City Hall. All rights reserved.</p>
            <p className="mt-2">This platform is operated for environmental improvement in Gangneung City.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
