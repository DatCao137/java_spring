import React, { useEffect, useState } from 'react';
import { CommonViewer } from '../common/CommonViewer';
import { Button } from '@/components/ui/button';

type props = {
  fileName?: string;
  data?: string;
  ext?: string;
};

const Preview = ({ fileName = '', data = '', ext = '' }: props) => {
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);

  useEffect(() => {
    setIsShowHistory(false);
  }, [fileName, data, ext]);
  return (
    <>
      <div className="mb-3 mr-3 flex flex-row justify-end space-x-2">
        <Button
          type="button"
          size={'sm'}
          onClick={() => setIsShowHistory(true)}
        >
          履歴
        </Button>
      </div>
      <div className="grid grid-cols-12 border border-gray-300">
        <div className={`${isShowHistory ? 'col-span-8' : 'col-span-12'} p-2`}>
          <CommonViewer
            fileName="test-tree-preview"
            data="ファイルプレビュー表示"
            ext="txt"
          />
        </div>
        {isShowHistory && (
          <div className="col-span-4 border-l border-gray-300 p-2">
            <div>履歴情報</div>
            <div>
              <span className="mr-2">#0</span>2024/10/01 10:00:00
            </div>
            <div>コメント</div>
            <div>
              <span className="mr-2">#1</span>2024/10/01 10:00:00
            </div>
            <div>コメント</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
