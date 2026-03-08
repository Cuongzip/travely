import Image from "next/image";
import styles from "./Features.module.css";

const cities = [
{ name: "Dubai", img: "/images/backgrounds/indonesia.webp" },
{ name: "Paris", img: "/images/backgrounds/denmark.webp", big: true },
{ name: "Tbilisi", img: "/images/backgrounds/italy.webp" },
{ name: "Istanbul", img: "/images/backgrounds/japan.webp" },
{ name: "Taiwan", img: "/images/locations/Dao-Padar.webp" },
];

export default function Features() {
return (
    <section className={styles.section}>
    <div className={styles.container}>
        
        {/* LEFT */}
        <div className={styles.left}>
        <h2>Luôn cập nhật thông tin mới nhất</h2>

        <p>
            Đăng ký để nhận email từ Travelly.com với các chương trình
            khuyến mãi, ưu đãi hấp dẫn và thông tin về điểm đến,
            sản phẩm, dịch vụ mới giúp bạn lên kế hoạch cho chuyến đi
            dễ dàng hơn.
        </p>

        <div className={styles.form}>
            <input placeholder="Địa chỉ email của bạn" />
            <button>Đăng ký</button>
        </div>

        <span className={styles.note}>
            Hủy đăng ký bất cứ lúc nào. Xem chính sách bảo mật.
        </span>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
        <div className={styles.header}>
            <h3>Điểm đến nổi bật</h3>
            <p>Những điểm đến được yêu thích nhất bởi du khách</p>
        </div>

        <div className={styles.grid}>
            {cities.map((city, i) => (
            <div
                key={i}
                className={`${styles.card} ${city.big ? styles.big : ""}`}
            >
                <Image
                src={city.img}
                alt={city.name}
                width={300}
                height={200}
                />

                <span>{city.name}</span>
            </div>
            ))}
        </div>
        </div>

    </div>
    </section>
);
}