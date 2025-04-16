import React, { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
    return (
        <div className="max-w-[100%] w-[1440px] mx-auto">
            <div>
                {props.children}
            </div>
        </div>
    );
}