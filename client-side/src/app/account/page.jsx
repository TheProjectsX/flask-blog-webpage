"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import DefaultImage from "../authorImages/default.jpg";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    let loggedin = false;
    loggedin = localStorage.getItem("loggedin");

    if (loggedin === "false" || loggedin === null) {
        router.push("/account/login");
    }

    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("authData")));
    }, []);

    return (
        <div className="lg:w-2/3">
            {loggedin === "true" && (
                <>
                    <div className="mb-10 ">
                        <img
                            src={
                                userData.userImg === ""
                                    ? DefaultImage
                                    : userData.userImg
                            }
                            alt="Hellow World"
                            className="w-24 rounded-full mb-5 mx-4 border-2 border-black dark:border-0"
                        />
                        <h2 className="text-lg">Name: {userData.username}</h2>
                        <h3 className="text-lg">Post: {userData.post}</h3>
                        <h3 className="text-lg">About: {userData.userAbout}</h3>
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
                                href="/account/dashboard/new"
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
                        onClick={() => {
                            toast.success("Logout Successfull", {
                                position: "top-left",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                            localStorage.setItem("loggedin", false);
                            router.push("/account/login");
                        }}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default page;
