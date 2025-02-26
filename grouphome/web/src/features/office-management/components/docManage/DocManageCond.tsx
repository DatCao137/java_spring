import { useState, useEffect } from 'react'
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { Button } from '@/components/ui/button'
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';

function DocManageCond() {
    const [ selBranch, setSelBranch ] = useState([]);
    const [ selHome, setSelHome ] = useState([]);
    const [ selType, setSelType ] = useState([]);

    const [branchId, setBranchId] = useState('');

    const changeBranchId = (e: any) => {
        setBranchId(e.target.value);
    };     

    const [homeId, setHomeId] = useState('');

    const changeHomeId = (e: any) => {
        setHomeId(e.target.value);
    };  

    const [typeId, setTypeId] = useState('');

    const changeTypeId = (e: any) => {
        setTypeId(e.target.value);
    };  

    const getSelectData = async () => {
        Post({
            apiPath: ApiPath,
            params: { type: ['cust__branch', 'cust__home', 'doc_type'] },
            onSuccess: (res) => {
                setSelBranch(res.data.cust__branch);
                setSelHome(res.data.cust__home);
                setSelType(res.data.doc_type);
            }
        });
    }
    useEffect(() => {
        getSelectData();
    }, []);

    return (
<>
    <p className="bl_searchTitle">絞込条件</p>
    <div className='flex-field flex-fieldSearch'>
        <CommonSelect
            id='branchId'
            title='事業所'
            options={selBranch}
            value={branchId}
            onChange={changeBranchId}
        />
        <CommonSelect
            id='homeId'
            title='ホーム'
            options={selHome}
            value={homeId}
            onChange={changeHomeId}
        />
        <CommonSelect
            id='typeId'
            title='書類種別'
            options={selType}
            value={typeId}
            onChange={changeTypeId}
        />
    </div>
    <div className="bl_searchBtn">
        <Button children="検索" />
    </div>
</>
    )
}

export { DocManageCond }
