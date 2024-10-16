"use client";

import { useState, useEffect } from "react";

import PostArray from "@/DataFiles/Posts.json";
import PostPreview from "@/components/PostPreview";
import WaitGif from "@/icons/wait.gif";

const page = ({ params }) => {
    let month = params.date.replaceAll("+", " ");
    month = `${month.charAt(0).toUpperCase()}${month.slice(1)}`;

    const [monthPosts, setMonthPosts] = useState([]);
    const [postCount, setPostCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const [mon, year] = month.split(" ");
        setMonthPosts(
            PostArray.filter((item) => {
                const { month: itemMonth, year: itemYear } = item.date;
                return itemMonth === mon && itemYear === year;
            }).reverse()
        );
    }, [month]);

    return (
        <div className="lg:w-2/3 pb-10">
            <h2 className="text-2xl font-['Acme',sans-serif] mb-8">
                Month: {month}
            </h2>

            {monthPosts.slice(0, postCount).map((post, index) => {
                return <PostPreview post={post} key={index} />;
            })}

            <div className="flex justify-center lg:pt-8">
                {postCount <= monthPosts.length && (
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
