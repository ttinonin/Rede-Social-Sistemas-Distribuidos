import React, { ReactNode } from "react";

interface MainContainerProps {
    children: ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = (props) => {
    return (
        <div className="flex gap-[24px]">
            {props.children}
        </div>
    );
}