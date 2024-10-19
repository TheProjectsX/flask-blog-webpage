"use client";

import PostPreview from "@/components/PostPreview";
import WaitGif from "@/icons/wait.gif";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
    const [authorPosts, setAuthorPosts] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const serverResponse = await (
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/me/posts`, {
                    credentials: "include",
                })
            ).json();

            if (serverResponse.success) {
                setAuthorPosts(serverResponse.data);
            } else {
                toast.error(serverResponse.message);
                setAuthorPosts([]);
            }
        };
        loadData();
    }, []);

    return (
        <div className="lg:w-2/3 pb-10">
            {!authorPosts ? (
                <img src={WaitGif.src} alt="Please Wait" className="w-12" />
            ) : authorPosts.length === 0 ? (
                <h2 className="text-2xl text-center">No Posts To View</h2>
            ) : (
                authorPosts.map((post, index) => (
                    <PostPreview post={post} key={index} dashboard />
                ))
            )}
        </div>
    );
};

export default page;
