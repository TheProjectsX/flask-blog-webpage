"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
    const router = useRouter();
    const [titleImg, setTitleImg] = useState();
    const [postTitle, setPostTitle] = useState();
    const [postBody, setPostBody] = useState();
    const [postCategory, setPostCategory] = useState();

    const date = new Date();

    // Get the full month name
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const month = monthNames[date.getMonth()];
    // Get the day
    const day = date.getDate();
    // Get the year
    const year = date.getFullYear();

    let loggedin = false;
    loggedin = localStorage.getItem("loggedin");

    if (loggedin === "false" || loggedin === null) {
        router.push("/account/login");
    }

    let oldPosts = JSON.parse(localStorage.getItem("authorPosts"));
    if (oldPosts === null) oldPosts = [];

    const savePost = () => {
        toast.success("Posted Successfully!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        const postData = {
            id: oldPosts.length + 1,
            authorID: 1,
            titleImg,
            title: postTitle,
            body: postBody,
            date: {
                month,
                day,
                year,
            },
            category: postCategory
                .split(" ")
                .map((item) => item.charAt(0).toUpperCase() + item.slice(1)),
        };

        oldPosts.push(postData);

        localStorage.setItem("authorPosts", JSON.stringify(oldPosts));
        setTimeout(() => {
            router.push("/account/dashboard");
        }, 800);
    };

    return (
        <div className="flex flex-col items-center lg:w-2/3 mb-10">
            <h1 className="text-3xl font-['Acme',sans-serif] mb-6 xl:mb-10">
                Create New Post
            </h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    savePost();
                }}
                className="gap-6 xl:gap-8 flex flex-col w-3/4"
            >
                <label className="relative">
                    <input
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        value={titleImg}
                        onChange={(e) => setTitleImg(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Cover Image Link
                    </p>
                </label>
                <label className="relative">
                    <input
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Title
                    </p>
                </label>

                <label className="relative">
                    <textarea
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 h-60"
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        required
                    ></textarea>
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Body
                    </p>
                </label>
                <label className="relative">
                    <input
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Categories (Separate by Space)
                    </p>
                </label>
                <button
                    type="submit"
                    className="w-full border-2 border-primary bg-primary text-white p-2 text-lg rounded-md font-bold hover:border-black hover:bg-black active:bg-white active:text-black"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default page;
