import PostView from "@/components/PostsView";

const page = async ({ params }) => {
    const category = params.category;

    const limit = 8;
    const postsData = await (
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/category/${category}?limit=${limit}`
        )
    ).json();

    return (
        <PostView
            title={`Category: ${category}`}
            postsDataPrimary={postsData}
            customUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/category/${category}`}
            limit={limit}
        />
    );
};

export default page;
