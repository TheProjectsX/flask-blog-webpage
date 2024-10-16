import Link from "next/link";

const PostPreview = (props) => {
    const { titleImg, title, body, id, date, category } = props.post;
    const postUrl = `/posts/${title}?id=${id}`;
    const monthUrl = `/archive/${date.month.toLowerCase()}+${date.year}`;

    return (
        <div className="flex flex-col mb-16 sm:flex-row gap-4 sm:gap-8">
            <div className="space-y-3">
                <Link href={postUrl}>
                    <img src={titleImg} alt={title} />
                </Link>
                <Link
                    href={postUrl}
                    className="hidden sm:block md:hidden lg:block 2lg:hidden"
                >
                    <button className="bg-primary text-sm text-white py-2.5 px-4 hover:bg-black active:text-green-300">
                        Continue Reading »
                    </button>
                </Link>
            </div>
            <div>
                <p className="pb-2 text-sm text-gray-400">
                    <Link
                        href={monthUrl}
                        className="cursor-pointer hover:text-gray-600"
                    >{`${date.month} ${date.day}, ${date.year}`}</Link>
                    &nbsp;&nbsp;●&nbsp;&nbsp;
                    <span>
                        {category.map((item, index) => {
                            return (
                                <span key={index}>
                                    <Link
                                        href={`/category/${item.toLowerCase()}`}
                                        className="cursor-pointer hover:text-gray-500"
                                    >
                                        {item}
                                    </Link>
                                    {index !== category.length - 1 ? " / " : ""}
                                </span>
                            );
                        })}
                    </span>
                </p>

                <Link href={postUrl}>
                    <h2 className="text-[1.75rem] font-bold font-['Ubuntu',sans-serif] hover:underline underline-offset-4 pb-3">
                        {title}
                    </h2>
                </Link>
                <p className="pb-8 text-lg">{body.substr(0, 138)}...</p>
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
};

export default PostPreview;
