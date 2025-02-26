import { BasicInfo } from './BasicInfo';
import { Tabs } from './Tabs';

type props = {
  id: string | null | undefined,
}

export const Details = ({ id }: props) => {
  if (!id) return <></>;

  return (
    <div className="mt-5">
      <div className="text-left">
        利用者詳細
      </div>
      <div>
        <BasicInfo />
      </div>
      <div className='mt-5 mx-5'>
        <Tabs />
      </div>
    </div>
  )
}