"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className={styles.trigger} onClick={() => setIsOpen(true)}>
                <i className="fi fi-br-menu-burger"></i>
            </button>
            <div
                className={clsx(styles.modal, { [styles.open]: isOpen })}
                onClick={() => setIsOpen(false)}
            >
                <aside
                    className={styles.sidebar}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.head}>
                        <div className={styles.avatar}>
                            <Image
                                src="/images/logo.png"
                                width={50}
                                height={50}
                                alt="avatar"
                            />
                        </div>
                        <div className={styles.headInfo}>
                            <span>VIP</span>
                            <span>Alex</span>
                        </div>
                    </div>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li>
                                <Link className={styles.navLink} href="/">
                                    <i className="fi fi-rr-home"></i>
                                    <span>Trang chủ</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={styles.navLink}
                                    href="/destination"
                                >
                                    <i className="fi fi-rs-marker"></i>
                                    <span>Điểm đến</span>
                                </Link>
                            </li>
                            <li>
                                <Link className={styles.navLink} href="/blog">
                                    <i className="fi fi-rr-blog-pencil"></i>
                                    <span>Blog</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={styles.navLink}
                                    href="/contact"
                                >
                                    <i className="fi fi-rs-phone-call"></i>
                                    <span> Liên hệ</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.tail}>
                        <Link className={styles.logout} href="/logout">
                            <i className="fi fi-br-exit"></i>
                            <span>Đăng xuất</span>
                        </Link>
                    </div>
                </aside>
            </div>
        </>
    );
}
