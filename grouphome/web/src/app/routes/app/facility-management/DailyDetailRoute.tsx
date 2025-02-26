import { ContentLayout } from '@/components/layouts';
import { DailyDetail } from '@/features/facility-management/components/daily/DailyDetail';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const DailyDetailRoute = () => {
  const [title, setTitle] = useState<string>('');
  const location = useLocation();
  const [homeId, setHomeId] = useState('0');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const branchName = localStorage.getItem('branchName');
    const homeName = localStorage.getItem('homeName');
    const homeId = query.get('homeId') || '0';

    setHomeId(homeId);
    setTitle(`支援記録 ${branchName} ${homeName}`);
  }, [location.search, localStorage.getItem('homeName'), localStorage.getItem('branchName')]);
  return (
    <ContentLayout title={title}>
      <DailyDetail homeId={homeId} />
    </ContentLayout>
  );
}
