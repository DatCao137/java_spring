import { useNavigate } from 'react-router-dom';

import { Layout } from '@/components/layouts/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';

export const LoginRoute = () => {
  const navigate = useNavigate();

  return (
    <Layout title="ログイン画面">
      <LoginForm
        onSuccess={() =>
          navigate('/app', {
            replace: true,
          })
        }
      />
    </Layout>
  );
};
