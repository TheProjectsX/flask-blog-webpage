"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const ChildrenWrapper = ({ children, sideBarData }) => {
    const pathname = usePathname();
    return (
        <>
            {children}
            {pathname !== "/" && <Sidebar sideBarData={sideBarData} />}
        </>
    );
};

export default ChildrenWrapper;
