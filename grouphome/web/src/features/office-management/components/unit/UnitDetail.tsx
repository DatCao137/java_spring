import { useState, useEffect, useRef } from 'react';

import { TypeFormData, TypeUnitInfo, TypeUnitInfoSaveDto, TypeContents } from '../../types/UnitInfo';
import { jsonParse } from '@/utils/JsonUtils';
import { CommonItem } from '@/components/elements/common/CommonItem';
import { UnitInfoCss } from '../../assets/UnitInfoCss'
import { RoomInfo } from '../room/RoomInfo'
import { formatJPDate } from '../../../../utils/DateUtils'

type ArgsData = {
  homeId: number | null;
  loadParentData?: () => void;
  seq: number;
  rowData: any | null;
  unitId: number | null;
};

type FormDataDto = TypeFormData;
const defaultFormData: FormDataDto = {
  unitId: null, homeId: null,
  name: '',
  addrId: null, postNo: '', prefId: '', city: '', town: '', tel: '', fax: '',
  mail: '',
  startDate: null, capacity: null, concept: '',
  featuresSystem: false, featuresBarrierFree: false,
  featuresMenOnly: false, featuresWomenOnly: false,
  serviceGH: false, serviceSS: false,
  updatedAtAddr: '', updatedAtUnit: '',
};
const DefaultContents: TypeContents = {
  basic: { startDate: null, capacity: 0, concept: '' },
  features: { system: false, barrierFree: false, menOnly: false, womenOnly: false },
  services: { GH: false, SS: false},
}

function UnitDetail({ homeId, unitId, loadParentData, seq, rowData }: ArgsData) {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  var startDate = '';
  var capacity = null;
  var concept = '';
  var featuresStr: String = '';
  var serviceStr: String = '';
  if (rowData) {
    const contents = jsonParse('contents', rowData?.contents, DefaultContents);
    const basic = contents.basic;
    const features = contents.features;
    const services = contents.services;
    featuresStr += features.system ? '24時間' : ''
    featuresStr += features.barrierFree ? ' バリアフリー' : ''
    featuresStr += features.menOnly ? ' 男性専用' : ''
    featuresStr += features.womenOnly ? ' 女性専用' : ''
    serviceStr += services.GH ? 'グループホーム' : ''
    serviceStr += services.SS ? ' ショートステイ' : ''
    startDate = (basic.startDate || '').toString();
    capacity = basic.capacity;
    concept = basic.concept;
  }


  const args = [
    { title: { label: '共同生活住居地' }, val: { val: rowData?.unitName } },
    { title: { label: '指定日' }, val: { val: formatJPDate(startDate) } },
    { title: { label: '住所' }, val: { val: rowData?.postNo ? '〒' + rowData?.postNo : '' } },
    { title: { label: '　' }, val: { val: rowData?.address } },
    { title: { label: '電話番号' }, val: { val: rowData?.tel } },
    { title: { label: 'メール' }, val: { val: rowData?.mail } },
    { title: { label: '定員数' }, val: { val: capacity || '' } },
    { title: { label: 'コンセプト' }, val: { val: concept } },
    { title: { label: '特徴' }, val: { val: featuresStr } },
    { title: { label: 'サービス' }, val: { val: serviceStr } },
  ];

  useEffect(() => {
    
  }, [homeId, seq]);

  useEffect(() => {
    if (isLoaded) {
      
    }
  }, [ isLoaded ]);

  return (
    <>
      <style>
        <UnitInfoCss />
      </style>

      <div className='unitDetail'>
        <div className="person-line">
          {args?.map((item, index) => {
            return <CommonItem key={index} title={item.title} val={item.val} />;
          })}
        </div>
        <div className="box mt-6">
          <span className="box-title">居室情報</span>
          <div className='roomInfo'>
            <RoomInfo unitId={unitId} />
          </div>
        </div>
      </div>
    </>
  );
}

export { UnitDetail };
