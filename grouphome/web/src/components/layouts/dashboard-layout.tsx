import { useState } from 'react';
import Aside from './aside';
import Header from './header';

type SideNavigationItem = {
  name: string;
  to: string;
  class: string;
  hasChildren: boolean;
};


const Logo = () => {
  const [closeMenu, setCloseMenu] = useState(false);

  const onClickLogo = () => {
    setCloseMenu(!closeMenu);
  }

  return (
    <div 
      className={`bl_asideLogo ${closeMenu ? 'close' : ''}`}
      onClick={onClickLogo}
    >
      <img src="../../img/logo.svg" alt="AMATUHI" />
    </div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigation = [
    {
      name: 'ホーム',
      to: '/app',
      class: 'home',
      hasChildren: false,
    },
    {
      name: '事業所管理',
      to: '/app/office',
      class: 'office',
      hasChildren: true,
      children: [
        {
          name: '事業所情報',
          to: '/app/office',
        },
        {
          name: 'ホーム情報',
          to: '/app/home',
        },
        {
          name: '職員管理',
          to: '/app/staff',
        },
        {
          name: '文書管理',
          to: '/app/docManage',
        },
        {
          name: '問合わせ管理',
          to: '/app/under-preparation',
        },
        {
          name: '人事情報連携',
          to: '/app/under-preparation',
        },
      ],
    },
    {
      name: '利用者管理',
      to: '/app/request',
      class: 'customerManagement',
      hasChildren: true,
      children: [
        {
          name: '申し込み',
          to: '/app/request',
        },
        {
          name: '問合わせ情報',
          to: '/app/inquiry',
        },
        {
          name: '入居者情報管理',
          to: '/app/tenant',
        },
        {
          name: '支援計画等',
          to: '/app/support-plan',
        },
      ],
    },
    {
      name: '施設業務',
      to: '/app/facility/daily',
      class: 'facility',
      hasChildren: true,
      children: [
        {
          name: '支援記録',
          to: '/app/facility/daily',
        },
        {
          name: '預かり金管理',
          to: '/',
        },
        {
          name: '施設運営管理',
          to: '/',
        },
        {
          name: 'クレーム情報',
          to: '/',
        },
        {
          name: 'イベント管理',
          to: '/',
        },
      ],
    },
    {
      name: 'シフト管理',
      to: '/',
      class: 'shift',
      hasChildren: true,
      children: [
        {
          name: 'シフト計画管理',
          to: '/',
        },
        {
          name: 'シフト作成',
          to: '/',
        },
        {
          name: '勤怠管理',
          to: '/',
        },
        {
          name: '要件人数チェック',
          to: '/',
        },
      ],
    },
    {
      name: '利用者請求',
      to: '/',
      class: 'customerRequest',
      hasChildren: true,
      children: [
        {
          name: '水道光熱費集計',
          to: '/',
        },
        {
          name: '食費集計',
          to: '/',
        },
        {
          name: '個別請求額集計',
          to: '/',
        },
        {
          name: '請求書出力',
          to: '/',
        },
      ],
    },
    {
      name: '国保連請求',
      to: '/',
      class: 'nhio',
      hasChildren: true,
      children: [
        {
          name: '個人情報連携',
          to: '/',
        },
        {
          name: '在籍集計',
          to: '/',
        },
        {
          name: '請求データ作成',
          to: '/',
        },
      ],
    },
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Aside logo={<Logo />} navigation={navigation} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
