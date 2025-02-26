import { useEffect, useState } from 'react';

import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { deepMerge } from '@/utils/Helper';
import { jsonParse } from '@/utils/JsonUtils';

import { ContentMoveIn } from '../../types/Request';

import { InputCheckbox } from './InputCheckBox';
import { FamilyInfoCom } from './moveins/FamilyInfoCom';
import { InsuranceInfoCom } from './moveins/InsuranceInfoCom';
import { MoveInBasicCom } from './moveins/MoveInBasicCom';
import { RelatedInfoCom } from './moveins/RelatedInfoCom';
import { SituationInfoCom } from './moveins/SituationInfoCom';
import { IncomeCom } from './moveins/IncomeCom';

type moveInProps = {
  requestInfo: any;
  requestDetail: any;
};

export const contentMoveInDefault: ContentMoveIn = {
  name: '',
  gana: '',
  representative: '',
  sex: '',
  birth: {
    era: '',
    date: '',
    age: null,
  },
  currentAddress: {
    address: {
      postNo1st: '',
      postNo2nd: '',
      prefId: null,
      city: '',
      town: '',
    },
    tel: {
      type: '',
      no: '',
      inner: '',
      mail: '',
    },
  },
  emergency: {
    name: '',
    relationship: '',
    address: {
      address: {
        postNo1st: '',
        postNo2nd: '',
        prefId: null,
        city: '',
        town: '',
      },
      tel: {
        type: '',
        no: '',
        inner: '',
        mail: '',
      },
    },
  },
  underwriter: {
    has: null,
    name: '',
  },
  successor: {
    has: null,
    name: '',
  },
  motive: '',
  disabilityName: '',
  disabilityClass: '',
  book: {
    has: null,
    physical: {
      has: false,
      degree: '',
    },
    treatment: {
      has: false,
      degree: '',
    },
    mental: {
      has: false,
      degree: '',
    },
  },
  failureSituation: '',
  history: [],
  allergy: '',
  physicalInfo: {
    height: '',
    weight: '',
    lifestyle: {
      has: null,
      contents: '',
    },
    wakeUpTime: '',
    sleepingTime: '',
    alcohol: {
      has: null,
    },
    tobacco: {
      has: null,
    },
  },
  family: [],
  insurance: {
    type: {
      type: '',
      contents: '',
    },
    care: {
      has: false,
    },
    limit: null,
    expenses: {
      type: '',
      limit: null,
    },
  },
  related: {
    doctor: {
      hospital: '',
      medicine: '',
      name: '',
      address: {
        postNo1st: '',
        postNo2nd: '',
        prefId: null,
        city: '',
        town: '',
      },
      contact: {
        tel: '',
        mobile: '',
        fax: '',
      },
    },
    caseWorker: {
      institutionName: '',
      name: '',
      contact: {
        tel: '',
        mobile: '',
        fax: '',
      },
    },
  },
  situation: {
    place: {
      has: null,
      contents: '',
    },
    etcService: '',
    activity: {
      weeks: [],
      startHour: '',
      endHour: '',
      notes: '',
    },
    transfer: {
      transferType: '',
      transportationType: '',
      contents: '',
    },
    needSupport: {
      has: null,
      contents: '',
    },
    howToSpend: '',
    medication: {
      has: null,
      contents: '',
    },
    care: {
      has: null,
      contents: '',
    },
    money: '',
  },
  mental: '',
  goals: '',
  requests: '',
  requirements: {
    items: [],
    contents: '',
  },
  income: {
    pension: {
      available: false,
      amount: '',
    },
    welfare: {
      available: false,
      amount: '',
    },
    pensionOther: {
      available: false,
      amount: '',
    },
    working: {
      available: false,
      amount: '',
    },
    familyAssist: {
      available: false,
      amount: '',
    },
    others: {
      available: false,
      name: '',
      amount: '',
    },
  }
};

const REQUEST_TYPE = 'request_type';

export const RequestInfoDetailMoveIn = ({
  requestInfo,
  requestDetail,
}: moveInProps) => {
  const [content, setContent] = useState<ContentMoveIn>(contentMoveInDefault);

  useEffect(() => {
    const getContentMoveIn = () => {
      let data = jsonParse(
        'contents',
        requestDetail?.contents,
        contentMoveInDefault,
      );
      data = deepMerge(contentMoveInDefault, data);
      setContent(data);
    };

    getContentMoveIn();
  }, [requestDetail]);

  const { selectListData } = useSelectList();
  const requestType =
    selectListData.get(REQUEST_TYPE)?.filter((e) => e.value) || [];

  return (
    <>
      <p className="mt-5">※詳細情報(入居申込書兼フェイスシート)</p>
      <div className="container rounded border border-black p-5">
        <MoveInBasicCom
          key={'move-in-basic-com'}
          content={content}
          requestInfo={requestInfo}
        />

        {/* 家族構成 */}
        <FamilyInfoCom content={content} />

        {/* 保険 */}
        <InsuranceInfoCom content={content} />

        {/* 入居後収入 */}
        <IncomeCom content={content} />

        {/* 関係機関 */}
        <RelatedInfoCom content={content} />

        {/* 活動状況 */}
        <SituationInfoCom content={content} />

        {/* AMANEKUで特にお手伝いや見守りが必要なこと */}
        <div className="mt-5">AMANEKUで特にお手伝いや見守りが必要なこと</div>
        <div className="ml-5 grid grid-cols-12 gap-2 border">
          {requestType.map((item, index) => {
            const checked = content?.requirements?.items?.includes(item.value);
            const otherChecked = checked && item.name == 'その他';
            return (
              <InputCheckbox
                checked={checked}
                label={
                  item.name +
                  `${otherChecked && content?.requirements?.contents ? '(' + content?.requirements?.contents + ')' : ''}`
                }
                key={index}
                className={`${otherChecked ? 'col-span-5' : 'col-span-2'}`}
              />
            );
          })}
        </div>

        {/* 心身の状態 */}
        <div className="mt-5">心身の状態</div>
        <div className="ml-5 grid grid-cols-1">
          <div className="col-span-1 min-h-28 rounded border border-black px-2 whitespace-pre-line">
            <div>{content?.mental || ''}</div>
          </div>
        </div>

        {/* 将来の希望や目標 */}
        <div className="mt-5">将来の希望や目標</div>
        <div className="ml-5 grid grid-cols-1">
          <div className="col-span-1 row-span-2 min-h-28 rounded border border-black px-2 whitespace-pre-line">
            <div>{content?.goals || ''}</div>
          </div>
        </div>

        {/* AMANEKUへの要望や知っておいてほしいことなど */}
        <div className="mt-5">AMANEKUへの要望や知っておいてほしいことなど</div>
        <div className="ml-5 grid grid-cols-1">
          <div className="col-span-1 min-h-28 rounded border border-black px-2 whitespace-pre-line">
            <div>{content?.requests || ''}</div>
          </div>
        </div>

        {/* 補足 */}
        <div className="mt-5">補足</div>
        <div className="ml-5 grid grid-cols-1">
          <div className="col-span-1 min-h-28 rounded border border-black px-2 whitespace-pre-line">
            <div>{requestInfo?.remark || ''}</div>
          </div>
        </div>
      </div>
    </>
  );
};
