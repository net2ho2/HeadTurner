import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";
import Banner from "../../../Global/Banner/Banner";

const API_URL = "https://686cb72914219674dcc8dafa.mockapi.io/Postdetail";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${API_URL}/${id}`)
            .then((res) => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="loading">Đang tải bài viết...</div>;
    if (!post) return <div className="error">Không tìm thấy bài viết.</div>;

    return (
        <div className="div">
            <Banner menu="Tin tức" img="https://theme.hstatic.net/200000893323/1001256440/14/blog_banner.jpg?v=1587" />
            <div className="post-detail-container">
                <h1 className="post-detail-title">{post.title}</h1>
                <div className="post-detail-meta">
                    <span>
                        <strong>{post.author}</strong>
                    </span>{" "}
                    • <span>{post.date}</span>
                    <img src={post.image} alt="banner" className="post-detail-image" />
                </div>
                <div className="post-detail-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="back-link">
                    <Link to="/hair-care">← Quay lại danh sách bài viết</Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
