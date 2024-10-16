import React from "react";

const page = () => {
    return (
        <div className="lg:w-2/3 pb-10">
            <h2 className="text-2xl font-bold mb-4 underline underline-offset-8">
                About US
            </h2>
            <p className="text-lg mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                nobis eum debitis iure architecto repellat facere consequatur
                modi, mollitia rerum quas quisquam similique?
            </p>

            <div className="thanks mb-10">
                <h3 className="text-2xl mb-4 font-bold underline underline-offset-8">
                    Spacial Thanks to Our CEO
                </h3>
                <h4 className="text-xl font-semibold">Modasser Hasan</h4>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam atque cum itaque eius. Quam at harum nulla quia
                    veniam quis. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Consequuntur, sed!
                </p>
            </div>

            <div className="thanks">
                <h3 className="text-2xl mb-4 font-semibold underline underline-offset-8">
                    Thanks to Our CFO
                </h3>
                <h4 className="text-xl font-semibold">Rahat Khan</h4>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam atque cum itaque eius. Quam at harum nulla quia
                    veniam quis.
                </p>
            </div>
        </div>
    );
};

export default page;
