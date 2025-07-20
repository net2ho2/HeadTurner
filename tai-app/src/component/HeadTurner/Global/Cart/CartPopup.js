// CartPopup.js
import React, { useContext } from "react";
import "./CartPopup.css";
import { ProductContext } from "../ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";
document.querySelector(".cart-popup")?.removeAttribute("style");

const CartPopup = ({ visible, onClose }) => {
    const { cartItems, removeFromCart } = useContext(ProductContext);
    const navigate = useNavigate();

    if (!visible) return null;

    const getTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (onClose) onClose();
        setTimeout(() => {
            navigate("/cart-product");
        }, 100); // Delay để tránh xung đột khi đóng popup
    };

    return (
        <div className="cart-popup">
            <h4>Giỏ hàng</h4>
            {cartItems.length === 0 ? (
                <p>Không có sản phẩm nào.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="info">
                                    <p>{item.name}</p>
                                    <p>
                                        {item.price.toLocaleString()}đ × {item.quantity}
                                    </p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)}>×</button>
                            </li>
                        ))}
                    </ul>
                    <div className="total">
                        <strong>Tổng: </strong>
                        {getTotal().toLocaleString()}đ
                        <button
                            className="checkout-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log("Click Thanh toán"); // cần in ra log này
                                onClose?.(); // đóng popup nếu có
                                setTimeout(() => {
                                    navigate("/cart-product");
                                }, 100);
                            }}
                        >
                            Thanh toán
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPopup;
