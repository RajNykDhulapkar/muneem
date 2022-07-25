import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Aside from "../Aside/Aside";
import Sidebar from "../Sidebar";

type DashboardLayoutProps = {
    pageTitle: string;
    children: React.ReactNode;
    currentNavlinkIndex: number;
    setCurrentNavlinkIndex: React.Dispatch<React.SetStateAction<number>>;
};

const DashboardLayout: NextPage<DashboardLayoutProps> = ({
    pageTitle,
    children,
    currentNavlinkIndex,
    setCurrentNavlinkIndex,
}) => {
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon-logo.png" />
            </Head>
            <div className="relative bg-slate-200 overflow-hidden max-h-screen">
                {/* body */}
                <div>
                    {/* sidebar */}
                    <Sidebar
                        currentNavlinkIndex={currentNavlinkIndex}
                        setCurrentNavlinkIndex={setCurrentNavlinkIndex}
                    />
                    {/* main area */}
                    {children}
                    {/* aside */}
                    <Aside></Aside>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
