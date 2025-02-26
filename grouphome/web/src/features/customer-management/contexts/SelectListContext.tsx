
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Post, Get } from '@/features/blc-common/utils/ServerRequest';

export type SelectListResponseDto = {
  name: string;
  value: string;
};

type SelectListContextType = {
  selectListData: Map<string, SelectListResponseDto[]>;
  loading: boolean;
  error: string | null;
};

const SelectListContext = createContext<SelectListContextType | undefined>(
  undefined,
);

export const SelectListProvider = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string[];
}) => {
  const [selectListData, setSelectListData] = useState<
    Map<string, SelectListResponseDto[]>
  >(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      Post({
        apiPath: `/api/select/list`,
        params: { type },
        onSuccess: (res) => {
          const data: Map<string, SelectListResponseDto[]> = new Map(
            Object.entries(res.data),
          );

          Get({
            apiPath: `/api/home/list`,
            params: {},
            onSuccess: (res) => {
              const homeInfos = res.data.data?.map((home: any) => {
                return {
                  value: home.id.toString(),
                  name: home.name,
                } as SelectListResponseDto;
              });
              data.set('home-infos', homeInfos);
              setSelectListData(data);
              setLoading(false);
            },
            onError: (err) => {
              setLoading(false);
            }
          });
        },
        onError: (err) => {
          setLoading(false);
        }
      });
    }
    fetchData();
  }, [type]);

  return (
    <SelectListContext.Provider value={{ selectListData, loading, error }}>
      {children}
    </SelectListContext.Provider>
  );
};

export const useSelectList = () => {
  const context = React.useContext(SelectListContext);
  if (context === undefined) {
    throw new Error('useSelectList must be used within a SelectListProvider');
  }
  return context;
};
