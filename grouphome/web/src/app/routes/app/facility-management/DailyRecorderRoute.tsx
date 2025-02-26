import { ContentLayout } from '@/components/layouts';
import { DailyRecorderMain } from '@/features/facility-management/pages/DailyRecorderMain';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const DailyRecorderRoute = () => {
  const [title, setTitle] = useState<string>('');
  const [homeId, setHomeId] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const branchName = localStorage.getItem('branchName');
    const homeName = localStorage.getItem('homeName');
    const homeIdParam = query.get('homeId');

    setTitle(`支援記録 ${branchName ?? ''} ${homeName ?? ''}`);
    setHomeId(homeIdParam ? parseInt(homeIdParam) : 0);
    setDate(query.get('date') ?? new Date().toISOString().split('T')[0]);
    setIsLoading(false);
  }, [location.search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <ContentLayout title={title}>
      <DailyRecorderMain homeId={homeId} date={date} />
    </ContentLayout>
  );
};
