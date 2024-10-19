"use client";

import { useState, useEffect } from "react";

import AuthorData from "@/DataFiles/Authors.json";
import PostPreview from "@/components/PostPreview";
import WaitGif from "@/icons/wait.gif";

const page = ({ params }) => {
    const id = Number.parseInt(params.id);

    const [authorPosts, setAuthorPosts] = useState([]);
    const [authorImage, setAuthorImage] = useState("");
    const [postCount, setPostCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setAuthorPosts(
            PostArray.filter((item) => item.authorId === id).reverse()
        );
    }, [id]);

    const importImageByName = async (name) => {
        const imageModule = await import(`../authorImages/${name}`);
        return imageModule.default;
    };

    useEffect(() => {
        const importImage = async () => {
            const imagePath = await importImageByName(AuthorData[id].authorImg);
            setAuthorImage(imagePath);
        };

        importImage();
    }, [AuthorData[id].authorImg]);

    return (
        <div className="lg:w-2/3 pb-10">
            <img
                src={authorImage}
                alt="Author"
                className="w-28 mb-2 ml-2 rounded-full"
            />
            <h2 className="text-2xl font-['Acme',sans-serif]">
                Author: {AuthorData[id].authorName}
            </h2>
            <h4 className="text-xl font-['Acme',sans-serif] mb-8">
                Post: {AuthorData[id].authorPost}
            </h4>

            {authorPosts.slice(0, postCount).map((post, index) => {
                return <PostPreview post={post} key={index} />;
            })}

            <div className="flex justify-center lg:pt-8">
                {postCount <= authorPosts.length && (
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

export default page;
