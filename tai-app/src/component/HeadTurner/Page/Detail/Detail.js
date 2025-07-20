import React from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../Global/ProductDetail/ProductDetail";
import Banner from "../../Global/Banner/Banner";
import RelatedProducts from "../../Global/RelatedProducts/RelatedProducts";

const Detail = () => {
    const { id } = useParams(); // Lấy ID từ URL

    return (
        <div>
            <Banner menu="Sản phẩm" img="https://theme.hstatic.net/200000893323/1001256440/14/product_banner.jpg?v=1587" />
            <ProductDetail productId={id} /> {/* Truyền id vào */}
            <RelatedProducts />
        </div>
    );
};

export default Detail;
