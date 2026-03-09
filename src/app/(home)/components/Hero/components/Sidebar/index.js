import clsx from "clsx";

import styles from "./Sidebar.module.css";
export default function Sidebar({ itemCount, activeIndex }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLine}></div>
            <ul className={styles.sidebarList}>
                {Array(itemCount)
                    .fill()
                    .map((value, index) => {
                        return (
                            <li
                                key={index}
                                className={clsx(styles.sidebarItem, {
                                    [styles.sidebarItemActive]:
                                        index === activeIndex,
                                })}
                            >
                                {index + 1}
                            </li>
                        );
                    })}
            </ul>
        </aside>
    );
}
