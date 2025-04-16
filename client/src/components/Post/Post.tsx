import React from "react";

interface PostProps {
    id: string;
    title: string;
    body: string;
    timestamp: Date;
    author: string;
}

export const Post: React.FC<PostProps> = (props) => {
    // Post body limit 700 characters

    return (
        <div className="transition-transform duration-300 hover:scale-101 bg-white rounded-xl p-3 cursor-pointer flex flex-row shadow-lg mb-4">
            <div className="w-24 h-24 flex-shrink-0 m-2">
                <img src="/images/cat.jpg" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="m-4">
                <h2 className="font-semibold text-2xl mb-3">{props.title}</h2>

                <p className="text-justify my-2">
                    {props.body}
                </p>

                <p className="text-sm text-gray-600">Author: {props.author}</p>
                <p className="text-sm text-gray-600">Posted At: {props.timestamp.toISOString()}</p>
            </div>
        </div>
    );
}