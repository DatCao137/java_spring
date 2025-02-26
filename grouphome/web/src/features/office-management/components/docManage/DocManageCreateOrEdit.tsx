import React, { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useState, useRef } from 'react';
import { setValue } from '@/components/elements/common/CommonUtils';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { CommonInputFile} from '@/components/elements/common/CommonInputFile';
import { useForm } from 'react-hook-form';
import { DocManageValidation } from '@/features/office-management/validations/document';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateOrEditPopupProps {
    formData: FormData | null;
    setFormData: Dispatch<SetStateAction<FormData>>;
}

export interface FormData {
    id: number;
    docId: number;
    docName: string;
    fileName: string;
    dataFile: File | null;
    comment: string;
    created_at: string;
    updated_at: string;
}

const DocManageCreateOrEdit = forwardRef(({ formData, setFormData }: CreateOrEditPopupProps, ref) => {
    
    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(DocManageValidation),
        defaultValues: formData || {},
    });

    // Expose validateForm function to parent component
    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const isValid = await trigger();
            return isValid;
        }
    }));

    const handleInputChange = (e: any) => {
        setValue<FormData>(e, setFormData);
    };

    const handleInputFileChange = (file: File | null) => {

        const extension = file?.name.split('.').pop()?.toLowerCase() || "";
        setFormData((prev) => ({
            ...prev,
            fileName: file?.name || "",
            ext: extension,
            dataFile: file,
            id:0
        }));

        document.getElementById("fileName")?.focus();

        // if (file) {

            // const reader = new FileReader();
            // reader.onload = (e) => {
            //     const arrayBuffer = e.target?.result as ArrayBuffer;
            //     // const byteData = new Uint8Array(arrayBuffer);
            //     const base64String = arrayBufferToBase64(arrayBuffer);

            //     console.log ('base64String', base64String);

            //     setFormData((prev) => ({
            //         ...prev,
            //         fileName: file.name,
            //         ext: extension,
            //         data: base64String,
            //     }));
            // };
            // reader.onerror = (e) => {
            //     console.error("Error reading file:", e);
            // };
            // reader.readAsArrayBuffer(file);
            
        // }
    };

    // const arrayBufferToBase64 = (arrayBuffer: any) => {
    //     const bytes = new Uint8Array(arrayBuffer);
    //     let binary = '';
    //     for (let i = 0; i < bytes.length; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //     }
    //     return btoa(binary);
    // };

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title font-bold">情報</span>
                <div className="">
                    <div className="flex flex-wrap w-full">
                        <div className="flex flex-wrap">
                            <div className="md:w-1/4">
                                <label htmlFor='docName' className="home-label1">文書名</label>
                            </div>
                            <div className="md:w-3/4 p-1">
                                <CommonInput
                                    id='docName'
                                    {...register('docName')}
                                    value={formData?.docName}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.docName ? 'error-background' : ''}`}
                                />
                                {errors.docName && <span className="error-message">{errors.docName.message}</span>}
                            </div>

                            <div className="md:w-1/4">
                                <label className="home-label1">ファイル</label>
                            </div>
                            <div className="md:w-3/4 p-1">
                                <CommonInputFile
                                    id='fileName'
                                    {...register('fileName')}
                                    value={formData?.fileName}
                                    onChange={handleInputFileChange}
                                    className={`w-full ${errors.fileName ? 'error-background' : ''}`}
                                    accept=".txt, .pdf, image/png, image/jpg, image/gif, image/webp"
                                />
                                {errors.fileName && <span className="error-message">{errors.fileName.message}</span>}
                            </div>

                            <div className="md:w-1/4">
                                <label htmlFor='comment' className="home-label1">コメント</label>
                            </div>
                            <div className="md:w-3/4 p-1">
                                <textarea
                                    id="comment"
                                    {...register('comment')}
                                    value={formData?.comment}
                                    className={`doc-file-comment outline-none ${errors.comment ? 'error-background' : ''}`}
                                    aria-required="true"
                                    placeholder=""
                                    onChange={handleInputChange}
                                />
                                {errors.comment && <span className="error-message">{errors.comment.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { DocManageCreateOrEdit };
