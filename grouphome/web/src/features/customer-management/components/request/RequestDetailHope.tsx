import { useEffect, useState } from 'react';

import { RequestType } from '../../types/Request';

import { RequestInfoDetailMoveIn } from './RequestInfoDetailMoveIn';
import { RequestInfoDetailVisit } from './RequestInfoDetailVisit';
import { Get } from '@/features/blc-common/utils/ServerRequest';

type ArgsData = {
  tgtId: string | null;
  requestInfo: any;
  setRequestInfoDetail?: any;
};

function RequestDetailHope({
  tgtId,
  requestInfo,
  setRequestInfoDetail,
}: ArgsData) {
  const [requestType, setRequestType] = useState<RequestType>('visit');
  const [notFound, setNotFound] = useState<boolean>(true);
  const [requestDetail, setRequestDetail] = useState<any>(null);

  useEffect(() => {
    if (tgtId) {
      getRequestInfoDetail();
    }
  }, [tgtId]);

  if (!tgtId) {
    return <></>;
  }

  const getRequestInfoDetail = async () => {
    Get({
      apiPath: `/api/request/detail/${tgtId}`,
      params: {},
      onSuccess: (res) => {
        const requestInfoDetail = res.data.data;
        setRequestDetail(requestInfoDetail);
        setRequestInfoDetail(requestInfoDetail);
        setRequestType(requestInfoDetail?.requestType || 'visit');
        setNotFound(false);
      },
      onError: (res) => {
        setNotFound(true);
      }});
  };

  if (notFound) {
    return (
      <div className="box">
        <p>詳細情報表示のプロトタイプ・デモ製作中。。。</p>
        <p>もうしばらく、お待ちください。 m(_ _)m</p>
      </div>
    );
  }

  switch (requestType) {
    case 'visit':
      return (
        <RequestInfoDetailVisit
          requestInfo={requestInfo}
          requestDetail={requestDetail}
        />
      );
    case 'movein':
      return (
        <RequestInfoDetailMoveIn
          requestInfo={requestInfo}
          requestDetail={requestDetail}
        />
      );
    default:
      return <p>Invalid request type</p>;
  }
}

export { RequestDetailHope };
