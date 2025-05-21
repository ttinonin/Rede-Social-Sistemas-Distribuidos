import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getUser, follow } from "../../services/userService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useUserContext } from "../../hooks/useUserContext";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export const User: React.FC = () => {
    const { isAuthenticated, user } = useUserContext();

    const [isPending, setIsPending] = useState(false);
    const { id } = useParams<{ id: string }>();

    const { data: userReq, isLoading, isError } = useQuery({
        queryKey: ["users", id],
        queryFn: () => getUser(id!),
        enabled: !!id,
    });

    const followUser = async() => {
        try {
            setIsPending(true);
            await follow(user?.id, userReq?.id);
        } catch(error) {
            setIsPending(false);
            console.error("Error while sign up: ", error);
            alert("erro");
        }
        setIsPending(false);
    }

    return (
        <PageLayout>
            {userReq?.username} 

            {isAuthenticated && <PrimaryButton disabled={isPending} onClick={followUser} className="w-fit">Follow</PrimaryButton>}
        </PageLayout>
    );
}