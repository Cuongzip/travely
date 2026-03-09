import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.section}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <spa>Travely</spa>
                        <span>.com</span>
                    </div>

                    <div className={styles.start}>
                        <p>Sẵn sàng bắt đầu?</p>
                        <button className="button">Bắt đầu ngay</button>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.mid}>
                    <div className={styles.newsletter}>
                        <h3>Đăng ký nhận bản tin</h3>

                        <div className={styles.input}>
                            <input placeholder="Địa chỉ email" />
                            <button className="button">
                                <i className="fi fi-sr-angle-small-right"></i>
                            </button>
                        </div>
                    </div>

                    <div className={styles.columns}>
                        <div className={styles.column}>
                            <h4>Dịch vụ</h4>
                            <p>Tiếp thị qua Email</p>
                            <p>Chiến dịch</p>
                            <p>Xây dựng thương hiệu</p>
                            <p>Sự kiện trực tiếp</p>
                        </div>

                        <div className={styles.column}>
                            <h4>Giới thiệu</h4>
                            <p>Câu chuyện</p>
                            <p>Lợi ích</p>
                            <p>Đội ngũ</p>
                            <p>Tuyển dụng</p>
                        </div>

                        <div className={styles.column}>
                            <h4>Hỗ trợ</h4>
                            <p>FAQs</p>
                            <p>Liên hệ</p>
                        </div>
                    </div>
                </div>

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
