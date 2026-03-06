"use client";
import { useState } from "react";
import clsx from "clsx";

import styles from "./Search.module.css";

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className={styles.trigger} onClick={() => setIsOpen(true)}>
                <i className="fi fi-br-search"></i>
            </button>

            <div
                className={clsx(styles.modal, { [styles.open]: isOpen })}
                onClick={() => setIsOpen(false)}
            >
                <form
                    className={styles.form}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.group}>
                        <label htmlFor="location">
                            <i className="fi fi-br-search"></i>
                        </label>
                        <input
                            id="location"
                            name="location"
                            placeholder="Nhập địa điểm"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.group}>
                        <i className="fi fi-rr-daily-calendar"></i>
                        <span>Ngày nhận phòng</span>

                        <div className={styles.line}></div>
                        <span>Ngày trả phòng</span>
                    </div>

                    <div className={styles.group}>
                        <div className={styles.box}>
                            <i className="fi fi-rr-user"></i>
                            <span> Số lượng khách</span>
                        </div>
                        <i className="fi fi-sr-angle-small-down"></i>
                    </div>
                    <button className={clsx("button", styles.button)}>
                        Đặt phòng
                    </button>
                </form>
            </div>
        </>
    );
}
