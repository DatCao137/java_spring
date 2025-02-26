import * as React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <div className="py-6 min-w-full">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-4 md:px-6">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div id='main-contents' className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-4 md:px-6">
          {children}
        </div>
      </div>
    </>
  );
};
