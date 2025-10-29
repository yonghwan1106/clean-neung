export type Language = 'ko' | 'en' | 'zh' | 'ja';

export interface Translations {
  common: {
    appName: string;
    login: string;
    logout: string;
    signup: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    loading: string;
  };
  nav: {
    classify: string;
    schedule: string;
    points: string;
    mypage: string;
  };
  classify: {
    title: string;
    uploadImage: string;
    dragDrop: string;
    analyzing: string;
    result: string;
    category: string;
    disposalMethod: string;
    disposalDays: string;
    confidence: string;
    specialNotes: string;
    pointsEarned: string;
    nextDisposalDate: string;
  };
  wasteCategories: {
    recyclablePaper: string;
    recyclablePlastic: string;
    recyclableGlass: string;
    recyclableCan: string;
    recyclableVinyl: string;
    general: string;
    food: string;
    large: string;
    hazardous: string;
  };
  schedule: {
    title: string;
    recyclables: string;
    general: string;
    food: string;
    large: string;
  };
  points: {
    title: string;
    totalPoints: string;
    pointsHistory: string;
    earnedPoints: string;
    usedPoints: string;
  };
  mypage: {
    title: string;
    profile: string;
    settings: string;
    language: string;
    theme: string;
  };
}

export const translations: Record<Language, Translations> = {
  ko: {
    common: {
      appName: '클린능 (Clean-Neung)',
      login: '로그인',
      logout: '로그아웃',
      signup: '회원가입',
      cancel: '취소',
      confirm: '확인',
      save: '저장',
      delete: '삭제',
      edit: '수정',
      back: '뒤로',
      next: '다음',
      loading: '로딩 중...',
    },
    nav: {
      classify: '분류하기',
      schedule: '배출일정',
      points: '포인트',
      mypage: '마이페이지',
    },
    classify: {
      title: '쓰레기 분류하기',
      uploadImage: '이미지 업로드',
      dragDrop: '이미지를 드래그하거나 클릭하여 업로드하세요',
      analyzing: '이미지 분석 중...',
      result: '분류 결과',
      category: '분류 카테고리',
      disposalMethod: '배출 방법',
      disposalDays: '배출 요일',
      confidence: '정확도',
      specialNotes: '특이사항',
      pointsEarned: '획득 포인트',
      nextDisposalDate: '다음 배출일',
    },
    wasteCategories: {
      recyclablePaper: '재활용 (종이)',
      recyclablePlastic: '재활용 (플라스틱)',
      recyclableGlass: '재활용 (유리)',
      recyclableCan: '재활용 (캔)',
      recyclableVinyl: '재활용 (비닐)',
      general: '종량제봉투',
      food: '음식물',
      large: '대형폐기물',
      hazardous: '특수폐기물',
    },
    schedule: {
      title: '배출 일정',
      recyclables: '재활용: 월요일, 목요일',
      general: '종량제봉투: 화요일, 금요일',
      food: '음식물: 매일 (오후 6시까지)',
      large: '대형폐기물: 별도 신고 필요',
    },
    points: {
      title: '포인트',
      totalPoints: '총 포인트',
      pointsHistory: '포인트 내역',
      earnedPoints: '적립',
      usedPoints: '사용',
    },
    mypage: {
      title: '마이페이지',
      profile: '프로필',
      settings: '설정',
      language: '언어',
      theme: '테마',
    },
  },
  en: {
    common: {
      appName: 'Clean-Neung',
      login: 'Login',
      logout: 'Logout',
      signup: 'Sign Up',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      loading: 'Loading...',
    },
    nav: {
      classify: 'Classify',
      schedule: 'Schedule',
      points: 'Points',
      mypage: 'My Page',
    },
    classify: {
      title: 'Waste Classification',
      uploadImage: 'Upload Image',
      dragDrop: 'Drag and drop or click to upload an image',
      analyzing: 'Analyzing image...',
      result: 'Classification Result',
      category: 'Category',
      disposalMethod: 'Disposal Method',
      disposalDays: 'Disposal Days',
      confidence: 'Confidence',
      specialNotes: 'Special Notes',
      pointsEarned: 'Points Earned',
      nextDisposalDate: 'Next Disposal Date',
    },
    wasteCategories: {
      recyclablePaper: 'Recyclable (Paper)',
      recyclablePlastic: 'Recyclable (Plastic)',
      recyclableGlass: 'Recyclable (Glass)',
      recyclableCan: 'Recyclable (Can)',
      recyclableVinyl: 'Recyclable (Vinyl)',
      general: 'General Waste',
      food: 'Food Waste',
      large: 'Large Waste',
      hazardous: 'Hazardous Waste',
    },
    schedule: {
      title: 'Disposal Schedule',
      recyclables: 'Recyclables: Monday, Thursday',
      general: 'General Waste: Tuesday, Friday',
      food: 'Food Waste: Every day (by 6 PM)',
      large: 'Large Waste: Separate registration required',
    },
    points: {
      title: 'Points',
      totalPoints: 'Total Points',
      pointsHistory: 'Points History',
      earnedPoints: 'Earned',
      usedPoints: 'Used',
    },
    mypage: {
      title: 'My Page',
      profile: 'Profile',
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
    },
  },
  zh: {
    common: {
      appName: 'Clean-Neung',
      login: '登录',
      logout: '退出',
      signup: '注册',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      back: '返回',
      next: '下一步',
      loading: '加载中...',
    },
    nav: {
      classify: '分类',
      schedule: '排放日程',
      points: '积分',
      mypage: '我的页面',
    },
    classify: {
      title: '垃圾分类',
      uploadImage: '上传图片',
      dragDrop: '拖放或点击上传图片',
      analyzing: '图片分析中...',
      result: '分类结果',
      category: '分类',
      disposalMethod: '处理方法',
      disposalDays: '排放日',
      confidence: '准确度',
      specialNotes: '特别说明',
      pointsEarned: '获得积分',
      nextDisposalDate: '下次排放日',
    },
    wasteCategories: {
      recyclablePaper: '可回收 (纸)',
      recyclablePlastic: '可回收 (塑料)',
      recyclableGlass: '可回收 (玻璃)',
      recyclableCan: '可回收 (罐)',
      recyclableVinyl: '可回收 (塑料袋)',
      general: '一般垃圾',
      food: '食物垃圾',
      large: '大型垃圾',
      hazardous: '危险垃圾',
    },
    schedule: {
      title: '排放日程',
      recyclables: '可回收垃圾：周一、周四',
      general: '一般垃圾：周二、周五',
      food: '食物垃圾：每天（下午6点前）',
      large: '大型垃圾：需要单独申报',
    },
    points: {
      title: '积分',
      totalPoints: '总积分',
      pointsHistory: '积分历史',
      earnedPoints: '获得',
      usedPoints: '使用',
    },
    mypage: {
      title: '我的页面',
      profile: '个人资料',
      settings: '设置',
      language: '语言',
      theme: '主题',
    },
  },
  ja: {
    common: {
      appName: 'Clean-Neung',
      login: 'ログイン',
      logout: 'ログアウト',
      signup: '会員登録',
      cancel: 'キャンセル',
      confirm: '確認',
      save: '保存',
      delete: '削除',
      edit: '編集',
      back: '戻る',
      next: '次へ',
      loading: '読み込み中...',
    },
    nav: {
      classify: '分類',
      schedule: '収集日程',
      points: 'ポイント',
      mypage: 'マイページ',
    },
    classify: {
      title: 'ごみ分類',
      uploadImage: '画像アップロード',
      dragDrop: '画像をドラッグまたはクリックしてアップロード',
      analyzing: '画像分析中...',
      result: '分類結果',
      category: 'カテゴリー',
      disposalMethod: '処分方法',
      disposalDays: '収集日',
      confidence: '精度',
      specialNotes: '特記事項',
      pointsEarned: '獲得ポイント',
      nextDisposalDate: '次の収集日',
    },
    wasteCategories: {
      recyclablePaper: 'リサイクル（紙）',
      recyclablePlastic: 'リサイクル（プラスチック）',
      recyclableGlass: 'リサイクル（ガラス）',
      recyclableCan: 'リサイクル（缶）',
      recyclableVinyl: 'リサイクル（ビニール）',
      general: '一般ごみ',
      food: '生ごみ',
      large: '粗大ごみ',
      hazardous: '危険物',
    },
    schedule: {
      title: '収集日程',
      recyclables: 'リサイクル：月曜日、木曜日',
      general: '一般ごみ：火曜日、金曜日',
      food: '生ごみ：毎日（午後6時まで）',
      large: '粗大ごみ：別途申請が必要',
    },
    points: {
      title: 'ポイント',
      totalPoints: '総ポイント',
      pointsHistory: 'ポイント履歴',
      earnedPoints: '獲得',
      usedPoints: '使用',
    },
    mypage: {
      title: 'マイページ',
      profile: 'プロフィール',
      settings: '設定',
      language: '言語',
      theme: 'テーマ',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.ko;
}
