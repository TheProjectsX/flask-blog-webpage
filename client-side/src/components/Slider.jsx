"use client";

import { useRef, useState, useEffect } from "react";
import PostArray from "../DataFiles/Posts.json";
import Link from "next/link";

const Slider = (props) => {
    const sliderDiv = useRef(null);
    const [scrollPercentage, setScrollPercentage] = useState(100);

    const { count } = props;
    const posts =
        PostArray.length <= count ? PostArray : PostArray.slice(-count);
    const sliderWidth = posts.length * 100;

    const scrollToPercentageX = (percentage) => {
        if (sliderDiv.current) {
            const clientWidth = sliderDiv.current.clientWidth;

            sliderDiv.current.scrollLeft = clientWidth * (percentage / 100 - 1);
            setScrollPercentage(percentage);
        }
    };

    const scrollSlider = (scrollTo) => {
        if (scrollTo === "left") {
            scrollToPercentageX(scrollPercentage - 100);
        } else if (scrollTo === "right") {
            scrollToPercentageX(scrollPercentage + 100);
        }
    };

    return (
        <div className="relative mb-20">
            <div
                className="overflow-x-auto no-scrollbar"
                ref={sliderDiv}
                style={{
                    scrollBehavior: "smooth",
                    transition: "scroll-left 0.3s ease-in-out",
                }}
            >
                <div
                    className="slider lg:h-[20%] bg-gray-200 dark:bg-gray-700 flex"
                    style={{
                        width: `${sliderWidth}%`,
                    }}
                >
                    {posts.map((item, index) => {
                        const postUrl = `/posts/${item.title}?id=${item.id}`;
                        const monthUrl = `/archive/${item.date.month.toLowerCase()}+${
                            item.date.year
                        }`;
                        return (
                            <div
                                className="flex flex-col lg:flex-row-reverse w-[100%]"
                                key={index}
                            >
                                <Link href={postUrl} className="">
                                    <img
                                        src={item.titleImg}
                                        alt={item.title}
                                        className=""
                                    />
                                </Link>
                                <div className="p-10 lg:w-[55%]">
                                    <p className="pb-2 text-sm text-gray-400">
                                        <Link
                                            href={monthUrl}
                                            className="cursor-pointer hover:text-gray-600"
                                        >{`${item.date.month} ${item.date.day}, ${item.date.year}`}</Link>
                                        &nbsp;&nbsp;●&nbsp;&nbsp;
                                        <span>
                                            {item.category.map(
                                                (catItem, index) => {
                                                    return (
                                                        <span key={index}>
                                                            <Link
                                                                href={`/category/${catItem.toLowerCase()}`}
                                                                className="cursor-pointer hover:text-gray-500"
                                                            >
                                                                {catItem}
                                                            </Link>
                                                            {index !==
                                                            item.category
                                                                .length -
                                                                1
                                                                ? " / "
                                                                : ""}
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </span>
                                    </p>

                                    <Link href={postUrl}>
                                        <h2 className="text-3xl font-bold font-['Ubuntu',sans-serif] hover:underline underline-offset-4 pb-3">
                                            {item.title}
                                        </h2>
                                    </Link>
                                    <p className="pb-8 text-lg lg:text-xl">
                                        {item.body.substr(0, 138)}...
                                    </p>
                                    <Link
                                        href={postUrl}
                                        className="sm:hidden md:block lg:hidden 2lg:block"
                                    >
                                        <button className="bg-primary text-sm text-white py-2.5 px-4 hover:bg-black active:text-green-500">
                                            Continue Reading »
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="buttons space-x-1 absolute bottom-6 right-6">
                <button
                    className={`bg-primary py-1.5 px-5 text-2xl text-white font-semibold ${
                        scrollPercentage === 100
                            ? "hover:bg-primary"
                            : " hover:bg-black"
                    }`}
                    disabled={scrollPercentage === 100}
                    onClick={() => scrollSlider("left")}
                >{`<`}</button>
                <button
                    className={`bg-primary py-1.5 px-5 text-2xl text-white font-semibold ${
                        scrollPercentage === sliderWidth
                            ? "hover:bg-primary"
                            : " hover:bg-black"
                    }`}
                    onClick={() => scrollSlider("right")}
                    disabled={scrollPercentage === sliderWidth}
                >{`>`}</button>
            </div>
        </div>
    );
};

export default Slider;
