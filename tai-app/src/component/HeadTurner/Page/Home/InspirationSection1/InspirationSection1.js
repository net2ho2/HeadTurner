import React from "react";
import "./InspirationSection1.css";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const InspirationSection1 = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <section className="inspiration-section">
            <div className="inspiration-left">
                <div className="info">
                    <p className="subtitleS">TẠI SAO CHỌN CHÚNG TÔI?</p>
                    <h2 className="title2">CHĂM SÓC VÀ LÀM ĐẸP NAM</h2>
                    <p className="description">
                        Head Turner cung cấp những sản phẩm tốt nhất dành cho
                        nam giới.
                    </p>
                    <Link to="/about" onClick={scrollToTop}>
                        <button className="see-more-btn">XEM THÊM</button>
                    </Link>
                </div>
            </div>
            <div className="inspiration-right">
                <img
                    src="https://theme.hstatic.net/200000893323/1001256440/14/home_about_banner_3.jpg?v=1595"
                    alt="Barbershop"
                />
            </div>
        </section>
    );
};

export default InspirationSection1;
