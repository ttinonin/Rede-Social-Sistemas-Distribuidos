import React, { ReactNode } from "react";

import PageContainer from "../PageContainer";
import Header from "../Header";
import SideBar from "../SideBar";
import MainContainer from "../MainContainer";

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
    return (
        <PageContainer>
            <Header />

            <MainContainer>
                <SideBar />

                <div className="flex flex-col flex-grow mr-6">
                    {props.children}
                </div>

            </MainContainer>
        </PageContainer>
    );
}