import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { ContentMoveIn } from '@/features/customer-management/types/Request';
import {
  formatJPDate,
  getAge,
  reiwaFormatDate,
  reiwaFormatTemplate01,
} from '@/utils/DateUtils';

import { InputCheckbox } from '../InputCheckBox';
import { getAddress } from '@/utils/Helper';
import { InputCheckboxRadio } from '@/features/customer-management/components/request/InputCheckboxRadio';

type basicProps = {
  requestInfo: any;
  content: ContentMoveIn;
};

const SEX = 'sex';
const ERA = [
  { name: '昭和', value: '1' },
  { name: '平成', value: '2' },
  { name: '西暦', value: '3' },
];
const PHONE_TYPE = 'phone_type';
const SUPPORT_TYPE = 'support_type';
const PHYSICAL_GRADE = 'physical_grade';
const MENTAL_GRADE = 'mental_grade';

const requestItems = [
  { name: '本入居', value: 'MOVEIN' },
  { name: '体験(無料)', value: 'EXP_FREE' },
  { name: '体験(有料)', value: 'EXP_PAY' },
];

export const MoveInBasicCom = ({ requestInfo, content }: basicProps) => {
  const { selectListData } = useSelectList();
  const sexes = selectListData.get(SEX)?.filter((e) => e.value) || [];
  const phoneTypes =
    selectListData.get(PHONE_TYPE)?.filter((e) => e.value) || [];
  const supportTypes =
    selectListData.get(SUPPORT_TYPE)?.filter((e) => e.value) || [];
  const physicalGrade =
    selectListData.get(PHYSICAL_GRADE)?.filter((e) => e.value) || [];
  const mentalGrade =
    selectListData.get(MENTAL_GRADE)?.filter((e) => e.value) || [];
  const prefectures = selectListData.get('prefectures')?.filter((e) => e.value) || [];

  const {
    currentAddress,
    emergency,
    underwriter,
    successor,
    book,
    history,
    physicalInfo,
  } = content;

  return (
    <>
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
          {reiwaFormatDate(requestInfo?.requestDate, reiwaFormatTemplate01)}
        </span>
      </div>
      <div className="mt-3 grid border-collapse grid-cols-7 border">
        {/* 入居希望ホーム名 */}
        <div className="col-span-4 grid grid-cols-4">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            入居希望ホーム名
          </div>
          <div className="col-span-3 border-collapse border px-2">
            {requestInfo?.homeName || ''}
          </div>
        </div>
        <div className="col-span-3 grid border-collapse grid-cols-3 border">
          <div className="col-span-1 border-collapse content-center border text-center">
            入居希望時期
          </div>
          <div className="col-span-2 border-collapse border px-2">
            {reiwaFormatDate(
              requestInfo?.desiredDateOriginal?.desired,
              '年MM月頃',
            )}
          </div>
        </div>

        {/* ふりがな & 本人氏名 */}
        <div className="col-span-4 grid border-collapse grid-cols-4">
          <div className="col-span-1 border-collapse content-center border text-center">
            ふりがな
          </div>
          <div className="col-span-3 border-collapse border px-2">
            {content?.gana || ''}
          </div>
          <div className="col-span-1 border-collapse content-center border text-center">
            本人氏名
          </div>
          <div className="col-span-3 grid grid-cols-9">
            <div className="col-span-7 grid border-collapse grid-cols-1 border px-2">
              <div className="col-span-1">{content?.name || ''}</div>
              <div className="col-span-1">
                (代筆者名 : {content?.representative || ''})
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-1 px-2">
              {sexes?.map((item, index) => (
                <InputCheckboxRadio
                  key={index}
                  checked={content?.sex == item.value}
                  label={item.name}
                  className="col-span-1"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 grid border-collapse grid-cols-9 border">
          <div className="col-span-9 px-2">生年月日</div>
          <div className="col-span-3 col-start-2">
            {formatJPDate(content?.birth?.date, 'YYYY年MM月DD日')}
          </div>
          <div className="col-span-2">
            ( {content?.birth?.age || getAge(content?.birth?.date)}歳 )
          </div>
        </div>

        {/* 現住所 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          現住所
        </div>
        <div className="col-span-6 grid grid-cols-subgrid border px-2">
          <div className="col-span-3">
            <div>〒{(currentAddress?.address?.postNo1st || '') + '-' + (currentAddress?.address?.postNo2nd || '')}</div>
            <div>{getAddress(prefectures, currentAddress?.address)}</div>
          </div>
          <div className="col-span-3 grid border-collapse grid-cols-5 gap-2 border ps-2">
            <div className="col-span-1">電話番号</div>
            {phoneTypes?.map((item, index) => (
              <InputCheckboxRadio
                key={index}
                checked={currentAddress?.tel?.type == item.value}
                label={item.name}
                className="col-span-1"
              />
            ))}
            <div className="col-span-5 col-start-2">
              {currentAddress?.tel?.no || ''}
              {currentAddress?.tel?.inner
                ? '(' + currentAddress?.tel?.inner + ')'
                : ''}
            </div>
            <div className="col-span-1">メール</div>
            <div className="col-span-4">{currentAddress?.tel?.mail || ''}</div>
          </div>
        </div>

        {/* 緊急連絡先 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          緊急連絡先
        </div>
        <div className="col-span-6 grid grid-cols-subgrid">
          <div className="col-span-3 grid grid-cols-9 grid-rows-4">
            <div className="col-span-1 border-collapse border text-center">
              氏名
            </div>
            <div className="col-span-8 border-collapse border px-2">
              {emergency?.name || ''}
            </div>
            <div className="col-span-1 row-span-3 border-collapse content-center border text-center">
              <span
                style={{
                  textOrientation: 'mixed',
                  writingMode: 'vertical-lr',
                }}
              >
                住 所
              </span>
            </div>
            <div className="col-span-8 row-span-3 border-collapse border px-2">
              <div>〒{(emergency?.address?.address?.postNo1st || '') + '-' + (emergency?.address?.address?.postNo2nd || '')}</div>
              <div>{getAddress(prefectures, emergency?.address?.address)}</div>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-5">
            <div className="col-span-5 grid grid-cols-9">
              <div className="col-span-1 border-collapse border text-center">
                続柄
              </div>
              <div className="col-span-8 border-collapse border px-2">
                {emergency?.relationship || ''}
              </div>
            </div>
            <div className="col-span-1 col-start-1 px-2">電話番号</div>
            {phoneTypes?.map((item, index) => (
              <InputCheckboxRadio
                key={index}
                checked={emergency?.address?.tel?.type == item.value}
                label={item.name}
                className="col-span-1"
              />
            ))}
            <div className="col-span-5 col-start-2">
              {emergency?.address?.tel?.no || ''}
              {emergency?.address?.tel?.inner
                ? '(' + emergency?.address?.tel?.inner + ')'
                : ''}
            </div>
            <div className="col-span-1 px-2">メール</div>
            <div className="col-span-4">
              {emergency?.address?.tel?.mail || ''}
            </div>
          </div>
        </div>

        {/* 身元引受人 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          身元引受人
        </div>
        <div className="col-span-6 grid grid-cols-12 content-center px-2">
          <div className="col-span-5 border-collapse border">
            <InputCheckboxRadio
              checked={underwriter?.has === false}
              label="なし"
              className="mr-2"
            />
            <InputCheckboxRadio
              checked={underwriter?.has === true}
              label="あり"
              className="mr-2"
            />
            氏名 : {underwriter?.has && underwriter?.name ? underwriter?.name : ''}
          </div>
          <div className="col-span-1 border-collapse border">後継人等</div>
          <div className="col-span-6 border-collapse border px-2">
            <InputCheckboxRadio
              checked={underwriter?.has === false}
              label="なし"
              className="mr-2"
            />
            <InputCheckboxRadio
              checked={underwriter?.has === true}
              label="あり"
              className="mr-2"
            />
            氏名 : {successor?.has && successor?.name ? successor?.name : ''}
          </div>
        </div>

        {/* 入居の動機 */}
        <div className="col-span-1 border-collapse content-center text-wrap border text-center">
          入居の動機
        </div>
        <div className="col-span-6 border-collapse border px-2 whitespace-pre-line">
          {content?.motive}
        </div>

        {/* 障がい名 */}
        <div className="col-span-1 border-collapse content-center text-wrap border text-center">
          障がい名
        </div>
        <div className="col-span-6 border-collapse border px-2">
          <div className="col-span-1">{content?.disabilityName}</div>
        </div>

        {/* 障がい支援区分 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          障がい支援区分
        </div>
        <div className="col-span-6 border-collapse border px-2">
          {supportTypes.map((item, index) => (
            <InputCheckboxRadio
              key={index}
              checked={content?.disabilityClass?.includes(item.value)}
              label={item.name}
              className="mr-2"
            />
          ))}
        </div>

        {/* 手帳 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          手帳
        </div>
        <div className="col-span-6 grid border-collapse grid-cols-12 border">
          <div className="col-span-2 px-2 align-middle">
            <InputCheckboxRadio checked={book?.has === true} label="有" className="mr-2" />
            <InputCheckboxRadio checked={book?.has === false} label="無" />
          </div>

          <InputCheckbox
            checked={book?.physical?.has}
            label={`身体障がい手帳${book?.physical?.has && book?.physical?.degree
              ? '(' +
              (physicalGrade.find(
                (item) => item.value == book?.physical?.degree,
              )?.name || '') + ')'
              : ''
              }`}
            className="col-span-3"
          />
          <InputCheckbox
            checked={book?.treatment?.has}
            label={`療育手帳(程度 : ${book?.treatment?.degree})`}
            className="col-span-3"
          />
          <InputCheckbox
            checked={book?.mental?.has}
            label={`精神保健手帳${book?.mental?.has && book?.mental?.degree
              ? '(' +
              (mentalGrade.find(
                (item) => item.value == book?.mental?.degree,
              )?.name || '') + ')'
              : ''
              }`}
            className="col-span-3"
          />
        </div>

        {/* 障がいの状況 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          障がいの状況
        </div>
        <div className="col-span-6 border-collapse border px-2">
          {content?.failureSituation || ''}
        </div>

        {/* 既往歴 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          既往歴
        </div>
        <div className="col-span-6 grid grid-cols-6">
          {history?.map((item, index) => (
            <span key={index} className="col-span-6 grid grid-cols-6">
              <div className="col-span-1 border-collapse border px-2">
                (病名)
              </div>
              <div
                key={`${index}-001`}
                className="col-span-2 border-collapse border px-2"
              >
                {item.name || ''}
              </div>
              <div className="col-span-1 border-collapse border px-2">
                医療機関
              </div>
              <div
                key={`${index}-002`}
                className="col-span-2 border-collapse border px-2"
              >
                {item.medical || ''}
              </div>
            </span>
          ))}
        </div>

        {/* アレルギー */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          アレルギー
        </div>
        <div className="col-span-6 border-collapse border px-2">
          {content?.allergy || ''}
        </div>

        {/* 身長 */}
        <div className="col-span-1 border-collapse content-center text-wrap border text-center">
          身長
        </div>
        <div className="col-span-6 grid grid-cols-11">
          <div className="col-span-2 border-collapse border px-2">
            {physicalInfo?.height || ''}cm
          </div>
          <div className="col-span-2 border-collapse border px-2">体重</div>
          <div className="col-span-1 border-collapse border px-2">
            {physicalInfo?.weight || ''}kg
          </div>
          <div className="col-span-2 border-collapse border px-2">運動習慣</div>
          <div className="col-span-4 border-collapse border px-2">
            <InputCheckboxRadio
                checked={physicalInfo?.lifestyle?.has === false}
                label="なし"
            />
            <InputCheckboxRadio
                checked={physicalInfo?.lifestyle?.has === true}
                label={`あり${physicalInfo?.lifestyle?.has && physicalInfo?.lifestyle?.contents ? '(' + physicalInfo?.lifestyle?.contents + ')' : ''}`}
                className="mr-2"
            />
          </div>
        </div>

        {/* 起床・入眠 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          起床・入眠
        </div>
        <div className="col-span-6 grid grid-cols-11">
          <div className="col-span-2 border-collapse border-r px-2">
            起床{physicalInfo?.wakeUpTime || '__'}時頃
          </div>
          <div className="col-span-2  border-collapse border-r px-2">
            入眠{physicalInfo?.sleepingTime || '__'}時頃
          </div>
          <div className="col-span-1  border-collapse border-r px-2">お酒</div>
          <div className="col-span-2 border-collapse border-r px-2">
            <InputCheckboxRadio
              checked={physicalInfo?.alcohol?.has === true}
              label="飲む"
              className="mr-2"
            />
            <InputCheckboxRadio
              checked={physicalInfo?.alcohol?.has === false}
              label="飲まない"
            />
          </div>
          <div className="col-span-1  border-collapse border-r px-2">
            たばこ
          </div>
          <div className="col-span-3  border-collapse px-2">
            <InputCheckboxRadio
              checked={physicalInfo?.tobacco?.has === true}
              label="吸う"
              className="mr-2"
            />
            <InputCheckboxRadio
              checked={physicalInfo?.tobacco?.has === false}
              label="吸わない"
            />
          </div>
        </div>
      </div>
    </>
  );
};
