import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AuthForm.css"; // Đừng quên tạo và import file CSS

const RegisterForm = () => {
    const [showPopup, setShowPopup] = useState(false);

    const initialValues = {
        lastName: "",
        firstName: "",
        gender: "",
        birthday: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        lastName: Yup.string().required("Vui lòng nhập họ"),
        firstName: Yup.string().required("Vui lòng nhập tên"),
        gender: Yup.string().required("Chọn giới tính"),
        birthday: Yup.date().required("Chọn ngày sinh"),
        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: Yup.string().min(8, "Ít nhất 8 ký tự").required("Vui lòng nhập mật khẩu"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log("Register info:", values);
        setShowPopup(true);
        resetForm();

        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div className="register-container">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="auth-form">
                    <Field type="text" name="lastName" placeholder="Họ" />
                    <ErrorMessage name="lastName" component="div" className="error-authfrom" />

                    <Field type="text" name="firstName" placeholder="Tên" />
                    <ErrorMessage name="firstName" component="div" className="error-authfrom" />

                    <div className="gender-group">
                        <label>
                            <Field type="radio" name="gender" value="female" />
                            Nữ
                        </label>
                        <label>
                            <Field type="radio" name="gender" value="male" />
                            Nam
                        </label>
                    </div>
                    <ErrorMessage name="gender" component="div" className="error-authfrom" />

                    <Field type="date" name="birthday" />
                    <ErrorMessage name="birthday" component="div" className="error-authfrom" />

                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="error-authfrom" />

                    <Field type="password" name="password" placeholder="Mật khẩu" />
                    <ErrorMessage name="password" component="div" className="error-authfrom" />

                    <button type="submit" className="btn-submit">
                        ĐĂNG KÝ
                    </button>
                </Form>
            </Formik>

            {showPopup && (
                <div className="popup-success">
                    <button className="popup-close" onClick={() => setShowPopup(false)}>
                        ×
                    </button>
                    <div className="popup-icon">
                        <svg viewBox="0 0 130.2 130.2" xmlns="http://www.w3.org/2000/svg">
                            <circle className="path circle" fill="none" stroke="#4BB543" strokeWidth="6" cx="65.1" cy="65.1" r="62.1" />
                            <polyline className="path check" fill="none" stroke="#4BB543" strokeWidth="6" points="100.2,40.2 51.5,88.8 29.8,67.5" />
                        </svg>
                    </div>
                    <div className="popup-content">
                        <h4>Đăng ký thành công!</h4>
                        <p>Chào mừng bạn đến với hệ thống.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
