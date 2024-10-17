import FacebookIcon from "@/icons/facebook2.svg";
import TwitterIcon from "@/icons/twitter.svg";
import MailIcon from "@/icons/mail.svg";
import Link from "next/link";

const page = async ({ params }) => {
    const postData = await (
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${params.id}`)
    ).json();
    return (
        <div className="lg:w-2/3 pb-10">
            <div className="border-b-2 border-gray-300 pb-4">
                <img
                    src={postData.imageUrl}
                    alt={postData.title}
                    className="pb-4 w-full max-h-[490px]"
                />
                <p className="pb-2 text-sm text-gray-400">
                    <span className="cursor-pointer hover:text-gray-600">{`${new Date(
                        postData.createdAt
                    ).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}`}</span>
                    &nbsp;&nbsp;●&nbsp;&nbsp;
                    <span className="cursor-pointer hover:text-gray-600">
                        {postData.tags.join(" / ")}
                    </span>
                </p>
                <h2 className="text-[1.75rem] font-bold font-['Ubuntu',sans-serif] pb-3">
                    {postData.title}
                </h2>
                <div className="author flex items-center gap-3 mb-6">
                    <img
                        src={postData.authorInfo.profilePicture}
                        alt="Author"
                        className="w-10 rounded-full"
                    />
                    <p className="text-lg">
                        Posted By{" "}
                        <Link
                            href={`/author/${postData.authorInfo._id}`}
                            className="px-1 text-primary hover:text-black active:text-orange-400 dark:hover:text-white"
                        >
                            {postData.authorInfo.username}
                        </Link>
                    </p>
                </div>
                <p className="text-lg md:text-xl whitespace-pre-line">
                    {postData.content}
                </p>

                <div className="buttons flex justify-between py-6">
                    <a
                        href="#"
                        className="bg-[#3b5998] w-[32%] rounded-md flex justify-center"
                    >
                        <img
                            className="w-6 py-4"
                            src={FacebookIcon.src}
                            alt="Share to Facebook"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-[#55acee] w-[32%] rounded-md flex justify-center"
                    >
                        <img
                            className="w-6 py-4"
                            src={TwitterIcon.src}
                            alt="Share to Twitter"
                        />
                    </a>
                    <a
                        href="#"
                        className="bg-[#8c8c8c] w-[32%] rounded-md flex justify-center"
                    >
                        <img
                            className="w-6 py-4"
                            src={MailIcon.src}
                            alt="Share via Mail"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default page;
