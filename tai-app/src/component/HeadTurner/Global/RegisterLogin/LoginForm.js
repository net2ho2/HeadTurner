import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
    const initialValues = { email: "", password: "" };

    const validationSchema = Yup.object({
        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: Yup.string().required("Vui lòng nhập mật khẩu"),
    });

    const handleSubmit = (values) => {
        console.log("Login info:", values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="auth-form">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error-authfrom" />

                <Field type="password" name="password" placeholder="Mật khẩu" />
                <ErrorMessage name="password" component="div" className="error-authfrom" />

                <button type="submit" className="btn-submit">
                    ĐĂNG NHẬP
                </button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
