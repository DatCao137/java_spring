import { useEffect, useState, useRef } from 'react';
import { DocFileData as ApiDocFileData, 
         DocFileHistory as ApiDocFileHist, 
         DocPath as ApiDocPath,
         DocFileSave as ApiDocFileSave,
         DocFileDelete as ApiDocFileDelete, 
        } from '@/features/blc-common/assets/ApiPath';
import { Post, Get, Del } from '@/features/blc-common/utils/ServerRequest';
import { DocManageCss } from '../assets/DocManageCss';
import { DocManageTable, defaultFilter } from '../components/docManage/DocManageTable';
import { DocHistoryTable } from '../components/docManage/DocHistoryTable';
import { DocManageListColumns, TableFilterDef } from '../components/docManage/DocManageTableDef'; 
import { DocManageCreateOrEdit, FormData }  from '../components/docManage/DocManageCreateOrEdit';
import { CommonViewer } from '@/components/elements/common/CommonViewer';
import { Button } from '@/components/ui/button'
import 'react-toastify/dist/ReactToastify.css';
import { CommonTreeView, TreeNode } from '@/components/elements/common/CommonTreeView';
import { DocManageSaveDto } from '../types/DocManage';

import { PopupConfirmParams } from '@/components/elements/Common';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { Popup } from '@/components/elements/Popup'
        
import internal from 'stream';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

const exchangeTarget = (src:DocManageListColumns|null) => {
  return {
    id: src?.id ?? 0,
    docId: src?.docId ?? 0,
    docName: src?.docName ?? "",
    ext: "",
    fileName: src?.fileName ?? "",
    dataFile: src?.dataFile ?? null,
    comment: src?.comment ?? "",
    created_at: src?.created_at ?? "",
    updated_at: src?.updated_at ?? "",
  }
}

export const DocManageMain = () => {
  const pageTitle = '文書管理'
  const [ fileName, setFileName ] = useState("");
  const [ ext, setExt ] = useState("");
  const [ data, setData ] = useState("");
  const [ titleText, setTitleText ] = useState("");
  const [ btnText, setBtnText ] = useState("");
  const [ tgt, setTgt ] = useState<DocManageListColumns|null>(null);
  const [ isPopupOpen, setIsPopupOpen ] = useState(false);
  const [ historyData, sethistoryData ] = useState<any[]>([]);
  const [ formData, setFormData ] = useState<FormData>(exchangeTarget(tgt));
  const [ oldFormData, setOldFormData ] = useState<FormData>(exchangeTarget(tgt));
  const [ seq, setSeq ] = useState(0);
  const [ treeData, setTreeData ] = useState<TreeNode[]>([]);
  const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
  const [ resetSelections, setResetSelections ] = useState(false);

  const [ isVisible, setIsVisible ] = useState(false);
  const [ isHistory, setIsHistory ] = useState(false);

  const [ pathIdSelect, setPathIdSelect ] = useState(0);
  const [ docId, setDocId ] = useState(0);
  const [ fileIdSelect, setFileIdSelect ] = useState(0);
  const [ rowData, setRowData ] = useState<any>(null);

  const formRef = useRef<any>(null);

  const contentData = <DocManageCreateOrEdit ref={formRef} formData={formData} setFormData={setFormData}/>;

  const [ confirmParam, setConfirmParam ] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '',
    message: '',
    isShowCancel: false,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      isOpen: false
    }));
  };

  const handleAddPopup = () => {
    if(pathIdSelect == 0){
      setConfirmParam(prevState => ({
        ...prevState, 
        textConfirm: 'OK',
        isShowCancel: false,
        message: 'フォルダーを選択してください。',
        isOpen: true
      }));

      return;
    }
    setTitleText(pageTitle + '(追加)');
    setBtnText("追加");
    setFormData(exchangeTarget(null));
    setOldFormData(exchangeTarget(null));
    setIsPopupOpen(true);
  };

  const handleEditPopup = () => {
    setTitleText("文書管理(編集)");
    setBtnText("更新");
    setFormData(exchangeTarget(tgt));
    setOldFormData(exchangeTarget(tgt));
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    if (checkDataDifferent(oldFormData, formData)) {
      setConfirmParam(prevState => ({
        ...prevState, 
        textConfirm: '閉じる',
        isShowCancel: true,
        message: TEXT_CONFIRM_DATA_CHANGE,
        confirmAction: () => closePopup(),
        isOpen: true
      }));
    } else {
      closePopup();
    }
  };

  const reloadButKeepDetailShow = async () => {
    setResetSelections(false);
    setSeq(seq + 1);
  }

  const reload = async() => {
    setRowData(null);
    setTgt(null);
    setSeq(seq + 1);
    setResetSelections(false);
  }

  const handleSaveData = async () => {
    let data = formData;

    const isValid = await formRef.current?.validateForm();

    if (!isValid) {
      return;
    }

    let saveData = {
      id: data.id,
      oldId: oldFormData.id,
      docId: data.docId,
      pathId: pathIdSelect,
      docName: data.docName,
      fileName: data.fileName,
      dataFile: data.dataFile,
      comment: data.comment,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }

    doSave(saveData);
  }

  const handleDelete = () => {

    setConfirmParam(prevState => ({
      ...prevState, 
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択したファイル名(' + rowData.fileName + ')を削除しますか？',
      confirmAction: () => deleteDocFile(),
      isOpen: true
    }));

  }

  const doSave = async (data: DocManageSaveDto) => {

    Post({
      apiPath: ApiDocFileSave,
      params: data,
      message: '事業所情報を' + btnText + 'しました。',
      errMessage: btnText + 'に失敗しました。',
      onSuccess: (res) => {
        setIsPopupOpen(false);
        if (data.id) {
          reloadButKeepDetailShow();
        } else {
          reload();
        }
      }
    });

    setResetSelections(false);
  }

  const deleteDocFile = async () => {
    Del({ 
      apiPath: `${ApiDocFileDelete}/${fileIdSelect}`, 
      params: {},
      onSuccess: (res) => {
        reload();
      } 
    });
  };

  const handleDocHistory = () => {
    Get({
      apiPath: ApiDocFileHist,
      params: { params: { id: fileIdSelect, docId: docId, pathId: pathIdSelect } },
      onSuccess: (res) => {
        sethistoryData(res.data.data);
      }
    });

    setIsHistory(!isHistory);
  }

  const onNodeSelect = (node: any) => {
    const pathId = parseInt(node[0]?.id, 10) || 0;
    setPathIdSelect(pathId);
    const docName = "";
    const fileName = "";
    const comment = "";
    const created_at = "";
    const updated_at = "";

    setFilter({ pathId, docName, fileName, comment, created_at, updated_at });

    setResetSelections(true);
    setSeq(seq + 1);

    setIsVisible(false);
    setIsHistory(false);

  }

  const onHistorySelect = (id: any, row:DocManageListColumns, index: any) => {
    const fileId = parseInt(id, 10);
    setFileIdSelect(fileId);

    //call preview file
    callPreviewFile(row, 'history', fileId, index);
  }

  useEffect(() => {
    // API get all folder treeview
    const fetchData = async () => {
      Get({
        apiPath: ApiDocPath,
        params: {},
        onSuccess: (res) => {
          const data =
            res.data.data?.map((item: any) => {
              return {
                id: `${item.id}`,
                name: item.name,
                isBase: item.isBase,
                parentId: item.parentId ? `${item.parentId}` : null,
              } as TreeNode;
            }) || [];
          setTreeData(data);

          setIsVisible(false);
          setIsHistory(false);
        }
      });
    };
    fetchData();
  }, []);

  const chgTgtData = (row:DocManageListColumns) => {
    if (row){
      const fileId = parseInt(row?.id?.toString() || '', 10);
      setFileIdSelect(fileId);
      setDocId(parseInt(row?.docId?.toString() || '', 10));
      setRowData(row);
      setTgt(row);
  
      callPreviewFile(row, 'preview', fileId, 0)
    }
  }

  const callPreviewFile = (row: DocManageListColumns, isTypeShow: String, fileId: Number, index: Number) => {
    // API privew data file
    Get({
      apiPath: ApiDocFileData,
      params: { params: { id: fileId } },
      onSuccess: (res) => {
        const extension = res.data.fileName?.split('.').pop()?.toLowerCase() || "";
        let fileName = res.data.fileName;
        if(index != 0) {
          fileName = "#" + index + " " + fileName;
        }
        setFileName(fileName);
        setExt(extension);
        setData(res.data.data);

        setIsVisible(true);
        if (isTypeShow == 'history') {
          setIsHistory(true);
        } else {
          setIsHistory(false);
        }
      }
    });
  }

  return (
<>
<style>
    <DocManageCss />
</style>
<div id="doc">
  <div className="flex flex-wrap w-full">
    <div className="w-full md:w-1/4">
      <div className="box-doc-manage pt-0 pr-1">
        <span className="box-title text-xl"></span>
        <CommonTreeView 
          data={treeData} 
          dimensions={{ width: '100%', rowHeight: 28, }} 
          preview={true} 
          onNodeSelect={onNodeSelect}
        />
      </div>
    </div>

    <div className="w-full md:w-3/4">
      <div className="box-doc-manage pt-0">
        <span className="box-title text-xl"></span>
        <TableOpeButtons items={[
          { name: "追加", buttonType: ButtonType.Add, cb: handleAddPopup },
          { name: "編集", buttonType: ButtonType.Edit, cb: handleEditPopup, selectedState: tgt },
          { name: "削除", buttonType: ButtonType.Del, cb: handleDelete, selectedState: tgt },
        ] as ButtonProps[]} />
        <div id="docTable" className="table-container">
          <DocManageTable cbSelect={chgTgtData} seq={seq} filter={filter} resetSelections={resetSelections}/>
        </div>
      </div>
    </div>
  </div>

  <div className={`box-doc-manage pt-0 ${!isVisible ? "hidden" : ""}`}>
    <span className="box-title text-xl"></span>
    <div className="div-btn-right">
      <Button className="btn-style" onClick={handleDocHistory}>履歴</Button>
    </div>
    <div id="docTable">
      <div className="flex flex-wrap w-full">
        <div className={`w-full ${!isHistory ? "" : "md:w-3/4"}`}>
          <CommonViewer fileName={fileName} ext={ext} data={data} />
        </div>
        <div className={`w-full ${!isHistory ? "hidden" : "md:w-1/4"}`}>
          <div className="pt-0 box-history">
            <div className="flex flex-wrap w-full header-history">
              <span className="box-title text-xl pl-2 pb-2 pt-1">履歴情報</span>
            </div>
            <div id="docTableHistory" className="pl-2 pr-2">
              <DocHistoryTable data={historyData} onHistorySelect={onHistorySelect}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    <Popup title={titleText} doText={btnText}
            isOpen={isPopupOpen}
            onClose={handleClosePopup} onOK={handleSaveData}
            contents={contentData} />
    
    <PopupConfirm
          param={confirmParam}
        />

    {/* <ToastContainer position="bottom-right"/> */}
</div>
</>
);
}
