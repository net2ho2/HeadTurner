import React from "react";
import "./PromoBanner.css";

const PromoBanner = () => {
    const handleBookingClick = () =>
        (window.location.href = "/#booking-section");
    return (
        <section className="promo-banner">
            <div className="overlay">
                <p className="promo-subtitle">LIÊN HỆ ĐẶT LỊCH</p>
                <h2 className="promo-title">
                    <span className="highlight">KHUYẾN MÃI 20%</span> CHO
                    BOOKING ĐẦU TIÊN CỦA BẠN
                </h2>
                <button className="promo-btn" onClick={handleBookingClick}>
                    ĐẶT LỊCH NGAY
                </button>
            </div>
        </section>
    );
};

export default PromoBanner;
