import Home from '@/components/layouts/home';
import Notice from '@/components/layouts/notice';

export const DashboardRoute = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-4 md:px-6">
        <Notice />
        <Home />
      </div>
    </div>
  );
};
