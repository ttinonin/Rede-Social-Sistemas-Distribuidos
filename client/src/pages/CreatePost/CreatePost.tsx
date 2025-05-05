import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { TextInput } from "../../components/TextInput/TextInput";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { useUserContext } from "../../hooks/useUserContext";

export const CreatePost: React.FC = () => {
    const { user }  = useUserContext();
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");

    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ conteudo, autor_id }: { conteudo: string; autor_id: number }) => (
            createPost(conteudo, autor_id)
        ),
        onSuccess: (data) => {
            navigate("/")
        },
        onError: (error) => {
            console.error("Error while creating post: ", error);
            alert("erro")
        }
    })

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(user?.id === null) {
            return
        }

        mutate({ conteudo, "autor_id": (user?.id ?? 0) })
    }

    return (
        <PageLayout>
            <div className="bg-white p-5 rounded-xl shadow-lg">
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="block">Title</label>
                        <TextInput 
                            value={titulo}
                            onChange={setTitulo}
                            placeholder="Enter the post's title"
                            className="w-full"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block">Body</label>
                        
                        <textarea
                            className="w-full p-2 rounded-md border border-gray-300" 
                            placeholder="Enter the post's body"
                            rows={4}
                            onChange={(e) => setConteudo(e.target.value)} 
                            value={conteudo}
                        />
                    </div>

                    <PrimaryButton type="submit" className="w-full mb-3" disabled={isPending}>Submit</PrimaryButton>
                </form>
            </div>
        </PageLayout>
    );
}