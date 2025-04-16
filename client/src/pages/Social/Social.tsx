import React, { useState } from "react";

import { PageLayout } from "../../components/PageLayout/PageLayout";

export const Social: React.FC = () => {
    const followers = [
        {
            id: "abc",
            username: "bimbas900",
            email: "bimbas@gmail.com"
        },
        {
            id: "123",
            username: "DexterMorgan01",
            email: "dexter@gmail.com"
        }
    ];

    const following = [
        {
            id: "987",
            username: "Linus01",
            email: "linus@linux.com"
        }
    ];

    const [selectedTab, setSelectedTab] = useState("followers");

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
                followers.map((follower) => (
                    <div className="bg-white rounded-xl mb-4 p-3 shadow-md">
                        <p className="font-semibold">{follower.username}</p>
                    </div>
                ))
            ) : (
                following.map((follow) => (
                    <div className="bg-white rounded-xl mb-4 p-3 shadow-md">
                        <p className="font-semibold">{follow.username}</p>
                    </div>
                ))
            )}      
        </PageLayout>
    );
}