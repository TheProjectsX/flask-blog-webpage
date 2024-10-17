import PostView from "@/components/PostsView";

const page = async () => {
    const limit = 8;
    const postsData = await (
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?limit=${limit}`
        )
    ).json();

    return <PostView postsDataPrimary={postsData} limit={limit} />;
};

export default page;
