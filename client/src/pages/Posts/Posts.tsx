import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getPosts } from "../../services/postService";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import Post from "../../components/Post";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { useUserContext } from "../../hooks/useUserContext";

export const Posts: React.FC = () => {
    const { isAuthenticated } = useUserContext();

    const { data: posts, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

    return (
        <PageLayout>
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-semibold mb-3">See what others are sharing!</h1>

                {isAuthenticated && <Link to="/create-post">
                    <PrimaryButton>Create Post</PrimaryButton>
                </Link>}
            </div>

            {
                posts?.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.titulo}
                        body={post.conteudo}
                        author={post.autor_id}
                        timestamp={post.data_criacao}
                    />
                ))
            }
        </PageLayout>
    );
}