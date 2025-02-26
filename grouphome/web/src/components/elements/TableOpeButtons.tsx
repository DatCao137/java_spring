import React, { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button'
import { Delete, Pencil } from 'lucide-react';

export const ButtonType = {
    Add: 0,
    Edit: 1,
    Del: 2,
    Other: 3,
};
export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    class: string;
    buttonType: ButtonType;
    cb: () => void;
    keyIdState?: Dispatch<SetStateAction<boolean>>;
    selectedState?: Dispatch<SetStateAction<boolean>>;
}
export interface ButtonBoxProps {
    items: ButtonProps[]
}

export const TableOpeButtons = React.forwardRef<HTMLButtonElement, ButtonBoxProps>(({
    items
}, ref
) => {
    const chkDisable = (item: ButtonProps): true | false | undefined => {
        var bKey = ("keyIdState" in item);
        var bSel = ("selectedState" in item);
        if (bKey && bSel) return !item.keyIdState || item.selectedState == null;
        if (!bKey && !bSel) return undefined;
        if (bKey) return !item.keyIdState
        else return item.selectedState == null;
    }
    return (
        <div className="div-btn-right">
            {items.map((option) => {
                var param = {
                    className: 'btn-style',
                    onClick: option.cb,
                    disabled: chkDisable(option)
                } as ButtonHTMLAttributes<HTMLButtonElement>;
                return (
                <Button {...param} key={option.name}>
                    {(option.buttonType == ButtonType.Edit) && (<Pencil className="mr-2 size-4" />)}
                    {(option.buttonType == ButtonType.Del)  && (<Delete className="mr-2 size-4" />)}
                    {option.name}
                </Button>)
            })}
        </div>
    );
}
)
