import PostView from "@/components/PostsView";

const page = async ({ params }) => {
    const limit = 8;
    const postsData = await (
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?query=${params.query}&limit=${limit}`
        )
    ).json();

    console.log("🚀 ~ page ~ postsData:", postsData);
    return (
        <PostView
            postsDataPrimary={postsData}
            limit={limit}
            customUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts?query=${params.query}&limit=${limit}`}
            title={`Search: ${params.query}`}
        />
    );
};

export default page;
