import Slider from "@/components/Slider";
import PostView from "@/components/PostsView";
import Sidebar from "@/components/Sidebar";

const page = async () => {
    const limit = 8;
    const postsData = await (
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?limit=${limit}`
        )
    ).json();
    const sideBarData = await (
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/home/sidebar`)
    ).json();

    return (
        <div className="overflow-hidden">
            <Slider sliderPosts={postsData.data.slice(0, 4)} />
            <div className="flex flex-col lg:flex-row lg:gap-10 xl:justify-between">
                <PostView postsDataPrimary={postsData} limit={limit} />
                <Sidebar sideBarData={sideBarData.data} />
            </div>
        </div>
    );
};

export default page;
