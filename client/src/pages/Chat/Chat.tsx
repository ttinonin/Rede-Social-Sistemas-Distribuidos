import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/chatService"; 

import { getUser, follow } from "../../services/userService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useUserContext } from "../../hooks/useUserContext";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export const Chat: React.FC = () => {
    const { isAuthenticated, user } = useUserContext();

    const userId = user?.id;

    const { data: rooms, isLoading, isError } = useQuery({
        queryKey: ["rooms", userId],
        queryFn: () => getRooms(userId),
        enabled: !!userId,
    });

    return (
        <PageLayout>
            <h1 className="text-3xl font-semibold mb-3">Send a message to anyone!</h1>
            {isLoading && <p>Loading rooms...</p>}
            {isError && <p>Error loading rooms.</p>}

            {rooms?.length === 0 && <p>No rooms found.</p>}

            {rooms?.map((room) => {
                const roomName =
                    room.nome ??
                    room.usuarios.find((u) => u.id !== user?.id)?.username ?? "Unknown Room";

                return (
                    <div key={room.id} className="transition-transform duration-300 hover:scale-101 bg-white p-4 rounded-lg shadow-md mb-3 cursor-pointer">
                        <h2 className="text-xl font-semibold">{roomName}</h2>
                        <p className="text-gray-600">
                            Users: {room.usuarios.map((u) => u.username).join(", ")}
                        </p>
                    </div>
                );
            })}

        </PageLayout>
    );
}