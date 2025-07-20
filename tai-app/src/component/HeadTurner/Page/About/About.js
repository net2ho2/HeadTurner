import React from "react";
import StorySection from "./StorySection/StorySection";
import Banner from "../../Global/Banner/Banner";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import TeamMember from "./TeamMember/TeamMember";
import PromoBanner from "../../Global/PromoBanner/PromoBanner";
import TestimonialSection from "./TestimonialSection/TestimonialSection";

const About = () => {
    return (
        <div>
            <Banner menu="Giới thiệu" img="https://theme.hstatic.net/200000893323/1001256440/14/about_us_banner.jpg?v=1587"></Banner>
            <StorySection></StorySection>
            <WhyChooseUs></WhyChooseUs>
            <TeamMember></TeamMember>
            <TestimonialSection></TestimonialSection>
            <PromoBanner></PromoBanner>
        </div>
    );
};

export default About;
