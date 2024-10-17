"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShowPassIcon from "@/icons/showPass.png";
import HidePassIcon from "@/icons/hidePass.png";
import UserDataContext from "@/app/context/context";
import { redirect } from "next/navigation";

const page = () => {
    const context = useContext(UserDataContext);
    const { userData, setUserData } = context;
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    if (userData) {
        return redirect("/account/dashboard");
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const body = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            about: form.about.value,
        };

        const serverResponse = await (
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body),
                credentials: "include",
            })
        ).json();

        if (serverResponse.success) {
            toast.success("Sign Up Successful!");
            setUserData(serverResponse);
        } else {
            toast.error(serverResponse.message);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center lg:w-2/3">
            <h1 className="text-3xl font-['Acme',sans-serif] mb-6 xl:mb-10">
                Create new Account!
            </h1>

            <form
                onSubmit={handleSignUp}
                className="gap-6 xl:gap-8 flex flex-col w-2/3 md:w-1/2"
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
                        name="username"
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
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Full Name *
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
                        name="email"
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
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Email *
                    </p>
                </label>
                <label className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 pr-12"
                        name="password"
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        minLength={6}
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Password *
                    </p>
                    <img
                        src={showPass ? ShowPassIcon.src : HidePassIcon.src}
                        alt="Show Hide Pass"
                        className="w-7 absolute right-2 top-2.5 bg-white rounded-full cursor-pointer"
                        onClick={() => {
                            showPass ? setShowPass(false) : setShowPass(true);
                        }}
                    />
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
                        name="about"
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
                        About Yourself
                    </p>
                </label>
                <button
                    type="submit"
                    className={`w-full border-2 text-white p-2 text-lg rounded-md font-bold hover:border-black hover:bg-black active:bg-white active:text-black ${
                        loading
                            ? "cursor-wait bg-black border-black"
                            : "bg-primary border-primary"
                    }`}
                    disabled={loading}
                >
                    Sign Up
                </button>
            </form>
            <h3 className="py-7 text-lg">
                Have an Account?{" "}
                <Link
                    href="/account/login"
                    className="font-semibold text-primary hover:text-black dark:hover:text-white cursor-pointer"
                >
                    Login Now!
                </Link>
            </h3>
        </div>
    );
};

export default page;
