import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    return (
        <div className="rocket-loader-overlay">
            <div className="rocket-loader">
                <div className="rocket">
                    <div className="rocket-extras"></div>
                    <div className="jet">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
