import { ContentLayout } from '@/components/layouts';
import { InquiryMain } from '@/features/customer-management/pages/InquiryMain';

export const InquiryRoute = () => {
    return (
<ContentLayout title="問合わせ情報">
    <InquiryMain />
</ContentLayout>
);
}