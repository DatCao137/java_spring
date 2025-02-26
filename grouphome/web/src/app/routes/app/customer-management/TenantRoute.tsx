import { ContentLayout } from '@/components/layouts';
import { TenantMain } from '@/features/customer-management/pages/TenantMain';

export const TenantRoute = () => {
	return (
		<ContentLayout title="利用者管理">
			<TenantMain />
		</ContentLayout>
	);
}