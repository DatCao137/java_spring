import { FaFileAlt, FaFilePdf, FaImage } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export type IconNode = {
  icon: IconType;
  color: string;
};

export const IconTypes = new Map<string, IconNode>([
  [
    'pdf',
    {
      icon: FaFilePdf,
      color: '#333',
    },
  ],
  [
    'txt',
    {
      icon: FaFileAlt,
      color: '#333',
    },
  ],
  [
    'png',
    {
      icon: FaImage,
      color: '#333',
    },
  ],
  [
    'gif',
    {
      icon: FaImage,
      color: '#333',
    },
  ],
]);
