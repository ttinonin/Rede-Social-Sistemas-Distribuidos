import React, { useState } from "react";

import { getUser, follow } from "../../services/userService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useUserContext } from "../../hooks/useUserContext";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export const Profile: React.FC = () => {
    const { isAuthenticated, user } = useUserContext();

    return (
        <PageLayout>
            {user?.username} 
        </PageLayout>
    );
}