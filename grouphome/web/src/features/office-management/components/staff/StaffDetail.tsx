import { useState, useEffect } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { StaffDetail as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { Positioning, Qualification, StaffDetailFormData } from '../../types/Staff';
import { toJPDate } from '@/utils/DateUtils';
import { Button } from '@/components/ui/button';

type ArgsData = {
    tgtId: number | null;
    seq: number;
    cbLoaded: (data: StaffDetailFormData) => void;
    onEditBasic: (data: StaffDetailFormData) => void;
    onEditQualification: (data: StaffDetailFormData) => void;
}

const DefaultDisplayData: StaffDetailFormData = {
    id: null,
    nameSei: '',
    nameMei: '',
    kanaSei: '',
    kanaMei: '',
    birthDay: '',
    age: null,
    sex: '',
    businessNameSei: '',
    businessNameMei: '',
    businessNameKanaSei: '',
    businessNameKanaMei: '',
    mail: '',
    employeeNo: '',
    branchNames: '',
    homeNames: '',
    unitNames: '',
    businessContent: '',
    occupationId: null,
    occupation: null,
    employeeType: '',
    paymentForm: '',
    grade: '',
    positioning: [],
    enrollmentStatus: '',
    enrollmentStatusId: null,
    joinAt: '',
    enrollmentPeriod: '',
    leaveAt: '',
    leaveReason: '',
    address: {
        postNo: '',
        pref: '',
        city: '',
        town: '',
        postNo1st: '',
        postNo2nd: '',
        prefId: null
    },
    building: '',
    tel: '',
    holder: '',
    relationship: '',
    residentAddress: {
        postNo: '',
        pref: '',
        city: '',
        town: '',
        postNo1st: '',
        postNo2nd: '',
        prefId: null
    },
    residentBuilding: '',
    residentTel: '',
    residentHolder: '',
    residentRelationship: '',
    emergencyNameSei: '',
    emergencyNameMei: '',
    emergencyNameKanaSei: '',
    emergencyNameKanaMei: '',
    emergencyRelationship: '',
    emergencyTel: '',
    emergencyBuilding: '',
    emergencyAddress: {
        postNo: '',
        pref: '',
        city: '',
        town: '',
        postNo1st: '',
        postNo2nd: '',
        prefId: null
    },
    contractType: '',
    contractStartAt: '',
    contractEndAt: '',
    contractRenewalType: '',
    remainingSei: '',
    remainingMei: '',
    remainingMiddleName: '',
    remainingNo: '',
    remainingNationality: '',
    remainingStatus: '',
    remainingLimitAt: '',
    remainingPermission: null,
    remainingClass: '',
    twinsMore: null,
    scheduledBirthAt: '',
    birthAt: null,
    prenatalStartAt: null,
    postpartumEndAt: null,
    childcareStartAt: null,
    childcareEndAt: null,
    plannedReturnAt: null,
    usePlus: null,
    paymentFormId: null,
    gradeId: null,
    contractTypeId: null,
    contractRenewalTypeId: null,
    remainingNationalityId: null,
    remainingStatusId: null,
    remainingClassId: null,
    employeeTypeId: null,
    updatedAt: '',
    qualification: []
}


function StaffDetail({ tgtId, seq, onEditBasic, onEditQualification, cbLoaded }: ArgsData) {
    const [data, setData] = useState<StaffDetailFormData>(DefaultDisplayData);

    if (tgtId == null) {
        return <></>;
    }

    const getDetail = async () => {
        Post({
            apiPath: ApiPath,
            params: { id: tgtId },
            onSuccess: (res) => {
                const detail = res.data.data;
                const data = {
                    id: detail?.id ?? null,
                    branchId: detail?.branchId ?? null,
                    mainHomeId: detail?.mainHomeId ?? null,
                    subHomeId: detail?.subHomeId ?? null,
                    occupationId: detail?.occupationId ?? null,
                    nameSei: detail?.nameSei ?? '',
                    nameMei: detail?.nameMei ?? '',
                    kanaSei: detail?.kanaSei ?? '',
                    kanaMei: detail?.kanaMei ?? '',
                    birthDay: detail?.birthDay ?? '',
                    age: detail?.age ?? null,
                    sex: detail?.sex ?? '',
                    businessNameSei: detail?.businessNameSei ?? '',
                    businessNameMei: detail?.businessNameMei ?? '',
                    businessNameKanaSei: detail?.businessNameKanaSei ?? '',
                    businessNameKanaMei: detail?.businessNameKanaMei ?? '',
                    mail: detail?.mail ?? '',

                    employeeNo: detail?.employeeNo ?? '',
                    branchNames: JSON.parse(detail?.branchNames) ?? '',
                    homeNames: JSON.parse(detail?.homeNames) ?? '',
                    unitNames: JSON.parse(detail?.unitNames) ?? '',
                    businessContent: detail?.businessContent ?? '',
                    occupation: detail?.occupation ?? '',
                    employeeType: detail?.employeeType ?? '',
                    paymentForm: detail?.paymentForm ?? '',
                    grade: detail?.grade ?? '',

                    positioning: detail?.positioning ?? '',

                    enrollmentStatus: detail?.enrollmentStatus ?? '',
                    joinAt: detail?.joinAt ?? '',
                    enrollmentPeriod: detail?.enrollmentPeriod ?? '',
                    leaveAt: detail?.leaveAt ?? '',
                    leaveReason: detail?.leaveReason ?? '',

                    address: {
                        postNo: detail?.address.postNo ?? '',
                        pref: detail?.address.pref ?? '',
                        city: detail?.address.city ?? '',
                        town: detail?.address.town ?? '',
                        postNo1st: '',
                        postNo2nd: '',
                        prefId: detail?.address.prefId ?? null,
                    },
                    building: detail?.building ?? '',
                    tel: detail?.tel ?? '',
                    holder: detail?.holder ?? '',
                    relationship: detail?.relationship ?? '',
                    residentAddress: {
                        postNo: detail?.residentAddress.postNo ?? '',
                        pref: detail?.residentAddress.pref ?? '',
                        city: detail?.residentAddress.city ?? '',
                        town: detail?.residentAddress.town ?? '',
                        postNo1st: '',
                        postNo2nd: '',
                        prefId: detail?.residentAddress.prefId ?? null
                    },
                    residentBuilding: detail?.residentBuilding ?? '',
                    residentTel: detail?.residentTel ?? '',
                    residentHolder: detail?.residentHolder ?? '',
                    residentRelationship: detail?.residentRelationship ?? '',

                    emergencyNameSei: detail?.emergencyNameSei ?? '',
                    emergencyNameMei: detail?.emergencyNameMei ?? '',
                    emergencyNameKanaSei: detail?.emergencyNameKanaSei ?? '',
                    emergencyNameKanaMei: detail?.emergencyNameKanaMei ?? '',
                    emergencyRelationship: detail?.emergencyRelationship ?? '',
                    emergencyTel: detail?.emergencyTel ?? '',
                    emergencyAddress: {
                        postNo: detail?.emergencyAddress.postNo ?? '',
                        pref: detail?.emergencyAddress.pref ?? '',
                        city: detail?.emergencyAddress.city ?? '',
                        town: detail?.emergencyAddress.town ?? '',
                        postNo1st: '',
                        postNo2nd: '',
                        prefId: detail?.emergencyAddress.prefId ?? null
                    },
                    emergencyBuilding: detail?.emergencyBuilding ?? '',

                    contractType: detail?.contractType ?? '',
                    contractStartAt: detail?.contractStartAt ?? '',
                    contractEndAt: detail?.contractEndAt ?? '',
                    contractRenewalType: detail?.contractRenewalType ?? '',

                    remainingSei: detail?.remainingSei ?? '',
                    remainingMei: detail?.remainingMei ?? '',
                    remainingMiddleName: detail?.remainingMiddleName ?? '',
                    remainingNo: detail?.remainingNo ?? '',
                    remainingNationality: detail?.remainingNationality ?? '',
                    remainingStatus: detail?.remainingStatus ?? '',
                    remainingLimitAt: detail?.remainingLimitAt ?? '',
                    remainingPermission: detail?.remainingPermission ?? null,
                    remainingClass: detail?.remainingClass ?? '',

                    twinsMore: detail?.twinsMore ?? null,
                    scheduledBirthAt: detail?.scheduledBirthAt ?? '',
                    birthAt: detail?.birthAt ?? '',
                    prenatalStartAt: detail?.prenatalStartAt ?? '',
                    postpartumEndAt: detail?.postpartumEndAt ?? '',
                    childcareStartAt: detail?.childcareStartAt ?? '',
                    childcareEndAt: detail?.childcareEndAt ?? '',
                    plannedReturnAt: detail?.plannedReturnAt ?? '',
                    usePlus: detail?.usePlus ?? null,
                    paymentFormId: detail?.paymentFormId ?? null,
                    gradeId: detail?.gradeId ?? null,
                    contractTypeId: detail?.contractTypeId ?? null,
                    contractRenewalTypeId: detail?.contractRenewalTypeId ?? null,
                    remainingNationalityId: detail?.remainingNationalityId ?? null,
                    remainingStatusId: detail?.remainingNationalityId ?? null,
                    remainingClassId: detail?.remainingClassId ?? null,
                    employeeTypeId: detail?.employeeTypeId ?? null,
                    enrollmentStatusId: detail?.enrollmentStatusId ?? null,
                    updatedAt: detail?.updatedAt,
                    qualification: detail?.qualification ?? []
                };
                setData(data);
                cbLoaded(data);
            },
            onError: (err) => {
                setData(DefaultDisplayData);
                cbLoaded(DefaultDisplayData);
            }
        });
    };

    useEffect(() => {
        if (tgtId) {
            getDetail();
        }
    }, [tgtId, seq]);

    return (
        <>
            <div className="box p-6 bg-white border rounded-lg shadow">
                <span className="box-title text-xl font-bold mb-4 block">職員詳細情報</span>
                <div className="staff-detail-container space-y-6">
                    <div className='flex justify-end'>
                        <Button disabled className="btn-style" onClick={() => onEditBasic(data)}>編集</Button>
                    </div>
                    {/* 基本情報 Section */}
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">氏名</div>
                        <div className="col-span-3">
                            {data?.nameSei}{data?.nameMei}（{data?.kanaSei}{data?.kanaMei}）
                            <span className="ml-4">{toJPDate(data?.birthDay)}生（{data?.age}歳）{data?.sex === 'female' ? '女性' : (data?.sex === 'male' ? '男性' : '')}</span>
                        </div>

                        <div className="font-bold">ビジネスネーム</div>
                        <div className="col-span-3">{data?.businessNameSei}{data?.businessNameMei}（{data?.businessNameKanaSei}{data?.businessNameKanaMei}）</div>

                        <div className="font-bold">メールアドレス</div>
                        <div className="col-span-3">{data?.mail}</div>
                    </div>

                    <h3 className="font-bold text-red-400">業務情報</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4">
                        <div className="font-bold">社員番号</div>
                        <div>{data?.employeeNo}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">事業所</div>
                        <div>{data?.branchNames}</div>
                        <div className="font-bold">ホーム名</div>
                        <div>{data?.homeNames}</div>

                        <div></div>
                        <div></div>
                        <div className="font-bold">共同生活住居地</div>
                        <div>{data?.unitNames}</div>

                        <div className="font-bold">業務内容</div>
                        <div>{data?.businessContent}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">職種</div>
                        <div>{data?.occupation}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">雇用形態</div>
                        <div>{data?.employeeType}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">給与支給形態</div>
                        <div>{data?.paymentForm}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">等級</div>
                        <div>{data?.grade}</div>
                        <div></div>
                        <div></div>
                    </div>

                    {/* 部署・役職情報 Section */}
                    <h3 className="font-bold text-red-400">部署・役職情報</h3>
                    <div className="staff-detail-section mb-6">
                        <table className="table-auto w-full border">
                            <tbody>
                                {data?.positioning?.length > 0 ? (
                                    data.positioning.map((item: Positioning, index: number) => (
                                        <tr key={index}>
                                            <td className="font-bold px-4 py-2 border">部署{index + 1}:</td>
                                            <td className="px-4 py-2 border">{item.department || '-'}</td>
                                            <td className="font-bold px-4 py-2 border">役職{index + 1}:</td>
                                            <td className="px-4 py-2 border">{item.position || '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-2 border text-center">データがありません</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 入退社情報 Section */}
                    <h3 className="font-bold text-red-400">入退社情報</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">在籍状況</div>
                        <div>{data?.enrollmentStatus}</div>
                        <div className="font-bold">在籍期間</div>
                        <div>{data?.enrollmentPeriod}</div>

                        <div className="font-bold">入社年月日</div>
                        <div>{data?.joinAt}</div>
                        <div className="font-bold">退職事由</div>
                        <div>{data?.leaveReason}</div>

                        <div className="font-bold">退職年月日</div>
                        <div>{data?.leaveAt}</div>
                        <div></div>
                        <div></div>
                    </div>

                    {/* 現住所と連絡先 Section */}
                    <h3 className="font-bold text-red-400">現住所と連絡先</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">住所</div>
                        <div className="col-span-3">〒{data?.address.postNo} {data?.address.pref} {data?.address.city} {data?.address.town} {data?.building}</div>

                        <div className="font-bold">電話番号</div>
                        <div className="col-span-3">{data?.tel}</div>

                        <div className="font-bold">世帯主の氏名</div>
                        <div className="col-span-3">{data?.holder}（{data?.relationship}）</div>
                    </div>

                    {/* 住民票住所 Section */}
                    <h3 className="font-bold text-red-400">住民票住所</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">住所</div>
                        <div className="col-span-3">〒{data?.residentAddress.postNo} {data?.residentAddress.pref} {data?.residentAddress.city} {data?.residentAddress.town} {data?.residentBuilding}</div>

                        <div className="font-bold">電話番号</div>
                        <div className="col-span-3">{data?.residentTel}</div>

                        <div className="font-bold">世帯主の氏名</div>
                        <div className="col-span-3">{data?.residentHolder}（{data?.residentRelationship}）</div>
                    </div>

                    {/* 緊急連絡先 Section */}
                    <h3 className="font-bold text-red-400">緊急連絡先</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">氏名</div>
                        <div>{data?.emergencyNameSei}{data?.emergencyNameMei}（{data?.emergencyNameKanaSei}{data?.emergencyNameKanaMei}）</div>
                        <div className="font-bold">続柄</div>
                        <div>{data?.emergencyRelationship}</div>

                        <div className="font-bold">電話番号</div>
                        <div>{data?.emergencyTel}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">住所</div>
                        <div className='col-span-2'>
                            〒{data?.emergencyAddress.postNo} {data?.emergencyAddress.pref} {data?.emergencyAddress.city} {data?.emergencyAddress.town} {data?.emergencyBuilding}
                        </div>
                        <div></div>
                        <div></div>
                    </div>

                    {/* 雇用契約情報 Section */}
                    <h3 className="font-bold text-red-400">雇用契約情報</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">契約種別</div>
                        <div>{data?.contractType}</div>
                        <div></div>
                        <div></div>

                        <div className="font-bold">契約開始日</div>
                        <div>{data?.contractStartAt}</div>
                        <div className="font-bold">契約終了日</div>
                        <div>{data?.contractEndAt}</div>

                        <div className="font-bold">契約更新</div>
                        <div>{data?.contractRenewalType}</div>
                        <div></div>
                        <div></div>
                    </div>

                    {/* 在留資格情報 Section */}
                    <h3 className="font-bold text-red-400">在留資格情報</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">氏名（ローマ字）</div>
                        <div className='col-span-3'>{data?.remainingSei}{data?.remainingMei}</div>

                        <div className="font-bold">ミドルネーム（ローマ字）</div>
                        <div className='col-span-3'>{data?.remainingMiddleName}</div>

                        <div className="font-bold">在留カード番号</div>
                        <div className='col-span-3'>{data?.remainingNo}</div>

                        <div className="font-bold">国籍</div>
                        <div className='col-span-3'>{data?.remainingNationality}</div>

                        <div className="font-bold">在留資格</div>
                        <div className='col-span-3'>{data?.remainingStatus}</div>

                        <div className="font-bold">在留期限</div>
                        <div className='col-span-3'>{data?.remainingLimitAt}</div>

                        <div className="font-bold">資格外活動許可の有無</div>
                        <div className='col-span-3'>{data.remainingPermission === null ? '' : (data.remainingPermission ? '有' : '無')}</div>

                        <div className="font-bold">派遣・請負就労区分</div>
                        <div className='col-span-3'>{data?.remainingClass}</div>
                    </div>

                    {/* 産休・育休情報 Section */}
                    <h3 className="font-bold text-red-400">産休・育休情報</h3>
                    <div className="staff-detail-section grid grid-cols-4 gap-y-2 gap-x-4 mb-6">
                        <div className="font-bold">双子以上の出産</div>
                        <div className='col-span-3'>{data.twinsMore === null ? '' : (data.twinsMore ? '該当する' : '該当しない')}</div>
                        <div className="font-bold">出産予定日</div>
                        <div className='col-span-3'>{data?.scheduledBirthAt}</div>

                        <div className="font-bold">出産日</div>
                        <div className='col-span-3'>{data?.birthAt}</div>

                        <div className="font-bold">産前休業開始日</div>
                        <div className='col-span-3'>{data?.prenatalStartAt}</div>

                        <div className="font-bold">産後休業終了日</div>
                        <div className='col-span-3'>{data?.postpartumEndAt}</div>

                        <div className="font-bold">育児休業開始日1～6</div>
                        <div className='col-span-3'>{data?.childcareStartAt}</div>

                        <div className="font-bold">育児休業終了日1～6</div>
                        <div className='col-span-3'>{data?.childcareEndAt}</div>

                        <div className="font-bold">職場復帰予定日1～6</div>
                        <div className='col-span-3'>{data?.plannedReturnAt}</div>

                        <div className="font-bold">「パパママ育休プラス」制度を利用</div>
                        <div className='col-span-3'>{data.usePlus === null ? '' : (data.usePlus ? '有' : '無')}</div>
                    </div>
                    <h3 className="font-bold text-red-400">資格情報</h3>
                    <div className='flex justify-end'>
                        <Button className="btn-style" onClick={() => onEditQualification(data)}>編集</Button>
                    </div>
                    {data?.qualification?.length > 0 ? (
                        data.qualification.map((item: Qualification, index: number) => (item.hold || item.etcName) && (
                            <div key={index} className="staff-detail-section grid grid-cols-4 gap-y-2 pb-2">
                                {item.qualificationType !== 'etc' ? (
                                    <>
                                        <div className="font-bold">{item.qualificationName || '資格名なし'}</div>
                                    </>

                                ) : (
                                    <>
                                        <div className="font-bold">{item.qualificationName || '資格名なし'}</div>
                                        <div className="col-span-3 break-words">
                                            <pre>{item.etcName}</pre>
                                        </div>
                                    </>

                                )}
                            </div>
                        ))
                    ) : (
                        <div>資格情報がありません</div>
                    )}
                </div>
            </div>
        </>
    );

}

export { StaffDetail };