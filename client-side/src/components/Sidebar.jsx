"use client";

import { useState } from "react";
import Link from "next/link";

import FeedIcon from "@/icons/feed.svg";
import TwitterIcon from "@/icons/twitter.svg";
import FacebookIcon from "@/icons/facebook.svg";
import YoutubeIcon from "@/icons/youtube.svg";

const Sidebar = ({ sideBarData }) => {
    const [recOpened, setRecOpened] = useState("recent");

    return (
        <div className="lg:1/3 xl:w-1/4 py-10 lg:pt-0 space-y-10">
            {/* Recommended */}
            <div className="recommended">
                <h2 className="text-3xl font-['Acme',sans-serif]">
                    Recommended
                </h2>
                <div className="buttons pt-5 pb-8 space-x-3">
                    <button
                        className={`text-sm text-white py-2.5 px-4 hover:bg-primary active:text-green-500 ${
                            recOpened === "recent" ? "bg-primary" : "bg-black"
                        }`}
                        onClick={() => setRecOpened("recent")}
                    >
                        Recent
                    </button>
                    <button
                        className={`text-sm text-white py-2.5 px-4 hover:bg-primary active:text-green-500 ${
                            recOpened === "popular" ? "bg-primary" : "bg-black"
                        }`}
                        onClick={() => setRecOpened("popular")}
                    >
                        Popular
                    </button>
                </div>
                {recOpened === "recent" && (
                    <div className="posts space-y-6">
                        {sideBarData.recentPosts?.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-4">
                                    <Link href={`/posts/${item._id}`}>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-28"
                                        />
                                    </Link>
                                    <div>
                                        <Link href={`/posts/${item._id}`}>
                                            <h2 className="text-xl mb-3 text-primary hover:text-black dark:hover:text-white active:text-green-500 cursor-pointer">
                                                {item.title}
                                            </h2>
                                        </Link>
                                        <p className="text-sm text-gray-600">{`${new Date(
                                            item.createdAt
                                        ).toLocaleString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}`}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {recOpened === "popular" && (
                    <div className="posts space-y-6">
                        {sideBarData.popularPosts?.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-4">
                                    <Link href={`/posts/id=${item._id}`}>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-28"
                                        />
                                    </Link>
                                    <div>
                                        <Link href={`/posts/id=${item._id}`}>
                                            <h2 className="text-xl mb-3 text-primary hover:text-black dark:hover:text-white active:text-green-500 cursor-pointer">
                                                {item.title}
                                            </h2>
                                        </Link>
                                        <p className="text-sm text-gray-600">{`${new Date(
                                            item.createdAt
                                        ).toLocaleString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}`}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Archives */}
            <div className="archives">
                <h2 className="text-3xl font-['Acme',sans-serif] mb-3">
                    Archives
                </h2>
                <ul className="archiveData text-lg">
                    {sideBarData.dates.slice(0, 4).map((item, index) => {
                        return (
                            <li key={index}>
                                ○&nbsp;&nbsp;&nbsp;
                                <Link
                                    href={`/archive/${item.date
                                        .toLowerCase()
                                        .replaceAll(" ", "+")}`}
                                    className="text-primary hover:text-black dark:hover:text-white"
                                >
                                    {item.date}
                                </Link>{" "}
                                ({item.count}){" "}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Categories */}
            <div className="categories">
                <h2 className="text-3xl font-['Acme',sans-serif] mb-3">
                    Categories
                </h2>
                <ul className="archiveData text-lg">
                    {sideBarData.tags.slice(0, 5).map((tag, index) => {
                        return (
                            <li key={index}>
                                ○&nbsp;&nbsp;&nbsp;
                                <Link
                                    href={`/category/${tag.tag.toLowerCase()}`}
                                    className="text-primary hover:text-black dark:hover:text-white"
                                >
                                    {tag.tag}
                                </Link>{" "}
                                ({tag.count})
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Stay in Touch */}
            <div className="categories">
                <h2 className="text-3xl font-['Acme',sans-serif] mb-5">
                    Stay in Touch
                </h2>
                <div className="flex gap-1">
                    <a
                        href="#"
                        className="bg-primary p-3 hover:bg-black rounded-md"
                    >
                        <img
                            src={FeedIcon.src}
                            alt="contact"
                            className="w-5 h-4"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-primary p-3 hover:bg-black rounded-md"
                    >
                        <img
                            src={TwitterIcon.src}
                            alt="contact"
                            className="w-5"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-primary p-3 hover:bg-black rounded-md"
                    >
                        <img
                            src={FacebookIcon.src}
                            alt="contact"
                            className="w-5"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-primary p-3 hover:bg-black rounded-md"
                    >
                        <img
                            src={YoutubeIcon.src}
                            alt="contact"
                            className="h-4"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
