"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import UserDataContext from "./context/context";
import { useEffect, useState } from "react";

const ChildrenWrapper = ({ children, sideBarData }) => {
    const pathname = usePathname();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const serverResponse = await (
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/me`, {
                    credentials: "include",
                })
            ).json();

            if (serverResponse.success) {
                setUserData(serverResponse);
            }
        };
        loadData();
    }, []);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
            {pathname !== "/" && <Sidebar sideBarData={sideBarData} />}
        </UserDataContext.Provider>
    );
};

export default ChildrenWrapper;
