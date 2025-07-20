import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "./ModalProductDetail.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductContext } from "../../ProductContext/ProductContext";
import { toast } from "react-toastify";
import CartToastItem from "../CartToastItem";

const ModalProductDetail = ({ productId, onClose }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(ProductContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://6867d51ad5933161d709fb13.mockapi.io/hairProduct/${productId}`);
                if (!response.ok) throw new Error("Lỗi khi tải dữ liệu");
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Không thể tải sản phẩm");
            } finally {
                setLoading(false);
            }
        };

        if (productId) fetchData();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;

        addToCart({
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
        });

        toast.success(<CartToastItem image={product.image} name={product.name} price={formatPrice(product.price)} />, {
            position: "top-right",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            icon: false,
        });

        onClose();
    };

    if (!productId) return null;

    // ✅ Hàm định dạng giá tiền
    const formatPrice = (value) => {
        const number = Number(value);
        if (isNaN(number)) return value;
        return number.toLocaleString("vi-VN") + "₫";
    };

    // === TÍNH GIÁ ===
    const sales = product?.sales || 0;
    const discountedPrice = Number(product?.price) || 0;
    const originalPriceRaw = sales > 0 ? discountedPrice / (1 - sales / 100) : discountedPrice;
    const originalPrice = Math.round(originalPriceRaw / 1000) * 1000;

    const formattedDiscounted = formatPrice(discountedPrice);
    const formattedOriginal = formatPrice(originalPrice);

    // === ẢNH ===
    const rawImages = [product?.image, product?.thumb1, product?.thumb2, product?.thumb3];
    const images = [...new Set(rawImages.filter(Boolean))];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="modal-overlay1" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>

                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    <>
                        <Slider {...settings} className="modal-carousel">
                            {images.map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={img}
                                        alt={`${product.name} ${index}`}
                                        className="modal-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/default-image.jpg";
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>

                        {sales > 0 && <div className="sales-badge">-{sales}%</div>}

                        <h2 className="modal-title">{product.name}</h2>

                        <div className="modal-price-wrapper">
                            {sales > 0 && <span className="modal-original-price">{formattedOriginal}</span>}
                            <span className="modal-discounted-price">{formattedDiscounted}</span>
                        </div>

                        <p className="modal-description">{product.description || "Không có mô tả."}</p>

                        <button className="modal-add-to-cart" onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ModalProductDetail;
