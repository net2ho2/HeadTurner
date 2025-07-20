import React from "react";
import ShippingPaymentForm from "./ShippingPaymentForm/ShippingPaymentForm";
import Banner from "../../Global/Banner/Banner";
import CartCheckout from "./CartCheckout/CartCheckout";
import { Container, Row, Col } from "react-bootstrap";
import "./CartProduct.css";
const CartProduct = () => {
    return (
        <>
            <Banner
                menu="Giỏ hàng"
                img="https://images.unsplash.com/photo-1592647420148-bfcc177e2117?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFyYmVyc2hvcHxlbnwwfHwwfHx8MA%3D%3D"
            />
            <div className="container-cart-product">
                <Row>
                    <Col lg={6} md={6} className="checkout">
                        <ShippingPaymentForm />
                    </Col>
                    <Col lg={6} md={6}>
                        <CartCheckout />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CartProduct;
