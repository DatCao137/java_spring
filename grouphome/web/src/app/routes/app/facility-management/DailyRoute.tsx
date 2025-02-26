import { ContentLayout } from '@/components/layouts';
import { DailyMain } from '@/features/facility-management/pages/DailyMain';

export const DailyRoute = () => {
    return (
        <ContentLayout title="支援記録">
            <DailyMain />
        </ContentLayout>
    );
}
