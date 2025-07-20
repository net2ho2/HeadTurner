import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Faq.css";
import Banner from "../../Global/Banner/Banner";

const faqData = [
    {
        question: "Làm thế nào để tôi đặt hàng online?",
        answer: (
            <div>
                The Swan rất vui lòng hỗ trợ khách hàng đặt hàng online bằng một trong những cách sau:
                <ul>
                    <li>– Truy cập trang web: The Swan</li>
                    <li>– Gửi email đặt hàng: hi@theswan.com</li>
                    <li>– Liên hệ hotline: 1900 636 000 để đặt sản phẩm</li>
                    <li>– Chat với tư vấn viên trên fanpage của The Swan</li>
                </ul>
            </div>
        ),
    },
    {
        question: "Nếu tôi đặt hàng trực tuyến có những rủi ro gì không?",
        answer: (
            <div>
                Chúng tôi cam kết đảm bảo an toàn khi mua sắm online. Tuy nhiên, một số rủi ro có thể gặp:
                <ul>
                    <li>– Hàng hóa bị hư hỏng trong quá trình vận chuyển</li>
                    <li>– Sai sót trong quá trình đóng gói sản phẩm</li>
                </ul>
                Tất cả vấn đề sẽ được chúng tôi hỗ trợ đổi trả miễn phí nếu do lỗi từ phía chúng tôi.
            </div>
        ),
    },
    {
        question: "Nếu tôi mua sản phẩm với số lượng nhiều thì có được giảm không?",
        answer: (
            <div>
                Có. Khi mua với số lượng lớn, bạn sẽ nhận được mức chiết khấu đặc biệt hoặc ưu đãi vận chuyển. Vui lòng liên hệ hotline <b>1900 636 000</b> để nhận báo giá chi tiết.
            </div>
        ),
    },
    {
        question: "Quy định hoàn trả và đổi sản phẩm của Mode như thế nào?",
        answer: (
            <div>
                Bạn có thể đổi hoặc trả hàng trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm:
                <ul>
                    <li>– Bị lỗi sản xuất</li>
                    <li>– Không đúng mẫu mã hoặc size như đặt hàng</li>
                </ul>
                Sản phẩm phải còn nguyên tem, nhãn và chưa qua sử dụng.
            </div>
        ),
    },
    {
        question: "Tôi mua hàng rồi, không vừa ý có thể đổi lại hay không?",
        answer: (
            <div>Có. Chúng tôi hỗ trợ đổi hàng trong 7 ngày. Sản phẩm phải còn nguyên tem mác và chưa qua sử dụng. Lưu ý: Không áp dụng đổi trả với sản phẩm đã qua giặt, hư hỏng do người dùng.</div>
        ),
    },
    {
        question: "Tôi đã chọn hình thức thanh toán COD, nhưng khi hàng tới nơi, tôi không muốn lấy có được không?",
        answer: <div>Trường hợp bạn từ chối nhận hàng nhiều lần, tài khoản của bạn có thể bị hạn chế hình thức COD trong lần đặt hàng sau. Vui lòng cân nhắc trước khi đặt hàng.</div>,
    },
    {
        question: "Tôi phải trả phí vận chuyển tận nơi như thế nào?",
        answer: (
            <div>
                Phí vận chuyển sẽ hiển thị rõ khi bạn đặt hàng.
                <ul>
                    <li>– Miễn phí vận chuyển với đơn hàng từ 500.000đ trở lên</li>
                    <li>– Với đơn hàng nhỏ hơn 500.000đ, phí dao động từ 20.000 – 40.000đ tùy khu vực</li>
                </ul>
            </div>
        ),
    },
    {
        question: "Tôi có được đổi sản phẩm mới hoặc hoàn trả tiền không?",
        answer: (
            <div>
                Có, chúng tôi hỗ trợ đổi sản phẩm hoặc hoàn tiền nếu:
                <ul>
                    <li>– Hàng bị lỗi sản xuất</li>
                    <li>– Hàng không đúng đơn đặt</li>
                </ul>
                Quy trình xử lý từ 3 – 5 ngày làm việc sau khi nhận hàng trả về.
            </div>
        ),
    },
    {
        question: "Nếu trả tôi không mang theo hóa đơn và phiếu thông tin sản phẩm thì có được đổi trả không?",
        answer: <div>Hóa đơn và phiếu thông tin sản phẩm là căn cứ để đổi trả nhanh chóng. Nếu không có, vui lòng cung cấp thông tin đặt hàng (số điện thoại, mã đơn) để chúng tôi kiểm tra.</div>,
    },
    {
        question: "Khi đặt hàng online, tôi phải thanh toán như thế nào?",
        answer: (
            <div>
                Bạn có thể chọn 2 hình thức thanh toán:
                <ul>
                    <li>– Thanh toán khi nhận hàng (COD)</li>
                    <li>– Chuyển khoản qua ngân hàng</li>
                </ul>
                Tất cả thông tin thanh toán sẽ hiển thị rõ trước khi xác nhận đơn hàng.
            </div>
        ),
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div>
            <Banner menu="Quy định" img="https://theme.hstatic.net/200000893323/1001256440/14/faq_banner.jpg?v=1587" />

            <div className="faq-container">
                <img src="https://i.pinimg.com/1200x/6b/7e/7a/6b7e7a54f651033997da2b58f7df3d24.jpg" alt="" />
                <h2 className="faq-title">Bạn có thắc mắc về việc mua hàng từ Head Turner? Bạn có thể tham khảo các trường hợp hay gặp dưới đây:</h2>
                <p className="faq-desc">
                    Head Turner chuyên cắt và tạo mẫu tóc nam, đào tạo tóc nam, Tattoo hair,... – Với 15 năm kinh nghiệm trong nghề bạn sẽ trải nghiệm được dịch vụ tốt nhất của chúng tôi. Chúng tôi tự
                    tin là sự lựa chọn hàng đầu cho bạn.
                </p>

                <div className="faq-list">
                    {faqData.map((item, index) => (
                        <div className="faq-item" key={index}>
                            <div className="faq-question" onClick={() => toggle(index)}>
                                {item.question}
                                <span className={`arrow ${openIndex === index ? "open" : ""}`}>▾</span>
                            </div>
                            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="faq-contact-form">
                <h2 className="faq-contact-title">Bạn vẫn còn câu hỏi cần giải đáp, vui lòng liên hệ trực tiếp với chúng tôi</h2>

                <Formik
                    initialValues={{ name: "", email: "", phone: "", message: "" }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Vui lòng nhập tên"),
                        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
                        phone: Yup.string().required("Vui lòng nhập số điện thoại"),
                        message: Yup.string().required("Vui lòng nhập câu hỏi"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        console.log("Dữ liệu gửi:", values);
                        alert("Cảm ơn bạn đã gửi câu hỏi!");
                        resetForm();
                    }}
                >
                    <Form className="contact-form">
                        <Field name="name" type="text" placeholder="Tên của bạn" />
                        <ErrorMessage name="name" component="div" className="form-error" />

                        <div className="contact-form-row">
                            <div style={{ width: "100%" }}>
                                <Field name="email" type="email" placeholder="Email của bạn" />
                                <ErrorMessage name="email" component="div" className="form-error" />
                            </div>
                            <div style={{ width: "100%" }}>
                                <Field name="phone" type="tel" placeholder="Số điện thoại của bạn" />
                                <ErrorMessage name="phone" component="div" className="form-error" />
                            </div>
                        </div>

                        <Field name="message" as="textarea" placeholder="Câu hỏi của bạn" />
                        <ErrorMessage name="message" component="div" className="form-error" />

                        <p className="recaptcha-note">
                            This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                                {" "}
                                Privacy Policy{" "}
                            </a>
                            and
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                                {" "}
                                Terms of Service{" "}
                            </a>
                            apply.
                        </p>

                        <button type="submit" className="submit-button">
                            GỬI CHO CHÚNG TÔI
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
