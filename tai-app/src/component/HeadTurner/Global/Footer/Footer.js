import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>LIÊN KẾT</h3>
                    <ul>
                        <li>
                            <Link to="/search">Tìm kiếm</Link>
                        </li>
                        <li>
                            <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link to="/return-policy">Chính sách đổi trả</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy">Chính sách bảo mật</Link>
                        </li>
                        <li>
                            <Link to="/terms-of-service">Điều khoản dịch vụ</Link>
                        </li>
                        <li>
                            <Link to="/contact">Liên hệ</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-section center">
                    <h2>Head Turner</h2>
                    <p>
                        Head Turner chuyên cắt và tạo mẫu tóc nam, đào tạo cắt tóc nam, Tattoo hair,... Với 15 năm kinh nghiệm trong nghề Bạn sẽ trải nghiệm được dịch vụ tốt nhất của chúng tôi. Chúng
                        tôi tự tin là sự lựa chọn hàng đầu cho bạn.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>THÔNG TIN HEAD TURNER</h3>
                    <p>1234, đường Mai Chí Thọ, phường 15, Thủ Đức, Tp. Hồ Chí Minh.</p>
                    <p>1900.000.XXX</p>
                    <p>hi@head-turner.abc</p>
                    <p>Thứ 2 đến thứ 7 : 8:00am – 8:00pm</p>
                    <p>Chủ nhật : 8:00am – 12:00pm</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright © 2024 Head Turner. Powered by Haravan</p>
                <div className="social-icons">
                    <a href="#">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
