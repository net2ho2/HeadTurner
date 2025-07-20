// src/component/HeadTurner/Global/ProductContext/BookingContext.js

import React, { createContext, useState } from "react";

// Tạo context để dùng trong toàn ứng dụng
export const BookingContext = createContext();

// BookingProvider là component dùng để bao bọc toàn bộ phần cần chia sẻ dữ liệu booking
export const BookingProvider = ({ children }) => {
    // Khởi tạo danh sách dịch vụ từ localStorage (nếu có), nếu không thì để rỗng
    const [availableServices, setAvailableServices] = useState(() => {
        const stored = localStorage.getItem("bookingServices"); // lấy từ localStorage
        return stored ? JSON.parse(stored) : []; // parse ra mảng nếu có, hoặc [] nếu null
    });

    // Lưu tên dịch vụ hiện đang được chọn
    const [selectedService, setSelectedService] = useState("");

    /**
     * Thêm một dịch vụ mới vào danh sách (nếu chưa có)
     * @param {Object} serviceObj - đối tượng dịch vụ { name: "Cắt tóc", ... }
     */
    const addService = (serviceObj) => {
        // Kiểm tra nếu dịch vụ đã tồn tại trong danh sách (theo tên)
        const exists = availableServices.some((s) => s.name === serviceObj.name);

        if (!exists) {
            // Nếu chưa có thì thêm vào mảng
            const updated = [...availableServices, serviceObj];
            setAvailableServices(updated); // cập nhật state
            localStorage.setItem("bookingServices", JSON.stringify(updated)); // lưu lại vào localStorage
        }

        // Đặt dịch vụ này làm dịch vụ được chọn
        setSelectedService(serviceObj.name);
    };

    /**
     * Xóa một dịch vụ khỏi danh sách dựa trên tên
     * @param {String} name - tên dịch vụ cần xóa
     */
    const removeService = (name) => {
        const updated = availableServices.filter((s) => s.name !== name); // loại bỏ dịch vụ theo tên
        setAvailableServices(updated); // cập nhật state
        localStorage.setItem("bookingServices", JSON.stringify(updated)); // cập nhật lại localStorage
    };

    // Truyền toàn bộ state và hàm xử lý qua Context
    return (
        <BookingContext.Provider
            value={{
                availableServices, // mảng các dịch vụ hiện tại
                selectedService, // tên dịch vụ đang chọn
                setSelectedService, // hàm cập nhật dịch vụ đang chọn
                addService, // hàm thêm dịch vụ
                removeService, // hàm xóa dịch vụ
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
