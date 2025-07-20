import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryList.css";

const CategoryList = () => {
    const [show, setShow] = useState(true);

    return (
        <div className="category-container">
            <div className="category-header" onClick={() => setShow(!show)}>
                <span>Danh mục bài viết</span>
                <i className={`fas fa-chevron-${show ? "up" : "down"}`}></i>
            </div>

            {show && (
                <ul className="category-list">
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/about">Giới thiệu</Link>
                    </li>
                    <li>
                        <Link to="/services">Dịch vụ</Link>
                    </li>
                    <li>
                        <Link to="/products">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link to="/hair-care">Chăm sóc tóc</Link>
                    </li>
                    <li>
                        <Link to="/contact">Liên hệ</Link>
                    </li>
                    <li>
                        <Link to="/policy">Quy định</Link>
                        <span className="plus-icon">+</span>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CategoryList;
