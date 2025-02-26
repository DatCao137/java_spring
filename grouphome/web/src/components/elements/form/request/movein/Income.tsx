import { Checkbox } from "@/components/ui/Checkbox";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input as InputUI } from "@/components/ui/Input";
import { useFormContext } from "react-hook-form"

export const Income = () => {
  const form = useFormContext();
  const { watch } = form;
  const [
    pensionAvailable,
    welfareAvailable,
    pensionOtherAvailable,
    workingAvailable,
    familyAssistAvailable,
    othersAvailable,
  ] = watch([
    'contents.income.pension.available',
    'contents.income.welfare.available',
    'contents.income.pensionOther.available',
    'contents.income.working.available',
    'contents.income.familyAssist.available',
    'contents.income.others.available',
  ])
  return (
    <>
      <div className="mt-6">入居後収入</div>
      <div className="ml-6 grid grid-cols-12 border-collapse border p-2 space-x-2 space-y-2">
        <div className="col-span-6 lg:col-span-4 2xl:col-span-4 flex flex-row items-center mt-2 ml-2">
          <FormField
            control={form.control}
            name="contents.income.pension.available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">障害基礎/厚生年金{'('}月額</small>
          <FormField
            control={form.control}
            name="contents.income.pension.amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!pensionAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${pensionAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">円{')'}</small>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-3 flex flex-row items-center">
          <FormField
            control={form.control}
            name="contents.income.welfare.available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">生活保護{'('}月額</small>
          <FormField
            control={form.control}
            name="contents.income.welfare.amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!welfareAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${welfareAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">円{')'}</small>
        </div>
        <div className="col-span-6 lg:col-span-5 2xl:col-span-5 flex flex-row items-center">
          <FormField
            control={form.control}
            name="contents.income.pensionOther.available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">その他年金{'('}月額</small>
          <FormField
            control={form.control}
            name="contents.income.pensionOther.amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!pensionOtherAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${pensionOtherAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">円{')'}</small>
        </div>
        <div className="col-span-6 lg:col-span-4 2xl:col-span-4 flex flex-row items-center">
          <FormField
            control={form.control}
            name="contents.income.working.available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">就労収入{'('}月額</small>
          <FormField
            control={form.control}
            name="contents.income.working.amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!workingAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${workingAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">円{')'}</small>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-3 flex flex-row items-center">
          <FormField
            control={form.control}
            name="contents.income.familyAssist.available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">家族援助{'('}月額</small>
          <FormField
            control={form.control}
            name="contents.income.familyAssist.amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!familyAssistAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${familyAssistAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">円{')'}</small>
        </div>
        <div className="col-span-6 lg:col-span-5 2xl:col-span-5 flex flex-row items-center">
          <FormField
            control={form.control}
            name="contents.income.others.available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">その他{'('}</small>
          <FormField
            control={form.control}
            name="contents.income.others.name"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!othersAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${othersAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">月額</small>
          <FormField
            control={form.control}
            name="contents.income.others.amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <InputUI
                  type="text"
                  {...field}
                  disabled={!othersAvailable}
                  className={`ml-2 h-8 rounded-none border-0 border-b ${othersAvailable ? 'bg-[#e0e0e0e0]' : ''} text-right focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <small className="ml-2 text-nowrap">円{')'}</small>
        </div>
      </div>
    </>
  );
}