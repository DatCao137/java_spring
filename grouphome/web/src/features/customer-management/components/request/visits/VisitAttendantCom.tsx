import React from 'react';

import { VisitAttendant } from '@/features/customer-management/types/Request';

type attendantProps = {
  attendant: VisitAttendant;
};

export const visitAttendantDefault: VisitAttendant = {
  name: '',
  contact: {
    tel: '',
    fax: '',
    mail: '',
  },
};

export const VisitAttendantCom = ({ attendant }: attendantProps) => {
  return (
    <>
      <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
        お付添又は代理人の方
      </div>
      <div className="col-span-7 grid grid-cols-subgrid">
        {/* お名前 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            お名前
          </div>
          <div className="col-span-9 border-collapse border px-2">
            {attendant?.name || ''}
          </div>
        </div>

        {/* ご連絡先 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            ご連絡先
          </div>
          <div className="col-span-9 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1">
              電話 : {attendant?.contact?.tel || ''}
            </div>
            <div className="col-span-1">
              FAX : {attendant?.contact?.fax || ''}
            </div>
            <div className="col-span-1">
              メール : {attendant?.contact?.mail || ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
