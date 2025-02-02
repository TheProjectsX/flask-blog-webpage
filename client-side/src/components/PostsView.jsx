"use client";

import PostPreview from "@/components/PostPreview";
import WaitGif from "@/icons/wait.gif";
import { useState } from "react";

const PostView = ({ postsDataPrimary, title, customUrl, limit = 8 }) => {
    const [postsData, setPostsData] = useState(postsDataPrimary);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreData = async () => {
        setIsLoading(true);
        const serverResponse = await (
            await fetch(
                `${
                    customUrl ?? `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`
                }?page=${postsData.pagination.nextPage}&limit=${limit}`
            )
        ).json();

        if (serverResponse.success) {
            setPostsData((prev) => ({
                pagination: serverResponse.pagination,
                data: [...prev.data, ...serverResponse.data],
            }));
        }
        setIsLoading(false);
    };

    return (
        <div className="lg:w-2/3 pb-10">
            {title && <h2 className="text-2xl mb-8">{title}</h2>}
            {postsData.data.length === 0 && (
                <div className="italic text-xl font-semibold text-center">
                    No Posts to Show
                </div>
            )}
            {postsData.data.length > 0 &&
                postsData.data.map((post, index) => (
                    <PostPreview post={post} key={index} />
                ))}
            <div className="flex justify-center lg:pt-8">
                {postsData.pagination.has_next_page && (
                    <button className="overflow-visible" onClick={loadMoreData}>
                        {isLoading ? (
                            <img
                                src={WaitGif.src}
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

export default PostView;
