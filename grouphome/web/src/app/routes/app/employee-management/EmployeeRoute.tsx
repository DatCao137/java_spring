import { ContentLayout } from '@/components/layouts';
import { EmployeeMain } from '@/features/employee-management/pages/EmployeeMain';

export const EmployeeRoute = () => {
    return (
<ContentLayout title="QUẢN LÝ NGƯỜI LÀM">
    <EmployeeMain />
</ContentLayout>
);
}
