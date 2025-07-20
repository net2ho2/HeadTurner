import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactForm.css";
import Banner from "../../Global/Banner/Banner";

const ContactForm = () => {
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Vui lòng nhập tên của bạn."),
        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email."),
        phone: Yup.string().required("Vui lòng nhập số điện thoại."),
        message: Yup.string().required("Vui lòng nhập nội dung."),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log("Form submitted:", values);
        alert("Gửi thành công!");
        resetForm();
    };

    return (
        <div className="contact-container">
            <Banner menu="Liên hệ" img="https://theme.hstatic.net/200000893323/1001256440/14/contact_banner.jpg?v=1587" />
            <div className="contact-flex-wrapper">
                <div className="contact-left">
                    <div className="contact-info">
                        <h2>Thông tin liên hệ</h2>
                        <p>
                            <i className="fas fa-map-marker-alt"></i> <strong>Địa chỉ:</strong>
                            <br />
                            Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.
                        </p>
                        <p>
                            <i className="fas fa-clock"></i> <strong>Thời gian làm việc:</strong>
                            <br />
                            Thứ 2 đến Thứ 6: 8h00 - 18h00
                            <br />
                            Thứ 7 & Chủ nhật: 8h00 - 17h00
                        </p>
                        <p>
                            <i className="fas fa-phone"></i> <strong>Điện thoại:</strong> 1900.000.XXX
                        </p>
                        <p>
                            <i className="fas fa-envelope"></i> <strong>Email:</strong> hi@theswan.abc
                        </p>
                    </div>

                    <div className="contact-form-section">
                        <h3>Gửi thắc mắc cho chúng tôi</h3>
                        <p>Nếu bạn có thắc mắc gì, hãy gửi yêu cầu cho chúng tôi. Chúng tôi sẽ liên hệ lại sớm nhất.</p>

                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            <Form className="contact-form">
                                <Field type="text" name="name" placeholder="Tên của bạn" />
                                <ErrorMessage name="name" component="div" className="contact-error" />

                                <div className="contact-row">
                                    <div className="contact-col">
                                        <Field type="email" name="email" placeholder="Email của bạn" />
                                        <ErrorMessage name="email" component="div" className="contact-error mid" />
                                    </div>
                                    <div className="contact-col">
                                        <Field type="text" name="phone" placeholder="Số điện thoại của bạn" />
                                        <ErrorMessage name="phone" component="div" className="contact-error mid" />
                                    </div>
                                </div>

                                <Field as="textarea" name="message" placeholder="Nội dung" rows="5" />
                                <ErrorMessage name="message" component="div" className="contact-error" />

                                <button type="submit" className="contact-submit-button">
                                    GỬI CHO CHÚNG TÔI
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="contact-right">
                    <iframe
                        src="https://www.google.com/maps?q=182%20L%C3%AA%20%C4%90%E1%BA%A1i%20H%C3%A0nh%2C%20ph%C6%B0%E1%BB%9Dng%2015%2C%20qu%E1%BA%ADn%2011%2C%20HCM&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
