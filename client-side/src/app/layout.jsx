"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
    const pathname = usePathname();

    return (
        <html lang="en">
            <body className={``}>
                <div className="App px-10 md:px-16 xl:px-20 font-['Ubuntu',sans-serif] dark:bg-gray-900 dark:text-white">
                    <Navbar />
                    <div className="flex flex-col lg:flex-row lg:gap-10 xl:justify-between">
                        {children}
                        {pathname !== "/" && <Sidebar />}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
