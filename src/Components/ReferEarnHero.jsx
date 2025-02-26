import React, { Fragment, useState } from "react";
import referSvg from "../assets/referralBy.svg"
import Popup from "./Popup";
const ReferEarnHero = () => {
    return (
        <Fragment>
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 refer-form">
                <div className="container mx-auto px-5 py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:w-1/2 text-white">
                            <h1 className="text-3xl md:text-5xl font-bold mb-6">
                                Refer & Earn with Friends!
                            </h1>
                            <p className="text-base md:text-xl mb-8 opacity-90">
                                Invite your friends to join and unlock amazing rewards for both of you. Share the joy and earn exclusive bonuses!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Popup />
                            </div>
                            <div className="mt-12 flex items-center gap-10 flex-wrap justify-center">
                                <div className="text-center">
                                    <p className="text-3xl md:text-xl font-bold">₹500</p>
                                    <p className="text-sm  opacity-80">You Earn</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl md:text-xl font-bold">₹250</p>
                                    <p className="text-sm  opacity-80">They Earn</p>
                                </div>
                                <div className="flex justify-center gap-3">
                                    <img src={referSvg} alt="refer-image" />
                                    <div className="text-center">

                                        <p className="text-3xl md:text-xl font-bold">2k+</p>
                                        <p className="text-sm opacity-80">Happy Users</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl"></div>
                                <img
                                    src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822526/samples/man-on-a-street.jpg"
                                    alt="Refer and Earn"
                                    className="relative rounded-lg shadow-2xl w-full object-cover"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                                    <div className="text-purple-700 font-bold text-lg">Invite Friends</div>
                                    <div className="text-gray-600 text-sm">Get rewards instantly</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default ReferEarnHero;