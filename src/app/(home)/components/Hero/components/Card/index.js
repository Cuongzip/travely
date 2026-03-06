"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./Card.module.css";
import clsx from "clsx";

export default function Card({ data, isActive }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div
            className={clsx({
                [styles.cardActive]: isActive,
            })}
        >
            <h3 className={styles.name}>{data[activeIndex].name}</h3>
            <ul className={styles.dots}>
                {data.map((value, index) => {
                    return (
                        <li
                            key={index}
                            className={clsx(styles.dot, {
                                [styles.dotActive]: activeIndex === index,
                            })}
                            onClick={() => setActiveIndex(index)}
                        ></li>
                    );
                })}
            </ul>
            <div className={styles.image}>
                <Image
                    src={data[activeIndex].image}
                    alt="location"
                    width={300}
                    height={400}
                />
            </div>
        </div>
    );
}
