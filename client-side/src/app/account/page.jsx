"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import UserDataContext from "../context/context";

const page = () => {
    const context = useContext(UserDataContext);
    const { userData } = context;

    if (!userData) {
        return redirect("/account/login");
    } else {
        return redirect("/account/dashboard");
    }
};

export default page;
