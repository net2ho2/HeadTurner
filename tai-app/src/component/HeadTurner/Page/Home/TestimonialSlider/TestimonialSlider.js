import React, { useState } from "react";
import "./TestimonialSlider.css";

const testimonials = [
    {
        quote: "Tôi thích Head Turner vì nhân viên thực sự thân thiện, hiểu con người bạn và họ đối xử với bạn thoải mái, chuyên nghiệp. Tôi sẽ luôn quay lại vì điều này, hơn nữa việc cắt tóc cũng rất hợp lý!",
        name: "RON BLACK",
        age: "23 years old",
    },
    {
        quote: "Một trải nghiệm cực kỳ tuyệt vời tại Head Turner. Không gian đẳng cấp và đội ngũ tận tâm!",
        name: "LUCAS WHITE",
        age: "28 years old",
    },
];

const TestimonialSlider = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="testimonial-wrapper">
            <div className="testimonial-container">
                <div className="testimonial-left">
                    <div className="quote-mark">
                        <img src="https://theme.hstatic.net/200000893323/1001256440/14/home_review_banner_left.jpg?v=1587" alt="" />
                    </div>

                    <div className="testimonial-slider">
                        <div className="testimonial-track" style={{ transform: `translateX(-${index * 100}%)` }}>
                            {testimonials.map((t, i) => (
                                <div className="testimonial-box" key={i}>
                                    <p className="label">KHÁCH HÀNG NÓI VỀ HEAD TURNER</p>
                                    <p className="quote">“{t.quote}”</p>
                                    <p className="author">{t.name}</p>
                                    <p className="age">{t.age}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="testimonial-buttons">
                    <button onClick={prev} className="btn black">
                        ←
                    </button>
                    <button onClick={next} className="btn yellow">
                        →
                    </button>
                </div>
            </div>

            <div className="testimonial-right">
                <img src="https://theme.hstatic.net/200000893323/1001256440/14/home_review_banner.jpg?v=1595" alt={testimonials[index].name} />
            </div>
        </div>
    );
};

export default TestimonialSlider;
