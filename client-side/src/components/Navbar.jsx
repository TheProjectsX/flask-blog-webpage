"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SearchIcon from "@/icons/search.svg";
import FeedIcon from "@/icons/feed.svg";
import TwitterIcon from "@/icons/twitter.svg";
import FacebookIcon from "@/icons/facebook.svg";
import YoutubeIcon from "@/icons/youtube.svg";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [opened, setOpened] = useState("home");
    const router = useRouter();

    return (
        <div className="flex flex-col py-8">
            <header className="flex items-center justify-between flex-col w-full md:flex-row md:pb-4">
                <Link href="/">
                    <h1 className="text-5xl font-['Acme',sans-serif] font-semibold hover:underline underline-offset-8 p-2 mb-4 md:mb-0">
                        TechHub
                    </h1>
                </Link>
                <div className="flex gap-3 flex-col-reverse items-center sm:flex-row-reverse md:flex-row md:gap-5">
                    <form
                        className="flex items-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.push(`/search/${searchQuery}`);
                            setSearchQuery("");
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search Blog"
                            className="border border-gray-300 px-3 py-2 min-w-[200px] dark:bg-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={`bg-primary p-3 ${
                                searchQuery === ""
                                    ? "hover:bg-primary"
                                    : "hover:bg-black"
                            }`}
                            disabled={searchQuery === ""}
                        >
                            <img
                                src={SearchIcon.src}
                                alt="Search"
                                className="w-5"
                            />
                        </button>
                    </form>
                    <div className="flex gap-1">
                        <button className="bg-primary p-3 hover:bg-black rounded-md">
                            <img
                                src={FeedIcon.src}
                                alt="contact"
                                className="w-5 h-4"
                            />
                        </button>
                        <button className="bg-primary p-3 hover:bg-black rounded-md">
                            <img
                                src={TwitterIcon.src}
                                alt="contact"
                                className="w-5"
                            />
                        </button>
                        <button className="bg-primary p-3 hover:bg-black rounded-md">
                            <img
                                src={FacebookIcon.src}
                                alt="contact"
                                className="w-5"
                            />
                        </button>
                        <button className="bg-primary p-3 hover:bg-black rounded-md">
                            <img
                                src={YoutubeIcon.src}
                                alt="contact"
                                className="h-4"
                            />
                        </button>
                    </div>
                </div>
            </header>
            <nav className="my-5 border-t-2">
                <ul className="flex flex-wrap text-lg gap-x-5">
                    <li className="py-3">
                        <Link
                            href="/"
                            className={`text-xl ${
                                opened === "home"
                                    ? "font-semibold hover:text-black dark:hover:text-white"
                                    : "hover:text-gray-500 "
                            }`}
                            onClick={() => setOpened("home")}
                            disabled={opened === "home" ? true : false}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="py-3">
                        <Link
                            href="/posts"
                            className={`text-xl ${
                                opened === "posts"
                                    ? "font-semibold hover:text-black dark:hover:text-white"
                                    : "hover:text-gray-500 "
                            }`}
                            onClick={() => setOpened("posts")}
                            disabled={opened === "posts" ? true : false}
                        >
                            Posts
                        </Link>
                    </li>
                    <li className="py-3">
                        <Link
                            href="/about"
                            className={`text-xl ${
                                opened === "about"
                                    ? "font-semibold hover:text-black dark:hover:text-white"
                                    : "hover:text-gray-500 "
                            }`}
                            onClick={() => setOpened("about")}
                            disabled={opened === "about" ? true : false}
                        >
                            About
                        </Link>
                    </li>
                    <li className="py-3">
                        <Link
                            href="/account/dashboard"
                            className={`text-xl ${
                                opened === "account"
                                    ? "font-semibold hover:text-black dark:hover:text-white"
                                    : "hover:text-gray-500 "
                            }`}
                            onClick={() => setOpened("account")}
                            disabled={opened === "account" ? true : false}
                        >
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
