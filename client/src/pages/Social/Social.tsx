import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchFollowers, fetchFollowing } from "../../services/userService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useUserContext } from "../../hooks/useUserContext";

export const Social: React.FC = () => {
    const { user } = useUserContext();
    const userId = user?.id;

    const [selectedTab, setSelectedTab] = useState<"followers" | "following">("following");

   const { data: followers, isLoading: loadingFollowers, isError: errorFollowers } = useQuery({
        queryKey: ["followers", userId],
        queryFn: () => fetchFollowers(userId),
        enabled: !!userId,
    });

    const { data: following, isLoading: loadingFollowing, isError: errorFollowing } = useQuery({
        queryKey: ["following", userId],
        queryFn: () => fetchFollowing(userId),
        enabled: !!userId,
    });


    return (
        <PageLayout>
            <h1 className="text-3xl font-semibold mb-3">People inside your network</h1>
            
            <div className="flex gap-2 mb-4">
                <button
                    className={`cursor-pointer px-4 py-2 rounded-full ${selectedTab === "followers" ? "bg-sky-500 text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setSelectedTab("followers")}
                >
                    Followers
                </button>

                <button
                    className={`cursor-pointer px-4 py-2 rounded-full ${selectedTab === "following" ? "bg-sky-500 text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setSelectedTab("following")}
                >
                    Following
                </button>
            </div>

            {selectedTab === "followers" ? (
                followers?.map((follower) => (
                    <div className="bg-white rounded-xl mb-4 p-3 shadow-md">
                        <p className="font-semibold">{follower.username}</p>
                    </div>
                ))
            ) : (
                following?.map((follow) => (
                    <div className="bg-white rounded-xl mb-4 p-3 shadow-md">
                        <p className="font-semibold">{follow.username}</p>
                    </div>
                ))
            )}      
        </PageLayout>
    );
}