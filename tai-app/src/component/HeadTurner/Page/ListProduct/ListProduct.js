import React, { useContext, useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import Banner from "../../Global/Banner/Banner";
import "./ListProduct.css";
import { Row, Col } from "react-bootstrap";
import CardProduct from "../../Global/CardProduct/CardProduct";
import { ProductContext } from "../../Global/ProductContext/ProductContext";
import Slider from "rc-slider";

const ListProduct = () => {
    const [allProduct, setAllProduct] = useState([]);
    const [hairProduct, setHairProduct] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [toggleFilter, setToggleFilter] = useState(false);

    const handleToggleFilter = () => {
        setToggleFilter(!toggleFilter);
    };

    const priceRanges = [
        { label: "Dưới 1.000.000đ", value: "under-1m", min: 0, max: 1000000 },
        {
            label: "1.000.000đ - 2.000.000đ",
            value: "1m-2m",
            min: 1000000,
            max: 2000000,
        },
        {
            label: "2.000.000đ - 3.000.000đ",
            value: "2m-3m",
            min: 2000000,
            max: 3000000,
        },
        {
            label: "3.000.000đ - 4.000.000đ",
            value: "3m-4m",
            min: 3000000,
            max: 4000000,
        },
        {
            label: "Trên 4.000.000đ",
            value: "over-4m",
            min: 4000000,
            max: Infinity,
        },
    ];

    const [priceRange, setPriceRange] = useState([0, 10000000]);

    const handleSliderChange = (value) => {
        setPriceRange(value);
        const filtered = allProduct.filter(
            (item) => item.price >= value[0] && item.price <= value[1]
        );
        setHairProduct(filtered);
        setSelectedBrands([]);
    };

    const { setAllProduct: setAllProductContext } = useContext(ProductContext);

    const getProduct = async () => {
        try {
            const res = await fetch(
                "https://6867d51ad5933161d709fb13.mockapi.io/hairProduct"
            );
            const data = await res.json();
            setAllProduct(data);
            setHairProduct(data);
            setAllProductContext(data);
            const uniqueBrands = [...new Set(data.map((item) => item.brand))];
            setBrands(uniqueBrands);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleAllProduct = () => {
        setHairProduct(allProduct);
        setSelectedBrands([]);
        setSelectedPrices([]);
    };

    const handleFilterSales = () => {
        const salesHairProduct = allProduct.filter((item) => item.sales > 0);
        setHairProduct(salesHairProduct);
        setSelectedBrands([]);
        setSelectedPrices([]);
    };

    const filterProductsByBrandAndPrice = (brandsFilter, pricesFilter) => {
        let filtered = allProduct;

        if (brandsFilter.length > 0) {
            filtered = filtered.filter((item) =>
                brandsFilter.includes(item.brand)
            );
        }

        if (pricesFilter.length > 0) {
            const ranges = priceRanges.filter((r) =>
                pricesFilter.includes(r.value)
            );
            filtered = filtered.filter((item) =>
                ranges.some(
                    (range) => item.price >= range.min && item.price < range.max
                )
            );
        }

        setHairProduct(filtered);
    };

    const handleBrandChange = (brand) => {
        let updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((b) => b !== brand)
            : [...selectedBrands, brand];

        setSelectedBrands(updatedBrands);
        filterProductsByBrandAndPrice(updatedBrands, selectedPrices);
    };

    const handlePriceChange = (rangeValue) => {
        let updatedPrices = selectedPrices.includes(rangeValue)
            ? selectedPrices.filter((v) => v !== rangeValue)
            : [...selectedPrices, rangeValue];

        setSelectedPrices(updatedPrices);
        filterProductsByBrandAndPrice(selectedBrands, updatedPrices);
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div>
            <Banner
                img="https://theme.hstatic.net/200000893323/1001256440/14/collection_banner.jpg?v=1595"
                menu="Sản Phẩm"
            />
            <div className="container-product">
                {/* <div className="filter-mobile" onClick={handleToggleFilter}>
                    <i className="fas fa-filter"></i> Bộ lọc
                </div> */}
                <Row className="row-list gx-0">
                    <Col md={3} xs={12}>
                        <div
                            className={`container-filtermenu ${
                                toggleFilter ? "active" : ""
                            }`}
                        >
                            <div className="menu-filter">
                                <div className="filter-menu">
                                    <div className="filter-section">
                                        <h3 className="filter-title">
                                            DANH MỤC SẢN PHẨM{" "}
                                            <span
                                                className="button-X"
                                                onClick={handleToggleFilter}
                                            >
                                                X
                                            </span>
                                        </h3>
                                        <ul className="filter-list">
                                            <li onClick={handleAllProduct}>
                                                Tất cả sản phẩm
                                            </li>
                                            <li onClick={handleFilterSales}>
                                                Sản phẩm khuyến mãi
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="filter-section">
                                        <h3 className="filter-title">
                                            KHOẢNG GIÁ
                                        </h3>
                                        <div style={{ padding: "10px 0" }}>
                                            <Slider
                                                range
                                                min={0}
                                                max={10000000}
                                                step={500000}
                                                value={priceRange}
                                                onChange={handleSliderChange}
                                                allowCross={false}
                                            />
                                            <div className="d-flex justify-content-between mt-2">
                                                <span>
                                                    {priceRange[0].toLocaleString()}
                                                    đ
                                                </span>
                                                <span>
                                                    {priceRange[1].toLocaleString()}
                                                    đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="filter-section active">
                                    <h3 className="filter-title">
                                        NHÀ CUNG CẤP
                                    </h3>
                                    {brands.map((item) => (
                                        <label
                                            key={item}
                                            className="filter-checkbox"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(
                                                    item
                                                )}
                                                onChange={() =>
                                                    handleBrandChange(item)
                                                }
                                            />{" "}
                                            {item}
                                        </label>
                                    ))}
                                </div>
                                {/* <button
                                    className="apply"
                                    onClick={handleToggleFilter}
                                >
                                    Áp dụng
                                </button> */}
                            </div>
                        </div>
                    </Col>

                    <Col md={9} xs={12} className="product-list-col">
                        <Row>
                            {hairProduct.map((item) => (
                                <Col
                                    xs={6}
                                    sm={6}
                                    md={4}
                                    className="mb-4"
                                    key={item.id}
                                >
                                    <CardProduct
                                        id={item.id}
                                        sales={item.sales}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ListProduct;
