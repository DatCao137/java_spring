import { useEffect, useState } from 'react';

import { formatJPDate, jpFormatTemplate01 } from '@/utils/DateUtils';
import { deepMerge } from '@/utils/Helper';
import { jsonParse } from '@/utils/JsonUtils';

import { ContentVisit } from '../../types/Request';

import { InputCheckboxRadio } from './InputCheckboxRadio';
import {
  VisitAttendantCom,
  visitAttendantDefault,
} from './visits/VisitAttendantCom';
import { VisitBaseCom, visitBaseDefault } from './visits/VisitBaseCom';
import { VisitDesiredCom } from './visits/VisitDesiredCom';

type visitProps = {
  requestInfo: any;
  requestDetail: any;
};

export const contentVisitDefault: ContentVisit = {
  base: visitBaseDefault,
  attendant: visitAttendantDefault,
  desired: {
    count: null,
    attribute: [],
    contactInfo: '',
  },
  etc: '',
};

const requestItems = [
  { name: '見学', value: 'VISIT' },
  { name: '体験入居', value: 'EXP' },
];

export const RequestInfoDetailVisit = ({
  requestInfo,
  requestDetail,
}: visitProps) => {
  const [content, setContent] = useState<ContentVisit>(contentVisitDefault);

  useEffect(() => {
    const getContentVisit = () => {
      let data = jsonParse(
        'contents',
        requestDetail?.contents,
        contentVisitDefault,
      );
      data = deepMerge(contentVisitDefault, data);
      setContent(data);
    };

    getContentVisit();
  }, [requestDetail]);

  return (
    <>
      <p className="mt-5">※詳細情報(見学・体験)</p>
      <div className="container rounded border border-black p-5">
        <div className="grid grid-cols-8 gap-2">
          {requestItems.map((item, index) => (
            <InputCheckboxRadio
              key={index}
              checked={requestInfo?.requestItemOriginal == item.value}
              label={item.name}
              className="col-span-1 ml-2 text-gray-700"
            />
          ))}
          <span className="col-span-1 col-start-6 pr-2 text-right">申込日</span>
          <span className="col-span-2 col-start-7 text-center">
            {formatJPDate(requestInfo?.requestDate, jpFormatTemplate01)}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-8">
          {/* 希望事業所 */}
          <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
            希望事業所
          </div>
          <div className="col-span-7 border-collapse border px-2">
            <span>{requestInfo?.homeName || ''}</span>
          </div>

          {/* 希望内容 */}
          <VisitBaseCom base={content?.base} />

          {/* お付添又は代理人の方 */}
          <VisitAttendantCom attendant={content?.attendant} />

          {/* 希望日時 */}
          <VisitDesiredCom
            desired={content?.desired}
            requestInfo={requestInfo}
          />
          {/* その他ご要望等ございましたらご記入ください */}
          <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
            その他ご要望等ございましたらご記入ください
          </div>
          <div className="col-span-7 border-collapse content-center border px-2 whitespace-pre-line">
            {content?.etc || ''}
          </div>

          {/* 補足 */}
          <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
            補足
          </div>
          <div className="col-span-7 min-h-28 border-collapse content-center border px-2 whitespace-pre-line">
            {requestInfo?.remark || ''}
          </div>
        </div>
      </div>
    </>
  );
};
