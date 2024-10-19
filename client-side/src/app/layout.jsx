import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChildrenWrapper from "./ChildrenWrapper";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function RootLayout({ children }) {
    const sideBarData = await (
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/home/sidebar`)
    ).json();

    return (
        <html lang="en" className="dark">
            <body className={``}>
                <ToastContainer
                    position="top-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
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
