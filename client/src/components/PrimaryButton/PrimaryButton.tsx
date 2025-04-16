import React, { ReactNode } from "react";

interface PrimaryButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | any;
    className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
    return (
        <>
            <button onClick={props.onClick} className={`bg-sky-400 hover:bg-sky-500 transform transition text-white px-5 py-2 rounded-md cursor-pointer ${props?.className}`} type={props.type ?? "button"}>{props.children}</button>
        </>
    );
}