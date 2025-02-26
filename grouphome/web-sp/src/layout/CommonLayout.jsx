import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CommonLayout = ({ children }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/css/common-layout.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <header className="bl_header">
        <h1>
          <Link to="/top">
            <img src="/img/logo_h.svg" alt="AMANEKU" className="bl_headerLogo" />
          </Link>
        </h1>
      </header>

      <main className="bl_main">
        { children }
      </main>
    </>
  );
};
