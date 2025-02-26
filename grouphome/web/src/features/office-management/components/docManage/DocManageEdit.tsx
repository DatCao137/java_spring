import React, { useState, useEffect, Dispatch, SetStateAction  } from 'react'
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { CommonItemBox } from '@/components/elements/common/CommonItemBox';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { setValue } from '@/components/elements/common/CommonUtils';
import { ItemArgsData } from '@/components/elements/Common';

interface DocManageEditProps {
    formData: FormData|null;
    setFormData: Dispatch<SetStateAction<FormData>>;
}

export interface FormData {
    id: string;
    docName: string;
    fileName: string;
    comment: string;
    created_at: string;
    updated_at: string;
}

export const DocManageEdit: React.FC<DocManageEditProps> = ({ formData, setFormData }) => {
    const [ selOffice, setSelOffice ] = useState([]);
    const [ selHome, setSelHome ] = useState([]);
    const [ selType, setSelType ] = useState([]);
  
    const handleInputChange = (e: any) => {
        setValue<FormData>(e, setFormData);
    };
  
    const getSelectData = async () => {
        Post({
            apiPath: ApiPath,
            params: { type: ['office', 'home', 'docType'] },
            onSuccess: (res) => {
                setSelOffice(res.data.office);
                setSelHome(res.data.home);
                setSelType(res.data.docType);
            }
        });
    }
    useEffect(() => {
        getSelectData();
    }, []);
 
    const items:ItemArgsData[] = [
        { title: { label:'文書名' }, val: { val:(<CommonSelect id="docName" title="" value={formData?.docName??""} options={selOffice} onChange={handleInputChange}/>) }},
        { title: { label:'ファイル' }, val: { val:(<CommonSelect id="fileName" title="" value={formData?.fileName??""} options={selHome} onChange={handleInputChange}/>) }},
        { title: { label:'コメント' }, val: { val:(<CommonSelect id="comment" title="" value={formData?.comment??""} options={selType} onChange={handleInputChange}/>) }},
    ]; 

    return (
<div className='box'>
    <CommonItemBox arrayData={items} />
</div>
)
}
