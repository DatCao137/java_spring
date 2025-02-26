import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from "react";
import { Item } from "./Item";
import { Choices, TypeCalcMaster } from "@/features/office-management/types/CalcInfo";
import { useFormContext } from "react-hook-form";
import { CalcItemDto } from "@/features/office-management/components/calc/CalcCreateOrEdit";
import { jsonParse } from "@/utils/JsonUtils";
import { checkDataDifferent } from "../common/CommonUtils";
import { defaultValues, SaveCalcRequestDto } from "@/features/office-management/validator/CalcFormSchema";

interface props {
  branchId: number;
  defines: TypeCalcMaster[];
  isUpdated: Dispatch<SetStateAction<boolean>>;
  data?: CalcItemDto[];
}
export const DefChoice: Choices = { type: 'radio', items: [], selected: undefined, readonly: false };

export const List = forwardRef(
  ({ branchId, defines, isUpdated, data }: props, ref: any) => {
    const [ loaded, setLoaded ] = useState<boolean>(false);
    const [ oldData, setOldData] = useState<SaveCalcRequestDto>(defaultValues);

    const form = useFormContext<SaveCalcRequestDto>();

    const setRecvData = (data: CalcItemDto[]) => {
      defines.forEach((item, idx) => {
        form.setValue(`item.${idx}.branchId`, branchId);
        form.setValue(`item.${idx}.calcItemsId`, item.id);
        form.setValue(`item.${idx}.value`, []);
        // setup for form value
        const choice: Choices = jsonParse('choices', item.choices, DefChoice);
        const tgt = data.filter((dataItem) => dataItem.calcItemsId == item.id);
        if (tgt.length == 0) {
          if (choice.selected && choice.items.includes(choice.selected))
            form.setValue(`item.${idx}.value`, choice.selected);
        } else {
          let val;
          let wk: string[] = jsonParse('vals', tgt[0].value as string, []);
          switch (choice.type) {
            case 'radio': val = wk[0]; break;
            case 'check': val = wk; break;
          }
          form.setValue(`item.${idx}.id`, tgt[0].id);
          form.setValue(`item.${idx}.value`, val);
          form.setValue(`item.${idx}.startDate`, tgt[0].startDate);
          form.setValue(`item.${idx}.notificationDate`, tgt[0].notificationDate);
          form.setValue(`item.${idx}.validStartDate`, tgt[0].validStartDate);
          form.setValue(`item.${idx}.validEndDate`, tgt[0].validEndDate);
          form.setValue(`item.${idx}.remark`, tgt[0].remark);
          form.setValue(`item.${idx}.updatedAt`, tgt[0].updatedAt);
        }
        form.setValue(`item.${idx}.requiredNotificationDate`, false);
      })
      setOldData(structuredClone(form.getValues()));
      setLoaded(true);
    }

    useEffect(() => {
      let wk = structuredClone(form.getValues());
      wk.item.forEach((item) => item.requiredNotificationDate = false);
      isUpdated(checkDataDifferent(oldData, wk));
    }, [ form.watch() ]);

    useEffect(() => {
      if (data) {
        setRecvData(data);
      } else {
        setLoaded(false);
      }
    }, [data]);

    if (!loaded) return (<></>);
    return (<>
      <table className="min-w-full border-separate border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 calc-table-type">区分</th>
            <th className="border border-gray-300 calc-table-name">名称</th>
            <th className="border border-gray-300 calc-table-select">選択肢</th>
            <th className="border border-gray-300 calc-table-date">適用開始日</th>
            <th className="border border-gray-300 calc-table-date">届出日</th>
            <th className="border border-gray-300 calc-table-period">有効期間</th>
            <th className="border border-gray-300 calc-table-remark">備考</th>
          </tr>
        </thead>
        <tbody>
          {defines && defines.map((item, index) => {
            return (
              <Item index={index} defines={defines} form={form} />
            )
          })}
        </tbody>
      </table>
    </>);
  })