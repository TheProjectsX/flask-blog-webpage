import Link from "next/link";

const PostPreview = (props) => {
    const { imageUrl, title, content, _id, createdAt, tags } = props.post;
    const postUrl = `/posts/${_id}`;
    const monthUrl = `/archive/${new Date(createdAt)
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase()}+${new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
    })}`;
    // const monthUrl = "";

    return (
        <div className="flex flex-col mb-16 sm:flex-row gap-4 sm:gap-8">
            <div className="space-y-3">
                <Link href={postUrl}>
                    <img src={imageUrl} alt={title} />
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
                    >
                        {`${new Date(createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}`}
                    </Link>
                    &nbsp;&nbsp;●&nbsp;&nbsp;
                    <span>
                        {tags.map((item, index) => {
                            return (
                                <span key={index}>
                                    <Link
                                        href={`/category/${item.toLowerCase()}`}
                                        className="cursor-pointer hover:text-gray-500"
                                    >
                                        {item}
                                    </Link>
                                    {index !== tags.length - 1 ? " / " : ""}
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
                <p className="pb-8 text-lg">{content.substr(0, 138)}...</p>
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
