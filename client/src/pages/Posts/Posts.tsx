import React from "react";

import { PageLayout } from "../../components/PageLayout/PageLayout";
import Post from "../../components/Post";

export const Posts: React.FC = () => {
    return (
        <PageLayout>
            <h1 className="text-3xl font-semibold mb-3">See what others are sharing!</h1>
            <Post 
                id="123abc"
                title="I've studied Linux"
                body="Lorem ipsum "
                author="Bimbas900"
                timestamp={new Date()}
            />

            <Post 
                id="abc123"
                title="How do I close VIM?"
                body="Lorem ipsum dolor sit amet consectetur adipisicing elit. At beatae consequatur sequi vitae. Quis, dolore accusamus. Maiores, inventore at? Quos laborum vel rerum quis quam tempora maxime illum, ex omnis? Laudantium nemo voluptatibus voluptates laborum voluptate consequuntur itaque laboriosam harum. Ratione praesentium adipisci, quis odit vitae, voluptates neque molestias debitis tempora vel veniam quidem corrupti nihil beatae voluptatem nemo itaque! Vel facilis molestiae ex ut sapiente! Ea, aut incidunt dolore quas in itaque voluptatem debitis neque molestias eius hic iusto, porro tempore recusandae id esse pariatur optio quia? Architecto, nihil."
                author="DexterMorgan01"
                timestamp={new Date()}
            />
        </PageLayout>
    );
}