import React, { ReactNode } from "react";

interface PrimaryButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | any;
    className?: string;
    disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
    return (
        <>
            <button
                onClick={props.onClick}
                disabled={props.disabled ?? false}
                type={props.type ?? "button"}
                className={`px-5 py-2 rounded-md text-white transform transition 
                    ${
                    props.disabled
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-sky-400 hover:bg-sky-500 cursor-pointer"
                    } 
                    ${props.className ?? ""}
                `}
            >
                {props.children}
            </button>

        </>
    );
}