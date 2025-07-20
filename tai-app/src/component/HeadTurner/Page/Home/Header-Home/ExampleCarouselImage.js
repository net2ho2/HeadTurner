import React from "react";

const ExampleCarouselImage = ({ text }) => (
    <div
        style={{
            height: "500px",
            backgroundColor: "#555",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
        }}
    >
        {text}
    </div>
);

export default ExampleCarouselImage;
