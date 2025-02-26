import { useEffect } from 'react';

export const QrLayout = ({ children }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/css/qr-layout.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <div className="un_qrWrapper">
        { children }
      </div>
    </>
  );
};
