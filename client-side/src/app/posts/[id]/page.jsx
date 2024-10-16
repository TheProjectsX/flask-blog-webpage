"use client";

import React, { useEffect, useState } from "react";
// import { useParams, useLocation, Link } from "react-router-dom";

import PostArray from "@/DataFiles/Posts.json";
import AuthorData from "@/DataFiles/Authors.json";
import FacebookIcon from "@/icons/facebook2.svg";
import TwitterIcon from "@/icons/twitter.svg";
import MailIcon from "@/icons/mail.svg";
import Link from "next/link";

const PostView = ({ params }) => {
    // const title = useParams().title;
    const [authorImage, setAuthorImage] = useState("");

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const id = Number.parseInt(queryParams.get("id"));
    const id = Number.parseInt(params.id);

    let currentPost;
    let previousPost = false;
    let nextPost = false;
    for (let i = 0; i < PostArray.length; i++) {
        if (PostArray[i].id === id) {
            if (PostArray[i - 1]) {
                previousPost = PostArray[i - 1];
            }

            if (PostArray[i + 1]) {
                nextPost = PostArray[i + 1];
            }

            currentPost = PostArray[i];
            break;
        }
    }

    const importImageByName = async (name) => {
        if (name === "") {
            name = "default.jpg";
        }
        const imageModule = await import(`@/authorImages/${name}`);
        return imageModule.default;
    };

    // useEffect(() => {
    //     const importImage = async () => {
    //         const imagePath = await importImageByName(
    //             AuthorData[currentPost.authorId].authorImg
    //         );
    //         setAuthorImage(imagePath);
    //     };

    //     importImage();
    // }, [AuthorData[currentPost.authorId].authorImg]);

    return (
        <div className="lg:w-2/3 pb-10">
            <div className="border-b-2 border-gray-300 pb-4">
                <img
                    src={currentPost.titleImg}
                    alt={currentPost.title}
                    className="pb-4"
                />
                <p className="pb-2 text-sm text-gray-400">
                    <span className="cursor-pointer hover:text-gray-600">{`${currentPost.date.month} ${currentPost.date.day}, ${currentPost.date.year}`}</span>
                    &nbsp;&nbsp;●&nbsp;&nbsp;
                    <span className="cursor-pointer hover:text-gray-600">
                        {currentPost.category.join(" / ")}
                    </span>
                </p>
                <h2 className="text-[1.75rem] font-bold font-['Ubuntu',sans-serif] pb-3">
                    {currentPost.title}
                </h2>
                <div className="author flex items-center gap-3 mb-6">
                    <img
                        src={authorImage}
                        alt="Author"
                        className="w-10 rounded-full"
                    />
                    <p className="text-lg">
                        Posted By{" "}
                        <Link
                            href={`/author/${currentPost.authorId}`}
                            className="px-1 text-primary hover:text-black active:text-orange-400 dark:hover:text-white"
                        >
                            {AuthorData[currentPost.authorId].authorName}
                        </Link>
                    </p>
                </div>
                <p className="text-lg md:text-xl whitespace-pre-line">
                    {currentPost.body}
                </p>

                <div className="buttons flex justify-between py-6">
                    <a
                        href="#"
                        className="bg-[#3b5998] w-[32%] rounded-md flex justify-center"
                    >
                        <img
                            className="w-6 py-4"
                            src={FacebookIcon.src}
                            alt="Share to Facebook"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-[#55acee] w-[32%] rounded-md flex justify-center"
                    >
                        <img
                            className="w-6 py-4"
                            src={TwitterIcon.src}
                            alt="Share to Twitter"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-[#8c8c8c] w-[32%] rounded-md flex justify-center"
                    >
                        <img
                            className="w-6 py-4"
                            src={MailIcon.src}
                            alt="Share via Mail"
                        />
                    </a>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                {previousPost ? (
                    <a className="group cursor-pointer">
                        <p className="text-gray-500">« Previous Post</p>
                        <p className="group-hover:underline text-xl font-semibold">
                            {previousPost.title}
                        </p>
                    </a>
                ) : (
                    <p></p>
                )}

                {nextPost ? (
                    <a className="group cursor-pointer">
                        <p className="text-right text-gray-500">Next Post »</p>
                        <p className="group-hover:underline text-xl font-semibold">
                            {nextPost.title}
                        </p>
                    </a>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default PostView;
