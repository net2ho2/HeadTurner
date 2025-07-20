import React, { useContext, useState } from "react";
import { ProductContext } from "../../../Global/ProductContext/ProductContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./CartCheckout.css";

const CartCheckout = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(ProductContext);
    const [appliedCode, setAppliedCode] = useState("");

    const coupons = [
        { title: "120.000đ", code: "T725DIHOC120KM", minOrder: 999000, discount: 120000, start: "08/07/2025", end: "31/07/2025" },
        { title: "80.000đ", code: "T725DIHOC80KM", minOrder: 699000, discount: 80000, start: "08/07/2025", end: "31/07/2025" },
        { title: "40.000đ", code: "T725DIHOC40KM", minOrder: 395000, discount: 40000, start: "08/07/2025", end: "31/07/2025" },
        { title: "20.000đ", code: "T725DIHOC20KM", minOrder: 199000, discount: 20000, start: "08/07/2025", end: "31/07/2025" },
        { title: "10.000đ", code: "T725DIHOC10KM", minOrder: 99000, discount: 10000, start: "08/07/2025", end: "31/07/2025" },
    ];

    const getTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = getTotal();

    const appliedCoupon = coupons.find((c) => c.code === appliedCode && total >= c.minOrder);
    const discount = appliedCoupon ? appliedCoupon.discount : 0;
    const finalTotal = total - discount;

    const handleIncrease = (item) => {
        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 });
    };

    const removeAllOfItem = (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        const item = cartItems.find((i) => i.id === id);
        if (!item) return;
        for (let i = 0; i < item.quantity; i++) {
            removeFromCart(id);
        }
    };

    const handleApplyCoupon = (code) => {
        setAppliedCode(code);
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Giỏ hàng của bạn</h2>

            {cartItems.length === 0 ? (
                <p className="checkout-empty">Giỏ hàng trống</p>
            ) : (
                <>
                    <div className="checkout-list">
                        {cartItems.map((item) => (
                            <div className="checkout-item" key={item.id}>
                                <div className="checkout-left">
                                    <img src={item.image} alt={item.name} className="checkout-image" />
                                </div>
                                <div className="checkout-right">
                                    <div className="checkout-info">
                                        <h4 className="checkout-name">{item.name}</h4>
                                    </div>
                                    <div className="checkout-controls">
                                        <div className="checkout-quantity">
                                            <button onClick={() => removeFromCart(item.id)} className="qty-btn">
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleIncrease(item)} className="qty-btn">
                                                +
                                            </button>
                                        </div>
                                        <div className="checkout-subtotal">{(item.price * item.quantity).toLocaleString()}đ</div>
                                        <button className="remove-btn" onClick={() => removeAllOfItem(item.id)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-coupon-box">
                        <h4>Mã giảm giá khả dụng</h4>
                        <div className="coupon-slider">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation
                                modules={[Navigation]}
                                breakpoints={{
                                    1024: { slidesPerView: 3 },
                                    768: { slidesPerView: 3 },
                                    480: { slidesPerView: 3 },
                                }}
                            >
                                {coupons.map((c, i) => (
                                    <SwiperSlide key={i}>
                                        <div className={`coupon-item-card ${appliedCode === c.code ? "active-code" : ""}`}>
                                            <p className="coupon-title">Giảm {c.title}</p>
                                            <p className="coupon-price">Cho đơn hàng từ {c.minOrder.toLocaleString()}đ</p>
                                            <p className="coupon-code">
                                                <strong>Mã áp dụng:</strong> <span>{c.code}</span>
                                            </p>
                                            <p className="coupon-expiry">
                                                HSD: {c.start} - {c.end}
                                            </p>
                                            <button onClick={() => handleApplyCoupon(c.code)}>{appliedCode === c.code ? "Đã áp dụng" : "Sao chép mã"}</button>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="checkout-summary">
                            <h5 className="checkout-sum1">
                                Tổng cộng: <span className="checkout-sum">{total.toLocaleString()}đ</span>
                            </h5>
                            {appliedCoupon && (
                                <p className="coupon-applied">
                                    Đã áp dụng mã <strong>{appliedCoupon.code}</strong> - giảm {discount.toLocaleString()}đ
                                </p>
                            )}
                            <h3>
                                Thành tiền: <span className="checkout-final-sum">{finalTotal.toLocaleString()}đ</span>
                            </h3>
                        </div>

                        <div className="checkout-support">
                            <p>
                                📞 Hỗ trợ mua hàng: <strong>0966.666.666</strong>
                            </p>
                            <p>
                                📧 Email: <strong>chamsockhachhang@gmail.com.vn</strong>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartCheckout;
