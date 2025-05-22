import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getUser, follow } from "../../services/userService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useUserContext } from "../../hooks/useUserContext";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export const User: React.FC = () => {
    const navigate = useNavigate();
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
        navigate("/social");
    }

    return (
        <PageLayout>
            <h1 className="text-3xl font-semibold mb-3">A new friendship begins!</h1>

            <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-lg mb-4">
                <div className="flex justify-between items-center">
                    <div className="w-30 h-30 flex-shrink-0 m-2">
                        <img src={user?.foto_perfil_url} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="pl-4">
                        <h1 className="font-semibold text-3xl mb-3">{userReq?.username}</h1>

                        <h1>{userReq?.email}</h1> 
                    </div>
                </div>

                {isAuthenticated && <PrimaryButton disabled={isPending} onClick={followUser} className="w-fit">Follow</PrimaryButton>}
            </div>
        </PageLayout>
    );
}