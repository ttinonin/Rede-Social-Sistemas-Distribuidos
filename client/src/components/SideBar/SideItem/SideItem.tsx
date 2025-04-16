import React, { ReactNode } from "react";

interface SideItemProps {
    children: ReactNode;
    active?: boolean;
    iconActive: string;
    iconInactive: string;
}

export const SideItem: React.FC<SideItemProps> = (props) => {
    return (
        <li className={`
            flex
            items-center
            cursor-pointer
            text-[24px]/[29px]
            mb-4
            gap-[22px]
            rounded-md
            p-3
            ${props?.active && 'bg-gradient-to-r from-sky-500 to-sky-300 text-white'}
        `}>
            <img src={props?.active ? props.iconActive : props.iconInactive} />
            {props.children}
        </li>
    );
}