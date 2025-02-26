import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import styled from 'styled-components';
import { PopupConfirmParams } from './Common';
import { PopupButtons } from './PopupButtons';

interface PopupConfirmProps {
  param: PopupConfirmParams;
}

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    z-index: 1000;
`;

const DialogContent = styled(Dialog.Content)`
    background-color: white;
    border-radius: 5px;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
    border: 2px solid #6e6e6e;
    padding: 10px;
    position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-width: 100%;
    min-height: 300px; 
    overflow-y: auto;
    z-index: 1000;
    padding: 0px 20px; 
`;

const DivContent = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;    
  height: 220px;          
`;

const DivFooter = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;    
`;

const CancelButton = styled(Button)`
    width: 120px;
    background-color: #9e9c9c;
    font-size: 1em; 
    margin-right: 5px;
`;

const ConfirmButton = styled(Button)`
    width: 120px;
    background-color: #EE887A;
    font-size: 1em;
`;


const PopupConfirm: React.FC<PopupConfirmProps> = ({ param }) => {

  const handleConfirm = () => {
    if ( param.isShowCancel ){
      param.confirmAction();
    }
    param.onClose();
  };

  return (
  <div>
    <Dialog.Root open={param.isOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent
                onInteractOutside={(e) => {
                  e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                  e.preventDefault();
                }}
              >
            <Dialog.Close asChild>
                <button
                    className="text-[20px] absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                    onClick={() =>param.onClose()}
                    >
                    &times;
                </button>
            </Dialog.Close>
            <Dialog.Title ></Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <DivContent>
                <span >{param.message}</span>
            </DivContent>
            <DivFooter>
              {param.isShowCancel && (<PopupButtons title={param.textConfirm} onOK={handleConfirm} onClose={() => param.onClose()}/>)}
              {!param.isShowCancel && (<PopupButtons title={param.textConfirm} onOK={handleConfirm} />)}
            </DivFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  </div>
    
  );
};

export { PopupConfirm };
