import { ContentLayout } from '@/components/layouts';
import { DocManageMain } from '@/features/office-management/pages/DocManageMain';

export const DocManageRoute = () => {
    return (
<ContentLayout title="文書管理">
    <DocManageMain />
</ContentLayout>
);
}