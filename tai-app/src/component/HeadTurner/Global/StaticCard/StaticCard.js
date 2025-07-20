import React from "react";
import "./StaticCard.css";

const StaticCard = () => {
    return (
        <div className="static-card">
            <img src="https://product.hstatic.net/200000893323/product/6_5663f7b6b42c437eabb3d70925413e33_large.png" alt="Incredible Iron Lamp" className="static-card-thumb" />
            <div className="static-card-info">
                <p className="static-card-name">INCREDIBLE IRON LAMP</p>
                <p className="static-card-price">970,000đ</p>
            </div>
        </div>
    );
};

export default StaticCard;
