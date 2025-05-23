import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRoomMessages } from "../../services/chatService"; 
import { useNavigate, useParams } from "react-router-dom";

import { getUser, follow } from "../../services/userService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useUserContext } from "../../hooks/useUserContext";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { TextInput } from "../../components/TextInput/TextInput";

export const Room: React.FC = () => {
    const [message, setMessage] = useState("");
    const [realtimeMessages, setRealtimeMessages] = useState<any[]>([]);

    const { isAuthenticated, user } = useUserContext();

    const { roomId } = useParams<{ roomId: string }>();

    const { data: messages, isLoading } = useQuery({
        queryKey: ["rooms", roomId],
        queryFn: () => getRoomMessages(roomId),
        enabled: !!roomId,
    });
    const allMessages = [...(messages || []), ...realtimeMessages];

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);

    
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user) return;

        const payload = {
            room_id: roomId,
            conteudo: message,
            autor_id: user.id,
        };

        fetch(`http://0.0.0.0:9000/chat/${roomId}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setMessage("");
    };

    useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket("ws://0.0.0.0:6969");

    socket.onopen = () => {
        console.log("[WebSocket] Conectado");
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data); // { topic, content }
            const mensagem = JSON.parse(data.content); // { autor_id, conteudo, timestamp }

            const topicRoomId = data.topic.replace("room_", "");
            if (topicRoomId === roomId) {
                setRealtimeMessages((prev) => [...prev, mensagem]);
            } else {
                console.log("[WS] Mensagem de outra sala ignorada");
            }
        } catch (err) {
            console.error("Erro ao parsear mensagem:", err);
        }
    };

    socket.onerror = (err) => {
        console.error("WebSocket error:", err);
    };

    return () => {
        socket.close();
        console.log("[WebSocket] Desconectado");
    };
}, [roomId]);


    return (
        <PageLayout>
            <div className="flex flex-col h-[80vh] md:h-[85vh] bg-white/80 rounded-lg shadow">

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {isLoading && <p>Loading...</p>}
                {allMessages?.map((msg: any, index: number) => (
                    <div
                        key={index}
                        className={`max-w-[70%] px-4 py-2 rounded-lg shadow 
                            ${msg.autor_id === user?.id ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start mr-auto"}`}
                    >
                        <p className="text-sm">{msg.conteudo}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-t-gray-300">
                <TextInput 
                    value={message}
                    onChange={setMessage}
                    placeholder="Type a message..."
                    className="w-full"
                />
                
                <PrimaryButton type="submit">Send</PrimaryButton>
            </form>
            </div>
        </PageLayout>
    );
}