"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./Header.module.css";
import { Sidebar, Search, Nav, Logo, User } from "./components";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={clsx("container", styles.header, {
                [styles.scrolled]: isScrolled,
            })}
        >
            <Logo />
            <Nav />
            <Search />
            <User />
            <Sidebar />
        </header>
    );
}
