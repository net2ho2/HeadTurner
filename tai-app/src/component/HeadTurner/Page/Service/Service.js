// src/component/HeadTurner/Page/Service/Service.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../Global/Banner/Banner";
import PromoBanner from "../../Global/PromoBanner/PromoBanner";
import CardService from "../../Global/CardService/CardService";
import "./Service.css";

const API_URL = "https://6867d51ad5933161d709fb13.mockapi.io/Service";

const Service = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get(API_URL).then((res) => setServices(res.data));
    }, []);

    const categories = ["CUTS", "SHAVES", "BEARD STYLING", "BARBER-SPA"];

    const groupedServices = categories.map((cat) => ({
        title: cat,
        items: services.filter((item) => item.category === cat),
    }));

    return (
        <>
            <Banner menu="Dịch vụ" img="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=jpg&q=60&w=3000" />

            <div className="service-wrapper">
                {groupedServices.map((section, idx) => (
                    <div key={idx} className="service-category">
                        <h2 className="section-title">{section.title}</h2>
                        <div className="service-list">
                            {section.items.map((item) => (
                                <CardService key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <PromoBanner />
        </>
    );
};

export default Service;
