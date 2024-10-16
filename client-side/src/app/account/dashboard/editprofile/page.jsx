"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    let loggedin = false;
    loggedin = localStorage.getItem("loggedin");

    if (loggedin === "false" || loggedin === null) {
        router.push("/account/login");
    }

    const [userImg, setUserImg] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userAbout, setUserAbout] = useState("");

    const [userOldData, setUserOldData] = useState({});
    useEffect(() => {
        setUserOldData(JSON.parse(localStorage.getItem("authData")));
    }, []);

    const updateProfile = () => {
        toast.success("Profile Updated", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        const userData = {
            userImg: userImg === "" ? userOldData.userImg : userImg,
            username: username === "" ? userOldData.username : username,
            email: email === "" ? userOldData.email : email,
            password: password === "" ? userOldData.password : password,
            userAbout: userAbout === "" ? userOldData.userAbout : userAbout,
            post: "Writer",
        };
        localStorage.setItem("authData", JSON.stringify(userData));
    };

    return (
        <div className="flex flex-col items-center lg:w-2/3">
            <h1 className="text-2xl">Edit Your Profile</h1>
            <p className="mb-6">Leave Blank to Skip Update</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile();
                }}
                className="gap-6 xl:gap-8 flex flex-col w-2/3 md:w-1/2 mb-6"
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
                        value={userImg}
                        onChange={(e) => {
                            setUserImg(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Profile Picture Image URL
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
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        minLength={5}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Full Name
                    </p>
                </label>
                <label className="relative">
                    <input
                        type="email"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Email
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
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        minLength={5}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Password
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
                        value={userAbout}
                        onChange={(e) => {
                            setUserAbout(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        About
                    </p>
                </label>
                <button
                    type="submit"
                    className="w-full border-2 border-primary bg-primary text-white p-2 text-lg rounded-md font-bold hover:border-black hover:bg-black active:bg-white active:text-black"
                >
                    Update Profile
                </button>
            </form>
            <Link href="/account/dashboard" className="w-2/3 md:w-1/2">
                <button className="w-full border-2 border-black bg-black text-white p-2 text-lg rounded-md font-bold hover:border-primary hover:bg-primary active:bg-white active:text-black active:border-black">
                    Back to Dashboard
                </button>
            </Link>
        </div>
    );
};

export default page;
