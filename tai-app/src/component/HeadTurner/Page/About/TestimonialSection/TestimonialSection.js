import React, { useRef, useEffect } from "react";
import "./TestimonialSection.css";
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
    {
        text: "Tôi thích Head Turner vì nhân viên thực sự thân thiện, hiểu con người bạn và họ đối xử với bạn thoải mái, chuyên nghiệp. Tôi sẽ luôn quay lại vì điều này, hơn nữa việc cắt tóc cũng rất hợp lý!",
        author: "JOHN DOE",
        age: "23 tuổi",
    },
    {
        text: "Dịch vụ ở đây rất tuyệt! Tôi được tư vấn kỹ lưỡng trước khi cắt, kết quả thì vượt mong đợi.",
        author: "LÊ MINH",
        age: "29 tuổi",
    },
    {
        text: "Không gian sang trọng, nhân viên chuyên nghiệp và rất thân thiện. Mình sẽ giới thiệu cho bạn bè.",
        author: "TRẦN ANH",
        age: "31 tuổi",
    },
];

const TestimonialSection = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.params && prevRef.current && nextRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;

            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <section className="testimonial-section">
            <div className="container">
                <p className="subtitle">KHÁCH HÀNG NÓI VỀ</p>
                <h2 className="title">HEAD TURNER</h2>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    speed={600}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="swiper-container"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="quote-icons">
                                <FaQuoteLeft className="quote-left" />
                                <p className="testimonial-text">“{item.text}”</p>
                                <FaQuoteRight className="quote-right" />
                            </div>
                            <div className="author">
                                <p className="name">{item.author}</p>
                                <p className="age">{item.age}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="buttons">
                    <button className="btn left1" ref={prevRef}>
                        <FaChevronLeft />
                    </button>
                    <button className="btn right1" ref={nextRef}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
