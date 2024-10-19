"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const PostPreview = ({ post: postData, dashboard = false }) => {
    const { imageUrl, title, content, _id, createdAt, tags } = postData;
    const postUrl = `/posts/${_id}`;
    const monthUrl = `/archive/${new Date(createdAt)
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase()}+${new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
    })}`;

    const [deletingPost, setDeletingPost] = useState(false);
    const handleDeletePost = async () => {
        setDeletingPost(true);

        const serverResponse = await (
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${_id}`, {
                method: "DELETE",
                credentials: "include",
            })
        ).json();

        if (!serverResponse.success) {
            toast.error(serverResponse.message);
            setDeletingPost(false);
        } else {
            toast.success("Post deleted successfully!");
            setDeletingPost("success");
        }
    };

    return (
        <div
            className={`flex-col mb-16 sm:flex-row gap-4 sm:gap-8 ${
                deletingPost === "success" ? "hidden" : "flex"
            }`}
        >
            <div className="space-y-3">
                <Link
                    href={postUrl}
                    className="sm:w-[340px] sm:h-[225px] inline-block"
                >
                    <img src={imageUrl} alt={title} className="w-full h-full" />
                </Link>
                <div className="hidden sm:flex md:hidden lg:flex 2lg:hidden flex-wrap gap-1">
                    <Link href={postUrl}>
                        <button className="bg-primary text-sm text-white py-2.5 px-4 hover:bg-black active:text-green-300">
                            Continue Reading »
                        </button>
                    </Link>
                    {dashboard && (
                        <Link href={`/account/dashboard/posts/edit/${_id}`}>
                            <button className="bg-green-500 text-sm text-white py-2.5 px-4 hover:bg-black active:text-green-300">
                                Edit Post
                            </button>
                        </Link>
                    )}
                    {dashboard && (
                        <button
                            className={`text-sm text-white py-2.5 px-4 hover:bg-red-800 ${
                                deletingPost
                                    ? "bg-red-400 cursor-not-allowed"
                                    : "bg-red-700"
                            }`}
                            disabled={deletingPost}
                            onClick={handleDeletePost}
                        >
                            Delete Post
                        </button>
                    )}
                </div>
            </div>
            <div>
                <p className="pb-2 text-sm text-gray-400">
                    <Link
                        href={monthUrl}
                        className="cursor-pointer hover:text-gray-600"
                    >
                        {`${new Date(createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}`}
                    </Link>
                    &nbsp;&nbsp;●&nbsp;&nbsp;
                    <span>
                        {tags.map((item, index) => {
                            return (
                                <span key={index}>
                                    <Link
                                        href={`/category/${item.toLowerCase()}`}
                                        className="cursor-pointer hover:text-gray-500"
                                    >
                                        {item}
                                    </Link>
                                    {index !== tags.length - 1 ? " / " : ""}
                                </span>
                            );
                        })}
                    </span>
                </p>

                <Link href={postUrl}>
                    <h2 className="text-[1.75rem] font-bold font-['Ubuntu',sans-serif] hover:underline underline-offset-4 pb-3">
                        {title}
                    </h2>
                </Link>
                <p className="pb-8 text-lg">{content.substr(0, 138)}...</p>
                <div className="sm:hidden md:flex lg:hidden 2lg:flex flex-wrap gap-2">
                    <Link href={postUrl} className="w-fit">
                        <button className="bg-primary text-sm text-white py-2.5 px-4 hover:bg-black active:text-green-500">
                            Continue Reading »
                        </button>
                    </Link>
                    {dashboard && (
                        <Link href={`/account/dashboard/posts/edit/${_id}`}>
                            <button className="bg-green-500 text-sm text-white py-2.5 px-4 hover:bg-black active:text-green-300">
                                Edit Post
                            </button>
                        </Link>
                    )}
                    {dashboard && (
                        <button
                            className={`text-sm text-white py-2.5 px-4 hover:bg-red-800 ${
                                deletingPost
                                    ? "bg-red-400 cursor-not-allowed"
                                    : "bg-red-700"
                            }`}
                            disabled={deletingPost}
                            onClick={handleDeletePost}
                        >
                            Delete Post
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPreview;
