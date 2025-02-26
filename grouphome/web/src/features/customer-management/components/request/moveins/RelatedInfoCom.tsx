import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { ContentMoveIn } from '@/features/customer-management/types/Request';
import { getAddress } from '@/utils/Helper';

type props = {
  content: ContentMoveIn;
};

export const RelatedInfoCom = ({ content }: props) => {
  const { selectListData } = useSelectList();
  const prefectures = selectListData.get('prefectures')?.filter((e) => e.value) || [];
  const { doctor, caseWorker } = content.related;
  return (
    <>
      <div className="mt-6">関係機関</div>
      <div className="ml-6 grid grid-cols-9">
        {/* Line 1 */}
        <div className="col-span-1 border-collapse content-center border text-center">
          主治医
        </div>
        <div className="col-span-8 border-collapse border">
          <div className="col-span-8 grid grid-cols-9 px-2">
            <div className="col-span-3">病院名 : {doctor?.hospital || ''}</div>
            <div className="col-span-3">科 : {doctor?.medicine || ''}</div>
            <div className="col-span-3">医師名 : {doctor?.name || ''}</div>
            <div className="col-span-9">
              住所 : 〒 
              {(doctor?.address?.postNo1st || '') + '-' + (doctor?.address?.postNo2nd || '')}{' '}
              {getAddress(prefectures, doctor?.address)}
            </div>
            <div className="col-span-3">
              電話 : (病院) {doctor?.contact?.tel || ''}
            </div>
            <div className="col-span-3">
              (携帯) {doctor?.contact?.mobile || ''}
            </div>
            <div className="col-span-3">(FAX) {doctor?.contact?.fax || ''}</div>
          </div>
        </div>
        {/* Line2 */}
        <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
          担当ケースワーカー
        </div>
        <div className="col-span-8 border-collapse border">
          <div className="col-span-8 grid grid-cols-9 px-2">
            <div className="col-span-3">
              機関名 : {caseWorker?.institutionName || ''}
            </div>
            <div className="col-span-6">氏名 : {caseWorker?.name || ''}</div>
            <div className="col-span-3">
              電話 : (機関) {caseWorker?.contact?.tel || ''}
            </div>
            <div className="col-span-3">
              (携帯) {caseWorker?.contact?.mobile || ''}
            </div>
            <div className="col-span-3">
              (FAX) {caseWorker?.contact?.fax || ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
