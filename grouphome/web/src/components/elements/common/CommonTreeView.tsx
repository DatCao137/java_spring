import '../tree-view/treeview.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CreateHandler,
  DeleteHandler,
  MoveHandler,
  NodeApi,
  RenameHandler,
  Tree,
} from 'react-arborist';
import { AiFillFile, AiFillFolder, AiOutlineFileAdd } from 'react-icons/ai';
import { BiCollapseAlt, BiExpandAlt } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';
import { TbFolderPlus } from 'react-icons/tb';

import useResizeObserver from 'use-resize-observer';

import { Button } from '../../ui/button';

import Node from '../tree-view/Node';
import Preview from '../tree-view/Preview';

export interface TreeNode {
  id: string;
  name: string;
  isBase: boolean;
  parentId: string | null;
  icon?: IconType;
  iconColor?: string;
  children?: TreeNode[];
}

export const buildTree = (data: TreeNode[], hasLeaf: boolean = false): TreeNode[] => {
  const map: { [key: string]: TreeNode } = {};
  const tree: TreeNode[] = [];

  data.forEach((node) => {
    map[node.id] = { ...node, children: [] };
  });

  data.forEach((node) => {
    if (node.parentId === null) {
      tree.push(map[node.id]);
    } else {
      if (map[node.parentId]) {
        map[node.parentId].children!.push(map[node.id]);
      }
    }
  });

  const removeEmptyChildren = (node: TreeNode): TreeNode => {
    if (node.children && node.children.length === 0) {
      delete node.children;
    } else if (node.children) {
      node.children = node.children.map(removeEmptyChildren);
    }
    return node;
  };

  if (!hasLeaf) return tree;
  return tree.map(removeEmptyChildren);
};

export const defaultTreeData: TreeNode[] = [
  {
    id: '1',
    name: 'Root',
    isBase: true,
    parentId: null,
    icon: AiFillFolder,
    iconColor: '#f6cf60',
  },
];

export interface Dimensions {
  rowHeight?: number;
  width?: number | string;
  height?: number;
  indent?: number;
  paddingTop?: number;
  paddingBottom?: number;
  padding?: number;
  maxWidth?: number;
}

export type ResizeType = 'resize' | 'resize-none' | 'resize-x' | 'resize-y';

type props = {
  data?: TreeNode[];
  openByDefault?: boolean;
  className?: string;
  preview?: boolean;
  dimensions?: Dimensions;
  isShowSearch?: boolean;
  resize?: ResizeType;
  onCreate2Server?: () => void;
  onUpdate2Server?: () => void;
  onDelete2Server?: () => void;
  onNodeSelect?: any;
};

export const CommonTreeView = ({
  data = [],
  dimensions = {
    maxWidth: 800,
    rowHeight: 32,
    indent: 24,
  },
  openByDefault = false,
  isShowSearch = false,
  preview = false,
  resize = 'resize-none',
  className = '',
  onNodeSelect
}: props) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [originalData, setOriginalData] = useState<TreeNode[]>([]);
  const [isCloseAll, setIsCloseAll] = useState<boolean>(true);
  const [term, setTerm] = useState('');
  const treeRef = useRef<any>(null);
  const [currentNode, setCurrentNode] = useState<NodeApi<TreeNode> | null>(
    null,
  );
  const { ref } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    setTreeData(buildTree(data.length ? data : defaultTreeData));
    setOriginalData(data);
  }, [data]);

  useEffect(() => {
    setTreeData(buildTree(originalData));
  }, [originalData]);

  const createFileFolder = (
    <>
      <Button
        onClick={() =>
          treeRef.current?.create({
            type: 'internal',
            parentId: currentNode?.id,
          })
        }
        title="New Folder..."
      >
        <TbFolderPlus />
      </Button>
      <Button
        onClick={() =>
          treeRef.current?.create({
            type: 'leaf',
            parentId: currentNode?.id,
          })
        }
        title="New File..."
      >
        <AiOutlineFileAdd />
      </Button>
      <Button
        onClick={() => {
          setIsCloseAll(!isCloseAll);
          isCloseAll ? treeRef.current?.openAll() : treeRef.current?.closeAll();
        }}
      >
        {isCloseAll ? <BiExpandAlt /> : <BiCollapseAlt />}
      </Button>
    </>
  );

  const onCreate: CreateHandler<TreeNode> = ({ parentId, type }) => {
    let newNode: TreeNode = {
      id: `${originalData.length + 1}`,
      name: '',
      isBase: type === 'leaf',
      parentId: parentId,
      icon: type === 'leaf' ? AiFillFile : AiFillFolder,
      iconColor: type === 'leaf' ? '#6bc7f6' : '#f6cf60',
    };
    if (type == 'internal') newNode = { ...newNode, children: [] };
    setOriginalData([...originalData, newNode]);
    return { id: newNode.id };
  };
  const onRename: RenameHandler<TreeNode> = ({ id, name }) => {
    const data = JSON.parse(JSON.stringify(originalData));
    data.forEach((item: TreeNode) => {
      if (item.id == id) {
        item.name = name;
      }
    });
    setOriginalData(data);
  };
  const onMove: MoveHandler<TreeNode> = ({
    dragIds,
    dragNodes,
    parentId,
    parentNode,
    index,
  }) => {};
  const onDelete: DeleteHandler<TreeNode> = ({ ids }) => {
    const data = JSON.parse(JSON.stringify(originalData));

    const getIds = (node: TreeNode): string[] => {
      let ids = [node.id];
      node.children?.forEach((child: TreeNode) => {
        ids = [...ids, ...getIds(child)];
      });
      return ids;
    };

    const node: TreeNode = data.find((item: TreeNode) => ids.includes(item.id));

    const deleteIds = getIds(node);

    setOriginalData(
      data.filter((item: TreeNode) => !deleteIds.includes(item.id)),
    );
  };

  return (
    <div ref={ref} className={className}>
      <div className="mb-5 flex flex-row justify-end space-x-2">
        {createFileFolder}
      </div>
      <input
        type="text"
        placeholder="検索..."
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        hidden={!isShowSearch}
      />
      <Tree<TreeNode>
        ref={treeRef}
        data={treeData}
        onCreate={onCreate}
        onRename={onRename}
        onMove={onMove}
        onDelete={onDelete}
        onSelect={onNodeSelect}
        indent={dimensions.indent || 24}
        width={dimensions.width}
        rowHeight={dimensions.rowHeight || 32}
        openByDefault={openByDefault || false}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
        onActivate={(node) => {
          setCurrentNode(node);
          if (node.isInternal && node.isOpen) setIsCloseAll(false);
        }}
        onContextMenu={() => {}} //process later, display popup combobox menu
        className={resize}
      >
        {Node}
      </Tree>
      {preview && currentNode && currentNode.isLeaf && (
        <div className="mt-5">
          <Preview fileName={currentNode.data.name} />
        </div>
      )}
    </div>
  );
};
