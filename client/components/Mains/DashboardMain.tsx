import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    changeDashboardTopNavIndex,
    selectDashboardTopNavCurrentIndex,
    selectDashboardTopNavPreviousIndex,
} from "../../store/navigationSlice";

type DashboardMainProps = {
    children: React.ReactNode;
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

const links = navElements.map((elem) => elem.link);

const DashboardMain: React.FC<DashboardMainProps> = ({ children }) => {
    const previous = useAppSelector(selectDashboardTopNavPreviousIndex);
    const _currentIndex = useAppSelector(selectDashboardTopNavCurrentIndex);
    const [currentIndex, setCurrentIndex] = useState(previous);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const changeIndex = (newIndex: number) => {
        dispatch(changeDashboardTopNavIndex(newIndex));
    };
    useEffect(() => {
        if (router.pathname !== links[_currentIndex]) router.push("/dashboard");
        const timer = setTimeout(() => {
            setCurrentIndex(_currentIndex);
        }, 40);
        return () => clearTimeout(timer);
    }, []);
    return (
        <main className="ml-60 mr-60 pt-5 h-screen overflow-auto flex flex-col ">
            <nav className="relative">
                <div
                    className={`${topNavElemCSSClasses[currentIndex]} mt-1 h-8 rounded-md mx-8 bg-slate-800 transition-all`}
                ></div>
                <ul className="relative flex flex-row gap-7 px-10 mb-10 mt-2">
                    {navElements.map((elem, index) => (
                        <Link href={elem.link}>
                            <a key={index} onClick={() => changeIndex(index)}>
                                <li
                                    className={`font-bold ${
                                        index == currentIndex ? "text-white" : "text-black"
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
