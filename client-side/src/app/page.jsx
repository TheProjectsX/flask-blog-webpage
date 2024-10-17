import Home from "./Home";

const page = async () => {
    const postsData = await (
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`)
    ).json();
    const sideBarData = await (
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/home/sidebar`)
    ).json();

    return <Home postsData={postsData.data} sideBarData={sideBarData.data} />;
};

export default page;
