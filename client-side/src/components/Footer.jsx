// import AuthorImage from "../authorImages/1.jpg";

const Footer = () => {
    return (
        <footer className="border-t-2 border-gray-400 flex flex-col items-center">
            {/* <div className="author py-10 flex flex-col items-center">
                <h3 className="text-3xl font-semibold mb-2">Admin</h3>
                <img
                    src={AuthorImage}
                    alt="Author Image"
                    className="w-44 rounded-full my-5"
                />
                <h2 className="text-3xl font-['Acme',sans-serif]">
                    Modasser Hasan
                </h2>
                <p className="py-2 text-lg font-['Acme',sans-serif]">
                    Rangpur Polytechnic Institute, Rangpur
                </p>
            </div> */}

            <h3 className="pb-1 text-sm font-semibold">
                Copyright 2023 &copy; Modasser Hasan. All Rights Reserved
            </h3>
        </footer>
    );
};

export default Footer;
