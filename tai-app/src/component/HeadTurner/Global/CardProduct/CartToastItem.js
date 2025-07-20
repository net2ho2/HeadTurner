// src/component/HeadTurner/Global/CartToastItem/CartToastItem.js
import React from "react";

const CartToastItem = ({ image, name, price }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: "12px 16px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                border: "1px solid #eee",
                maxWidth: "320px",
            }}
        >
            <img
                src={image}
                alt={name}
                style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    marginRight: "12px",
                }}
            />
            <div>
                <div style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "15px", color: "#222" }}>{name}</div>
                <div style={{ fontSize: "14px", color: "#444" }}>{price.toLocaleString("vi-VN")}đ đã thêm vào giỏ hàng</div>
            </div>
        </div>
    );
};

export default CartToastItem;
