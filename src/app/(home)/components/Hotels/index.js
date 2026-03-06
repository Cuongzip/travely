"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse } from "@fortawesome/free-solid-svg-icons"; // Import icon cần dùng
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons"; // Import thêm faStar nếu cần
import "swiper/css";
import "swiper/css/navigation";

import styles from "./Hotels.module.css";

export default function Hotels() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch("/api/hotels");
                const data = await response.json();
                console.log(data);
                setHotels(data.hotels || []);
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            }
        };
        fetchHotels();
    }, []);

    return (
        <section className={styles.hotels}>
            <div className={styles.container}>
                <h1 className={styles.title}>Khách sạn gần bạn</h1>
                <div className={styles.sliderWrapper}>
                    <Swiper
                        modules={[Navigation, EffectCoverflow]}
                        spaceBetween={40}
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}
                        effect="coverflow"
                        grabCursor={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 80,
                            modifier: 2,
                            slideShadows: false
                        }}
                        navigation={{
                            nextEl: `.${styles.nextBtn}`,
                            prevEl: `.${styles.prevBtn}`,
                        }}
                        watchSlidesProgress={true}
                        slideVisibleClass="swiper-slide-visible"
                        className={styles.slider}
                    >
                        {hotels.map((hotel, index) => (
                            <SwiperSlide key={hotel._id}>
                                <div className={styles.card}>
                                    <div className={styles.imgWrapper}>
                                        <img
                                            src={`/images/hotels/hotel${index === 0 ? '' : index}.webp`}
                                            alt={hotel.name}
                                            className={styles.img}
                                        />
                                        <div className={styles.CardHeadInfo}>
                                            <div className={styles.ratingBadge}><FontAwesomeIcon icon={faStar} />{hotel.rate.toFixed(2)}</div>
                                            <button className={styles.wishlistBtn}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                        
                                    </div>
                                    <div className={styles.info}>
                                        <h3 className={styles.name}>{hotel.name}</h3>
                                        <p className={styles.price}>{hotel.price}</p>
                                        <div className={styles.details}>
                                            <span className={styles.detail}><FontAwesomeIcon icon={faBed} />{hotel.bedroomCount}</span>
                                            <span className={styles.detail}><FontAwesomeIcon icon={faHouse} />{hotel.area}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button className={styles.prevBtn}>
                        ❮
                    </button>
                    <button className={styles.nextBtn}>
                        ❯
                    </button>
                </div>
            </div>
        </section>
    );
}
