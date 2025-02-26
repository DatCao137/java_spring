import React from 'react';
import { CalendarInput, CalendarRangeInput, FreeText, TextInput, YearInput } from './Layout';

export interface BaseLayoutProps {
    form: any;
    disabled?: boolean;
}

export const BaseLayout = React.forwardRef<HTMLElement, BaseLayoutProps>(
    ({ form, disabled = false }, ref) => {
        return (
            <>
                <div className="grid grid-cols-12">
                    <div className="col-span-2 border border-solid border-gray-400 pr-1 year-input">
                        <YearInput disabled={disabled} form={form} path={'year'} />
                    </div>
                    <div className="col-span-3 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                        <span className="w-full text-center">個別支援計画書</span>
                    </div>
                    <div className="col-span-2 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                        <span className="w-full text-center">利用者氏名</span>
                    </div>
                    <div className="col-span-2 border border-solid border-gray-400">
                        <TextInput disabled={disabled} form={form} path={'userName'} />
                    </div>
                    <div className="col-span-1 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                        <span className="w-full text-center">作成日</span>
                    </div>
                    <div className="col-span-2 border border-solid border-gray-400">
                        <CalendarInput disabled={disabled} form={form} path={'createDate'} />
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-2 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                        <span className="w-full text-center">ホーム名</span>
                    </div>
                    <div className="col-span-3 border border-solid border-gray-400">
                        <TextInput disabled={disabled} form={form} path={'name'} />
                    </div>

                    <div className="col-span-2 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                        <span className="w-full text-center">計画期間</span>
                    </div>
                    <div className="col-span-5 border border-solid border-gray-400">
                        <CalendarRangeInput disabled={disabled} form={form} pathFrom={'planFrom'} pathTo={'planTo'} />
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                            <span className="w-full text-center">利用者の希望・要望</span>
                        </div>
                        <div className="w-full border border-solid border-gray-400 user-request">
                            <FreeText disabled={disabled} form={form} path={'userRequest'} />
                        </div>

                        <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                            <span className="w-full text-center">保護者の希望・要望</span>
                        </div>
                        <div className="w-full border border-solid border-gray-400 parent-request">
                            <FreeText disabled={disabled} form={form} path={'parentRequest'} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                            <span className="w-full text-center">目指す生活（長期目標）</span>
                        </div>
                        <div className="w-full border border-solid border-gray-400 desired-life">
                            <FreeText disabled={disabled} form={form} path={'desiredLife'} />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                <span className="w-full text-center">支援内容</span>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                <span className="w-full text-center">目標</span>
                            </div>
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                <span className="w-full text-center">実現したいこと、希望する生活</span>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                <span className="w-full text-center">取り組むこと（自分がすること）</span>
                            </div>
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                <span className="w-full text-center">自分が、がんばるところ、がんばりたいところ</span>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                <span className="w-full text-center">職員がサポートすること</span>
                            </div>
                            <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                <span className="w-full text-center">支援員に手伝ってほしいこと。助けてほしいこと。配慮してほしいこと。</span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="w-full grid grid-cols-12">
                                <div className="col-span-10">
                                    <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                        <span className="w-full text-center">頻度</span>
                                    </div>
                                    <div className="w-full grid grid-cols-12">
                                        <div className="col-span-3 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                            <span className="w-full text-center">いつ</span>
                                        </div>
                                        <div className="col-span-3 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                            <span className="w-full text-center">どこで</span>
                                        </div>
                                        <div className="col-span-3 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                            <span className="w-full text-center">誰に</span>
                                        </div>
                                        <div className="col-span-3 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center sub-header">
                                            <span className="w-full text-center">備考</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center h-full">
                                        <span className="w-full text-center">優先度</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'dailyLife'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'job1'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'support1'} />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="w-full grid grid-cols-12 h-full">
                                    <div className="col-span-10">
                                        <div className="w-full grid grid-cols-12 h-full">
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'frequency1'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'where1'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'forWhom1'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'comment1'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full border border-solid border-gray-400 h-full">
                                            <TextInput disabled={disabled} form={form} path={'priority1'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="col-span-2">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'provideMeals'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'job2'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'support2'} />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="w-full grid grid-cols-12 h-full">
                                    <div className="col-span-10">
                                        <div className="w-full grid grid-cols-12 h-full">
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'frequency2'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'where2'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'forWhom2'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'comment2'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full border border-solid border-gray-400 h-full">
                                            <TextInput disabled={disabled} form={form} path={'priority2'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="col-span-2">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'nursingCare'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'job3'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'support3'} />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="w-full grid grid-cols-12 h-full">
                                    <div className="col-span-10">
                                        <div className="w-full grid grid-cols-12 h-full">
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'frequency3'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'where3'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'forWhom3'} />
                                            </div>
                                            <div className="col-span-3 border border-solid border-gray-400">
                                                <TextInput disabled={disabled} form={form} path={'comment3'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full border border-solid border-gray-400 h-full">
                                            <TextInput disabled={disabled} form={form} path={'priority3'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">入院時の支援について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'supportDuringHospitalization'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">帰宅時の支援について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'supportWhenReturningCountry'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">医療連携に係る支援について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'medicalSupport1'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">日中支援について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'medicalSupport2'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">夜間支援について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'nightSupport'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">自立生活支援について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'independentLivingSupport'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">居宅介護等の利用について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'useHomeCare'} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                                    <span className="w-full text-center">地域移行について</span>
                                </div>
                                <div className="w-full border border-solid border-gray-400 container-textarea">
                                    <FreeText disabled={disabled} form={form} path={'regionalMigration'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
);
