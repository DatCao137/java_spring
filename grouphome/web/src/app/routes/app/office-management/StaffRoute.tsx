import { ContentLayout } from '@/components/layouts';
import { StaffMain } from '@/features/office-management/pages/StaffMain';

export const StaffRoute = () => {
    return (
        <ContentLayout title="職員管理">
            <StaffMain />
        </ContentLayout>
    );
}
