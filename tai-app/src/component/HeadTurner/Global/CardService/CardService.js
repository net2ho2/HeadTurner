// src/component/HeadTurner/Global/CardService/CardService.js
import React, { useContext } from "react";
import { BookingContext } from "../ProductContext/BookingContext";
import "./CardService.css";

const CardService = ({
    id,
    image,
    name,
    description,
    price,
    oldPrice,
    discount,
}) => {
    const context = useContext(BookingContext);
    if (!context) return null;

    const { addService } = context;

    const handleAddService = () => {
        addService({ id, image, name, description, price, oldPrice, discount });
        alert(`✔️ Đã thêm dịch vụ: ${name}`);
    };

    const handleBookNow = () => {
        addService({ id, image, name, description, price, oldPrice, discount });
        window.location.href = "/#booking-section";
    };

    return (
        <div className="card-service">
            <div className="image-wrapper">
                <img src={image} alt={name} />
                {discount > 0 && (
                    <span className="badge-discount">-{discount}%</span>
                )}
            </div>
            <div className="card-body">
                <h5 className="service-title">{name}</h5>
                <div className="price">
                    <span className="new-price">{price.toLocaleString()}đ</span>
                    {oldPrice && (
                        <span className="old-price">
                            {oldPrice.toLocaleString()}đ
                        </span>
                    )}
                </div>
                <p className="service-desc">{description}</p>
                <div className="btn-service">
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddService}
                    >
                        Thêm
                    </button>
                    <button className="book-now-btn" onClick={handleBookNow}>
                        Đặt ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardService;
