import styles from "./Nav.module.css";
import Link from "next/link";

export default function Nav() {
    return (
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
    );
}
