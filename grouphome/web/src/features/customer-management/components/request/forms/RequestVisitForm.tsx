import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/Form';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { RequestSave } from '@/features/blc-common/assets/ApiPath';
import ErrorManager from '@/features/blc-common/utils/ErrorManager';
import formSchema, { defaultValues } from '@/features/customer-management/validator/request/RequestVisitFormSchema';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { formatJPDate, getJPDateWithTimezone } from '@/utils/DateUtils';
import { deepMerge } from '@/utils/Helper';

import { ContentVisit } from '@/features/customer-management/types/Request';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { optionNoYes } from '@/components/elements/form/RadioChoices';
import { ItemBuilder } from '@/components/elements/form/ItemBuilder';
import { Header } from '@/components/elements/form/Header';
import { Office } from '@/components/elements/form/Office';
import { AttendantContact, AttendantName } from '@/components/elements/form/request/visit/Attendants';
import { Age, Attached, Contact, Desired, Disability, DisabilityType, Name, PocketBook, Recipient, Sex, Visiting } from '@/components/elements/form/request/visit/Contents';
import { Etc, Remark } from '@/components/elements/form/request/visit/Other';
import { DesiredItem } from '@/components/elements/form/request/visit/DesiredItem';
import { PostalAddress } from '@/features/blc-common/components/PostalAddress';
import { checkDataDifferent, compareDataDifferent, closeX } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupButtons } from '@/components/elements/PopupButtons';

const HOPE_ITEM = 'hope_items';
const HOME_INFOS = 'home-infos';
const SEX = 'sex';
const POCKET_BOOK = 'pocket_book';
const SUPPORT_TYPE = 'support_type';
const ATTRIBUTE = 'attendant_attr';

const requestItems = [
  { name: '見学', value: 'VISIT' },
  { name: '体験入居', value: 'EXP' },
];

type props = {
  onCancelClick: () => void;
  data?: any;
  contents: ContentVisit;
};

const HOPE_ITEM_OTHERS = '10'

export const RequestVisitForm = forwardRef(
  ({ onCancelClick, data, contents }: props, ref: any) => {
    const [isMatchedTown, setIsMatchedTown] = useState(true);
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
      isOpen: false,
      textConfirm: '',
      message: '',
      isShowCancel: true,
      confirmAction: () => { },
      onClose: () => handleCloseConfirm()
    });
    const formRef = useRef(ref);
    const { selectListData } = useSelectList();
    const hopeItems =
      selectListData.get(HOPE_ITEM)?.filter((e) => e.value) || [];
    const homeInfos =
      selectListData.get(HOME_INFOS)?.filter((e) => e.value) || [];
    const sexes = selectListData.get(SEX)?.filter((e) => e.value) || [];
    const pocketBooks =
      selectListData.get(POCKET_BOOK)?.filter((e) => e.value) || [];
    const supportTypes =
      selectListData.get(SUPPORT_TYPE)?.filter((e) => e.value) || [];
    const attributes =
      selectListData.get(ATTRIBUTE)?.filter((e) => e.value) || [];

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues,
      reValidateMode: 'onChange',
    });

    useEffect(() => {
      if(Object.keys(form.formState.errors).length != 0)
      console.log("バリデーションエラー : ", form.formState.errors);
    }, [ form.formState.errors ]);

    useEffect(() => {
      if (data) {
        const { requestInfo } = data;
        form.setValue(
          'requestDate',
          requestInfo.requestDate
            ? formatJPDate(String(new Date(requestInfo.requestDate)), "YYYY-MM-DD")
            : formatJPDate(String(new Date()), "YYYY-MM-DD"),
        );
        form.setValue('requestItem', requestInfo?.requestItemOriginal || '');
        form.setValue('homeId', requestInfo?.homeId?.toString() || '');
        form.setValue('remark', requestInfo?.remark || '');
        form.setValue(
          'attendant',
          deepMerge(defaultValues.attendant, contents.attendant as any),
        );
        form.setValue(
          'desired',
          deepMerge(defaultValues.desired, contents.desired as any),
        );
        form.setValue(
          'desiredDate',
          deepMerge(
            defaultValues.desiredDate,
            requestInfo?.desiredDateOriginal || '{}',
          ),
        );
        form.setValue('etc', contents.etc);
        form.setValue(
          'base',
          deepMerge(defaultValues.base, contents.base as any),
        );
      }
    }, [data]);

    const [visitingHas, attachedHas] = form.watch(['base.visiting.has', 'base.attached.has']);

    useImperativeHandle(formRef, () => ({
      reset: () => {
        return form.reset();
      },
    }));
    
    const handleClosePopup = () => {
      let oldForm :any = JSON.parse(JSON.stringify(defaultValues))
      let newForm :any = form.getValues()
      oldForm['base']['address'] = {
        postNo1st: "",
        postNo2nd: "",
        postNo: "",
        prefId: null,
        city: "",
        town: ""
      }
      oldForm['postNo1st'] = '';
      oldForm['postNo2nd'] = '';
      oldForm['prefId'] = '';
      oldForm['town'] = '';
      if (newForm['desired'].hasOwnProperty('count')) {
        oldForm['desired']['count'] = null;
      }
      if (newForm['desiredDate']['first'].hasOwnProperty('date')) {
        oldForm['desiredDate']['first']['date'] = null;
      }
      if (newForm['desiredDate']['second'].hasOwnProperty('date')) {
        oldForm['desiredDate']['second']['date'] = null;
      }
      if (newForm['base']['hopeItems'].length == 0 || !newForm['base']['hopeItems'].includes(HOPE_ITEM_OTHERS)) {
        newForm['base']['hopeOther'] = null;
      }
      if (newForm['base']['disability']['pocketbook']['has'] != true) {
        newForm['base']['disability']['pocketbook']['contents'] = null;
      }
      if (newForm['base']['visiting']['has'] != true) {
        newForm['base']['visiting']['contents'] = null;
      }
      if (newForm['base']['attached']['has'] != true) {
        newForm['base']['attached']['contents'] = null;
      }
      oldForm['requestDate'] = new Date();
      if (newForm.hasOwnProperty('city')) {
        oldForm['city'] = null;
      }
      if (newForm['base'].hasOwnProperty('age')) {
        oldForm['base']['age'] = null;
      }
      if (newForm['base']['contact'].hasOwnProperty('mail')) {
        oldForm['base']['contact']['mail'] = null;
      }
      if (newForm['attendant']['contact'].hasOwnProperty('mail')) {
        oldForm['attendant']['contact']['mail'] = null;
      }
      if (newForm['base']['disability'].hasOwnProperty('type')) {
        oldForm['base']['disability']['type'] = null;
      }

      if (data) {
        let { requestInfo } = data;
        oldForm['requestDate'] = requestInfo.requestDate ? new Date(requestInfo.requestDate) : new Date();
        oldForm['requestItem'] = requestInfo?.requestItemOriginal || '';
        oldForm['homeId'] = requestInfo?.homeId?.toString() || '';
        oldForm['remark'] = requestInfo?.remark || '';
        oldForm['attendant'] = deepMerge(defaultValues.attendant, contents.attendant as any);
        oldForm['desired'] = deepMerge(defaultValues.desired, contents.desired as any);
        oldForm['desiredDate'] = deepMerge(
          defaultValues.desiredDate,
          requestInfo?.desiredDateOriginal || '{}',
        );
        oldForm['etc'] = contents.etc ?? null;
        oldForm['base'] = deepMerge(defaultValues.base, contents.base as any);
        oldForm['base']['address']['prefId'] = oldForm['base']['address']['prefId'] ? oldForm['base']['address']['prefId'].toString() : null;
        if (newForm['base']['address'].hasOwnProperty('postNo')) {
          let postNo = oldForm['base']['address']['postNo1st'] + oldForm['base']['address']['postNo2nd']
          oldForm['base']['address']['postNo'] = postNo == 0 ? null : postNo;
        }
      }

      if (!compareDataDifferent(oldForm, newForm)) {
        setConfirmParam(prevState => ({
          ...prevState, 
          textConfirm: '閉じる',
          isShowCancel: true,
          message: TEXT_CONFIRM_DATA_CHANGE,
          confirmAction: () => onCancelClick(),
          isOpen: true
        }));
      } else {
        onCancelClick();
      }
    };

    const handleCloseConfirm = () => {
      setConfirmParam(prevState => ({
        ...prevState,
        isOpen: false
      }));
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const content = {
          base: values.base,
          attendant: values.attendant,
          desired: values.desired,
          etc: values.etc,
        };

        const representativeInfo = {
          name: values.attendant.name,
          tel: values.attendant.contact.tel,
        };

        const dto = {
          requestInfoId: data?.requestInfo?.id || null,
          requestInfoDetailId: data?.requestInfo?.requestInfoDetailId || null,
          name: values.base.name,
          requestDate: getJPDateWithTimezone(values.requestDate || ''),
          requestType: values.requestType,
          homeId: values.homeId,
          desiredDate: values.desiredDate ? values.desiredDate : null,
          representativeInfo: representativeInfo,
          remark: values.remark,
          contents: content,
          requestItem: values.requestItem,
          infoUpdatedAt: data?.requestInfoDetail?.infoUpdatedAt || null,
          detailUpdatedAt: data?.requestInfoDetail?.detailUpdatedAt || null,
        };
        if (isMatchedTown === false) {
          setConfirmParam(prevState => ({
            ...prevState,
            textConfirm: 'OK',
            isShowCancel: true,
            message: '郵便番号と住所が一致しませんが保存してよろしいですか？',
            confirmAction: () => doSave(dto),
            isOpen: true
          }));
          return;
        } else {
          doSave(dto);
        }

      } catch (error: any) {
        console.log(error);
        ErrorManager.showErrors(error.response.data);
      }
    };

    const doSave = (data: any) => {
      Post({
        apiPath: RequestSave,
        params: data,
        message: '見学・体験を' + (data?.requestInfo?.id ? '追加' : '更新') + 'しました。',
        onSuccess: (res) => {
          onCancelClick();
        }
      });
    };

    const handleCloseX = closeX()
    handleCloseX((e: any) => {
      e.preventDefault();
      handleClosePopup();
    })

    const itemAddress = (
      <div className="col-span-9 border-collapse border px-2">
        <PostalAddress
          formData={{
            ...contents.base.address,
            postNo: (contents?.base?.address?.postNo1st || '') + (contents.base.address.postNo2nd || ''),
          }}
          register={form.register}
          errors={form.formState.errors?.base?.address}
          onChange={(data) => form.setValue("base.address", data)}
          isMatchedTown={setIsMatchedTown}
          opts={{
            showLabel: false,
            showPlaceHolder: false,
            className: 'relative border-none text-gray-700 space-y-1 p-2'
          }}
        />
      </div>
    )

    const baseLayout = [
      {
        label: "root", child: [
          { label: "希望事業所", sub: { span: 7, cols:7, child: [ {ele: <Office form={form} list={homeInfos} /> }]}  },
          {
            label: "希望内容", sub: {
              span: 7, child: [
                { ele: <Desired form={form} list={hopeItems} /> },
                {
                  sub: {
                    span: 7, cols: 10, child: [
                      { label: "お名前", ele: <Name form={form} /> },
                      {
                        sub: {
                          span: 4, child: [
                            { label: "性別", ele: <Sex form={form} list={sexes} /> },
                            { label: "ご年齢", ele: <Age form={form} /> }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  sub: {
                    span: 7, cols: 10, child: [
                      { label: "ご住所", ele: itemAddress }
                    ]
                  }
                },
                {
                  sub: {
                    span: 7, cols: 10, child: [
                      { label: "ご連絡先", ele: <Contact form={form} /> }
                    ]
                  }
                },
                {
                  sub: {
                    span: 7, cols: 10, child: [
                      { label: "障がい名", ele: <Disability form={form} /> },
                      { label: "障がい支援区分", span: 2, ele: <DisabilityType form={form} list={supportTypes} /> }
                    ]
                  }
                },
                {
                  sub: {
                    span: 7, cols: 10, child: [
                      { label: "障がい者手帳の有無", ele: <PocketBook form={form} list={pocketBooks} /> },
                      { label: "受給者証の有無", span: 2, ele: <Recipient form={form} /> }
                    ]
                  }
                },
                { sub: { span: 7, cols: 10, child: [{ label: "通所先", ele: <Visiting form={form} list={optionNoYes} has={visitingHas} /> }] } },
                { sub: { span: 7, cols: 10, child: [{ label: "添付書類", ele: <Attached form={form} list={optionNoYes} has={attachedHas} /> }] } }
              ]
            }
          },
          {
            label: "お付添又は代理人の方", sub: {
              span: 7, cols: 10, child: [
                {
                  child: [{ label: "お名前", ele: <AttendantName form={form} /> },
                  { label: "ご連絡先", ele: <AttendantContact form={form} /> }]
                }
              ]
            }
          },
          { label: "希望日時", sub: { span: 7, child: [{ ele: <DesiredItem form={form} list={attributes} /> }] } },
          { label: "その他ご要望等ございましたらご記入ください", ele: <Etc form={form} /> },
          { label: "補足", ele: <Remark form={form} /> }
        ]
      }
    ];
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="container rounded border border-black p-5">
              <Header control={form.control} requestItems={requestItems} pathItem='requestItem' pathDate='requestDate' />
              <ItemBuilder layout={baseLayout} className='mt-5 grid grid-cols-8'/>
            </div>
            <PopupButtons title="保存" onClose={handleClosePopup} />
          </form>
        </Form>
        <PopupConfirm param={confirmParam} />
      </div>

    );
  },
);
RequestVisitForm.displayName = 'requestVisitForm';
