import React, { useState, useEffect, useContext, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";
import { BookingContext } from "../ProductContext/BookingContext";
import CartPopup from "../Cart/CartPopup";
import Button from "../../Button/ButtonMenu/Button";

const Header = () => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const { cartItems, user, setUser } = useContext(ProductContext);
    const { availableServices, removeService } = useContext(BookingContext);

    const searchRef = useRef(null);
    const loginRef = useRef(null);
    const menuRef = useRef(null);
    const cartRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    "https://6867d51ad5933161d709fb13.mockapi.io/hairProduct"
                );
                const data = await res.json();
                setAllProducts(data);
            } catch (err) {
                console.error("Không thể tải danh sách sản phẩm", err);
            }
        };
        fetchProducts();
    }, []);

    const handleChangeSearchTerm = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim()) {
            const keyword = value.toLowerCase();
            const filtered = allProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(keyword) ||
                    (p.description &&
                        p.description.toLowerCase().includes(keyword))
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const highlightMatch = (text, keyword) => {
        const parts = text.split(new RegExp(`(${keyword})`, "gi"));
        return parts.map((part, i) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <mark key={i}>{part}</mark>
            ) : (
                part
            )
        );
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            window.location.href = `/products?q=${encodeURIComponent(
                searchTerm.trim()
            )}`;
            setToggleSearch(false);
            setSuggestions([]);
        }
    };

    const handleToggle = (type) => {
        setToggleSearch(type === "search" ? !toggleSearch : false);
        setToggleLogin(type === "login" ? !toggleLogin : false);
        setToggleMenu(type === "menu" ? !toggleMenu : false);
        setShowCart(type === "cart" ? !showCart : false);
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !searchRef.current?.contains(e.target) &&
                !loginRef.current?.contains(e.target) &&
                !menuRef.current?.contains(e.target) &&
                !cartRef.current?.contains(e.target)
            ) {
                setToggleSearch(false);
                setToggleLogin(false);
                setToggleMenu(false);
                setShowCart(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const handleBookingClick = () =>
        (window.location.href = "/#booking-section");

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        try {
            const res = await fetch(
                "https://6871fc0376a5723aacd3429e.mockapi.io/info"
            );
            const users = await res.json();
            const found = users.find(
                (u) => u.email === email && u.password === password
            );

            if (found) {
                setUser(found);
                alert("Đăng nhập thành công!");
                setToggleLogin(false);
            } else {
                alert("Sai email hoặc mật khẩu!");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            alert("Không thể kết nối tới máy chủ.");
        }
    };

    const handleLogout = () => {
        setUser(null);
        alert("Đã đăng xuất");
    };

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <Link to="/" className="logo">
                HEAD TURNER
            </Link>

            <ul className="nav-menu">
                <li>
                    <Link to="/" onClick={scrollToTop}>
                        Trang chủ
                    </Link>
                </li>
                <li>
                    <Link to="/about" onClick={scrollToTop}>
                        Giới thiệu
                    </Link>
                </li>
                <li>
                    <Link to="/services" onClick={scrollToTop}>
                        Dịch vụ
                    </Link>
                </li>
                <li>
                    <Link to="/products" onClick={scrollToTop}>
                        Sản phẩm
                    </Link>
                </li>
                <li>
                    <Link to="/hair-care" onClick={scrollToTop}>
                        Chăm sóc tóc
                    </Link>
                </li>
                <li>
                    <Link to="/contact" onClick={scrollToTop}>
                        Liên hệ
                    </Link>
                </li>
                <li>
                    <Link to="/policy" onClick={scrollToTop}>
                        Quy định
                    </Link>
                </li>
            </ul>

            <div className="actions">
                {/* Search */}
                <div className="search" ref={searchRef}>
                    <i
                        className="fa-solid fa-magnifying-glass"
                        onClick={() => handleToggle("search")}
                    ></i>
                    <div
                        className={`search-popup ${
                            toggleSearch ? "active" : ""
                        }`}
                    >
                        <h4 className="search-title">TÌM KIẾM</h4>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={handleChangeSearchTerm}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleSearch()
                                }
                            />
                            <button
                                className="search-btn2"
                                onClick={handleSearch}
                            >
                                <i className="fa fa-search"></i>
                            </button>
                        </div>

                        {suggestions.length > 0 && (
                            <ul className="search-suggestions1">
                                {suggestions.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to={`/detail/${item.id}`}
                                            onClick={() => {
                                                setToggleSearch(false);
                                                setSuggestions([]);
                                                setSearchTerm("");
                                            }}
                                        >
                                            <div className="suggestion-left">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="suggestion-img"
                                                />
                                                <div className="suggestion-text">
                                                    <div className="suggestion-name">
                                                        {highlightMatch(
                                                            item.name,
                                                            searchTerm
                                                        )}
                                                    </div>
                                                    {item.description && (
                                                        <div className="suggestion-desc">
                                                            {highlightMatch(
                                                                item.description,
                                                                searchTerm
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="suggestion-price">
                                                    {Number(
                                                        item.price
                                                    ).toLocaleString(
                                                        "vi-VN"
                                                    )}{" "}
                                                    ₫
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Login */}
                {user ? (
                    <div className="user-info">
                        Xin chào, <strong>{user.firstName}</strong>!
                        <button className="logout-btn" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div className="login" ref={loginRef}>
                        <div
                            className={`login-toggle ${
                                toggleLogin ? "active" : ""
                            }`}
                        >
                            <h2 className="login-title">ĐĂNG NHẬP TÀI KHOẢN</h2>
                            <form className="login-form" onSubmit={handleLogin}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    required
                                />
                                <button type="submit">ĐĂNG NHẬP</button>
                            </form>
                        </div>
                        <i
                            className="fas fa-user"
                            onClick={() => handleToggle("login")}
                        ></i>
                    </div>
                )}

                {/* Cart */}
                <div
                    className="cart-left"
                    onClick={() => handleToggle("cart")}
                    ref={cartRef}
                >
                    <i className="fas fa-shopping-cart"></i>
                    <div className="cart-count">{cartItems.length}</div>
                    <CartPopup
                        visible={showCart}
                        onClose={() => setShowCart(false)}
                    />
                </div>

                {/* Booking */}
                <div className="book-wrapper">
                    <button
                        className="book-button"
                        onClick={handleBookingClick}
                    >
                        ĐẶT LỊCH
                    </button>
                    <div className="book-popup">
                        <p>Dịch vụ đã đặt:</p>
                        {availableServices.length === 0 ? (
                            <p>Chưa có dịch vụ nào.</p>
                        ) : (
                            <div className="booked-services1">
                                {availableServices.map((s, i) => (
                                    <div key={i} className="booked-item1">
                                        <img
                                            src={s.image}
                                            alt={s.name}
                                            className="service-img"
                                        />
                                        <div className="service-info">
                                            <div className="service-name">
                                                {s.name}
                                            </div>
                                            <div className="service-price">
                                                {Number(s.price).toLocaleString(
                                                    "vi-VN"
                                                )}{" "}
                                                ₫
                                            </div>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeService(s.name)
                                            }
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="icon-menu" ref={menuRef}>
                    <i
                        className="fa-solid fa-bars"
                        onClick={() => handleToggle("menu")}
                    ></i>
                    <ul
                        className={`nav-menu-icon ${
                            toggleMenu ? "active" : ""
                        }`}
                    >
                        <li>
                            <Link to="/" onClick={scrollToTop}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={scrollToTop}>
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" onClick={scrollToTop}>
                                Dịch vụ
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" onClick={scrollToTop}>
                                Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link to="/hair-care" onClick={scrollToTop}>
                                Chăm sóc tóc
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={scrollToTop}>
                                Liên hệ
                            </Link>
                        </li>
                        <li>
                            <Link to="/policy" onClick={scrollToTop}>
                                Quy định
                            </Link>
                        </li>
                        <li onClick={handleBookingClick}>Đặt Lịch</li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
