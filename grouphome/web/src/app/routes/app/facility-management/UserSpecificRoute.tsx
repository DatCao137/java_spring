import { ContentLayout } from '@/components/layouts';
import UserSpecific from '@/features/facility-management/components/daily/user-specific/UserSpecific';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const UserSpecificRoute = () => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>(dayjs().format('YYYYMMDD'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const branchName = localStorage.getItem('branchName');
    const homeName = localStorage.getItem('homeName');
    const date = query.get('date') || dayjs().format('YYYYMMDD');
    setDate(date);
    setTitle(`支援記録 ${branchName} ${homeName}`);
    setIsLoading(false);
  }, [location.search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ContentLayout title={title}>
      <UserSpecific date={date} />
    </ContentLayout>
  );
}
