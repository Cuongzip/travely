import styles from "./Logo.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className={styles.logo}>
            <Image src="/images/logo.png" width={670} height={670} alt="logo" />

            <h1>Travely</h1>
        </Link>
    );
}
