import { ContentLayout } from '@/components/layouts';
import { RequestMain } from '@/features/customer-management/pages/RequestMain';

export const RequestRoute = () => {
    return (
<ContentLayout title="申込み">
    <RequestMain />
</ContentLayout>
);
}