import React, { useState } from "react";

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

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newPost = await createPost(conteudo, (user?.id ?? 0));

            navigate("/")
        } catch(error) {
            console.error("Error while creating post: ", error);
            alert("erro")
        }
    }

    return (
        <PageLayout>
            <form onSubmit={handleFormSubmit} className="sm:mx-10">
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

                <PrimaryButton type="submit" className="w-full mb-3">Submit</PrimaryButton>
            </form>
        </PageLayout>
    );
}