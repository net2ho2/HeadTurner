import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BookingContext } from "../../../Global/ProductContext/BookingContext";
import "./BookingForm.css";

const BookingForm = () => {
    // ✅ Hook gọi ở trên cùng, luôn giữ nguyên thứ tự
    const context = useContext(BookingContext);
    const [allServices, setAllServices] = useState([]);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            date: "",
            service: "",
            message: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Vui lòng nhập họ tên"),
            email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
            phone: Yup.string()
                .matches(/^[0-9]+$/, "Chỉ được nhập số")
                .min(9, "Tối thiểu 9 số")
                .required("Vui lòng nhập số điện thoại"),
            date: Yup.date().required("Chọn ngày"),
            service: Yup.string().required("Chọn dịch vụ"),
        }),
        onSubmit: (values) => {
            console.log("Submitted:", values);
            alert("Đặt lịch thành công!");
        },
    });

    useEffect(() => {
        axios
            .get("https://6867d51ad5933161d709fb13.mockapi.io/Service")
            .then((res) => setAllServices(res.data))
            .catch((err) => console.error("Lỗi khi tải service:", err));
    }, []);

    // ✅ Hook chạy sau khi `selectedService` từ context thay đổi
    useEffect(() => {
        if (context?.selectedService) {
            formik.setFieldValue("service", context.selectedService);
        }
    }, [context?.selectedService]);

    // ✅ Sau khi hook đã gọi đầy đủ, mới kiểm tra context null
    if (!context) return null;

    const { availableServices, selectedService, setSelectedService, addService, removeService } = context;

    const handleSelectChange = (e) => {
        const name = e.target.value;
        const selected = allServices.find((s) => s.name === name);
        if (selected) {
            addService(selected);
            setSelectedService(name);
            formik.setFieldValue("service", name);
        }
    };

    return (
        <section className="booking-section">
            <div className="form-container">
                <div className="form-header">
                    <span className="subtitle">LIÊN HỆ</span>
                    <h2 className="title">ĐẶT LỊCH NGAY</h2>
                </div>

                <form className="booking-form" onSubmit={formik.handleSubmit}>
                    <div className="contact-phone">
                        <div className="label1">SỐ ĐIỆN THOẠI LIÊN HỆ</div>
                        <div className="phone">+84 0938 888 335</div>
                    </div>

                    <div className="form-row">
                        <input name="fullName" type="text" placeholder="Họ và tên" {...formik.getFieldProps("fullName")} />
                        {formik.touched.fullName && formik.errors.fullName && <div className="error-item">{formik.errors.fullName}</div>}
                        <input name="email" type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                        {formik.touched.email && formik.errors.email && <div className="error-item">{formik.errors.email}</div>}
                    </div>

                    <div className="form-row">
                        <input name="phone" type="tel" placeholder="Số điện thoại" {...formik.getFieldProps("phone")} />
                        {formik.touched.phone && formik.errors.phone && <div className="error-item">{formik.errors.phone}</div>}
                        <input name="date" type="date" {...formik.getFieldProps("date")} />
                        {formik.touched.date && formik.errors.date && <div className="error-item">{formik.errors.date}</div>}
                    </div>

                    <div className="form-row">
                        <select name="service" onChange={handleSelectChange} value={formik.values.service}>
                            <option value="">Chọn dịch vụ</option>
                            {allServices.map((service, i) => (
                                <option key={i} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="selected-service-list">
                        {availableServices.map((service, i) => (
                            <div key={i} className="selected-service-card">
                                <img src={service.image} alt={service.name} className="thumb" />
                                <div className="info">
                                    <h5>{service.name}</h5>
                                    <p className="price">{Number(service.price).toLocaleString()}đ</p>
                                    <p className="desc">{service.description}</p>
                                </div>
                                <button
                                    className="remove-btn1"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeService(service.name);
                                        if (formik.values.service === service.name) {
                                            formik.setFieldValue("service", "");
                                            setSelectedService("");
                                        }
                                    }}
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="form-error">
                        {formik.touched.service && formik.errors.service && <div className="error-item">{formik.errors.service}</div>}
                    </div>

                    <div className="form-row">
                        <textarea name="message" rows="4" placeholder="Nội dung" {...formik.getFieldProps("message")} />
                    </div>

                    <button type="submit" className="submit-button">
                        ĐẶT NGAY
                    </button>
                </form>
            </div>
        </section>
    );
};

export default BookingForm;
