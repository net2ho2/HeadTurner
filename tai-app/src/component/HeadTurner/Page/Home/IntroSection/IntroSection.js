import React from "react";
import "./IntroSection.css";
import ButtonBody from "../../../Button/ButtonBody/ButtonBody";

const IntroSection = () => {
    return (
        <div className="intro-section">
            <div className="item">
                <div className="intro-image">
                    <img
                        className="brush-image"
                        src="https://theme.hstatic.net/200000893323/1001256440/14/home_about_banner_left.jpg?v=1587" // hoặc hình bàn chải bạn upload
                        alt="Shaving Brush"
                    />
                    <img
                        className="barber-image"
                        src="//theme.hstatic.net/200000893323/1001256440/14/home_about_banner.jpg?v=1595" // hình người cắt tóc
                        alt="Barber working"
                    />
                    <div className="content">
                        <div className="intro-content">
                            <p className="intro-subtitle">GIỚI THIỆU</p>
                            <h2 className="intro-title">
                                HEAD TURNER GIÚP BẠN <br /> TỎA SÁNG
                            </h2>
                            <p className="intro-description">
                                Chúng tôi có mọi thứ mà bạn thực sự cần: bầu không khí, tinh thần đoàn kết, sự chuyên nghiệp của những người thợ tay nghề cao và duy trì truyền thống cắt tóc, cùng nhu
                                cà phê hào hứng giúp bạn thoải mái
                            </p>
                            <button className="intro-button">XEM THÊM</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
