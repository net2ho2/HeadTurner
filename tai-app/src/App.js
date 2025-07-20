import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import pages
import Home from "./component/HeadTurner/Page/Home/Home";
import About from "./component/HeadTurner/Page/About/About";
import ListProduct from "./component/HeadTurner/Page/ListProduct/ListProduct";
import Service from "./component/HeadTurner/Page/Service/Service";
import ContactForm from "./component/HeadTurner/Page/Contact/ContactForm";
import HairCare from "./component/HeadTurner/Page/HairCare/HairCare";
import Detail from "./component/HeadTurner/Page/Detail/Detail";
import EditProduct from "./component/HeadTurner/Page/EditProduct/EditProduct";
import PostDetail from "./component/HeadTurner/Page/HairCare/PostDetail.js/PostDetail";
import AuthForm from "./component/HeadTurner/Global/RegisterLogin/AuthForm";
import CartProduct from "./component/HeadTurner/Page/CartProduct/CartProduct";
import FAQ from "./component/HeadTurner/Page/FAQ/Faq";

// Import layout & context
import Header from "./component/HeadTurner/Global/Header/Header";
import Footer from "./component/HeadTurner/Global/Footer/Footer";
import { ProductProvider } from "./component/HeadTurner/Global/ProductContext/ProductContext";
import { BookingProvider } from "./component/HeadTurner/Global/ProductContext/BookingContext";

// Loading component
import LoadingSpinner from "./component/HeadTurner/Page/Loading/LoadingSpinner";
import NotFound from "./component/HeadTurner/Page/Error404/NotFound";

// Component theo dõi định tuyến và hiển thị loading
const AppRoutes = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 1000); // thời gian hiển thị loading
        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <>
            {loading && <LoadingSpinner />}
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<ListProduct />} />
                <Route path="/services" element={<Service />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/hair-care" element={<HairCare />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/admin" element={<EditProduct />} />
                <Route path="/login-register" element={<AuthForm />} />
                <Route path="/cart-product" element={<CartProduct />} />
                <Route path="/policy" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
};

function App() {
    return (
        <ProductProvider>
            <BookingProvider>
                <AppRoutes />
                <ToastContainer position="top-right" autoClose={2000} />
            </BookingProvider>
        </ProductProvider>
    );
}

export default App;
