import React from "react";
import "./WhyChooseUs.css";

const features = [
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/about_us_why_img_1.jpg?v=1595theme.hstatic.net/200000893323/1001256440/14/about_us_why_img_1.jpg?v=1595", // Bạn có thể thay bằng ảnh hoặc SVG nếu cần
        title: "MIỄN PHÍ CÀ PHÊ & THỨC UỐNG",
        description:
            "Bạn sẽ luôn được mời một tách cà phê hoặc một ly nước ngọt miễn phí",
    },
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/about_us_why_img_2.jpg?v=1595",
        title: "DỊCH VỤ CHẤT LƯỢNG CAO",
        description:
            "Tại Head Turner, bạn không chỉ nhận được dịch vụ cắt tóc tuyệt vời mà còn được trải nghiệm truyền thống và hiện đại.",
    },
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/about_us_why_img_3.jpg?v=1595",
        title: "CAM KẾT TỐT NHẤT",
        description:
            "Đội ngũ luôn giải thích hòa nhã cùng sự khan hiếm salon – bạn sẽ luôn muốn quay lại Head Turner.",
    },
    {
        icon: "https://theme.hstatic.net/200000893323/1001256440/14/about_us_why_img_4.jpg?v=1595.",
        title: "TRẢI NGHIỆM ĐÁNG NHỚ",
        description:
            "Ba phương pháp điều trị đặc trưng sẽ đảm bảo rằng quý ông rời tiệm cắt tóc của chúng tôi một cách hoàn hảo.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="why-section">
            <div className="why-container">
                <p className="why-subtitle">TẠI SAO CHỌN CHÚNG TÔI</p>
                <h2 className="why-title">
                    HIỆN ĐẠI & CHUYÊN NGHIỆP <br /> HEAD TURNER STUDIO
                </h2>
                <p className="why-desc">
                    Kể từ khi khai trương vào năm 2014, Chuỗi cắt tóc Head
                    Turner đã nỗ lực bảo tồn và phát triển nghệ thuật làm đẹp
                    truyền thống của nam giới.
                </p>

                <div className="why-grid">
                    {features.map((item, index) => (
                        <div className="why-item" key={index}>
                            <div className="why-icon">
                                <img src={item.icon} alt="" />
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
