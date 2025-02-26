import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import styled from "styled-components";

interface PopupButtonsProps {
    title: string;
    disabled?: boolean;
    onOK?: () => void;
    onClose?: () => void;
}

const CancelButton = styled(Button)`
  width: 120px;
  color: white;
  background-color: rgb(248, 113, 113);
  font-size: 1em;
`;

const DoButton = styled(Button)`
  width: 120px;
  color: white;
  background-color: rgb(96, 165, 250);
  font-size: 1em;
`;

export const PopupButtons = forwardRef(({
    title, disabled, onOK, onClose
}: PopupButtonsProps, ref) => {
    return (
        <div className="mt-4 flex justify-end gap-5 px-4">
            {onClose && (<CancelButton type="button" onClick={onClose}>キャンセル</CancelButton>)}
            {onOK && (<DoButton type="button" onClick={onOK}>{title}</DoButton>)}
            {!onOK && (<DoButton type="submit" disabled={disabled}>{title}</DoButton>)}
        </div>
    )
})