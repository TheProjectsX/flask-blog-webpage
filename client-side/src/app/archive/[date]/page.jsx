import PostView from "@/components/PostsView";

const page = async ({ params }) => {
    const archiveData = decodeURIComponent(params.date).replace("+", " ");
    const limit = 8;
    const postsData = await (
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/archive/${archiveData}?limit=${limit}`
        )
    ).json();

    return (
        <PostView
            title={`Date: ${archiveData}`}
            postsDataPrimary={postsData}
            customUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/archive/${archiveData}`}
            limit={limit}
        />
    );
};

export default page;
