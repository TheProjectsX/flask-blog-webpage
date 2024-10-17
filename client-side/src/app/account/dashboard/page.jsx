"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import UserDataContext from "@/app/context/context";
import { redirect } from "next/navigation";

const page = () => {
    const context = useContext(UserDataContext);
    const { userData } = context;

    if (!userData) {
        return redirect("/account/login");
    }

    const handleLogout = async () => {
        const serverResponse = await (
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
                credentials: "include",
            })
        ).json();

        if (serverResponse.success) {
            toast.success("Logout Successful");
        } else {
            toast.error(serverResponse.message);
        }
    };

    return (
        <div className="lg:w-2/3">
            {userData && (
                <>
                    <div className="mb-10 ">
                        <img
                            src={userData.profilePicture}
                            alt={userData.username}
                            className="w-24 rounded-full mb-5 mx-4 border-2 border-black dark:border-0"
                        />
                        <h2 className="text-lg">Name: {userData.username}</h2>
                        <h3 className="text-lg">Role: {userData.role}</h3>
                        <h3 className="text-lg">
                            Posts: {userData.postsCount}
                        </h3>
                        <h3 className="text-lg">About: {userData.about}</h3>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold text-lg">Quick Links:</h4>
                        <div className="flex flex-col items-start p-4 gap-2">
                            <Link
                                href="/account/dashboard/editprofile"
                                className="text-primary hover:text-black dark:hover:text-white active:text-orange-500"
                            >
                                Edit Profile
                            </Link>
                            <Link
                                href="/account/dashboard/posts/new"
                                className="text-primary hover:text-black dark:hover:text-white active:text-orange-500"
                            >
                                Create New Post
                            </Link>
                            <Link
                                href="/account/dashboard/posts"
                                className="text-primary hover:text-black dark:hover:text-white active:text-orange-500"
                            >
                                View My Posts
                            </Link>
                        </div>
                    </div>
                    <button
                        className="border-2 border-primary bg-primary text-white py-2 px-4 text-lg rounded-md font-bold hover:border-black hover:bg-black active:bg-white active:text-black"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default page;
