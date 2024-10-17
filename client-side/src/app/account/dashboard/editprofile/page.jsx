"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import UserDataContext from "@/app/context/context";

const page = () => {
    const context = useContext(UserDataContext);
    const { userData, setUserData } = context;
    const [loading, setLoading] = useState(false);

    if (!userData) {
        return redirect("/account/login");
    }

    const updateProfile = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;

        const body = {
            username: form.username.value,
            profilePicture: form.profilePicture.value,
            about: form.about.value,
        };

        const serverResponse = await (
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/me`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body),
                credentials: "include",
            })
        ).json();

        if (serverResponse.success) {
            toast.success("Successfully Updated user info");
            setUserData((prev) => ({ ...prev, ...serverResponse.updatedData }));
        } else {
            toast.error(serverResponse.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center lg:w-2/3">
            <h1 className="text-2xl">Edit Your Profile</h1>
            <p className="mb-6">Leave Blank to Skip Update</p>
            <form
                onSubmit={updateProfile}
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
                        name="profilePicture"
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
                        defaultValue={userData.username}
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
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1 cursor-text">
                        Full Name
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
                        defaultValue={userData.about}
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
                        About
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
