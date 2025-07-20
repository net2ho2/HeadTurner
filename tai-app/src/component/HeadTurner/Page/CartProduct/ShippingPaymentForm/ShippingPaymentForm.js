import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductContext } from "../../../Global/ProductContext/ProductContext";
import "./ShippingPaymentForm.css";

const paymentIcons = {
    cod: "https://cdn-icons-png.flaticon.com/512/1041/1041873.png",
    zalopay: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png",
    momo: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    vnpay: "https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg",
};

const ShippingPaymentForm = () => {
    const { user } = useContext(ProductContext);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [editing, setEditing] = useState({});

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await fetch("https://provinces.open-api.vn/api/?depth=2");
            const data = await res.json();
            setProvinces(data);
        };
        fetchProvinces();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            gender: user?.gender || "Chị",
            fullName: user?.fullName || "",
            phone: user?.phone || "",
            email: user?.email || "",
            address: user?.address || "",
            city: user?.city || "",
            district: user?.district || "",
            ward: user?.ward || "",
            note: "",
            otherReceiver: false,
            paymentMethod: "cod",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Vui lòng nhập họ tên"),
            phone: Yup.string()
                .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
                .required("Vui lòng nhập số điện thoại"),
            email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
            city: Yup.string().required("Chọn tỉnh/thành phố"),
            district: Yup.string().required("Chọn quận/huyện"),
            ward: Yup.string().required("Chọn phường/xã"),
        }),
        onSubmit: (values) => {
            console.log("Dữ liệu gửi:", values);
            alert("Đặt hàng thành công!");
        },
    });

    useEffect(() => {
        const selected = provinces.find((p) => p.name === formik.values.city);
        setDistricts(selected?.districts || []);
        setWards([]);
        formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "");
    }, [formik.values.city]);

    useEffect(() => {
        const selected = districts.find((d) => d.name === formik.values.district);
        setWards(selected?.wards || []);
        formik.setFieldValue("ward", "");
    }, [formik.values.district]);

    const handleEdit = (field) => {
        setEditing((prev) => ({ ...prev, [field]: true }));
    };

    return (
        <form onSubmit={formik.handleSubmit} className="form-wrapper">
            <h2 className="form-section-title">Thông tin vận chuyển</h2>

            <div className="form-name-group-with-error">
                <div className="form-name-group">
                    <select name="gender" value={formik.values.gender} onChange={formik.handleChange} className="form-select-gender">
                        <option value="Anh">Anh</option>
                        <option value="Chị">Chị</option>
                    </select>

                    <div className="form-input-wrapper">
                        <input
                            name="fullName"
                            type="text"
                            placeholder="Nhập họ tên"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input-name"
                            disabled={!editing.fullName && user?.fullName}
                        />
                        {!editing.fullName && user?.fullName && (
                            <button type="button" className="edit-btn" onClick={() => handleEdit("fullName")}>
                                Sửa
                            </button>
                        )}
                    </div>
                </div>
                {formik.touched.fullName && formik.errors.fullName && <div className="form-error">{formik.errors.fullName}</div>}
            </div>

            <div className="form-input-wrapper">
                <input
                    name="phone"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                    disabled={!editing.phone && user?.phone}
                />
                {!editing.phone && user?.phone && (
                    <button type="button" className="edit-btn" onClick={() => handleEdit("phone")}>
                        Sửa
                    </button>
                )}
            </div>
            {formik.touched.phone && formik.errors.phone && <div className="form-error">{formik.errors.phone}</div>}

            <div className="form-input-wrapper">
                <input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                    disabled={!editing.email && user?.email}
                />
                {!editing.email && user?.email && (
                    <button type="button" className="edit-btn" onClick={() => handleEdit("email")}>
                        Sửa
                    </button>
                )}
            </div>
            {formik.touched.email && formik.errors.email && <div className="form-error">{formik.errors.email}</div>}

            <input
                name="address"
                type="text"
                placeholder="Nhập địa chỉ (số nhà, tên đường...)"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
            />
            {formik.touched.address && formik.errors.address && <div className="form-error">{formik.errors.address}</div>}

            <select name="city" className="form-select" value={formik.values.city} onChange={formik.handleChange}>
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((prov) => (
                    <option key={prov.code} value={prov.name}>
                        {prov.name}
                    </option>
                ))}
            </select>
            {formik.touched.city && formik.errors.city && <div className="form-error">{formik.errors.city}</div>}

            <select name="district" className="form-select" value={formik.values.district} onChange={formik.handleChange}>
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((dist) => (
                    <option key={dist.code} value={dist.name}>
                        {dist.name}
                    </option>
                ))}
            </select>
            {formik.touched.district && formik.errors.district && <div className="form-error">{formik.errors.district}</div>}

            <select name="ward" className="form-select" value={formik.values.ward} onChange={formik.handleChange}>
                <option value="">Chọn Phường/Xã</option>
                {wards.map((w) => (
                    <option key={w.code} value={w.name}>
                        {w.name}
                    </option>
                ))}
            </select>
            {formik.touched.ward && formik.errors.ward && <div className="form-error">{formik.errors.ward}</div>}

            <input name="note" type="text" placeholder="Ghi chú thêm (nếu có)" value={formik.values.note} onChange={formik.handleChange} className="form-input" />

            <label className="form-checkbox">
                <input name="otherReceiver" type="checkbox" checked={formik.values.otherReceiver} onChange={formik.handleChange} />
                Gọi người khác nhận hàng
            </label>

            <h2 className="form-section-title">Hình thức thanh toán</h2>
            <div className="form-payment-options">
                {["cod", "zalopay", "momo", "vnpay"].map((method) => (
                    <label key={method} className="form-radio-option">
                        <input type="radio" name="paymentMethod" value={method} checked={formik.values.paymentMethod === method} onChange={formik.handleChange} />
                        <img src={paymentIcons[method]} alt={method} className="payment-icon" />
                        {method === "cod" ? "Thanh toán khi nhận hàng" : `Ví điện tử ${method.toUpperCase()}`}
                    </label>
                ))}
            </div>

            <button type="submit" className="form-submit-button">
                Xác nhận đặt hàng
            </button>
        </form>
    );
};

export default ShippingPaymentForm;
