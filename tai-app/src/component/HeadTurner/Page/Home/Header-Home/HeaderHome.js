import React, { use, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import "./HeaderHome.css";
import Header from "../../../Global/Header/Header";

const HeaderHome = () => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);
    const handleToggle = (style) => {
        if (style === "search") {
            setToggleSearch(!toggleSearch);
            setToggleLogin(false); // tắt login nếu mở search
        } else if (style === "login") {
            setToggleLogin(!toggleLogin);
            setToggleSearch(false); // tắt search nếu mở login
        } else {
            setToggleSearch(!toggleSearch);
        }
    };
    const handleBookingClick = () => {
        window.location.href = "/#booking-section";
    };
    useEffect(() => {
        setToggleSearch(false);
    }, []);
    return (
        <div className="header-wrapper">
            <div className="baner">
                <Carousel
                    fade
                    controls={true}
                    indicators={false}
                    interval={4000}
                    pause="hover"
                >
                    <Carousel.Item>
                        <div className="carousel-image-wrapper">
                            <img
                                className="carousel-image"
                                src="https://theme.hstatic.net/200000893323/1001256440/14/slide_1_img.jpg?v=1595"
                                alt="Slide 1"
                            />
                            <div className="carousel-overlay" />
                            <div className="carousel-caption custom-caption">
                                <div className="img-carousel">
                                    <img
                                        src="https://theme.hstatic.net/200000893323/1001256440/14/slide_img_1.jpg?v=1595"
                                        alt=""
                                    />
                                </div>
                                <h2 className="title">
                                    HỆ THỐNG CỬA HÀNG CHĂM SÓC <br />
                                    <span className="highlight">TÓC NAM</span>
                                </h2>
                                <p className="description">
                                    Những thợ tóc giỏi nhất sẽ tạo nên ấn tượng
                                    đầu tiên của bạn.
                                </p>
                                <button
                                    className="hero-button"
                                    onClick={handleBookingClick}
                                >
                                    ĐẶT LỊCH NGAY
                                </button>
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="carousel-image-wrapper">
                            <img
                                className="carousel-image"
                                src="https://theme.hstatic.net/200000893323/1001256440/14/slide_4_img.jpg?v=1595"
                                alt="Slide 1"
                            />
                            <div className="carousel-overlay" />
                            <div className="carousel-caption custom-caption">
                                <div className="img-carousel">
                                    <img
                                        src="https://theme.hstatic.net/200000893323/1001256440/14/slide_img_1.jpg?v=1595"
                                        alt=""
                                    />
                                </div>
                                <h2 className="title">
                                    NHỮNG GÌ BẠN CẦN <br />
                                    <span className="highlight">
                                        ĐỂ TỎA SÁNG
                                    </span>
                                </h2>
                                <p className="description">
                                    Head Turner sẽ giúp bạn tìm ra bản sắc riêng
                                    của mình.
                                </p>
                                <button
                                    className="hero-button"
                                    onClick={handleBookingClick}
                                >
                                    ĐẶT LỊCH NGAY
                                </button>
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="carousel-image-wrapper">
                            <img
                                className="carousel-image"
                                src="https://theme.hstatic.net/200000893323/1001256440/14/slide_2_img.jpg?v=1595"
                                alt="Slide 2"
                            />
                            <div className="carousel-overlay" />
                            <div className="carousel-caption custom-caption">
                                <div className="img-carousel">
                                    <img
                                        src="https://theme.hstatic.net/200000893323/1001256440/14/slide_img_1.jpg?v=1595"
                                        alt=""
                                    />
                                </div>
                                <h3 className="title">
                                    DỊCH VỤ CHẤT LƯỢNG <br />{" "}
                                    <span className="highlight">TỐT NHẤT</span>
                                </h3>
                                <p className="description">
                                    Phong cách riêng, phục vụ tận tâm.
                                </p>
                                <button
                                    className="hero-button"
                                    onClick={handleBookingClick}
                                >
                                    ĐẶT LỊCH NGAY
                                </button>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
                <div className="info-bar">
                    <div className="info-boxx">
                        <div className="info-box">
                            <h4 className="info-title">GIỜ MỞ CỬA</h4>
                            <p className="info-text">
                                Thứ 2 - Chủ nhật: 11:00 am – 8:00 pm
                            </p>
                        </div>

                        <div className="info-box">
                            <h4 className="info-title">LIÊN HỆ ĐẶT LỊCH</h4>
                            <p className="info-text">
                                +84– 0988 888 355 / +84 0922 666 880
                            </p>
                        </div>

                        <div className="info-box">
                            <h4 className="info-title">ĐỊA CHỈ</h4>
                            <p className="info-text">
                                1234 Mai Chí Thọ, Thủ Đức, Hồ Chí Minh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderHome;
