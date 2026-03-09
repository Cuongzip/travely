"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./Header.module.css";
import { Sidebar, Search } from "./components";

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
            <Link href="/" className={styles.logo}>
                <Image
                    src="/images/logo.png"
                    width={670}
                    height={670}
                    alt="logo"
                />

                <h1>Travely</h1>
            </Link>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <Link className={styles.navLink} href="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} href="/destination">
                            Điểm đến
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} href="/blog">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} href="/contact">
                            Liên hệ
                        </Link>
                    </li>
                </ul>
            </nav>
            <Search />
            <div className={styles.user}>Hello, alex!</div>

            <Sidebar />
        </header>
    );
}
