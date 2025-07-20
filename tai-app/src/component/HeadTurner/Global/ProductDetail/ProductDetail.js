import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProductContext } from "../ProductContext/ProductContext";
import { toast } from "react-toastify";
import CartToastItem from "../CardProduct/CartToastItem";
import "./ProductDetail.css";

/* ==== Custom arrows for react‑slick ==== */
const PrevArrow = ({ onClick }) => (
    <button className="custom-arrow left" onClick={onClick} aria-label="Previous slide">
        <FaChevronLeft />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button className="custom-arrow right" onClick={onClick} aria-label="Next slide">
        <FaChevronRight />
    </button>
);

/* ============================================================= */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(ProductContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    /* ==== Fetch product ==== */
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://6867d51ad5933161d709fb13.mockapi.io/hairProduct/${id}`);
                if (!res.ok) throw new Error("Không thể tải sản phẩm");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="product-detail">Đang tải sản phẩm...</div>;
    if (error) return <div className="product-detail">Lỗi: {error}</div>;
    if (!product) return <div className="product-detail">Không tìm thấy sản phẩm.</div>;

    /* ==== Image list & slider settings ==== */
    const rawImages = [product.image, product.thumb1, product.thumb2, product.thumb3];
    const images = [...new Set(rawImages.filter(Boolean))];

    const settingsMain = {
        asNavFor: nav2,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const settingsThumb = {
        asNavFor: nav1,
        slidesToShow: images.length >= 3 ? 3 : images.length,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
    };

    /* ==== Price & Sales logic ==== */
    const sales = Number(product.sales) || 0;
    const discountedPrice = product.price;
    const originalPriceRaw = sales > 0 ? discountedPrice / (1 - sales / 100) : discountedPrice;
    const originalPrice = Math.round(originalPriceRaw / 1000) * 1000;

    const formattedDiscounted = discountedPrice.toLocaleString("vi-VN").replace(/\s/g, "") + "₫";
    const formattedOriginal = originalPrice.toLocaleString("vi-VN").replace(/\s/g, "") + "₫";

    /* ==== Status text ==== */
    let statusText = "Không có thông tin tình trạng";
    if (sales === 0) statusText = "Còn hàng";
    else if (sales > 0) statusText = `Giảm ${sales}%`;

    /* ==== Quantity handlers ==== */
    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    /* ==== Add to cart ==== */
    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            image: product.image,
            name: product.name,
            price: discountedPrice,
            quantity,
        });
        toast.success(<CartToastItem image={product.image} name={product.name} price={discountedPrice} qty={quantity} />, {
            position: "top-right",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            icon: false,
        });
    };

    /* ==== Buy now ==== */
    const handleBuyNow = () => {
        addToCart({
            id: product.id,
            image: product.image,
            name: product.name,
            price: discountedPrice,
            quantity,
        });
        navigate("/cart-product");
    };

    return (
        <div className="product-detail">
            {/* ==== Image Section ==== */}
            <div className="image-section">
                <Slider {...settingsMain} ref={setNav1}>
                    {images.map((img, i) => (
                        <div key={i}>
                            <img className="main-image" src={img} alt={`${product.name} - Slide ${i + 1}`} />
                        </div>
                    ))}
                </Slider>

                <Slider {...settingsThumb} ref={setNav2}>
                    {images.map((img, i) => (
                        <div key={i} className="thumb-wrapper">
                            <img className="thumbnail" src={img} alt={`${product.name} - Thumb ${i + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* ==== Info Section ==== */}
            <div className="info-section">
                {sales > 0 && <div className="sales-badge">-{sales}%</div>}

                <h2 className="title2">{product.name}</h2>

                <div className="price-wrapper">
                    <span className="discounted-price">
                        <span className="price-label">Giá:</span> {formattedDiscounted}
                    </span>
                    {sales > 0 && <span className="original-price">{formattedOriginal}</span>}
                </div>

                <p className="status">
                    Tình trạng: <span>{statusText}</span>
                </p>

                <p className="description2">{product.description || "Không có mô tả."}</p>

                <div className="quantity-box">
                    <button onClick={decreaseQty} aria-label="Giảm số lượng">
                        −
                    </button>
                    <input type="text" value={quantity} readOnly aria-label="Số lượng sản phẩm" />
                    <button onClick={increaseQty} aria-label="Tăng số lượng">
                        +
                    </button>
                </div>

                <div className="bnt-product-detail">
                    <button className="add-to-cart" onClick={handleAddToCart} aria-label="Thêm vào giỏ hàng">
                        THÊM VÀO GIỎ
                    </button>

                    <button className="buy-now-button" onClick={handleBuyNow} aria-label="Mua ngay">
                        MUA NGAY
                    </button>
                </div>

                <div className="share-box" aria-label="Chia sẻ sản phẩm">
                    <span>Chia sẻ: </span>
                    <i className="fab fa-facebook" title="Facebook"></i>
                    <i className="fab fa-messenger" title="Messenger"></i>
                    <i className="fab fa-twitter" title="Twitter"></i>
                    <i className="fab fa-pinterest" title="Pinterest"></i>
                    <i className="fas fa-link" title="Sao chép liên kết"></i>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
