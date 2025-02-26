import { useState } from 'react';
import { NodeApi, NodeRendererProps } from 'react-arborist';
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown, MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

import { TreeNode } from '../common/CommonTreeView';
import { PopupConfirm } from '../PopupConfirm';
import { PopupConfirmParams } from '../Common';

const Node = ({
  node,
  style,
  dragHandle,
  tree,
  preview,
}: NodeRendererProps<TreeNode>) => {
  const CustomIcon = node.data?.icon;
  const iconColor = node.data?.iconColor;
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: 'OK',
    message: 'Are you sure you want to delete this node?',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const handleDeleteNode = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      confirmAction: () => onDelete(),
      isOpen: true
    }));
  };

  const onDelete = () => {
    tree.delete(node.id);
    deleteNode(node);
  }

  const deleteNode = (node: NodeApi) => {
    // console.log(node);
  };

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      isOpen: false
    }));
  };

  return (
    <div
      className={`node-container ${node.state.isSelected ? 'isSelected' : ''}`}
      style={style}
      ref={dragHandle}
    >
      <div
        className="node-content"
        onClick={() =>
          node.isInternal && node.children?.length && node.toggle()
        }
      >
        {node.isLeaf ? (
          <>
            <span className="file-folder-icon">
              {CustomIcon ? (
                <CustomIcon color={iconColor ? iconColor : '#6bc7f6'} />
              ) : (
                <AiFillFile color="#6bc7f6" />
              )}
            </span>
          </>
        ) : (
          <>
            {node.children && node.children.length > 0 ? (
              <span className="arrow">
              {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
            </span>
            ) : (
              <span className="arrow"></span>
            )}

            <span className="file-folder-icon">
              {CustomIcon ? (
                <CustomIcon color={iconColor ? iconColor : '#f6cf60'} />
              ) : (
                <AiFillFolder color="#f6cf60" />
              )}
            </span>
          </>
        )}
        <span className="node-text text-nowrap">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === 'Escape') node.reset();
                if (e.key === 'Enter') node.submit(e.currentTarget.value);
              }}
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>

      <div className="file-actions">
        <div className="folderFileActions">
          <button onClick={() => node.edit()} title="Rename...">
            <MdEdit />
          </button>
          <button onClick={handleDeleteNode} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>

      <PopupConfirm
        param={confirmParam}
      />
    </div>
  );
};

export default Node;
