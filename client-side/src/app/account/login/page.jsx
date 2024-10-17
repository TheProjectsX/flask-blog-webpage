"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import ShowPassIcon from "@/icons/showPass.png";
import HidePassIcon from "@/icons/hidePass.png";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);

    const handleLogin = () => {
        let AuthData = JSON.parse(localStorage.getItem("authData"));

        if (
            AuthData === null ||
            AuthData.email !== email ||
            AuthData.password !== password
        ) {
            toast.error("Incorrect Credentials", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success("Login Successfull!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            localStorage.setItem("loggedin", true);
            router.push("/account/dashboard");
        }
    };

    return (
        <div className="flex flex-col items-center lg:w-2/3">
            <h1 className="text-3xl font-['Acme',sans-serif] mb-6 xl:mb-10">
                Login to your Account!
            </h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                className="gap-6 xl:gap-8 flex flex-col w-2/3 md:w-1/2"
            >
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        Email *
                    </p>
                </label>
                <label className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 pr-12"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        minLength={5}
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
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
                <button
                    type="submit"
                    className="w-full border-2 border-primary bg-primary text-white p-2 text-lg rounded-md font-bold hover:border-black hover:bg-black active:bg-white active:text-black"
                >
                    Login
                </button>
            </form>
            <h3 className="py-7 text-lg">
                Don't have an Account?{" "}
                <Link
                    href="/account/signup"
                    className="font-semibold text-primary hover:text-black dark:hover:text-white cursor-pointer"
                >
                    Create One!
                </Link>
            </h3>
        </div>
    );
};

export default page;
