import React, { useState } from "react";
import "./StorySection.css";

const timelineData = [
    {
        year: "2008",
        text: "Kể từ khi khai trương tiệm ở Hồ Chí Minh vào năm 2014, tiệm này đã nỗ lực bảo tồn nghệ thuật chải chuốt truyền thống của nam giới.",
        text1: "Chuyên về những đường cắt cổ điển lấy cảm hứng từ những năm 1920 đến 1950. Head Turner ra đời từ niềm đam mê. Niềm đam mê làm thợ cắt tóc nhưng phải làm đúng cách.",
        text2: "Tiệm cắt tóc Head Turner mang đến cho nam giới cơ hội trải nghiệm không chỉ là cắt tóc hay cạo râu cổ điển mà còn là bầu không khí trường học cổ điển bao quanh bạn khi bạn bước vào một tiệm cắt tóc cổ điển.",
    },
    {
        year: "2013",
        text: "Tiệm cắt tóc Head Turner mang đến cho nam giới cơ hội trải nghiệm không chỉ là cắt tóc hay cạo râu cổ điển mà còn là bầu không khí trường học cổ điển bao quanh bạn khi bạn bước vào một tiệm cắt tóc cổ điển.",
        text1: "Chuyên về những đường cắt cổ điển lấy cảm hứng từ những năm 1920 đến 1950. Head Turner ra đời từ niềm đam mê. Niềm đam mê làm thợ cắt tóc nhưng phải làm đúng cách.",
        text2: "Tiệm cắt tóc Head Turner mang đến cho nam giới cơ hội trải nghiệm không chỉ là cắt tóc hay cạo râu cổ điển mà còn là bầu không khí trường học cổ điển bao quanh bạn khi bạn bước vào một tiệm cắt tóc cổ điển.",
    },
    {
        year: "2018",
        text: "Chuyên về những đường cắt cổ điển lấy cảm hứng từ những năm 1920 đến 1950. Head Turner ra đời từ niềm đam mê. Niềm đam mê làm thợ cắt tóc nhưng phải làm đúng cách.",
        text1: "Tiệm cắt tóc Head Turner mang đến cho nam giới cơ hội trải nghiệm không chỉ là cắt tóc hay cạo râu cổ điển mà còn là bầu không khí trường học cổ điển bao quanh bạn khi bạn bước vào một tiệm cắt tóc cổ điển.",
        text2: "",
    },
    {
        year: "2020",
        text: "Kể từ khi khai trương tiệm ở Hồ Chí Minh vào năm 2014, tiệm này đã nỗ lực bảo tồn nghệ thuật chải chuốt truyền thống của nam giới.",
        text1: "Chuyên về những đường cắt cổ điển lấy cảm hứng từ những năm 1920 đến 1950. Head Turner ra đời từ niềm đam mê. Niềm đam mê làm thợ cắt tóc nhưng phải làm đúng cách.",
        text2: "Tiệm cắt tóc Head Turner mang đến cho nam giới cơ hội trải nghiệm không chỉ là cắt tóc hay cạo râu cổ điển mà còn là bầu không khí trường học cổ điển bao quanh bạn khi bạn bước vào một tiệm cắt tóc cổ điển.",
    },
    {
        year: "2024",
        text: "Head Turner đang bước vào một giai đoạn chuyển mình mạnh mẽ, kết hợp giữa truyền thống và công nghệ hiện đại.",
        text1: "Chúng tôi đầu tư vào hệ thống đặt lịch trực tuyến, quản lý khách hàng và nâng cao trải nghiệm dịch vụ thông qua nền tảng số.",
        text2: "Mục tiêu là xây dựng chuỗi barbershop mang bản sắc Việt, với chuẩn mực dịch vụ quốc tế và tinh thần hoài cổ trong từng chi tiết.",
    },
];

const StorySection = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const current = timelineData[selectedIndex];

    return (
        <section className="story-section">
            <div className="story-container">
                <div className="story-left">
                    <p className="story-label">CÂU CHUYỆN CỦA HEAD TURNER</p>
                    <h2 className="story-heading">
                        ĐỊNH NGHĨA LẠI <br /> TRẢI NGHIỆM BARBERSHOP
                    </h2>
                    <div className="story-content">
                        <ul className="year-list">
                            {timelineData.map((item, index) => (
                                <li key={item.year} className={`year-item ${index === selectedIndex ? "active" : ""}`} onClick={() => setSelectedIndex(index)}>
                                    {item.year}
                                    {index === selectedIndex && <span className="dot"></span>}
                                </li>
                            ))}
                        </ul>
                        <div className="year-description">
                            <p>{current.text}</p>
                            <p>{current.text1}</p>
                            <p>{current.text2}</p>
                        </div>
                    </div>
                </div>
                <div className="story-right">
                    <div className="since-text">
                        <p>SINCE</p>
                        <strong>1987</strong>
                    </div>
                    <div className="story-images">
                        <img src="https://i.pinimg.com/736x/88/a6/ce/88a6ce3b22ee7fd821061f38fccf7b94.jpg" alt="Main" className="main-img" />
                        <img src="https://theme.hstatic.net/200000893323/1001256440/14/about_us_history_banner_2.jpg?v=1595" alt="Overlay" className="overlay-img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
