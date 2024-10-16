"use client";

import { useState } from "react";
import PostArray from "../DataFiles/Posts.json";
import WaitGif from "../icons/wait.gif";
import Slider from "@/components/Slider";
import Sidebar from "@/components/Sidebar";
import PostPreview from "@/components/PostPreview";

const Home = () => {
    const [postCount, setPostCount] = useState(4);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="overflow-hidden">
            <Slider count={5} />
            <div className="flex flex-col lg:flex-row lg:gap-10 xl:justify-between">
                <div className="lg:w-2/3 pb-10">
                    {PostArray.slice(0, postCount).map((post, index) => (
                        <PostPreview post={post} key={index} />
                    ))}
                    <div className="flex justify-center lg:pt-8">
                        {postCount <= PostArray.length && (
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
            </div>
        </div>
    );
};

export default Home;
