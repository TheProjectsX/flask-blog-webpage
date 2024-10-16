"use client";

import React, { useState, useEffect } from "react";

import PostArray from "@/DataFiles/Posts.json";
import PostPreview from "@/components/PostPreview";
import WaitGif from "@/icons/wait.gif";

const PostBySearch = ({ params }) => {
    const searchQuery = params.query;

    const [categoryPosts, setCategoryPosts] = useState([]);
    const [postCount, setPostCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCategoryPosts(
            PostArray.filter(
                (item) =>
                    item.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    item.body
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    item.category.some((category) =>
                        category
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    )
            ).reverse()
        );
    }, [searchQuery]);

    return (
        <div className="lg:w-2/3 pb-10">
            <h2 className="text-2xl font-['Acme',sans-serif] mb-8">
                Searched By: {searchQuery}
            </h2>

            {categoryPosts.length === 0 ? (
                <h2 className="text-2xl">No Post Found!</h2>
            ) : (
                categoryPosts.slice(0, postCount).map((post, index) => {
                    return <PostPreview post={post} key={index} />;
                })
            )}

            <div className="flex justify-center lg:pt-8">
                {postCount <= categoryPosts.length && (
                    <button
                        className="overflow-visible"
                        onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                                setIsLoading(false);
                                setPostCount(postCount + 5);
                            }, 500);
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <img
                                src={WaitGif}
                                alt="Please Wait"
                                className="w-12"
                            />
                        ) : (
                            <span className="bg-black text-lg text-white py-2.5 px-4 hover:bg-primary active:text-yellow-300">
                                Older Posts
                            </span>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostBySearch;
