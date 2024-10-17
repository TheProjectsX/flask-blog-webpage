import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChildrenWrapper from "./ChildrenWrapper";

export default async function RootLayout({ children }) {
    const sideBarData = await (
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/home/sidebar`)
    ).json();

    return (
        <html lang="en" className="dark">
            <body className={``}>
                <div className="App px-10 md:px-16 xl:px-20 font-['Ubuntu',sans-serif] dark:bg-gray-900 dark:text-white">
                    <Navbar />
                    <div className="flex flex-col lg:flex-row lg:gap-10 xl:justify-between">
                        <ChildrenWrapper sideBarData={sideBarData.data}>
                            {children}
                        </ChildrenWrapper>
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
