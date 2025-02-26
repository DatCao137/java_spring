import { HearingDetailResponseDto, HearingResponseDto, InquiryHearingDetailFormData } from "@/features/customer-management/types/Inquiry";
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Pencil } from "lucide-react";
import { formatJPDate } from "@/utils/DateUtils";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";

type CreateOrEditPopupProps = {
    data: HearingResponseDto | null;
    onCreateItemClick: () => void;
    onUpdateItemClick: (editForm: InquiryHearingDetailFormData) => void;
    onDeleteItemClick: (id: number | null) => void;
    hearingId: number | undefined;
}

export function InquiryDetailHearingCards({ data, onCreateItemClick, onUpdateItemClick, onDeleteItemClick, hearingId }: CreateOrEditPopupProps) {
    const { selectListData } = useSelectList();
    const selHearingStep = selectListData.get('hearing_step') || [];
    const handleCreate = () => {
        onCreateItemClick()
    };

    const handleUpdate = (item: InquiryHearingDetailFormData) => {
        onUpdateItemClick(item)
    };

    const handleDelete = (id: number | null) => {
        onDeleteItemClick(id)
    };

    return (
        <>
            <div className="flex flex-wrap w-full mt-1">

                <div className="mb-2 w-1/2"><span>ヒアリング内容</span></div>
                <div className="mb-2 w-1/2 flex justify-end gap-5 px-4">
                    <Button className="" onClick={handleCreate} children="追加" disabled={!hearingId} />
                </div>
            </div>

            <div className="w-full max-w-full overflow-x-scroll">
                {data?.inquiryHearingDetails?.length && data?.inquiryHearingDetails?.length > 0 ? (
                    <div className="tab-table-ruby flex w-full">
                        {data?.inquiryHearingDetails.map((item: InquiryHearingDetailFormData, index: any) => {
                            return (
                                <>
                                    <div key={index} className="w-full style-card">
                                        <div className="border border-gray-400 px-2 py-1 hearing-item-content">
                                            {!item.step ? '' : item.step > 5 ? `STEP${item.step}` : (selHearingStep.find(el => el.value === String(item.step)))?.name}
                                        </div>
                                        <div className="border border-gray-400 px-2 py-1 hearing-item-body whitespace-pre-line">
                                            {item.contents}
                                        </div>
                                        <div className="border border-t-0 border-collapse border-gray-400 grid grid-cols-12">
                                            <div className="grid grid-cols-12 col-span-12 md:col-span-4 lg:col-span-4 border-r border-gray-400 px-2">
                                                <div className='col-span-12 md:col-span-12 mb-1'>最終入力日</div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 lg:col-span-7">
                                                <div className='col-span-12 md:col-span-12 mb-1 px-2'>{formatJPDate(item.updatedAt || '', "YYYY/MM/DD", false)}</div>
                                            </div>
                                        </div>
                                        <div className="mt-1"><TableOpeButtons items={[
                                            { name: "編集", buttonType: ButtonType.Edit, cb: () => handleUpdate(item) },
                                            { name: "削除", buttonType: ButtonType.Del, cb: () => handleDelete(item.id) },
                                        ] as ButtonProps[]} /></div>

                                    </div>
                                </>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-40 w-full border border-gray-400 mb-2"></div>
                )}
            </div>
        </>
    )
}
