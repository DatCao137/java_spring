import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { CommonItemBox } from '@/components/elements/common/CommonItemBox';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { TypeContents } from '../../types/Branch';
import { jsonParse } from '@/utils/JsonUtils';
import { BranchDetail as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { ItemArgsData } from '@/components/elements/Common';

type ArgsData = {
  branchId: number | null;
  seq: number;
  setRowDataDetail: Dispatch<SetStateAction<FormData>>;
};

const DefaultContents: TypeContents = {
  basic: { groupHomeTypeId: 0, classDivisionId: 0, fee: null},
  officeNumber: { GH: null, SS: null, typeA: null, typeB: null}
}

interface DisplayData {
  branchName: string
  address: string
  groupHomeTypeName: string
  classificationName: string
  fee: number|null
  tel: string
  fax: string
  memo: string
  officeNoGH: string
  officeNoSS: string
  officeNoA: string
  officeNoB: string
  unitsGH: string
  unitsSS: string
  updatedAtBranch: string
  updatedAtAddr: string
}
const DefaultDisplayData: DisplayData = {
  branchName: '', groupHomeTypeName: '', address: '', classificationName: '',
  fee: null, tel: '', fax: '', memo: '',
  officeNoGH: '', officeNoSS: '', officeNoA: '', officeNoB: '',
  unitsGH: '', unitsSS: '',
  updatedAtBranch: '', updatedAtAddr: ''
}

function OfficeDetailInfo({ branchId, setRowDataDetail, seq }: ArgsData) {
  const [data, setData] = useState<DisplayData>(DefaultDisplayData);

  if (branchId == null) {
    return <></>;
  }

  const getDetail = async () => {
    Post({
      apiPath: ApiPath,
      params: { branchId: branchId },
      onSuccess: (res) => {
        const detail = res.data.data;
        const address = `〒${detail?.postNo} ${detail?.prefName}${detail?.city}${detail?.town}`;
        const contents = jsonParse('contents', detail?.contents, DefaultContents);
        const basic = contents.basic;
        const officeNo = contents.officeNumber;
        setData({
          branchName: detail?.branchName || ''
          , groupHomeTypeName: detail?.groupHomeTypeName || ''
          , address: address
          , classificationName: detail?.classDivisionName || ''
          , fee: basic?.fee
          , tel: detail?.tel || ''
          , fax: detail?.fax || ''
          , memo: detail?.memo || ''
          , officeNoGH: officeNo?.GH || ''
          , officeNoSS: officeNo?.SS || ''
          , officeNoA: officeNo?.typeA || ''
          , officeNoB: officeNo?.typeB || ''
          , unitsGH: detail?.unitsGH || ''
          , unitsSS: detail?.unitsSS || ''
          , updatedAtBranch: detail?.updatedAtBranch || ''
          , updatedAtAddr: detail?.updatedAtAddr || ''
        });
        setRowDataDetail(detail || {});
      },
      onError: (err) => {
        setData(DefaultDisplayData);
        setRowDataDetail({} as FormData);
      }
    });
  };

  useEffect(() => {
    if (branchId) {
      getDetail();
    }
  }, [branchId, seq]);

  const item1: ItemArgsData[] = [
    { title: { label: '事業所名' }, val: { val: data.branchName } },
    { title: { label: '類型' }, val: { val: data.groupHomeTypeName } },
    { title: { label: '級地区分' }, val: { val: data.classificationName } },
    { title: { label: '賃料' }, val: { val: data.fee ? data.fee.toString() : '' } },
  ];
  const item2: ItemArgsData[] = [
    { title: { label: '所在地' }, val: { val: data.address } },
    { title: { label: 'Tel' }, val: { val: data.tel } },
    { title: { label: 'FAX' }, val: { val: data.fax } },
  ];
  const sub1: ItemArgsData[] = [
    {
      title: { label: '事業者番号' },
      type: { label: 'GH' },
      val: { val: data.officeNoGH },
    },
    { title: { label: '' }, type: { label: 'SS' }, val: { val: data.officeNoSS } },
    { title: { label: '' }, type: { label: 'A型' }, val: { val: data.officeNoA } },
    { title: { label: '' }, type: { label: 'B型' }, val: { val: data.officeNoB } },
  ];
  const sub2: ItemArgsData[] = [
    {
      title: { label: '住居数' },
      type: { label: 'GH' },
      val: { val: data.unitsGH },
    },
    { title: { label: '' }, type: { label: 'SS' }, val: { val: data.unitsSS } },
  ];

  return (
    <>
      <div className="box">
        <span className="box-title">基本情報</span>
        <div className="info-line">
          <div className="info-row">
            <div className="flex-field">
              <CommonItemBox arrayData={item1} />
              <CommonItemBox arrayData={item2} />
            </div>
            <div className="item-line">
              <p>MEMO</p>
              <textarea name="memo" className="memo-field" value={data.memo} onChange={(e) => setData({ ...data, memo: e.target.value })}/>
            </div>
          </div>
          <div>
            <div className="box">
              <CommonItemBox arrayData={sub1} bSub={true} />
            </div>
            <div className="box">
              <CommonItemBox arrayData={sub2} bSub={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { OfficeDetailInfo };
