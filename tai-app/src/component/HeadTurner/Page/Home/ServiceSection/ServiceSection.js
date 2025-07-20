// ServiceSection.jsx
import React, { useState } from "react";
import "./ServiceSection.css";

const serviceTabs = [
    {
        id: 1,
        name: "TẠO KIỂU TÓC",
        services: [
            {
                title: "CẮT TÓC",
                desc: "Cắt theo kiểu, làm gọn gàng đường chân tóc & hoàn thiện.",
                price: "350,000đ",
                oldPrice: "400,000đ",
            },
            {
                title: "CHĂM SÓC RÂU",
                desc: "Cắt tỉa ria mép, râu và làm gọn gàng bằng tông đơ.",
                price: "240,000đ",
            },
            {
                title: "TẠO KIỂU TÓC",
                desc: "Tạo kiểu & Chăm sóc tóc",
                price: "320,000đ",
            },
            {
                title: "TẠO MẪU TÓC",
                desc: "Cắt toàn bộ bằng tông đơ, làm gọn gàng đường chân tóc và chăm sóc tóc.",
                price: "380,000đ",
            },
            {
                title: "TỈA LÔNG MÀY",
                desc: "Sáp lông mày, tỉa và làm gọn gàng.",
                price: "295,000đ",
            },
            {
                title: "XẢ TÓC",
                desc: "Những kiểu tóc đậm chất thể thao Kiểu Tóc Đậm Chất Thể Thao",
                price: "400,000đ",
            },
        ],
    },
    {
        id: 2,
        name: "CAO RÂU",
        services: [
            {
                title: "XẢ TÓC",
                desc: "Những kiểu tóc đậm chất thể thao Kiểu Tóc Đậm Chất Thể Thao",
                price: "400,000đ",
            },
            {
                title: "TỈA LÔNG MÀY",
                desc: "Sáp lông mày, tỉa và làm gọn gàng.",
                price: "295,000đ",
            },
            {
                title: "TẠO MẪU TÓC",
                desc: "Cắt toàn bộ bằng tông đơ, làm gọn gàng đường chân tóc và chăm sóc tóc.",
                price: "380,000đ",
            },
            {
                title: "TẠO KIỂU TÓC",
                desc: "Tạo kiểu & Chăm sóc tóc",
                price: "320,000đ",
            },
            {
                title: "SYNERGISTIC WOODEN HAT",
                desc: "Debitis dolor pariatur modi odit tempore aut rerum vel.",
                price: "990,000đ",
            },
            {
                title: "SYNERGISTIC LINEN KNIFE",
                desc: "Itaut maiores aut totam voluptatum similique voluptas exercitationem enim.",
                price: "1,350,000đ",
            },
        ],
    },
];

const ServiceSection = () => {
    const [activeTab, setActiveTab] = useState(1);

    const currentServices = serviceTabs.find((tab) => tab.id === activeTab).services;

    return (
        <section className="service-section1">
            <div className="img-logo">
                <img src="https://theme.hstatic.net/200000893323/1001256440/14/home_collection_bg.jpg?v=1587" alt="" />
            </div>
            <div className="service-header">
                <p className="pricing-sub">BẢNG GIÁ</p>
                <h2 className="pricing-title">DỊCH VỤ TẠI HEAD TURNER</h2>
                <div className="pricing-tabs">
                    {serviceTabs.map((tab) => (
                        <button key={tab.id} className={`pricing-tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pricing-table">
                {currentServices.map((service, index) => (
                    <div key={index} className="pricing-row">
                        <div className="pricing-info">
                            <h4>{service.title}</h4>
                            <p>{service.desc}</p>
                        </div>
                        <div className="pricing-cost">
                            <strong>{service.price}</strong>
                            {service.oldPrice && <del>{service.oldPrice}</del>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceSection;
