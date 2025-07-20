import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";
import { toast } from "react-toastify";
import CartToastItem from "./CartToastItem";
import ModalProductDetail from "./ModalProductDetail/ModalProductDetail";
import "./CardProduct.css";

// ✅ Hàm format giá với kiểm tra kiểu
const formatPrice = (value) => {
    const number = Number(value);
    if (isNaN(number)) return value;
    return number.toLocaleString("en-US") + "đ";
};

const CardProduct = ({ image, name, price, id, sales }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useContext(ProductContext);

    const discountedPrice = price;
    const originalPriceRaw = sales > 0 ? price / (1 - sales / 100) : price;
    const originalPrice = Math.round(originalPriceRaw / 1000) * 1000;

    const formattedDiscounted = formatPrice(discountedPrice);
    const formattedOriginal = formatPrice(originalPrice);

    const handleClick = () => navigate(`/detail/${id}`);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({ id, image, name, price: discountedPrice });
        toast.success(<CartToastItem image={image} name={name} price={formatPrice(discountedPrice)} />, {
            position: "top-right",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            icon: false,
        });
    };

    return (
        <>
            <div className="card-product">
                {sales > 0 && <div className="sales">-{sales}%</div>}

                <img src={image} alt={name} className="product-image" onClick={handleClick} />

                <div className="product-info">
                    <h3 className="product-title">{name}</h3>

                    <div className="product-price">
                        <span className="discounted-price">{formattedDiscounted}</span>
                        {sales > 0 && <span className="original-price">{formattedOriginal}</span>}
                    </div>

                    <div className="product-actions">
                        <i className="icon fas fa-shopping-bag" onClick={handleAddToCart}></i>
                        <i
                            className="icon fas fa-eye"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowModal(true);
                            }}
                        ></i>
                    </div>
                </div>
            </div>

            {showModal && <ModalProductDetail productId={id} onClose={() => setShowModal(false)} />}
        </>
    );
};

export default CardProduct;
