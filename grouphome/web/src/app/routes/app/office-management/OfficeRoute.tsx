import { ContentLayout } from '@/components/layouts';
import { OfficeMain } from '@/features/office-management/pages/OfficeMain';

export const OfficeRoute = () => {
    return (
<ContentLayout title="事業所情報">
    <OfficeMain />
</ContentLayout>
);
}
