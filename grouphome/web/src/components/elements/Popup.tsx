/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react/no-children-prop */
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import styled from 'styled-components';

import { PopupButtons } from './PopupButtons';

interface PopupProps {
  title: string;
  doText: string;
  isOpen: boolean;
  onClose?: () => void;
  onOK?: () => void;
  contents: JSX.Element;
  hideFooter?: boolean;
}

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 70%;
  max-width: 100%;
  max-height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const DialogTitle = styled(Dialog.Title)`
  font-size: 19px;
  font-weight: bold;
`;

const DivContent = styled.div``;

const DivFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}`;

export const Popup: React.FC<PopupProps> = ({
  title,
  doText,
  isOpen,
  onClose,
  onOK,
  contents,
  hideFooter = false,
}) => {
  return (
    <>
      <div>
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Portal>
            <DialogOverlay />
            <div className="fixed z-[1000] inset-0 flex items-center justify-center">
              <DialogContent
                onInteractOutside={(e) => {
                  e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                  e.preventDefault();
                }}
              >
                <DivContent className="sticky -top-3 flex content-center justify-between px-4 py-2 mb-2 -mt-3 -mx-3 bg-white border z-[1001]">
                  <DialogTitle>{title}</DialogTitle>
                  <Dialog.DialogDescription></Dialog.DialogDescription>
                  <Dialog.Close asChild>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      id='btnCloseX'
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </Dialog.Close>
                </DivContent>
                <DivContent>{contents}</DivContent>
                <div className={hideFooter ? 'hidden' : ''}>
                  <DivFooter>
                    <PopupButtons title={doText} onOK={onOK} onClose={onClose} />
                  </DivFooter>
                </div>
              </DialogContent>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
};
