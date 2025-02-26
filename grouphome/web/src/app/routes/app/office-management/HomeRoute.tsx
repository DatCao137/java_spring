import { ContentLayout } from '@/components/layouts';
import { HomeMain } from '@/features/office-management/pages/HomeMain';

export const HomeRoute = () => {
    return (
<ContentLayout title="ホーム情報">
    <HomeMain />
</ContentLayout>
);
}
