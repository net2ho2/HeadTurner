import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import Banner from "../../Global/Banner/Banner";

const NotFound = () => {
    return (
        <div>
            <Banner img="https://fivelanes-co-nz.b-cdn.net/wp-content/uploads/barberco-christchurch-1.jpg" menu="404"></Banner>
            <div className="notfound-container">
                <div className="notfound-content">
                    <img
                        src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-a6ac-622f-b77e-8f8d337be767/raw?se=2025-07-19T14%3A13%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=cd9c1235-a9e1-531e-acc4-3e33f566a3fa&skoid=add8ee7d-5fc7-451e-b06e-a82b2276cf62&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-18T20%3A22%3A50Z&ske=2025-07-19T20%3A22%3A50Z&sks=b&skv=2024-08-04&sig=BwutiIGguekUvVEEWyB4vzrWJiSve3tswA3NQLW7qAk%3D"
                        alt=""
                    />
                    <p className="notfound-text">Oops! Trang bạn tìm không tồn tại.</p>
                    <Link to="/" className="notfound-button">
                        Quay về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
