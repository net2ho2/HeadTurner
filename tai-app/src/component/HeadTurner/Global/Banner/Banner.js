import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
const Banner = ({ img, menu }) => {
    return (
        <div className="banner">
            <img src={img} alt="Banner" />
            <h1 className="banner-title">{menu}</h1>
            <ul className="nav-menu-banner">
                <li>
                    <Link to="/">Trang chủ</Link>
                    <span>-</span>
                </li>

                <li>{menu}</li>
            </ul>
        </div>
    );
};

export default Banner;
