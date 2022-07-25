import { useRouter } from "next/router";
import React from "react";

type ActiveLinkProps = {
    children: React.ReactNode;
    href: string;
    customOnClickEvent?: () => void;
};

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href, customOnClickEvent }) => {
    const router = useRouter();
    const handleClick = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (customOnClickEvent) customOnClickEvent();
        setTimeout(() => {
            router.push(href);
        }, 3000);
    };
    return (
        <a href={href} onClick={() => handleClick}>
            {children}
        </a>
    );
};

export default ActiveLink;
