import styles from "./Footer.module.css";

export default function Footer() {
return (
<footer className={styles.section}>
    <div className={styles.container}>
    
    {/* TOP */}
    <div className={styles.top}>
        <div className={styles.logo}>
        Travelly<span>.com</span>
        </div>

        <div className={styles.start}>
        <p>Sẵn sàng bắt đầu?</p>
        <button>Bắt đầu ngay</button>
        </div>
    </div>

    <div className={styles.divider}></div>

    {/* FOOTER GRID */}
    <div className={styles.grid}>
        
        {/* newsletter */}
        <div className={styles.newsletter}>
        <h4>Đăng ký nhận bản tin</h4>

        <div className={styles.input}>
            <input placeholder="Email address" />
            <button>›</button>
        </div>
        </div>

        {/* services */}
        <div style={{ marginLeft: '40px' }}>
        <h4>Dịch vụ</h4>
        <p>Tiếp thị qua Email</p>
        <p>Chiến dịch</p>
        <p>Xây dựng thương hiệu</p>
        <p>Sự kiện trực tiếp</p>
        </div>

        {/* about */}
        <div style={{ marginLeft: '40px' }}>
        <h4>Giới thiệu</h4>
        <p>Câu chuyện</p>
        <p>Lợi ích</p>
        <p>Đội ngũ</p>
        <p>Tuyển dụng</p>
        </div>

        {/* support */}
        <div>
        <h4>Hỗ trợ</h4>
        <p>FAQs</p>
        <p>Liên hệ</p>
        </div>
    </div>

    {/* bottom */}
    <div className={styles.bottom}>
        <div className={styles.legal}>
        <p>Điều khoản & Điều kiện</p>
        <p>Chính sách bảo mật</p>
        </div>

        <div className={styles.social}>
        <span>f</span>
        <span>t</span>
        <span>◎</span>
        </div>
    </div>

    </div>
</footer>
);
}