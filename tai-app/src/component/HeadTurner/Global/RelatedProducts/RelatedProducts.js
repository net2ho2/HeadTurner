import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./RelatedProducts.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardProduct from "../CardProduct/CardProduct";

const PrevArrow = ({ onClick }) => (
    <button className="slick-arrow left" onClick={onClick}>
        <FaChevronLeft />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button className="slick-arrow right" onClick={onClick}>
        <FaChevronRight />
    </button>
);

const RelatedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://6867d51ad5933161d709fb13.mockapi.io/hairProduct")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Lỗi lấy dữ liệu:", err));
    }, []);

    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="related-products">
            <h3 className="section-title">Sản phẩm liên quan</h3>
            <Slider {...settings} className="related-slider">
                {products.map((product) => (
                    <div key={product.id} className="slider-item">
                        <CardProduct id={product.id} name={product.name} price={product.price} image={product.image} sales={product.sales} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default RelatedProducts;
