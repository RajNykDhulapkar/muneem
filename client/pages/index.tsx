import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bannerImage from "../assets/banner.svg";
import WebpageLayout from "../components/Layouts/WebpageLayout";

const Home: NextPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    return (
        <WebpageLayout pageTitle="Welcome | Muneem" isLoggedIn={isLoggedIn}>
            <section className="flex flex-row pt-10 pb-10 justify-around">
                <div className="flex md:flex-row md:justify-between md:items-center flex-col justify-between lg:w-5/6  w-full pr-3 pl-3">
                    <div className="md:w-3/5 h-fit grid grid-row-3 gap-3">
                        <h1 className="text-5xl">Let's start something big With us.</h1>
                        <p className="text-xl pt-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, non?
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Esse, explicabo? Lorem. inpiums
                        </p>
                        <div className="flex flex-row md:justify-start sm:justify-center">
                            <Link href="/auth/register">
                                <button className="bg-slate-800 text-white p-3 pl-5 pr-5 rounded-md w-fit h-fit">
                                    Get started
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="sm:pt-10">
                        <Image src={bannerImage} alt="banner" height={300} />
                    </div>
                </div>
            </section>

            <section className="flex flex-row pt-10 pb-10 justify-around text-white">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:w-5/6  w-full pr-3 pl-3">
                    <div className="bg-slate-800 rounded-md   max-w-sm m-auto p-5 pt-7 pb-8">
                        <h2 className="text-center text-2xl mb-3">Manage Transactions</h2>
                        <p className="text-center text-base text-slate-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, sunt?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
                            excepturi! Lorem ipsum dolor sit amet.
                        </p>
                    </div>

                    <div className="bg-slate-800 rounded-md  max-w-sm m-auto p-5 pt-7 pb-8">
                        <h2 className="text-center text-2xl mb-3">Analyze Monthly Profits</h2>
                        <p className="text-center text-base text-slate-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis vel
                            nisi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
                            excepturi! Lorem ipsum dolor.
                        </p>
                    </div>

                    <div className="bg-slate-800 rounded-md p-5 pt-7 pb-8  lg:col-span-1 md:col-span-2 max-w-sm m-auto">
                        <h2 className="text-center text-2xl mb-3">View Income Statement</h2>
                        <p className="text-center text-base text-slate-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nihil
                            modi? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
                            excepturi! Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>
            </section>
        </WebpageLayout>
    );
};

export default Home;
