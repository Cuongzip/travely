import Image from "next/image";
import styles from "./AccommodationTypes.module.css";

const types = [
{ title: "Khách sạn", img: "/images/accommodation-types/hotel.webp" },
{ title: "Căn hộ", img: "/images/accommodation-types/apartment.webp" },
{ title: "Khu nghỉ dưỡng", img: "/images/accommodation-types/resort.webp" },
{ title: "Biệt thự", img: "/images/accommodation-types/villa.webp" },
{ title: "Nhà nghỉ sân vườn", img: "/images/accommodation-types/garden-motel.webp" },
];

export default function AccommodationTypes() {
return (
    <section className={styles.section}>
    
    <div className={styles.header}>
        <h2>Phân loại theo loại hình lưu trú</h2>

        <p>
        Bạn có thể dễ dàng tìm kiếm và lọc kết quả theo loại hình lưu trú.
        Tính năng này cho phép bạn lựa chọn khách sạn hoặc các phương án
        khác như nhà nghỉ, căn hộ du lịch hay homestay, phù hợp với sở
        thích và nhu cầu của mình.
        </p>
    </div>

    <div className={styles.slider}>
        
        {/* <button className={styles.arrow}>‹</button> */}

        <div className={styles.grid}>
        {types.map((item, index) => (
            <div key={index} className={styles.card}>
            
            <div className={styles.image}>
                <Image
                src={item.img}
                alt={item.title}
                width={240}
                height={320}
                />
            </div>

            <span>{item.title}</span>

            </div>
        ))}
        </div>

        {/* <button className={styles.arrow}>›</button> */}

    </div>

    <div className={styles.dots}>
        <span />
        <span className={styles.active} />
        <span />
    </div>

    </section>
);
}