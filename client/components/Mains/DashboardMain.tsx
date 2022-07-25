import Link from "next/link";
import React, { useState } from "react";

type DashboardMainProps = {
    children: React.ReactNode;
    topNavElem: number;
    setTopNavElem: React.Dispatch<React.SetStateAction<number>>;
};

const topNavElemCSSClasses = [
    "absolute w-[5.5rem]",
    "absolute left-[6rem] w-[10.2rem]",
    "absolute left-[16.5rem] w-[7.8rem]",
    "absolute left-[24.8rem] w-[7.5rem]",
];

const navElements = [
    { name: "Summary", link: "/dashboard" },
    { name: "Income Statement", link: "/dashboard/income-statement" },
    { name: "Balance Sheet", link: "/dashboard/balance-sheet" },
    { name: "Cash Analysis", link: "/dashboard/cash-analysis" },
];

const DashboardMain: React.FC<DashboardMainProps> = ({ children, topNavElem, setTopNavElem }) => {
    return (
        <main className="ml-60 mr-60 pt-5 h-screen overflow-auto flex flex-col ">
            <nav className="relative">
                <div
                    className={`${topNavElemCSSClasses[topNavElem]} mt-1 h-8 rounded-md mx-8 bg-slate-800 transition-all delay-100`}
                ></div>
                <ul className="relative flex flex-row gap-7 px-10 mb-10 mt-2">
                    {navElements.map((elem, index) => (
                        <Link href={elem.link}>
                            <a key={index} onClick={() => setTopNavElem(index)}>
                                <li
                                    className={`font-bold ${
                                        index == topNavElem ? "text-white" : "text-black"
                                    }`}
                                >
                                    {elem.name}
                                </li>
                            </a>
                        </Link>
                    ))}
                </ul>
            </nav>
            {children}
        </main>
    );
};

export default DashboardMain;
