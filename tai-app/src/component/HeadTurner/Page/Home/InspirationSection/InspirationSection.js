import React from "react";
import "./InspirationSection.css";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const InspirationSection = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <section className="inspiration-section">
            <div className="inspiration-left">
                <div className="info">
                    <p className="subtitleS">TẠI SAO CHỌN CHÚNG TÔI?</p>
                    <h2 className="title1">
                        KHÁM PHÁ CẢM HỨNG <br /> HEAD TURNER
                    </h2>
                    <p className="description">
                        Head Turner mang đến cho bạn khả năng trải nghiệm không
                        chỉ là cắt tóc hay cạo râu cổ điển mà còn là bầu không
                        khí cổ điển bao quanh bạn khi bạn bước vào một tiệm hớt
                        tóc cổ điển.
                    </p>
                    <Link to="/about" onClick={scrollToTop}>
                        <button className="see-more-btn">XEM THÊM</button>
                    </Link>
                </div>
            </div>
            <div className="inspiration-right">
                <img
                    src="https://theme.hstatic.net/200000893323/1001256440/14/home_about_banner_2.jpg?v=1595"
                    alt="Barbershop"
                />
            </div>
        </section>
    );
};

export default InspirationSection;
