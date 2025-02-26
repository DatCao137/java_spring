import { useEffect } from 'react';

export const LoginLayout = ({ children }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/css/login-layout.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <div className="un_loginWrapper">
        { children }
      </div>
    </>
  );
};
