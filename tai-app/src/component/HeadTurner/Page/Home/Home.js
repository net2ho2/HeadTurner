import React, { useEffect } from "react";
import IntroSection from "./IntroSection/IntroSection";
import ServiceSection from "./ServiceSection/ServiceSection";
import InspirationSection from "./InspirationSection/InspirationSection";
import ServiceHighlight from "./ServiceHighlight/ServiceHighlight";
import TestimonialSlider from "./TestimonialSlider/TestimonialSlider";
import TeamSection from "./TeamMemberCard/TeamSection";
import InspirationSection1 from "./InspirationSection1/InspirationSection1";
import BookingForm from "./BookingForm/BookingForm";

import HeaderHome from "./Header-Home/HeaderHome";

const Home = () => {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === "#booking-section") {
            setTimeout(() => {
                const section = document.getElementById("booking-section");
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }, 300); // chờ 1 chút để component render xong
        }
    }, []);
    return (
        <div>
            <HeaderHome></HeaderHome>
            <IntroSection></IntroSection>
            <InspirationSection></InspirationSection>
            <ServiceHighlight></ServiceHighlight>
            <ServiceSection></ServiceSection>
            <TestimonialSlider></TestimonialSlider>
            <TeamSection></TeamSection>
            <InspirationSection1></InspirationSection1>
            <section id="booking-section">
                <BookingForm />
            </section>
        </div>
    );
};

export default Home;
