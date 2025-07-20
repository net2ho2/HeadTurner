import React from "react";
import "./ServiceHighlight.css";

const services = [
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_img_1.jpg?v=1595",
        subtitle: "PHONG CÁCH & NĂNG ĐỘNG",
        title: "CẮT TÓC",
        image: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_bg_1.jpg?v=1595",
    },
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_img_2.jpg?v=1595",
        subtitle: "DÀNH CHO NGƯỜI BẬN LÀM",
        title: "CAO RÂU HOÀNG GIA",
        image: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_bg_2.jpg?v=1595",
    },
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_img_3.jpg?v=1595",
        subtitle: "CHUYÊN GIA GIỎI NHẤT",
        title: "TẠO KIỂU RÂU",
        image: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_bg_3.jpg?v=1595",
    },
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_img_4.jpg?v=1595",
        subtitle: "CHĂM SÓC TOÀN DIỆN",
        title: "BARBER-SPA",
        image: "https://theme.hstatic.net/200000893323/1001256440/14/home_service_bg_4.jpg?v=1595",
    },
];

const ServiceHighlight = () => {
    return (
        <section className="service-section">
            <div className="text-center">
                <p className="service-subtitle">HEAD TURNER</p>
                <h2 className="service-title">
                    DỊCH VỤ <span>CẮT TÓC</span> NAM CAO CẤP
                </h2>
            </div>
            <div className="service-grid">
                {services.map((item, index) => (
                    <div className={`service-card ${index % 2 === 1 ? "lower" : ""}`} key={index} style={{ backgroundImage: `url(${item.image})` }}>
                        <div className="overlay" />
                        <div className="card-content">
                            <img src={item.icon} alt={item.title} />
                            <p className="subtitle">{item.subtitle}</p>
                            <h3 className="title">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceHighlight;
