import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../Global/Banner/Banner";
import "./EditProduct.css";

const API_URL = "https://6867d51ad5933161d709fb13.mockapi.io/hairProduct";

const EditProduct = () => {
    const [products, setProducts] = useState([]);
    const [editData, setEditData] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
        thumb1: "",
        thumb2: "",
        thumb3: "",
        sales: 0,
        category: "",
        brand: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchProducts = async () => {
        const res = await axios.get(API_URL);
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setEditData(product);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert("Đã xóa sản phẩm.");
                fetchProducts();
            } catch (err) {
                console.error(err);
                alert("Lỗi khi xóa sản phẩm.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editData) return;
        try {
            await axios.put(`${API_URL}/${editData.id}`, editData);
            alert("Cập nhật thành công!");
            fetchProducts();
            setEditData(null);
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật.");
        }
    };

    const handleNewChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, newProduct);
            alert("Thêm sản phẩm thành công!");
            setNewProduct({
                name: "",
                price: "",
                image: "",
                thumb1: "",
                thumb2: "",
                thumb3: "",
                sales: 0,
                category: "",
                brand: "",
            });
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm sản phẩm.");
        }
    };

    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div>
            <Banner menu="admin" img="https://images.squarespace-cdn.com/content/v1/6524b195fae03175a9cd21d2/a1e4933f-5dda-4fd2-99ea-911783cced6f/C%26J-Banner-Image-WebOpt.jpg" />
            <div className="admin-container">
                {/* Cột 1: Danh sách sản phẩm */}
                <div className="admin-column">
                    <h2>Danh sách sản phẩm</h2>
                    <input type="text" placeholder="🔍 Tìm kiếm sản phẩm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="admin-search" />
                    <ul className="admin-product-list">
                        {currentItems.map((item) => (
                            <li key={item.id} className="admin-product-item">
                                <img src={item.image} alt={item.name} className="admin-main-image" />
                                <div className="admin-info">
                                    <strong>{item.name}</strong>
                                    <p>{item.price} đ</p>
                                    <p>
                                        {item.category} - {item.brand}
                                    </p>
                                    <div className="admin-thumbs">
                                        {item.thumb1 && <img src={item.thumb1} alt="thumb1" />}
                                        {item.thumb2 && <img src={item.thumb2} alt="thumb2" />}
                                        {item.thumb3 && <img src={item.thumb3} alt="thumb3" />}
                                    </div>
                                </div>
                                <div className="admin-actions">
                                    <button onClick={() => handleEditClick(item)}>Sửa</button>
                                    <button onClick={() => handleDeleteClick(item.id)}>Xóa</button>
                                </div>
                            </li>
                        ))}
                        <div className="admin-pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ul>
                </div>

                {/* Cột 2: Sửa sản phẩm */}
                <div className="admin-column">
                    <h2>Sửa sản phẩm</h2>
                    {editData ? (
                        <form onSubmit={handleSubmit} className="admin-form">
                            <input name="name" value={editData.name} onChange={handleChange} />
                            <input name="price" value={editData.price} onChange={handleChange} />
                            <input name="image" value={editData.image} onChange={handleChange} />
                            <input name="thumb1" value={editData.thumb1 || ""} onChange={handleChange} />
                            <input name="thumb2" value={editData.thumb2 || ""} onChange={handleChange} />
                            <input name="thumb3" value={editData.thumb3 || ""} onChange={handleChange} />
                            <input name="sales" type="number" value={editData.sales} onChange={handleChange} />
                            <input name="category" value={editData.category} onChange={handleChange} />
                            <input name="brand" value={editData.brand} onChange={handleChange} />
                            <button type="submit">Lưu thay đổi</button>
                        </form>
                    ) : (
                        <p>Chọn một sản phẩm để chỉnh sửa.</p>
                    )}
                </div>

                {/* Cột 3: Thêm sản phẩm */}
                <div className="admin-column">
                    <h2>Thêm sản phẩm mới</h2>
                    <form onSubmit={handleAddProduct} className="admin-form">
                        <input name="name" placeholder="Tên" value={newProduct.name} onChange={handleNewChange} />
                        <input name="price" placeholder="Giá" value={newProduct.price} onChange={handleNewChange} />
                        <input name="image" placeholder="Ảnh chính" value={newProduct.image} onChange={handleNewChange} />
                        <input name="thumb1" placeholder="Thumb 1" value={newProduct.thumb1} onChange={handleNewChange} />
                        <input name="thumb2" placeholder="Thumb 2" value={newProduct.thumb2} onChange={handleNewChange} />
                        <input name="thumb3" placeholder="Thumb 3" value={newProduct.thumb3} onChange={handleNewChange} />
                        <input name="sales" type="number" placeholder="Sales" value={newProduct.sales} onChange={handleNewChange} />
                        <input name="category" placeholder="Danh mục" value={newProduct.category} onChange={handleNewChange} />
                        <input name="brand" placeholder="Thương hiệu" value={newProduct.brand} onChange={handleNewChange} />
                        <button type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
