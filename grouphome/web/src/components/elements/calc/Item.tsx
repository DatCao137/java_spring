import { forwardRef, useEffect, useState } from 'react'
import { Action, Available, Choices, Depend, Targets, TypeCalcMaster, Unvisible } from '@/features/office-management/types/CalcInfo';
import { jsonParse } from '@/utils/JsonUtils';
import { SelectOpt } from '../form/common/Common';
import { CommonInput } from '../form/common/CommonInput';
import { CommonRadio } from '../form/common/CommonRadio';
import { CommonCheck } from '../form/common/CommonCheck';
import { CommonDatePicker } from '../form/common/CommonDatePicker';
import { DefChoice } from './List';

interface props {
  index: number;
  defines: TypeCalcMaster[];
  form: any;
}
interface Results {
  target: { target: Targets, available: boolean }[],
  action: Action
}

export const Item = forwardRef(
  ({ defines, form, index }: props, ref: any) => {
    const define = defines[index];
    const choice: Choices = jsonParse('choices', define.choices, DefChoice);
    const depends: Depend[] = jsonParse('depends', define.depends, []);

    const [listOpt, setListOpt] = useState<SelectOpt[]>(
      choice.items.map((val) => {
        return { name: val, disabled: false, unvisible: false };
      }));
    const [watches, setWatches] = useState<string[]>([]);
    const [hidden, setHidden] = useState<boolean>(false);

    let readonly = choice.readonly;

    const handleDepend = () => {
      let status: Results[] = depends.map((item) => {
        return {
          target: item.targets.map((item) => {
            const [path, vals] = getPathAndItem(item);
            const nowData = form.watch(path);
            const result = includesArray(vals, Array.isArray(nowData) ? nowData : [nowData]);
            return { target: item, available: result };
          })
          , action: item.action
        }
      });
      let wkOpt: SelectOpt[] = listOpt.map((item) => {
        return { name: item.name, disabled: false, unvisible: false }
      });

      status.forEach((item) => {
        doAction(item, wkOpt);
      })
      if (listOpt.filter((item, idx) => item.disabled != wkOpt[idx].disabled
        || item.unvisible != wkOpt[idx].unvisible).length != 0) {
        setListOpt(wkOpt);
      }
    }

    const doAction = (result: Results, opt: SelectOpt[]) => {
      const tgtResult = result.target.filter((item) => item.available).length == result.target.length;
      const action = result.action;
      if (action?.unvisible) {
        if (action.unvisible.items == 'this') {
          // 項目非表示
          setHidden(tgtResult);
          if(tgtResult) {
            form.setValue(`item.${index}.value`, action.unvisible.value);
          }
        } else {
          setHidden(false);
          actionUnvisible(action.unvisible, tgtResult, opt);
        }
      }
      if (action?.available) {
        actionAvailable(action.available, tgtResult, opt);
      }
      if (action?.required) {
        form.setValue(`item.${index}.requiredNotificationDate`, tgtResult && action.required.notification);
      }
    }

    const actionUnvisible = (unvisible: Unvisible, tgtResult: boolean, opt: SelectOpt[]) => {
      opt.forEach((item) => {
        let include = unvisible.items.includes(item.name);
        if (include)
          item.unvisible = item.unvisible || (tgtResult == unvisible.selected);

        if (include && item.unvisible) {
          const path = `item.${index}.value`;
          let val = form.watch(path);
          switch (choice.type) {
            case "radio":
              if (val != unvisible.value)
                form.setValue(path, unvisible.value);
              break;
            case "check":
              val = unvisible.value
                ? (val ? [...val, item.name] : [item.name])
                : val?.filter((value: string) => value !== item.name) ?? [];
              if (!isEqualsArray(val, form.watch(path) ?? []))
                form.setValue(path, val);
              break;
          }
        }
      });
    }
    const actionAvailable = (available: Available, tgtResult: boolean, opt: SelectOpt[]) => {
      opt.forEach((item) => {
        let include = available.items.includes(item.name);
        if (include)
          item.disabled = item.disabled || !(tgtResult == (available?.selected ?? true));

        if (include && item.disabled) {
          const path = `item.${index}.value`;
          let val = form.watch(path);
          switch (choice.type) {
            case "radio":
              if (val != available.value)
                form.setValue(path, available.value);
              break;
            case "check":
              val = available.value
                ? (val ? [...val, item.name] : [item.name])
                : val?.filter((value: string) => value !== item.name) ?? [];
              if (val && !isEqualsArray(val, form.watch(path) ?? []))
                form.setValue(path, val);
              break;
          }
        }
      });
    }

    const isEqualsArray = (ary1: string[], ary2: string[]): boolean => {
      if (ary1.length != ary2.length) return false;
      return ary1.filter((item) => ary2.includes(item)).length == ary1.length;
    }
    const includesArray = (ary1: string[], ary2: string[]) => {
      const result = ary1.filter((val) => ary2.includes(val));
      return result.length != 0;
    }

    const setDepends = () => {
      let items: string[] = [];
      depends.forEach((item) => {
        let path = getNamesByTargets(item.targets);
        items = items.concat(path);
      })
      setWatches(items);
    }
    const getNamesByTargets = (tgts: Targets[]): string[] => {
      let path: string[] = [];
      tgts.forEach((item) => {
        const [val] = getPathAndItem(item);
        path.push(val);
      });
      return path;
    }
    const getPathAndItem = (tgt: Targets): [string, string[]] => {
      let idx = index;
      if (tgt.parent) {
        defines.filter((def, i) => {
          if (String(def.id) == tgt.parent)
            idx = i;
        })
      }
      return [`item.${idx}.value`, tgt?.items || []];
    }

    const choices = () => {
      switch (choice.type) {
        case 'radio':
          return (<>
            <div key={index} className="w-full option-column">
              <CommonRadio form={form}
                name={`item.${index}.value`}
                option={listOpt}
                groupClass='flex flex-row flex-wrap items-center space-x-1'
                itemClass='items-center space-x-3 space-y-0' />
            </div>
          </>);
        case 'check':
          return (<>
            <div className="flex flex-row flex-wrap items-center space-x-3">
              <CommonCheck form={form} name={`item.${index}.value`} items={listOpt} />
            </div>
          </>);
        default:
          return (<></>);
      }
    }

    const type = (define.type == 'add') ? '加算'
      : (define.type == 'del') ? '減算' : '';

    useEffect(() => {
      if (depends)
        setDepends();
    }, [])

    useEffect(() => {
      if (depends)
        handleDepend();
    }, [form.watch(watches)]);

    if (hidden) return <></>;

    return (<>
      <tr key={define.id}>
        <td className="border border-gray-300 p-1 calc-container-date">
          {type}
        </td>
        <td className="border border-gray-300 p-1 calc-container-date">
          {define.name}
        </td>
        <td className="border border-gray-300 p-1 calc-container-date">
          {choices()}
        </td>
        <td className="border border-gray-300 p-1 calc-container-date">
          <CommonDatePicker form={form} name={`item.${index}.startDate`} itemClass="w-full" />
        </td>
        <td className="border border-gray-300 p-1 calc-container-date">
          <CommonDatePicker form={form} name={`item.${index}.notificationDate`} itemClass="w-full" />
        </td>
        <td className="border border-gray-300 p-1">
          <div className={"w-full flex calc-container-date"}>
            <CommonDatePicker form={form} name={`item.${index}.validStartDate`} itemClass="calc-range-date" />
            <div className={"calc-range-key"}>~</div>
            <CommonDatePicker form={form} name={`item.${index}.validEndDate`} itemClass="calc-range-date" />
          </div>
        </td>
        <td className="border border-gray-300 p-1 calc-container-date">
          <CommonInput form={form} name={`item.${index}.remark`} type="text" itemClass="w-full" />
        </td>
      </tr>
    </>);
  })