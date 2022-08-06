import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import navigationLinks from "./navigationLinks";
import {
    changeSideBarNavlinkIndex,
    selectSideBarNavlinkCurrentIndex,
    selectSideBarNavlinkPreviousIndex,
} from "../../store/navigationSlice";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
type SidebarProps = {};

const sidebarSliderStyleOptions = [
    "top-0",
    "top-[2.5rem]",
    "top-[5rem]",
    "top-[7.5rem]",
    "top-[10rem]",
];

const Sidebar: React.FC<SidebarProps> = () => {
    const previous = useAppSelector(selectSideBarNavlinkPreviousIndex);
    const _currentIndex = useAppSelector(selectSideBarNavlinkCurrentIndex);
    const [currentIndex, setCurrentIndex] = useState(previous);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const changeIndex = (newIndex: number) => {
        dispatch(changeSideBarNavlinkIndex(newIndex));
    };
    useEffect(() => {
        if (
            router.pathname !== navigationLinks[_currentIndex].link &&
            !navigationLinks[_currentIndex].subLinks?.includes(router.pathname)
        )
            router.push("/dashboard");
        const timer = setTimeout(() => {
            setCurrentIndex(_currentIndex);
        }, 40);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60 p-4 flex flex-col items-start gap-2 divide-y-2 divide-slate-800 divide-opacity-50">
            {/* logo */}
            <div className="flex-none  flex flex-row flex-nowrap">
                <div className="">
                    <svg
                        className="p-1"
                        width="45"
                        height="45"
                        viewBox="0 0 300 300"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="fill-black dark:fill-white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M300 0L262.5 38.6974V38.8742L149.86 155.111L0 0.464892V0.506275V55.1913V299.509H6.25V61.6409L149.784 209.758L150.19 209.339L150.266 209.418L262.5 93.6007V300H300V54.9032V0.176818V0ZM150.025 223.646L253.125 117.254V117.312H253.204V299.865H246.954V178.349L150.266 278.123L150.025 277.874L149.784 278.123L51.875 177.088V299.865H14.375V138.391V98.0335V83.6644L150.025 223.646Z"
                            fill="#FFFEFE"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl self-end  m-0">uneem</h1>
            </div>

            {/* navlinks */}
            <div className="relative flex-grow h-max min-w-full">
                <div
                    className={
                        "absolute min-w-full h-10 mt-4 rounded-md bg-slate-800 transition-all " +
                        sidebarSliderStyleOptions[currentIndex]
                    }
                ></div>
                <ul className="relative flex flex-col gap-4 py-6">
                    {navigationLinks.map((navLink, index: number) => (
                        <Link href={navLink.link}>
                            <a key={index} onClick={() => changeIndex(index)}>
                                <li
                                    className={`flex  flex-row items-end px-2 transition-all delay-75 ${
                                        index == currentIndex ? "text-white" : ""
                                    }`}
                                >
                                    {navLink.svgIcon(
                                        index == currentIndex ? "fill-white" : "fill-black",
                                    )}

                                    <p className="text-base pl-1">{navLink.name}</p>
                                </li>
                            </a>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* help */}
            {/* chat */}
            <div className="flex-none min-w-full p-2">
                <div className="text-base">Help</div>
                <div className="text-base">Chat</div>
            </div>
        </div>
    );
};

export default Sidebar;
